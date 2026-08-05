import type { Metadata } from 'next';
import BlogPage from '../../blog/page';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes from factory operations and nATime development.',
  alternates: { canonical: '/blog', languages: { vi: '/blog', en: '/en/blog' } },
};

export default function EnglishChangelogPage() {
  return <BlogPage />;
}
