import { db } from './firebase';

/**
 * Check if Firebase is properly configured and available
 */
export const isFirebaseAvailable = (): boolean => {
  return !!db;
};

/**
 * Get data from Firebase or fallback to provided sample data
 * @param firebaseQuery Function that returns a Firebase query
 * @param sampleData Sample data to use if Firebase is not available
 * @param errorMessage Error message to log if Firebase query fails
 */
export const getLiveData = async <T>(
  firebaseQuery: () => Promise<T>,
  sampleData: T,
  errorMessage: string = 'Error fetching live data'
): Promise<T> => {
  if (!isFirebaseAvailable()) {
    console.warn('Firebase not configured, using sample data');
    return sampleData;
  }

  try {
    return await firebaseQuery();
  } catch (error) {
    console.error(errorMessage, error);
    return sampleData;
  }
};

/**
 * Execute a Firebase operation with error handling
 * @param operation Firebase operation function
 * @param errorMessage Error message to display on failure
 * @param fallback Fallback value to return on error
 */
export const executeFirebaseOperation = async <T>(
  operation: () => Promise<T>,
  errorMessage: string = 'Firebase operation failed',
  fallback?: T
): Promise<T | undefined> => {
  if (!isFirebaseAvailable()) {
    console.warn('Firebase not configured, operation skipped');
    return fallback;
  }

  try {
    return await operation();
  } catch (error) {
    console.error(errorMessage, error);
    return fallback;
  }
};