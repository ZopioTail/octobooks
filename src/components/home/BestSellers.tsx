'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, Heart, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { motion } from 'framer-motion';

const BestSellers = () => {
  // Sample data - this would come from Firebase in production
  const bestSellingBooks = [
    {
      id: '1',
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      price: 399,
      finalPrice: 299,
      rating: 4.8,
      reviewsCount: 1250,
      coverImage: '/api/placeholder/300/400',
      category: 'Business'
    },
    {
      id: '2',
      title: 'Atomic Habits',
      author: 'James Clear',
      price: 450,
      finalPrice: 350,
      rating: 4.9,
      reviewsCount: 2100,
      coverImage: '/api/placeholder/300/400',
      category: 'Self-Help'
    },
    {
      id: '3',
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      price: 299,
      finalPrice: 249,
      rating: 4.7,
      reviewsCount: 890,
      coverImage: '/api/placeholder/300/400',
      category: 'Fiction'
    },
    {
      id: '4',
      title: 'Think and Grow Rich',
      author: 'Napoleon Hill',
      price: 350,
      finalPrice: 280,
      rating: 4.6,
      reviewsCount: 756,
      coverImage: '/api/placeholder/300/400',
      category: 'Business'
    },
    {
      id: '5',
      title: 'The 7 Habits of Highly Effective People',
      author: 'Stephen Covey',
      price: 499,
      finalPrice: 399,
      rating: 4.8,
      reviewsCount: 1456,
      coverImage: '/api/placeholder/300/400',
      category: 'Self-Help'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            📈 Best Sellers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover the most popular books loved by thousands of readers worldwide
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {bestSellingBooks.map((book, index) => (
            <motion.div key={book.id} variants={itemVariants}>
              <Card hover className="h-full group">
                <CardContent className="p-4">
                  {/* Bestseller Badge */}
                  <div className="relative mb-4">
                    <div className="absolute top-2 left-2 z-10">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        #{index + 1} Bestseller
                      </span>
                    </div>
                    <div className="absolute top-2 right-2 z-10">
                      <button className="p-1.5 bg-white/80 hover:bg-white rounded-full shadow-sm transition-all">
                        <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                      </button>
                    </div>
                    
                    {/* Book Cover */}
                    <Link href={`/book/${book.id}`}>
                      <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden group-hover:shadow-lg transition-shadow">
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <span className="text-4xl">📖</span>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Book Info */}
                  <div className="space-y-2">
                    <Link href={`/book/${book.id}`}>
                      <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 hover:text-blue-600 transition-colors">
                        {book.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      by {book.author}
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center space-x-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(book.rating) ? 'fill-current' : ''
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        {book.rating} ({book.reviewsCount})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {formatPrice(book.finalPrice)}
                      </span>
                      {book.price !== book.finalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(book.price)}
                        </span>
                      )}
                      {book.price !== book.finalPrice && (
                        <span className="text-sm text-green-600 font-medium">
                          {Math.round(((book.price - book.finalPrice) / book.price) * 100)}% off
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/bestsellers">
            <Button variant="outline" size="lg">
              View All Best Sellers
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
