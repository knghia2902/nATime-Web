import { AboutContent } from '@/components/site/PublicPages';
import { publicPageMetadata } from '@/lib/siteMetadata';
export const metadata = publicPageMetadata('About nATime', 'A concise introduction to nATime attendance software.', '/about', 'en');
export default function EnglishAboutPage() { return <AboutContent locale="en" />; }
