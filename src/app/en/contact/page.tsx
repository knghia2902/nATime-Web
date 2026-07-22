import { ContactContent } from '@/components/site/PublicPages';
import { publicPageMetadata } from '@/lib/siteMetadata';
export const metadata = publicPageMetadata('Contact', 'Contact nATime about the product, support or Enterprise requirements.', '/contact', 'en');
export default function EnglishContactPage() { return <ContactContent locale="en" />; }
