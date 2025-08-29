# 🚀 Deployment Guide for Octobooks

This guide covers deploying the Octobooks platform to various hosting providers with production-ready configurations.

## 📋 Pre-deployment Checklist

### Environment Setup
- [ ] Firebase project configured with Authentication, Firestore, and Storage
- [ ] Razorpay account set up with API keys
- [ ] Shiprocket account configured for shipping
- [ ] Domain name registered (if using custom domain)
- [ ] SSL certificate configured
- [ ] Environment variables documented and secured

### Code Quality
- [ ] All tests passing (`npm run test`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] TypeScript compilation successful (`npm run build`)
- [ ] Performance audit completed
- [ ] Security audit completed
- [ ] Accessibility testing completed

## 🌐 Vercel Deployment (Recommended)

### Step 1: Prepare Repository
```bash
# Ensure your code is committed and pushed
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Connect to Vercel
1. Visit [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### Step 3: Environment Variables
Add these environment variables in Vercel dashboard:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Payment Integration
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Shipping Integration
SHIPROCKET_EMAIL=your_shiprocket_email
SHIPROCKET_PASSWORD=your_shiprocket_password

# Application Settings
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production
```

### Step 4: Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Test the deployed application
4. Configure custom domain (optional)

## 🐳 Docker Deployment

### Dockerfile
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  octobooks:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_FIREBASE_API_KEY=${FIREBASE_API_KEY}
      - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${FIREBASE_AUTH_DOMAIN}
      - NEXT_PUBLIC_FIREBASE_PROJECT_ID=${FIREBASE_PROJECT_ID}
      - RAZORPAY_KEY_ID=${RAZORPAY_KEY_ID}
      - RAZORPAY_KEY_SECRET=${RAZORPAY_KEY_SECRET}
    restart: unless-stopped
```

## ☁️ AWS Deployment

### Using AWS Amplify
1. **Connect Repository**
   - Login to AWS Amplify Console
   - Connect your GitHub repository
   - Select the main branch

2. **Build Settings**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **Environment Variables**
   - Add all required environment variables in Amplify console
   - Ensure Firebase configuration is properly set

## 🔧 Production Optimizations

### Performance
- Enable gzip compression
- Configure CDN for static assets
- Set up image optimization
- Enable caching headers
- Monitor Core Web Vitals

### Security
- Configure HTTPS/SSL
- Set up CORS policies
- Enable security headers
- Configure rate limiting
- Set up monitoring and alerts

### Monitoring
- Set up error tracking (Sentry)
- Configure performance monitoring
- Set up uptime monitoring
- Configure log aggregation
- Set up backup strategies

## 🔍 Health Checks

### Application Health
```bash
# Check if application is running
curl https://your-domain.com/api/health

# Check database connectivity
curl https://your-domain.com/api/health/db

# Check external services
curl https://your-domain.com/api/health/services
```

### Performance Monitoring
- **Core Web Vitals**: Monitor LCP, FID, CLS
- **Page Load Times**: Track average load times
- **API Response Times**: Monitor backend performance
- **Error Rates**: Track and alert on errors

## 🚨 Troubleshooting

### Common Issues

**Build Failures**
- Check Node.js version compatibility
- Verify all environment variables are set
- Check for TypeScript errors
- Ensure all dependencies are installed

**Runtime Errors**
- Check Firebase configuration
- Verify API keys and secrets
- Check network connectivity
- Review application logs

**Performance Issues**
- Enable image optimization
- Check bundle size
- Review database queries
- Monitor memory usage

## 📊 Post-Deployment

### Monitoring Setup
1. Configure error tracking
2. Set up performance monitoring
3. Enable uptime monitoring
4. Configure backup strategies
5. Set up CI/CD pipelines

### SEO Configuration
1. Submit sitemap to search engines
2. Configure Google Analytics
3. Set up Google Search Console
4. Configure social media meta tags
5. Enable structured data

### Security Hardening
1. Configure security headers
2. Set up rate limiting
3. Enable CSRF protection
4. Configure content security policy
5. Regular security audits

---

For additional support, contact our DevOps team at devops@octobooks.com
