'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowRight, BookOpen, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const BlogHighlights = () => {
  const blogPosts = [
    {
      id: '1',
      title: 'The Rise of Digital Reading: How E-books Are Changing Literature',
      excerpt: 'Explore how digital platforms are revolutionizing the way we read and discover books, making literature more accessible than ever before.',
      author: 'Sarah Johnson',
      date: '2024-08-25',
      category: 'Technology',
      readTime: '5 min read',
      image: '/api/placeholder/400/250',
      featured: true
    },
    {
      id: '2',
      title: 'Supporting Independent Authors: A Publisher\'s Perspective',
      excerpt: 'Learn how modern publishing platforms are empowering independent authors to reach global audiences.',
      author: 'Michael Chen',
      date: '2024-08-22',
      category: 'Publishing',
      readTime: '7 min read',
      image: '/api/placeholder/400/250',
      featured: false
    },
    {
      id: '3',
      title: 'Book Recommendations: Must-Read Business Books for 2024',
      excerpt: 'Discover the top business books that are shaping entrepreneurial thinking this year.',
      author: 'Emily Rodriguez',
      date: '2024-08-20',
      category: 'Book Reviews',
      readTime: '4 min read',
      image: '/api/placeholder/400/250',
      featured: false
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-green-100 dark:bg-green-900/20 rounded-full mb-4">
            <BookOpen className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            From Our Blog
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stay updated with the latest insights, book reviews, and industry trends from our editorial team
          </p>
        </div>

        {/* Featured Post */}
        {blogPosts.filter(post => post.featured).map((post) => (
          <Card key={post.id} className="mb-12 overflow-hidden hover:shadow-xl transition-shadow">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="h-64 md:h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                  <span className="text-6xl">📖</span>
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full dark:bg-green-900/20 dark:text-green-300">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Link href={`/blog/${post.id}`}>
                    <Button variant="primary">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {/* Recent Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {blogPosts.filter(post => !post.featured).map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-4xl">📝</span>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-3">
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full dark:bg-gray-700 dark:text-gray-300">
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

        {/* Blog CTA */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Stay Informed with Our Blog
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Get the latest book reviews, author interviews, and publishing industry insights
          </p>
          <Link href="/blog">
            <Button variant="primary" size="lg">
              Visit Our Blog
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogHighlights;
