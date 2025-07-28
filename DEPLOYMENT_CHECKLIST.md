# 📋 Vercel Deployment Checklist

Use this checklist to ensure a smooth deployment process.

## Pre-Deployment Checklist

### ✅ Code Preparation
- [ ] All TypeScript errors resolved
- [ ] All applications build successfully locally (`npm run build:all`)
- [ ] All tests pass (`npm run test:all`)
- [ ] Code committed and pushed to GitHub
- [ ] Environment variables configured for production

### ✅ Accounts & Tools
- [ ] Vercel account created at [vercel.com](https://vercel.com)
- [ ] GitHub account with repository created
- [ ] Vercel CLI installed (`npm install -g vercel`)
- [ ] Logged into Vercel CLI (`vercel login`)

## Deployment Checklist

### ✅ Backend Deployment
- [ ] Navigate to `backend` folder
- [ ] Run `vercel --prod`
- [ ] Copy the backend URL (e.g., `https://mono-backend-api.vercel.app`)
- [ ] Test backend endpoints are accessible

### ✅ Frontend Deployments
- [ ] Deploy Admin Panel (`cd admin && vercel --prod`)
- [ ] Deploy User Dashboard (`cd user && vercel --prod`)  
- [ ] Deploy Analytics Dashboard (`cd analytics && vercel --prod`)
- [ ] Copy all frontend URLs

### ✅ Environment Variables
For each frontend app in Vercel Dashboard → Settings → Environment Variables:
- [ ] Admin: `NEXT_PUBLIC_API_URL` = backend URL
- [ ] User: `NEXT_PUBLIC_API_URL` = backend URL
- [ ] Analytics: `NEXT_PUBLIC_API_URL` = backend URL

## Post-Deployment Checklist

### ✅ Configuration Updates
- [ ] Update CORS in `backend/api/index.ts` with production URLs
- [ ] Update `AppNavigation.tsx` with production URLs
- [ ] Redeploy backend after CORS update
- [ ] Redeploy frontends after navigation update

### ✅ Testing
- [ ] Test user registration on User Dashboard
- [ ] Test user login on User Dashboard  
- [ ] Test admin login on Admin Panel
- [ ] Test user management (CRUD) in Admin Panel
- [ ] Test analytics data loading
- [ ] Test cross-app navigation
- [ ] Test all authentication flows
- [ ] Test on different browsers/devices

### ✅ CI/CD Setup (Optional)
- [ ] Connect each Vercel project to GitHub repository
- [ ] Configure auto-deployment from main branch
- [ ] Test auto-deployment with a small change

## 🆘 If Something Goes Wrong

### Build Issues
- [ ] Check Vercel build logs in dashboard
- [ ] Verify all dependencies in package.json
- [ ] Test build locally first

### API Issues  
- [ ] Verify backend is accessible
- [ ] Check CORS configuration
- [ ] Verify environment variables are set
- [ ] Test API endpoints with Postman/curl

### Authentication Issues
- [ ] Check JWT token configuration
- [ ] Verify API URL in frontend apps
- [ ] Test login flow step by step
- [ ] Check browser developer tools for errors

## 🎉 Success Criteria

Your deployment is successful when:
- [ ] All 4 applications are accessible via HTTPS
- [ ] User can register and login
- [ ] Admin can login and manage users
- [ ] Analytics dashboard shows data
- [ ] Cross-app navigation works
- [ ] No console errors in browser
- [ ] All core features work in production

## 📞 Getting Help

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Community**: https://github.com/vercel/vercel/discussions
- **Next.js Docs**: https://nextjs.org/docs
- **NestJS Docs**: https://docs.nestjs.com
