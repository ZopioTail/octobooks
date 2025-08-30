# Octobooks - Complete Setup & Deployment Guide

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+ installed
- Firebase account
- Razorpay account (for payments)
- Shiprocket account (for shipping)

### 2. Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd octobooks

# Install dependencies
npm install
```

### 3. Environment Setup
```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your actual credentials
```

## 🔥 Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create Project"
3. Name your project (e.g., "octobooks")
4. Enable Google Analytics (optional)
5. Create project

### 2. Enable Authentication
1. Go to Authentication → Sign-in method
2. Enable Email/Password
3. Enable Google (optional)
4. Enable Phone (optional)

### 3. Create Firestore Database
1. Go to Firestore Database → Create Database
2. Start in production mode
3. Choose location (preferably close to your users)
4. Create database

### 4. Enable Storage
1. Go to Storage → Get Started
2. Choose location
3. Set security rules

### 5. Get Configuration
1. Go to Project Settings → General
2. Scroll to "Your apps" section
3. Click "Web" icon (</>)
4. Register app with name "Octobooks Web"
5. Copy configuration values to `.env.local`

### 6. Security Rules
Add these Firestore rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null;
    }
    
    // Books are readable by all, writable by admins/authors/publishers
    match /books/{bookId} {
      allow read: if true;
      allow write: if request.auth != null && 
        (request.auth.token.role == 'admin' || 
         request.auth.token.role == 'author' || 
         request.auth.token.role == 'publisher');
    }
    
    // Orders: users can read their own orders, admins can read all
    match /orders/{orderId} {
      allow read: if request.auth != null && 
        (request.auth.token.role == 'admin' || 
         resource.data.userId == request.auth.uid);
      allow write: if request.auth != null;
    }
  }
}
```

## 💳 Payment Integration (Razorpay)

### 1. Create Razorpay Account
1. Go to [Razorpay Dashboard](https://razorpay.com/)
2. Sign up for business account
3. Complete KYC verification

### 2. Get API Keys
1. Go to Settings → API Keys
2. Generate new key pair
3. Copy Key ID and Key Secret
4. Add to `.env.local`:
   ```
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_id_here
   RAZORPAY_KEY_SECRET=your_key_secret_here
   ```

### 3. Webhook Setup
1. Go to Settings → Webhooks
2. Add webhook URL: `https://yourdomain.com/api/webhooks/razorpay`
3. Configure events: payment.captured, payment.failed

## 📦 Shipping Integration (Shiprocket)

### 1. Create Shiprocket Account
1. Go to [Shiprocket](https://www.shiprocket.in/)
2. Sign up for business account
3. Complete registration

### 2. Get API Credentials
1. Go to Settings → API Settings
2. Generate API token
3. Copy email, password, and token
4. Add to `.env.local`:
   ```
   SHIPROCKET_EMAIL=your_email_here
   SHIPROCKET_PASSWORD=your_password_here
   SHIPROCKET_TOKEN=your_token_here
   ```

## 🎨 Customization

### 1. Branding
Edit these files:
- [`src/app/layout.tsx`](src/app/layout.tsx) - Site metadata and title
- [`src/components/layout/Header.tsx`](src/components/layout/Header.tsx) - Navigation and logo
- [`src/components/layout/Footer.tsx`](src/components/layout/Footer.tsx) - Footer content

### 2. Colors & Theme
Edit Tailwind configuration:
- [`tailwind.config.js`](tailwind.config.js) - Color scheme and design system

### 3. Content Management
- Homepage content: [`src/app/page.tsx`](src/app/page.tsx)
- About page: [`src/app/about/page.tsx`](src/app/about/page.tsx)
- Policies: [`src/app/privacy/page.tsx`](src/app/privacy/page.tsx), [`src/app/terms/page.tsx`](src/app/terms/page.tsx)

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard
```

### Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize hosting
firebase init hosting

# Build and deploy
npm run build
firebase deploy
```

### Environment Variables
Make sure to set these environment variables in your deployment platform:

**Required:**
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

**Optional but recommended:**
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `SHIPROCKET_EMAIL`
- `SHIPROCKET_PASSWORD`
- `SHIPROCKET_TOKEN`

## 🔧 Development

### Running Locally
```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Testing
```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 📊 Analytics Setup

### Google Analytics
1. Create GA4 property
2. Get Measurement ID
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

### Custom Events
The app tracks:
- Page views
- Book views
- Add to cart
- Purchases
- User signups

## 🔒 Security Checklist

- [ ] Firebase security rules configured
- [ ] Environment variables secured
- [ ] HTTPS enforced
- [ ] Input validation implemented
- [ ] XSS protection enabled
- [ ] CSRF protection implemented
- [ ] Rate limiting configured

## 🆘 Troubleshooting

### Common Issues

1. **Firebase not initializing**
   - Check environment variables
   - Verify Firebase project configuration

2. **Authentication errors**
   - Check Firebase Auth settings
   - Verify authorized domains

3. **Payment issues**
   - Verify Razorpay keys
   - Check webhook configuration

4. **Shipping errors**
   - Verify Shiprocket credentials
   - Check API connectivity

### Support
For support, contact:
- Email: support@octobooks.com
- GitHub Issues: Create issue in repository

## 📈 Performance Optimization

1. **Image Optimization**
   - Use Next.js Image component
   - Optimize book cover images

2. **Code Splitting**
   - Components are lazy-loaded
   - Routes are code-split

3. **Caching**
   - Firebase data caching
   - CDN for static assets

4. **Database Indexing**
   - Create Firestore indexes
   - Optimize queries

## 🔄 Maintenance

### Regular Tasks
- Monitor error logs
- Update dependencies
- Backup Firestore data
- Review security settings
- Test payment flow

### Updates
```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Run tests after updates
npm test
```

## 📝 License & Legal

- Ensure you have proper licenses for all content
- Update privacy policy and terms of service
- Configure refund and shipping policies
- Set up proper tax calculations

---

**Last Updated: August 30, 2024**

For the latest updates, check the GitHub repository or contact support.