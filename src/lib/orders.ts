import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { Order, OrderStatus, PaymentStatus } from '@/types';

// Create a new order
export const createOrder = async (orderData: Omit<Order, 'orderId' | 'createdAt' | 'updatedAt'>) => {
  try {
    const order = {
      ...orderData,
      createdAt: Timestamp.now().toDate().toISOString(),
      updatedAt: Timestamp.now().toDate().toISOString()
    };

    const docRef = await addDoc(collection(db, 'orders'), order);
    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Get orders for a user
export const getUserOrders = async (userId: string, limitCount: number = 20) => {
  try {
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      orderId: doc.id,
      ...doc.data()
    })) as Order[];
  } catch (error) {
    console.error('Error getting user orders:', error);
    throw error;
  }
};

// Get all orders (admin)
export const getAllOrders = async (status?: OrderStatus, limitCount: number = 50) => {
  try {
    let q = query(
      collection(db, 'orders'),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    if (status) {
      q = query(
        collection(db, 'orders'),
        where('status', '==', status),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      orderId: doc.id,
      ...doc.data()
    })) as Order[];
  } catch (error) {
    console.error('Error getting all orders:', error);
    throw error;
  }
};

// Update order status
export const updateOrderStatus = async (orderId: string, status: OrderStatus, trackingNumber?: string) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    const updateData: any = {
      status,
      updatedAt: Timestamp.now().toDate().toISOString()
    };

    if (trackingNumber) {
      updateData.trackingNumber = trackingNumber;
    }

    await updateDoc(orderRef, updateData);
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

// Update payment status
export const updatePaymentStatus = async (orderId: string, paymentStatus: PaymentStatus) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      paymentStatus,
      updatedAt: Timestamp.now().toDate().toISOString()
    });
  } catch (error) {
    console.error('Error updating payment status:', error);
    throw error;
  }
};

// Get order by ID
export const getOrderById = async (orderId: string): Promise<Order | null> => {
  try {
    const docRef = doc(db, 'orders', orderId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        orderId: docSnap.id,
        ...docSnap.data()
      } as Order;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting order:', error);
    throw error;
  }
};

// Get orders by status
export const getOrdersByStatus = async (status: OrderStatus, limitCount: number = 20) => {
  try {
    const q = query(
      collection(db, 'orders'),
      where('status', '==', status),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      orderId: doc.id,
      ...doc.data()
    })) as Order[];
  } catch (error) {
    console.error('Error getting orders by status:', error);
    throw error;
  }
};

// Calculate order analytics
export const getOrderAnalytics = async (startDate?: Date, endDate?: Date) => {
  try {
    let q = query(collection(db, 'orders'));

    if (startDate && endDate) {
      q = query(
        collection(db, 'orders'),
        where('createdAt', '>=', startDate.toISOString()),
        where('createdAt', '<=', endDate.toISOString())
      );
    }

    const querySnapshot = await getDocs(q);
    const orders = querySnapshot.docs.map(doc => doc.data()) as Order[];

    const analytics = {
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
      averageOrderValue: orders.length > 0 ? orders.reduce((sum, order) => sum + order.total, 0) / orders.length : 0,
      ordersByStatus: {
        pending: orders.filter(o => o.status === 'pending').length,
        confirmed: orders.filter(o => o.status === 'confirmed').length,
        processing: orders.filter(o => o.status === 'processing').length,
        shipped: orders.filter(o => o.status === 'shipped').length,
        delivered: orders.filter(o => o.status === 'delivered').length,
        cancelled: orders.filter(o => o.status === 'cancelled').length,
        refunded: orders.filter(o => o.status === 'refunded').length
      },
      paymentMethods: {
        razorpay: orders.filter(o => o.paymentMethod === 'razorpay').length,
        cod: orders.filter(o => o.paymentMethod === 'cod').length
      }
    };

    return analytics;
  } catch (error) {
    console.error('Error calculating order analytics:', error);
    throw error;
  }
};
