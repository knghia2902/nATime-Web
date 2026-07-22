import { DocsContent } from '@/components/site/PublicPages';
import { publicPageMetadata } from '@/lib/siteMetadata';
export const metadata = publicPageMetadata('Documentation', 'Verified nATime installation, activation and usage guidance.', '/docs', 'en');
export default function EnglishDocsPage() { return <DocsContent locale="en" />; }
