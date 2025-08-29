'use client';

import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, X, Eye, Download } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { getUserOrders } from '@/lib/orders';
import { Order } from '@/types';
import { formatPrice } from '@/lib/utils';

const OrdersPage = () => {
  const { userProfile } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userProfile?.userId) return;
      
      try {
        const userOrders = await getUserOrders(userProfile.userId);
        setOrders(userOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        // Fallback to sample data for demo
        setOrders([
          {
            orderId: 'ORD001',
            userId: userProfile.userId,
            books: [
              {
                bookId: '1',
                title: 'The Psychology of Money',
                quantity: 2,
                price: 399,
                finalPrice: 299
              }
            ],
            shippingAddress: {
              name: 'John Doe',
              email: 'john@example.com',
              phone: '+91 98765 43210',
              street: '123 Main St',
              city: 'Mumbai',
              state: 'Maharashtra',
              pincode: '400001',
              country: 'India'
            },
            paymentMethod: 'razorpay',
            subtotal: 598,
            shipping: 0,
            tax: 108,
            total: 706,
            status: 'delivered',
            paymentStatus: 'paid',
            trackingNumber: 'TRK123456789',
            createdAt: '2024-08-25T10:30:00Z',
            updatedAt: '2024-08-27T14:20:00Z'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userProfile]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'success';
      case 'shipped': return 'info';
      case 'processing': return 'warning';
      case 'cancelled': return 'error';
      case 'refunded': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return CheckCircle;
      case 'shipped': return Truck;
      case 'processing': return Package;
      case 'cancelled': return X;
      case 'refunded': return X;
      default: return Package;
    }
  };

  return (
    <ProtectedRoute requiredRole="customer">
      <Header />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              My Orders
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track and manage your book orders
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading your orders...</p>
            </div>
          ) : orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => {
                const StatusIcon = getStatusIcon(order.status);
                return (
                  <Card key={order.orderId} hover>
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        {/* Order Info */}
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-3">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              Order #{order.orderId}
                            </h3>
                            <Badge variant={getStatusColor(order.status) as any}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Order Date:</span>
                              <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Total Amount:</span>
                              <p className="font-medium">{formatPrice(order.total)}</p>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Items:</span>
                              <p className="font-medium">{order.books.length} book(s)</p>
                            </div>
                          </div>

                          {/* Books in Order */}
                          <div className="mt-4">
                            <div className="flex flex-wrap gap-2">
                              {order.books.map((book, index) => (
                                <span key={index} className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                  {book.title} (x{book.quantity})
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Tracking Info */}
                          {order.trackingNumber && (
                            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="text-sm text-blue-700 dark:text-blue-300">Tracking Number:</span>
                                  <p className="font-mono font-medium text-blue-900 dark:text-blue-100">
                                    {order.trackingNumber}
                                  </p>
                                </div>
                                <Button variant="outline" size="sm">
                                  Track Package
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col space-y-2 lg:ml-6">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          
                          {order.status === 'delivered' && (
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download Invoice
                            </Button>
                          )}
                          
                          {['pending', 'confirmed'].includes(order.status) && (
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              Cancel Order
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No orders yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You haven't placed any orders yet. Start shopping to see your orders here.
              </p>
              <Button variant="primary">
                Start Shopping
              </Button>
            </div>
          )}

          {/* Order Detail Modal */}
          {selectedOrder && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Order Details</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedOrder(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Order Summary */}
                  <div>
                    <h3 className="font-semibold mb-3">Order Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Order ID:</span>
                        <span className="font-mono">{selectedOrder.orderId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <Badge variant={getStatusColor(selectedOrder.status) as any}>
                          {selectedOrder.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment:</span>
                        <span className="capitalize">{selectedOrder.paymentMethod}</span>
                      </div>
                    </div>
                  </div>

                  {/* Books */}
                  <div>
                    <h3 className="font-semibold mb-3">Books Ordered</h3>
                    <div className="space-y-3">
                      {selectedOrder.books.map((book, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div>
                            <p className="font-medium">{book.title}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Quantity: {book.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatPrice(book.finalPrice * book.quantity)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h3 className="font-semibold mb-3">Shipping Address</h3>
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm">
                      <p className="font-medium">{selectedOrder.shippingAddress.name}</p>
                      <p>{selectedOrder.shippingAddress.street}</p>
                      <p>
                        {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.pincode}
                      </p>
                      <p>{selectedOrder.shippingAddress.country}</p>
                      <p className="mt-2">📞 {selectedOrder.shippingAddress.phone}</p>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div>
                    <h3 className="font-semibold mb-3">Price Breakdown</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>{formatPrice(selectedOrder.subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span>{selectedOrder.shipping === 0 ? 'Free' : formatPrice(selectedOrder.shipping)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax:</span>
                        <span>{formatPrice(selectedOrder.tax)}</span>
                      </div>
                      <hr className="border-gray-200 dark:border-gray-700" />
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>{formatPrice(selectedOrder.total)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </ProtectedRoute>
  );
};

export default OrdersPage;
