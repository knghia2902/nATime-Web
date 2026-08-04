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

    const cbName = `__natime_pv_up_${Math.random().toString(36).substring(2, 9)}`;

    // Tạo hàm callback toàn cục tạm thời cho JSONP
    (window as unknown as Record<string, () => void>)[cbName] = () => {
      try {
        delete (window as unknown as Record<string, unknown>)[cbName];
      } catch {
        // ignore
      }
    };

    // Dùng JSONP Script tag để vượt qua 100% rào cản CORS trên mọi trình duyệt
    const script = document.createElement('script');
    script.src = `https://api.counterapi.dev/v1/natime.vn/visits/up?callback=${cbName}`;
    script.async = true;
    script.onload = () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
    script.onerror = () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };

    document.body.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
      try {
        delete (window as unknown as Record<string, unknown>)[cbName];
      } catch {
        // ignore
      }
    };
  }, [pathname]);

  return null;
}
