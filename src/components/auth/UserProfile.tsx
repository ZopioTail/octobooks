'use client';

import React, { useState } from 'react';
import { User, Edit, Save, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { useAuth } from '@/contexts/AuthContext';
import { updateUserProfile } from '@/lib/auth';

const UserProfile = () => {
  const { userProfile, currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    phone: userProfile?.phone || '',
    address: {
      street: userProfile?.address?.street || '',
      city: userProfile?.address?.city || '',
      state: userProfile?.address?.state || '',
      pincode: userProfile?.address?.pincode || '',
      country: userProfile?.address?.country || 'India'
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      await updateUserProfile(currentUser.uid, formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: userProfile?.name || '',
      phone: userProfile?.phone || '',
      address: {
        street: userProfile?.address?.street || '',
        city: userProfile?.address?.city || '',
        state: userProfile?.address?.state || '',
        pincode: userProfile?.address?.pincode || '',
        country: userProfile?.address?.country || 'India'
      }
    });
    setIsEditing(false);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'publisher': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      case 'author': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
    }
  };

  if (!userProfile) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              {userProfile.profileImage ? (
                <img
                  src={userProfile.profileImage}
                  alt={userProfile.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {userProfile.name}
              </h2>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getRoleBadgeColor(userProfile.role)}`}>
                  {userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1)}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Member since {new Date(userProfile.createdAt).getFullYear()}
                </span>
              </div>
            </div>
          </div>
          
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button variant="primary" size="sm" onClick={handleSave} loading={loading}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Basic Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <Input
              label="Email Address"
              value={userProfile.email}
              disabled
              helperText="Email cannot be changed"
            />
            <Input
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="+91 98765 43210"
            />
            <div className="flex items-end">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Account Type
                </label>
                <div className={`px-3 py-2 rounded-lg border ${getRoleBadgeColor(userProfile.role)} border-transparent`}>
                  {userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Address Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Input
                label="Street Address"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="123 Main Street"
              />
            </div>
            <Input
              label="City"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Mumbai"
            />
            <Input
              label="State"
              name="address.state"
              value={formData.address.state}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Maharashtra"
            />
            <Input
              label="PIN Code"
              name="address.pincode"
              value={formData.address.pincode}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="400001"
            />
            <Input
              label="Country"
              name="address.country"
              value={formData.address.country}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="India"
            />
          </div>
        </div>

        {/* Account Stats */}
        {userProfile.role === 'customer' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Account Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ₹{userProfile.walletBalance || 0}
                </div>
                <div className="text-sm text-green-700 dark:text-green-300">Wallet Balance</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {userProfile.rewardsPoints || 0}
                </div>
                <div className="text-sm text-purple-700 dark:text-purple-300">Rewards Points</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserProfile;
