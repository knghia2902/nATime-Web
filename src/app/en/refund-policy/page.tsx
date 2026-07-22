import { PolicyContent } from '@/components/site/PublicPages';
import { publicPageMetadata } from '@/lib/siteMetadata';
export const metadata = publicPageMetadata('Refund policy', 'Conditions and process for nATime refund requests.', '/refund-policy', 'en');
export default function EnglishRefundPolicyPage() { return <PolicyContent locale="en" kind="refund" />; }
