'use client'

import { useState, useEffect } from 'react'

interface AppNavigationProps {
  currentApp: 'admin' | 'user' | 'analytics'
}

export function AppNavigation({ currentApp }: AppNavigationProps) {
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is logged in and get their role
    const token = localStorage.getItem('token')
    if (token) {
      // Decode basic info from token (in a real app, verify with backend)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        setUserRole(payload.role)
      } catch (error) {
        console.error('Error decoding token:', error)
      }
    }
  }, [])

  const apps = [
    {
      name: 'Admin Panel',
      key: 'admin' as const,
      url: process.env.NODE_ENV === 'production' 
        ? 'https://admin-panel-ten-ivory.vercel.app/' 
        : 'http://localhost:3000',
      description: 'User management and system administration',
      requiresAdmin: true
    },
    {
      name: 'User Dashboard',
      key: 'user' as const,
      url: process.env.NODE_ENV === 'production' 
        ? 'https://user-dashboard-theta-six.vercel.app/' 
        : 'http://localhost:3002',
      description: 'Personal dashboard and profile management',
      requiresAdmin: false
    },
    {
      name: 'Analytics',
      key: 'analytics' as const,
      url: process.env.NODE_ENV === 'production' 
        ? 'https://analytics-dashboard-beta-seven.vercel.app/' 
        : 'http://localhost:3003',
      description: 'System analytics and reports',
      requiresAdmin: true
    }
  ]

  const availableApps = apps.filter(app => 
    !app.requiresAdmin || userRole === 'admin'
  )

  const otherApps = availableApps.filter(app => app.key !== currentApp)

  if (otherApps.length === 0) {
    return null
  }

  return (
    <div className="bg-blue-50 border-b border-blue-200 p-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-blue-800">
              Other Apps:
            </span>
            <div className="flex space-x-2">
              {otherApps.map((app) => (
                <a
                  key={app.key}
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-white hover:bg-blue-100 border border-blue-300 text-blue-700 text-sm rounded-md transition-colors"
                >
                  <span>{app.name}</span>
                  <span className="text-xs">↗</span>
                </a>
              ))}
            </div>
          </div>
          <div className="text-xs text-blue-600">
            Currently in: <span className="font-medium">{apps.find(app => app.key === currentApp)?.name}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
