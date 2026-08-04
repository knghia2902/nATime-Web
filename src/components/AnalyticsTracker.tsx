'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Không đếm cho các trang nội bộ Admin hoặc Portal
    if (!pathname || pathname.startsWith('/admin') || pathname.startsWith('/portal')) {
      return;
    }

    // Gọi POST /api/visits (Cloudflare Pages Function cùng domain) để tăng lượt xem
    // Dùng navigator.sendBeacon nếu có, fallback sang fetch
    const url = '/api/visits';
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url);
    } else {
      void fetch(url, { method: 'POST' }).catch(() => {});
    }
  }, [pathname]);

  return null;
}
