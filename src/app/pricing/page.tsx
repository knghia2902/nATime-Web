import type { Metadata } from 'next';
import { PricingContent } from '@/components/site/PublicPages';
export const metadata: Metadata = { title: 'Bảng giá', description: 'Gói Standard, Professional và Enterprise của nATime.', alternates: { canonical: '/pricing', languages: { vi: '/pricing', en: '/en/pricing' } } };
export default function PricingPage() { return <PricingContent locale="vi" />; }
