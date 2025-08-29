'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'rectangular' | 'circular';
  animation?: 'pulse' | 'wave' | 'none';
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width,
  height,
  variant = 'rectangular',
  animation = 'pulse'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return 'h-4 rounded';
      case 'circular':
        return 'rounded-full';
      case 'rectangular':
      default:
        return 'rounded-lg';
    }
  };

  const getAnimationClasses = () => {
    switch (animation) {
      case 'wave':
        return 'animate-wave';
      case 'pulse':
        return 'animate-pulse';
      case 'none':
      default:
        return '';
    }
  };

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      className={`bg-gray-200 dark:bg-gray-700 ${getVariantClasses()} ${getAnimationClasses()} ${className}`}
      style={style}
    />
  );
};

// Predefined skeleton components for common use cases
export const BookCardSkeleton: React.FC = () => (
  <div className="space-y-4">
    <Skeleton variant="rectangular" className="aspect-[3/4] w-full" />
    <Skeleton variant="text" className="w-3/4" />
    <Skeleton variant="text" className="w-1/2" />
    <Skeleton variant="text" className="w-1/4" />
  </div>
);

export const BookListSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <BookCardSkeleton key={index} />
    ))}
  </div>
);

export const BookDetailSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div>
      <Skeleton variant="rectangular" className="aspect-[3/4] w-full max-w-md mx-auto" />
    </div>
    <div className="space-y-6">
      <Skeleton variant="text" className="h-8 w-3/4" />
      <Skeleton variant="text" className="h-6 w-1/2" />
      <div className="flex items-center space-x-4">
        <Skeleton variant="text" className="h-5 w-20" />
        <Skeleton variant="text" className="h-5 w-24" />
      </div>
      <Skeleton variant="text" className="h-10 w-32" />
      <div className="space-y-2">
        <Skeleton variant="text" className="h-4 w-full" />
        <Skeleton variant="text" className="h-4 w-full" />
        <Skeleton variant="text" className="h-4 w-3/4" />
      </div>
      <div className="flex space-x-4">
        <Skeleton variant="rectangular" className="h-12 w-32" />
        <Skeleton variant="rectangular" className="h-12 w-32" />
      </div>
    </div>
  </div>
);

export const DashboardSkeleton: React.FC = () => (
  <div className="space-y-8">
    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton variant="text" className="h-4 w-20" />
              <Skeleton variant="text" className="h-8 w-16" />
            </div>
            <Skeleton variant="circular" className="w-12 h-12" />
          </div>
        </div>
      ))}
    </div>
    
    {/* Content Cards */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <Skeleton variant="text" className="h-6 w-32 mb-4" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Skeleton variant="rectangular" className="w-12 h-16" />
              <div className="flex-1 space-y-2">
                <Skeleton variant="text" className="h-4 w-3/4" />
                <Skeleton variant="text" className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <Skeleton variant="text" className="h-6 w-32 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between">
              <Skeleton variant="text" className="h-4 w-24" />
              <Skeleton variant="text" className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const TableSkeleton: React.FC<{ rows?: number; columns?: number }> = ({ 
  rows = 5, 
  columns = 4 
}) => (
  <div className="space-y-4">
    {/* Table Header */}
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {Array.from({ length: columns }).map((_, index) => (
        <Skeleton key={index} variant="text" className="h-5 w-20" />
      ))}
    </div>
    
    {/* Table Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton key={colIndex} variant="text" className="h-4" />
        ))}
      </div>
    ))}
  </div>
);

export const SearchResultsSkeleton: React.FC = () => (
  <div className="space-y-6">
    {/* Search Header */}
    <div className="space-y-4">
      <Skeleton variant="text" className="h-8 w-48" />
      <div className="flex space-x-4">
        <Skeleton variant="rectangular" className="h-12 flex-1" />
        <Skeleton variant="rectangular" className="h-12 w-32" />
      </div>
    </div>
    
    {/* Results */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <BookCardSkeleton key={index} />
      ))}
    </div>
  </div>
);

export const ProfileSkeleton: React.FC = () => (
  <div className="space-y-8">
    {/* Profile Header */}
    <div className="flex items-center space-x-6">
      <Skeleton variant="circular" className="w-24 h-24" />
      <div className="space-y-2">
        <Skeleton variant="text" className="h-6 w-32" />
        <Skeleton variant="text" className="h-4 w-48" />
        <Skeleton variant="rectangular" className="h-6 w-20" />
      </div>
    </div>
    
    {/* Profile Form */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton variant="text" className="h-4 w-20" />
          <Skeleton variant="rectangular" className="h-10 w-full" />
        </div>
      ))}
    </div>
  </div>
);

export default Skeleton;
