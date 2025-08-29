'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, BookOpen, TrendingUp, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const PublisherBrands = () => {
  const publishers = [
    {
      id: '1',
      name: 'Penguin Random House',
      description: 'World\'s largest trade book publisher with diverse catalog',
      logo: '/api/placeholder/120/60',
      booksCount: 2500,
      authorsCount: 450,
      categories: ['Fiction', 'Non-Fiction', 'Biography'],
      featured: true,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: '2',
      name: 'HarperCollins',
      description: 'Global publisher known for quality literature and bestsellers',
      logo: '/api/placeholder/120/60',
      booksCount: 1800,
      authorsCount: 320,
      categories: ['Literature', 'Business', 'Self-Help'],
      featured: true,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      id: '3',
      name: 'Macmillan Publishers',
      description: 'Leading publisher of educational and trade books',
      logo: '/api/placeholder/120/60',
      booksCount: 1200,
      authorsCount: 280,
      categories: ['Education', 'Science', 'Technology'],
      featured: true,
      color: 'from-green-500 to-teal-500'
    },
    {
      id: '4',
      name: 'Scholastic',
      description: 'Premier publisher of children\'s books and educational materials',
      logo: '/api/placeholder/120/60',
      booksCount: 900,
      authorsCount: 200,
      categories: ['Children', 'Education', 'Young Adult'],
      featured: true,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: '5',
      name: 'Wiley',
      description: 'Leading publisher of professional and academic content',
      logo: '/api/placeholder/120/60',
      booksCount: 1500,
      authorsCount: 350,
      categories: ['Professional', 'Academic', 'Technology'],
      featured: false,
      color: 'from-gray-500 to-gray-600'
    },
    {
      id: '6',
      name: 'O\'Reilly Media',
      description: 'Technology publisher known for programming and tech books',
      logo: '/api/placeholder/120/60',
      booksCount: 800,
      authorsCount: 150,
      categories: ['Technology', 'Programming', 'Data Science'],
      featured: false,
      color: 'from-red-500 to-orange-500'
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-indigo-100 dark:bg-indigo-900/20 rounded-full mb-4">
            <Building2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Publisher Brands
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore books from renowned publishers and discover quality content from trusted brands
          </p>
        </div>

        {/* Featured Publishers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {publishers.filter(pub => pub.featured).map((publisher) => (
            <Card key={publisher.id} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                {/* Publisher Logo/Brand */}
                <div className={`w-full h-24 bg-gradient-to-r ${publisher.color} rounded-lg flex items-center justify-center mb-6`}>
                  <div className="text-white font-bold text-lg text-center px-4">
                    {publisher.name}
                  </div>
                </div>

                {/* Publisher Info */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {publisher.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {publisher.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {publisher.booksCount.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">Books</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                      {publisher.authorsCount}
                    </div>
                    <div className="text-xs text-gray-500">Authors</div>
                  </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {publisher.categories.slice(0, 2).map((category) => (
                    <span key={category} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full">
                      {category}
                    </span>
                  ))}
                  {publisher.categories.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full">
                      +{publisher.categories.length - 2}
                    </span>
                  )}
                </div>

                {/* Action Button */}
                <Link href={`/publisher/${publisher.id}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Books
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Publisher Stats */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Publishing Excellence
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our platform partners with leading publishers worldwide to bring you the highest quality books across all genres and formats.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">100+</div>
              <div className="text-gray-300">Publishers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">50K+</div>
              <div className="text-gray-300">Books Published</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">25+</div>
              <div className="text-gray-300">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">95%</div>
              <div className="text-gray-300">Author Satisfaction</div>
            </div>
          </div>
        </div>

        {/* All Publishers */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Browse by Publisher
          </h3>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {publishers.map((publisher) => (
              <Link key={publisher.id} href={`/publisher/${publisher.id}`}>
                <Button variant="outline" className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  {publisher.name}
                </Button>
              </Link>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/publishers">
              <Button variant="primary" size="lg">
                View All Publishers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth/signup?role=publisher">
              <Button variant="outline" size="lg">
                <Building2 className="mr-2 h-4 w-4" />
                Become a Publisher
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublisherBrands;
