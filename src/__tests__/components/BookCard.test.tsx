import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookCard from '@/components/books/BookCard';
import { CartProvider } from '@/contexts/CartContext';
import { Book } from '@/types';

// Mock the cart context
const mockAddToCart = jest.fn();
const mockToggleWishlist = jest.fn();

jest.mock('@/contexts/CartContext', () => ({
  useCart: () => ({
    addToCart: mockAddToCart,
    toggleWishlist: mockToggleWishlist,
    isInWishlist: jest.fn(() => false),
  }),
  CartProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const mockBook: Book = {
  bookId: '1',
  title: 'Test Book',
  author: 'Test Author',
  publisher: 'Test Publisher',
  price: 500,
  finalPrice: 400,
  rating: 4.5,
  reviewsCount: 100,
  coverImage: '/test-image.jpg',
  category: 'Fiction',
  language: 'English',
  format: 'Paperback',
  stock: 10,
  description: 'A test book description',
  isbn: '1234567890',
  pages: 300,
  publishedDate: '2024-01-01',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z'
};

describe('BookCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders book information correctly', () => {
    render(
      <CartProvider>
        <BookCard book={mockBook} />
      </CartProvider>
    );

    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('₹400')).toBeInTheDocument();
    expect(screen.getByText('₹500')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('(100 reviews)')).toBeInTheDocument();
  });

  it('shows discount percentage when price differs from final price', () => {
    render(
      <CartProvider>
        <BookCard book={mockBook} />
      </CartProvider>
    );

    expect(screen.getByText('20% OFF')).toBeInTheDocument();
  });

  it('calls addToCart when Add to Cart button is clicked', async () => {
    render(
      <CartProvider>
        <BookCard book={mockBook} />
      </CartProvider>
    );

    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);

    await waitFor(() => {
      expect(mockAddToCart).toHaveBeenCalledWith(mockBook);
    });
  });

  it('calls toggleWishlist when wishlist button is clicked', async () => {
    render(
      <CartProvider>
        <BookCard book={mockBook} />
      </CartProvider>
    );

    const wishlistButton = screen.getByRole('button', { name: /add to wishlist/i });
    fireEvent.click(wishlistButton);

    await waitFor(() => {
      expect(mockToggleWishlist).toHaveBeenCalledWith('1');
    });
  });

  it('shows out of stock state when stock is 0', () => {
    const outOfStockBook = { ...mockBook, stock: 0 };
    
    render(
      <CartProvider>
        <BookCard book={outOfStockBook} />
      </CartProvider>
    );

    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
    expect(screen.getByText('Notify When Available')).toBeInTheDocument();
  });

  it('renders compact variant correctly', () => {
    render(
      <CartProvider>
        <BookCard book={mockBook} variant="compact" />
      </CartProvider>
    );

    // In compact mode, some elements might be hidden or styled differently
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
  });

  it('handles missing optional fields gracefully', () => {
    const incompleteBook = {
      ...mockBook,
      reviewsCount: 0,
      rating: 0,
      coverImage: ''
    };

    render(
      <CartProvider>
        <BookCard book={incompleteBook} />
      </CartProvider>
    );

    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('No reviews yet')).toBeInTheDocument();
  });
});
