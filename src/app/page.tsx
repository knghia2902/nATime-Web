import PublicShell from '@/components/site/PublicShell';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Benefits from '@/components/sections/Benefits';
import CTA from '@/components/sections/CTA';
import { publicPageMetadata } from '@/lib/siteMetadata';

export const metadata = publicPageMetadata(
  'nATime — Nền tảng Vận hành Nhà máy',
  'nATime hợp nhất chấm công, kiểm soát ra vào, trạm cân và quản lý tài sản vào một hệ thống duy nhất.',
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
