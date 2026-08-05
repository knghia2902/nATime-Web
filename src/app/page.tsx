import PublicShell from '@/components/site/PublicShell';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Benefits from '@/components/sections/Benefits';
import CTA from '@/components/sections/CTA';
import { publicPageMetadata } from '@/lib/siteMetadata';

export const metadata = publicPageMetadata(
  'nATime - Nen tang van hanh nha may',
  'nATime hop nhat cham cong, kiem soat ra vao, tram can va quan ly tai san vao mot he thong duy nhat.',
  '/',
  'vi',
);

export default function Home() {
  return (
    <PublicShell locale="vi">
      <Hero />
      <Features />
      <Benefits />
      <CTA />
    </PublicShell>
  );
}
