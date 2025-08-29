'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Package, Heart, CreditCard, Settings, LogOut, Bell, TrendingUp, BookOpen, Target, Award, Download } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { formatPrice } from '@/lib/utils';

const CustomerDashboard = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  // Sample user data - this would come from Firebase in production
  const user = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+91 98765 43210',
    walletBalance: 1250,
    rewardsPoints: 850,
    totalOrders: 12,
    totalSpent: 15600,
    readingGoal: 12,
    booksRead: 8,
    currentStreak: 5
  };

  const notifications = [
    {
      id: 1,
      type: 'order',
      title: 'Order Delivered',
      message: 'Your order #ORD001 has been delivered successfully',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'recommendation',
      title: 'New Book Recommendation',
      message: 'Based on your reading history, you might like "Think and Grow Rich"',
      time: '1 day ago',
      read: false
    },
    {
      id: 3,
      type: 'offer',
      title: 'Special Discount',
      message: '20% off on all fiction books this weekend!',
      time: '2 days ago',
      read: true
    }
  ];

  const recentOrders = [
    {
      id: 'ORD001',
      date: '2024-08-25',
      status: 'delivered',
      total: 599,
      items: 2
    },
    {
      id: 'ORD002',
      date: '2024-08-20',
      status: 'shipped',
      total: 899,
      items: 3
    },
    {
      id: 'ORD003',
      date: '2024-08-15',
      status: 'processing',
      total: 299,
      items: 1
    }
  ];

  const dashboardStats = [
    {
      title: 'Total Orders',
      value: user.totalOrders,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      change: '+2 this month'
    },
    {
      title: 'Total Spent',
      value: formatPrice(user.totalSpent),
      icon: CreditCard,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      change: '+₹1,200 this month'
    },
    {
      title: 'Books Read',
      value: `8/12`,
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      change: '67% of yearly goal'
    },
    {
      title: 'Reading Streak',
      value: `5 days`,
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      change: 'Keep it up!'
    }
  ];

  const quickActions = [
    { name: 'Browse Books', href: '/books', icon: BookOpen, color: 'bg-blue-600' },
    { name: 'My Orders', href: '/dashboard/orders', icon: Package, color: 'bg-green-600' },
    { name: 'Wishlist', href: '/wishlist', icon: Heart, color: 'bg-red-600' },
    { name: 'Account Settings', href: '/dashboard/profile', icon: Settings, color: 'bg-purple-600' }
  ];

  const menuItems = [
    { name: 'Profile', icon: User, href: '/dashboard/profile', active: true },
    { name: 'Orders', icon: Package, href: '/dashboard/orders', active: false },
    { name: 'Wishlist', icon: Heart, href: '/dashboard/wishlist', active: false },
    { name: 'Wallet', icon: CreditCard, href: '/dashboard/wallet', active: false },
    { name: 'Settings', icon: Settings, href: '/dashboard/settings', active: false },
  ];

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <nav className="space-y-1">
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={`flex items-center space-x-3 px-6 py-3 text-sm font-medium transition-colors ${
                          item.active
                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600 dark:bg-blue-900/20 dark:text-blue-300'
                            : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </a>
                    ))}
                    <button className="flex items-center space-x-3 px-6 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left">
                      <LogOut className="h-5 w-5" />
                      <span>Sign Out</span>
                    </button>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Welcome Section */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome back, {user.name}!
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Here's what's happening with your account today.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardStats.map((stat) => (
                  <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                          <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</p>
                        <p className="text-xs text-green-600 dark:text-green-400">{stat.change}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickActions.map((action) => (
                      <Link key={action.name} href={action.href}>
                        <div className="p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
                          <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                            <action.icon className="h-6 w-6 text-white" />
                          </div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{action.name}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Notifications</h2>
                    <Button variant="outline" size="sm">
                      <Bell className="h-4 w-4 mr-2" />
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.slice(0, 3).map((notification) => (
                      <div key={notification.id} className={`p-4 rounded-lg border-l-4 ${
                        notification.type === 'order' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' :
                        notification.type === 'recommendation' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' :
                        'border-green-500 bg-green-50 dark:bg-green-900/20'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">{notification.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
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
                          <p className="font-medium text-gray-900 dark:text-white">Order #{order.id}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {order.items} items • {order.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900 dark:text-white">₹{order.total}</p>
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
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CustomerDashboard;
