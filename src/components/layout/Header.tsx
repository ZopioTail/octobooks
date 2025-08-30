'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, X, Heart, LogOut, Settings, ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { signOutUser } from '@/lib/auth';
import { cn, getInitials } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isAuthenticated, userProfile } = useAuth();
  const { itemCount } = useCart();

  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);

  const bookCategories = {
    'Fiction': [
      { name: 'Literary Fiction', href: '/category/fiction/literary' },
      { name: 'Historical Fiction', href: '/category/fiction/historical' },
      { name: 'Romance', href: '/category/fiction/romance' },
      { name: 'Thriller & Mystery', href: '/category/fiction/thriller-mystery' },
      { name: 'Fantasy & Sci-Fi', href: '/category/fiction/fantasy-sci-fi' }
    ],
    'Non-Fiction': [
      { name: 'Biography & Memoir', href: '/category/non-fiction/biography' },
      { name: 'Self-Help', href: '/category/non-fiction/self-help' },
      { name: 'Business & Economics', href: '/category/non-fiction/business' },
      { name: 'Politics', href: '/category/non-fiction/politics' },
      { name: 'Travel', href: '/category/non-fiction/travel' }
    ],
    'Academic & Education': [
      { name: 'School Textbooks', href: '/category/academic/school' },
      { name: 'College/University', href: '/category/academic/college' },
      { name: 'Competitive Exams', href: '/category/academic/exams' },
      { name: 'Research', href: '/category/academic/research' }
    ],
    'Children & Young Adult': [
      { name: 'Picture Books', href: '/category/children/picture-books' },
      { name: 'Early Learning', href: '/category/children/early-learning' },
      { name: 'Young Adult Fiction', href: '/category/children/young-adult' }
    ],
    'Professional & Technical': [
      { name: 'Law', href: '/category/professional/law' },
      { name: 'Medicine', href: '/category/professional/medicine' },
      { name: 'Engineering', href: '/category/professional/engineering' },
      { name: 'Management', href: '/category/professional/management' }
    ],
    'Special Categories': [
      { name: 'New Arrivals', href: '/books?sort=newest' },
      { name: 'Bestsellers', href: '/books?sort=bestseller' },
      { name: 'Offers & Discounts', href: '/books?discounts=true' }
    ]
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Books', href: '/books' },
    { name: 'Authors', href: '/authors' },
    { name: 'Publishers', href: '/publishers' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 dark:bg-gray-900/95 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                <span className="text-white font-bold text-lg">📚</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Octobooks
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1 hidden sm:block">
                  Your Digital Library
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium relative group px-3 py-2"
              >
                {item.name}
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-4/5"></span>
              </Link>
            ))}
            
            {/* Book Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowCategoriesMenu(!showCategoriesMenu)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium px-3 py-2 group"
              >
                <span>Book Categories</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showCategoriesMenu ? 'rotate-180' : ''}`} />
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-4/5"></span>
              </button>

              {/* Categories Dropdown Menu */}
              {showCategoriesMenu && (
                <div className="absolute top-full left-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-50 grid grid-cols-2 gap-4">
                  {Object.entries(bookCategories).map(([category, items]) => (
                    <div key={category}>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2 pb-1 border-b border-gray-200 dark:border-gray-700">
                        {category}
                      </h3>
                      <div className="space-y-1">
                        {items.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1"
                            onClick={() => setShowCategoriesMenu(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-6">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search books, authors, publishers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-base"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile search button */}
            <button className="lg:hidden p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all">
              <Search className="h-5 w-5" />
            </button>

            {/* Wishlist */}
            <Link href="/wishlist" className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 relative hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all">
              <Heart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center shadow-lg">
                0
              </span>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 relative hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg animate-pulse">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>

            {/* User menu */}
            <div className="relative">
              {isAuthenticated && userProfile ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-7 h-7 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                      {userProfile.profileImage ? (
                        <img
                          src={userProfile.profileImage}
                          alt={userProfile.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                          {getInitials(userProfile.name)}
                        </span>
                      )}
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {userProfile.name.split(' ')[0]}
                    </span>
                  </button>

                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="h-4 w-4 inline mr-2" />
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings className="h-4 w-4 inline mr-2" />
                        Settings
                      </Link>
                      <hr className="my-2 border-gray-200 dark:border-gray-700" />
                      <button
                        onClick={async () => {
                          await signOutUser();
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <LogOut className="h-4 w-4 inline mr-2" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/auth/login">
                  <Button variant="outline" size="sm" className="hidden sm:flex text-sm">
                    <User className="h-4 w-4 mr-1.5" />
                    Login
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="space-y-4">
              {/* Mobile search */}
              <div className="px-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search books, authors, publishers..."
                    className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-base"
                  />
                </div>
              </div>

              {/* Mobile navigation links */}
              <nav className="space-y-2 px-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800 transition-colors text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile Book Categories */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                  <h3 className="px-3 py-2 font-semibold text-gray-900 dark:text-white text-sm">
                    Book Categories
                  </h3>
                  <div className="space-y-1">
                    {Object.entries(bookCategories).map(([category, items]) => (
                      <div key={category} className="pl-4">
                        <h4 className="font-medium text-gray-800 dark:text-gray-300 text-sm mb-2">
                          {category}
                        </h4>
                        <div className="space-y-1">
                          {items.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block px-3 py-1.5 text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-gray-50 rounded-lg dark:hover:text-blue-400 dark:hover:bg-gray-800 transition-colors text-sm"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </nav>

              {/* Mobile auth section */}
              <div className="px-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                {isAuthenticated && userProfile ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 px-3 py-2">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                        {userProfile.profileImage ? (
                          <img
                            src={userProfile.profileImage}
                            alt={userProfile.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                            {getInitials(userProfile.name)}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{userProfile.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">{userProfile.role}</p>
                      </div>
                    </div>
                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full text-sm">
                        <User className="h-4 w-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full text-red-600 hover:text-red-700 text-sm"
                      onClick={async () => {
                        await signOutUser();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="primary" className="w-full text-sm">
                      <User className="h-4 w-4 mr-2" />
                      Login / Sign Up
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
