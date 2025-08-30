'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  BookOpen,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  FileText,
  Settings,
  Shield,
  BarChart3,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Calendar,
  UserCheck,
  Package,
  CreditCard,
  Bell
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { AdminOnly } from '@/components/auth/ProtectedRoute';
import { formatPrice, formatDate } from '@/lib/utils';
import { getRolePermissions } from '@/lib/permissions';

interface DashboardStats {
  totalUsers: number;
  totalBooks: number;
  totalOrders: number;
  totalRevenue: number;
  pendingApprovals: number;
  lowStockItems: number;
  newUsers: number;
  activeUsers: number;
}

interface RecentActivity {
  id: string;
  type: 'user_registered' | 'book_published' | 'order_placed' | 'payment_received' | 'system_alert';
  title: string;
  description: string;
  timestamp: string;
  user?: string;
  amount?: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalBooks: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingApprovals: 0,
    lowStockItems: 0,
    newUsers: 0,
    activeUsers: 0
  });

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Simulate API call
      setTimeout(() => {
        setStats({
          totalUsers: 15420,
          totalBooks: 2847,
          totalOrders: 3256,
          totalRevenue: 2450000,
          pendingApprovals: 45,
          lowStockItems: 12,
          newUsers: 234,
          activeUsers: 8920
        });

        setRecentActivities([
          {
            id: '1',
            type: 'order_placed',
            title: 'New Order Placed',
            description: 'Order #ORD-001234 placed by John Doe',
            timestamp: '2024-08-30T10:30:00',
            amount: 599
          },
          {
            id: '2',
            type: 'user_registered',
            title: 'New User Registration',
            description: 'Jane Smith registered as a new customer',
            timestamp: '2024-08-30T09:15:00',
            user: 'Jane Smith'
          },
          {
            id: '3',
            type: 'book_published',
            title: 'Book Published',
            description: '"The Psychology of Money" published by John Author',
            timestamp: '2024-08-30T08:45:00'
          },
          {
            id: '4',
            type: 'payment_received',
            title: 'Payment Received',
            description: 'Payment of ₹1,250 received for Order #ORD-001233',
            timestamp: '2024-08-30T08:30:00',
            amount: 1250
          },
          {
            id: '5',
            type: 'system_alert',
            title: 'Low Stock Alert',
            description: '12 books are running low on stock',
            timestamp: '2024-08-30T08:00:00'
          }
        ]);

        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      change: '+8.1%',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      link: '/admin/users'
    },
    {
      title: 'Total Books',
      value: stats.totalBooks.toLocaleString(),
      change: '+5.2%',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      link: '/admin/books'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      change: '+15.3%',
      icon: ShoppingCart,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      link: '/admin/orders'
    },
    {
      title: 'Total Revenue',
      value: formatPrice(stats.totalRevenue),
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      link: '/admin/reports'
    },
    {
      title: 'Pending Approvals',
      value: stats.pendingApprovals.toString(),
      change: '+3',
      icon: UserCheck,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      link: '/admin/approvals'
    },
    {
      title: 'Low Stock Items',
      value: stats.lowStockItems.toString(),
      change: '-2',
      icon: Package,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      link: '/admin/inventory'
    }
  ];

  const quickActions = [
    {
      title: 'Manage Users',
      description: 'View and manage all users',
      icon: Users,
      link: '/admin/users',
      color: 'bg-purple-600'
    },
    {
      title: 'Manage Books',
      description: 'Approve and manage books',
      icon: BookOpen,
      link: '/admin/books',
      color: 'bg-blue-600'
    },
    {
      title: 'View Orders',
      description: 'Process and track orders',
      icon: ShoppingCart,
      link: '/admin/orders',
      color: 'bg-orange-600'
    },
    {
      title: 'Financial Reports',
      description: 'View sales and revenue reports',
      icon: BarChart3,
      link: '/admin/reports',
      color: 'bg-green-600'
    },
    {
      title: 'System Settings',
      description: 'Configure platform settings',
      icon: Settings,
      link: '/admin/settings',
      color: 'bg-gray-600'
    },
    {
      title: 'Export Data',
      description: 'Export reports and data',
      icon: Download,
      link: '/admin/export',
      color: 'bg-indigo-600'
    }
  ];

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'user_registered': return <UserCheck className="h-5 w-5 text-blue-600" />;
      case 'book_published': return <BookOpen className="h-5 w-5 text-green-600" />;
      case 'order_placed': return <ShoppingCart className="h-5 w-5 text-orange-600" />;
      case 'payment_received': return <DollarSign className="h-5 w-5 text-green-600" />;
      case 'system_alert': return <Bell className="h-5 w-5 text-red-600" />;
      default: return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <AdminOnly>
      <DashboardLayout title="Admin Dashboard">
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

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            {statsCards.map((card) => (
              <Link key={card.title} href={card.link}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
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
                          {card.change} from last week
                        </p>
                      </div>
                      <div className={`p-3 rounded-lg ${card.bgColor}`}>
                        <card.icon className={`h-6 w-6 ${card.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Quick Actions
                  </h2>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickActions.map((action) => (
                    <Link key={action.title} href={action.link}>
                      <Button
                        variant="outline"
                        className="w-full justify-start p-4"
                      >
                        <div className={`p-2 rounded-lg ${action.color} mr-3`}>
                          <action.icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {action.title}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {action.description}
                          </p>
                        </div>
                      </Button>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Recent Activities
                    </h2>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex-shrink-0">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {activity.title}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {activity.description}
                          </p>
                          {activity.amount && (
                            <p className="text-sm font-medium text-green-600 mt-1">
                              {formatPrice(activity.amount)}
                            </p>
                          )}
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(activity.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* System Alerts */}
              <Card className="mt-6">
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    System Alerts
                  </h2>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-300">
                      {stats.pendingApprovals} items pending approval
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <p className="text-sm text-red-800 dark:text-red-300">
                      {stats.lowStockItems} books are running low on stock
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      {stats.newUsers} new users this week
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AdminOnly>
  );
};

export default AdminDashboard;