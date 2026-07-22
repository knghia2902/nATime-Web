import type { Metadata } from 'next';
import { ContactContent } from '@/components/site/PublicPages';
export const metadata: Metadata = { title: 'Liên hệ', description: 'Liên hệ nATime về sản phẩm, Enterprise hoặc hỗ trợ.', alternates: { canonical: '/contact', languages: { vi: '/contact', en: '/en/contact' } } };
export default function ContactPage() { return <ContactContent locale="vi" />; }
