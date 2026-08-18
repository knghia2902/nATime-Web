import type { Metadata } from 'next';
import { SupportContent } from '@/components/site/PublicPages';

export const metadata: Metadata = {
  title: 'Support & Technical Documentation',
  description: '24/7 technical support, on-premise installation guides and consultation requests for nATime.',
  alternates: {
    canonical: '/support',
    languages: {
      vi: '/support',
      en: '/en/support',
    },
  },
};

export default function EnglishSupportPage() {
  return <SupportContent locale="en" />;
}
