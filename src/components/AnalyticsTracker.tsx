'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Không theo dõi trang /admin hoặc /portal nếu không muốn đếm nội bộ
    if (!pathname || pathname.startsWith('/admin') || pathname.startsWith('/portal')) {
      return;
    }

    const key = `natime_pv_${pathname}`;
    const now = Date.now();
    const lastVisit = sessionStorage.getItem(key);

    // Nếu đã đếm đường dẫn này trong vòng 10 phút trên cùng tab -> bỏ qua
    if (lastVisit && now - parseInt(lastVisit, 10) < 10 * 60 * 1000) {
      return;
    }

    sessionStorage.setItem(key, String(now));

    if (!supabase) return;

    // Ghi nhận lượt xem trang vào Supabase
    void supabase.from('page_views').insert({
      path: pathname,
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
    }).then(() => {
      // Log im lặng
    });
  }, [pathname]);

  return null;
}
