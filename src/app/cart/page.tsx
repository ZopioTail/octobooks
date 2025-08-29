'use client';

import React from 'react';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { formatPrice } from '@/lib/utils';

const CartPage = () => {
  // Sample cart data - this would come from CartContext in production
  const cartItems = [
    {
      bookId: '1',
      title: 'The Psychology of Money',
      coverImage: '/api/placeholder/300/400',
      price: 399,
      finalPrice: 299,
      quantity: 2,
      stock: 150
    },
    {
      bookId: '2',
      title: 'Atomic Habits',
      coverImage: '/api/placeholder/300/400',
      price: 450,
      finalPrice: 350,
      quantity: 1,
      stock: 200
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0);
  const shipping = subtotal >= 499 ? 0 : 50;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const updateQuantity = (bookId: string, newQuantity: number) => {
    // This would update the cart context
    console.log(`Update ${bookId} to quantity ${newQuantity}`);
  };

  const removeItem = (bookId: string) => {
    // This would remove from cart context
    console.log(`Remove ${bookId} from cart`);
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <main className="flex-1 py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Your cart is empty
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Looks like you haven't added any books to your cart yet.
              </p>
              <Link href="/">
                <Button variant="primary" size="lg">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Shopping Cart ({cartItems.length} items)
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.bookId}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      {/* Book Cover */}
                      <div className="w-20 h-28 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <span className="text-2xl">📖</span>
                        </div>
                      </div>

                      {/* Book Details */}
                      <div className="flex-1 min-w-0">
                        <Link href={`/book/${item.bookId}`}>
                          <h3 className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 transition-colors">
                            {item.title}
                          </h3>
                        </Link>
                        <div className="mt-2 flex items-center space-x-4">
                          <span className="text-lg font-bold text-gray-900 dark:text-white">
                            {formatPrice(item.finalPrice)}
                          </span>
                          {item.price !== item.finalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              {formatPrice(item.price)}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-green-600 mt-1">In Stock</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.bookId, item.quantity - 1)}
                            className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 border-x border-gray-300 min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.bookId, item.quantity + 1)}
                            className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                            disabled={item.quantity >= item.stock}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.bookId)}
                          className="p-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Order Summary
                  </h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? 'Free' : formatPrice(shipping)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Tax (18%)</span>
                      <span className="font-medium">{formatPrice(tax)}</span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatPrice(total)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {shipping > 0 && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Add {formatPrice(499 - subtotal)} more for free shipping!
                      </p>
                    </div>
                  )}

                  <div className="space-y-3 pt-4">
                    <Link href="/checkout">
                      <Button variant="primary" size="lg" className="w-full">
                        Proceed to Checkout
                      </Button>
                    </Link>
                    <Link href="/">
                      <Button variant="outline" size="lg" className="w-full">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>

                  {/* Security badges */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                      <span>🔒 Secure Checkout</span>
                      <span>💳 Multiple Payment Options</span>
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

export default CartPage;
