# Multi-Deployment Application

A comprehensive web application with three separate frontend deployments and a unified backend, built with Next.js, NestJS, and Shadcn UI.

## 🏗️ Architecture

### Frontend Applications
- **Admin Panel** (`/admin`) - Administrative interface for managing users, settings, and system configuration
- **User Dashboard** (`/user`) - User-facing application for profile management and personal data
- **Analytics Module** (`/analytics`) - Data visualization and reporting interface

### Backend
- **API Server** (`/backend`) - NestJS-based REST API serving all frontend applications

### Shared Code
- **Shared Library** (`/shared`) - Reusable components, hooks, services, and utilities

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **State Management**: React Hooks + Context
- **HTTP Client**: Axios

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL (configurable)
- **Authentication**: JWT
- **Validation**: Class Validator
- **Documentation**: Swagger/OpenAPI

### Deployment
- **Platform**: Vercel
- **Strategy**: Separate deployments for each frontend application

## 📁 Project Structure

```
mono/
├── admin/                 # Admin Panel (Next.js)
│   ├── src/
│   │   ├── app/          # App Router pages
│   │   ├── components/   # Admin-specific components
│   │   └── lib/          # Admin utilities
│   ├── package.json
│   └── components.json   # Shadcn UI config
│
├── user/                  # User Dashboard (Next.js)
│   ├── src/
│   │   ├── app/          # App Router pages
│   │   ├── components/   # User-specific components
│   │   └── lib/          # User utilities
│   ├── package.json
│   └── components.json   # Shadcn UI config
│
├── analytics/             # Analytics Module (Next.js)
│   ├── src/
│   │   ├── app/          # App Router pages
│   │   ├── components/   # Analytics-specific components
│   │   └── lib/          # Analytics utilities
│   ├── package.json
│   └── components.json   # Shadcn UI config
│
├── backend/              # API Server (NestJS)
│   ├── src/
│   │   ├── modules/      # Feature modules
│   │   ├── common/       # Shared backend code
│   │   └── main.ts       # Application entry point
│   └── package.json
│
├── shared/               # Shared Code Library
│   ├── components/       # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API service layer
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   └── package.json
│
└── .github/
    └── copilot-instructions.md  # AI coding guidelines
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mono
   ```

2. **Install dependencies for all projects**
   ```bash
   # Install shared dependencies
   cd shared && npm install && cd ..
   
   # Install admin dependencies
   cd admin && npm install && cd ..
   
   # Install user dependencies  
   cd user && npm install && cd ..
   
   # Install analytics dependencies
   cd analytics && npm install && cd ..
   
   # Install backend dependencies
   cd backend && npm install && cd ..
   ```

3. **Environment Setup**
   Create `.env.local` files in each frontend directory:
   ```bash
   # admin/.env.local, user/.env.local, analytics/.env.local
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_APP_ENV=development
   ```
   
   Create `.env` file in backend directory:
   ```bash
   # backend/.env
   DATABASE_URL=postgresql://username:password@localhost:5432/dbname
   JWT_SECRET=your-jwt-secret
   PORT=3001
   ```

### Running the Development Servers

**Start all applications:**

```bash
# Backend (Terminal 1)
cd backend && npm run start:dev

# Admin Panel (Terminal 2)  
cd admin && npm run dev

# User Dashboard (Terminal 3)
cd user && npm run dev

# Analytics Module (Terminal 4)
cd analytics && npm run dev
```

**Access the applications:**
- Admin Panel: http://localhost:3000
- User Dashboard: http://localhost:3002  
- Analytics Module: http://localhost:3003
- Backend API: http://localhost:3001

## 📦 Adding Shared Code

### Components
```typescript
// shared/components/MyComponent.tsx
export function MyComponent() {
  return <div>Shared Component</div>;
}

// Usage in any frontend
import { MyComponent } from '../../shared/components/MyComponent';
```

### Hooks
```typescript
// shared/hooks/useMyHook.ts
export function useMyHook() {
  // Hook logic
}

// Usage in any frontend
import { useMyHook } from '../../shared/hooks/useMyHook';
```

### Services
```typescript
// shared/services/my.service.ts
export class MyService {
  // Service methods
}

// Usage in any frontend
import { myService } from '../../shared/services';
```

## 🎨 UI Components

Each frontend application uses Shadcn UI components. Common components are available in the shared folder for consistency across applications.

### Adding New Shadcn Components

```bash
# Add to specific application
cd admin && npx shadcn@latest add button

# Add to all applications
cd admin && npx shadcn@latest add button
cd user && npx shadcn@latest add button  
cd analytics && npx shadcn@latest add button
```

## 🔐 Authentication

The authentication system is implemented using:
- JWT tokens for stateless authentication
- Refresh token mechanism for security
- Role-based access control (Admin/User)
- Shared authentication service

## 📊 API Documentation

The backend provides Swagger documentation available at:
http://localhost:3001/api/docs

## 🚀 Deployment

Each frontend application can be deployed independently to Vercel:

### Frontend Deployment

1. **Connect to Vercel**
   ```bash
   # Deploy admin panel
   cd admin && vercel
   
   # Deploy user dashboard
   cd user && vercel
   
   # Deploy analytics module
   cd analytics && vercel
   ```

2. **Environment Variables**
   Configure in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL
   - `NEXT_PUBLIC_APP_ENV`: production

### Backend Deployment

Deploy the NestJS backend to your preferred platform:
- Vercel (recommended)
- Railway
- Heroku
- AWS/GCP/Azure

## 🧪 Testing

```bash
# Run tests for all applications
npm run test

# Run tests for specific application
cd admin && npm test
cd user && npm test
cd analytics && npm test
cd backend && npm test
```

## 📝 Contributing

1. Follow the established folder structure
2. Use TypeScript throughout the project
3. Leverage shared components and services
4. Follow the coding guidelines in `.github/copilot-instructions.md`
5. Test your changes across all affected applications

## 📄 License

This project is licensed under the MIT License.

## 🤝 Support

For questions and support, please refer to the documentation or create an issue.
