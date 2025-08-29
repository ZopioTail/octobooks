'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, MessageCircle, Mail, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const HelpPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqCategories = [
    {
      title: 'Orders & Shipping',
      faqs: [
        {
          question: 'How can I track my order?',
          answer: 'You can track your order by logging into your account and visiting the "My Orders" section. You\'ll find tracking information and real-time updates there.'
        },
        {
          question: 'What are the shipping charges?',
          answer: 'We offer free shipping on orders above ₹499. For orders below this amount, shipping charges of ₹50 apply.'
        },
        {
          question: 'How long does delivery take?',
          answer: 'Standard delivery takes 3-5 business days. Express delivery (1-2 days) is available in select cities for an additional charge.'
        }
      ]
    },
    {
      title: 'Payments & Refunds',
      faqs: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit/debit cards, UPI, net banking, digital wallets, and cash on delivery (COD).'
        },
        {
          question: 'How do I get a refund?',
          answer: 'You can request a refund within 7 days of delivery. Go to "My Orders" and click "Return/Refund" next to the item.'
        },
        {
          question: 'When will I receive my refund?',
          answer: 'Refunds are processed within 5-7 business days after we receive the returned item.'
        }
      ]
    },
    {
      title: 'Account & Profile',
      faqs: [
        {
          question: 'How do I create an account?',
          answer: 'Click "Sign Up" in the top right corner, fill in your details, and verify your email address.'
        },
        {
          question: 'I forgot my password. What should I do?',
          answer: 'Click "Forgot Password" on the login page and follow the instructions sent to your email.'
        },
        {
          question: 'How do I update my profile information?',
          answer: 'Log into your account and go to "Profile Settings" to update your personal information and preferences.'
        }
      ]
    },
    {
      title: 'Books & Authors',
      faqs: [
        {
          question: 'How do I submit my book for publication?',
          answer: 'Authors can submit manuscripts through our Author Portal. Create an author account and follow the submission guidelines.'
        },
        {
          question: 'Do you accept international authors?',
          answer: 'Yes! We welcome authors from around the world. Our platform supports multiple languages and currencies.'
        },
        {
          question: 'How are royalties calculated?',
          answer: 'Author royalties are calculated based on the net sale price and your royalty rate, which varies by book format and sales volume.'
        }
      ]
    }
  ];

  const allFaqs = faqCategories.flatMap((category, categoryIndex) =>
    category.faqs.map((faq, faqIndex) => ({
      ...faq,
      id: categoryIndex * 100 + faqIndex,
      category: category.title
    }))
  );

  const filteredFaqs = allFaqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Help Center
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto mb-8">
              Find answers to your questions and get the support you need
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto">
              <Input
                placeholder="Search for help..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="h-5 w-5" />}
                className="bg-white/10 border-white/20 text-white placeholder-white/70"
              />
            </div>
          </div>
        </section>

        {/* Quick Help Cards */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Live Chat
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Get instant help from our support team
                  </p>
                  <Button variant="primary" size="sm">
                    Start Chat
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Email Support
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Send us an email and we'll respond within 24 hours
                  </p>
                  <Button variant="outline" size="sm">
                    Send Email
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Phone Support
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Call us for immediate assistance
                  </p>
                  <Button variant="outline" size="sm">
                    +91 98765 43210
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Frequently Asked Questions
            </h2>

            {searchTerm ? (
              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <Card key={faq.id}>
                    <CardContent className="p-6">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                        className="w-full text-left flex items-center justify-between"
                      >
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {faq.question}
                          </h3>
                          <span className="text-sm text-blue-600 dark:text-blue-400">
                            {faq.category}
                          </span>
                        </div>
                        {expandedFaq === faq.id ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      {expandedFaq === faq.id && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <p className="text-gray-600 dark:text-gray-400">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-8">
                {faqCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      {category.title}
                    </h3>
                    <div className="space-y-4">
                      {category.faqs.map((faq, faqIndex) => {
                        const faqId = categoryIndex * 100 + faqIndex;
                        return (
                          <Card key={faqId}>
                            <CardContent className="p-6">
                              <button
                                onClick={() => setExpandedFaq(expandedFaq === faqId ? null : faqId)}
                                className="w-full text-left flex items-center justify-between"
                              >
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  {faq.question}
                                </h4>
                                {expandedFaq === faqId ? (
                                  <ChevronUp className="h-5 w-5 text-gray-500" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-gray-500" />
                                )}
                              </button>
                              {expandedFaq === faqId && (
                                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                  <p className="text-gray-600 dark:text-gray-400">
                                    {faq.answer}
                                  </p>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HelpPage;
