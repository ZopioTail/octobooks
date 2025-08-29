import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import BestSellers from '@/components/home/BestSellers';
import NewArrivals from '@/components/home/NewArrivals';
import CategoryHighlights from '@/components/home/CategoryHighlights';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <BestSellers />
        <NewArrivals />
        <CategoryHighlights />
      </main>
      <Footer />
    </>
  );
}
