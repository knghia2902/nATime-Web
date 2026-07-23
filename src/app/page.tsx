import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Stats from '@/components/sections/Stats';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/Footer';
import { publicPageMetadata } from '@/lib/siteMetadata';

export const metadata = publicPageMetadata(
  'Phần mềm chấm công cho doanh nghiệp',
  'nATime giúp doanh nghiệp quản lý chấm công và thiết bị bằng bộ cài Windows self-host.',
  '/',
  'vi',
);

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
