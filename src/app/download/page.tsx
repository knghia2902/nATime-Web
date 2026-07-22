import type { Metadata } from 'next';
import { DownloadContent } from '@/components/site/PublicPages';
export const metadata: Metadata = { title: 'Tải xuống', description: 'Tải bộ cài nATime cho Windows đã được xác minh.', alternates: { canonical: '/download', languages: { vi: '/download', en: '/en/download' } } };
export default function DownloadPage() { return <DownloadContent locale="vi" />; }
