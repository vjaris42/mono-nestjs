import { Injectable } from '@nestjs/common';
import { User } from '../auth/auth.service';

@Injectable()
export class UsersService {
  // Mock users database - in a real app, use a proper database
  private users: User[] = [
    {
      id: '1',
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'admin',
      password: 'hashed-password',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      email: 'user@example.com',
      name: 'Regular User',
      role: 'user',
      password: 'hashed-password',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      email: 'john.doe@example.com',
      name: 'John Doe',
      role: 'user',
      password: 'hashed-password',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  getUsers(page: number = 1, limit: number = 10, search?: string) {
    let filteredUsers = this.users;

    if (search) {
      filteredUsers = this.users.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()),
      );
    }

    const total = filteredUsers.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    // Remove passwords from response
    const safeUsers = paginatedUsers.map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...safeUser } = user;
      return safeUser;
    });

    return {
      success: true,
      data: safeUsers,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  getUserById(id: string) {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeUser } = user;
    return {
      success: true,
      data: safeUser,
    };
  }

  createUser(userData: Partial<User>) {
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 15),
      email: userData.email || '',
      name: userData.name || '',
      role: userData.role || 'user',
      password: 'hashed-password', // In real app, hash the password
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeUser } = newUser;

    return {
      success: true,
      data: safeUser,
    };
  }

  updateUser(id: string, userData: Partial<User>) {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...userData,
      updatedAt: new Date(),
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safeUser } = this.users[userIndex];
    return {
      success: true,
      data: safeUser,
    };
  }

  deleteUser(id: string) {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    this.users.splice(userIndex, 1);
    return {
      success: true,
      message: 'User deleted successfully',
    };
  }

  updateProfile(userData: Partial<User>) {
    // In a real app, get user ID from JWT token
    const userId = '1'; // Mock user ID
    return this.updateUser(userId, userData);
  }

  getUserStats() {
    const totalUsers = this.users.length;
    const activeUsers = this.users.filter((u) => u.role === 'user').length;
    const adminUsers = this.users.filter((u) => u.role === 'admin').length;

    // Mock some statistics
    const newUsersThisMonth = Math.floor(totalUsers * 0.2);
    const growthRate = 15.7; // percentage

    return {
      success: true,
      data: {
        totalUsers,
        activeUsers,
        adminUsers,
        newUsersThisMonth,
        growthRate,
      },
    };
  }
}
