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

    // Gọi Supabase RPC để tăng lượt xem — cùng domain Supabase, CORS hoàn hảo
    if (supabase) {
      void supabase.rpc('increment_page_view').then(() => {}).then(() => {}, () => {});
    }
  }, [pathname]);

  return null;
}
