import { PolicyContent } from '@/components/site/PublicPages';
import { publicPageMetadata } from '@/lib/siteMetadata';
export const metadata = publicPageMetadata('Chính sách hoàn tiền', 'Điều kiện và quy trình tiếp nhận yêu cầu hoàn tiền nATime.', '/refund-policy', 'vi');
export default function RefundPolicyPage() { return <PolicyContent locale="vi" kind="refund" />; }
