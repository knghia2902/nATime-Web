import type { Metadata } from 'next';
import BlogPage from '../blog/page';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Ghi chép từ hiện trường vận hành và phát triển nATime.',
  alternates: { canonical: '/blog', languages: { vi: '/blog', en: '/en/blog' } },
};

export default function ChangelogPage() {
  return <BlogPage />;
}
