import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import SearchSection from '@/components/home/SearchSection';
import FeaturedBooks from '@/components/home/FeaturedBooks';
import BestSellers from '@/components/home/BestSellers';
import NewArrivals from '@/components/home/NewArrivals';
import TopAuthors from '@/components/home/TopAuthors';
import CategoryHighlights from '@/components/home/CategoryHighlights';
import PublisherBrands from '@/components/home/PublisherBrands';
import Testimonials from '@/components/home/Testimonials';
import BlogHighlights from '@/components/home/BlogHighlights';
import NewsletterSignup from '@/components/home/NewsletterSignup';
import CallToAction from '@/components/home/CallToAction';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <SearchSection />
        <FeaturedBooks />
        <BestSellers />
        <NewArrivals />
        <TopAuthors />
        <CategoryHighlights />
        <PublisherBrands />
        <Testimonials />
        <BlogHighlights />
        <NewsletterSignup />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
