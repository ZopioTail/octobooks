'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  UserCheck,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { formatPrice } from '@/lib/utils';

const AdminDashboard = () => {
  // Sample admin data - this would come from Firebase in production
  const stats = {
    totalBooks: 2847,
    totalUsers: 15420,
    totalOrders: 3256,
    totalRevenue: 2450000,
    monthlyRevenue: 185000,
    pendingOrders: 45,
    lowStockBooks: 12,
    newUsers: 234
  };

  const recentOrders = [
    {
      id: 'ORD001',
      customer: 'John Doe',
      amount: 599,
      status: 'processing',
      date: '2024-08-29'
    },
    {
      id: 'ORD002',
      customer: 'Jane Smith',
      amount: 899,
      status: 'shipped',
      date: '2024-08-29'
    },
    {
      id: 'ORD003',
      customer: 'Mike Johnson',
      amount: 299,
      status: 'delivered',
      date: '2024-08-28'
    }
  ];

  const dashboardCards = [
    {
      title: 'Total Revenue',
      value: formatPrice(stats.totalRevenue),
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Total Books',
      value: stats.totalBooks.toLocaleString(),
      change: '+5.2%',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      change: '+8.1%',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      change: '+15.3%',
      icon: ShoppingCart,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ];

  const quickActions = [
    { name: 'Add New Book', icon: BookOpen, href: '/admin/books/new', color: 'bg-blue-600' },
    { name: 'Manage Orders', icon: Package, href: '/admin/orders', color: 'bg-green-600' },
    { name: 'User Management', icon: UserCheck, href: '/admin/users', color: 'bg-purple-600' },
    { name: 'Reports', icon: FileText, href: '/admin/reports', color: 'bg-orange-600' }
  ];

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back! Here's what's happening with your bookstore today.
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
                        {card.change} from last month
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
            {/* Recent Orders */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Recent Orders
                    </h2>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            Order #{order.id}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {order.customer} • {order.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {formatPrice(order.amount)}
                          </p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
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
                  {quickActions.map((action) => (
                    <Link key={action.name} href={action.href}>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <div className={`p-2 rounded-lg ${action.color} mr-3`}>
                          <action.icon className="h-4 w-4 text-white" />
                        </div>
                        {action.name}
                      </Button>
                    </Link>
                  ))}
                </CardContent>
              </Card>

              {/* Alerts */}
              <Card className="mt-6">
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Alerts
                  </h2>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-300">
                      {stats.lowStockBooks} books are running low on stock
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      {stats.pendingOrders} orders pending approval
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-green-800 dark:text-green-300">
                      {stats.newUsers} new users this week
                    </p>
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

export default AdminDashboard;
