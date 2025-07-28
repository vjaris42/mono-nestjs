#!/bin/bash

# Deployment script for monorepo to Vercel
# Run this script from the root of your monorepo

echo "🚀 Starting deployment of monorepo to Vercel..."

# Function to deploy a specific app
deploy_app() {
    local app_name=$1
    local folder=$2
    
    echo "📦 Deploying $app_name..."
    cd $folder
    
    if command -v vercel &> /dev/null; then
        vercel --prod
        if [ $? -eq 0 ]; then
            echo "✅ $app_name deployed successfully!"
        else
            echo "❌ Failed to deploy $app_name"
            exit 1
        fi
    else
        echo "❌ Vercel CLI not found. Please install it with: npm install -g vercel"
        exit 1
    fi
    
    cd ..
}

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Deploy backend first
echo "🔧 Deploying Backend API..."
deploy_app "Backend API" "backend"

echo "⏳ Waiting 30 seconds for backend to be ready..."
sleep 30

# Deploy frontend apps
deploy_app "Admin Panel" "admin"
deploy_app "User Dashboard" "user" 
deploy_app "Analytics Dashboard" "analytics"

echo ""
echo "🎉 All applications deployed successfully!"
echo ""
echo "📝 Don't forget to:"
echo "1. Update environment variables in Vercel dashboard"
echo "2. Update CORS settings in backend with production URLs"
echo "3. Update AppNavigation.tsx with production URLs"
echo "4. Test all applications thoroughly"
echo ""
echo "🔗 Visit https://vercel.com/dashboard to manage your deployments"
