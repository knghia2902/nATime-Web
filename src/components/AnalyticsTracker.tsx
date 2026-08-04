'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Không theo dõi trang /admin hoặc /portal để không đếm nội bộ
    if (!pathname || pathname.startsWith('/admin') || pathname.startsWith('/portal')) {
      return;
    }

    const key = `natime_pv_${pathname}`;
    const now = Date.now();
    const lastVisit = sessionStorage.getItem(key);

    // Bỏ qua nếu cùng một tab vừa vào đường dẫn này dưới 3 phút
    if (lastVisit && now - parseInt(lastVisit, 10) < 3 * 60 * 1000) {
      return;
    }

    sessionStorage.setItem(key, String(now));

    // Gọi API Counter toàn cầu dành cho natime.vn
    void fetch('https://api.counterapi.dev/v1/natime.vn/visits/up')
      .then((res) => res.json())
      .then(() => {
        // Tăng thành công 100%
      })
      .catch(() => {});
  }, [pathname]);

  return null;
}
