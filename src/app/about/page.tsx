import React from 'react';
import { BookOpen, Users, Award, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const AboutPage = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Vast Collection',
      description: 'Over 10,000 books across multiple genres and languages'
    },
    {
      icon: Users,
      title: 'Trusted Authors',
      description: 'Books from renowned authors and verified publishers'
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'Curated selection of high-quality books and publications'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Serving readers worldwide with fast and secure delivery'
    }
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Octobooks
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Your trusted online bookstore connecting readers with amazing books from around the world
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Our Story
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-6">
                <p>
                  Founded with a passion for books and reading, Octobooks began as a small initiative to make quality books accessible to everyone. Today, we've grown into a comprehensive online bookstore that serves thousands of readers, authors, and publishers worldwide.
                </p>
                <p>
                  Our mission is simple: to create a platform where book lovers can discover, purchase, and enjoy books while supporting authors and publishers in their literary journey. We believe that books have the power to transform lives, spark imagination, and build bridges between cultures.
                </p>
                <p>
                  At Octobooks, we're not just selling books – we're building a community of readers, writers, and publishers who share a common love for literature and learning.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Why Choose Octobooks?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
                <div className="text-gray-600 dark:text-gray-400">Books Available</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
                <div className="text-gray-600 dark:text-gray-400">Authors</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">50K+</div>
                <div className="text-gray-600 dark:text-gray-400">Happy Readers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2">100+</div>
                <div className="text-gray-600 dark:text-gray-400">Publishers</div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  📚 Quality First
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We carefully curate our collection to ensure every book meets our high standards of quality and relevance.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  🤝 Community Focused
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We believe in building strong relationships with our readers, authors, and publishers to create a thriving literary ecosystem.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  🚀 Innovation Driven
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We continuously innovate to provide the best online book shopping experience with modern technology and user-friendly design.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
