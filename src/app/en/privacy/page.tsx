import { PolicyContent } from '@/components/site/PublicPages';
import { publicPageMetadata } from '@/lib/siteMetadata';

export const metadata = publicPageMetadata(
  'Privacy policy',
  'How nATime handles data on the website, customer portal and Mobile connected to a self-hosted WebPortal.',
  '/privacy',
  'en',
);

export default function EnglishPrivacyPage() {
  return <PolicyContent locale="en" kind="privacy" />;
}
