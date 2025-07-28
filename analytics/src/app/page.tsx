'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { 
  BarChart3, 
  Users, 
  Activity, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  RefreshCw,
  Download,
  Filter
} from 'lucide-react'

interface AnalyticsData {
  userStats: {
    totalUsers: number
    activeUsers: number
    newUsers: number
    userGrowth: number
  }
  sessionStats: {
    totalSessions: number
    avgSessionDuration: number
    bounceRate: number
    pageViews: number
  }
  recentActivity: Array<{
    id: string
    user: string
    action: string
    timestamp: string
    status: 'success' | 'warning' | 'error'
  }>
  systemHealth: {
    apiStatus: 'healthy' | 'warning' | 'error'
    databaseStatus: 'healthy' | 'warning' | 'error'
    responseTime: number
    uptime: number
  }
}

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  useEffect(() => {
    fetchAnalyticsData()
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchAnalyticsData, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchAnalyticsData = async () => {
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      
      // Fetch real user stats from backend
      const userStatsResponse = await fetch(`${API_BASE_URL}/users/stats`);
      let userStats = {
        totalUsers: 1247,
        activeUsers: 89,
        newUsers: 23,
        userGrowth: 12.5
      };

      if (userStatsResponse.ok) {
        const userStatsData = await userStatsResponse.json();
        if (userStatsData.success) {
          userStats = {
            totalUsers: userStatsData.data.totalUsers,
            activeUsers: userStatsData.data.activeUsers,
            newUsers: userStatsData.data.newUsersThisMonth,
            userGrowth: userStatsData.data.growthRate
          };
        }
      }

      // Use mock data for other metrics (in a real app, these would come from analytics APIs)
      const mockData: AnalyticsData = {
        userStats,
        sessionStats: {
          totalSessions: 3421,
          avgSessionDuration: 145, // seconds
          bounceRate: 34.2, // percentage
          pageViews: 8934
        },
        recentActivity: [
          {
            id: '1',
            user: 'john@example.com',
            action: 'User registration',
            timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
            status: 'success'
          },
          {
            id: '2',
            user: 'admin@example.com',
            action: 'Admin login',
            timestamp: new Date(Date.now() - 12 * 60000).toISOString(),
            status: 'success'
          },
          {
            id: '3',
            user: 'jane@example.com',
            action: 'Failed login attempt',
            timestamp: new Date(Date.now() - 18 * 60000).toISOString(),
            status: 'warning'
          },
          {
            id: '4',
            user: 'system',
            action: 'Database backup',
            timestamp: new Date(Date.now() - 35 * 60000).toISOString(),
            status: 'success'
          },
          {
            id: '5',
            user: 'api',
            action: 'Rate limit exceeded',
            timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
            status: 'error'
          }
        ],
        systemHealth: {
          apiStatus: 'healthy',
          databaseStatus: 'healthy',
          responseTime: 145,
          uptime: 99.9
        }
      }

      setAnalyticsData(mockData)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Error fetching analytics data:', error)
      
      // Fallback to mock data if API fails
      const mockData: AnalyticsData = {
        userStats: {
          totalUsers: 1247,
          activeUsers: 89,
          newUsers: 23,
          userGrowth: 12.5
        },
        sessionStats: {
          totalSessions: 3421,
          avgSessionDuration: 145,
          bounceRate: 34.2,
          pageViews: 8934
        },
        recentActivity: [
          {
            id: '1',
            user: 'john@example.com',
            action: 'User registration',
            timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
            status: 'success'
          }
        ],
        systemHealth: {
          apiStatus: 'warning',
          databaseStatus: 'healthy',
          responseTime: 145,
          uptime: 99.9
        }
      }
      
      setAnalyticsData(mockData)
      setLastUpdated(new Date())
    } finally {
      setLoading(false)
    }
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
      case 'healthy':
        return 'bg-green-100 text-green-800'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800'
      case 'error':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Failed to load analytics</h2>
          <Button onClick={fetchAnalyticsData}>Retry</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={fetchAnalyticsData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.userStats.totalUsers.toLocaleString()}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                  <span className="text-green-600">+{analyticsData.userStats.userGrowth}%</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.userStats.activeUsers}</div>
                <p className="text-xs text-muted-foreground">
                  {analyticsData.userStats.newUsers} new today
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sessions</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.sessionStats.totalSessions.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Avg duration: {formatDuration(analyticsData.sessionStats.avgSessionDuration)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.sessionStats.pageViews.toLocaleString()}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
                  <span className="text-red-600">Bounce rate: {analyticsData.sessionStats.bounceRate}%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            
            {/* Recent Activity */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest user actions and system events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {activity.action}
                          </p>
                          <Badge className={getStatusColor(activity.status)}>
                            {activity.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {activity.user} • {new Date(activity.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>
                  Current system status and performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">API Status</span>
                    <Badge className={getStatusColor(analyticsData.systemHealth.apiStatus)}>
                      {analyticsData.systemHealth.apiStatus}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Database Status</span>
                    <Badge className={getStatusColor(analyticsData.systemHealth.databaseStatus)}>
                      {analyticsData.systemHealth.databaseStatus}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Response Time</span>
                    <span className="text-sm text-gray-900">{analyticsData.systemHealth.responseTime}ms</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Uptime</span>
                    <span className="text-sm text-gray-900">{analyticsData.systemHealth.uptime}%</span>
                  </div>

                  <div className="pt-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Monitoring since last deployment</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Additional Analytics Placeholder */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>
                  Detailed charts and reports (Coming Soon)
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-8">
                <BarChart3 className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">Advanced analytics features are coming soon</p>
                <p className="text-sm text-gray-400">
                  This will include detailed charts, custom reports, and real-time monitoring
                </p>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
    </div>
  )
}
