'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, TrendingUp } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { BOOK_CATEGORIES, LANGUAGES } from '@/lib/constants';

const SearchSection = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const trendingSearches = [
    'Psychology', 'Business', 'Self Help', 'Fiction', 'Technology', 'Health'
  ];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedLanguage) params.set('language', selectedLanguage);
    
    router.push(`/search?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Find Your Next Great Read
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Search through thousands of books across all genres and discover your next favorite story
          </p>
        </div>

        {/* Enhanced Search Bar */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Main Search Input */}
              <div className="md:col-span-6">
                <Input
                  placeholder="Search books, authors, ISBN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  leftIcon={<Search className="h-5 w-5" />}
                  className="h-14 text-lg"
                />
              </div>

              {/* Category Filter */}
              <div className="md:col-span-3">
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  options={[
                    { value: '', label: 'All Categories' },
                    ...BOOK_CATEGORIES.map(cat => ({ value: cat, label: cat }))
                  ]}
                  className="h-14"
                />
              </div>

              {/* Language Filter */}
              <div className="md:col-span-2">
                <Select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  options={[
                    { value: '', label: 'All Languages' },
                    ...LANGUAGES.map(lang => ({ value: lang, label: lang }))
                  ]}
                  className="h-14"
                />
              </div>

              {/* Search Button */}
              <div className="md:col-span-1">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleSearch}
                  className="w-full h-14"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>
              
              {/* Trending Searches */}
              <div className="hidden lg:flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500 mr-2">Trending:</span>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term);
                        router.push(`/search?q=${term}`);
                      }}
                      className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">50K+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Books Available</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">1000+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Authors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">100+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Publishers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">25K+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Happy Readers</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
