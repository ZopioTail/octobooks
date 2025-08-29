# 📚 Octobooks - Modern Online Bookstore

A comprehensive, mobile-optimized online bookstore built with Next.js, Firebase, and modern web technologies.

## ✨ Features

### Customer Features
- 🏠 **Enhanced Home Page** with hero banners, featured books, top authors, publisher brands
- 🔍 **Advanced Search** with filters by price, rating, genre, language, and format
- 📖 **Book Catalog** with grid/list views, sorting, and pagination
- 🛒 **Smart Shopping Cart** with save for later, promo codes, and secure checkout
- 👤 **Customer Dashboard** with reading goals, order tracking, and personalized recommendations
- 📱 **Mobile-First Design** with responsive UI, dark mode, and smooth animations
- ⭐ **Reviews & Ratings** with detailed feedback and helpful voting
- 🎯 **Reading Goals** with progress tracking and achievement badges
- 💝 **Wishlist Management** with easy organization and sharing
- 📦 **Order Tracking** with real-time updates and delivery notifications

### Author Features
- ✍️ **Author Dashboard** with comprehensive analytics and sales tracking
- 📚 **Book Management** with easy submission and editing tools
- 💰 **Earnings Tracking** with detailed royalty reports and payment history
- 👥 **Reader Engagement** through reviews, ratings, and feedback
- 📈 **Performance Analytics** with sales trends and reader insights
- 🎨 **Author Profile** with bio, social links, and book showcase

### Publisher Features
- 🏢 **Publisher Portal** with catalog and author relationship management
- 📊 **Advanced Analytics** with sales performance and market insights
- 📚 **Bulk Operations** for efficient large catalog management
- 💼 **Revenue Tracking** with detailed financial reports and commissions
- 👥 **Author Management** for onboarding and partnership management
- 🎯 **Marketing Tools** with promotional campaigns and featured placements
- 💰 **Royalty Reports** - Monthly/quarterly earnings reports
- 💬 **Admin Communication** - Direct messaging with admin

### Author Features
- 📈 **Sales Dashboard** - Real-time sales tracking
- 💵 **Royalty Tracking** - Per book and platform earnings
- 📊 **Analytics** - Daily/weekly/monthly sales charts
- 📝 **Manuscript Submission** - Submit new works to publishers

### Admin Features
- 🎛️ **Complete Management** - Books, users, orders, inventory
- 📊 **Analytics & Reports** - Revenue, sales, user analytics
- 🎯 **Marketing Tools** - Discounts, coupons, campaigns
- 🎨 **Content Management** - Homepage banners, categories, blog
- 🎧 **Customer Support** - Ticketing and communication system

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: TailwindCSS, Framer Motion
- **Backend**: Firebase (Auth, Firestore, Storage, Functions)
- **Payments**: Razorpay
- **Shipping**: Shiprocket API
- **Analytics**: Google Analytics
- **Deployment**: Vercel / Firebase Hosting

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase account
- Razorpay account
- Shiprocket account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/octobooks.git
cd octobooks
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Copy `.env.local` and fill in your credentials:
```bash
cp .env.local.example .env.local
```

Required environment variables:
```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_secret

# Shiprocket
SHIPROCKET_EMAIL=your_email
SHIPROCKET_PASSWORD=your_password
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # Reusable UI components
│   ├── ui/                # Base UI components
│   ├── layout/            # Layout components
│   ├── home/              # Home page components
│   ├── auth/              # Authentication components
│   └── dashboard/         # Dashboard components
├── contexts/              # React contexts
├── lib/                   # Utility functions and configurations
├── types/                 # TypeScript type definitions
└── hooks/                 # Custom React hooks
```

## 🔥 Firebase Setup

1. Create a new Firebase project
2. Enable Authentication (Email/Password, Google, Phone)
3. Create Firestore database
4. Enable Storage
5. Add your domain to authorized domains
6. Copy configuration to `.env.local`

## 💳 Payment Integration

The app integrates with Razorpay for secure payments:
- Credit/Debit cards
- UPI payments
- Digital wallets
- Net banking

## 📦 Shipping Integration

Shiprocket integration provides:
- Automated shipping labels
- Real-time tracking
- Multiple courier partners
- COD support

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Firebase Hosting
```bash
npm run build
firebase deploy
```

## 📱 Mobile Optimization

- Responsive design for all screen sizes
- Touch-friendly interface
- Fast loading with optimized images
- Progressive Web App (PWA) ready

## 🔒 Security Features

- Firebase Authentication
- Role-based access control
- Secure payment processing
- Data validation and sanitization
- HTTPS enforcement

## 📊 Analytics

- Google Analytics integration
- Custom event tracking
- Sales and revenue analytics
- User behavior insights

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@octobooks.com or join our Discord community.
