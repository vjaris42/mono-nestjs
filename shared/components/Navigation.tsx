import { ReactNode } from 'react'
import Link from 'next/link'
import { Button } from '../components/ui/button'
import { 
  User, 
  Settings, 
  LogOut, 
  Home,
  BarChart3,
  Users
} from 'lucide-react'

export interface NavItem {
  href: string
  label: string
  icon: ReactNode
  active?: boolean
}

export interface NavigationProps {
  title: string
  user?: {
    name: string
    email: string
    role: string
  }
  navItems: NavItem[]
  onLogout?: () => void
  children: ReactNode
}

export function Navigation({ title, user, navItems, onLogout, children }: NavigationProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            </div>
            
            {/* Navigation Items */}
            <div className="hidden md:flex md:space-x-8">
              {navItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    item.active
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* User Menu */}
            {user && (
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-gray-500">{user.email}</div>
                </div>
                {onLogout && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={onLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}

// Pre-defined navigation items for different app types
export const adminNavItems: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: <Home className="h-4 w-4" />
  },
  {
    href: '/users',
    label: 'Users',
    icon: <Users className="h-4 w-4" />
  },
  {
    href: '/analytics',
    label: 'Analytics',
    icon: <BarChart3 className="h-4 w-4" />
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: <Settings className="h-4 w-4" />
  }
]

export const userNavItems: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: <Home className="h-4 w-4" />
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: <User className="h-4 w-4" />
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: <Settings className="h-4 w-4" />
  }
]

export const analyticsNavItems: NavItem[] = [
  {
    href: '/',
    label: 'Dashboard',
    icon: <BarChart3 className="h-4 w-4" />
  },
  {
    href: '/reports',
    label: 'Reports',
    icon: <Settings className="h-4 w-4" />
  },
  {
    href: '/users',
    label: 'User Analytics',
    icon: <Users className="h-4 w-4" />
  }
]
