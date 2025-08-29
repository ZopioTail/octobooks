'use client';

import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Book Enthusiast',
      location: 'Mumbai, India',
      rating: 5,
      text: 'Octobooks has completely transformed my reading experience. The vast collection and easy ordering process make it my go-to platform for all my book needs.',
      avatar: '/api/placeholder/80/80',
      booksPurchased: 25
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      role: 'Author',
      location: 'Delhi, India',
      rating: 5,
      text: 'As an author, Octobooks has provided me with an excellent platform to reach readers. The royalty system is transparent and the support team is fantastic.',
      avatar: '/api/placeholder/80/80',
      booksPurchased: 0
    },
    {
      id: 3,
      name: 'Anita Desai',
      role: 'Teacher',
      location: 'Bangalore, India',
      rating: 5,
      text: 'I love how easy it is to find educational books for my students. The categorization and search features are excellent, and delivery is always on time.',
      avatar: '/api/placeholder/80/80',
      booksPurchased: 40
    },
    {
      id: 4,
      name: 'Vikram Singh',
      role: 'Business Owner',
      location: 'Pune, India',
      rating: 5,
      text: 'The business and professional book section is outstanding. I\'ve found some incredible resources that have helped grow my business.',
      avatar: '/api/placeholder/80/80',
      booksPurchased: 15
    },
    {
      id: 5,
      name: 'Meera Patel',
      role: 'Student',
      location: 'Chennai, India',
      rating: 5,
      text: 'Great prices, fast delivery, and an amazing collection of academic books. Octobooks has made my studies so much easier and affordable.',
      avatar: '/api/placeholder/80/80',
      booksPurchased: 30
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-4">
            <Quote className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Readers Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have made Octobooks their trusted book destination
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="relative">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              {/* Quote Icon */}
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Quote className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>

              {/* Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, index) => (
                  <Star key={index} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].text}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center overflow-hidden">
                  <span className="text-2xl">👤</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900 dark:text-white text-lg">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {testimonials[currentTestimonial].role}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonials[currentTestimonial].location}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentTestimonial
                  ? 'bg-blue-600'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Customer Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">25K+</div>
            <div className="text-gray-600 dark:text-gray-400">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">4.8</div>
            <div className="text-gray-600 dark:text-gray-400">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">98%</div>
            <div className="text-gray-600 dark:text-gray-400">Customer Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">1M+</div>
            <div className="text-gray-600 dark:text-gray-400">Books Delivered</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
