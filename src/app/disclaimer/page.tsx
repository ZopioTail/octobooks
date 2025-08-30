import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const DisclaimerPage = () => {
  return (
    <>
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Disclaimer
            </h1>
            
            <div className="text-gray-700 dark:text-gray-300 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  General Information
                </h2>
                <p>
                  The information contained on Octobooks website is for general information purposes only. While we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  No Professional Advice
                </h2>
                <p>
                  The content on Octobooks is not intended to be a substitute for professional advice. All content, including text, graphics, images, and information available on or through Octobooks is for general informational purposes only.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  External Links
                </h2>
                <p>
                  Through this website you are able to link to other websites which are not under the control of Octobooks. We have no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Book Content
                </h2>
                <p>
                  Octobooks acts as a platform for authors and publishers to sell their books. We do not endorse or guarantee the accuracy, completeness, or usefulness of any book content. The views and opinions expressed in the books are those of the authors and do not necessarily reflect the official policy or position of Octobooks.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Pricing and Availability
                </h2>
                <p>
                  All prices shown on Octobooks are subject to change without notice. While we strive to provide accurate pricing information, typographical errors may occur. We reserve the right to correct any errors, inaccuracies or omissions and to change or update information at any time without prior notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Limitation of Liability
                </h2>
                <p>
                  In no event will Octobooks be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Intellectual Property
                </h2>
                <p>
                  All books and content available on Octobooks are protected by copyright and other intellectual property laws. The books may not be copied, reproduced, distributed, or used in any way without the express written permission of the copyright holder.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Changes to Disclaimer
                </h2>
                <p>
                  We may update this Disclaimer from time to time. We will notify you of any changes by posting the new Disclaimer on this page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Contact Information
                </h2>
                <p>
                  If you have any questions about this Disclaimer, please contact us at support@octobooks.com.
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

export default DisclaimerPage;