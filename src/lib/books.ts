import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData
} from 'firebase/firestore';
import { db } from './firebase';
import { Book } from '@/types';

export interface BookFilters {
  category?: string;
  author?: string;
  publisher?: string;
  language?: string;
  format?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
}

export interface BookQueryOptions {
  filters?: BookFilters;
  sortBy?: 'title' | 'price' | 'rating' | 'createdAt' | 'bestseller';
  sortOrder?: 'asc' | 'desc';
  limitCount?: number;
  lastDoc?: QueryDocumentSnapshot<DocumentData>;
}

// Get books with filtering, sorting, and pagination
export const getBooks = async (options: BookQueryOptions = {}) => {
  try {
    const {
      filters = {},
      sortBy = 'createdAt',
      sortOrder = 'desc',
      limitCount = 12,
      lastDoc
    } = options;

    let q = query(collection(db, 'books'));

    // Apply filters
    if (filters.category) {
      q = query(q, where('category', '==', filters.category));
    }
    
    if (filters.author) {
      q = query(q, where('authorName', '>=', filters.author));
      q = query(q, where('authorName', '<=', filters.author + '\uf8ff'));
    }
    
    if (filters.publisher) {
      q = query(q, where('publisherName', '>=', filters.publisher));
      q = query(q, where('publisherName', '<=', filters.publisher + '\uf8ff'));
    }
    
    if (filters.language) {
      q = query(q, where('language', '==', filters.language));
    }
    
    if (filters.format) {
      q = query(q, where('format', '==', filters.format));
    }
    
    if (filters.inStock) {
      q = query(q, where('stock', '>', 0));
    }

    // Apply sorting
    q = query(q, orderBy(sortBy, sortOrder));
    
    // Apply pagination
    q = query(q, limit(limitCount));
    
    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const querySnapshot = await getDocs(q);
    const books = querySnapshot.docs.map(doc => ({
      bookId: doc.id,
      ...doc.data()
    })) as Book[];

    // Client-side filtering for price range (Firestore doesn't support range queries with other filters)
    let filteredBooks = books;
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      filteredBooks = books.filter(book => {
        const price = book.finalPrice;
        if (filters.minPrice !== undefined && price < filters.minPrice) return false;
        if (filters.maxPrice !== undefined && price > filters.maxPrice) return false;
        return true;
      });
    }

    if (filters.minRating !== undefined) {
      filteredBooks = filteredBooks.filter(book => book.rating >= filters.minRating!);
    }

    return {
      books: filteredBooks,
      lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
      hasMore: querySnapshot.docs.length === limitCount
    };
  } catch (error) {
    console.error('Error getting books:', error);
    throw error;
  }
};

// Get a single book by ID
export const getBookById = async (bookId: string): Promise<Book | null> => {
  try {
    const docRef = doc(db, 'books', bookId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        bookId: docSnap.id,
        ...docSnap.data()
      } as Book;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting book:', error);
    throw error;
  }
};

// Get best selling books
export const getBestSellers = async (limitCount: number = 10) => {
  try {
    const q = query(
      collection(db, 'books'),
      where('bestseller', '==', true),
      orderBy('rating', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      bookId: doc.id,
      ...doc.data()
    })) as Book[];
  } catch (error) {
    console.error('Error getting best sellers:', error);
    throw error;
  }
};

// Get new arrivals
export const getNewArrivals = async (limitCount: number = 12) => {
  try {
    const q = query(
      collection(db, 'books'),
      where('newArrival', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      bookId: doc.id,
      ...doc.data()
    })) as Book[];
  } catch (error) {
    console.error('Error getting new arrivals:', error);
    throw error;
  }
};

// Get trending books
export const getTrendingBooks = async (limitCount: number = 12) => {
  try {
    const q = query(
      collection(db, 'books'),
      where('trending', '==', true),
      orderBy('rating', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      bookId: doc.id,
      ...doc.data()
    })) as Book[];
  } catch (error) {
    console.error('Error getting trending books:', error);
    throw error;
  }
};

// Search books
export const searchBooks = async (searchTerm: string, limitCount: number = 20) => {
  try {
    // For demo purposes, we'll get all books and filter client-side
    // In production, use Algolia or implement proper full-text search
    const q = query(
      collection(db, 'books'),
      limit(100) // Get more books for better search results
    );
    
    const querySnapshot = await getDocs(q);
    const allBooks = querySnapshot.docs.map(doc => ({
      bookId: doc.id,
      ...doc.data()
    })) as Book[];

    // Client-side search
    const searchTermLower = searchTerm.toLowerCase();
    const filteredBooks = allBooks.filter(book =>
      book.title.toLowerCase().includes(searchTermLower) ||
      book.authorName?.toLowerCase().includes(searchTermLower) ||
      book.publisherName?.toLowerCase().includes(searchTermLower) ||
      book.category.toLowerCase().includes(searchTermLower) ||
      book.tags.some(tag => tag.toLowerCase().includes(searchTermLower)) ||
      book.isbn.includes(searchTerm)
    );

    return filteredBooks.slice(0, limitCount);
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
};

// Get related books (by category and author)
export const getRelatedBooks = async (bookId: string, category: string, authorId: string, limitCount: number = 6) => {
  try {
    // Get books from same category
    const categoryQuery = query(
      collection(db, 'books'),
      where('category', '==', category),
      where('bookId', '!=', bookId),
      orderBy('rating', 'desc'),
      limit(limitCount)
    );

    const categorySnapshot = await getDocs(categoryQuery);
    let relatedBooks = categorySnapshot.docs.map(doc => ({
      bookId: doc.id,
      ...doc.data()
    })) as Book[];

    // If we don't have enough books from the same category, get books from the same author
    if (relatedBooks.length < limitCount) {
      const authorQuery = query(
        collection(db, 'books'),
        where('authorId', '==', authorId),
        where('bookId', '!=', bookId),
        orderBy('rating', 'desc'),
        limit(limitCount - relatedBooks.length)
      );

      const authorSnapshot = await getDocs(authorQuery);
      const authorBooks = authorSnapshot.docs.map(doc => ({
        bookId: doc.id,
        ...doc.data()
      })) as Book[];

      // Merge and remove duplicates
      const bookIds = new Set(relatedBooks.map(book => book.bookId));
      const uniqueAuthorBooks = authorBooks.filter(book => !bookIds.has(book.bookId));
      relatedBooks = [...relatedBooks, ...uniqueAuthorBooks];
    }

    return relatedBooks.slice(0, limitCount);
  } catch (error) {
    console.error('Error getting related books:', error);
    throw error;
  }
};
