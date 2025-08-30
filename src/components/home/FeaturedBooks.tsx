'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, ArrowRight, Award, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import BookCard from '@/components/books/BookCard';
import { getBooks } from '@/lib/books';
import { Book } from '@/types';
import { getLiveData } from '@/lib/liveData';

const FeaturedBooks = () => {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [editorsPicks, setEditorsPicks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        // Fetch trending books using live data utility (use bestseller flag for trending)
        const trendingResult = await getLiveData(
          () => getBooks({
            filters: { minRating: 4.0 },
            sortBy: 'rating',
            sortOrder: 'desc',
            limitCount: 6
          }),
          { books: [], hasMore: false }
        );
        setFeaturedBooks(trendingResult.books);

        // Fetch editor's picks (high-rated books) using live data utility
        const editorsResult = await getLiveData(
          () => getBooks({
            filters: { minRating: 4.5 },
            sortBy: 'rating',
            sortOrder: 'desc',
            limitCount: 4
          }),
          { books: [], hasMore: false }
        );
        setEditorsPicks(editorsResult.books);
      } catch (error) {
        console.error('Error fetching featured books:', error);
        // Fallback to empty arrays if both live data and sample data fail
        setFeaturedBooks([]);
        setEditorsPicks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBooks();
  }, []);

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-full mb-4">
            <Award className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Books
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover trending books and editor's picks that are captivating readers worldwide
          </p>
        </div>

        {/* Trending Books */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Trending Now
              </h3>
            </div>
            <Link href="/books?sort=popularity">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 dark:bg-gray-700 aspect-[3/4] rounded-lg mb-4"></div>
                  <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded mb-2"></div>
                  <div className="bg-gray-200 dark:bg-gray-700 h-3 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {featuredBooks.map((book) => (
                <BookCard key={book.bookId} book={book} variant="compact" />
              ))}
            </div>
          )}
        </div>

        {/* Editor's Picks */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Award className="h-6 w-6 text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Editor's Picks
              </h3>
            </div>
            <Link href="/books?sort=rating">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 dark:bg-gray-700 aspect-[3/4] rounded-lg mb-4"></div>
                  <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded mb-2"></div>
                  <div className="bg-gray-200 dark:bg-gray-700 h-3 rounded w-3/4 mb-2"></div>
                  <div className="bg-gray-200 dark:bg-gray-700 h-3 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {editorsPicks.map((book) => (
                <div key={book.bookId} className="group">
                  <BookCard book={book} />
                  <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
                        Editor's Choice
                      </span>
                    </div>
                    <p className="text-xs text-purple-700 dark:text-purple-300">
                      Highly recommended by our editorial team for its exceptional storytelling and impact.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Featured Categories Quick Access */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-8">
            Explore Popular Categories
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['Fiction', 'Non-Fiction', 'Business', 'Self-Help', 'Technology', 'Health'].map((category) => (
              <Link key={category} href={`/category/${category.toLowerCase().replace(' ', '-')}`}>
                <Button variant="outline" className="hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20">
                  {category}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
