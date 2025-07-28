import { apiClient } from './api-client';
import { ApiResponse, PaginatedResponse } from '../types';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  adminUsers: number;
  newUsersThisMonth: number;
  growthRate: number;
}

export interface CreateUserData {
  email: string;
  name: string;
  role?: 'admin' | 'user';
}

export interface UpdateUserData {
  email?: string;
  name?: string;
  role?: 'admin' | 'user';
}

export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
}

class UserService {
  async getUsers(params?: GetUsersParams): Promise<any> {
    return apiClient.getUsers(params);
  }

  async getUserById(id: string): Promise<ApiResponse<User>> {
    return apiClient.getUserById(id);
  }

  async createUser(userData: CreateUserData): Promise<ApiResponse<User>> {
    return apiClient.createUser(userData);
  }

  async updateUser(id: string, userData: UpdateUserData): Promise<ApiResponse<User>> {
    return apiClient.updateUser(id, userData);
  }

  async deleteUser(id: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.deleteUser(id);
  }

  async updateProfile(userData: UpdateUserData): Promise<ApiResponse<User>> {
    return apiClient.updateProfile(userData);
  }

  async getUserStats(): Promise<ApiResponse<UserStats>> {
    return apiClient.getUserStats();
  }

  async searchUsers(search: string, page: number = 1, limit: number = 10): Promise<any> {
    return this.getUsers({ search, page, limit });
  }

  // Helper methods for user management
  isAdmin(user: User): boolean {
    return user.role === 'admin';
  }

  formatUserName(user: User): string {
    return user.name || user.email;
  }

  getUserInitials(user: User): string {
    const name = this.formatUserName(user);
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validateUserData(userData: CreateUserData | UpdateUserData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if ('email' in userData && userData.email) {
      if (!this.validateEmail(userData.email)) {
        errors.push('Invalid email format');
      }
    }

    if ('name' in userData && userData.name) {
      if (userData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
      }
    }

    if ('role' in userData && userData.role) {
      if (!['admin', 'user'].includes(userData.role)) {
        errors.push('Role must be either admin or user');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

// Create and export a singleton instance
export const userService = new UserService();
export default userService;
