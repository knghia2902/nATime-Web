import type { Metadata } from 'next';
import { FeaturesContent } from '@/components/site/PublicPages';

export const metadata: Metadata = {
  title: 'Tính năng',
  description: 'Bốn module, một nguồn dữ liệu vận hành duy nhất.',
  alternates: { canonical: '/features', languages: { vi: '/features', en: '/en/features' } },
};

export default function FeaturesPage() {
  return <FeaturesContent locale="vi" />;
}
