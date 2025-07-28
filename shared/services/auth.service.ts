import { apiClient } from './api-client';
import { User, LoginCredentials, RegisterData, AuthToken, ApiResponse } from '../types';

export class AuthService {
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthToken>> {
    const response = await apiClient.post<AuthToken>('/auth/login', credentials);
    
    if (response.success && response.data) {
      apiClient.setAuthToken(response.data.accessToken);
    }
    
    return response;
  }

  async register(data: RegisterData): Promise<ApiResponse<User>> {
    return apiClient.post<User>('/auth/register', data);
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      apiClient.removeAuthToken();
    }
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiClient.get<User>('/auth/me');
  }

  async refreshToken(): Promise<ApiResponse<AuthToken>> {
    const response = await apiClient.post<AuthToken>('/auth/refresh');
    
    if (response.success && response.data) {
      apiClient.setAuthToken(response.data.accessToken);
    }
    
    return response;
  }

  async forgotPassword(email: string): Promise<ApiResponse<void>> {
    return apiClient.post('/auth/forgot-password', { email });
  }

  async resetPassword(token: string, password: string): Promise<ApiResponse<void>> {
    return apiClient.post('/auth/reset-password', { token, password });
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<void>> {
    return apiClient.post('/auth/change-password', {
      currentPassword,
      newPassword,
    });
  }

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('authToken');
    }
    return false;
  }
}

export const authService = new AuthService();
