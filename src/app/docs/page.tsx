import type { Metadata } from 'next';
import { DocsContent } from '@/components/site/PublicPages';
export const metadata: Metadata = { title: 'Tài liệu', description: 'Hướng dẫn cài đặt và kích hoạt nATime trên Windows.', alternates: { canonical: '/docs', languages: { vi: '/docs', en: '/en/docs' } } };
export default function DocsPage() { return <DocsContent locale="vi" />; }
