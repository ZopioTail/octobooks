'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Truck, MapPin, User, Phone, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatPrice } from '@/lib/utils';
import { processRazorpayPayment } from '@/lib/payments';

const CheckoutPage = () => {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const { isAuthenticated, userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Confirmation

  const [shippingAddress, setShippingAddress] = useState({
    name: userProfile?.name || '',
    email: userProfile?.email || '',
    phone: userProfile?.phone || '',
    street: userProfile?.address?.street || '',
    city: userProfile?.address?.city || '',
    state: userProfile?.address?.state || '',
    pincode: userProfile?.address?.pincode || '',
    country: userProfile?.address?.country || 'India'
  });

  const [paymentMethod, setPaymentMethod] = useState('razorpay');

  // Redirect if cart is empty
  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    router.push('/auth/login?redirect=/checkout');
    return null;
  }

  const subtotal = items.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0);
  const shipping = subtotal >= 499 ? 0 : 50;
  const tax = Math.round(subtotal * 0.18);
  const finalTotal = subtotal + shipping + tax;

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const orderData = {
        userId: userProfile?.userId || '',
        books: items,
        shippingAddress,
        paymentMethod,
        subtotal,
        shipping,
        tax,
        total: finalTotal
      };

      if (paymentMethod === 'razorpay') {
        await processRazorpayPayment(orderData);
      }
      
      clearCart();
      router.push('/order-success');
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const stateOptions = [
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Tamil Nadu', label: 'Tamil Nadu' },
    { value: 'Gujarat', label: 'Gujarat' },
    { value: 'West Bengal', label: 'West Bengal' },
    { value: 'Rajasthan', label: 'Rajasthan' },
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh' }
  ];

  return (
    <>
      <Header />
      <main className="flex-1 py-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNum 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                  }`}>
                    {stepNum}
                  </div>
                  <span className={`ml-2 text-sm ${
                    step >= stepNum 
                      ? 'text-blue-600 font-medium' 
                      : 'text-gray-500'
                  }`}>
                    {stepNum === 1 ? 'Address' : stepNum === 2 ? 'Payment' : 'Confirmation'}
                  </span>
                  {stepNum < 3 && (
                    <div className={`w-12 h-0.5 ml-4 ${
                      step > stepNum ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-semibold flex items-center">
                      <Truck className="h-5 w-5 mr-2" />
                      Shipping Address
                    </h2>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddressSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Full Name"
                          value={shippingAddress.name}
                          onChange={(e) => setShippingAddress({...shippingAddress, name: e.target.value})}
                          leftIcon={<User className="h-5 w-5" />}
                          required
                        />
                        <Input
                          label="Email"
                          type="email"
                          value={shippingAddress.email}
                          onChange={(e) => setShippingAddress({...shippingAddress, email: e.target.value})}
                          leftIcon={<Mail className="h-5 w-5" />}
                          required
                        />
                      </div>

                      <Input
                        label="Phone Number"
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                        leftIcon={<Phone className="h-5 w-5" />}
                        required
                      />

                      <Input
                        label="Street Address"
                        value={shippingAddress.street}
                        onChange={(e) => setShippingAddress({...shippingAddress, street: e.target.value})}
                        leftIcon={<MapPin className="h-5 w-5" />}
                        placeholder="House number, street name"
                        required
                      />

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                          label="City"
                          value={shippingAddress.city}
                          onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                          required
                        />
                        <Select
                          label="State"
                          value={shippingAddress.state}
                          onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                          options={stateOptions}
                          placeholder="Select state"
                          required
                        />
                        <Input
                          label="PIN Code"
                          value={shippingAddress.pincode}
                          onChange={(e) => setShippingAddress({...shippingAddress, pincode: e.target.value})}
                          placeholder="400001"
                          required
                        />
                      </div>

                      <Button type="submit" variant="primary" size="lg" className="w-full">
                        Continue to Payment
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-semibold flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Payment Method
                    </h2>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                        <input
                          type="radio"
                          name="payment"
                          value="razorpay"
                          checked={paymentMethod === 'razorpay'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-3"
                        />
                        <div className="flex-1">
                          <div className="font-medium">Razorpay</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Credit/Debit Cards, UPI, Net Banking, Wallets
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">UPI</span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Cards</span>
                        </div>
                      </label>

                      <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={paymentMethod === 'cod'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-3"
                        />
                        <div className="flex-1">
                          <div className="font-medium">Cash on Delivery</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Pay when you receive your order
                          </div>
                        </div>
                        <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">COD</span>
                      </label>
                    </div>

                    <div className="flex space-x-4">
                      <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                        Back to Address
                      </Button>
                      <Button 
                        variant="primary" 
                        onClick={handlePayment}
                        loading={loading}
                        className="flex-1"
                      >
                        {paymentMethod === 'cod' ? 'Place Order' : 'Pay Now'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Order Summary</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.bookId} className="flex items-center space-x-3">
                        <div className="w-12 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                            <span className="text-lg">📖</span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                            {item.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatPrice(item.finalPrice * item.quantity)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <hr className="border-gray-200 dark:border-gray-700" />

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? 'Free' : formatPrice(shipping)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Tax (18%)</span>
                      <span className="font-medium">{formatPrice(tax)}</span>
                    </div>
                    <hr className="border-gray-200 dark:border-gray-700" />
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-gray-900 dark:text-white">Total</span>
                      <span className="text-gray-900 dark:text-white">{formatPrice(finalTotal)}</span>
                    </div>
                  </div>

                  {/* Security Info */}
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    <div className="flex items-center text-green-700 dark:text-green-300">
                      <Shield className="h-4 w-4 mr-2" />
                      <span className="text-sm">Secure checkout with 256-bit SSL encryption</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CheckoutPage;
