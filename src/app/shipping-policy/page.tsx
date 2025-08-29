'use client';

import React from 'react';
import { Truck, Clock, MapPin, Package, Shield, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const ShippingPolicyPage = () => {
  const shippingOptions = [
    {
      icon: Truck,
      title: 'Standard Delivery',
      time: '3-5 Business Days',
      cost: 'Free on orders ₹499+',
      description: 'Regular delivery to your doorstep'
    },
    {
      icon: Clock,
      title: 'Express Delivery',
      time: '1-2 Business Days',
      cost: '₹99 additional',
      description: 'Faster delivery for urgent orders'
    },
    {
      icon: MapPin,
      title: 'Same Day Delivery',
      time: 'Within 24 Hours',
      cost: '₹199 additional',
      description: 'Available in select metro cities'
    }
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-block p-4 bg-white/10 rounded-full mb-6">
              <Truck className="h-12 w-12" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Shipping Policy
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Fast, reliable, and secure delivery of your favorite books right to your doorstep
            </p>
          </div>
        </section>

        {/* Shipping Options */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Shipping Options
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {shippingOptions.map((option, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <option.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {option.title}
                    </h3>
                    <p className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">
                      {option.time}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {option.cost}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      {option.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Policy */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Shipping Information
              </h2>

              <Card className="mb-8">
                <CardHeader>
                  <h3 className="text-xl font-semibold flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    Order Processing
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>• Orders are processed within 24 hours of confirmation</p>
                  <p>• Orders placed after 6 PM or on weekends will be processed the next business day</p>
                  <p>• You will receive a confirmation email with tracking details once your order is shipped</p>
                  <p>• Pre-orders and special editions may have different processing times</p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <h3 className="text-xl font-semibold flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Delivery Areas
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>• We deliver across India to all serviceable PIN codes</p>
                  <p>• Same-day delivery available in Mumbai, Delhi, Bangalore, Chennai, Hyderabad, and Pune</p>
                  <p>• Express delivery available in 50+ major cities</p>
                  <p>• International shipping available to select countries (additional charges apply)</p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <h3 className="text-xl font-semibold flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Packaging & Safety
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>• All books are carefully packaged to prevent damage during transit</p>
                  <p>• We use eco-friendly packaging materials wherever possible</p>
                  <p>• Fragile items and special editions receive extra protective packaging</p>
                  <p>• Contactless delivery available for your safety</p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <h3 className="text-xl font-semibold flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Shipping Charges
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>• <strong>Free shipping</strong> on all orders above ₹499</p>
                  <p>• Standard shipping: ₹50 for orders below ₹499</p>
                  <p>• Express delivery: Additional ₹99</p>
                  <p>• Same-day delivery: Additional ₹199 (select cities only)</p>
                  <p>• Cash on Delivery: Additional ₹25 handling fee</p>
                  <p>• International shipping: Calculated based on destination and weight</p>
                </CardContent>
              </Card>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Important Notes
              </h3>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg mb-8">
                <ul className="space-y-2 text-yellow-800 dark:text-yellow-200">
                  <li>• Delivery times may vary during festivals and peak seasons</li>
                  <li>• We are not responsible for delays caused by natural disasters or unforeseen circumstances</li>
                  <li>• Please ensure someone is available to receive the package at the delivery address</li>
                  <li>• Incorrect or incomplete addresses may result in delivery delays</li>
                </ul>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Order Tracking
              </h3>
              <p>Once your order is shipped, you will receive:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email confirmation with tracking number</li>
                <li>SMS updates on delivery status</li>
                <li>Real-time tracking through our website</li>
                <li>Delivery confirmation once the order is delivered</li>
              </ul>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mt-8">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Need Help with Your Order?
                </h4>
                <p className="text-blue-800 dark:text-blue-200">
                  Contact our customer support team at support@octobooks.com or call +91 98765 43210 for any shipping-related queries.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ShippingPolicyPage;
