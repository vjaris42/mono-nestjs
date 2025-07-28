import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

// DTOs
export class LoginDto {
  email: string;
  password: string;
}

export class RegisterDto {
  email: string;
  password: string;
  name: string;
}

export class User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class AuthService {
  // Mock user database - replace with real database
  private users: User[] = [];

  constructor(private jwtService: JwtService) {
    void this.initializeUsers();
  }

  async initializeUsers() {
    // Generate proper hashes for the default users
    const adminHash = await bcrypt.hash('admin123', 10);
    const userHash = await bcrypt.hash('user123', 10);

    this.users = [
      {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin',
        password: adminHash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        email: 'user@example.com',
        name: 'Regular User',
        role: 'user',
        password: userHash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = this.users.find((u) => u.email === email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (user && isPasswordValid) {
      const { password: userPassword, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      success: true,
      data: {
        accessToken: this.jwtService.sign(payload),
        refreshToken: this.jwtService.sign(payload, { expiresIn: '30d' }),
        expiresIn: 7 * 24 * 60 * 60, // 7 days in seconds
        user,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = this.users.find((u) => u.email === registerDto.email);
    if (existingUser) {
      return {
        success: false,
        error: 'User already exists',
      };
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 15),
      email: registerDto.email,
      name: registerDto.name,
      role: 'user',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;

    return {
      success: true,
      data: userWithoutPassword,
    };
  }

  async getCurrentUser(userId: string) {
    const user = this.users.find((u) => u.id === userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const { password: _, ...userWithoutPassword } = user;
    return {
      success: true,
      data: userWithoutPassword,
    };
  }

  async getAllUsers() {
    const usersWithoutPasswords = this.users.map(
      ({ password: _, ...user }) => user,
    );
    return {
      success: true,
      data: usersWithoutPasswords,
    };
  }
}
