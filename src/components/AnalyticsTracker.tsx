'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin') || pathname.startsWith('/portal')) {
      return;
    }

    const key = `natime_pv_${pathname}`;
    const now = Date.now();
    const lastVisit = sessionStorage.getItem(key);

    // Giới hạn 2 phút mỗi lượt đếm lại cho cùng 1 tab để test tăng nhanh
    if (lastVisit && now - parseInt(lastVisit, 10) < 2 * 60 * 1000) {
      return;
    }

    sessionStorage.setItem(key, String(now));

    // Gọi API Route Handler nội bộ
    void fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: pathname })
    }).catch(() => {});
  }, [pathname]);

  return null;
}
