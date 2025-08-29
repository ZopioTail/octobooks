'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import BookCard from '@/components/books/BookCard';
import Loading from '@/components/ui/Loading';
import { getBestSellers } from '@/lib/books';
import { Book } from '@/types';
import { motion } from 'framer-motion';

const BestSellers = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const bestSellers = await getBestSellers(10);
        setBooks(bestSellers);
      } catch (error) {
        console.error('Error fetching best sellers:', error);
        // Fallback to sample data if Firebase is not configured
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

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

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loading size="lg" />
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading best sellers...</p>
          </div>
        </div>
      </section>
    );
  }

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

        {books.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
          >
            {books.map((book) => (
              <motion.div key={book.bookId} variants={itemVariants}>
                <BookCard book={book} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No best sellers available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Check back soon for our top-rated books!
            </p>
          </div>
        )}

        {/* View All Button */}
        {books.length > 0 && (
          <div className="text-center mt-12">
            <Link href="/bestsellers">
              <Button variant="outline" size="lg">
                View All Best Sellers
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellers;
