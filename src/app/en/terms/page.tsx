import { PolicyContent } from '@/components/site/PublicPages';
import { publicPageMetadata } from '@/lib/siteMetadata';
export const metadata = publicPageMetadata('Terms of use', 'Terms for the nATime website, software and services.', '/terms', 'en');
export default function EnglishTermsPage() { return <PolicyContent locale="en" kind="terms" />; }
