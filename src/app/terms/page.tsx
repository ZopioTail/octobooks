'use client';

import React from 'react';
import { FileText, Shield, Users, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const TermsPage = () => {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-block p-4 bg-white/10 rounded-full mb-6">
              <FileText className="h-12 w-12" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Terms & Conditions
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Please read these terms and conditions carefully before using our services
            </p>
            <p className="text-sm text-gray-400 mt-4">
              Last updated: August 29, 2024
            </p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              
              <Card className="mb-8">
                <CardHeader>
                  <h2 className="text-2xl font-bold flex items-center">
                    <Users className="h-6 w-6 mr-3" />
                    1. Acceptance of Terms
                  </h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    By accessing and using Octobooks (&quot;the Service&quot;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                  <p>
                    These terms apply to all visitors, users, and others who access or use the service, including authors, publishers, and customers.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <h2 className="text-2xl font-bold flex items-center">
                    <Shield className="h-6 w-6 mr-3" />
                    2. User Accounts
                  </h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    <strong>Account Creation:</strong> You must create an account to access certain features of our service. You are responsible for maintaining the confidentiality of your account credentials.
                  </p>
                  <p>
                    <strong>Account Types:</strong> We offer different account types including Customer, Author, Publisher, and Admin accounts, each with specific privileges and responsibilities.
                  </p>
                  <p>
                    <strong>Account Security:</strong> You are responsible for all activities that occur under your account. Notify us immediately of any unauthorized use.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <h2 className="text-2xl font-bold flex items-center">
                    <CreditCard className="h-6 w-6 mr-3" />
                    3. Purchases and Payments
                  </h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    <strong>Pricing:</strong> All prices are listed in Indian Rupees (INR) and include applicable taxes unless otherwise stated.
                  </p>
                  <p>
                    <strong>Payment Methods:</strong> We accept various payment methods including credit/debit cards, UPI, net banking, digital wallets, and cash on delivery.
                  </p>
                  <p>
                    <strong>Order Confirmation:</strong> Your order is confirmed only after successful payment processing and inventory verification.
                  </p>
                  <p>
                    <strong>Cancellation:</strong> Orders can be cancelled before shipping. Refunds will be processed according to our refund policy.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <h2 className="text-2xl font-bold">4. Content and Intellectual Property</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    <strong>Book Content:</strong> All books and digital content are protected by copyright laws. Unauthorized reproduction or distribution is prohibited.
                  </p>
                  <p>
                    <strong>User Content:</strong> Reviews, comments, and other user-generated content remain your property but grant us license to use for service improvement.
                  </p>
                  <p>
                    <strong>Platform Content:</strong> Our website design, features, and proprietary content are protected by intellectual property laws.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <h2 className="text-2xl font-bold">5. Author and Publisher Terms</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    <strong>Content Submission:</strong> Authors and publishers are responsible for ensuring they have rights to submit content.
                  </p>
                  <p>
                    <strong>Royalties:</strong> Royalty rates and payment schedules are defined in separate publisher/author agreements.
                  </p>
                  <p>
                    <strong>Content Standards:</strong> All submitted content must meet our quality and content guidelines.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <h2 className="text-2xl font-bold">6. Prohibited Uses</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>You may not use our service:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                    <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                    <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                    <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                    <li>To submit false or misleading information</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <h2 className="text-2xl font-bold">7. Limitation of Liability</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Octobooks shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                  </p>
                  <p>
                    Our total liability to you for all claims arising from or relating to the service shall not exceed the amount you paid us in the twelve months preceding the claim.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <h2 className="text-2xl font-bold">8. Privacy Policy</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices.
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <h2 className="text-2xl font-bold">9. Changes to Terms</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    We reserve the right to modify these terms at any time. We will notify users of significant changes via email or through our website.
                  </p>
                  <p>
                    Continued use of the service after changes constitutes acceptance of the new terms.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h2 className="text-2xl font-bold">10. Contact Information</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    If you have any questions about these Terms & Conditions, please contact us:
                  </p>
                  <ul className="list-none space-y-2">
                    <li>📧 Email: legal@octobooks.com</li>
                    <li>📞 Phone: +91 98765 43210</li>
                    <li>📍 Address: 123 Book Street, Mumbai, Maharashtra 400001, India</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default TermsPage;
