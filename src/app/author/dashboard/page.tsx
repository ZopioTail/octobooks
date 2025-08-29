'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, TrendingUp, DollarSign, Users, Eye, Plus, Edit, BarChart3, Calendar, Download } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { formatPrice } from '@/lib/utils';

const AuthorDashboard = () => {
  const [timeRange, setTimeRange] = useState('month');

  // Sample author data
  const authorStats = {
    totalBooks: 5,
    totalSales: 1250,
    totalEarnings: 45000,
    totalReviews: 89,
    averageRating: 4.6,
    monthlyEarnings: 8500,
    monthlyViews: 15600,
    followers: 2340
  };

  const recentBooks = [
    {
      id: '1',
      title: 'The Psychology of Money',
      status: 'Published',
      sales: 450,
      earnings: 15750,
      rating: 4.8,
      reviews: 45,
      publishDate: '2024-06-15',
      views: 5600
    },
    {
      id: '2',
      title: 'Atomic Habits for Success',
      status: 'Published',
      sales: 320,
      earnings: 11200,
      rating: 4.5,
      reviews: 28,
      publishDate: '2024-07-20',
      views: 4200
    },
    {
      id: '3',
      title: 'Digital Marketing Mastery',
      status: 'Under Review',
      sales: 0,
      earnings: 0,
      rating: 0,
      reviews: 0,
      publishDate: null,
      views: 0
    }
  ];

  const salesData = [
    { month: 'Jan', sales: 120, earnings: 4200 },
    { month: 'Feb', sales: 150, earnings: 5250 },
    { month: 'Mar', sales: 180, earnings: 6300 },
    { month: 'Apr', sales: 200, earnings: 7000 },
    { month: 'May', sales: 250, earnings: 8750 },
    { month: 'Jun', sales: 350, earnings: 12250 }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Published':
        return <Badge variant="success">Published</Badge>;
      case 'Under Review':
        return <Badge variant="warning">Under Review</Badge>;
      case 'Draft':
        return <Badge variant="default">Draft</Badge>;
      case 'Rejected':
        return <Badge variant="error">Rejected</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Author Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Welcome back! Here's how your books are performing.
                </p>
              </div>
              <Link href="/author/books/new">
                <Button variant="primary" size="lg">
                  <Plus className="h-5 w-5 mr-2" />
                  Add New Book
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Books</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{authorStats.totalBooks}</p>
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
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Sales</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{authorStats.totalSales}</p>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Earnings</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatPrice(authorStats.totalEarnings)}</p>
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
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{authorStats.averageRating}</p>
                  </div>
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                    <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Books */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Your Books
                    </h2>
                    <Link href="/author/books">
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBooks.map((book) => (
                      <div key={book.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded flex items-center justify-center">
                            <span className="text-lg">📖</span>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">{book.title}</h3>
                            <div className="flex items-center space-x-4 mt-1">
                              {getStatusBadge(book.status)}
                              {book.status === 'Published' && (
                                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                  <span>{book.sales} sales</span>
                                  <span>•</span>
                                  <span>{formatPrice(book.earnings)}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Link href={`/author/books/${book.id}/edit`}>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/author/books/${book.id}/analytics`}>
                            <Button variant="outline" size="sm">
                              <BarChart3 className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Analytics */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Quick Actions
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Link href="/author/books/new">
                      <Button variant="primary" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Book
                      </Button>
                    </Link>
                    <Link href="/author/analytics">
                      <Button variant="outline" className="w-full">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Analytics
                      </Button>
                    </Link>
                    <Link href="/author/earnings">
                      <Button variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download Report
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Performance */}
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    This Month
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Earnings</span>
                      <span className="font-bold text-green-600">{formatPrice(authorStats.monthlyEarnings)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Views</span>
                      <span className="font-bold text-blue-600">{authorStats.monthlyViews.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Followers</span>
                      <span className="font-bold text-purple-600">{authorStats.followers.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AuthorDashboard;
