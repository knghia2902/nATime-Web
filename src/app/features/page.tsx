import type { Metadata } from 'next';
import { FeaturesContent } from '@/components/site/PublicPages';
export const metadata: Metadata = { title: 'Tính năng', description: 'Các tính năng nATime đang được phát hành.', alternates: { canonical: '/features', languages: { vi: '/features', en: '/en/features' } } };
export default function FeaturesPage() { return <FeaturesContent locale="vi" />; }
