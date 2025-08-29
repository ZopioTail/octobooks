'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Filter, Grid, List, Star, ShoppingCart, Heart } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { formatPrice } from '@/lib/utils';
import { SORT_OPTIONS, PRICE_RANGES, LANGUAGES, BOOK_FORMATS } from '@/lib/constants';

const CategoryPage = () => {
  const params = useParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('bestselling');
  const [filters, setFilters] = useState({
    priceRange: '',
    language: '',
    format: '',
    author: '',
    publisher: '',
    rating: 0
  });
  const [showFilters, setShowFilters] = useState(false);

  // Sample books data - this would come from Firebase in production
  const books = [
    {
      id: '1',
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      publisher: 'Jaico Publishing',
      price: 399,
      finalPrice: 299,
      rating: 4.8,
      reviewsCount: 1250,
      coverImage: '/api/placeholder/300/400',
      category: 'Business',
      language: 'English',
      format: 'Paperback'
    },
    // Add more sample books...
  ];

  const categoryName = typeof params.slug === 'string' 
    ? params.slug.charAt(0).toUpperCase() + params.slug.slice(1).replace('-', ' ')
    : 'Books';

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Category Header */}
        <div className="bg-gray-50 dark:bg-gray-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {categoryName} Books
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Discover amazing {categoryName.toLowerCase()} books from top authors and publishers
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Filters</h3>
                  
                  {/* Price Range */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Price Range</h4>
                    <div className="space-y-2">
                      {PRICE_RANGES.map((range) => (
                        <label key={range.label} className="flex items-center">
                          <input
                            type="radio"
                            name="priceRange"
                            value={`${range.min}-${range.max}`}
                            className="mr-2"
                            onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                          />
                          <span className="text-sm">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Language */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Language</h4>
                    <select
                      value={filters.language}
                      onChange={(e) => setFilters({...filters, language: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600"
                    >
                      <option value="">All Languages</option>
                      {LANGUAGES.map((lang) => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>

                  {/* Format */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Format</h4>
                    <div className="space-y-2">
                      {BOOK_FORMATS.map((format) => (
                        <label key={format} className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-2"
                            onChange={(e) => {
                              // Handle format filter
                            }}
                          />
                          <span className="text-sm">{format}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Author */}
                  <div className="mb-6">
                    <Input
                      label="Author"
                      placeholder="Search by author"
                      value={filters.author}
                      onChange={(e) => setFilters({...filters, author: e.target.value})}
                    />
                  </div>

                  {/* Clear Filters */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setFilters({
                      priceRange: '',
                      language: '',
                      format: '',
                      author: '',
                      publisher: '',
                      rating: 0
                    })}
                  >
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <span className="text-gray-600 dark:text-gray-400">
                    Showing {books.length} books
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  {/* View Mode */}
                  <div className="flex border border-gray-300 rounded-lg dark:border-gray-600">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Books Grid */}
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {books.map((book) => (
                  <Card key={book.id} hover className="group">
                    <CardContent className="p-4">
                      <div className={`${viewMode === 'list' ? 'flex space-x-4' : ''}`}>
                        {/* Book Cover */}
                        <div className={`${viewMode === 'list' ? 'w-24 flex-shrink-0' : 'mb-4'}`}>
                          <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                              <span className="text-4xl">📖</span>
                            </div>
                          </div>
                        </div>

                        {/* Book Info */}
                        <div className="flex-1 space-y-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                            {book.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            by {book.author}
                          </p>
                          
                          {/* Rating */}
                          <div className="flex items-center space-x-1">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < Math.floor(book.rating) ? 'fill-current' : ''}`}
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

                          {/* Actions */}
                          <div className={`flex space-x-2 ${viewMode === 'list' ? 'mt-4' : ''}`}>
                            <Button variant="primary" size="sm" className="flex-1">
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Add to Cart
                            </Button>
                            <Button variant="outline" size="sm">
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Books
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CategoryPage;
