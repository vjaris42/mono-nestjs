import { apiClient } from './api-client';
import { AnalyticsData, ChartData, ApiResponse } from '../types';

export class AnalyticsService {
  async getAnalyticsData(
    startDate: string,
    endDate: string,
    metric?: string
  ): Promise<ApiResponse<AnalyticsData[]>> {
    const params = { startDate, endDate, metric };
    return apiClient.get<AnalyticsData[]>('/analytics/data', params);
  }

  async getChartData(
    type: 'bar' | 'line' | 'pie' | 'doughnut',
    metric: string,
    period: 'day' | 'week' | 'month' | 'year' = 'day'
  ): Promise<ApiResponse<ChartData>> {
    const params = { type, metric, period };
    return apiClient.get<ChartData>('/analytics/chart', params);
  }

  async getDashboardMetrics(): Promise<ApiResponse<{
    totalViews: number;
    uniqueVisitors: number;
    bounceRate: number;
    averageSessionDuration: number;
    conversionRate: number;
    topPages: Array<{ page: string; views: number }>;
    trafficSources: Array<{ source: string; visitors: number }>;
  }>> {
    return apiClient.get('/analytics/dashboard');
  }

  async getRevenueAnalytics(period: 'day' | 'week' | 'month' | 'year' = 'month'): Promise<ApiResponse<{
    totalRevenue: number;
    revenueGrowth: number;
    averageOrderValue: number;
    transactionCount: number;
    chartData: ChartData;
  }>> {
    return apiClient.get('/analytics/revenue', { period });
  }

  async getUserEngagementMetrics(): Promise<ApiResponse<{
    activeUsers: number;
    sessionDuration: number;
    pageViews: number;
    featureUsage: Array<{ feature: string; usage: number }>;
  }>> {
    return apiClient.get('/analytics/engagement');
  }

  async exportAnalyticsReport(
    startDate: string,
    endDate: string,
    format: 'csv' | 'pdf' | 'xlsx' = 'csv'
  ): Promise<ApiResponse<{ downloadUrl: string }>> {
    const params = { startDate, endDate, format };
    return apiClient.get('/analytics/export', params);
  }

  async getGeographicData(): Promise<ApiResponse<Array<{
    country: string;
    visitors: number;
    coordinates: [number, number];
  }>>> {
    return apiClient.get('/analytics/geographic');
  }

  async getDeviceAnalytics(): Promise<ApiResponse<{
    devices: Array<{ type: string; count: number; percentage: number }>;
    browsers: Array<{ name: string; count: number; percentage: number }>;
    operatingSystems: Array<{ name: string; count: number; percentage: number }>;
  }>> {
    return apiClient.get('/analytics/devices');
  }
}

export const analyticsService = new AnalyticsService();
