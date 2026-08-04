import PublicShell from './PublicShell';
import Hero from '../sections/Hero';
import Features from '../sections/Features';
import Benefits from '../sections/Benefits';
import CTA from '../sections/CTA';

export default function HomeContent({ locale }: { locale: 'vi' | 'en' }) {
  return (
    <PublicShell locale={locale}>
      <Hero />
      <Features />
      <Benefits />
      <CTA />
    </PublicShell>
  );
}
