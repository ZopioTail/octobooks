'use client';

import React from 'react';
import Link from 'next/link';
import { Star, BookOpen, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const TopAuthors = () => {
  const topAuthors = [
    {
      id: '1',
      name: 'Morgan Housel',
      bio: 'Financial writer and partner at The Collaborative Fund, known for his insights on behavioral finance.',
      image: '/api/placeholder/150/150',
      booksCount: 3,
      rating: 4.8,
      totalSales: 50000,
      genres: ['Business', 'Finance', 'Psychology'],
      featured: true
    },
    {
      id: '2',
      name: 'James Clear',
      bio: 'Author and speaker focused on habits, decision making, and continuous improvement.',
      image: '/api/placeholder/150/150',
      booksCount: 2,
      rating: 4.9,
      totalSales: 75000,
      genres: ['Self-Help', 'Psychology', 'Productivity'],
      featured: true
    },
    {
      id: '3',
      name: 'Yuval Noah Harari',
      bio: 'Israeli historian and professor, bestselling author of thought-provoking books about humanity.',
      image: '/api/placeholder/150/150',
      booksCount: 4,
      rating: 4.7,
      totalSales: 120000,
      genres: ['History', 'Philosophy', 'Science'],
      featured: true
    },
    {
      id: '4',
      name: 'Michelle Obama',
      bio: 'Former First Lady, lawyer, and bestselling author inspiring millions worldwide.',
      image: '/api/placeholder/150/150',
      booksCount: 2,
      rating: 4.9,
      totalSales: 95000,
      genres: ['Biography', 'Memoir', 'Politics'],
      featured: true
    },
    {
      id: '5',
      name: 'Cal Newport',
      bio: 'Computer science professor and author focused on productivity and digital minimalism.',
      image: '/api/placeholder/150/150',
      booksCount: 5,
      rating: 4.6,
      totalSales: 40000,
      genres: ['Productivity', 'Technology', 'Career'],
      featured: false
    },
    {
      id: '6',
      name: 'Brené Brown',
      bio: 'Research professor and bestselling author on vulnerability, courage, and leadership.',
      image: '/api/placeholder/150/150',
      booksCount: 6,
      rating: 4.8,
      totalSales: 85000,
      genres: ['Psychology', 'Self-Help', 'Leadership'],
      featured: false
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-4">
            <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Top Authors
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Meet the brilliant minds behind your favorite books and discover their latest works
          </p>
        </div>

        {/* Featured Authors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {topAuthors.filter(author => author.featured).map((author) => (
            <Card key={author.id} className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8">
                {/* Author Image */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto flex items-center justify-center overflow-hidden">
                    <span className="text-3xl">👤</span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Star className="h-4 w-4 text-yellow-800 fill-current" />
                  </div>
                </div>

                {/* Author Info */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {author.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {author.bio}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {author.booksCount}
                    </div>
                    <div className="text-xs text-gray-500">Books</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                      {author.rating}
                    </div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap justify-center gap-1 mb-6">
                  {author.genres.slice(0, 2).map((genre) => (
                    <span key={genre} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full">
                      {genre}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <Button variant="outline" size="sm" className="w-full">
                  View Books
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* All Authors Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Discover More Amazing Authors
          </h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Explore our complete collection of authors from around the world, each bringing unique perspectives and stories to our platform.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">1000+</div>
              <div className="text-purple-200">Authors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-purple-200">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">25+</div>
              <div className="text-purple-200">Languages</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/authors">
              <Button variant="secondary" size="lg">
                Browse All Authors
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth/signup?role=author">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600">
                Become an Author
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopAuthors;
