'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, Heart, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { motion } from 'framer-motion';

const NewArrivals = () => {
  // Sample data - this would come from Firebase in production
  const newBooks = [
    {
      id: '6',
      title: 'The Thursday Murder Club',
      author: 'Richard Osman',
      price: 499,
      finalPrice: 399,
      rating: 4.5,
      reviewsCount: 234,
      coverImage: '/api/placeholder/300/400',
      category: 'Mystery',
      publishedDate: '2024-08-15'
    },
    {
      id: '7',
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      price: 599,
      finalPrice: 479,
      rating: 4.7,
      reviewsCount: 567,
      coverImage: '/api/placeholder/300/400',
      category: 'Science Fiction',
      publishedDate: '2024-08-10'
    },
    {
      id: '8',
      title: 'The Midnight Library',
      author: 'Matt Haig',
      price: 399,
      finalPrice: 319,
      rating: 4.6,
      reviewsCount: 890,
      coverImage: '/api/placeholder/300/400',
      category: 'Fiction',
      publishedDate: '2024-08-05'
    },
    {
      id: '9',
      title: 'Educated',
      author: 'Tara Westover',
      price: 450,
      finalPrice: 360,
      rating: 4.8,
      reviewsCount: 1123,
      coverImage: '/api/placeholder/300/400',
      category: 'Biography',
      publishedDate: '2024-07-28'
    },
    {
      id: '10',
      title: 'The Seven Moons of Maali Almeida',
      author: 'Shehan Karunatilaka',
      price: 549,
      finalPrice: 439,
      rating: 4.4,
      reviewsCount: 345,
      coverImage: '/api/placeholder/300/400',
      category: 'Literary Fiction',
      publishedDate: '2024-07-20'
    },
    {
      id: '11',
      title: 'Lessons in Chemistry',
      author: 'Bonnie Garmus',
      price: 499,
      finalPrice: 399,
      rating: 4.7,
      reviewsCount: 678,
      coverImage: '/api/placeholder/300/400',
      category: 'Fiction',
      publishedDate: '2024-07-15'
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

  const getDaysAgo = (dateString: string) => {
    const publishDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - publishDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🆕 New Arrivals & Trending
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Fresh releases and trending books that everyone's talking about
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6"
        >
          {newBooks.map((book) => (
            <motion.div key={book.id} variants={itemVariants}>
              <Card hover className="h-full group">
                <CardContent className="p-4">
                  {/* New Badge */}
                  <div className="relative mb-4">
                    <div className="absolute top-2 left-2 z-10">
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {getDaysAgo(book.publishedDate)}d ago
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
                        <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                          <span className="text-4xl">📚</span>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Book Info */}
                  <div className="space-y-2">
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      {book.category}
                    </span>
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
          <Link href="/new-arrivals">
            <Button variant="outline" size="lg">
              View All New Arrivals
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
