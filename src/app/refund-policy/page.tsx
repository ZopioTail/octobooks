'use client';

import React from 'react';
import { RotateCcw, Clock, CheckCircle, XCircle, CreditCard, Package } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const RefundPolicyPage = () => {
  const refundTimeline = [
    {
      step: 1,
      title: 'Request Refund',
      description: 'Submit refund request within 7 days of delivery',
      icon: RotateCcw,
      color: 'blue'
    },
    {
      step: 2,
      title: 'Return Package',
      description: 'Pack and return the book in original condition',
      icon: Package,
      color: 'orange'
    },
    {
      step: 3,
      title: 'Quality Check',
      description: 'We verify the returned item condition',
      icon: CheckCircle,
      color: 'purple'
    },
    {
      step: 4,
      title: 'Refund Processed',
      description: 'Refund credited to your account within 5-7 days',
      icon: CreditCard,
      color: 'green'
    }
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-block p-4 bg-white/10 rounded-full mb-6">
              <RotateCcw className="h-12 w-12" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Refund Policy
            </h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              Easy returns and hassle-free refunds for your peace of mind
            </p>
          </div>
        </section>

        {/* Refund Process */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              How Refunds Work
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {refundTimeline.map((step) => (
                <Card key={step.step} className="text-center">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 bg-${step.color}-100 dark:bg-${step.color}-900/20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <step.icon className={`h-8 w-8 text-${step.color}-600 dark:text-${step.color}-400`} />
                    </div>
                    <div className="text-sm font-medium text-gray-500 mb-2">Step {step.step}</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {step.description}
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
              
              <Card className="mb-8">
                <CardHeader>
                  <h2 className="text-2xl font-bold flex items-center">
                    <CheckCircle className="h-6 w-6 mr-3 text-green-600" />
                    Eligible for Refund
                  </h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Books in original, unused condition</li>
                    <li>Items with manufacturing defects or damage during shipping</li>
                    <li>Wrong book delivered due to our error</li>
                    <li>Books that don't match the description on our website</li>
                    <li>Duplicate orders placed by mistake</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <h2 className="text-2xl font-bold flex items-center">
                    <XCircle className="h-6 w-6 mr-3 text-red-600" />
                    Not Eligible for Refund
                  </h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Digital books and e-books (unless technical issues)</li>
                    <li>Books damaged due to misuse or normal wear</li>
                    <li>Books with missing pages due to customer damage</li>
                    <li>Personalized or customized books</li>
                    <li>Books returned after 7 days of delivery</li>
                    <li>Books without original packaging</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <h2 className="text-2xl font-bold flex items-center">
                    <Clock className="h-6 w-6 mr-3" />
                    Refund Timeline
                  </h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2">Return Window</h3>
                      <p>7 days from delivery date</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Processing Time</h3>
                      <p>2-3 business days after receiving return</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Refund Credit</h3>
                      <p>5-7 business days to your account</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">COD Refunds</h3>
                      <p>Bank transfer within 7-10 business days</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <h2 className="text-2xl font-bold">How to Request a Refund</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ol className="list-decimal pl-6 space-y-3">
                    <li>
                      <strong>Login to Your Account:</strong> Go to "My Orders" section in your dashboard
                    </li>
                    <li>
                      <strong>Select Order:</strong> Find the order containing the book you want to return
                    </li>
                    <li>
                      <strong>Request Return:</strong> Click "Return/Refund" and select the reason
                    </li>
                    <li>
                      <strong>Schedule Pickup:</strong> Choose a convenient time for book pickup (free)
                    </li>
                    <li>
                      <strong>Pack Securely:</strong> Pack the book in original condition with invoice
                    </li>
                    <li>
                      <strong>Track Return:</strong> Monitor return status through your account
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <h2 className="text-2xl font-bold">Refund Methods</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        Online Payments
                      </h3>
                      <p className="text-blue-800 dark:text-blue-200 text-sm">
                        Refunded to original payment method (card, UPI, wallet)
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                        Cash on Delivery
                      </h3>
                      <p className="text-green-800 dark:text-green-200 text-sm">
                        Bank transfer to your registered account
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <h2 className="text-2xl font-bold">Special Cases</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-semibold">Damaged Books</h3>
                  <p>If you receive a damaged book, contact us immediately with photos. We'll arrange a replacement or full refund without requiring a return.</p>
                  
                  <h3 className="text-lg font-semibold">Wrong Book Delivered</h3>
                  <p>If we deliver the wrong book, we'll send the correct book and arrange pickup of the wrong item at no cost to you.</p>
                  
                  <h3 className="text-lg font-semibold">Partial Refunds</h3>
                  <p>Books returned in less than perfect condition may be eligible for partial refunds based on the condition assessment.</p>
                </CardContent>
              </Card>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Need Help with Returns?
                </h3>
                <p className="text-blue-800 dark:text-blue-200">
                  Contact our customer support team at returns@octobooks.com or call +91 98765 43210 for assistance with your return or refund request.
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

export default RefundPolicyPage;
