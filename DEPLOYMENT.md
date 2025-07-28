# 🚀 Complete Vercel Deployment Guide for Monorepo

This comprehensive guide will help you deploy all applications in this monorepo to Vercel, even if you're new to CI/CD.

## 📋 Prerequisites

### 1. Create Accounts & Install Tools
```bash
# 1. Create a free Vercel account at https://vercel.com
# 2. Create a GitHub account at https://github.com (if you don't have one)
# 3. Install Vercel CLI globally
npm install -g vercel
```

### 2. Push Code to GitHub
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit"

# Create a new repository on GitHub and push
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## 🎯 Deployment Strategy

We'll deploy **4 separate applications**:
1. **Backend API** (NestJS) → Vercel Serverless Functions
2. **Admin Panel** (Next.js) → Vercel Static Site
3. **User Dashboard** (Next.js) → Vercel Static Site  
4. **Analytics Dashboard** (Next.js) → Vercel Static Site

## 📝 Step-by-Step Deployment

### Step 1: Deploy Backend API First

```bash
# Navigate to backend folder
cd backend

# Login to Vercel (follow prompts)
vercel login

# Deploy to production
vercel --prod

# Note: Copy the deployment URL, you'll need it for frontend apps
# Example: https://mono-backend-api.vercel.app
```

**Important:** After backend deployment, update the CORS origins in `backend/api/index.ts` with your actual frontend URLs.

### Step 2: Deploy Admin Panel

```bash
# Navigate to admin folder
cd ../admin

# Deploy to production
vercel --prod

# When prompted:
# - Link to existing project? No
# - Project name: admin-panel (or your preferred name)
# - Directory: leave empty (current directory)
```

**Add Environment Variables in Vercel Dashboard:**
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your admin project
3. Go to Settings → Environment Variables
4. Add: `NEXT_PUBLIC_API_URL` = `https://your-backend-url.vercel.app`

### Step 3: Deploy User Dashboard

```bash
# Navigate to user folder
cd ../user

# Deploy to production  
vercel --prod

# When prompted:
# - Link to existing project? No
# - Project name: user-dashboard (or your preferred name)
# - Directory: leave empty (current directory)
```

**Add Environment Variables:**
1. Go to Vercel dashboard → User project
2. Settings → Environment Variables  
3. Add: `NEXT_PUBLIC_API_URL` = `https://your-backend-url.vercel.app`

### Step 4: Deploy Analytics Dashboard

```bash
# Navigate to analytics folder
cd ../analytics

# Deploy to production
vercel --prod

# When prompted:
# - Link to existing project? No  
# - Project name: analytics-dashboard (or your preferred name)
# - Directory: leave empty (current directory)
```

**Add Environment Variables:**
1. Go to Vercel dashboard → Analytics project
2. Settings → Environment Variables
3. Add: `NEXT_PUBLIC_API_URL` = `https://your-backend-url.vercel.app`

## 🔧 Post-Deployment Configuration

### 1. Update CORS Settings
Edit `backend/api/index.ts` and replace placeholder URLs with your actual Vercel URLs:

```typescript
origin: [
  'https://your-admin-app.vercel.app',      // Replace with actual admin URL
  'https://your-user-app.vercel.app',       // Replace with actual user URL  
  'https://your-analytics-app.vercel.app',  // Replace with actual analytics URL
],
```

Then redeploy backend:
```bash
cd backend && vercel --prod
```

### 2. Update AppNavigation URLs
Edit `shared/components/AppNavigation.tsx` and replace placeholder URLs with your actual Vercel URLs.

### 3. Test All Applications
Visit each deployed URL and test:
- ✅ User registration and login
- ✅ Admin login and user management
- ✅ Analytics dashboard data loading
- ✅ Cross-app navigation

## 🔄 Continuous Deployment

### Auto-Deploy from GitHub
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. For each project, go to Settings → Git
3. Connect to your GitHub repository
4. Choose the correct folder (admin, user, analytics, backend)
5. Now every push to main branch will auto-deploy!

### Environment Variables Template
For each frontend app in Vercel dashboard:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | `https://your-backend-url.vercel.app` |

## 🆘 Troubleshooting

### Common Issues:

**Build Fails:**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Make sure TypeScript errors are resolved

**API Calls Fail:**
- Verify `NEXT_PUBLIC_API_URL` environment variable
- Check CORS settings in backend
- Ensure backend is deployed and accessible

**Authentication Issues:**
- Check if JWT tokens work across domains
- Verify API endpoints are accessible
- Test with browser developer tools

### Getting Help:
- Check Vercel logs in dashboard
- Use browser developer tools for frontend issues
- Check network tab for failed API calls

## 🎉 Success!

After following these steps, you'll have:
- ✅ 4 separate deployments on Vercel
- ✅ Auto-deployment from GitHub  
- ✅ Production environment variables
- ✅ Working authentication across all apps
- ✅ Full CI/CD pipeline

Your monorepo is now production-ready! 🚀
