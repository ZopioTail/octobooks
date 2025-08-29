'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Book } from '@/types';
import { formatPrice, truncateText } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';

interface BookCardProps {
  book: Book;
  variant?: 'default' | 'compact' | 'list';
  showQuickActions?: boolean;
  className?: string;
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  variant = 'default',
  showQuickActions = true,
  className = ''
}) => {
  const { addItem, isInCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isInCart(book.bookId)) {
      addItem({
        bookId: book.bookId,
        title: book.title,
        coverImage: book.coverImage,
        price: book.price,
        finalPrice: book.finalPrice,
        quantity: 1,
        stock: book.stock
      });
    }
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Implement wishlist functionality
    console.log('Add to wishlist:', book.bookId);
  };

  const discountPercentage = book.price !== book.finalPrice 
    ? Math.round(((book.price - book.finalPrice) / book.price) * 100)
    : 0;

  if (variant === 'list') {
    return (
      <Card hover className={`group ${className}`}>
        <CardContent className="p-4">
          <div className="flex space-x-4">
            {/* Book Cover */}
            <Link href={`/book/${book.bookId}`} className="flex-shrink-0">
              <div className="w-24 h-32 bg-gray-200 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <span className="text-2xl">📖</span>
                </div>
              </div>
            </Link>

            {/* Book Details */}
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {book.bestseller && (
                    <Badge variant="error" size="sm" className="mb-2">
                      Bestseller
                    </Badge>
                  )}
                  <Link href={`/book/${book.bookId}`}>
                    <h3 className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 transition-colors line-clamp-2">
                      {book.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    by {book.authorName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {book.publisherName}
                  </p>
                </div>
                
                {showQuickActions && (
                  <button
                    onClick={handleAddToWishlist}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < Math.floor(book.rating) ? 'fill-current' : ''}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  {book.rating} ({book.reviewsCount})
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {truncateText(book.description, 120)}
              </p>

              {/* Price and Actions */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatPrice(book.finalPrice)}
                  </span>
                  {discountPercentage > 0 && (
                    <>
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(book.price)}
                      </span>
                      <Badge variant="success" size="sm">
                        {discountPercentage}% off
                      </Badge>
                    </>
                  )}
                </div>

                {showQuickActions && (
                  <div className="flex space-x-2">
                    <Link href={`/book/${book.bookId}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleAddToCart}
                      disabled={book.stock === 0 || isInCart(book.bookId)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default grid view
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      <Card hover className="h-full group">
        <CardContent className="p-4">
          {/* Badges */}
          <div className="relative mb-4">
            <div className="absolute top-2 left-2 z-10 space-y-1">
              {book.bestseller && (
                <Badge variant="error" size="sm">
                  Bestseller
                </Badge>
              )}
              {book.newArrival && (
                <Badge variant="success" size="sm">
                  New
                </Badge>
              )}
              {discountPercentage > 0 && (
                <Badge variant="warning" size="sm">
                  {discountPercentage}% off
                </Badge>
              )}
            </div>
            
            {showQuickActions && (
              <div className="absolute top-2 right-2 z-10">
                <button
                  onClick={handleAddToWishlist}
                  className="p-1.5 bg-white/80 hover:bg-white rounded-full shadow-sm transition-all"
                >
                  <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                </button>
              </div>
            )}
            
            {/* Book Cover */}
            <Link href={`/book/${book.bookId}`}>
              <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden group-hover:shadow-lg transition-shadow">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <span className="text-4xl">📖</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Book Info */}
          <div className="space-y-2">
            <Badge variant="info" size="sm">
              {book.category}
            </Badge>
            
            <Link href={`/book/${book.bookId}`}>
              <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 hover:text-blue-600 transition-colors">
                {book.title}
              </h3>
            </Link>
            
            <p className="text-sm text-gray-600 dark:text-gray-400">
              by {book.authorName}
            </p>
            
            {variant !== 'compact' && (
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {book.publisherName}
              </p>
            )}
            
            {/* Rating */}
            <div className="flex items-center space-x-1">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${i < Math.floor(book.rating) ? 'fill-current' : ''}`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">
                {book.rating} ({book.reviewsCount})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {formatPrice(book.finalPrice)}
              </span>
              {discountPercentage > 0 && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(book.price)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="text-xs">
              {book.stock > 0 ? (
                <span className="text-green-600">
                  {book.stock > 10 ? 'In Stock' : `Only ${book.stock} left`}
                </span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </div>

            {/* Actions */}
            {showQuickActions && (
              <div className="flex space-x-2 pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={handleAddToCart}
                  disabled={book.stock === 0 || isInCart(book.bookId)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {isInCart(book.bookId) ? 'In Cart' : 'Add to Cart'}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BookCard;
