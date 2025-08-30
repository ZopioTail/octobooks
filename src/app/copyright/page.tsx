import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const CopyrightPage = () => {
  return (
    <>
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Copyright Policy
            </h1>
            
            <div className="text-gray-700 dark:text-gray-300 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Intellectual Property Rights
                </h2>
                <p>
                  All content on Octobooks, including but not limited to text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the property of Octobooks or its content suppliers and is protected by international copyright laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Book Copyrights
                </h2>
                <p>
                  All books available on Octobooks are protected by copyright and are the intellectual property of their respective authors and publishers. The copyright of each book belongs to the author or publisher as indicated in the book's publication details.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Permitted Use
                </h2>
                <p>
                  You may use our site for lawful purposes only. You may not use our site:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>In any way that breaches any applicable local, national or international law or regulation</li>
                  <li>In any way that is unlawful or fraudulent</li>
                  <li>To send, knowingly receive, upload, download, use or re-use any material which does not comply with our content standards</li>
                  <li>To transmit any unsolicited or unauthorized advertising or promotional material</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Copyright Infringement
                </h2>
                <p>
                  Octobooks respects the intellectual property rights of others. If you believe that any content on our website infringes your copyright, please contact us immediately with the following information:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>A description of the copyrighted work that you claim has been infringed</li>
                  <li>The exact URL where the infringing material is located</li>
                  <li>Your contact information including address, telephone number, and email</li>
                  <li>A statement that you have a good faith belief that the use is not authorized by the copyright owner</li>
                  <li>A statement, under penalty of perjury, that the information in your notice is accurate</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Digital Rights Management
                </h2>
                <p>
                  Some books on Octobooks may be protected by Digital Rights Management (DRM) technology. This technology is used to protect the intellectual property of authors and publishers by preventing unauthorized redistribution of digital content.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  User-Generated Content
                </h2>
                <p>
                  By submitting content to Octobooks (including reviews, comments, and ratings), you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Trademarks
                </h2>
                <p>
                  All trademarks, service marks, trade names, logos, and other branding elements displayed on Octobooks are the property of their respective owners. Use of any Octobooks trademarks without our prior written consent is strictly prohibited.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  License to Use Website
                </h2>
                <p>
                  You may view, download for caching purposes only, and print pages from the website for your own personal use, subject to the restrictions set out in this policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Reporting Copyright Violations
                </h2>
                <p>
                  If you believe your work has been copied in a way that constitutes copyright infringement, please contact our Copyright Agent at:
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="font-medium">Copyright Agent</p>
                  <p>Octobooks Copyright Department</p>
                  <p>Email: copyright@octobooks.com</p>
                  <p>Phone: +91 98765 43210</p>
                </div>
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

export default CopyrightPage;