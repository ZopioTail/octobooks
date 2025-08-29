import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchPage from '@/app/search/page';

// Mock Next.js router and search params
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

// Mock the book service
jest.mock('@/lib/books', () => ({
  getBooks: jest.fn(),
}));

const mockPush = jest.fn();
const mockGet = jest.fn();

describe('Search Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: mockGet,
    });
  });

  it('renders search page with initial state', () => {
    mockGet.mockReturnValue(null);
    
    render(<SearchPage />);
    
    expect(screen.getByText('Search Results')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search books/i)).toBeInTheDocument();
  });

  it('displays search query from URL params', () => {
    mockGet.mockImplementation((param) => {
      if (param === 'q') return 'test query';
      return null;
    });
    
    render(<SearchPage />);
    
    expect(screen.getByDisplayValue('test query')).toBeInTheDocument();
  });

  it('handles search form submission', async () => {
    mockGet.mockReturnValue(null);
    
    render(<SearchPage />);
    
    const searchInput = screen.getByPlaceholderText(/search books/i);
    const searchButton = screen.getByText('Search');
    
    fireEvent.change(searchInput, { target: { value: 'psychology' } });
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/search?q=psychology');
    });
  });

  it('shows loading state during search', async () => {
    mockGet.mockReturnValue('test');
    
    render(<SearchPage />);
    
    // Should show loading state initially
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays search results', async () => {
    mockGet.mockReturnValue('psychology');
    
    render(<SearchPage />);
    
    // Wait for results to load
    await waitFor(() => {
      expect(screen.getByText(/results found/i)).toBeInTheDocument();
    });
  });

  it('shows no results message when search returns empty', async () => {
    mockGet.mockReturnValue('nonexistent');
    
    render(<SearchPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/no books found/i)).toBeInTheDocument();
    });
  });

  it('handles filter changes', async () => {
    mockGet.mockReturnValue(null);
    
    render(<SearchPage />);
    
    // Open advanced filters
    const filtersButton = screen.getByText('Advanced Filters');
    fireEvent.click(filtersButton);
    
    // Change category filter
    const categorySelect = screen.getByDisplayValue('All Categories');
    fireEvent.change(categorySelect, { target: { value: 'Fiction' } });
    
    await waitFor(() => {
      expect(categorySelect).toHaveValue('Fiction');
    });
  });

  it('toggles between grid and list view modes', () => {
    mockGet.mockReturnValue('test');
    
    render(<SearchPage />);
    
    const gridButton = screen.getByRole('button', { name: /grid/i });
    const listButton = screen.getByRole('button', { name: /list/i });
    
    // Should start in grid mode
    expect(gridButton).toHaveClass('bg-blue-600'); // or whatever primary class
    
    // Switch to list mode
    fireEvent.click(listButton);
    expect(listButton).toHaveClass('bg-blue-600');
  });

  it('handles keyboard navigation in search input', async () => {
    mockGet.mockReturnValue(null);
    
    render(<SearchPage />);
    
    const searchInput = screen.getByPlaceholderText(/search books/i);
    
    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.keyPress(searchInput, { key: 'Enter', code: 'Enter' });
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/search?q=test');
    });
  });
});
