import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService, LoginDto, RegisterDto } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getCurrentUser(@Request() req: any) {
    return this.authService.getCurrentUser(req.user.sub);
  }

  @Post('logout')
  async logout() {
    return {
      success: true,
      message: 'Logged out successfully',
    };
  }

  @Post('refresh')
  async refreshToken(@Body() body: { refreshToken: string }) {
    // In a real app, validate the refresh token
    return {
      success: true,
      data: {
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
        expiresIn: 7 * 24 * 60 * 60,
      },
    };
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: { email: string }) {
    return {
      success: true,
      message: 'Password reset email sent',
    };
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { token: string; password: string }) {
    return {
      success: true,
      message: 'Password reset successfully',
    };
  }
}
