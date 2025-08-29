'use client';

import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, X, Eye, Edit, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Select from '@/components/ui/Select';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getAllOrders, updateOrderStatus } from '@/lib/orders';
import { createShipment, convertOrderToShipment } from '@/lib/shipping';
import { Order, OrderStatus } from '@/types';
import { formatPrice } from '@/lib/utils';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | ''>('');
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const allOrders = await getAllOrders(statusFilter || undefined);
      setOrders(allOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Fallback to sample data for demo
      setOrders([
        {
          orderId: 'ORD001',
          userId: 'user123',
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
          status: 'confirmed',
          paymentStatus: 'paid',
          createdAt: '2024-08-29T10:30:00Z',
          updatedAt: '2024-08-29T10:30:00Z'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingOrder(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      
      // If shipping, create shipment in Shiprocket
      if (newStatus === 'shipped') {
        const order = orders.find(o => o.orderId === orderId);
        if (order) {
          const shipmentData = convertOrderToShipment(order);
          await createShipment(shipmentData);
        }
      }
      
      // Update local state
      setOrders(prev => prev.map(order => 
        order.orderId === orderId 
          ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
          : order
      ));
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    } finally {
      setUpdatingOrder(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'success';
      case 'shipped': return 'info';
      case 'processing': return 'warning';
      case 'confirmed': return 'info';
      case 'cancelled': return 'error';
      case 'refunded': return 'error';
      default: return 'default';
    }
  };

  const statusOptions = [
    { value: '', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'refunded', label: 'Refunded' }
  ];

  const nextStatusOptions = (currentStatus: OrderStatus) => {
    switch (currentStatus) {
      case 'pending':
        return [
          { value: 'confirmed', label: 'Confirm Order' },
          { value: 'cancelled', label: 'Cancel Order' }
        ];
      case 'confirmed':
        return [
          { value: 'processing', label: 'Start Processing' },
          { value: 'cancelled', label: 'Cancel Order' }
        ];
      case 'processing':
        return [
          { value: 'shipped', label: 'Mark as Shipped' },
          { value: 'cancelled', label: 'Cancel Order' }
        ];
      case 'shipped':
        return [
          { value: 'delivered', label: 'Mark as Delivered' }
        ];
      default:
        return [];
    }
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <Header />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Order Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage and track all customer orders
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as OrderStatus | '')}
                options={statusOptions}
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading orders...</p>
            </div>
          ) : orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
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
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                          <Badge variant={order.paymentStatus === 'paid' ? 'success' : 'warning'}>
                            {order.paymentStatus}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Customer:</span>
                            <p className="font-medium">{order.shippingAddress.name}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Order Date:</span>
                            <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Total:</span>
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
                            <span className="text-sm text-blue-700 dark:text-blue-300">Tracking:</span>
                            <p className="font-mono font-medium text-blue-900 dark:text-blue-100">
                              {order.trackingNumber}
                            </p>
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
                        
                        {/* Status Update Dropdown */}
                        {nextStatusOptions(order.status).length > 0 && (
                          <div className="space-y-2">
                            {nextStatusOptions(order.status).map((option) => (
                              <Button
                                key={option.value}
                                variant="outline"
                                size="sm"
                                onClick={() => handleStatusUpdate(order.orderId, option.value as OrderStatus)}
                                loading={updatingOrder === order.orderId}
                                className="w-full"
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                {option.label}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No orders found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {statusFilter ? `No orders with status "${statusFilter}"` : 'No orders have been placed yet.'}
              </p>
            </div>
          )}

          {/* Order Detail Modal */}
          {selectedOrder && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Order #{selectedOrder.orderId}</h2>
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
                  {/* Order Status & Payment */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Order Status</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <Badge variant={getStatusColor(selectedOrder.status) as any}>
                            {selectedOrder.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Payment:</span>
                          <Badge variant={selectedOrder.paymentStatus === 'paid' ? 'success' : 'warning'}>
                            {selectedOrder.paymentStatus}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Method:</span>
                          <span className="capitalize">{selectedOrder.paymentMethod}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3">Order Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Order Date:</span>
                          <span>{new Date(selectedOrder.createdAt).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Last Updated:</span>
                          <span>{new Date(selectedOrder.updatedAt).toLocaleString()}</span>
                        </div>
                        {selectedOrder.trackingNumber && (
                          <div className="flex justify-between">
                            <span>Tracking:</span>
                            <span className="font-mono">{selectedOrder.trackingNumber}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div>
                    <h3 className="font-semibold mb-3">Customer Information</h3>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium">{selectedOrder.shippingAddress.name}</p>
                          <p>{selectedOrder.shippingAddress.email}</p>
                          <p>{selectedOrder.shippingAddress.phone}</p>
                        </div>
                        <div>
                          <p>{selectedOrder.shippingAddress.street}</p>
                          <p>
                            {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.pincode}
                          </p>
                          <p>{selectedOrder.shippingAddress.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Books Ordered */}
                  <div>
                    <h3 className="font-semibold mb-3">Books Ordered</h3>
                    <div className="space-y-3">
                      {selectedOrder.books.map((book, index) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div>
                            <p className="font-medium">{book.title}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Quantity: {book.quantity} • Price: {formatPrice(book.finalPrice)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatPrice(book.finalPrice * book.quantity)}</p>
                          </div>
                        </div>
                      ))}
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

                  {/* Admin Actions */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    {nextStatusOptions(selectedOrder.status).map((option) => (
                      <Button
                        key={option.value}
                        variant="primary"
                        size="sm"
                        onClick={() => handleStatusUpdate(selectedOrder.orderId, option.value as OrderStatus)}
                        loading={updatingOrder === selectedOrder.orderId}
                      >
                        {option.label}
                      </Button>
                    ))}
                    <Button variant="outline" size="sm">
                      Print Invoice
                    </Button>
                    <Button variant="outline" size="sm">
                      Send Email Update
                    </Button>
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

export default AdminOrdersPage;
