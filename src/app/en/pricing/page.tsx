import { PricingContent } from '@/components/site/PublicPages';
import { publicPageMetadata } from '@/lib/siteMetadata';
export const metadata = publicPageMetadata('Pricing', 'Current nATime plans, limits and licensed modules.', '/pricing', 'en');
export default function EnglishPricingPage() { return <PricingContent locale="en" />; }
