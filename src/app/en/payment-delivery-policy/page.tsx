import { PolicyContent } from '@/components/site/PublicPages';
import { publicPageMetadata } from '@/lib/siteMetadata';
export const metadata = publicPageMetadata('Payment and delivery policy', 'How PayOS payments and nATime license delivery work.', '/payment-delivery-policy', 'en');
export default function EnglishPaymentPolicyPage() { return <PolicyContent locale="en" kind="payment" />; }
