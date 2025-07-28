# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

This is a multi-deployment application with:
- **Admin Panel**: Next.js frontend for administrative tasks (`/admin`)
- **User Dashboard**: Next.js frontend for regular users (`/user`) 
- **Analytics Module**: Next.js frontend for data visualization (`/analytics`)
- **Shared Components**: Reusable code for all frontends (`/shared`)
- **Backend**: NestJS API server (`/backend`)

## Tech Stack

- **Frontend**: Next.js 15+ with TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: NestJS with TypeScript
- **Deployment**: Vercel (separate deployments for each frontend)

## Code Guidelines

1. **Use TypeScript** throughout the project with strict typing
2. **Use Shadcn UI components** for consistent design across all frontends
3. **Shared folder structure**:
   - `shared/components`: Reusable UI components
   - `shared/hooks`: Custom React hooks
   - `shared/services`: API service files
   - `shared/utils`: Utility functions
   - `shared/types`: TypeScript type definitions
4. **Import from shared folder** using relative paths: `../../shared/`
5. **Follow Next.js App Router** conventions with `src/app` directory
6. **Use Tailwind CSS** for styling with consistent design tokens
7. **API calls** should use the shared service layer
8. **Error handling** should be consistent across all applications

## Folder Structure Rules

- Each frontend (admin, user, analytics) is a separate Next.js app
- Shared code goes in `/shared` folder
- Backend is a single NestJS application serving all frontends
- Each app should be deployable independently on Vercel

## Naming Conventions

- Components: PascalCase (e.g., `UserCard.tsx`)
- Files: kebab-case (e.g., `user-management.tsx`)
- Functions: camelCase (e.g., `getUserData`)
- Constants: SCREAMING_SNAKE_CASE (e.g., `API_BASE_URL`)

## Development Workflow

1. Develop shared components first in `/shared`
2. Build specific features in individual frontend apps
3. Use the shared API services for backend communication
4. Test each deployment independently

Remember to maintain consistency across all three frontends while allowing each to have its specific functionality.
