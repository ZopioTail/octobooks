'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, TrendingUp, DollarSign, Users, Upload, BarChart3, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { formatPrice } from '@/lib/utils';

const AuthorDashboard = () => {
  const { userProfile } = useAuth();
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalSales: 0,
    totalEarnings: 0,
    monthlyEarnings: 0,
    pendingRoyalties: 0,
    totalReaders: 0
  });

  const [recentSales, setRecentSales] = useState([
    {
      bookTitle: 'The Psychology of Money',
      quantity: 5,
      earnings: 150,
      date: '2024-08-29'
    },
    {
      bookTitle: 'Atomic Habits',
      quantity: 3,
      earnings: 90,
      date: '2024-08-28'
    }
  ]);

  useEffect(() => {
    // Fetch author stats from Firebase
    const fetchAuthorStats = async () => {
      try {
        // This would fetch real data from Firebase
        setStats({
          totalBooks: 3,
          totalSales: 1250,
          totalEarnings: 125000,
          monthlyEarnings: 15000,
          pendingRoyalties: 5000,
          totalReaders: 8500
        });
      } catch (error) {
        console.error('Error fetching author stats:', error);
      }
    };

    if (userProfile?.role === 'author') {
      fetchAuthorStats();
    }
  }, [userProfile]);

  const dashboardCards = [
    {
      title: 'Total Books',
      value: stats.totalBooks,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      change: '+2 this month'
    },
    {
      title: 'Total Sales',
      value: stats.totalSales.toLocaleString(),
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      change: '+12% this month'
    },
    {
      title: 'Total Earnings',
      value: formatPrice(stats.totalEarnings),
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      change: '+8% this month'
    },
    {
      title: 'Total Readers',
      value: stats.totalReaders.toLocaleString(),
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      change: '+15% this month'
    }
  ];

  return (
    <ProtectedRoute requiredRole="author">
      <Header />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Author Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back, {userProfile?.name}! Track your book sales and earnings.
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
            {/* Recent Sales */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Recent Sales
                    </h2>
                    <Button variant="outline" size="sm">
                      View All Sales
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentSales.map((sale, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {sale.bookTitle}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {sale.quantity} copies sold • {sale.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {formatPrice(sale.earnings)}
                          </p>
                          <p className="text-sm text-green-600">Royalty earned</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Earnings Chart Placeholder */}
              <Card className="mt-6">
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Monthly Earnings
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400">
                        Earnings chart will be implemented with Chart.js
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div>
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Quick Actions
                  </h2>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="primary" className="w-full justify-start">
                    <Upload className="h-4 w-4 mr-3" />
                    Submit New Manuscript
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-3" />
                    Manage My Books
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <DollarSign className="h-4 w-4 mr-3" />
                    Royalty Reports
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-3" />
                    Schedule Meeting
                  </Button>
                </CardContent>
              </Card>

              {/* Earnings Summary */}
              <Card className="mt-6">
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Earnings Summary
                  </h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {formatPrice(stats.monthlyEarnings)}
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-300">This Month</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {formatPrice(stats.pendingRoyalties)}
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">Pending Royalties</div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Request Payout
                  </Button>
                </CardContent>
              </Card>

              {/* Performance Tips */}
              <Card className="mt-6">
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Performance Tips
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-blue-800 dark:text-blue-300">
                        💡 Books with ratings above 4.5 sell 40% more
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-green-800 dark:text-green-300">
                        📈 Consider writing in trending categories like Self-Help
                      </p>
                    </div>
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <p className="text-purple-800 dark:text-purple-300">
                        🎯 Engage with readers through book reviews
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </ProtectedRoute>
  );
};

export default AuthorDashboard;
