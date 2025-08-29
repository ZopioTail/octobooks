'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, ArrowLeft, BookOpen, Calendar, Globe, Package, ThumbsUp, MessageCircle, Eye } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import BookCard from '@/components/books/BookCard';
import Loading from '@/components/ui/Loading';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';
import { getBookById, getRelatedBooks } from '@/lib/books';
import { Book } from '@/types';
import { formatPrice } from '@/lib/utils';

const BookDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { addItem, isInCart } = useCart();
  const [book, setBook] = useState<Book | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState([
    {
      id: '1',
      user: 'Priya Sharma',
      rating: 5,
      date: '2024-08-20',
      comment: 'Excellent book! Really helped me understand financial psychology.',
      helpful: 12,
      verified: true
    },
    {
      id: '2',
      user: 'Rajesh Kumar',
      rating: 4,
      date: '2024-08-18',
      comment: 'Good insights, though some concepts could be explained better.',
      helpful: 8,
      verified: true
    }
  ]);

  useEffect(() => {
    const fetchBookData = async () => {
      if (!params.id || typeof params.id !== 'string') return;

      try {
        const bookData = await getBookById(params.id);
        if (bookData) {
          setBook(bookData);

          // Fetch related books
          const related = await getRelatedBooks(
            bookData.bookId,
            bookData.category,
            bookData.authorId,
            6
          );
          setRelatedBooks(related);
        } else {
          // Book not found, redirect to 404 or home
          router.push('/');
        }
      } catch (error) {
        console.error('Error fetching book:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [params.id, router]);

  const handleAddToCart = () => {
    if (!book) return;

    addItem({
      bookId: book.bookId,
      title: book.title,
      coverImage: book.coverImage,
      price: book.price,
      finalPrice: book.finalPrice,
      quantity,
      stock: book.stock
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="flex-1 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <Loading size="lg" />
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading book details...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!book) {
    return (
      <>
        <Header />
        <main className="flex-1 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📚</div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Book Not Found
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                The book you're looking for doesn't exist or has been removed.
              </p>
              <Button onClick={() => router.push('/')} variant="primary">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
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
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li><a href="/" className="hover:text-blue-600">Home</a></li>
              <li>/</li>
              <li><a href={`/category/${book.category.toLowerCase()}`} className="hover:text-blue-600">{book.category}</a></li>
              <li>/</li>
              <li className="text-gray-900 dark:text-white">{book.title}</li>
            </ol>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Book Image */}
            <div className="space-y-4">
              <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <span className="text-8xl">📖</span>
                </div>
              </div>
              
              {/* Thumbnails */}
              <div className="flex space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-16 h-20 bg-gray-100 rounded border-2 border-transparent hover:border-blue-500 cursor-pointer">
                    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                      <span className="text-lg">📚</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Book Details */}
            <div className="space-y-6">
              {/* Title and Author */}
              <div>
                {book.bestseller && (
                  <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium mb-2">
                    #1 Bestseller
                  </span>
                )}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {book.title}
                </h1>
                {book.subtitle && (
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                    {book.subtitle}
                  </p>
                )}
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>by <Link href={`/author/${book.authorId}`} className="text-blue-600 hover:underline">{book.authorName}</Link></span>
                  <span>•</span>
                  <span>{book.publisherName}</span>
                  <span>•</span>
                  <span>{book.pageCount} pages</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(book.rating) ? 'fill-current' : ''}`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-medium">{book.rating}</span>
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  ({book.reviewsCount.toLocaleString()} reviews)
                </span>
              </div>

              {/* Format Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Format
                </label>
                <div className="flex space-x-2">
                  <button
                    className="px-4 py-2 rounded-lg border border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 text-sm font-medium"
                  >
                    {book.format}
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {formatPrice(book.finalPrice)}
                  </span>
                  {book.price !== book.finalPrice && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        {formatPrice(book.price)}
                      </span>
                      <span className="text-lg text-green-600 font-medium">
                        {Math.round(((book.price - book.finalPrice) / book.price) * 100)}% off
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Inclusive of all taxes • Free shipping on orders above ₹499
                </p>
              </div>

              {/* Quantity and Actions */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Quantity
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 text-gray-600 hover:text-gray-800"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2 text-gray-600 hover:text-gray-800"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {book.stock} in stock
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    variant="primary"
                    size="lg"
                    className="flex-1"
                    onClick={handleAddToCart}
                    disabled={book.stock === 0 || isInCart(book.bookId)}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    {isInCart(book.bookId) ? 'In Cart' : 'Add to Cart'}
                  </Button>
                  <Button variant="outline" size="lg">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full"
                  onClick={handleBuyNow}
                  disabled={book.stock === 0}
                >
                  Buy Now
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <Truck className="h-6 w-6 mx-auto text-green-600 mb-2" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">Free Shipping</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="h-6 w-6 mx-auto text-blue-600 mb-2" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">7-Day Returns</p>
                </div>
                <div className="text-center">
                  <Shield className="h-6 w-6 mx-auto text-purple-600 mb-2" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">Secure Payment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Book Details Tabs */}
          <div className="mt-16">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`border-b-2 py-2 px-1 text-sm font-medium ${
                    activeTab === 'description'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`border-b-2 py-2 px-1 text-sm font-medium ${
                    activeTab === 'reviews'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Reviews ({book.reviewsCount})
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`border-b-2 py-2 px-1 text-sm font-medium ${
                    activeTab === 'details'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Details
                </button>
              </nav>
            </div>

            <div className="py-8">
              {activeTab === 'description' && (
                <div className="prose max-w-none dark:prose-invert">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {book.description}
                  </p>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">Book Details</h3>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">ISBN:</span>
                        <span className="font-medium">{book.isbn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Language:</span>
                        <span className="font-medium">{book.language}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Pages:</span>
                        <span className="font-medium">{book.pageCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Edition:</span>
                        <span className="font-medium">{book.edition}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Category:</span>
                        <span className="font-medium">{book.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Stock:</span>
                        <span className={`font-medium ${book.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {book.stock > 0 ? `${book.stock} available` : 'Out of stock'}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">Tags</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {book.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full dark:bg-blue-900/20 dark:text-blue-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">⭐</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Reviews Coming Soon
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Review system will be implemented in the next phase.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* You May Also Like */}
          {relatedBooks.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                📚 You May Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {relatedBooks.map((relatedBook) => (
                  <BookCard key={relatedBook.bookId} book={relatedBook} variant="compact" />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BookDetailPage;
