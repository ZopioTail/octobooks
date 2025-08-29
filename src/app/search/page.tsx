'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, Star, ShoppingCart, Heart } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { formatPrice } from '@/lib/utils';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  // Sample search results - this would come from Firebase search in production
  const sampleResults = [
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
      description: 'Timeless lessons on wealth, greed, and happiness...'
    },
    {
      id: '2',
      title: 'Atomic Habits',
      author: 'James Clear',
      publisher: 'Random House',
      price: 450,
      finalPrice: 350,
      rating: 4.9,
      reviewsCount: 2100,
      coverImage: '/api/placeholder/300/400',
      category: 'Self-Help',
      description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones...'
    }
  ];

  useEffect(() => {
    if (query) {
      setLoading(true);
      // Simulate search API call
      setTimeout(() => {
        setResults(sampleResults.filter(book => 
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase()) ||
          book.category.toLowerCase().includes(query.toLowerCase())
        ));
        setLoading(false);
      }, 1000);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL and trigger search
    window.history.pushState({}, '', `/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Search Results
            </h1>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-2xl">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search books, authors, publishers..."
                    leftIcon={<Search className="h-5 w-5" />}
                  />
                </div>
                <Button type="submit" variant="primary" loading={loading}>
                  Search
                </Button>
              </div>
            </form>

            {query && (
              <div className="mt-4 flex items-center space-x-4">
                <span className="text-gray-600 dark:text-gray-400">
                  Showing results for: <strong>"{query}"</strong>
                </span>
                <Badge variant="info">
                  {results.length} results found
                </Badge>
              </div>
            )}
          </div>

          {/* Search Results */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Searching...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-6">
              {results.map((book) => (
                <Card key={book.id} hover>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                      {/* Book Cover */}
                      <div className="w-32 h-44 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 mx-auto md:mx-0">
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <span className="text-4xl">📖</span>
                        </div>
                      </div>

                      {/* Book Details */}
                      <div className="flex-1 space-y-3">
                        <div>
                          <Badge variant="info" size="sm" className="mb-2">
                            {book.category}
                          </Badge>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {book.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            by <span className="font-medium">{book.author}</span> • {book.publisher}
                          </p>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center space-x-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(book.rating) ? 'fill-current' : ''}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {book.rating} ({book.reviewsCount} reviews)
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
                          {book.description}
                        </p>

                        {/* Price and Actions */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">
                              {formatPrice(book.finalPrice)}
                            </span>
                            {book.price !== book.finalPrice && (
                              <>
                                <span className="text-lg text-gray-500 line-through">
                                  {formatPrice(book.price)}
                                </span>
                                <Badge variant="success" size="sm">
                                  {Math.round(((book.price - book.finalPrice) / book.price) * 100)}% off
                                </Badge>
                              </>
                            )}
                          </div>

                          <div className="flex space-x-3">
                            <Button variant="outline" size="sm">
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button variant="primary" size="sm">
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No results found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We couldn't find any books matching "{query}". Try different keywords or browse our categories.
              </p>
              <div className="space-x-4">
                <Button variant="outline" onClick={() => setQuery('')}>
                  Clear Search
                </Button>
                <Button variant="primary">
                  Browse Categories
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Start your search
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Enter keywords to find books, authors, or publishers
              </p>
            </div>
          )}

          {/* Search Suggestions */}
          {!query && (
            <div className="mt-12">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Popular Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'Fiction', 'Self-Help', 'Business', 'Psychology', 'Biography',
                  'Science Fiction', 'Romance', 'Mystery', 'History', 'Philosophy'
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SearchPage;
