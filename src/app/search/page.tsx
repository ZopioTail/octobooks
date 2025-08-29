'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, Filter, Star, ShoppingCart, Heart, SortAsc, Grid, List, X, ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { formatPrice } from '@/lib/utils';
import { BOOK_CATEGORIES, LANGUAGES } from '@/lib/constants';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Advanced filters
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    language: searchParams.get('language') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    rating: searchParams.get('rating') || '',
    format: searchParams.get('format') || '',
    publisher: searchParams.get('publisher') || '',
    sortBy: searchParams.get('sortBy') || 'relevance'
  });

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
    setLoading(true);
    // Simulate search API call
    setTimeout(() => {
      const filteredResults = applyFilters(sampleResults);
      setResults(filteredResults);
      setLoading(false);
    }, 1000);
  }, [query, filters]);

  // Update URL with current filters
  const updateURL = () => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    router.push(`/search?${params.toString()}`);
  };

  // Handle filter changes
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: '',
      language: '',
      minPrice: '',
      maxPrice: '',
      rating: '',
      format: '',
      publisher: '',
      sortBy: 'relevance'
    });
  };

  // Apply filters to results
  const applyFilters = (books: any[]) => {
    let filtered = books;

    // Text search
    if (query) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.category.toLowerCase().includes(query.toLowerCase()) ||
        book.publisher.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(book => book.category === filters.category);
    }

    // Price range filter
    if (filters.minPrice) {
      filtered = filtered.filter(book => book.finalPrice >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(book => book.finalPrice <= parseInt(filters.maxPrice));
    }

    // Rating filter
    if (filters.rating) {
      filtered = filtered.filter(book => book.rating >= parseFloat(filters.rating));
    }

    // Sort results
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.finalPrice - b.finalPrice);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.finalPrice - a.finalPrice);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.publishedDate || '').getTime() - new Date(a.publishedDate || '').getTime());
        break;
      case 'popularity':
        filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
      default: // relevance
        break;
    }

    return filtered;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL();
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

            {/* Enhanced Search Form */}
            <form onSubmit={handleSearch} className="max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-6">
                  <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search books, authors, publishers, ISBN..."
                    leftIcon={<Search className="h-5 w-5" />}
                    className="h-12"
                  />
                </div>
                <div className="md:col-span-2">
                  <Select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    options={[
                      { value: '', label: 'All Categories' },
                      ...BOOK_CATEGORIES.map(cat => ({ value: cat, label: cat }))
                    ]}
                    className="h-12"
                  />
                </div>
                <div className="md:col-span-2">
                  <Select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    options={[
                      { value: 'relevance', label: 'Relevance' },
                      { value: 'price-low', label: 'Price: Low to High' },
                      { value: 'price-high', label: 'Price: High to Low' },
                      { value: 'rating', label: 'Highest Rated' },
                      { value: 'newest', label: 'Newest First' },
                      { value: 'popularity', label: 'Most Popular' }
                    ]}
                    className="h-12"
                  />
                </div>
                <div className="md:col-span-2">
                  <Button type="submit" variant="primary" loading={loading} className="w-full h-12">
                    Search
                  </Button>
                </div>
              </div>
            </form>

            {/* Search Info and Controls */}
            <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                {query && (
                  <span className="text-gray-600 dark:text-gray-400">
                    Showing results for: <strong>"{query}"</strong>
                  </span>
                )}
                <Badge variant="info">
                  {results.length} results found
                </Badge>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                  <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </Button>

                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Advanced Filters</h3>
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    <X className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Price Range
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        placeholder="Min ₹"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      />
                      <Input
                        type="number"
                        placeholder="Max ₹"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Minimum Rating
                    </label>
                    <Select
                      value={filters.rating}
                      onChange={(e) => handleFilterChange('rating', e.target.value)}
                      options={[
                        { value: '', label: 'Any Rating' },
                        { value: '4.5', label: '4.5+ Stars' },
                        { value: '4.0', label: '4.0+ Stars' },
                        { value: '3.5', label: '3.5+ Stars' },
                        { value: '3.0', label: '3.0+ Stars' }
                      ]}
                    />
                  </div>

                  {/* Language Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Language
                    </label>
                    <Select
                      value={filters.language}
                      onChange={(e) => handleFilterChange('language', e.target.value)}
                      options={[
                        { value: '', label: 'All Languages' },
                        ...LANGUAGES.map(lang => ({ value: lang, label: lang }))
                      ]}
                    />
                  </div>

                  {/* Format Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Format
                    </label>
                    <Select
                      value={filters.format}
                      onChange={(e) => handleFilterChange('format', e.target.value)}
                      options={[
                        { value: '', label: 'All Formats' },
                        { value: 'Paperback', label: 'Paperback' },
                        { value: 'Hardcover', label: 'Hardcover' },
                        { value: 'E-book', label: 'E-book' },
                        { value: 'Audiobook', label: 'Audiobook' }
                      ]}
                    />
                  </div>
                </div>

                {/* Active Filters */}
                {Object.entries(filters).some(([key, value]) => value && key !== 'sortBy') && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Active Filters:</h4>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(filters).map(([key, value]) => {
                        if (!value || key === 'sortBy') return null;
                        return (
                          <Badge key={key} variant="default" className="flex items-center space-x-2">
                            <span>{key}: {value}</span>
                            <button
                              onClick={() => handleFilterChange(key, '')}
                              className="ml-1 hover:text-red-500"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

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
