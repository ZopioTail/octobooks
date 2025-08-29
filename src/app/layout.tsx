import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Octobooks - Your Online Bookstore",
  description: "Discover, buy, and enjoy books from your favorite authors and publishers. Modern online bookstore with the best collection of books.",
  keywords: "books, online bookstore, fiction, non-fiction, educational books, authors, publishers",
  authors: [{ name: "Octobooks Team" }],
  openGraph: {
    title: "Octobooks - Your Online Bookstore",
    description: "Discover, buy, and enjoy books from your favorite authors and publishers.",
    url: "https://octobooks.com",
    siteName: "Octobooks",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Octobooks - Your Online Bookstore",
    description: "Discover, buy, and enjoy books from your favorite authors and publishers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-gray-900 dark:bg-gray-900 dark:text-white`}
      >
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              {children}
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
