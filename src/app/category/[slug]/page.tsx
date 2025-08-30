'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Filter, Grid, List, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { Card, CardContent } from '@/components/ui/Card';
import BookCard from '@/components/books/BookCard';
import Loading from '@/components/ui/Loading';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getBooks, BookFilters } from '@/lib/books';
import { Book } from '@/types';
import { SORT_OPTIONS, PRICE_RANGES, LANGUAGES, BOOK_FORMATS } from '@/lib/constants';

const CategoryPage = () => {
  const params = useParams();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [sortBy, setSortBy] = useState('bestseller');
  const [filters, setFilters] = useState<BookFilters>({
    category: typeof params.slug === 'string' ? params.slug : '',
    author: '',
    publisher: '',
    language: '',
    format: '',
    minPrice: undefined,
    maxPrice: undefined,
    minRating: 0,
    inStock: true
  });

  const booksPerPage = 12;
  const categoryName = typeof params.slug === 'string'
    ? params.slug.charAt(0).toUpperCase() + params.slug.slice(1).replace('-', ' ')
    : 'Books';

  useEffect(() => {
    fetchBooks();
  }, [sortBy, filters, currentPage, params.slug]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const result = await getBooks({
        filters: {
          ...filters,
          category: typeof params.slug === 'string' ? params.slug : ''
        },
        sortBy: sortBy as any,
        sortOrder: 'desc',
        limitCount: booksPerPage
      });

      setBooks(result.books);
      setHasMore(result.hasMore);
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof BookFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (range: string) => {
    if (range) {
      const [min, max] = range.split('-').map(Number);
      setFilters(prev => ({ ...prev, minPrice: min, maxPrice: max }));
    } else {
      setFilters(prev => ({ ...prev, minPrice: undefined, maxPrice: undefined }));
    }
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      category: typeof params.slug === 'string' ? params.slug : '',
      author: '',
      publisher: '',
      language: '',
      format: '',
      minPrice: undefined,
      maxPrice: undefined,
      minRating: 0,
      inStock: true
    });
    setCurrentPage(1);
  };

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
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="priceRange"
                          value=""
                          checked={!filters.minPrice && !filters.maxPrice}
                          onChange={(e) => handlePriceRangeChange(e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-sm">All Prices</span>
                      </label>
                      {PRICE_RANGES.map((range) => (
                        <label key={range.label} className="flex items-center">
                          <input
                            type="radio"
                            name="priceRange"
                            value={`${range.min}-${range.max}`}
                            checked={filters.minPrice === range.min && filters.maxPrice === range.max}
                            onChange={(e) => handlePriceRangeChange(e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-sm">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Language */}
                  <div className="mb-6">
                    <Select
                      label="Language"
                      value={filters.language || ''}
                      onChange={(e) => handleFilterChange('language', e.target.value)}
                      options={[
                        { value: '', label: 'All Languages' },
                        ...LANGUAGES.map(lang => ({ value: lang, label: lang }))
                      ]}
                    />
                  </div>

                  {/* Format */}
                  <div className="mb-6">
                    <Select
                      label="Format"
                      value={filters.format || ''}
                      onChange={(e) => handleFilterChange('format', e.target.value)}
                      options={[
                        { value: '', label: 'All Formats' },
                        ...BOOK_FORMATS.map(format => ({ value: format, label: format }))
                      ]}
                    />
                  </div>

                  {/* Author */}
                  <div className="mb-6">
                    <Input
                      label="Author"
                      placeholder="Search by author"
                      value={filters.author || ''}
                      onChange={(e) => handleFilterChange('author', e.target.value)}
                    />
                  </div>

                  {/* In Stock Only */}
                  <div className="mb-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.inStock}
                        onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm">In Stock Only</span>
                    </label>
                  </div>

                  {/* Clear Filters */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={clearFilters}
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
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    options={SORT_OPTIONS}
                  />

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

              {/* Loading State */}
              {loading ? (
                <div className="text-center py-12">
                  <Loading size="lg" />
                  <p className="mt-4 text-gray-600 dark:text-gray-400">Loading books...</p>
                </div>
              ) : books.length > 0 ? (
                <>
                  {/* Books Grid */}
                  <div className={`grid gap-6 ${
                    viewMode === 'grid'
                      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                      : 'grid-cols-1'
                  }`}>
                    {books.map((book) => (
                      <BookCard
                        key={book.bookId}
                        book={book}
                        variant={viewMode === 'list' ? 'list' : 'default'}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {hasMore && (
                    <div className="text-center mt-12">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setCurrentPage(prev => prev + 1)}
                      >
                        Load More Books
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No books found in {categoryName}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Try adjusting your filters or browse other categories.
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CategoryPage;
