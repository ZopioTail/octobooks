'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, User, Tag, ArrowRight, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: '1',
      title: 'The Rise of Digital Reading: How E-books Are Changing Literature',
      excerpt: 'Explore how digital platforms are revolutionizing the way we read and discover books, making literature more accessible than ever before.',
      author: 'Sarah Johnson',
      date: '2024-08-25',
      category: 'Technology',
      readTime: '5 min read',
      image: '/api/placeholder/600/400',
      featured: true
    },
    {
      id: '2',
      title: 'Supporting Independent Authors: A Publisher\'s Perspective',
      excerpt: 'Learn how modern publishing platforms are empowering independent authors to reach global audiences and build sustainable careers.',
      author: 'Michael Chen',
      date: '2024-08-22',
      category: 'Publishing',
      readTime: '7 min read',
      image: '/api/placeholder/600/400',
      featured: false
    },
    {
      id: '3',
      title: 'Book Recommendations: Must-Read Business Books for 2024',
      excerpt: 'Discover the top business books that are shaping entrepreneurial thinking and leadership strategies this year.',
      author: 'Emily Rodriguez',
      date: '2024-08-20',
      category: 'Book Reviews',
      readTime: '4 min read',
      image: '/api/placeholder/600/400',
      featured: false
    },
    {
      id: '4',
      title: 'The Psychology Behind Reading Habits: What Makes Us Choose Books',
      excerpt: 'Dive into the fascinating psychology of reading preferences and how book covers, reviews, and recommendations influence our choices.',
      author: 'Dr. James Wilson',
      date: '2024-08-18',
      category: 'Psychology',
      readTime: '6 min read',
      image: '/api/placeholder/600/400',
      featured: false
    },
    {
      id: '5',
      title: 'Building a Reading Community: The Power of Book Clubs',
      excerpt: 'Explore how book clubs and reading communities are fostering deeper connections and enhancing the reading experience.',
      author: 'Lisa Thompson',
      date: '2024-08-15',
      category: 'Community',
      readTime: '5 min read',
      image: '/api/placeholder/600/400',
      featured: false
    },
    {
      id: '6',
      title: 'Sustainable Publishing: Environmental Impact of Digital vs Print',
      excerpt: 'An in-depth analysis of the environmental implications of digital and print publishing, and how the industry is adapting.',
      author: 'Green Publishing Team',
      date: '2024-08-12',
      category: 'Environment',
      readTime: '8 min read',
      image: '/api/placeholder/600/400',
      featured: false
    }
  ];

  const categories = ['all', 'Technology', 'Publishing', 'Book Reviews', 'Psychology', 'Community', 'Environment'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Octobooks Blog
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              Insights, stories, and updates from the world of books and publishing
            </p>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <Input
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  leftIcon={<Search className="h-5 w-5" />}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category === 'all' ? 'All Posts' : category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Featured Post</h2>
              <Card className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <div className="h-64 md:h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <span className="text-6xl">📖</span>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full dark:bg-blue-900/20 dark:text-blue-300">
                        {featuredPost.category}
                      </span>
                      <span className="text-sm text-gray-500">{featuredPost.readTime}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>{featuredPost.author}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Link href={`/blog/${featuredPost.id}`}>
                        <Button variant="primary">
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Latest Posts</h2>
            
            {regularPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <Card key={post.id} hover className="overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-4xl">📝</span>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-3">
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full dark:bg-gray-800 dark:text-gray-300">
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-500">{post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <Link href={`/blog/${post.id}`}>
                          <Button variant="outline" size="sm">
                            Read More
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No posts found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Subscribe to our newsletter for the latest blog posts, book recommendations, and industry insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                type="email"
                className="flex-1"
              />
              <Button variant="primary">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BlogPage;
