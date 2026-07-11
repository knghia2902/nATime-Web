import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Stats from '@/components/sections/Stats';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full">
        <Hero />
        <Features />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
