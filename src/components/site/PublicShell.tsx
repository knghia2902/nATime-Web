import type { ReactNode } from 'react';
import SiteFooter from './SiteFooter';
import SiteHeader from './SiteHeader';

export default function PublicShell({ locale, children }: { locale: 'vi' | 'en'; children: ReactNode }) {
  return <div className="min-h-screen bg-white text-slate-950"><SiteHeader locale={locale} /><main>{children}</main><SiteFooter locale={locale} /></div>;
}
