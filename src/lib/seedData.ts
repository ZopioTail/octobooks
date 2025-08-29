import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Book, User, Publisher, Author, AdminSettings } from '@/types';

// Sample books data
export const sampleBooks: Omit<Book, 'bookId'>[] = [
  {
    title: 'The Psychology of Money',
    subtitle: 'Timeless lessons on wealth, greed, and happiness',
    authorId: 'author_morgan_housel',
    authorName: 'Morgan Housel',
    publisherId: 'publisher_jaico',
    publisherName: 'Jaico Publishing House',
    isbn: '978-93-5322-581-4',
    category: 'Business',
    tags: ['Finance', 'Psychology', 'Investment', 'Money Management'],
    price: 399,
    discount: 25,
    finalPrice: 299,
    stock: 150,
    language: 'English',
    format: 'Paperback',
    coverImage: '/api/placeholder/400/600',
    description: 'Doing well with money isn\'t necessarily about what you know. It\'s about how you behave. And behavior is hard to teach, even to really smart people.',
    rating: 4.8,
    reviewsCount: 1250,
    bestseller: true,
    trending: true,
    newArrival: false,
    pageCount: 256,
    edition: '1st Edition',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    title: 'Atomic Habits',
    subtitle: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    authorId: 'author_james_clear',
    authorName: 'James Clear',
    publisherId: 'publisher_random_house',
    publisherName: 'Random House India',
    isbn: '978-1-84794-093-6',
    category: 'Self-Help',
    tags: ['Habits', 'Self-Improvement', 'Psychology', 'Productivity'],
    price: 450,
    discount: 22,
    finalPrice: 350,
    stock: 200,
    language: 'English',
    format: 'Paperback',
    coverImage: '/api/placeholder/400/600',
    description: 'No matter your goals, Atomic Habits offers a proven framework for improving--every day.',
    rating: 4.9,
    reviewsCount: 2100,
    bestseller: true,
    trending: true,
    newArrival: false,
    pageCount: 320,
    edition: '1st Edition',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  },
  {
    title: 'The Alchemist',
    subtitle: 'A Fable About Following Your Dream',
    authorId: 'author_paulo_coelho',
    authorName: 'Paulo Coelho',
    publisherId: 'publisher_harpercollins',
    publisherName: 'HarperCollins Publishers',
    isbn: '978-0-06-112241-5',
    category: 'Fiction',
    tags: ['Philosophy', 'Adventure', 'Inspiration', 'Classic'],
    price: 299,
    discount: 17,
    finalPrice: 249,
    stock: 300,
    language: 'English',
    format: 'Paperback',
    coverImage: '/api/placeholder/400/600',
    description: 'Paulo Coelho\'s masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure.',
    rating: 4.7,
    reviewsCount: 890,
    bestseller: true,
    trending: false,
    newArrival: false,
    pageCount: 163,
    edition: '25th Anniversary Edition',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z'
  }
];

// Sample authors data
export const sampleAuthors: Author[] = [
  {
    authorId: 'author_morgan_housel',
    name: 'Morgan Housel',
    bio: 'Morgan Housel is a partner at The Collaborative Fund and a former columnist at The Motley Fool and The Wall Street Journal.',
    profileImage: '/api/placeholder/200/200',
    email: 'morgan@example.com',
    totalBooks: 3,
    totalEarnings: 125000,
    verified: true,
    createdAt: '2023-12-01T00:00:00Z'
  },
  {
    authorId: 'author_james_clear',
    name: 'James Clear',
    bio: 'James Clear is an author and speaker focused on habits, decision making, and continuous improvement.',
    profileImage: '/api/placeholder/200/200',
    email: 'james@example.com',
    totalBooks: 2,
    totalEarnings: 200000,
    verified: true,
    createdAt: '2023-11-15T00:00:00Z'
  },
  {
    authorId: 'author_paulo_coelho',
    name: 'Paulo Coelho',
    bio: 'Paulo Coelho is a Brazilian lyricist and novelist, best known for his novel The Alchemist.',
    profileImage: '/api/placeholder/200/200',
    email: 'paulo@example.com',
    totalBooks: 15,
    totalEarnings: 500000,
    verified: true,
    createdAt: '2023-10-01T00:00:00Z'
  }
];

// Sample publishers data
export const samplePublishers: Publisher[] = [
  {
    publisherId: 'publisher_jaico',
    name: 'Jaico Publishing House',
    contactEmail: 'info@jaico.com',
    phone: '+91 22 6658 9999',
    royaltyRate: 0.20,
    totalBooksPublished: 45,
    totalEarnings: 750000,
    verified: true,
    createdAt: '2023-01-01T00:00:00Z'
  },
  {
    publisherId: 'publisher_random_house',
    name: 'Random House India',
    contactEmail: 'info@randomhouse.in',
    phone: '+91 11 4057 4057',
    royaltyRate: 0.25,
    totalBooksPublished: 120,
    totalEarnings: 2500000,
    verified: true,
    createdAt: '2023-01-01T00:00:00Z'
  },
  {
    publisherId: 'publisher_harpercollins',
    name: 'HarperCollins Publishers',
    contactEmail: 'info@harpercollins.co.in',
    phone: '+91 11 4175 4175',
    royaltyRate: 0.22,
    totalBooksPublished: 200,
    totalEarnings: 4000000,
    verified: true,
    createdAt: '2023-01-01T00:00:00Z'
  }
];

// Admin settings
export const adminSettings: AdminSettings = {
  settingsId: 'site_settings',
  siteName: 'Octobooks',
  logo: '/logo.png',
  contactEmail: 'support@octobooks.com',
  phone: '+91 98765 43210',
  taxRate: 0.18,
  refundPolicy: 'We offer a 7-day return policy for all books in original condition.',
  termsConditions: 'By using our service, you agree to our terms and conditions.',
  privacyPolicy: 'We respect your privacy and protect your personal information.',
  shippingPolicy: 'Free shipping on orders above ₹499. Standard delivery takes 3-7 business days.',
  aboutUs: 'Octobooks is your trusted online bookstore, connecting readers with amazing books from around the world.',
  socialLinks: {
    facebook: 'https://facebook.com/octobooks',
    twitter: 'https://twitter.com/octobooks',
    instagram: 'https://instagram.com/octobooks',
    linkedin: 'https://linkedin.com/company/octobooks'
  }
};

// Function to seed the database
export const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');

    // Seed books
    for (const book of sampleBooks) {
      await addDoc(collection(db, 'books'), book);
    }
    console.log('Books seeded successfully');

    // Seed authors
    for (const author of sampleAuthors) {
      await setDoc(doc(db, 'authors', author.authorId), author);
    }
    console.log('Authors seeded successfully');

    // Seed publishers
    for (const publisher of samplePublishers) {
      await setDoc(doc(db, 'publishers', publisher.publisherId), publisher);
    }
    console.log('Publishers seeded successfully');

    // Seed admin settings
    await setDoc(doc(db, 'admin', adminSettings.settingsId), adminSettings);
    console.log('Admin settings seeded successfully');

    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};
