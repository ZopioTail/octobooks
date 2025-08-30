'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Users, Award, Download, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-white/10 rounded-full mb-6">
            <BookOpen className="h-12 w-12" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Reading?
          </h2>
          <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto mb-8">
            Join thousands of readers who have discovered their next favorite book on Octobooks
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* For Readers */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">For Readers</h3>
            <p className="text-indigo-100 mb-6">
              Discover, purchase, and enjoy books from your favorite authors and explore new genres.
            </p>
            <Link href="/books">
              <Button variant="secondary" size="lg" className="w-full">
                Browse Books
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* For Authors */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">For Authors</h3>
            <p className="text-indigo-100 mb-6">
              Publish your books, reach global audiences, and build your author brand with our platform.
            </p>
            <Link href="/auth/signup?role=author">
              <Button variant="secondary" size="lg" className="w-full">
                Become an Author
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* For Publishers */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">For Publishers</h3>
            <p className="text-indigo-100 mb-6">
              Partner with us to distribute your catalog and connect with millions of readers worldwide.
            </p>
            <Link href="/auth/signup?role=publisher">
              <Button variant="secondary" size="lg" className="w-full">
                Partner with Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Main CTA */}
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-6">
              Start Your Reading Journey Today
            </h3>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Create your free account and get access to thousands of books, personalized recommendations, and exclusive member benefits.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/auth/signup">
                <Button variant="secondary" size="xl" className="min-w-[200px]">
                  Sign Up Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/books">
                <Button variant="outline" size="xl" className="min-w-[200px] border-white text-white hover:bg-white hover:text-purple-600">
                  Browse Books
                </Button>
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span className="text-indigo-100">Free Account</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span className="text-indigo-100">Fast Delivery</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span className="text-indigo-100">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Download App CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Take Octobooks Everywhere
          </h3>
          <p className="text-indigo-100 mb-8">
            Download our mobile app for the best reading experience on the go
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600">
              <Download className="mr-2 h-5 w-5" />
              Download for iOS
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600">
              <Download className="mr-2 h-5 w-5" />
              Download for Android
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
