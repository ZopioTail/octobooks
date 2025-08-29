'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle, Gift, BookOpen, Bell } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const benefits = [
    {
      icon: BookOpen,
      title: 'Book Recommendations',
      description: 'Personalized book suggestions based on your interests'
    },
    {
      icon: Gift,
      title: 'Exclusive Offers',
      description: 'Early access to sales and special discounts'
    },
    {
      icon: Bell,
      title: 'New Releases',
      description: 'Be the first to know about new book launches'
    }
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setLoading(false);
      setEmail('');
    }, 1500);
  };

  if (isSubscribed) {
    return (
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Welcome to Our Community!
          </h2>
          <p className="text-xl text-green-100 mb-6">
            Thank you for subscribing! You'll receive your first newsletter with personalized book recommendations soon.
          </p>
          <Button 
            variant="secondary" 
            onClick={() => setIsSubscribed(false)}
          >
            Subscribe Another Email
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div>
            <div className="inline-block p-3 bg-white/10 rounded-full mb-6">
              <Mail className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stay Connected with Books
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join our newsletter and never miss out on new releases, exclusive offers, and personalized book recommendations.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-blue-100 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">15K+</div>
                <div className="text-blue-200 text-sm">Newsletter Subscribers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">Weekly</div>
                <div className="text-blue-200 text-sm">Fresh Content</div>
              </div>
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  Subscribe Now
                </h3>
                
                <form onSubmit={handleSubscribe} className="space-y-6">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder-white/70"
                    leftIcon={<Mail className="h-5 w-5 text-white/70" />}
                  />
                  
                  <Button
                    type="submit"
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    loading={loading}
                  >
                    Subscribe to Newsletter
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-xs text-blue-200">
                    By subscribing, you agree to receive marketing emails from Octobooks. 
                    You can unsubscribe at any time.
                  </p>
                </div>

                {/* Social Proof */}
                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="flex items-center justify-center space-x-4 text-sm text-blue-200">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>No spam</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>Unsubscribe anytime</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
