// Shiprocket API integration for shipping management
import { Order } from '@/types';

export interface ShippingAddress {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface ShipmentItem {
  name: string;
  sku: string;
  units: number;
  selling_price: number;
  discount?: number;
  tax?: number;
  hsn?: number;
}

export interface CreateShipmentRequest {
  order_id: string;
  order_date: string;
  pickup_location: string;
  billing_customer_name: string;
  billing_last_name: string;
  billing_address: string;
  billing_city: string;
  billing_pincode: string;
  billing_state: string;
  billing_country: string;
  billing_email: string;
  billing_phone: string;
  shipping_is_billing: boolean;
  shipping_customer_name?: string;
  shipping_last_name?: string;
  shipping_address?: string;
  shipping_city?: string;
  shipping_pincode?: string;
  shipping_state?: string;
  shipping_country?: string;
  shipping_email?: string;
  shipping_phone?: string;
  order_items: ShipmentItem[];
  payment_method: string;
  shipping_charges: number;
  giftwrap_charges: number;
  transaction_charges: number;
  total_discount: number;
  sub_total: number;
  length: number;
  breadth: number;
  height: number;
  weight: number;
}

// Get Shiprocket auth token
export const getShiprocketToken = async (): Promise<string> => {
  try {
    // Check if we have stored token that's still valid
    const storedToken = localStorage.getItem('shiprocket_token');
    const tokenExpiry = localStorage.getItem('shiprocket_token_expiry');
    
    if (storedToken && tokenExpiry && new Date().getTime() < parseInt(tokenExpiry)) {
      return storedToken;
    }

    const response = await fetch('https://apiv2.shiprocket.in/v1/external/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: process.env.SHIPROCKET_EMAIL || '',
        password: process.env.SHIPROCKET_PASSWORD || '',
      }),
    });

    const data = await response.json();
    
    if (data.token) {
      // Store token with 1 hour expiry
      localStorage.setItem('shiprocket_token', data.token);
      localStorage.setItem('shiprocket_token_expiry', (new Date().getTime() + 3600000).toString());
      return data.token;
    }
    
    throw new Error('Failed to get Shiprocket token');
  } catch (error) {
    console.error('Error getting Shiprocket token:', error);
    throw error;
  }
};

// Create shipment in Shiprocket
export const createShipment = async (shipmentData: CreateShipmentRequest): Promise<any> => {
  try {
    const token = await getShiprocketToken();
    
    const response = await fetch('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(shipmentData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating shipment:', error);
    throw error;
  }
};

// Track shipment
export const trackShipment = async (trackingNumber: string): Promise<any> => {
  try {
    const token = await getShiprocketToken();
    
    const response = await fetch(`https://apiv2.shiprocket.in/v1/external/courier/track/awb/${trackingNumber}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    
    if (data.tracking_data) {
      return {
        success: true,
        trackingData: data.tracking_data,
        awb: data.tracking_data.awb,
        courier: data.tracking_data.courier_name,
        status: data.tracking_data.current_status,
        estimatedDelivery: data.tracking_data.etd,
        timeline: data.tracking_data.shipment_track_activities || []
      };
    }
    
    return {
      success: false,
      error: data.message || 'Tracking information not found'
    };
  } catch (error) {
    console.error('Error tracking shipment:', error);
    return {
      success: false,
      error: 'Failed to track shipment'
    };
  }
};

// Track order by order ID
export const trackOrder = async (orderId: string): Promise<any> => {
  try {
    const token = await getShiprocketToken();
    
    const response = await fetch(`https://apiv2.shiprocket.in/v1/external/orders?order_id=${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    
    if (data.data && data.data.length > 0) {
      const order = data.data[0];
      if (order.awb_code) {
        return await trackShipment(order.awb_code);
      }
    }
    
    return {
      success: false,
      error: 'Order not found or not shipped yet'
    };
  } catch (error) {
    console.error('Error tracking order:', error);
    return {
      success: false,
      error: 'Failed to track order'
    };
  }
};

// Get shipping rates
export const getShippingRates = async (
  pickupPincode: string,
  deliveryPincode: string,
  weight: number,
  cod: boolean = false
): Promise<any> => {
  try {
    const token = await getShiprocketToken();
    
    const response = await fetch(`https://apiv2.shiprocket.in/v1/external/courier/serviceability/?pickup_postcode=${pickupPincode}&delivery_postcode=${deliveryPincode}&weight=${weight}&cod=${cod ? 1 : 0}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    
    if (data.data && data.data.available_courier_companies) {
      return {
        success: true,
        rates: data.data.available_courier_companies
      };
    }
    
    return {
      success: false,
      error: data.message || 'Shipping rates not available'
    };
  } catch (error) {
    console.error('Error getting shipping rates:', error);
    return {
      success: false,
      error: 'Failed to get shipping rates'
    };
  }
};

// Cancel shipment
export const cancelShipment = async (awbNumber: string): Promise<any> => {
  try {
    const token = await getShiprocketToken();
    
    const response = await fetch('https://apiv2.shiprocket.in/v1/external/orders/cancel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        awb: [awbNumber]
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error canceling shipment:', error);
    throw error;
  }
};

// Generate shipping label
export const generateShippingLabel = async (orderId: string): Promise<any> => {
  try {
    const token = await getShiprocketToken();
    
    const response = await fetch(`https://apiv2.shiprocket.in/v1/external/courier/generate/label?order_ids[]=${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating shipping label:', error);
    throw error;
  }
};

// Generate manifest
export const generateManifest = async (orderIds: string[]): Promise<any> => {
  try {
    const token = await getShiprocketToken();
    
    const response = await fetch('https://apiv2.shiprocket.in/v1/external/manifests/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        order_ids: orderIds
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating manifest:', error);
    throw error;
  }
};

// Helper function to convert order to Shiprocket format
export const convertOrderToShipment = (
  order: Order,
  pickupLocation: string = 'Primary'
): CreateShipmentRequest => {
  const address = order.shippingAddress;
  const [firstName, ...lastNameParts] = address.name.split(' ');
  const lastName = lastNameParts.join(' ') || '';

  return {
    order_id: order.orderId,
    order_date: new Date(order.createdAt).toISOString().split('T')[0],
    pickup_location: pickupLocation,
    billing_customer_name: firstName,
    billing_last_name: lastName,
    billing_address: address.street,
    billing_city: address.city,
    billing_pincode: address.pincode,
    billing_state: address.state,
    billing_country: address.country,
    billing_email: address.email,
    billing_phone: address.phone,
    shipping_is_billing: true,
    order_items: order.books.map((book) => ({
      name: book.title,
      sku: book.bookId,
      units: book.quantity,
      selling_price: book.finalPrice,
      discount: book.price - book.finalPrice,
      tax: 0,
      hsn: 49019900 // HSN code for books
    })),
    payment_method: order.paymentMethod === 'cod' ? 'COD' : 'Prepaid',
    shipping_charges: order.shipping,
    giftwrap_charges: 0,
    transaction_charges: 0,
    total_discount: order.books.reduce((sum, book) =>
      sum + ((book.price - book.finalPrice) * book.quantity), 0
    ),
    sub_total: order.subtotal,
    length: 25, // Standard book package dimensions
    breadth: 20,
    height: 5,
    weight: order.books.reduce((sum, book) => sum + (book.quantity * 0.5), 0) // Assume 0.5kg per book
  };
};

// Get shipment status from Shiprocket status
export const getShipmentStatus = (shiprocketStatus: string): string => {
  const statusMap: Record<string, string> = {
    'NEW': 'Order Placed',
    'PROCESSING': 'Processing',
    'READY_TO_SHIP': 'Ready to Ship',
    'PICKUP_COMPLETED': 'Picked Up',
    'IN_TRANSIT': 'In Transit',
    'OUT_FOR_DELIVERY': 'Out for Delivery',
    'DELIVERED': 'Delivered',
    'CANCELLED': 'Cancelled',
    'RTO_INITIATED': 'Return Initiated',
    'RTO_DELIVERED': 'Returned',
    'LOST': 'Lost'
  };
  
  return statusMap[shiprocketStatus] || shiprocketStatus;
};

// Convert Shiprocket timeline to our format
export const convertShiprocketTimeline = (activities: any[]): any[] => {
  return activities.map(activity => ({
    status: getShipmentStatus(activity.status || ''),
    date: activity.date || '',
    location: activity.location || '',
    description: activity.activity || '',
    completed: ['DELIVERED', 'CANCELLED', 'RTO_DELIVERED'].includes(activity.status || '')
  }));
};
