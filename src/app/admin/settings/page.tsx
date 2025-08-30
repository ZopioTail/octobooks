'use client';

import React, { useState, useEffect } from 'react';
import {
  Save,
  Upload,
  Download,
  Mail,
  Phone,
  MapPin,
  Globe,
  CreditCard,
  Truck,
  Shield,
  Bell,
  Users,
  BookOpen,
  DollarSign
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { AdminOnly } from '@/components/auth/ProtectedRoute';

interface PlatformSettings {
  siteName: string;
  contactEmail: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  currency: string;
  taxRate: number;
  shippingCost: number;
  freeShippingThreshold: number;
  razorpayKeyId: string;
  razorpayKeySecret: string;
  shiprocketEmail: string;
  shiprocketPassword: string;
  shiprocketToken: string;
  notificationEmails: string[];
  autoApproveBooks: boolean;
  authorRoyaltyRate: number;
  publisherRoyaltyRate: number;
  platformFee: number;
  minPayoutAmount: number;
  refundPolicy: string;
  termsConditions: string;
  privacyPolicy: string;
  shippingPolicy: string;
  aboutUs: string;
}

const SettingsPage = () => {
  const [settings, setSettings] = useState<PlatformSettings>({
    siteName: 'Octobooks',
    contactEmail: 'cs@octobooks.com',
    phone: '+91 98765 43210',
    address: {
      street: 'Primus Building, Door No. SP–7A, 2C, Guindy Industrial Estate, SIDCO Industrial Estate',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600032',
      country: 'India'
    },
    currency: 'INR',
    taxRate: 18,
    shippingCost: 50,
    freeShippingThreshold: 500,
    razorpayKeyId: '',
    razorpayKeySecret: '',
    shiprocketEmail: '',
    shiprocketPassword: '',
    shiprocketToken: '',
    notificationEmails: ['admin@octobooks.com'],
    autoApproveBooks: false,
    authorRoyaltyRate: 15,
    publisherRoyaltyRate: 25,
    platformFee: 10,
    minPayoutAmount: 500,
    refundPolicy: '30-day refund policy',
    termsConditions: 'Standard terms and conditions apply',
    privacyPolicy: 'We respect your privacy and protect your data',
    shippingPolicy: '2-5 business days delivery',
    aboutUs: 'Your trusted online bookstore'
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      // Simulate API call to fetch settings
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching settings:', error);
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      // Simulate API call to save settings
      setTimeout(() => {
        alert('Settings saved successfully!');
        setSaving(false);
      }, 1000);
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings');
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddressChange = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  if (loading) {
    return (
      <AdminOnly>
        <DashboardLayout title="Settings">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading settings...</p>
            </div>
          </div>
        </DashboardLayout>
      </AdminOnly>
    );
  }

  return (
    <AdminOnly>
      <DashboardLayout title="Platform Settings">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Platform Settings</h1>
              <p className="text-gray-600 dark:text-gray-400">Configure your bookstore platform settings</p>
            </div>
            <Button variant="primary" onClick={handleSaveSettings} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* General Settings */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    General Settings
                  </h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    label="Site Name"
                    value={settings.siteName}
                    onChange={(e) => handleInputChange('siteName', e.target.value)}
                  />
                  <Input
                    label="Contact Email"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    leftIcon={<Mail className="h-4 w-4" />}
                  />
                  <Input
                    label="Phone Number"
                    value={settings.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    leftIcon={<Phone className="h-4 w-4" />}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Address
                  </h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    label="Street Address"
                    value={settings.address.street}
                    onChange={(e) => handleAddressChange('street', e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="City"
                      value={settings.address.city}
                      onChange={(e) => handleAddressChange('city', e.target.value)}
                    />
                    <Input
                      label="State"
                      value={settings.address.state}
                      onChange={(e) => handleAddressChange('state', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Pincode"
                      value={settings.address.pincode}
                      onChange={(e) => handleAddressChange('pincode', e.target.value)}
                    />
                    <Input
                      label="Country"
                      value={settings.address.country}
                      onChange={(e) => handleAddressChange('country', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Financial Settings
                  </h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    label="Tax Rate (%)"
                    type="number"
                    value={settings.taxRate.toString()}
                    onChange={(e) => handleInputChange('taxRate', parseFloat(e.target.value))}
                  />
                  <Input
                    label="Shipping Cost (₹)"
                    type="number"
                    value={settings.shippingCost.toString()}
                    onChange={(e) => handleInputChange('shippingCost', parseFloat(e.target.value))}
                  />
                  <Input
                    label="Free Shipping Threshold (₹)"
                    type="number"
                    value={settings.freeShippingThreshold.toString()}
                    onChange={(e) => handleInputChange('freeShippingThreshold', parseFloat(e.target.value))}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Integration Settings */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Gateway (Razorpay)
                  </h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    label="Razorpay Key ID"
                    type="password"
                    value={settings.razorpayKeyId}
                    onChange={(e) => handleInputChange('razorpayKeyId', e.target.value)}
                    placeholder="rzp_test_xxxxxxxxxxxx"
                  />
                  <Input
                    label="Razorpay Key Secret"
                    type="password"
                    value={settings.razorpayKeySecret}
                    onChange={(e) => handleInputChange('razorpayKeySecret', e.target.value)}
                    placeholder="xxxxxxxxxxxxxxxxxxxx"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold flex items-center">
                    <Truck className="h-5 w-5 mr-2" />
                    Shipping (Shiprocket)
                  </h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    label="Shiprocket Email"
                    type="email"
                    value={settings.shiprocketEmail}
                    onChange={(e) => handleInputChange('shiprocketEmail', e.target.value)}
                  />
                  <Input
                    label="Shiprocket Password"
                    type="password"
                    value={settings.shiprocketPassword}
                    onChange={(e) => handleInputChange('shiprocketPassword', e.target.value)}
                  />
                  <Input
                    label="Shiprocket Token"
                    type="password"
                    value={settings.shiprocketToken}
                    onChange={(e) => handleInputChange('shiprocketToken', e.target.value)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    User & Content Settings
                  </h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Auto Approve Books
                    </label>
                    <input
                      type="checkbox"
                      checked={settings.autoApproveBooks}
                      onChange={(e) => handleInputChange('autoApproveBooks', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  <Input
                    label="Author Royalty Rate (%)"
                    type="number"
                    value={settings.authorRoyaltyRate.toString()}
                    onChange={(e) => handleInputChange('authorRoyaltyRate', parseFloat(e.target.value))}
                  />
                  <Input
                    label="Publisher Royalty Rate (%)"
                    type="number"
                    value={settings.publisherRoyaltyRate.toString()}
                    onChange={(e) => handleInputChange('publisherRoyaltyRate', parseFloat(e.target.value))}
                  />
                  <Input
                    label="Platform Fee (%)"
                    type="number"
                    value={settings.platformFee.toString()}
                    onChange={(e) => handleInputChange('platformFee', parseFloat(e.target.value))}
                  />
                  <Input
                    label="Minimum Payout Amount (₹)"
                    type="number"
                    value={settings.minPayoutAmount.toString()}
                    onChange={(e) => handleInputChange('minPayoutAmount', parseFloat(e.target.value))}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Notification Settings
                  </h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    label="Notification Emails (comma-separated)"
                    value={settings.notificationEmails.join(', ')}
                    onChange={(e) => handleInputChange('notificationEmails', e.target.value.split(',').map(email => email.trim()))}
                    placeholder="admin@octobooks.com, support@octobooks.com"
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Policy Settings */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Policy Settings
                </h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Refund Policy
                  </label>
                  <textarea
                    value={settings.refundPolicy}
                    onChange={(e) => handleInputChange('refundPolicy', e.target.value)}
                    rows={3}
                    className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Terms & Conditions
                  </label>
                  <textarea
                    value={settings.termsConditions}
                    onChange={(e) => handleInputChange('termsConditions', e.target.value)}
                    rows={3}
                    className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Privacy Policy
                  </label>
                  <textarea
                    value={settings.privacyPolicy}
                    onChange={(e) => handleInputChange('privacyPolicy', e.target.value)}
                    rows={3}
                    className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Shipping Policy
                  </label>
                  <textarea
                    value={settings.shippingPolicy}
                    onChange={(e) => handleInputChange('shippingPolicy', e.target.value)}
                    rows={3}
                    className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    About Us
                  </label>
                  <textarea
                    value={settings.aboutUs}
                    onChange={(e) => handleInputChange('aboutUs', e.target.value)}
                    rows={3}
                    className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </AdminOnly>
  );
};

export default SettingsPage;