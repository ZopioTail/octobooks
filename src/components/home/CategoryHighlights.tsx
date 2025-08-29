'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';

const CategoryHighlights = () => {
  // Sample category data - this would come from Firebase in production
  const categories = [
    {
      id: 'fiction',
      name: 'Fiction',
      description: 'Immerse yourself in captivating stories and imaginative worlds',
      bookCount: 2500,
      image: '/api/placeholder/400/300',
      color: 'from-blue-500 to-purple-600',
      emoji: '📖'
    },
    {
      id: 'non-fiction',
      name: 'Non-Fiction',
      description: 'Expand your knowledge with real-world insights and facts',
      bookCount: 1800,
      image: '/api/placeholder/400/300',
      color: 'from-green-500 to-teal-600',
      emoji: '🧠'
    },
    {
      id: 'educational',
      name: 'Educational',
      description: 'Academic books and study materials for all levels',
      bookCount: 3200,
      image: '/api/placeholder/400/300',
      color: 'from-orange-500 to-red-600',
      emoji: '🎓'
    },
    {
      id: 'children',
      name: 'Children',
      description: 'Delightful stories and learning books for young minds',
      bookCount: 1200,
      image: '/api/placeholder/400/300',
      color: 'from-pink-500 to-rose-600',
      emoji: '🧸'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Career development and professional skill enhancement',
      bookCount: 950,
      image: '/api/placeholder/400/300',
      color: 'from-indigo-500 to-blue-600',
      emoji: '💼'
    },
    {
      id: 'self-help',
      name: 'Self-Help',
      description: 'Personal growth and motivation for a better you',
      bookCount: 800,
      image: '/api/placeholder/400/300',
      color: 'from-yellow-500 to-orange-600',
      emoji: '🌟'
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            📚 Explore by Category
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find your next great read from our carefully curated categories
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link href={`/category/${category.id}`}>
                <Card hover className="h-full group overflow-hidden">
                  <div className={`relative h-48 bg-gradient-to-br ${category.color}`}>
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-6xl mb-2">{category.emoji}</div>
                        <h3 className="text-2xl font-bold">{category.name}</h3>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
                        {category.bookCount.toLocaleString()} books
                      </span>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        Browse {category.name}
                      </span>
                      <ArrowRight className="h-4 w-4 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Authors Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              ✨ Featured Authors
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Meet the talented authors behind your favorite books
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Chetan Bhagat', books: 12, image: '/api/placeholder/200/200' },
              { name: 'Amish Tripathi', books: 8, image: '/api/placeholder/200/200' },
              { name: 'Ruskin Bond', books: 45, image: '/api/placeholder/200/200' },
              { name: 'Sudha Murty', books: 23, image: '/api/placeholder/200/200' }
            ].map((author, index) => (
              <motion.div
                key={author.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="text-center group">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl">👤</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {author.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {author.books} books published
                    </p>
                    <Button variant="outline" size="sm" className="group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20">
                      View Books
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryHighlights;
