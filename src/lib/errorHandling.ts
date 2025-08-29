// Error handling utilities for Octobooks

export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
  userId?: string;
  action?: string;
}

export class OctobooksError extends Error {
  public code: string;
  public details?: any;
  public timestamp: Date;
  public userId?: string;
  public action?: string;

  constructor(code: string, message: string, details?: any) {
    super(message);
    this.name = 'OctobooksError';
    this.code = code;
    this.details = details;
    this.timestamp = new Date();
  }
}

// Error codes and messages
export const ERROR_CODES = {
  // Authentication errors
  AUTH_REQUIRED: 'AUTH_REQUIRED',
  AUTH_INVALID: 'AUTH_INVALID',
  AUTH_EXPIRED: 'AUTH_EXPIRED',
  
  // Book errors
  BOOK_NOT_FOUND: 'BOOK_NOT_FOUND',
  BOOK_OUT_OF_STOCK: 'BOOK_OUT_OF_STOCK',
  BOOK_INVALID_FORMAT: 'BOOK_INVALID_FORMAT',
  
  // Cart errors
  CART_ITEM_NOT_FOUND: 'CART_ITEM_NOT_FOUND',
  CART_QUANTITY_INVALID: 'CART_QUANTITY_INVALID',
  CART_EMPTY: 'CART_EMPTY',
  
  // Payment errors
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  PAYMENT_DECLINED: 'PAYMENT_DECLINED',
  PAYMENT_INVALID: 'PAYMENT_INVALID',
  
  // Network errors
  NETWORK_ERROR: 'NETWORK_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  
  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  REQUIRED_FIELD: 'REQUIRED_FIELD',
  INVALID_FORMAT: 'INVALID_FORMAT',
  
  // Generic errors
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  PERMISSION_DENIED: 'PERMISSION_DENIED'
};

export const ERROR_MESSAGES = {
  [ERROR_CODES.AUTH_REQUIRED]: 'Please log in to continue',
  [ERROR_CODES.AUTH_INVALID]: 'Invalid credentials. Please try again.',
  [ERROR_CODES.AUTH_EXPIRED]: 'Your session has expired. Please log in again.',
  
  [ERROR_CODES.BOOK_NOT_FOUND]: 'Book not found. It may have been removed or is temporarily unavailable.',
  [ERROR_CODES.BOOK_OUT_OF_STOCK]: 'This book is currently out of stock.',
  [ERROR_CODES.BOOK_INVALID_FORMAT]: 'Invalid book format selected.',
  
  [ERROR_CODES.CART_ITEM_NOT_FOUND]: 'Item not found in cart.',
  [ERROR_CODES.CART_QUANTITY_INVALID]: 'Invalid quantity. Please enter a valid number.',
  [ERROR_CODES.CART_EMPTY]: 'Your cart is empty.',
  
  [ERROR_CODES.PAYMENT_FAILED]: 'Payment failed. Please try again or use a different payment method.',
  [ERROR_CODES.PAYMENT_DECLINED]: 'Payment was declined by your bank. Please contact your bank or try another card.',
  [ERROR_CODES.PAYMENT_INVALID]: 'Invalid payment information. Please check your details.',
  
  [ERROR_CODES.NETWORK_ERROR]: 'Network error. Please check your internet connection.',
  [ERROR_CODES.SERVER_ERROR]: 'Server error. Please try again later.',
  [ERROR_CODES.TIMEOUT_ERROR]: 'Request timed out. Please try again.',
  
  [ERROR_CODES.VALIDATION_ERROR]: 'Please check your input and try again.',
  [ERROR_CODES.REQUIRED_FIELD]: 'This field is required.',
  [ERROR_CODES.INVALID_FORMAT]: 'Invalid format. Please check your input.',
  
  [ERROR_CODES.UNKNOWN_ERROR]: 'An unexpected error occurred. Please try again.',
  [ERROR_CODES.PERMISSION_DENIED]: 'You don\'t have permission to perform this action.'
};

// Error handler function
export const handleError = (error: any, context?: string): AppError => {
  let appError: AppError;

  if (error instanceof OctobooksError) {
    appError = {
      code: error.code,
      message: error.message,
      details: error.details,
      timestamp: error.timestamp,
      userId: error.userId,
      action: context
    };
  } else if (error.response) {
    // HTTP error
    const status = error.response.status;
    let code = ERROR_CODES.SERVER_ERROR;
    let message = ERROR_MESSAGES[ERROR_CODES.SERVER_ERROR];

    switch (status) {
      case 401:
        code = ERROR_CODES.AUTH_REQUIRED;
        message = ERROR_MESSAGES[ERROR_CODES.AUTH_REQUIRED];
        break;
      case 403:
        code = ERROR_CODES.PERMISSION_DENIED;
        message = ERROR_MESSAGES[ERROR_CODES.PERMISSION_DENIED];
        break;
      case 404:
        code = ERROR_CODES.BOOK_NOT_FOUND;
        message = ERROR_MESSAGES[ERROR_CODES.BOOK_NOT_FOUND];
        break;
      case 422:
        code = ERROR_CODES.VALIDATION_ERROR;
        message = error.response.data?.message || ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR];
        break;
      case 500:
        code = ERROR_CODES.SERVER_ERROR;
        message = ERROR_MESSAGES[ERROR_CODES.SERVER_ERROR];
        break;
    }

    appError = {
      code,
      message,
      details: error.response.data,
      timestamp: new Date(),
      action: context
    };
  } else if (error.code === 'NETWORK_ERROR' || !navigator.onLine) {
    appError = {
      code: ERROR_CODES.NETWORK_ERROR,
      message: ERROR_MESSAGES[ERROR_CODES.NETWORK_ERROR],
      timestamp: new Date(),
      action: context
    };
  } else {
    appError = {
      code: ERROR_CODES.UNKNOWN_ERROR,
      message: error.message || ERROR_MESSAGES[ERROR_CODES.UNKNOWN_ERROR],
      details: error,
      timestamp: new Date(),
      action: context
    };
  }

  // Log error for debugging
  console.error('App Error:', appError);

  return appError;
};

// Retry mechanism for failed operations
export const withRetry = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: any;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries) {
        throw error;
      }

      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt - 1)));
    }
  }

  throw lastError;
};

// Network status monitoring
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

// Form validation helpers
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateRequired = (value: any): boolean => {
  return value !== null && value !== undefined && value !== '';
};

// Error reporting to external service
export const reportError = async (error: AppError) => {
  try {
    // In production, send to error monitoring service
    if (process.env.NODE_ENV === 'production') {
      await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(error),
      });
    }
  } catch (reportingError) {
    console.error('Failed to report error:', reportingError);
  }
};
