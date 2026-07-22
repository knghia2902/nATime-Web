import HomeContent from '@/components/site/HomeContent';
import { publicPageMetadata } from '@/lib/siteMetadata';

export const metadata = publicPageMetadata('Windows attendance software for businesses', 'Manage attendance and devices with a Windows deployment and clear nATime licensing.', '/', 'en');

export default function EnglishHomePage() {
  return <HomeContent locale="en" />;
}
