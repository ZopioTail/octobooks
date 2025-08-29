'use client';

import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Camera, Save, Edit, Shield, Bell, CreditCard, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Badge from '@/components/ui/Badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BOOK_CATEGORIES } from '@/lib/constants';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+91 98765 43210',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    avatar: '/api/placeholder/150/150',
    bio: 'Passionate reader and book enthusiast. Love exploring different genres and discovering new authors.',
    
    // Address Information
    addresses: [
      {
        id: '1',
        type: 'Home',
        name: 'John Doe',
        phone: '+91 98765 43210',
        addressLine1: '123 Book Street',
        addressLine2: 'Apartment 4B',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        country: 'India',
        isDefault: true
      }
    ],
    
    // Preferences
    preferences: {
      language: 'English',
      currency: 'INR',
      timezone: 'Asia/Kolkata',
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: true,
      bookRecommendations: true
    },
    
    // Reading Preferences
    readingPreferences: {
      favoriteGenres: ['Business', 'Self-Help', 'Technology'],
      preferredFormat: 'Paperback',
      readingGoal: 12,
      privacyLevel: 'Public'
    }
  });

  const tabs = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'addresses', name: 'Addresses', icon: MapPin },
    { id: 'preferences', name: 'Preferences', icon: Bell },
    { id: 'reading', name: 'Reading Profile', icon: BookOpen },
    { id: 'security', name: 'Security', icon: Shield }
  ];

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setIsEditing(false);
      // Show success message
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [field]: value }
    }));
  };

  const handleReadingPreferenceChange = (field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      readingPreferences: { ...prev.readingPreferences, [field]: value }
    }));
  };

  return (
    <>
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Profile Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your account information and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-0">
                  <nav className="space-y-1">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-6 py-4 text-left transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600 dark:bg-blue-900/20 dark:text-blue-300'
                            : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                        }`}
                      >
                        <tab.icon className="h-5 w-5" />
                        <span className="font-medium">{tab.name}</span>
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Personal Information Tab */}
              {activeTab === 'personal' && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Personal Information
                      </h2>
                      <Button
                        variant={isEditing ? "outline" : "primary"}
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Profile Picture */}
                    <div className="flex items-center space-x-6 mb-8">
                      <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center overflow-hidden">
                          <span className="text-4xl">👤</span>
                        </div>
                        {isEditing && (
                          <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700">
                            <Camera className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {profile.firstName} {profile.lastName}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">{profile.email}</p>
                        <Badge variant="success" className="mt-2">Verified Account</Badge>
                      </div>
                    </div>

                    {/* Personal Details Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="First Name"
                        value={profile.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        disabled={!isEditing}
                      />
                      <Input
                        label="Last Name"
                        value={profile.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        disabled={!isEditing}
                      />
                      <Input
                        label="Email Address"
                        type="email"
                        value={profile.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={!isEditing}
                        leftIcon={<Mail className="h-4 w-4" />}
                      />
                      <Input
                        label="Phone Number"
                        value={profile.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        disabled={!isEditing}
                        leftIcon={<Phone className="h-4 w-4" />}
                      />
                      <Input
                        label="Date of Birth"
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        disabled={!isEditing}
                        leftIcon={<Calendar className="h-4 w-4" />}
                      />
                      <Select
                        label="Gender"
                        value={profile.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        disabled={!isEditing}
                        options={[
                          { value: 'Male', label: 'Male' },
                          { value: 'Female', label: 'Female' },
                          { value: 'Other', label: 'Other' },
                          { value: 'Prefer not to say', label: 'Prefer not to say' }
                        ]}
                      />
                    </div>

                    {/* Bio */}
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Bio
                      </label>
                      <textarea
                        value={profile.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        disabled={!isEditing}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-700"
                        placeholder="Tell us about yourself and your reading interests..."
                      />
                    </div>

                    {isEditing && (
                      <div className="mt-8 flex space-x-4">
                        <Button variant="primary" onClick={handleSave} loading={loading}>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Reading Preferences Tab */}
              {activeTab === 'reading' && (
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Reading Profile
                    </h2>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Reading Goal */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Annual Reading Goal
                        </label>
                        <div className="flex items-center space-x-4">
                          <Input
                            type="number"
                            value={profile.readingPreferences.readingGoal}
                            onChange={(e) => handleReadingPreferenceChange('readingGoal', parseInt(e.target.value))}
                            className="w-32"
                          />
                          <span className="text-gray-600 dark:text-gray-400">books per year</span>
                        </div>
                      </div>

                      {/* Favorite Genres */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Favorite Genres
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {BOOK_CATEGORIES.map((genre) => (
                            <button
                              key={genre}
                              onClick={() => {
                                const current = profile.readingPreferences.favoriteGenres;
                                const updated = current.includes(genre)
                                  ? current.filter(g => g !== genre)
                                  : [...current, genre];
                                handleReadingPreferenceChange('favoriteGenres', updated);
                              }}
                              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                                profile.readingPreferences.favoriteGenres.includes(genre)
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                              }`}
                            >
                              {genre}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Preferred Format */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Preferred Format
                        </label>
                        <Select
                          value={profile.readingPreferences.preferredFormat}
                          onChange={(e) => handleReadingPreferenceChange('preferredFormat', e.target.value)}
                          options={[
                            { value: 'Paperback', label: 'Paperback' },
                            { value: 'Hardcover', label: 'Hardcover' },
                            { value: 'E-book', label: 'E-book' },
                            { value: 'Audiobook', label: 'Audiobook' }
                          ]}
                        />
                      </div>

                      {/* Privacy Level */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Reading Activity Privacy
                        </label>
                        <Select
                          value={profile.readingPreferences.privacyLevel}
                          onChange={(e) => handleReadingPreferenceChange('privacyLevel', e.target.value)}
                          options={[
                            { value: 'Public', label: 'Public - Anyone can see my reading activity' },
                            { value: 'Friends', label: 'Friends Only - Only my friends can see' },
                            { value: 'Private', label: 'Private - Keep my reading activity private' }
                          ]}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Notification Preferences Tab */}
              {activeTab === 'preferences' && (
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Notification Preferences
                    </h2>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Email Notifications */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Receive order updates and important account information</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={profile.preferences.emailNotifications}
                            onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      {/* SMS Notifications */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">SMS Notifications</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Receive delivery updates via SMS</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={profile.preferences.smsNotifications}
                            onChange={(e) => handlePreferenceChange('smsNotifications', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      {/* Marketing Emails */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">Marketing Emails</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Receive promotional offers and new book announcements</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={profile.preferences.marketingEmails}
                            onChange={(e) => handlePreferenceChange('marketingEmails', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      {/* Book Recommendations */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">Book Recommendations</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Get personalized book suggestions based on your reading history</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={profile.preferences.bookRecommendations}
                            onChange={(e) => handlePreferenceChange('bookRecommendations', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Security Settings
                    </h2>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Change Password */}
                      <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-4">Change Password</h3>
                        <div className="space-y-4">
                          <Input
                            label="Current Password"
                            type="password"
                            placeholder="Enter current password"
                          />
                          <Input
                            label="New Password"
                            type="password"
                            placeholder="Enter new password"
                          />
                          <Input
                            label="Confirm New Password"
                            type="password"
                            placeholder="Confirm new password"
                          />
                          <Button variant="primary">
                            Update Password
                          </Button>
                        </div>
                      </div>

                      {/* Two-Factor Authentication */}
                      <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security to your account</p>
                          </div>
                          <Button variant="outline">
                            Enable 2FA
                          </Button>
                        </div>
                      </div>

                      {/* Login Sessions */}
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white mb-4">Active Sessions</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">Current Session</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Chrome on Windows • Mumbai, India</p>
                            </div>
                            <Badge variant="success">Active</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProfilePage;
