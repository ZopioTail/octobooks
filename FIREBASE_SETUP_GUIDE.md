# Firebase Setup Guide for Octobooks

## 1. Firebase Project Setup

### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project named "octobooks"
3. Enable Firestore Database
4. Enable Authentication (Email/Password)

### Configure Firestore Security Rules
1. In Firebase Console, go to Firestore Database → Rules
2. Copy and paste the content from `firestore.rules` (for development)
3. For production, use `firestore.production.rules`

### Development Rules (firestore.rules)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Production Rules (firestore.production.rules)
Use the production rules file for proper role-based security.

## 2. Environment Configuration

### Update .env File
Replace the placeholder values in `.env` with your actual Firebase credentials:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Get Firebase Config
1. Go to Firebase Console → Project Settings
2. Under "Your apps", add a web app
3. Copy the config values into your `.env` file

## 3. Initial Admin User Setup

### Method 1: Firebase Console
1. Go to Firebase Console → Authentication → Users
2. Add a new user with email: `admin@octobooks.com`
3. Set a secure password

### Method 2: Admin Panel
1. Start the application: `npm run dev`
2. Navigate to `/admin/login`
3. Use demo credentials:
   - Email: `admin@octobooks.com`
   - Password: `admin123`
4. Create a proper admin user in the User Management section

## 4. Database Structure

### Required Collections
- `users` - User profiles with role field
- `books` - Book inventory
- `orders` - Customer orders
- `reviews` - Book reviews
- `authors` - Author information
- `publishers` - Publisher information

### User Document Structure
```javascript
{
  userId: "string",
  name: "string",
  email: "string",
  role: "admin" | "author" | "publisher" | "customer",
  createdAt: "timestamp",
  lastLogin: "timestamp",
  profileImage: "string (optional)",
  isActive: boolean
}
```

## 5. Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Add all environment variables in Vercel dashboard
3. Deploy automatically

### Firebase Hosting (Alternative)
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init`
4. Deploy: `firebase deploy`

## 6. Testing

### Test Admin Login
1. Start development server: `npm run dev`
2. Navigate to: `http://localhost:3000/admin/login`
3. Use demo credentials or create new admin user

### Test Book Creation
1. Login as admin
2. Go to Books section
3. Try creating a new book
4. Verify it appears in the books list

## 7. Troubleshooting

### Common Issues

1. **Permission Denied Errors**
   - Check Firestore security rules
   - Verify user is authenticated
   - Check user role in database

2. **Build Errors**
   - Check all environment variables are set
   - Verify Firebase config is correct

3. **Authentication Issues**
   - Check Firebase Authentication is enabled
   - Verify email/password auth is enabled

### Support
For additional help, refer to:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Project README.md](README.md)