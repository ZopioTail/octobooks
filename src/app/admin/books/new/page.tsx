'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { createDocument } from '@/lib/firestore';
import { CATEGORIES, LANGUAGES, BOOK_FORMATS } from '@/lib/constants';

const AddBookPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    authorName: '',
    authorId: '',
    publisherName: '',
    publisherId: '',
    isbn: '',
    description: '',
    category: '',
    language: '',
    format: '',
    pageCount: '',
    edition: '',
    price: '',
    discount: '',
    stock: '',
    bestseller: false,
    newArrival: false,
    trending: false,
    tags: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookData = {
        title: formData.title,
        subtitle: formData.subtitle || '',
        authorName: formData.authorName,
        authorId: formData.authorId || 'author-' + Date.now(),
        publisherName: formData.publisherName,
        publisherId: formData.publisherId || 'publisher-' + Date.now(),
        isbn: formData.isbn,
        description: formData.description,
        category: formData.category,
        language: formData.language,
        format: formData.format,
        pageCount: parseInt(formData.pageCount) || 0,
        edition: formData.edition || '1st Edition',
        price: parseFloat(formData.price) || 0,
        finalPrice: parseFloat(formData.price) * (1 - (parseFloat(formData.discount) || 0) / 100),
        discount: parseFloat(formData.discount) || 0,
        stock: parseInt(formData.stock) || 0,
        bestseller: formData.bestseller,
        newArrival: formData.newArrival,
        trending: formData.trending,
        rating: 0,
        reviewsCount: 0,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        coverImage: '/api/placeholder/300/400',
        samplePages: [],
        status: 'published'
      };

      const bookId = await createDocument('books', bookData);
      alert('Book created successfully!');
      router.push('/admin/books');
    } catch (error) {
      console.error('Error creating book:', error);
      alert('Error creating book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Add New Book">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Book</h1>
            <p className="text-gray-600 dark:text-gray-400">Add a new book to your catalog</p>
          </div>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold">Basic Information</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    label="Title *"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter book title"
                  />
                  <Input
                    label="Subtitle"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    placeholder="Enter book subtitle"
                  />
                  <Input
                    label="Author Name *"
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter author name"
                  />
                  <Input
                    label="Publisher Name *"
                    name="publisherName"
                    value={formData.publisherName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter publisher name"
                  />
                  <Input
                    label="ISBN *"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter ISBN"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold">Pricing & Stock</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    label="Price (₹) *"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                  <Input
                    label="Discount (%)"
                    name="discount"
                    type="number"
                    value={formData.discount}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                  <Input
                    label="Stock Quantity *"
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    placeholder="0"
                    min="0"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold">Book Details</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select
                    label="Category *"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    options={[
                      { value: '', label: 'Select Category' },
                      ...CATEGORIES.map(cat => ({ value: cat, label: cat }))
                    ]}
                  />
                  <Select
                    label="Language *"
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    required
                    options={[
                      { value: '', label: 'Select Language' },
                      ...LANGUAGES.map(lang => ({ value: lang, label: lang }))
                    ]}
                  />
                  <Select
                    label="Format *"
                    name="format"
                    value={formData.format}
                    onChange={handleInputChange}
                    required
                    options={[
                      { value: '', label: 'Select Format' },
                      ...BOOK_FORMATS.map(format => ({ value: format, label: format }))
                    ]}
                  />
                  <Input
                    label="Page Count"
                    name="pageCount"
                    type="number"
                    value={formData.pageCount}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                  />
                  <Input
                    label="Edition"
                    name="edition"
                    value={formData.edition}
                    onChange={handleInputChange}
                    placeholder="1st Edition"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold">Additional Information</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                      placeholder="Enter book description"
                    />
                  </div>
                  <Input
                    label="Tags (comma-separated)"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="fiction, business, self-help"
                  />
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="bestseller"
                        checked={formData.bestseller}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span className="text-sm">Mark as Bestseller</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="newArrival"
                        checked={formData.newArrival}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span className="text-sm">Mark as New Arrival</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="trending"
                        checked={formData.trending}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span className="text-sm">Mark as Trending</span>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Book
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddBookPage;