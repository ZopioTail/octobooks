'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { formatPrice } from '@/lib/utils';

const BookDetailPage = () => {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState('Paperback');

  // Sample book data - this would come from Firebase in production
  const book = {
    id: params.id,
    title: 'The Psychology of Money',
    subtitle: 'Timeless lessons on wealth, greed, and happiness',
    author: 'Morgan Housel',
    publisher: 'Jaico Publishing House',
    isbn: '978-93-5322-581-4',
    category: 'Business & Finance',
    tags: ['Finance', 'Psychology', 'Investment', 'Money Management'],
    price: 399,
    discount: 25,
    finalPrice: 299,
    stock: 150,
    language: 'English',
    formats: ['Paperback', 'eBook', 'Audiobook'],
    coverImage: '/api/placeholder/400/600',
    description: `Doing well with money isn't necessarily about what you know. It's about how you behave. And behavior is hard to teach, even to really smart people.

Money—investing, personal finance, and business decisions—is typically taught as a math-based field, where data and formulas tell us exactly what to do. But in the real world people don't make financial decisions on a spreadsheet. They make them at the dinner table, or in a meeting room, where personal history, your own unique view of the world, ego, pride, marketing, and odd incentives are scrambled together.

In The Psychology of Money, award-winning author Morgan Housel shares 19 short stories exploring the strange ways people think about money and teaches you how to make better sense of one of life's most important topics.`,
    rating: 4.8,
    reviewsCount: 1250,
    pageCount: 256,
    edition: '1st Edition',
    bestseller: true,
    createdAt: '2024-01-15T00:00:00Z'
  };

  const formatPrices = {
    'Paperback': { price: 399, finalPrice: 299 },
    'eBook': { price: 199, finalPrice: 149 },
    'Audiobook': { price: 299, finalPrice: 224 }
  };

  const currentPrice = formatPrices[selectedFormat as keyof typeof formatPrices];

  return (
    <>
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <span>by <Link href={`/author/${book.author}`} className="text-blue-600 hover:underline">{book.author}</Link></span>
                  <span>•</span>
                  <span>{book.publisher}</span>
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
                  {book.formats.map((format) => (
                    <button
                      key={format}
                      onClick={() => setSelectedFormat(format)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        selectedFormat === format
                          ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800'
                      }`}
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {formatPrice(currentPrice.finalPrice)}
                  </span>
                  {currentPrice.price !== currentPrice.finalPrice && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        {formatPrice(currentPrice.price)}
                      </span>
                      <span className="text-lg text-green-600 font-medium">
                        {Math.round(((currentPrice.price - currentPrice.finalPrice) / currentPrice.price) * 100)}% off
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
                  <Button variant="primary" size="lg" className="flex-1">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="lg">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                <Button variant="secondary" size="lg" className="w-full">
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
                <button className="border-b-2 border-blue-500 py-2 px-1 text-sm font-medium text-blue-600">
                  Description
                </button>
                <button className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Reviews ({book.reviewsCount})
                </button>
                <button className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Details
                </button>
              </nav>
            </div>

            <div className="py-8">
              <div className="prose max-w-none dark:prose-invert">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {book.description}
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
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
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BookDetailPage;
