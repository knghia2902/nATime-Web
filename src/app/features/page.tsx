import type { Metadata } from 'next';
import { FeaturesContent } from '@/components/site/PublicPages';

export const metadata: Metadata = {
  title: 'Tinh nang',
  description: 'Bon module, mot nguon du lieu van hanh duy nhat.',
  alternates: { canonical: '/features', languages: { vi: '/features', en: '/en/features' } },
};

export default function FeaturesPage() {
  return <FeaturesContent locale="vi" />;
}
