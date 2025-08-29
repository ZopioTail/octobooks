'use client';

import React from 'react';
import { MapPin, Clock, Users, Briefcase, Heart, Star } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const CareersPage = () => {
  const openPositions = [
    {
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Mumbai, India',
      type: 'Full-time',
      experience: '3-5 years',
      description: 'Join our engineering team to build the next generation of our e-commerce platform.'
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'Bangalore, India',
      type: 'Full-time',
      experience: '4-6 years',
      description: 'Lead product strategy and roadmap for our digital publishing platform.'
    },
    {
      title: 'Content Marketing Specialist',
      department: 'Marketing',
      location: 'Delhi, India',
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Create engaging content to connect with our community of book lovers.'
    },
    {
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Remote',
      type: 'Full-time',
      experience: '2-3 years',
      description: 'Help our authors and publishers succeed on our platform.'
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance and wellness programs'
    },
    {
      icon: Clock,
      title: 'Flexible Hours',
      description: 'Work-life balance with flexible working hours and remote options'
    },
    {
      icon: Star,
      title: 'Learning & Growth',
      description: 'Continuous learning opportunities and career development'
    },
    {
      icon: Users,
      title: 'Great Team',
      description: 'Work with passionate people who love books and technology'
    }
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Team
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto">
              Help us build the future of digital publishing and connect millions of readers with amazing books
            </p>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Why Work With Us?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Join a team that's passionate about books, technology, and making a difference in the world of publishing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Open Positions
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Find your next opportunity with us
              </p>
            </div>

            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <Card key={index} hover>
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {position.title}
                          </h3>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full dark:bg-blue-900/20 dark:text-blue-300">
                            {position.department}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-600 dark:text-gray-400 mb-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{position.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{position.type}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Briefcase className="h-4 w-4" />
                            <span>{position.experience}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 dark:text-gray-300">
                          {position.description}
                        </p>
                      </div>
                      
                      <div className="mt-6 lg:mt-0 lg:ml-8">
                        <Button variant="primary" size="lg">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Don't See Your Role?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              We're always looking for talented people to join our team. Send us your resume!
            </p>
            <Button variant="secondary" size="lg">
              Send Resume
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CareersPage;
