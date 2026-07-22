import { PolicyContent } from '@/components/site/PublicPages';
import { publicPageMetadata } from '@/lib/siteMetadata';
export const metadata = publicPageMetadata('Điều khoản sử dụng', 'Điều khoản sử dụng website, phần mềm và dịch vụ nATime.', '/terms', 'vi');
export default function TermsPage() { return <PolicyContent locale="vi" kind="terms" />; }
