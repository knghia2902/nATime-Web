import { PolicyContent } from '@/components/site/PublicPages';
import { publicPageMetadata } from '@/lib/siteMetadata';
export const metadata = publicPageMetadata('Chính sách thanh toán và giao nhận', 'Quy trình thanh toán PayOS và cấp quyền sử dụng nATime.', '/payment-delivery-policy', 'vi');
export default function PaymentPolicyPage() { return <PolicyContent locale="vi" kind="payment" />; }
