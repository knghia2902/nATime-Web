import type { Metadata } from 'next';
import { AboutContent } from '@/components/site/PublicPages';
export const metadata: Metadata = { title: 'Giới thiệu', description: 'Giới thiệu ngắn về sản phẩm nATime.', alternates: { canonical: '/about', languages: { vi: '/about', en: '/en/about' } } };
export default function AboutPage() { return <AboutContent locale="vi" />; }
