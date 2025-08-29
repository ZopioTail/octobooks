// Shiprocket API integration for shipping management

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
    const response = await fetch('https://apiv2.shiprocket.in/v1/external/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD,
      }),
    });

    const data = await response.json();
    return data.token;
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
    return data;
  } catch (error) {
    console.error('Error tracking shipment:', error);
    throw error;
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
    
    const response = await fetch('https://apiv2.shiprocket.in/v1/external/courier/serviceability/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting shipping rates:', error);
    throw error;
  }
};

// Helper function to convert order to Shiprocket format
export const convertOrderToShipment = (
  order: any,
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
    order_items: order.books.map((book: any) => ({
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
    total_discount: order.books.reduce((sum: number, book: any) => 
      sum + ((book.price - book.finalPrice) * book.quantity), 0
    ),
    sub_total: order.subtotal,
    length: 25, // Standard book package dimensions
    breadth: 20,
    height: 5,
    weight: order.books.reduce((sum: number, book: any) => sum + (book.quantity * 0.5), 0) // Assume 0.5kg per book
  };
};
