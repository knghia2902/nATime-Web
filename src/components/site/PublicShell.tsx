import type { ReactNode } from 'react';
import SiteFooter from './SiteFooter';
import SiteHeader from './SiteHeader';
import Ticker from './Ticker';

export default function PublicShell({ locale, children }: { locale: 'vi' | 'en'; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink font-body antialiased">
      <Ticker />
      <SiteHeader locale={locale} />
      <main>{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
