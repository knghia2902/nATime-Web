import { FeaturesContent } from '@/components/site/PublicPages';
import { publicPageMetadata } from '@/lib/siteMetadata';
export const metadata = publicPageMetadata('Features', 'Released nATime capabilities for attendance and device management.', '/features', 'en');
export default function EnglishFeaturesPage() { return <FeaturesContent locale="en" />; }
