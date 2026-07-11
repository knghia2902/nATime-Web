'use client';

import { useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Apply root font-size of 12px for high information density in dashboard (1rem = 12px)
    document.documentElement.style.fontSize = '12px';
    return () => {
      // Revert to browser default 16px when leaving dashboard (1rem = 16px)
      document.documentElement.style.fontSize = '';
    };
  }, []);

  return <div className="min-h-screen bg-background">{children}</div>;
}
