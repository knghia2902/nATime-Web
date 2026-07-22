import type { Metadata } from 'next';
import { ChangelogContent } from '@/components/site/PublicPages';
export const metadata: Metadata = { title: 'Nhật ký thay đổi', description: 'Các phiên bản nATime đã được xác minh và phát hành.', alternates: { canonical: '/changelog', languages: { vi: '/changelog', en: '/en/changelog' } } };
export default function ChangelogPage() { return <ChangelogContent locale="vi" />; }
