'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Không theo dõi trang /admin hoặc /portal để không đếm nội bộ khi admin quản trị
    if (!pathname || pathname.startsWith('/admin') || pathname.startsWith('/portal')) {
      return;
    }

    // Gọi API Counter toàn cầu dành cho natime.vn ngay khi khách xem trang
    void fetch('https://api.counterapi.dev/v1/natime.vn/visits/up')
      .then((res) => res.json())
      .then(() => {
        // Đã tăng thành công 100%
      })
      .catch(() => {});
  }, [pathname]);

  return null;
}
