import PublicShell from '@/components/site/PublicShell';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Stats from '@/components/sections/Stats';
import CTA from '@/components/sections/CTA';
import { publicPageMetadata } from '@/lib/siteMetadata';

export const metadata = publicPageMetadata(
  'Phần mềm chấm công cho doanh nghiệp',
  'nATime giúp doanh nghiệp quản lý chấm công và thiết bị bằng bộ cài Windows self-host.',
  '/',
  'vi',
);

export default function Home() {
  return (
    <PublicShell locale="vi">
      <Hero />
      <Features />
      <Stats />
      <CTA />
    </PublicShell>
  );
}
