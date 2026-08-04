'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
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

    const client = supabase;
    if (!client) return;

    // Ghi nhận trực tiếp vào Supabase qua RPC chính chủ hoặc Insert
    void client.rpc('log_site_visit', { p_path: pathname }).then(({ error }) => {
      if (error) {
        // Fallback insert trực tiếp nếu hàm RPC chưa được tạo
        void client.from('page_views').insert({ path: pathname });
      }
    });
  }, [pathname]);

  return null;
}
