import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
  writeBatch,
  increment
} from 'firebase/firestore';
import { db } from './firebase';
import { Book, Order, Review, Sale, Publisher, Author } from '@/types';

// Books Collection
export const booksCollection = collection(db, 'books');
export const ordersCollection = collection(db, 'orders');
export const reviewsCollection = collection(db, 'reviews');
export const salesCollection = collection(db, 'sales');
export const usersCollection = collection(db, 'users');
export const publishersCollection = collection(db, 'publishers');
export const authorsCollection = collection(db, 'authors');

// Generic CRUD operations
export const createDocument = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error(`Error creating document in ${collectionName}:`, error);
    throw error;
  }
};

export const getDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error(`Error getting document from ${collectionName}:`, error);
    throw error;
  }
};

export const getDocuments = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error getting documents from ${collectionName}:`, error);
    throw error;
  }
};

export const updateDocument = async (collectionName: string, docId: string, data: any) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error);
    throw error;
  }
};

export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error);
    throw error;
  }
};

// Book-specific operations
export const getBooks = async (
  categoryFilter?: string,
  sortBy: string = 'createdAt',
  limitCount: number = 20,
  lastDoc?: QueryDocumentSnapshot<DocumentData>
) => {
  try {
    let q = query(booksCollection);

    if (categoryFilter) {
      q = query(q, where('category', '==', categoryFilter));
    }

    q = query(q, orderBy(sortBy, 'desc'), limit(limitCount));

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const querySnapshot = await getDocs(q);
    const books = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Book[];

    return {
      books,
      lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
      hasMore: querySnapshot.docs.length === limitCount
    };
  } catch (error) {
    console.error('Error getting books:', error);
    throw error;
  }
};

export const getBestSellers = async (limitCount: number = 10) => {
  try {
    const q = query(
      booksCollection,
      where('bestseller', '==', true),
      orderBy('rating', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Book[];
  } catch (error) {
    console.error('Error getting best sellers:', error);
    throw error;
  }
};

export const getNewArrivals = async (limitCount: number = 12) => {
  try {
    const q = query(
      booksCollection,
      where('newArrival', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Book[];
  } catch (error) {
    console.error('Error getting new arrivals:', error);
    throw error;
  }
};

// Search books
export const searchBooks = async (searchTerm: string, limitCount: number = 20) => {
  try {
    // Note: Firestore doesn't support full-text search natively
    // For production, consider using Algolia or implement a more sophisticated search
    const q = query(
      booksCollection,
      orderBy('title'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const allBooks = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Book[];

    // Client-side filtering (for demo purposes)
    const filteredBooks = allBooks.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.authorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredBooks;
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
};

// Order operations
export const createOrder = async (orderData: Omit<Order, 'orderId' | 'createdAt' | 'updatedAt'>) => {
  try {
    const orderId = await createDocument('orders', orderData);
    
    // Update book stock
    const batch = writeBatch(db);
    
    for (const item of orderData.books) {
      const bookRef = doc(db, 'books', item.bookId);
      batch.update(bookRef, {
        stock: increment(-item.quantity)
      });
    }
    
    await batch.commit();
    
    return orderId;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Review operations
export const addReview = async (reviewData: Omit<Review, 'reviewId' | 'createdAt'>) => {
  try {
    const reviewId = await createDocument('reviews', reviewData);
    
    // Update book rating (simplified - in production, use Cloud Functions)
    const bookRef = doc(db, 'books', reviewData.bookId);
    const bookSnap = await getDoc(bookRef);
    
    if (bookSnap.exists()) {
      const bookData = bookSnap.data();
      const currentRating = bookData.rating || 0;
      const currentCount = bookData.reviewsCount || 0;
      
      const newCount = currentCount + 1;
      const newRating = ((currentRating * currentCount) + reviewData.rating) / newCount;
      
      await updateDoc(bookRef, {
        rating: Math.round(newRating * 10) / 10,
        reviewsCount: newCount
      });
    }
    
    return reviewId;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};
