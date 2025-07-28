// Enhanced API client with better error handling and type safety

export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
  statusCode?: number
}

export interface ApiRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: any
  token?: string
}

export class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = 'http://localhost:3001') {
    this.baseUrl = baseUrl
  }

  async request<T = any>(
    endpoint: string, 
    config: ApiRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { 
      method = 'GET', 
      headers = {}, 
      body, 
      token 
    } = config

    try {
      const requestHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...headers
      }

      if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`
      }

      const requestConfig: RequestInit = {
        method,
        headers: requestHeaders
      }

      if (body && method !== 'GET') {
        requestConfig.body = JSON.stringify(body)
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, requestConfig)
      
      let data: any
      const contentType = response.headers.get('content-type')
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json()
      } else {
        data = await response.text()
      }

      if (!response.ok) {
        return {
          error: data.message || `HTTP error! status: ${response.status}`,
          statusCode: response.status,
          data: undefined
        }
      }

      return {
        data,
        statusCode: response.status
      }
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        statusCode: 500,
        data: undefined
      }
    }
  }

  // Convenience methods
  async get<T = any>(endpoint: string, token?: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', token })
  }

  async post<T = any>(endpoint: string, body?: any, token?: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body, token })
  }

  async put<T = any>(endpoint: string, body?: any, token?: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PUT', body, token })
  }

  async delete<T = any>(endpoint: string, token?: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE', token })
  }
}

// Default instance
export const apiClient = new ApiClient()

// Utility functions for common operations
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    apiClient.post('/auth/login', credentials),
    
  register: (userData: { email: string; password: string; firstName: string; lastName: string }) =>
    apiClient.post('/auth/register', userData),
    
  getProfile: (token: string) =>
    apiClient.get('/auth/me', token),
    
  logout: (token: string) =>
    apiClient.post('/auth/logout', {}, token),
    
  refreshToken: (refreshToken: string) =>
    apiClient.post('/auth/refresh', { refreshToken })
}

export const usersApi = {
  getAll: (token: string) =>
    apiClient.get('/users', token),
    
  getById: (id: string, token: string) =>
    apiClient.get(`/users/${id}`, token),
    
  create: (userData: any, token: string) =>
    apiClient.post('/users', userData, token),
    
  update: (id: string, userData: any, token: string) =>
    apiClient.put(`/users/${id}`, userData, token),
    
  delete: (id: string, token: string) =>
    apiClient.delete(`/users/${id}`, token),
    
  updateProfile: (profileData: any, token: string) =>
    apiClient.put('/users/profile', profileData, token),
    
  getStats: (token: string) =>
    apiClient.get('/users/stats', token)
}

// Storage utilities for tokens
export const tokenStorage = {
  get: (): string | null => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('accessToken')
  },
  
  set: (token: string): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem('accessToken', token)
  },
  
  remove: (): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  },
  
  getRefresh: (): string | null => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('refreshToken')
  },
  
  setRefresh: (token: string): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem('refreshToken', token)
  }
}
