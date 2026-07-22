import { PolicyContent } from '@/components/site/PublicPages';
import { publicPageMetadata } from '@/lib/siteMetadata';

export const metadata = publicPageMetadata(
  'Chính sách quyền riêng tư',
  'Cách nATime xử lý dữ liệu trên website, cổng khách hàng và Mobile kết nối WebPortal self-host.',
  '/privacy',
  'vi',
);

export default function PrivacyPage() {
  return <PolicyContent locale="vi" kind="privacy" />;
}
