import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartProvider, useCart } from '@/contexts/CartContext';
import { Book } from '@/types';

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

// Test component to interact with cart context
const TestComponent = () => {
  const { 
    cartItems, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    getCartTotal,
    getCartItemsCount
  } = useCart();

  return (
    <div>
      <div data-testid="cart-count">{getCartItemsCount()}</div>
      <div data-testid="cart-total">{getCartTotal()}</div>
      <div data-testid="cart-items">
        {cartItems.map(item => (
          <div key={item.bookId} data-testid={`cart-item-${item.bookId}`}>
            {item.title} - Qty: {item.quantity}
          </div>
        ))}
      </div>
      <button onClick={() => addToCart(mockBook)} data-testid="add-to-cart">
        Add to Cart
      </button>
      <button onClick={() => removeFromCart('1')} data-testid="remove-from-cart">
        Remove from Cart
      </button>
      <button onClick={() => updateQuantity('1', 3)} data-testid="update-quantity">
        Update Quantity
      </button>
      <button onClick={clearCart} data-testid="clear-cart">
        Clear Cart
      </button>
    </div>
  );
};

describe('CartContext', () => {
  const renderWithProvider = () => {
    return render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
  };

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('starts with empty cart', () => {
    renderWithProvider();
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0');
  });

  it('adds book to cart', async () => {
    renderWithProvider();
    
    fireEvent.click(screen.getByTestId('add-to-cart'));
    
    await waitFor(() => {
      expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
      expect(screen.getByTestId('cart-total')).toHaveTextContent('400');
      expect(screen.getByTestId('cart-item-1')).toHaveTextContent('Test Book - Qty: 1');
    });
  });

  it('increases quantity when adding same book twice', async () => {
    renderWithProvider();
    
    fireEvent.click(screen.getByTestId('add-to-cart'));
    fireEvent.click(screen.getByTestId('add-to-cart'));
    
    await waitFor(() => {
      expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
      expect(screen.getByTestId('cart-total')).toHaveTextContent('800');
      expect(screen.getByTestId('cart-item-1')).toHaveTextContent('Test Book - Qty: 2');
    });
  });

  it('updates item quantity', async () => {
    renderWithProvider();
    
    // First add item to cart
    fireEvent.click(screen.getByTestId('add-to-cart'));
    
    await waitFor(() => {
      expect(screen.getByTestId('cart-item-1')).toHaveTextContent('Test Book - Qty: 1');
    });

    // Then update quantity
    fireEvent.click(screen.getByTestId('update-quantity'));
    
    await waitFor(() => {
      expect(screen.getByTestId('cart-count')).toHaveTextContent('3');
      expect(screen.getByTestId('cart-total')).toHaveTextContent('1200');
      expect(screen.getByTestId('cart-item-1')).toHaveTextContent('Test Book - Qty: 3');
    });
  });

  it('removes item from cart', async () => {
    renderWithProvider();
    
    // First add item to cart
    fireEvent.click(screen.getByTestId('add-to-cart'));
    
    await waitFor(() => {
      expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    });

    // Then remove item
    fireEvent.click(screen.getByTestId('remove-from-cart'));
    
    await waitFor(() => {
      expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
      expect(screen.getByTestId('cart-total')).toHaveTextContent('0');
      expect(screen.queryByTestId('cart-item-1')).not.toBeInTheDocument();
    });
  });

  it('clears entire cart', async () => {
    renderWithProvider();
    
    // Add multiple items
    fireEvent.click(screen.getByTestId('add-to-cart'));
    fireEvent.click(screen.getByTestId('add-to-cart'));
    
    await waitFor(() => {
      expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
    });

    // Clear cart
    fireEvent.click(screen.getByTestId('clear-cart'));
    
    await waitFor(() => {
      expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
      expect(screen.getByTestId('cart-total')).toHaveTextContent('0');
    });
  });

  it('persists cart data in localStorage', async () => {
    renderWithProvider();
    
    fireEvent.click(screen.getByTestId('add-to-cart'));
    
    await waitFor(() => {
      const cartData = localStorage.getItem('octobooks-cart');
      expect(cartData).toBeTruthy();
      
      const parsedData = JSON.parse(cartData!);
      expect(parsedData).toHaveLength(1);
      expect(parsedData[0].bookId).toBe('1');
      expect(parsedData[0].quantity).toBe(1);
    });
  });

  it('loads cart data from localStorage on initialization', () => {
    // Pre-populate localStorage
    const cartData = [{ ...mockBook, quantity: 2 }];
    localStorage.setItem('octobooks-cart', JSON.stringify(cartData));
    
    renderWithProvider();
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('800');
  });

  it('handles invalid localStorage data gracefully', () => {
    // Set invalid data in localStorage
    localStorage.setItem('octobooks-cart', 'invalid-json');
    
    renderWithProvider();
    
    // Should start with empty cart
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0');
  });
});
