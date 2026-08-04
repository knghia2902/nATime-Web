import PublicShell from './PublicShell';
import Hero from '../sections/Hero';
import Features from '../sections/Features';
import Stats from '../sections/Stats';
import CTA from '../sections/CTA';

export default function HomeContent({ locale }: { locale: 'vi' | 'en' }) {
  return (
    <PublicShell locale={locale}>
      <Hero />
      <Features />
      <Stats />
      <CTA />
    </PublicShell>
  );
}
