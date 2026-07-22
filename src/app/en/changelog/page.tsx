import { ChangelogContent } from '@/components/site/PublicPages';
import { publicPageMetadata } from '@/lib/siteMetadata';
export const metadata = publicPageMetadata('Changelog', 'Published nATime Windows release history.', '/changelog', 'en');
export default function EnglishChangelogPage() { return <ChangelogContent locale="en" />; }
