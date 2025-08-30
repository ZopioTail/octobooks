// Role-based permissions system for Octobooks
import { User } from '@/types';

export interface Permission {
  id: string;
  name: string;
  description: string;
  roles: User['role'][];
}

export interface RolePermissions {
  canViewDashboard: boolean;
  canManageBooks: boolean;
  canManageOwnBooks: boolean;
  canPublishBooks: boolean;
  canEditBookPrices: boolean;
  canCreateCoupons: boolean;
  canViewSalesReports: boolean;
  canViewRoyaltyReports: boolean;
  canRequestPayout: boolean;
  canManageUsers: boolean;
  canManageAllBooks: boolean;
  canManageCoupons: boolean;
  canManageInventory: boolean;
  canManageSettings: boolean;
  canViewAuditLogs: boolean;
  canExportReports: boolean;
  canUploadFiles: boolean;
  canEditAuthorInfo: boolean;
  canEditBookDescriptions: boolean;
  canUploadFullCover: boolean;
  canUploadInteriorFile: boolean;
  canUploadFrontBackCovers: boolean;
  canCheckSalesData: boolean;
  canCheckRoyaltyData: boolean;
  canPublishUnpublish: boolean;
}

// Permission definitions
export const PERMISSIONS: Permission[] = [
  // Author Permissions
  {
    id: 'author_manage_own_books',
    name: 'Manage Own Books',
    description: 'Can create, edit, and delete their own books',
    roles: ['author']
  },
  {
    id: 'author_edit_prices',
    name: 'Edit Book Prices',
    description: 'Can modify selling price within allowed limits',
    roles: ['author']
  },
  {
    id: 'author_create_coupons',
    name: 'Create Coupons',
    description: 'Can create coupons with max 10% discount',
    roles: ['author']
  },
  {
    id: 'author_view_reports',
    name: 'View Reports',
    description: 'Can view sales and royalty reports',
    roles: ['author']
  },
  {
    id: 'author_request_payout',
    name: 'Request Payout',
    description: 'Can request payout when royalty ≥ ₹500',
    roles: ['author']
  },

  // Publisher Permissions
  {
    id: 'publisher_edit_author_info',
    name: 'Edit Author Info',
    description: 'Can edit author information',
    roles: ['publisher']
  },
  {
    id: 'publisher_edit_descriptions',
    name: 'Edit Book Descriptions',
    description: 'Can edit book descriptions',
    roles: ['publisher']
  },
  {
    id: 'publisher_upload_files',
    name: 'Upload Files',
    description: 'Can upload book files and covers',
    roles: ['publisher']
  },
  {
    id: 'publisher_view_sales',
    name: 'View Sales Data',
    description: 'Can check sales data',
    roles: ['publisher']
  },
  {
    id: 'publisher_view_royalties',
    name: 'View Royalty Data',
    description: 'Can check royalty data',
    roles: ['publisher']
  },
  {
    id: 'publisher_publish_books',
    name: 'Publish/Unpublish Books',
    description: 'Can publish and unpublish books',
    roles: ['publisher']
  },

  // Admin Permissions
  {
    id: 'admin_manage_users',
    name: 'Manage Users',
    description: 'Can create, edit, and disable users',
    roles: ['admin']
  },
  {
    id: 'admin_manage_all_books',
    name: 'Manage All Books',
    description: 'Can approve, reject, and edit all books',
    roles: ['admin']
  },
  {
    id: 'admin_manage_royalties',
    name: 'Manage Royalties',
    description: 'Can manage royalty payments and adjustments',
    roles: ['admin']
  },
  {
    id: 'admin_manage_coupons',
    name: 'Manage Coupons',
    description: 'Can approve and disable coupons',
    roles: ['admin']
  },
  {
    id: 'admin_manage_inventory',
    name: 'Manage Inventory',
    description: 'Can manage book inventory',
    roles: ['admin']
  },
  {
    id: 'admin_manage_settings',
    name: 'Manage Settings',
    description: 'Can manage platform settings',
    roles: ['admin']
  },
  {
    id: 'admin_view_audit_logs',
    name: 'View Audit Logs',
    description: 'Can view all audit logs',
    roles: ['admin']
  },
  {
    id: 'admin_export_reports',
    name: 'Export Reports',
    description: 'Can export reports in CSV/Excel format',
    roles: ['admin']
  }
];

// Get permissions for a specific role
export const getRolePermissions = (role: User['role']): RolePermissions => {
  const basePermissions: RolePermissions = {
    canViewDashboard: true,
    canManageBooks: false,
    canManageOwnBooks: false,
    canPublishBooks: false,
    canEditBookPrices: false,
    canCreateCoupons: false,
    canViewSalesReports: false,
    canViewRoyaltyReports: false,
    canRequestPayout: false,
    canManageUsers: false,
    canManageAllBooks: false,
    canManageCoupons: false,
    canManageInventory: false,
    canManageSettings: false,
    canViewAuditLogs: false,
    canExportReports: false,
    canUploadFiles: false,
    canEditAuthorInfo: false,
    canEditBookDescriptions: false,
    canUploadFullCover: false,
    canUploadInteriorFile: false,
    canUploadFrontBackCovers: false,
    canCheckSalesData: false,
    canCheckRoyaltyData: false,
    canPublishUnpublish: false
  };

  switch (role) {
    case 'author':
      return {
        ...basePermissions,
        canManageOwnBooks: true,
        canEditBookPrices: true,
        canCreateCoupons: true,
        canViewSalesReports: true,
        canViewRoyaltyReports: true,
        canRequestPayout: true
      };

    case 'publisher':
      return {
        ...basePermissions,
        canEditAuthorInfo: true,
        canEditBookDescriptions: true,
        canUploadFiles: true,
        canUploadFullCover: true,
        canUploadInteriorFile: true,
        canUploadFrontBackCovers: true,
        canCheckSalesData: true,
        canCheckRoyaltyData: true,
        canPublishUnpublish: true
      };

    case 'admin':
      return {
        ...basePermissions,
        canManageUsers: true,
        canManageAllBooks: true,
        canManageCoupons: true,
        canManageInventory: true,
        canManageSettings: true,
        canViewAuditLogs: true,
        canExportReports: true,
        canViewSalesReports: true,
        canViewRoyaltyReports: true
      };

    case 'customer':
      return basePermissions;

    default:
      return basePermissions;
  }
};

// Check if user has specific permission
export const hasPermission = (user: User | null, permissionId: string): boolean => {
  if (!user) return false;
  
  const permission = PERMISSIONS.find(p => p.id === permissionId);
  if (!permission) return false;
  
  return permission.roles.includes(user.role);
};

// Check multiple permissions
export const hasPermissions = (user: User | null, permissionIds: string[]): boolean => {
  return permissionIds.every(permissionId => hasPermission(user, permissionId));
};

// Get all permissions for a user
export const getUserPermissions = (user: User | null): Permission[] => {
  if (!user) return [];
  return PERMISSIONS.filter(permission => permission.roles.includes(user.role));
};

// Price validation for authors
export const validateAuthorPrice = (price: number, printCost: number): { valid: boolean; message: string } => {
  const minPrice = printCost * 1.3; // Print cost + 30%
  
  if (price < minPrice) {
    return {
      valid: false,
      message: `Price cannot be below ₹${minPrice.toFixed(2)} (Print cost + 30%)`
    };
  }
  
  return { valid: true, message: '' };
};

// Coupon validation for authors
export const validateAuthorCoupon = (discount: number, activeCoupons: number): { valid: boolean; message: string } => {
  if (discount > 10) {
    return {
      valid: false,
      message: 'Discount cannot exceed 10%'
    };
  }
  
  if (activeCoupons >= 3) {
    return {
      valid: false,
      message: 'Maximum 3 active coupons allowed'
    };
  }
  
  return { valid: true, message: '' };
};

// Payout validation for authors
export const validatePayoutRequest = (royaltyBalance: number): { valid: boolean; message: string } => {
  if (royaltyBalance < 500) {
    return {
      valid: false,
      message: 'Minimum ₹500 royalty balance required for payout'
    };
  }
  
  return { valid: true, message: '' };
};