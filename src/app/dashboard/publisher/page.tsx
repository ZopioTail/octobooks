'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Users, DollarSign, TrendingUp, Plus, FileText, Settings, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { PublisherOnly } from '@/components/auth/ProtectedRoute';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { formatPrice } from '@/lib/utils';
import { getPublisherEarnings, getPublisherSalesReport } from '@/lib/royalty';

const PublisherDashboard = () => {
  const { userProfile } = useAuth();
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalAuthors: 0,
    totalSales: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    pendingPayouts: 0
  });
  const [loading, setLoading] = useState(true);

  const [topBooks, setTopBooks] = useState([
    {
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      sales: 1250,
      revenue: 37500,
      rating: 4.8
    },
    {
      title: 'Atomic Habits',
      author: 'James Clear',
      sales: 2100,
      revenue: 63000,
      rating: 4.9
    }
  ]);

  const [recentAuthors, setRecentAuthors] = useState([
    {
      name: 'Morgan Housel',
      books: 3,
      totalSales: 5000,
      joinDate: '2023-12-01'
    },
    {
      name: 'James Clear',
      books: 2,
      totalSales: 8500,
      joinDate: '2023-11-15'
    }
  ]);

  useEffect(() => {
    const fetchPublisherStats = async () => {
      try {
        if (!userProfile) return;
        
        // Fetch real data from Firebase
        const publisherEarnings = await getPublisherEarnings(userProfile.userId);
        const salesData = await getPublisherSalesReport(userProfile.userId);
        
        const totalSales = salesData.reduce((sum, sale) => sum + sale.quantity, 0);
        const totalRevenue = salesData.reduce((sum, sale) => sum + sale.saleAmount, 0);
        
        // Calculate monthly revenue (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const monthlyRevenue = salesData
          .filter(sale => new Date(sale.date) >= thirtyDaysAgo)
          .reduce((sum, sale) => sum + sale.saleAmount, 0);
        
        setStats({
          totalBooks: 45, // This would need to be fetched from books collection
          totalAuthors: 25, // This would need to be fetched from authors collection
          totalSales,
          totalRevenue,
          monthlyRevenue,
          pendingPayouts: publisherEarnings
        });
      } catch (error) {
        console.error('Error fetching publisher stats:', error);
        // Fallback to sample data
        setStats({
          totalBooks: 45,
          totalAuthors: 25,
          totalSales: 15000,
          totalRevenue: 750000,
          monthlyRevenue: 85000,
          pendingPayouts: 25000
        });
      } finally {
        setLoading(false);
      }
    };

    if (userProfile?.role === 'publisher') {
      fetchPublisherStats();
    } else {
      setLoading(false);
    }
  }, [userProfile]);

  const dashboardCards = [
    {
      title: 'Total Books',
      value: stats.totalBooks,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      change: '+5 this month'
    },
    {
      title: 'Total Authors',
      value: stats.totalAuthors,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      change: '+3 this month'
    },
    {
      title: 'Monthly Revenue',
      value: formatPrice(stats.monthlyRevenue),
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      change: '+12% from last month'
    },
    {
      title: 'Total Sales',
      value: stats.totalSales.toLocaleString(),
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      change: '+18% this month'
    }
  ];

  const quickActions = [
    { name: 'Add New Book', icon: Plus, href: '/dashboard/publisher/books/new', color: 'bg-blue-600' },
    { name: 'Manage Authors', icon: Users, href: '/dashboard/publisher/authors', color: 'bg-green-600' },
    { name: 'Sales Reports', icon: FileText, href: '/dashboard/publisher/reports', color: 'bg-purple-600' },
    { name: 'Publisher Settings', icon: Settings, href: '/dashboard/publisher/settings', color: 'bg-orange-600' }
  ];

  if (loading) {
    return (
      <PublisherOnly>
        <DashboardLayout title="Publisher Dashboard">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading publisher dashboard...</p>
            </div>
          </div>
        </DashboardLayout>
      </PublisherOnly>
    );
  }

  return (
    <PublisherOnly>
      <DashboardLayout title="Publisher Dashboard">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Publisher Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back, {userProfile?.name}! Manage your books and authors.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardCards.map((card) => (
              <Card key={card.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {card.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {card.value}
                      </p>
                      <p className="text-sm text-green-600 mt-1">
                        {card.change}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${card.bgColor}`}>
                      <card.icon className={`h-6 w-6 ${card.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Top Performing Books */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Top Performing Books
                    </h2>
                    <Button variant="outline" size="sm" onClick={() => window.location.href = '/dashboard/publisher/books'}>
                      View All Books
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topBooks.map((book, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-16 bg-gray-200 rounded overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                              <span className="text-lg">📖</span>
                            </div>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {book.title}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              by {book.author}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-yellow-600">★ {book.rating}</span>
                              <span className="text-xs text-gray-500">•</span>
                              <span className="text-xs text-gray-500">{book.sales} sales</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {formatPrice(book.revenue)}
                          </p>
                          <p className="text-sm text-green-600">Revenue</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Author Management */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Quick Actions
                  </h2>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickActions.map((action) => (
                    <Button
                      key={action.name}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => window.location.href = action.href}
                    >
                      <div className={`p-2 rounded-lg ${action.color} mr-3`}>
                        <action.icon className="h-4 w-4 text-white" />
                      </div>
                      {action.name}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Authors */}
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Recent Authors
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentAuthors.map((author, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white text-sm">
                            {author.name}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {author.books} books • {author.totalSales} sales
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Summary */}
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Revenue Summary
                  </h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {formatPrice(stats.totalRevenue)}
                    </div>
                    <div className="text-sm text-purple-700 dark:text-purple-300">Total Revenue</div>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {formatPrice(stats.pendingPayouts)}
                    </div>
                    <div className="text-sm text-orange-700 dark:text-orange-300">Pending Payouts</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </PublisherOnly>
  );
};

export default PublisherDashboard;
