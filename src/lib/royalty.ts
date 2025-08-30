import {
  collection,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  query,
  where,
  getDocs,
  writeBatch,
  increment,
  Timestamp,
  orderBy
} from 'firebase/firestore';
import { db } from './firebase';
import { Book, Author, Publisher, Sale, Order } from '@/types';
import { 
  PLATFORM_FEE_PERCENTAGE, 
  DEFAULT_AUTHOR_ROYALTY_RATE, 
  DEFAULT_PUBLISHER_ROYALTY_RATE 
} from './constants';

export interface RoyaltyCalculation {
  saleAmount: number;
  platformFee: number;
  authorRoyalty: number;
  publisherShare: number;
  netAmount: number;
}

export interface PayoutRequest {
  requestId: string;
  userId: string;
  userName: string;
  role: 'author' | 'publisher';
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  requestedAt: string;
  processedAt?: string;
  paymentMethod: 'bank_transfer' | 'upi' | 'paypal';
  paymentDetails: {
    accountNumber?: string;
    ifscCode?: string;
    upiId?: string;
    paypalEmail?: string;
  };
  notes?: string;
}

// Calculate royalties for a book sale
export const calculateRoyalties = (
  finalPrice: number,
  quantity: number,
  authorRoyaltyRate?: number,
  publisherRoyaltyRate?: number
): RoyaltyCalculation => {
  const saleAmount = finalPrice * quantity;
  const platformFee = saleAmount * (PLATFORM_FEE_PERCENTAGE / 100);
  
  const authorRate = authorRoyaltyRate || DEFAULT_AUTHOR_ROYALTY_RATE;
  const publisherRate = publisherRoyaltyRate || DEFAULT_PUBLISHER_ROYALTY_RATE;
  
  const authorRoyalty = saleAmount * authorRate;
  const publisherShare = saleAmount * publisherRate;
  
  const netAmount = saleAmount - platformFee - authorRoyalty - publisherShare;

  return {
    saleAmount,
    platformFee,
    authorRoyalty,
    publisherShare,
    netAmount
  };
};

// Record sale and allocate royalties
export const recordSaleAndAllocateRoyalties = async (
  order: Order,
  book: Book,
  quantity: number
): Promise<string> => {
  try {
    const batch = writeBatch(db);

    // Get author and publisher details
    const [authorDoc, publisherDoc] = await Promise.all([
      getDoc(doc(db, 'authors', book.authorId)),
      getDoc(doc(db, 'publishers', book.publisherId))
    ]);

    if (!authorDoc.exists() || !publisherDoc.exists()) {
      throw new Error('Author or publisher not found');
    }

    const authorData = authorDoc.data();
    const publisherData = publisherDoc.data();

    // Use default royalty rates if not specified
    const authorRoyaltyRate = authorData?.royaltyRate || DEFAULT_AUTHOR_ROYALTY_RATE;
    const publisherRoyaltyRate = publisherData?.royaltyRate || DEFAULT_PUBLISHER_ROYALTY_RATE;

    // Calculate royalties
    const royalties = calculateRoyalties(
      book.finalPrice,
      quantity,
      authorRoyaltyRate,
      publisherRoyaltyRate
    );

    // Create sale record
    const saleData: Omit<Sale, 'saleId'> = {
      bookId: book.bookId,
      bookTitle: book.title,
      authorId: book.authorId,
      authorName: authorData?.name || 'Unknown Author',
      publisherId: book.publisherId,
      publisherName: publisherData?.name || 'Unknown Publisher',
      orderId: order.orderId,
      quantity,
      saleAmount: royalties.saleAmount,
      authorRoyalty: royalties.authorRoyalty,
      publisherShare: royalties.publisherShare,
      platformFee: royalties.platformFee,
      date: Timestamp.now().toDate().toISOString()
    };

    const saleRef = doc(collection(db, 'sales'));
    batch.set(saleRef, saleData);

    // Update author earnings
    const authorRef = doc(db, 'authors', book.authorId);
    batch.update(authorRef, {
      totalEarnings: increment(royalties.authorRoyalty),
      updatedAt: Timestamp.now().toDate().toISOString()
    });

    // Update publisher earnings
    const publisherRef = doc(db, 'publishers', book.publisherId);
    batch.update(publisherRef, {
      totalEarnings: increment(royalties.publisherShare),
      updatedAt: Timestamp.now().toDate().toISOString()
    });

    // Update user wallet if author is also a user
    const authorEmail = authorData?.email;
    if (authorEmail) {
      const userQuery = query(
        collection(db, 'users'),
        where('email', '==', authorEmail)
      );
      const userSnapshot = await getDocs(userQuery);
      
      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        const userRef = doc(db, 'users', userDoc.id);
        batch.update(userRef, {
          walletBalance: increment(royalties.authorRoyalty),
          updatedAt: Timestamp.now().toDate().toISOString()
        });
      }
    }

    await batch.commit();
    return saleRef.id;
  } catch (error) {
    console.error('Error recording sale and allocating royalties:', error);
    throw error;
  }
};

// Get author royalty balance
export const getAuthorRoyaltyBalance = async (authorId: string): Promise<number> => {
  try {
    const q = query(
      collection(db, 'sales'),
      where('authorId', '==', authorId)
    );
    
    const snapshot = await getDocs(q);
    const totalRoyalty = snapshot.docs.reduce((sum, doc) => {
      const sale = doc.data() as Sale;
      return sum + (sale.authorRoyalty || 0);
    }, 0);

    return totalRoyalty;
  } catch (error) {
    console.error('Error getting author royalty balance:', error);
    throw error;
  }
};

// Get publisher earnings
export const getPublisherEarnings = async (publisherId: string): Promise<number> => {
  try {
    const q = query(
      collection(db, 'sales'),
      where('publisherId', '==', publisherId)
    );
    
    const snapshot = await getDocs(q);
    const totalEarnings = snapshot.docs.reduce((sum, doc) => {
      const sale = doc.data() as Sale;
      return sum + (sale.publisherShare || 0);
    }, 0);

    return totalEarnings;
  } catch (error) {
    console.error('Error getting publisher earnings:', error);
    throw error;
  }
};

// Create payout request
export const createPayoutRequest = async (
  userId: string,
  userName: string,
  role: 'author' | 'publisher',
  amount: number,
  paymentMethod: 'bank_transfer' | 'upi' | 'paypal',
  paymentDetails: any
): Promise<string> => {
  try {
    const payoutRequest: Omit<PayoutRequest, 'requestId'> = {
      userId,
      userName,
      role,
      amount,
      status: 'pending',
      paymentMethod,
      paymentDetails,
      requestedAt: Timestamp.now().toDate().toISOString(),
      notes: `Payout request for ${role} earnings`
    };

    const docRef = await addDoc(collection(db, 'payoutRequests'), payoutRequest);
    return docRef.id;
  } catch (error) {
    console.error('Error creating payout request:', error);
    throw error;
  }
};

// Process payout request
export const processPayoutRequest = async (
  requestId: string,
  status: 'approved' | 'rejected',
  notes?: string
): Promise<void> => {
  try {
    const requestRef = doc(db, 'payoutRequests', requestId);
    await updateDoc(requestRef, {
      status,
      processedAt: Timestamp.now().toDate().toISOString(),
      notes
    });

    if (status === 'approved') {
      // Here you would integrate with your payment gateway (Razorpay, PayPal, etc.)
      // to actually process the payment
      console.log(`Payout approved for request ${requestId}`);
    }
  } catch (error) {
    console.error('Error processing payout request:', error);
    throw error;
  }
};

// Get all payout requests
export const getPayoutRequests = async (
  status?: PayoutRequest['status'],
  role?: PayoutRequest['role']
): Promise<PayoutRequest[]> => {
  try {
    let q = query(collection(db, 'payoutRequests'));

    if (status) {
      q = query(q, where('status', '==', status));
    }
    
    if (role) {
      q = query(q, where('role', '==', role));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      requestId: doc.id,
      ...doc.data()
    })) as PayoutRequest[];
  } catch (error) {
    console.error('Error getting payout requests:', error);
    throw error;
  }
};

// Get sales report with royalties
export const getSalesReport = async (
  startDate?: Date,
  endDate?: Date,
  authorId?: string,
  publisherId?: string
): Promise<Sale[]> => {
  try {
    let q = query(collection(db, 'sales'));

    if (startDate && endDate) {
      q = query(q, 
        where('date', '>=', startDate.toISOString()),
        where('date', '<=', endDate.toISOString())
      );
    }

    if (authorId) {
      q = query(q, where('authorId', '==', authorId));
    }

    if (publisherId) {
      q = query(q, where('publisherId', '==', publisherId));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      saleId: doc.id,
      ...doc.data()
    })) as Sale[];
  } catch (error) {
    console.error('Error getting sales report:', error);
    throw error;
  }
};

// Export sales data to CSV
export const exportSalesToCSV = async (
  sales: Sale[],
  includeRoyalties: boolean = true
): Promise<string> => {
  const headers = [
    'Sale ID',
    'Book ID',
    'Order ID',
    'Quantity',
    'Sale Amount',
    'Platform Fee',
    'Author Royalty',
    'Publisher Share',
    'Date'
  ];

  const rows = sales.map(sale => [
    sale.saleId,
    sale.bookId,
    sale.orderId,
    sale.quantity.toString(),
    sale.saleAmount.toString(),
    sale.platformFee?.toString() || '0',
    sale.authorRoyalty?.toString() || '0',
    sale.publisherShare?.toString() || '0',
    sale.date
  ]);

  return [headers, ...rows].map(row => row.join(',')).join('\n');
};

// Get sales report for a specific publisher
export const getPublisherSalesReport = async (publisherId: string): Promise<Sale[]> => {
  try {
    const q = query(
      collection(db, 'sales'),
      where('publisherId', '==', publisherId),
      orderBy('date', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      saleId: doc.id,
      ...doc.data()
    })) as Sale[];
  } catch (error) {
    console.error('Error fetching publisher sales report:', error);
    throw error;
  }
};

// Export publisher sales to CSV
export const exportPublisherSalesToCSV = async (sales: Sale[]): Promise<string> => {
  const headers = [
    'Sale ID',
    'Book Title',
    'Author',
    'Publisher',
    'Quantity',
    'Sale Amount',
    'Platform Fee',
    'Author Royalty',
    'Publisher Share',
    'Date'
  ];

  const rows = sales.map(sale => [
    sale.saleId,
    sale.bookTitle,
    sale.authorName,
    sale.publisherName,
    sale.quantity.toString(),
    sale.saleAmount.toString(),
    sale.platformFee?.toString() || '0',
    sale.authorRoyalty?.toString() || '0',
    sale.publisherShare?.toString() || '0',
    sale.date
  ]);

  return [headers, ...rows].map(row => row.join(',')).join('\n');
};

// Get sales report for a specific author
export const getAuthorSalesReport = async (authorId: string): Promise<Sale[]> => {
  try {
    const q = query(
      collection(db, 'sales'),
      where('authorId', '==', authorId),
      orderBy('date', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      saleId: doc.id,
      ...doc.data()
    })) as Sale[];
  } catch (error) {
    console.error('Error fetching author sales report:', error);
    throw error;
  }
};

// Export author sales to CSV
export const exportAuthorSalesToCSV = async (sales: Sale[]): Promise<string> => {
  const headers = [
    'Sale ID',
    'Book Title',
    'Publisher',
    'Quantity',
    'Sale Amount',
    'Platform Fee',
    'Author Royalty',
    'Publisher Share',
    'Date'
  ];

  const rows = sales.map(sale => [
    sale.saleId,
    sale.bookTitle,
    sale.publisherName,
    sale.quantity.toString(),
    sale.saleAmount.toString(),
    sale.platformFee?.toString() || '0',
    sale.authorRoyalty?.toString() || '0',
    sale.publisherShare?.toString() || '0',
    sale.date
  ]);

  return [headers, ...rows].map(row => row.join(',')).join('\n');
};