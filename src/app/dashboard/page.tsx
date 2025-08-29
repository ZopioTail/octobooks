'use client';

import React from 'react';
import { User, Package, Heart, CreditCard, Settings, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const CustomerDashboard = () => {
  // Sample user data - this would come from Firebase in production
  const user = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+91 98765 43210',
    walletBalance: 1250,
    rewardsPoints: 850,
    totalOrders: 12,
    totalSpent: 15600
  };

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
      color: 'text-blue-600'
    },
    {
      title: 'Total Spent',
      value: `₹${user.totalSpent.toLocaleString()}`,
      icon: CreditCard,
      color: 'text-green-600'
    },
    {
      title: 'Wallet Balance',
      value: `₹${user.walletBalance}`,
      icon: CreditCard,
      color: 'text-purple-600'
    },
    {
      title: 'Rewards Points',
      value: user.rewardsPoints,
      icon: Heart,
      color: 'text-red-600'
    }
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
                  <Card key={stat.title}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                        </div>
                        <stat.icon className={`h-8 w-8 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

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
