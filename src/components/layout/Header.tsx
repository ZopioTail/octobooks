'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, X, Heart, LogOut, Settings } from 'lucide-react';
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

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Fiction', href: '/category/fiction' },
    { name: 'Non-Fiction', href: '/category/non-fiction' },
    { name: 'Educational', href: '/category/educational' },
    { name: 'Children', href: '/category/children' },
    { name: 'Professional', href: '/category/professional' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 dark:bg-gray-900/95 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                <span className="text-white font-bold text-xl">📚</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Octobooks
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1 hidden sm:block">
                  Your Digital Library
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium text-lg relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search books, authors, publishers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-6">
            {/* Mobile search button */}
            <button className="lg:hidden p-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all">
              <Search className="h-6 w-6" />
            </button>

            {/* Wishlist */}
            <Link href="/wishlist" className="p-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 relative hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all">
              <Heart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                0
              </span>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="p-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 relative hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center shadow-lg animate-pulse">
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
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                      {userProfile.profileImage ? (
                        <img
                          src={userProfile.profileImage}
                          alt={userProfile.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
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
                  <Button variant="outline" size="sm" className="hidden sm:flex">
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
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
                    placeholder="Search books..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
              </div>

              {/* Mobile navigation links */}
              <nav className="space-y-2 px-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile auth section */}
              <div className="px-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                {isAuthenticated && userProfile ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 px-3 py-2">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                        {userProfile.profileImage ? (
                          <img
                            src={userProfile.profileImage}
                            alt={userProfile.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                            {getInitials(userProfile.name)}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{userProfile.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">{userProfile.role}</p>
                      </div>
                    </div>
                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        <User className="h-4 w-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full text-red-600 hover:text-red-700"
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
                    <Button variant="primary" className="w-full">
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
