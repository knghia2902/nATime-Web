import { DownloadContent } from '@/components/site/PublicPages';
import { publicPageMetadata } from '@/lib/siteMetadata';
export const metadata = publicPageMetadata('Windows download', 'Download verified and published nATime Windows installers.', '/download', 'en');
export default function EnglishDownloadPage() { return <DownloadContent locale="en" />; }
