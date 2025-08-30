'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, BookOpen, TrendingUp, DollarSign, Users, BarChart3, Plus, Eye, Download, Calendar, Star } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Select from '@/components/ui/Select';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { formatPrice } from '@/lib/utils';

const PublisherDashboard = () => {
  const [timeRange, setTimeRange] = useState('month');

  // Sample publisher data
  const publisherStats = {
    totalBooks: 125,
    totalAuthors: 45,
    totalSales: 15600,
    totalRevenue: 780000,
    averageRating: 4.4,
    monthlyRevenue: 125000,
    monthlyViews: 256000,
    activeBooks: 98
  };

  const topPerformingBooks = [
    {
      id: '1',
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      sales: 1250,
      revenue: 43750,
      rating: 4.8,
      reviews: 156,
      category: 'Business'
    },
    {
      id: '2',
      title: 'Atomic Habits',
      author: 'James Clear',
      sales: 980,
      revenue: 34300,
      rating: 4.9,
      reviews: 203,
      category: 'Self-Help'
    },
    {
      id: '3',
      title: 'Think and Grow Rich',
      author: 'Napoleon Hill',
      sales: 750,
      revenue: 26250,
      rating: 4.6,
      reviews: 89,
      category: 'Business'
    }
  ];

  const recentAuthors = [
    {
      id: '1',
      name: 'Sarah Johnson',
      booksCount: 3,
      totalSales: 2100,
      joinDate: '2024-06-15',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Michael Chen',
      booksCount: 2,
      totalSales: 1800,
      joinDate: '2024-07-20',
      status: 'Active'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      booksCount: 1,
      totalSales: 450,
      joinDate: '2024-08-10',
      status: 'Pending'
    }
  ];

  return (
    <DashboardLayout title="Publisher Dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Publisher Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your catalog and track performance across all your publications.
              </p>
            </div>
            <div className="flex space-x-4">
              <Select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                options={[
                  { value: 'week', label: 'Last Week' },
                  { value: 'month', label: 'Last Month' },
                  { value: 'quarter', label: 'Last Quarter' },
                  { value: 'year', label: 'Last Year' }
                ]}
              />
              <Link href="/publisher/books/new">
                <Button variant="primary">
                  <Plus className="h-5 w-5 mr-2" />
                  Add Book
                </Button>
              </Link>
            </div>
          </div>
        </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Books</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{publisherStats.totalBooks}</p>
                    <p className="text-xs text-green-600">+5 this month</p>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Authors</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{publisherStats.totalAuthors}</p>
                    <p className="text-xs text-green-600">+3 this month</p>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatPrice(publisherStats.totalRevenue)}</p>
                    <p className="text-xs text-green-600">+12% this month</p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{publisherStats.averageRating}</p>
                    <p className="text-xs text-green-600">+0.2 this month</p>
                  </div>
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                    <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Performing Books */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Top Performing Books
                </h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformingBooks.map((book, index) => (
                    <div key={book.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">{book.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">by {book.author}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-green-600">{book.sales} sales</span>
                          <span className="text-sm text-purple-600">{formatPrice(book.revenue)}</span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-sm">{book.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Authors */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Recent Authors
                  </h2>
                  <Link href="/publisher/authors">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAuthors.map((author) => (
                    <div key={author.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-lg">👤</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{author.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <span>{author.booksCount} books</span>
                            <span>•</span>
                            <span>{author.totalSales} sales</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={author.status === 'Active' ? 'success' : 'warning'}>
                        {author.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PublisherDashboard;
