import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse, PaginatedResponse } from '../types';

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001') {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle common errors
    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          this.handleUnauthorized();
        }
        return Promise.reject(error);
      }
    );
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  private handleUnauthorized() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }
  }

  public setAuthToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  public removeAuthToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
    }
  }

  async get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.client.get(url, { params });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.client.post(url, data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.client.put(url, data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.client.delete(url);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Authentication Methods
  async login(credentials: { email: string; password: string }): Promise<ApiResponse<any>> {
    return this.post('/auth/login', credentials);
  }

  async register(userData: { email: string; password: string; name: string }): Promise<ApiResponse<any>> {
    return this.post('/auth/register', userData);
  }

  async getCurrentUser(): Promise<ApiResponse<any>> {
    return this.get('/auth/me');
  }

  async logout(): Promise<ApiResponse<any>> {
    const result = await this.post('/auth/logout');
    this.removeAuthToken();
    return result;
  }

  async refreshToken(): Promise<ApiResponse<any>> {
    return this.post('/auth/refresh');
  }

  async forgotPassword(email: string): Promise<ApiResponse<any>> {
    return this.post('/auth/forgot-password', { email });
  }

  async resetPassword(token: string, password: string): Promise<ApiResponse<any>> {
    return this.post('/auth/reset-password', { token, password });
  }

  // User Management Methods
  async getUsers(params?: { page?: number; limit?: number; search?: string }): Promise<any> {
    return this.get('/users', params);
  }

  async getUserById(id: string): Promise<ApiResponse<any>> {
    return this.get(`/users/${id}`);
  }

  async createUser(userData: any): Promise<ApiResponse<any>> {
    return this.post('/users', userData);
  }

  async updateUser(id: string, userData: any): Promise<ApiResponse<any>> {
    return this.put(`/users/${id}`, userData);
  }

  async deleteUser(id: string): Promise<ApiResponse<any>> {
    return this.delete(`/users/${id}`);
  }

  async updateProfile(userData: any): Promise<ApiResponse<any>> {
    return this.put('/users/profile', userData);
  }

  async getUserStats(): Promise<ApiResponse<any>> {
    return this.get('/users/stats');
  }

  private handleError(error: any): ApiResponse<any> {
    console.error('API Error:', error);
    
    if (error.response) {
      // Server responded with error status
      return {
        success: false,
        error: error.response.data?.message || error.response.statusText,
        data: null,
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        success: false,
        error: 'Network error - please check your connection',
        data: null,
      };
    } else {
      // Something else happened
      return {
        success: false,
        error: error.message || 'An unexpected error occurred',
        data: null,
      };
    }
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient();
export default apiClient;
