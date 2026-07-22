import HomeContent from '@/components/site/HomeContent';
import { publicPageMetadata } from '@/lib/siteMetadata';

export const metadata = publicPageMetadata(
  'Phần mềm chấm công cho doanh nghiệp',
  'nATime giúp doanh nghiệp quản lý chấm công và thiết bị bằng bộ cài Windows self-host.',
  '/',
  'vi',
);

export default function Home() {
  return <HomeContent locale="vi" />;
}
