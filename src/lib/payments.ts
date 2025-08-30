import { createOrder } from './firestore';
import { recordSaleAndAllocateRoyalties } from './royalty';
import { getBookById } from './books';
import { Order, OrderItem } from '@/types';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface OrderData {
  userId: string;
  books: Array<{
    bookId: string;
    title: string;
    quantity: number;
    finalPrice: number;
    coverImage: string;
    price: number;
  }>;
  shippingAddress: {
    name: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  paymentMethod: 'razorpay' | 'cod';
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

// Load Razorpay script
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Process Razorpay payment
export const processRazorpayPayment = async (orderData: OrderData): Promise<void> => {
  try {
    // Load Razorpay script
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      throw new Error('Failed to load Razorpay script');
    }

    // Create order in backend (this would be an API call in production)
    const razorpayOrderId = `order_${Date.now()}`;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderData.total * 100, // Amount in paise
      currency: 'INR',
      name: 'Octobooks',
      description: `Order for ${orderData.books.length} book(s)`,
      order_id: razorpayOrderId,
      prefill: {
        name: orderData.shippingAddress.name,
        email: orderData.shippingAddress.email,
        contact: orderData.shippingAddress.phone,
      },
      theme: {
        color: '#2563eb', // Blue-600
      },
      handler: async (response: any) => {
        try {
          // Verify payment (this would be done on backend in production)
          console.log('Payment successful:', response);
          
          // Create order in Firestore
          const orderDataForFirestore = {
            userId: orderData.userId,
            books: orderData.books.map(book => ({
              bookId: book.bookId,
              title: book.title,
              quantity: book.quantity,
              finalPrice: book.finalPrice,
              coverImage: book.coverImage,
              price: book.price
            } as OrderItem)),
            shippingAddress: orderData.shippingAddress,
            paymentMethod: 'razorpay' as const,
            paymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            subtotal: orderData.subtotal,
            shipping: orderData.shipping,
            tax: orderData.tax,
            total: orderData.total,
            orderStatus: 'confirmed' as const,
            paymentStatus: 'paid' as const
          };

          const orderId = await createOrder(orderDataForFirestore);
          
          // Create complete order object for royalty allocation
          const completeOrder: Order = {
            orderId,
            ...orderDataForFirestore,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };

          // Allocate royalties for each book in the order
          for (const item of orderData.books) {
            const book = await getBookById(item.bookId);
            if (book) {
              await recordSaleAndAllocateRoyalties(
                completeOrder,
                book,
                item.quantity
              );
            }
          }
          
          // Redirect to success page
          window.location.href = '/order-success';
        } catch (error) {
          console.error('Error processing order:', error);
          alert('Order processing failed. Please contact support.');
        }
      },
      modal: {
        ondismiss: () => {
          console.log('Payment cancelled by user');
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error('Payment processing error:', error);
    throw error;
  }
};

// Process COD order
export const processCODOrder = async (orderData: OrderData): Promise<void> => {
  try {
    const orderDataForFirestore = {
      userId: orderData.userId,
      books: orderData.books.map(book => ({
        bookId: book.bookId,
        title: book.title,
        quantity: book.quantity,
        finalPrice: book.finalPrice,
        coverImage: book.coverImage,
        price: book.price
      } as OrderItem)),
      shippingAddress: orderData.shippingAddress,
      paymentMethod: 'cod' as const,
      subtotal: orderData.subtotal,
      shipping: orderData.shipping,
      tax: orderData.tax,
      total: orderData.total,
      orderStatus: 'confirmed' as const,
      paymentStatus: 'pending' as const
    };

    const orderId = await createOrder(orderDataForFirestore);
    
    // Create complete order object for royalty allocation
    const completeOrder: Order = {
      orderId,
      ...orderDataForFirestore,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Allocate royalties for each book in the order
    for (const item of orderData.books) {
      const book = await getBookById(item.bookId);
      if (book) {
        await recordSaleAndAllocateRoyalties(
          completeOrder,
          book,
          item.quantity
        );
      }
    }
    
    // Redirect to success page
    window.location.href = '/order-success';
  } catch (error) {
    console.error('Error processing COD order:', error);
    throw error;
  }
};

// Verify payment (would be implemented on backend)
export const verifyPayment = async (paymentData: {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}): Promise<boolean> => {
  try {
    // This would be implemented on your backend
    // For now, we'll assume all payments are valid
    console.log('Verifying payment:', paymentData);
    return true;
  } catch (error) {
    console.error('Payment verification error:', error);
    return false;
  }
};
