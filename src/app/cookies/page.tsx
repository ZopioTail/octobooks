import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const CookiesPage = () => {
  return (
    <>
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Cookie Policy
            </h1>
            
            <div className="text-gray-700 dark:text-gray-300 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  What Are Cookies
                </h2>
                <p>
                  Like most websites, Octobooks uses cookies to improve your experience while you navigate through our website. Cookies are small text files that are placed on your computer or mobile device when you visit our site. They help us provide you with a better, faster, and safer experience.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  How We Use Cookies
                </h2>
                <p>We use cookies for several purposes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Essential cookies: Required for the operation of our website</li>
                  <li>Analytical cookies: Allow us to recognize and count visitors</li>
                  <li>Functionality cookies: Remember your preferences</li>
                  <li>Targeting cookies: Record your visit and pages you visit</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Types of Cookies We Use
                </h2>
                <h3 className="text-xl font-semibold mb-2">Strictly Necessary Cookies</h3>
                <p>These cookies are essential for you to browse the website and use its features.</p>

                <h3 className="text-xl font-semibold mb-2 mt-6">Performance Cookies</h3>
                <p>These cookies collect information about how visitors use our website.</p>

                <h3 className="text-xl font-semibold mb-2 mt-6">Functionality Cookies</h3>
                <p>These cookies allow the website to remember choices you make.</p>

                <h3 className="text-xl font-semibold mb-2 mt-6">Targeting Cookies</h3>
                <p>These cookies are used to deliver ads relevant to you.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Managing Cookies
                </h2>
                <p>
                  You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Changes to Our Cookie Policy
                </h2>
                <p>
                  We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Contact Us
                </h2>
                <p>
                  If you have any questions about our Cookie Policy, please contact us at support@octobooks.com.
                </p>
              </section>

              <div className="text-sm text-gray-500 dark:text-gray-400 mt-8">
                Last updated: August 30, 2024
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CookiesPage;