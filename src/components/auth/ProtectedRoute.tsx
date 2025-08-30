'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { hasPermission, hasPermissions } from '@/lib/permissions';
import { User } from '@/types';
import Loading from '@/components/ui/Loading';
import Button from '@/components/ui/Button';
import Link from 'next/link';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
  requiredPermissions?: string[];
  requiredRole?: User['role'];
  requiredRoles?: User['role'][];
  fallback?: React.ReactNode;
  showUnauthorized?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermission,
  requiredPermissions,
  requiredRole,
  requiredRoles,
  fallback,
  showUnauthorized = true
}) => {
  const { userProfile, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  if (!isAuthenticated || !userProfile) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Authentication Required
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please sign in to access this page.
          </p>
          <Link href="/auth/login">
            <Button variant="primary">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Check role-based access
  if (requiredRole && userProfile.role !== requiredRole) {
    return showUnauthorized ? (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You don't have the required role to access this page.
          </p>
          <Link href="/dashboard">
            <Button variant="primary">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    ) : null;
  }

  if (requiredRoles && !requiredRoles.includes(userProfile.role)) {
    return showUnauthorized ? (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You don't have the required role to access this page.
          </p>
          <Link href="/dashboard">
            <Button variant="primary">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    ) : null;
  }

  // Check permission-based access
  if (requiredPermission && !hasPermission(userProfile, requiredPermission)) {
    return showUnauthorized ? (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You don't have permission to access this page.
          </p>
          <Link href="/dashboard">
            <Button variant="primary">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    ) : null;
  }

  if (requiredPermissions && !hasPermissions(userProfile, requiredPermissions)) {
    return showUnauthorized ? (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You don't have the required permissions to access this page.
          </p>
          <Link href="/dashboard">
            <Button variant="primary">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    ) : null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

// Higher-order component for role-based protection
export const withRoleProtection = (
  Component: React.ComponentType<any>,
  requiredRole: User['role'],
  fallback?: React.ReactNode
) => {
  return function RoleProtectedComponent(props: any) {
    return (
      <ProtectedRoute requiredRole={requiredRole} fallback={fallback}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
};

// Higher-order component for permission-based protection
export const withPermissionProtection = (
  Component: React.ComponentType<any>,
  requiredPermission: string,
  fallback?: React.ReactNode
) => {
  return function PermissionProtectedComponent(props: any) {
    return (
      <ProtectedRoute requiredPermission={requiredPermission} fallback={fallback}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
};

// Quick access components for common roles
export const AdminOnly: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = ({
  children,
  fallback
}) => (
  <ProtectedRoute requiredRole="admin" fallback={fallback}>
    {children}
  </ProtectedRoute>
);

export const AuthorOnly: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = ({
  children,
  fallback
}) => (
  <ProtectedRoute requiredRole="author" fallback={fallback}>
    {children}
  </ProtectedRoute>
);

export const PublisherOnly: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = ({
  children,
  fallback
}) => (
  <ProtectedRoute requiredRole="publisher" fallback={fallback}>
    {children}
  </ProtectedRoute>
);

export const CustomerOnly: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = ({
  children,
  fallback
}) => (
  <ProtectedRoute requiredRole="customer" fallback={fallback}>
    {children}
  </ProtectedRoute>
);
