'use client';

import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle, MapPin, Clock, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const TrackOrderPage = () => {
  const [trackingInput, setTrackingInput] = useState('');
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Sample tracking data
  const sampleTrackingData = {
    orderId: 'ORD123456789',
    trackingNumber: 'TRK987654321',
    status: 'In Transit',
    estimatedDelivery: '2024-08-31',
    currentLocation: 'Mumbai Distribution Center',
    timeline: [
      {
        status: 'Order Placed',
        date: '2024-08-29 10:30 AM',
        location: 'Octobooks Warehouse',
        completed: true,
        description: 'Your order has been confirmed and is being prepared'
      },
      {
        status: 'Order Packed',
        date: '2024-08-29 02:15 PM',
        location: 'Octobooks Warehouse',
        completed: true,
        description: 'Your books have been carefully packed and ready for pickup'
      },
      {
        status: 'Picked Up',
        date: '2024-08-29 06:45 PM',
        location: 'Mumbai Pickup Center',
        completed: true,
        description: 'Package picked up by delivery partner'
      },
      {
        status: 'In Transit',
        date: '2024-08-30 08:20 AM',
        location: 'Mumbai Distribution Center',
        completed: true,
        description: 'Package is on the way to destination'
      },
      {
        status: 'Out for Delivery',
        date: 'Expected: 2024-08-31 09:00 AM',
        location: 'Local Delivery Hub',
        completed: false,
        description: 'Package will be delivered today'
      },
      {
        status: 'Delivered',
        date: 'Expected: 2024-08-31 06:00 PM',
        location: 'Your Address',
        completed: false,
        description: 'Package delivered successfully'
      }
    ]
  };

  const handleTrackOrder = async () => {
    if (!trackingInput.trim()) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (trackingInput.includes('ORD') || trackingInput.includes('TRK')) {
        setTrackingResult(sampleTrackingData);
      } else {
        setTrackingResult(null);
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-block p-4 bg-white/10 rounded-full mb-6">
              <Package className="h-12 w-12" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Track Your Order
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Enter your order ID or tracking number to get real-time updates on your delivery
            </p>
          </div>
        </section>

        {/* Tracking Form */}
        <section className="py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                  Enter Tracking Information
                </h2>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <Input
                    label="Order ID or Tracking Number"
                    placeholder="Enter ORD123456789 or TRK987654321"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    leftIcon={<Search className="h-5 w-5" />}
                  />
                  
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={handleTrackOrder}
                    loading={loading}
                  >
                    Track Order
                  </Button>
                  
                  <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                    <p>Don't have your tracking number? <a href="/dashboard/orders" className="text-blue-600 hover:underline">Check your orders</a></p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tracking Results */}
        {trackingResult && (
          <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Order Summary */}
              <Card className="mb-8">
                <CardHeader>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Order Details
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {trackingResult.orderId}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Order ID</div>
                    </div>
                    <div className="text-center">
                      <Badge variant="info" className="text-lg px-4 py-2">
                        {trackingResult.status}
                      </Badge>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Current Status</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        {new Date(trackingResult.estimatedDelivery).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Expected Delivery</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <div className="font-medium text-blue-900 dark:text-blue-100">
                          Current Location
                        </div>
                        <div className="text-blue-700 dark:text-blue-300">
                          {trackingResult.currentLocation}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tracking Timeline */}
              <Card>
                <CardHeader>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Tracking Timeline
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {trackingResult.timeline.map((event: any, index: number) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          event.completed 
                            ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' 
                            : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'
                        }`}>
                          {event.status === 'Order Placed' && <Package className="h-5 w-5" />}
                          {event.status === 'Order Packed' && <Package className="h-5 w-5" />}
                          {event.status === 'Picked Up' && <Truck className="h-5 w-5" />}
                          {event.status === 'In Transit' && <Truck className="h-5 w-5" />}
                          {event.status === 'Out for Delivery' && <Truck className="h-5 w-5" />}
                          {event.status === 'Delivered' && <CheckCircle className="h-5 w-5" />}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className={`font-semibold ${
                              event.completed 
                                ? 'text-gray-900 dark:text-white' 
                                : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {event.status}
                            </h3>
                            {event.completed && (
                              <Badge variant="success" size="sm">Completed</Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            <Clock className="h-4 w-4 inline mr-1" />
                            {event.date}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            <MapPin className="h-4 w-4 inline mr-1" />
                            {event.location}
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {trackingInput && !trackingResult && !loading && (
          <section className="py-16">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Order Not Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                We couldn't find an order with that ID or tracking number. Please check and try again.
              </p>
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Need help? Contact our support team:
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Support
                  </Button>
                  <Button variant="outline">
                    Live Chat
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Help Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Need Help Tracking Your Order?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Check Your Email
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Tracking details are sent to your registered email address when your order ships.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Contact Support
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Our support team is available 24/7 to help you track your order.
                  </p>
                  <Button variant="outline" size="sm">
                    Get Help
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default TrackOrderPage;
