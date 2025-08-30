'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Eye, Trash2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

const WishlistPage = () => {
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();

  // Sample wishlist data - in production this would come from Firebase
  const wishlistItems = [
    {
      id: '1',
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      price: 599,
      image: '/api/placeholder/200/300',
      rating: 4.8,
      reviews: 156,
      inStock: true
    },
    {
      id: '2',
      title: 'Atomic Habits',
      author: 'James Clear',
      price: 499,
      image: '/api/placeholder/200/300',
      rating: 4.9,
      reviews: 203,
      inStock: true
    },
    {
      id: '3',
      title: 'Think and Grow Rich',
      author: 'Napoleon Hill',
      price: 399,
      image: '/api/placeholder/200/300',
      rating: 4.6,
      reviews: 89,
      inStock: false
    }
  ];

  const handleAddToCart = (book: any) => {
    addItem({
      bookId: book.id,
      title: book.title,
      coverImage: book.image,
      price: book.price,
      finalPrice: book.price,
      quantity: 1,
      stock: book.inStock ? 10 : 0
    });
  };

  const handleRemoveFromWishlist = (bookId: string) => {
    // In production, this would remove from Firebase
    console.log('Remove from wishlist:', bookId);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <main className="flex-1 py-20">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your Wishlist is Empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Sign in to save your favorite books and access them from any device.
            </p>
            <Link href="/auth/login">
              <Button variant="primary" size="lg">
                Sign In
              </Button>
            </Link>
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              My Wishlist
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved for later
            </p>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Your Wishlist is Empty
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Start adding books you love to your wishlist.
              </p>
              <Link href="/books">
                <Button variant="primary" size="lg">
                  Browse Books
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((book) => (
                <Card key={book.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex space-x-4">
                      <div className="w-20 h-28 bg-gradient-to-br from-blue-100 to-purple-100 rounded flex items-center justify-center">
                        <span className="text-2xl">📖</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1 line-clamp-2">
                          {book.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                          by {book.author}
                        </p>
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="flex items-center">
                            <span className="text-yellow-400">★</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                              {book.rating}
                            </span>
                          </div>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {book.reviews} reviews
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            ₹{book.price}
                          </span>
                          {!book.inStock && (
                            <span className="text-sm text-red-600 bg-red-100 dark:bg-red-900/20 px-2 py-1 rounded">
                              Out of Stock
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <Button
                        variant="primary"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleAddToCart(book)}
                        disabled={!book.inStock}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Link href={`/book/${book.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFromWishlist(book.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Continue Shopping */}
          {wishlistItems.length > 0 && (
            <div className="text-center mt-12">
              <Link href="/books">
                <Button variant="outline" size="lg">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default WishlistPage;