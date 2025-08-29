// Type definitions for Octobooks

export interface User {
  userId: string;
  name: string;
  email: string;
  role: 'customer' | 'admin' | 'author' | 'publisher';
  phone?: string;
  address?: Address;
  profileImage?: string;
  createdAt: string;
  walletBalance?: number;
  rewardsPoints?: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface Book {
  bookId: string;
  title: string;
  subtitle?: string;
  authorId: string;
  authorName?: string;
  publisherId: string;
  publisherName?: string;
  isbn: string;
  category: string;
  tags: string[];
  price: number;
  discount: number;
  finalPrice: number;
  stock: number;
  language: string;
  format: 'Paperback' | 'eBook' | 'Audiobook' | 'Hardcover';
  coverImage: string;
  description: string;
  rating: number;
  reviewsCount: number;
  bestseller: boolean;
  trending: boolean;
  newArrival: boolean;
  pageCount?: number;
  edition?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  orderId: string;
  userId: string;
  books: OrderItem[];
  totalAmount: number;
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  razorpayPaymentId?: string;
  orderStatus: 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  shiprocketTrackingId?: string;
  shippingAddress: Address;
  billingAddress?: Address;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
}

export interface OrderItem {
  bookId: string;
  title: string;
  coverImage: string;
  quantity: number;
  price: number;
  finalPrice: number;
}

export interface Sale {
  saleId: string;
  bookId: string;
  authorId: string;
  publisherId: string;
  orderId: string;
  quantity: number;
  saleAmount: number;
  authorRoyalty: number;
  publisherShare: number;
  platformFee: number;
  date: string;
}

export interface Review {
  reviewId: string;
  bookId: string;
  userId: string;
  userName: string;
  rating: number;
  reviewText: string;
  helpful: number;
  verified: boolean;
  createdAt: string;
}

export interface Publisher {
  publisherId: string;
  name: string;
  contactEmail: string;
  phone?: string;
  address?: Address;
  royaltyRate: number;
  totalBooksPublished: number;
  totalEarnings: number;
  verified: boolean;
  createdAt: string;
}

export interface Author {
  authorId: string;
  name: string;
  bio?: string;
  profileImage?: string;
  email: string;
  totalBooks: number;
  totalEarnings: number;
  verified: boolean;
  createdAt: string;
}

export interface AdminSettings {
  settingsId: string;
  siteName: string;
  logo: string;
  contactEmail: string;
  phone: string;
  taxRate: number;
  refundPolicy: string;
  termsConditions: string;
  privacyPolicy: string;
  shippingPolicy: string;
  aboutUs: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface CartItem {
  bookId: string;
  title: string;
  coverImage: string;
  price: number;
  finalPrice: number;
  quantity: number;
  stock: number;
}

export interface WishlistItem {
  bookId: string;
  title: string;
  coverImage: string;
  price: number;
  finalPrice: number;
  addedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  bookCount: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  active: boolean;
  order: number;
}
