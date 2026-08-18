import type { Metadata } from 'next';
import { SupportContent } from '@/components/site/PublicPages';

export const metadata: Metadata = {
  title: 'Hỗ trợ & Tài liệu kỹ thuật',
  description: 'Trung tâm hỗ trợ kỹ thuật 24/7, hướng dẫn cài đặt và đăng ký tư vấn giải pháp nATime.',
  alternates: {
    canonical: '/support',
    languages: {
      vi: '/support',
      en: '/en/support',
    },
  },
};

export default function SupportPage() {
  return <SupportContent locale="vi" />;
}
