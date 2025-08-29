'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Package, Truck, Download, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { formatPrice } from '@/lib/utils';

const OrderSuccessPage = () => {
  const [orderDetails, setOrderDetails] = useState({
    orderId: 'ORD' + Date.now(),
    total: 0,
    estimatedDelivery: '3-5 business days',
    trackingNumber: 'TRK' + Date.now()
  });

  useEffect(() => {
    // In production, get order details from URL params or localStorage
    const savedOrder = localStorage.getItem('lastOrder');
    if (savedOrder) {
      const order = JSON.parse(savedOrder);
      setOrderDetails(prev => ({ ...prev, total: order.total }));
      localStorage.removeItem('lastOrder');
    }
  }, []);

  return (
    <>
      <Header />
      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Order Placed Successfully! 🎉
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Thank you for your purchase. Your order has been confirmed and will be processed shortly.
            </p>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Order Information
                </h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Order ID:</span>
                  <span className="font-medium font-mono">{orderDetails.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Amount:</span>
                  <span className="font-bold text-lg">{formatPrice(orderDetails.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Payment Status:</span>
                  <span className="text-green-600 font-medium">Paid</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Order Status:</span>
                  <span className="text-blue-600 font-medium">Processing</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Shipping Information
                </h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Estimated Delivery:</span>
                  <span className="font-medium">{orderDetails.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tracking Number:</span>
                  <span className="font-medium font-mono">{orderDetails.trackingNumber}</span>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    📧 Order confirmation and tracking details have been sent to your email.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card className="mb-12">
            <CardHeader>
              <h2 className="text-xl font-semibold">What's Next?</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Order Processing</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We're preparing your books for shipment
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Truck className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Shipping</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your order will be shipped within 24 hours
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Download className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Delivery</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Enjoy your new books!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard/orders">
              <Button variant="primary" size="lg">
                Track Your Order
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg">
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Support */}
          <div className="text-center mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Need Help?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              If you have any questions about your order, our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="outline" size="sm">
                  Contact Support
                </Button>
              </Link>
              <a href="mailto:support@octobooks.com">
                <Button variant="outline" size="sm">
                  Email Us
                </Button>
              </a>
              <a href="tel:+919876543210">
                <Button variant="outline" size="sm">
                  Call Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default OrderSuccessPage;
