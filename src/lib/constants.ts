// Constants for Octobooks

export const BOOK_CATEGORIES = [
  'Fiction',
  'Non-Fiction',
  'Educational',
  'Children',
  'Professional',
  'Law',
  'Training',
  'Science',
  'Technology',
  'History',
  'Biography',
  'Self-Help',
  'Business',
  'Health',
  'Cooking',
  'Travel',
  'Art',
  'Religion',
  'Philosophy',
  'Poetry'
] as const;

export const BOOK_FORMATS = [
  'Paperback',
  'Hardcover',
  'eBook',
  'Audiobook'
] as const;

export const LANGUAGES = [
  'English',
  'Hindi',
  'Bengali',
  'Tamil',
  'Telugu',
  'Marathi',
  'Gujarati',
  'Kannada',
  'Malayalam',
  'Punjabi',
  'Urdu',
  'Sanskrit'
] as const;

export const ORDER_STATUS = [
  'processing',
  'confirmed',
  'shipped',
  'delivered',
  'cancelled',
  'returned'
] as const;

export const PAYMENT_STATUS = [
  'pending',
  'paid',
  'failed',
  'refunded'
] as const;

export const USER_ROLES = [
  'customer',
  'author',
  'publisher',
  'admin'
] as const;

export const SORT_OPTIONS = [
  { value: 'bestselling', label: 'Best Selling' },
  { value: 'newest', label: 'Newest First' },
  { value: 'price_low_high', label: 'Price: Low to High' },
  { value: 'price_high_low', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'title_az', label: 'Title: A to Z' }
] as const;

export const PRICE_RANGES = [
  { min: 0, max: 200, label: 'Under ₹200' },
  { min: 200, max: 500, label: '₹200 - ₹500' },
  { min: 500, max: 1000, label: '₹500 - ₹1000' },
  { min: 1000, max: 2000, label: '₹1000 - ₹2000' },
  { min: 2000, max: Infinity, label: 'Above ₹2000' }
] as const;

export const ITEMS_PER_PAGE = 20;

export const FREE_SHIPPING_THRESHOLD = 499;

export const PLATFORM_FEE_PERCENTAGE = 10;

export const DEFAULT_AUTHOR_ROYALTY_RATE = 0.15; // 15%
export const DEFAULT_PUBLISHER_ROYALTY_RATE = 0.20; // 20%

export const RAZORPAY_CURRENCY = 'INR';

export const NOTIFICATION_TYPES = [
  'order_placed',
  'order_shipped',
  'order_delivered',
  'payment_received',
  'book_published',
  'royalty_paid',
  'new_review',
  'promotional'
] as const;
