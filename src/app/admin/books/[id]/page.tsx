'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getDocument, updateDocument } from '@/lib/firestore';
import { CATEGORIES, LANGUAGES, BOOK_FORMATS } from '@/lib/constants';
import { Book } from '@/types';

const EditBookPage = () => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  useEffect(() => {
    const fetchBook = async () => {
      if (!params.id || typeof params.id !== 'string') return;

      try {
        const bookData = await getDocument('books', params.id);
        if (bookData) {
          const book = bookData as Book;
          setFormData({
            title: book.title || '',
            subtitle: book.subtitle || '',
            authorName: book.authorName || '',
            authorId: book.authorId || '',
            publisherName: book.publisherName || '',
            publisherId: book.publisherId || '',
            isbn: book.isbn || '',
            description: book.description || '',
            category: book.category || '',
            language: book.language || '',
            format: book.format || '',
            pageCount: book.pageCount?.toString() || '',
            edition: book.edition || '',
            price: book.price?.toString() || '',
            discount: book.discount?.toString() || '',
            stock: book.stock?.toString() || '',
            bestseller: book.bestseller || false,
            newArrival: book.newArrival || false,
            trending: book.trending || false,
            tags: book.tags?.join(', ') || ''
          });
        } else {
          alert('Book not found');
          router.push('/admin/books');
        }
      } catch (error) {
        console.error('Error fetching book:', error);
        alert('Error loading book');
        router.push('/admin/books');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [params.id, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const bookData = {
        title: formData.title,
        subtitle: formData.subtitle || '',
        authorName: formData.authorName,
        authorId: formData.authorId,
        publisherName: formData.publisherName,
        publisherId: formData.publisherId,
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
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        updatedAt: new Date().toISOString()
      };

      await updateDocument('books', params.id as string, bookData);
      alert('Book updated successfully!');
      router.push('/admin/books');
    } catch (error) {
      console.error('Error updating book:', error);
      alert('Error updating book. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
      // Delete functionality would be implemented here
      alert('Delete functionality will be implemented in the next phase.');
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Edit Book">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading book details...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Edit Book">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Book</h1>
            <p className="text-gray-600 dark:text-gray-400">Update book information</p>
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
                  />
                  <Input
                    label="Subtitle"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Author Name *"
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Publisher Name *"
                    name="publisherName"
                    value={formData.publisherName}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="ISBN *"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleInputChange}
                    required
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
                    min="0"
                    step="0.01"
                  />
                  <Input
                    label="Discount (%)"
                    name="discount"
                    type="number"
                    value={formData.discount}
                    onChange={handleInputChange}
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
                    min="0"
                  />
                  <Input
                    label="Edition"
                    name="edition"
                    value={formData.edition}
                    onChange={handleInputChange}
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
                      <span className="text-sm">Bestseller</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="newArrival"
                        checked={formData.newArrival}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span className="text-sm">New Arrival</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="trending"
                        checked={formData.trending}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span className="text-sm">Trending</span>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-between items-center">
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Book
            </Button>

            <div className="flex space-x-4">
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
                disabled={saving}
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditBookPage;