import Link from 'next/link';
import type { ReactNode } from 'react';
import { CheckCircle, EnvelopeSimple } from '@phosphor-icons/react/dist/ssr';
import ContactForm from './ContactForm';
import MobilePreviewDownload from './MobilePreviewDownload';
import PublicShell from './PublicShell';
import ReleaseDownload from './ReleaseDownload';

type Locale = 'vi' | 'en';

/* ================================================================
   SHARED LAYOUT HELPERS
   ================================================================ */
function Intro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="border-b hairline bg-white/40 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-[12px] text-teal tracking-wide mb-4">{eyebrow}</p>
        <h1 className="font-display font-[800] text-[36px] md:text-[46px] leading-[1.1] text-ink max-w-2xl">{title}</h1>
        <p className="font-body text-[16px] text-ink/70 mt-5 max-w-xl leading-relaxed">{description}</p>
      </div>
    </section>
  );
}

/* ================================================================
   FEATURES PAGE
   ================================================================ */
export function FeaturesContent({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';

  const modules = [
    {
      num: '01',
      tag: vi ? '01 / CH\u1ea4M C\u00d4NG' : '01 / ATTENDANCE',
      title: vi ? 'T\u00ednh c\u00f4ng t\u1ef1 \u0111\u1ed9ng, kh\u00f4ng \u0111\u1ed1i so\u00e1t tay.' : 'Auto payroll, no manual reconciliation.',
      points: vi
        ? [
            'Ch\u1ea5m c\u00f4ng b\u1eb1ng v\u00e2n tay, khu\u00f4n m\u1eb7t ho\u1eb7c th\u1ebb t\u1eeb, \u0111\u1ed3ng b\u1ed9 \u0111a chi nh\u00e1nh.',
            'T\u1ef1 \u0111\u1ed9ng t\u00ednh gi\u1edd c\u00f4ng, t\u0103ng ca, \u0111i tr\u1ec5, ngh\u1ec9 ph\u00e9p theo quy ch\u1ebf ri\u00eang t\u1eebng nh\u00e0 m\u00e1y.',
            'Xu\u1ea5t b\u1ea3ng c\u00f4ng tr\u1ef1c ti\u1ebfp sang ph\u1ea7n m\u1ec1m l\u01b0\u01a1ng, kh\u00f4ng c\u1ea7n nh\u1eadp li\u1ec7u l\u1ea1i.',
          ]
        : [
            'Fingerprint, face, or card attendance with multi-branch sync.',
            'Auto-calculate hours, overtime, late arrivals per factory rules.',
            'Export payroll directly to salary software.',
          ],
      panel: (
        <div className="bg-graphite p-6">
          <p className="font-mono text-[11px] text-paper/50 mb-4">{vi ? 'B\u1ea2NG C\u00d4NG H\u00d4M NAY \u00b7 X\u01af\u1edcNG 2' : 'TODAY\'S SHEET \u00b7 WORKSHOP 2'}</p>
          <div className="space-y-2 font-mono text-[12px]">
            <div className="flex justify-between text-paper/70 border-b border-white/10 pb-2"><span>NV-0482 \u00b7 Tr\u1ea7n V\u0103n An</span><span className="text-teal">07:58 \u2192 \u2014</span></div>
            <div className="flex justify-between text-paper/70 border-b border-white/10 pb-2"><span>NV-0511 \u00b7 L\u00ea Th\u1ecb B\u00ecnh</span><span className="text-teal">07:52 \u2192 \u2014</span></div>
            <div className="flex justify-between text-paper/70 border-b border-white/10 pb-2"><span>NV-0398 \u00b7 Ph\u1ea1m Qu\u1ed1c C\u01b0\u1eddng</span><span className="text-amber">08:14 \u2192 \u0110i tr\u1ec5</span></div>
            <div className="flex justify-between text-paper/70"><span>NV-0627 \u00b7 Nguy\u1ec5n Th\u1ecb Dung</span><span className="text-teal">07:49 \u2192 \u2014</span></div>
          </div>
        </div>
      ),
    },
    {
      num: '02',
      tag: vi ? '02 / KI\u1ec2M SO\u00c1T RA V\u00c0O' : '02 / ACCESS CONTROL',
      title: vi ? 'Bi\u1ebft ch\u00ednh x\u00e1c ai \u0111ang \u1edf khu v\u1ef1c n\u00e0o, l\u00fac n\u00e0o.' : 'Know exactly who is where, when.',
      points: vi
        ? [
            'Ph\u00e2n quy\u1ec1n c\u1eeda v\u00e0 khu v\u1ef1c theo t\u1eebng nh\u00e2n s\u1ef1, nh\u00e0 th\u1ea7u ho\u1eb7c kh\u00e1ch.',
            'C\u1ea3nh b\u00e1o t\u1ee9c th\u1eddi khi c\u00f3 th\u1ebb h\u1ebft h\u1ea1n ho\u1eb7c truy c\u1eadp tr\u00e1i ph\u00e9p.',
            'Nh\u1eadt k\u00fd ra v\u00e0o l\u01b0u tr\u1eef \u0111\u1ea7y \u0111\u1ee7, tra c\u1ee9u theo ng\u01b0\u1eddi, c\u1eeda ho\u1eb7c th\u1eddi gian.',
          ]
        : [
            'Per-person, contractor, or guest door/zone permissions.',
            'Instant alerts for expired cards or unauthorized access.',
            'Full access logs searchable by person, door, or time.',
          ],
      panel: (
        <div className="bg-graphite p-6">
          <p className="font-mono text-[11px] text-paper/50 mb-4">{vi ? 'NH\u1eacT K\u00dd RA V\u00c0O \u00b7 C\u1ed4NG B' : 'ACCESS LOG \u00b7 GATE B'}</p>
          <div className="space-y-2 font-mono text-[12px]">
            <div className="flex justify-between text-paper/70 border-b border-white/10 pb-2"><span>07:58:47</span><span className="text-teal">{vi ? 'Nh\u00e0 th\u1ea7u #114 \u00b7 v\u00e0o' : 'Contractor #114 \u00b7 in'}</span></div>
            <div className="flex justify-between text-paper/70 border-b border-white/10 pb-2"><span>08:02:10</span><span className="text-teal">{vi ? 'NV-0482 \u00b7 v\u00e0o khu v\u1ef1c h\u1ea1n ch\u1ebf' : 'NV-0482 \u00b7 restricted zone'}</span></div>
            <div className="flex justify-between text-paper/70 border-b border-white/10 pb-2"><span>08:05:33</span><span className="text-amber">{vi ? 'Th\u1ebb kh\u00e1ch #002 \u00b7 t\u1eeb ch\u1ed1i \u2014 h\u1ebft h\u1ea1n' : 'Guest #002 \u00b7 denied \u2014 expired'}</span></div>
            <div className="flex justify-between text-paper/70"><span>08:09:02</span><span className="text-teal">{vi ? 'Nh\u00e0 th\u1ea7u #114 \u00b7 ra' : 'Contractor #114 \u00b7 out'}</span></div>
          </div>
        </div>
      ),
    },
    {
      num: '03',
      tag: vi ? '03 / TR\u1ea0M C\u00c2N' : '03 / WEIGHING STATION',
      title: vi ? 'M\u1ed7i phi\u1ebfu c\u00e2n \u0111\u1ec1u \u0111\u01b0\u1ee3c \u0111\u1ed1i chi\u1ebfu, kh\u00f4ng th\u1ec3 ch\u1ec9nh s\u1eeda sau.' : 'Every weigh slip is verified and immutable.',
      points: vi
        ? [
            'K\u1ebft n\u1ed1i tr\u1ef1c ti\u1ebfp \u0111\u1ea7u c\u00e2n \u0111i\u1ec7n t\u1eed, ghi nh\u1eadn kh\u1ed1i l\u01b0\u1ee3ng theo th\u1eddi gian th\u1ef1c.',
            'T\u1ef1 \u0111\u1ed9ng \u0111\u1ed1i chi\u1ebfu phi\u1ebfu c\u00e2n v\u1edbi \u0111\u01a1n h\u00e0ng v\u00e0 bi\u1ec3n s\u1ed1 xe.',
            'Ph\u00e1t hi\u1ec7n sai l\u1ec7ch kh\u1ed1i l\u01b0\u1ee3ng b\u1ea5t th\u01b0\u1eddng ngay t\u1ea1i c\u1ed5ng c\u00e2n.',
          ]
        : [
            'Direct connection to digital scales, real-time weight logging.',
            'Auto-match weigh slips to orders and plate numbers.',
            'Detect weight anomalies at the gate.',
          ],
      panel: (
        <div className="bg-graphite p-6">
          <p className="font-mono text-[11px] text-paper/50 mb-4">{vi ? 'PHI\u1ebEU C\u00c2N #20260804-118' : 'WEIGH SLIP #20260804-118'}</p>
          <div className="font-mono text-amber text-[36px] leading-none mb-1">18.420<span className="text-[16px] ml-1 text-amber/70">kg</span></div>
          <p className="font-mono text-[11px] text-paper/40 mb-5">Xe 51C-224.19 \u00b7 {vi ? '\u0110\u01a1n h\u00e0ng' : 'Order'} PO-4471</p>
          <div className="flex justify-between font-mono text-[12px] text-teal border-t border-white/10 pt-4">
            <span>{vi ? '\u0110\u1ed1i chi\u1ebfu \u0111\u01a1n h\u00e0ng' : 'Order match'}</span>
            <span>{vi ? 'Kh\u1edbp' : 'Match'}</span>
          </div>
        </div>
      ),
    },
    {
      num: '04',
      tag: vi ? '04 / QU\u1ea2N L\u00dd T\u00c0I S\u1ea2N' : '04 / ASSET MANAGEMENT',
      title: vi ? 'Theo d\u00f5i thi\u1ebft b\u1ecb t\u1eeb khi mua \u0111\u1ebfn khi thanh l\u00fd.' : 'Track equipment from purchase to disposal.',
      points: vi
        ? [
            'G\u1eafn m\u00e3 \u0111\u1ecbnh danh ri\u00eang cho t\u1eebng thi\u1ebft b\u1ecb, d\u1ec5 d\u00e0ng tra c\u1ee9u.',
            'L\u1ecbch b\u1ea3o tr\u00ec \u0111\u1ecbnh k\u1ef3, nh\u1eafc h\u1ea1n t\u1ef1 \u0111\u1ed9ng tr\u01b0\u1edbc khi thi\u1ebft b\u1ecb h\u1ecfng.',
            'Theo d\u00f5i kh\u1ea5u hao v\u00e0 v\u1ecb tr\u00ed thi\u1ebft b\u1ecb theo th\u1eddi gian th\u1ef1c.',
          ]
        : [
            'Unique ID per equipment for easy lookup.',
            'Scheduled maintenance with auto-reminders.',
            'Track depreciation and location in real-time.',
          ],
      panel: (
        <div className="bg-graphite p-6">
          <p className="font-mono text-[11px] text-paper/50 mb-4">{vi ? 'T\u00c0I S\u1ea2N \u00b7 X\u01af\u1edcNG 2' : 'ASSETS \u00b7 WORKSHOP 2'}</p>
          <div className="space-y-2 font-mono text-[12px]">
            <div className="flex justify-between text-paper/70 border-b border-white/10 pb-2"><span>FL-07 \u00b7 {vi ? 'Xe n\u00e2ng' : 'Forklift'}</span><span className="text-amber">{vi ? 'B\u1ea3o tr\u00ec c\u00f2n 3 ng\u00e0y' : 'Maint. in 3 days'}</span></div>
            <div className="flex justify-between text-paper/70 border-b border-white/10 pb-2"><span>CM-22 \u00b7 {vi ? 'M\u00e1y n\u00e9n kh\u00ed' : 'Air compressor'}</span><span className="text-teal">{vi ? 'Ho\u1ea1t \u0111\u1ed9ng' : 'Active'}</span></div>
            <div className="flex justify-between text-paper/70"><span>GT-03 \u00b7 {vi ? 'Xe n\u00e2ng tay' : 'Pallet jack'}</span><span className="text-teal">{vi ? 'Ho\u1ea1t \u0111\u1ed9ng' : 'Active'}</span></div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <PublicShell locale={locale}>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
        <p className="font-mono text-[12px] text-teal tracking-wide mb-4">{vi ? 'T\u00cdNH N\u0102NG' : 'FEATURES'}</p>
        <h1 className="font-display font-[800] text-[36px] md:text-[46px] leading-[1.1] text-ink max-w-2xl">
          {vi ? 'B\u1ed1n module, m\u1ed9t ngu\u1ed3n d\u1eef li\u1ec7u v\u1eadn h\u00e0nh duy nh\u1ea5t.' : 'Four modules, one source of operational truth.'}
        </h1>
        <p className="font-body text-[16px] text-ink/70 mt-5 max-w-xl leading-relaxed">
          {vi
            ? 'M\u1ed7i module ho\u1ea1t \u0111\u1ed9ng \u0111\u1ed9c l\u1eadp theo nhu c\u1ea7u c\u1ee7a t\u1eebng nh\u00e0 m\u00e1y, nh\u01b0ng chia s\u1ebb chung m\u1ed9t l\u1edbp d\u1eef li\u1ec7u \u2014 \u0111\u1ec3 b\u00e1o c\u00e1o, c\u1ea3nh b\u00e1o v\u00e0 \u0111\u1ed1i so\u00e1t lu\u00f4n kh\u1edbp nhau.'
            : 'Each module runs independently per factory needs, but shares a unified data layer for aligned reporting and alerts.'}
        </p>
      </section>

      {/* Modules */}
      {modules.map((mod, i) => {
        const reversed = i % 2 !== 0;
        return (
          <section key={mod.num} className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-12 items-center border-t hairline">
            <div className={reversed ? 'md:order-2' : ''}>
              <span className="font-mono text-[11px] text-teal">{mod.tag}</span>
              <h2 className="font-display font-bold text-[26px] text-ink mt-3 mb-4">{mod.title}</h2>
              <ul className="font-body text-[14px] text-ink/70 space-y-3">
                {mod.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="text-amber font-semibold">\u2192</span>{p}
                  </li>
                ))}
              </ul>
            </div>
            <div className={reversed ? 'md:order-1' : ''}>
              {mod.panel}
            </div>
          </section>
        );
      })}

      {/* Bottom CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center border-t hairline">
        <h2 className="font-display font-bold text-[28px] md:text-[34px] text-ink max-w-xl mx-auto mb-6">
          {vi ? 'Xem c\u1ea3 b\u1ed1n module ho\u1ea1t \u0111\u1ed9ng tr\u00ean d\u1eef li\u1ec7u th\u1eadt c\u1ee7a b\u1ea1n.' : 'See all four modules working on your real data.'}
        </h2>
        <Link href={vi ? '/contact' : '/en/contact'} className="inline-block bg-ink text-paper font-body text-[14px] font-medium px-7 py-3.5 hover:bg-graphite transition-colors">
          {vi ? 'Y\u00eau c\u1ea7u demo' : 'Request Demo'}
        </Link>
      </section>
    </PublicShell>
  );
}

/* ================================================================
   PRICING PAGE
   ================================================================ */
export function PricingContent({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';

  return (
    <PublicShell locale={locale}>
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14 text-center">
        <p className="font-mono text-[12px] text-teal tracking-wide mb-4">{vi ? 'B\u1ea2NG GI\u00c1' : 'PRICING'}</p>
        <h1 className="font-display font-[800] text-[36px] md:text-[46px] leading-[1.1] text-ink max-w-2xl mx-auto">
          {vi ? 'Ch\u1ecdn g\u00f3i theo quy m\u00f4 nh\u00e0 m\u00e1y c\u1ee7a b\u1ea1n.' : 'Choose a plan for your factory scale.'}
        </h1>
        <p className="font-body text-[16px] text-ink/70 mt-5 max-w-lg mx-auto leading-relaxed">
          {vi
            ? 'Gi\u00e1 t\u00ednh theo s\u1ed1 \u0111\u1ea7u \u0111\u1ecdc v\u00e0 s\u1ed1 nh\u00e2n s\u1ef1 qu\u1ea3n l\u00fd. Kh\u00f4ng ph\u00ed \u1ea9n, kh\u00f4ng r\u00e0ng bu\u1ed9c h\u1ee3p \u0111\u1ed3ng d\u00e0i h\u1ea1n.'
            : 'Priced by readers and managed employees. No hidden fees, no long-term lock-in.'}
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-px bg-ink/10">
        {/* Basic */}
        <div className="bg-paper p-8 flex flex-col">
          <p className="font-mono text-[11px] text-teal mb-2">{vi ? 'C\u01a0 B\u1ea2N' : 'BASIC'}</p>
          <h3 className="font-display font-bold text-[22px] text-ink mb-1">{vi ? 'M\u1ed9t module' : 'One module'}</h3>
          <p className="font-body text-[13px] text-ink/60 mb-6">{vi ? 'Cho nh\u00e0 m\u00e1y quy m\u00f4 nh\u1ecf, c\u1ea7n b\u1eaft \u0111\u1ea7u v\u1edbi m\u1ed9t \u0111i\u1ec3m ki\u1ec3m so\u00e1t.' : 'For small factories starting with one control point.'}</p>
          <p className="font-mono text-[34px] font-semibold text-ink mb-1">2.500.000<span className="text-[14px] text-ink/50">{vi ? '\u0111/th\u00e1ng' : '/mo'}</span></p>
          <p className="font-body text-[12px] text-ink/50 mb-8">{vi ? 't\u1ed1i \u0111a 200 nh\u00e2n s\u1ef1' : 'up to 200 employees'}</p>
          <ul className="font-body text-[13px] text-ink/70 space-y-2.5 mb-8 flex-1">
            <li className="flex gap-2"><span className="text-teal">\u2713</span>{vi ? 'Ch\u1ecdn 1 trong 4 module' : 'Choose 1 of 4 modules'}</li>
            <li className="flex gap-2"><span className="text-teal">\u2713</span>{vi ? 'B\u00e1o c\u00e1o c\u01a1 b\u1ea3n' : 'Basic reports'}</li>
            <li className="flex gap-2"><span className="text-teal">\u2713</span>{vi ? 'H\u1ed7 tr\u1ee3 trong gi\u1edd h\u00e0nh ch\u00ednh' : 'Business hours support'}</li>
          </ul>
          <Link href={vi ? '/contact' : '/en/contact'} className="text-center border hairline font-body text-[14px] font-medium px-6 py-3 hover:bg-white transition-colors">
            {vi ? 'B\u1eaft \u0111\u1ea7u d\u00f9ng th\u1eed' : 'Start Trial'}
          </Link>
        </div>

        {/* Enterprise - Featured */}
        <div className="bg-graphite p-8 flex flex-col border-2 border-amber -my-px md:-my-0">
          <p className="font-mono text-[11px] text-amber mb-2">{vi ? 'DOANH NGHI\u1ec6P \u00b7 PH\u1ed4 BI\u1ebEN NH\u1ea4T' : 'ENTERPRISE \u00b7 MOST POPULAR'}</p>
          <h3 className="font-display font-bold text-[22px] text-paper mb-1">{vi ? 'C\u1ea3 b\u1ed1n module' : 'All four modules'}</h3>
          <p className="font-body text-[13px] text-paper/60 mb-6">{vi ? 'Cho nh\u00e0 m\u00e1y v\u1eadn h\u00e0nh \u0111\u1ea7y \u0111\u1ee7: ng\u01b0\u1eddi, c\u1eeda, c\u00e2n v\u00e0 t\u00e0i s\u1ea3n.' : 'For full operations: people, doors, scales, and assets.'}</p>
          <p className="font-mono text-[34px] font-semibold text-paper mb-1">7.900.000<span className="text-[14px] text-paper/50">{vi ? '\u0111/th\u00e1ng' : '/mo'}</span></p>
          <p className="font-body text-[12px] text-paper/50 mb-8">{vi ? 't\u1ed1i \u0111a 1.000 nh\u00e2n s\u1ef1' : 'up to 1,000 employees'}</p>
          <ul className="font-body text-[13px] text-paper/80 space-y-2.5 mb-8 flex-1">
            <li className="flex gap-2"><span className="text-amber">\u2713</span>{vi ? 'To\u00e0n b\u1ed9 4 module, d\u1eef li\u1ec7u \u0111\u1ed3ng b\u1ed9' : 'All 4 modules, synced data'}</li>
            <li className="flex gap-2"><span className="text-amber">\u2713</span>{vi ? 'C\u1ea3nh b\u00e1o v\u00e0 \u0111\u1ed1i chi\u1ebfu t\u1ef1 \u0111\u1ed9ng' : 'Auto alerts and reconciliation'}</li>
            <li className="flex gap-2"><span className="text-amber">\u2713</span>{vi ? 'API t\u00edch h\u1ee3p ph\u1ea7n m\u1ec1m l\u01b0\u01a1ng / ERP' : 'Payroll / ERP API integration'}</li>
            <li className="flex gap-2"><span className="text-amber">\u2713</span>{vi ? 'H\u1ed7 tr\u1ee3 k\u1ef9 thu\u1eadt 24/7' : '24/7 technical support'}</li>
          </ul>
          <Link href={vi ? '/contact' : '/en/contact'} className="text-center bg-amber text-ink font-body text-[14px] font-semibold px-6 py-3 hover:bg-amber/90 transition-colors">
            {vi ? 'Y\u00eau c\u1ea7u demo' : 'Request Demo'}
          </Link>
        </div>

        {/* Custom */}
        <div className="bg-paper p-8 flex flex-col">
          <p className="font-mono text-[11px] text-teal mb-2">{vi ? 'T\u00d9Y CH\u1ec8NH' : 'CUSTOM'}</p>
          <h3 className="font-display font-bold text-[22px] text-ink mb-1">{vi ? '\u0110a chi nh\u00e1nh' : 'Multi-branch'}</h3>
          <p className="font-body text-[13px] text-ink/60 mb-6">{vi ? 'Cho t\u1eadp \u0111o\u00e0n nhi\u1ec1u nh\u00e0 m\u00e1y, c\u1ea7n tri\u1ec3n khai v\u00e0 h\u1ea1 t\u1ea7ng ri\u00eang.' : 'For multi-factory groups needing dedicated deployment.'}</p>
          <p className="font-mono text-[24px] font-semibold text-ink mb-1">{vi ? 'Li\u00ean h\u1ec7 b\u00e1o gi\u00e1' : 'Contact for quote'}</p>
          <p className="font-body text-[12px] text-ink/50 mb-8">{vi ? 'kh\u00f4ng gi\u1edbi h\u1ea1n nh\u00e2n s\u1ef1' : 'unlimited employees'}</p>
          <ul className="font-body text-[13px] text-ink/70 space-y-2.5 mb-8 flex-1">
            <li className="flex gap-2"><span className="text-teal">\u2713</span>{vi ? 'Tri\u1ec3n khai on-premise ho\u1eb7c private cloud' : 'On-premise or private cloud deployment'}</li>
            <li className="flex gap-2"><span className="text-teal">\u2713</span>{vi ? 'Qu\u1ea3n l\u00fd t\u1eadp trung nhi\u1ec1u chi nh\u00e1nh' : 'Centralized multi-branch management'}</li>
            <li className="flex gap-2"><span className="text-teal">\u2713</span>{vi ? '\u0110\u1ed9i ng\u0169 h\u1ed7 tr\u1ee3 tri\u1ec3n khai ri\u00eang' : 'Dedicated deployment team'}</li>
          </ul>
          <Link href={vi ? '/contact' : '/en/contact'} className="text-center border hairline font-body text-[14px] font-medium px-6 py-3 hover:bg-white transition-colors">
            {vi ? 'Li\u00ean h\u1ec7 t\u01b0 v\u1ea5n' : 'Contact Sales'}
          </Link>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-6xl mx-auto px-6 pb-20 border-t hairline pt-14">
        <h2 className="font-display font-bold text-[24px] text-ink mb-8">{vi ? 'So s\u00e1nh module theo t\u1eebng g\u00f3i' : 'Compare modules by plan'}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body text-[13px]">
            <thead>
              <tr className="border-b-2 border-ink/20">
                <th className="py-3 pr-4 text-ink/50 font-medium">Module</th>
                <th className="py-3 px-4 text-ink/50 font-medium text-center">{vi ? 'C\u01a1 b\u1ea3n' : 'Basic'}</th>
                <th className="py-3 px-4 text-ink/50 font-medium text-center">{vi ? 'Doanh nghi\u1ec7p' : 'Enterprise'}</th>
                <th className="py-3 px-4 text-ink/50 font-medium text-center">{vi ? 'T\u00f9y ch\u1ec9nh' : 'Custom'}</th>
              </tr>
            </thead>
            <tbody className="font-mono text-[13px]">
              {[
                [vi ? 'Ch\u1ea5m c\u00f4ng' : 'Attendance', vi ? 't\u00f9y ch\u1ecdn' : 'optional', '\u2713', '\u2713'],
                [vi ? 'Ki\u1ec3m so\u00e1t ra v\u00e0o' : 'Access Control', vi ? 't\u00f9y ch\u1ecdn' : 'optional', '\u2713', '\u2713'],
                [vi ? 'Tr\u1ea1m c\u00e2n' : 'Weighing', vi ? 't\u00f9y ch\u1ecdn' : 'optional', '\u2713', '\u2713'],
                [vi ? 'Qu\u1ea3n l\u00fd t\u00e0i s\u1ea3n' : 'Assets', vi ? 't\u00f9y ch\u1ecdn' : 'optional', '\u2713', '\u2713'],
                ['API / ERP', '\u2014', '\u2713', '\u2713'],
              ].map(([label, basic, ent, custom]) => (
                <tr key={label} className="border-b hairline">
                  <td className="py-3 pr-4 font-body">{label}</td>
                  <td className="text-center text-teal">{basic}</td>
                  <td className="text-center text-teal">{ent}</td>
                  <td className="text-center text-teal">{custom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PublicShell>
  );
}

/* ================================================================
   CONTACT PAGE
   ================================================================ */
export function ContactContent({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';

  return (
    <PublicShell locale={locale}>
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
        <p className="font-mono text-[12px] text-teal tracking-wide mb-4">{vi ? 'LI\u00caN H\u1ec6' : 'CONTACT'}</p>
        <h1 className="font-display font-[800] text-[36px] md:text-[46px] leading-[1.1] text-ink max-w-2xl">
          {vi ? 'N\u00f3i chuy\u1ec7n v\u1edbi \u0111\u1ed9i ng\u0169 tri\u1ec3n khai nATime.' : 'Talk to the nATime deployment team.'}
        </h1>
        <p className="font-body text-[16px] text-ink/70 mt-5 max-w-xl leading-relaxed">
          {vi
            ? '\u0110\u1ec3 l\u1ea1i th\u00f4ng tin, ch\u00fang t\u00f4i s\u1ebd li\u00ean h\u1ec7 trong v\u00f2ng 1 ng\u00e0y l\u00e0m vi\u1ec7c \u0111\u1ec3 s\u1eafp x\u1ebfp bu\u1ed5i demo tr\u00ean ch\u00ednh d\u1eef li\u1ec7u nh\u00e0 m\u00e1y c\u1ee7a b\u1ea1n.'
            : 'Leave your details, we will contact you within 1 business day to arrange a demo on your factory data.'}
        </p>
      </section>

      {/* Form + Info */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-[1.1fr_0.9fr] gap-12">
        {/* Form */}
        <form className="border hairline p-8 space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="font-body text-[13px] text-ink/60 block mb-1.5">{vi ? 'H\u1ecd v\u00e0 t\u00ean' : 'Full name'}</label>
              <input type="text" placeholder={vi ? 'Nguy\u1ec5n V\u0103n A' : 'John Doe'} className="w-full border hairline px-3.5 py-2.5 font-body text-[14px] bg-white" />
            </div>
            <div>
              <label className="font-body text-[13px] text-ink/60 block mb-1.5">{vi ? 'C\u00f4ng ty' : 'Company'}</label>
              <input type="text" placeholder={vi ? 'T\u00ean nh\u00e0 m\u00e1y / c\u00f4ng ty' : 'Factory / company name'} className="w-full border hairline px-3.5 py-2.5 font-body text-[14px] bg-white" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="font-body text-[13px] text-ink/60 block mb-1.5">{vi ? 'Email c\u00f4ng vi\u1ec7c' : 'Work email'}</label>
              <input type="email" placeholder={vi ? 'ban@congty.vn' : 'you@company.com'} className="w-full border hairline px-3.5 py-2.5 font-body text-[14px] bg-white" />
            </div>
            <div>
              <label className="font-body text-[13px] text-ink/60 block mb-1.5">{vi ? 'S\u1ed1 \u0111i\u1ec7n tho\u1ea1i' : 'Phone'}</label>
              <input type="text" placeholder="09xx xxx xxx" className="w-full border hairline px-3.5 py-2.5 font-body text-[14px] bg-white" />
            </div>
          </div>
          <div>
            <label className="font-body text-[13px] text-ink/60 block mb-1.5">{vi ? 'B\u1ea1n quan t\u00e2m module n\u00e0o?' : 'Which module interests you?'}</label>
            <select className="w-full border hairline px-3.5 py-2.5 font-body text-[14px] bg-white">
              <option>{vi ? 'C\u1ea3 b\u1ed1n module' : 'All four modules'}</option>
              <option>{vi ? 'Ch\u1ea5m c\u00f4ng' : 'Attendance'}</option>
              <option>{vi ? 'Ki\u1ec3m so\u00e1t ra v\u00e0o' : 'Access Control'}</option>
              <option>{vi ? 'Tr\u1ea1m c\u00e2n' : 'Weighing Station'}</option>
              <option>{vi ? 'Qu\u1ea3n l\u00fd t\u00e0i s\u1ea3n' : 'Asset Management'}</option>
            </select>
          </div>
          <div>
            <label className="font-body text-[13px] text-ink/60 block mb-1.5">{vi ? 'L\u1eddi nh\u1eafn' : 'Message'}</label>
            <textarea rows={4} placeholder={vi ? 'Cho ch\u00fang t\u00f4i bi\u1ebft quy m\u00f4 nh\u00e0 m\u00e1y v\u00e0 nhu c\u1ea7u c\u1ee5 th\u1ec3 c\u1ee7a b\u1ea1n' : 'Tell us about your factory scale and specific needs'} className="w-full border hairline px-3.5 py-2.5 font-body text-[14px] bg-white resize-none" />
          </div>
          <button type="submit" className="bg-ink text-paper font-body text-[14px] font-medium px-7 py-3 hover:bg-graphite transition-colors">
            {vi ? 'G\u1eedi y\u00eau c\u1ea7u' : 'Submit Request'}
          </button>
        </form>

        {/* Info */}
        <div className="space-y-6">
          <div className="bg-graphite text-paper p-6">
            <p className="font-mono text-[11px] text-paper/50 mb-4">{vi ? 'V\u0102N PH\u00d2NG' : 'OFFICE'}</p>
            <p className="font-body text-[14px] leading-relaxed mb-1">{vi ? 'Khu c\u00f4ng nghi\u1ec7p S\u00f3ng Th\u1ea7n, D\u0129 An' : 'Song Than Industrial Zone, Di An'}</p>
            <p className="font-body text-[14px] leading-relaxed mb-4">{vi ? 'B\u00ecnh D\u01b0\u01a1ng, Vi\u1ec7t Nam' : 'Binh Duong, Vietnam'}</p>
            <div className="border-t border-white/10 pt-4 space-y-2 font-mono text-[13px] text-paper/70">
              <div className="flex justify-between"><span>Hotline</span><span className="text-amber">1900 6868</span></div>
              <div className="flex justify-between"><span>Email</span><span className="text-amber">hotro@natime.vn</span></div>
              <div className="flex justify-between"><span>{vi ? 'Gi\u1edd h\u1ed7 tr\u1ee3' : 'Support hours'}</span><span className="text-teal">24/7</span></div>
            </div>
          </div>

          <div className="diag-corner border hairline p-6">
            <p className="font-mono text-[11px] text-ink/40 mb-4">{vi ? 'S\u01a0 \u0110\u1ed2 V\u1eca TR\u00cd' : 'LOCATION MAP'}</p>
            <div className="aspect-[4/3] bg-[repeating-linear-gradient(0deg,transparent,transparent_19px,rgba(18,24,31,0.08)_20px),repeating-linear-gradient(90deg,transparent,transparent_19px,rgba(18,24,31,0.08)_20px)] relative">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 mt-4 font-mono text-[10px] text-ink/50 whitespace-nowrap">nATime HQ</span>
            </div>
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="border-t hairline bg-white/40">
        <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-3 divide-x hairline">
          <div className="px-6 first:pl-0">
            <p className="font-mono text-[11px] text-teal mb-2">HOTLINE</p>
            <p className="font-body text-[14px] text-ink/70 leading-relaxed">
              {vi ? 'G\u1ecdi tr\u1ef1c ti\u1ebfp \u0111\u1ed9i h\u1ed7 tr\u1ee3 k\u1ef9 thu\u1eadt, ph\u1ea3n h\u1ed3i trong 5 ph\u00fat cho c\u00e1c s\u1ef1 c\u1ed1 kh\u1ea9n.' : 'Call technical support directly, 5-minute response for urgent issues.'}
            </p>
          </div>
          <div className="px-6">
            <p className="font-mono text-[11px] text-teal mb-2">EMAIL</p>
            <p className="font-body text-[14px] text-ink/70 leading-relaxed">
              {vi ? 'G\u1eedi y\u00eau c\u1ea7u chi ti\u1ebft, \u0111\u1ed9i tri\u1ec3n khai ph\u1ea3n h\u1ed3i trong v\u00f2ng 1 ng\u00e0y l\u00e0m vi\u1ec7c.' : 'Send detailed requests, deployment team responds within 1 business day.'}
            </p>
          </div>
          <div className="px-6">
            <p className="font-mono text-[11px] text-teal mb-2">{vi ? 'T\u1ea0I HI\u1ec6N TR\u01af\u1edcNG' : 'ON-SITE'}</p>
            <p className="font-body text-[14px] text-ink/70 leading-relaxed">
              {vi ? '\u0110\u1ed9i k\u1ef9 thu\u1eadt kh\u1ea3o s\u00e1t tr\u1ef1c ti\u1ebfp t\u1ea1i nh\u00e0 m\u00e1y tr\u01b0\u1edbc khi tri\u1ec3n khai ch\u00ednh th\u1ee9c.' : 'Technical team surveys your factory before official deployment.'}
            </p>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}

/* ================================================================
   REMAINING PAGES (unchanged business logic, updated shell)
   ================================================================ */
export function DownloadContent({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';
  const checks = vi
    ? [
        ['01', 'Authenticode Signature', 'B\u1ed9 c\u00e0i \u0111\u01b0\u1ee3c k\u00fd s\u1ed1 h\u1ee3p l\u1ec7 b\u1eb1ng ch\u1ee9ng th\u01b0 m\u00e3 ngu\u1ed3n.'],
        ['02', 'M\u00e3 b\u0103m SHA-256', 'M\u00e3 b\u0103m \u0111\u01b0\u1ee3c c\u00f4ng b\u1ed1 minh b\u1ea1ch c\u00f9ng m\u1ed7i b\u1ea3n ph\u00e1t h\u00e0nh.'],
        ['03', 'Verified Release', 'Ch\u1ec9 release \u0111\u00e3 x\u00e1c minh qua ki\u1ec3m th\u1eed m\u1edbi \u0111\u01b0\u1ee3c c\u00f4ng khai.'],
      ]
    : [
        ['01', 'Authenticode Signature', 'The installer has a valid digital code signature.'],
        ['02', 'SHA-256 Hash', 'The hash is published with every release.'],
        ['03', 'Verified Release', 'Only verified releases pass to publication.'],
      ];

  return (
    <PublicShell locale={locale}>
      <Intro eyebrow="Windows x64" title={vi ? 'T\u1ea3i b\u1ed9 c\u00e0i nATime \u0111\u00e3 x\u00e1c minh' : 'Download verified nATime installer'} description={vi ? 'B\u1ed9 c\u00e0i \u0111i qua v\u00f9ng c\u00e1ch ly v\u00e0 ki\u1ec3m tra ch\u1eef k\u00fd tr\u01b0\u1edbc khi \u0111\u01b0\u1ee3c c\u00f4ng khai.' : 'The installer passes quarantine and signature verification before publication.'} />
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <ReleaseDownload locale={locale} />
        <MobilePreviewDownload locale={locale} />
        <div className="mt-8 border hairline p-6">
          <h2 className="font-display font-bold text-ink">{vi ? 'L\u01b0u \u00fd tr\u01b0\u1edbc khi c\u00e0i \u0111\u1eb7t' : 'Before installation'}</h2>
          <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-ink/70">
            {checks.map(([num, title, text]) => (
              <li key={num} className="flex items-start gap-2">
                <span className="text-teal font-mono text-[11px] mt-0.5">{num}</span>
                <span><strong className="text-ink">{title}</strong> \u2014 {text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PublicShell>
  );
}

export function DocsContent({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';
  const steps = vi
    ? [
        ['1. T\u1ea3i b\u1ed9 c\u00e0i', 'T\u1ea3i phi\u00ean b\u1ea3n Windows \u0111ang \u0111\u01b0\u1ee3c ph\u00e1t h\u00e0nh t\u1ea1i trang T\u1ea3i xu\u1ed1ng v\u00e0 ki\u1ec3m tra SHA-256.'],
        ['2. C\u00e0i \u0111\u1eb7t', 'Ch\u1ea1y b\u1ed9 c\u00e0i b\u1eb1ng quy\u1ec1n Administrator v\u00e0 ch\u1edd ho\u00e0n t\u1ea5t c\u1ea5u h\u00ecnh d\u1ecbch v\u1ee5 nATime.'],
        ['3. M\u1edf h\u1ec7 th\u1ed1ng', 'Truy c\u1eadp \u0111\u1ecba ch\u1ec9 c\u1ee5c b\u1ed9 do b\u1ed9 c\u00e0i cung c\u1ea5p v\u00e0 \u0111\u0103ng nh\u1eadp t\u00e0i kho\u1ea3n qu\u1ea3n tr\u1ecb.'],
        ['4. K\u00edch ho\u1ea1t', 'M\u1edf C\u00e0i \u0111\u1eb7t, B\u1ea3n quy\u1ec1n, t\u1ea1o m\u00e3 li\u00ean k\u1ebft r\u1ed3i ph\u00ea duy\u1ec7t b\u1eb1ng t\u00e0i kho\u1ea3n t\u1ea1i C\u1ed5ng kh\u00e1ch h\u00e0ng.'],
        ['5. X\u00e1c minh', 'T\u1ea3i l\u1ea1i tr\u1ea1ng th\u00e1i b\u1ea3n quy\u1ec1n, ki\u1ec3m tra g\u00f3i, h\u1ea1n d\u00f9ng, Hardware ID v\u00e0 module \u0111\u01b0\u1ee3c c\u1ea5p ph\u00e9p.'],
      ]
    : [
        ['1. Download', 'Download the current Windows release and verify its SHA-256.'],
        ['2. Install', 'Run the installer with Administrator permissions and wait for service configuration.'],
        ['3. Open nATime', 'Open local address provided by installer and sign in to admin account.'],
        ['4. Activate', 'Open Settings, License, create a link code and approve it from customer portal.'],
        ['5. Verify', 'Reload license status and verify plan, expiry, Hardware ID and licensed modules.'],
      ];

  return (
    <PublicShell locale={locale}>
      <Intro eyebrow={vi ? 'T\u00c0I LI\u1ec6U' : 'DOCUMENTATION'} title={vi ? 'C\u00e0i \u0111\u1eb7t v\u00e0 k\u00edch ho\u1ea1t theo t\u1eebng b\u01b0\u1edbc' : 'Install and activate step by step'} description={vi ? 'Quy tr\u00ecnh d\u01b0\u1edbi \u0111\u00e2y b\u00e1m theo b\u1ed9 c\u00e0i Windows v\u00e0 h\u1ec7 th\u1ed1ng license \u0111ang ho\u1ea1t \u0111\u1ed9ng.' : 'This flow follows the current Windows installer and licensing system.'} />
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <div className="space-y-4">
          {steps.map(([title, text], index) => (
            <article key={title} className="grid grid-cols-[48px_1fr] gap-4 border hairline p-6">
              <span className="grid h-10 w-10 place-items-center bg-ink text-paper text-sm font-[800] font-mono">{index + 1}</span>
              <div>
                <h2 className="text-lg font-bold text-ink">{title.replace(/^\d+\.\s*/, '')}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}

export function AboutContent({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';
  return (
    <PublicShell locale={locale}>
      <Intro eyebrow={vi ? 'GI\u1edaI THI\u1ec6U' : 'ABOUT'} title={vi ? 'Ph\u1ea7n m\u1ec1m t\u1eadp trung v\u00e0o v\u1eadn h\u00e0nh th\u1ef1c t\u1ebf' : 'Software focused on real operations'} description={vi ? 'nATime \u0111\u01b0\u1ee3c ph\u00e1t tri\u1ec3n cho nhu c\u1ea7u ch\u1ea5m c\u00f4ng v\u00e0 qu\u1ea3n l\u00fd thi\u1ebft b\u1ecb c\u1ee7a doanh nghi\u1ec7p.' : 'nATime is built for business attendance and device management needs.'} />
      <section className="mx-auto grid max-w-4xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-2">
        <article className="border hairline p-8">
          <h2 className="text-xl font-bold text-ink">{vi ? 'Nguy\u00ean t\u1eafc s\u1ea3n ph\u1ea9m' : 'Product Principle'}</h2>
          <p className="mt-3 leading-relaxed text-ink/70">{vi ? 'Ch\u1ec9 c\u00f4ng b\u1ed1 t\u00ednh n\u0103ng \u0111\u00e3 \u0111\u01b0\u1ee3c ph\u00ea duy\u1ec7t, ki\u1ec3m th\u1eed v\u00e0 c\u00f3 c\u01a1 ch\u1ebf c\u1ea5p ph\u00e9p r\u00f5 r\u00e0ng.' : 'Only approved, tested capabilities with clear licensing are published.'}</p>
        </article>
        <article className="border hairline p-8">
          <h2 className="text-xl font-bold text-ink">{vi ? 'M\u00f4 h\u00ecnh tri\u1ec3n khai' : 'Deployment Model'}</h2>
          <p className="mt-3 leading-relaxed text-ink/70">{vi ? '\u1ee8ng d\u1ee5ng \u0111\u01b0\u1ee3c c\u00e0i tr\u00ean Windows c\u1ee7a kh\u00e1ch h\u00e0ng; t\u00e0i kho\u1ea3n natime.vn d\u00f9ng \u0111\u1ec3 mua v\u00e0 qu\u1ea3n l\u00fd b\u1ea3n quy\u1ec1n.' : 'The application is installed on customer Windows machine; natime.vn account manages licenses.'}</p>
        </article>
      </section>
    </PublicShell>
  );
}

export function ChangelogContent({ locale }: { locale: Locale }) {
  const vi = locale === 'vi';
  return (
    <PublicShell locale={locale}>
      <Intro eyebrow={vi ? 'NH\u1eacT K\u00dd THAY \u0110\u1ed4I' : 'CHANGELOG'} title={vi ? 'C\u00e1c phi\u00ean b\u1ea3n \u0111\u00e3 ph\u00e1t h\u00e0nh' : 'Published releases'} description={vi ? 'Danh s\u00e1ch ch\u1ec9 l\u1ea5y t\u1eeb nh\u1eefng release Windows \u0111\u00e3 \u0111\u01b0\u1ee3c x\u00e1c minh v\u00e0 c\u00f4ng khai.' : 'This list contains verified and published Windows releases.'} />
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <ReleaseDownload locale={locale} changelog />
      </section>
    </PublicShell>
  );
}

export type PolicyKind = 'privacy' | 'terms' | 'payment' | 'refund';
export function PolicyContent({ locale, kind }: { locale: Locale; kind: PolicyKind }) {
  const vi = locale === 'vi';
  const policyContent = {
    privacy: {
      title: vi ? 'Ch\u00ednh s\u00e1ch quy\u1ec1n ri\u00eang t\u01b0' : 'Privacy policy',
      lead: vi ? 'C\u00e1ch nATime x\u1eed l\u00fd d\u1eef li\u1ec7u t\u00e0i kho\u1ea3n v\u00e0 b\u1ea3n quy\u1ec1n.' : 'How nATime handles account and licensing data.',
      sections: vi
        ? [
            ['D\u1eef li\u1ec7u thu th\u1eadp', 'Th\u00f4ng tin t\u00e0i kho\u1ea3n, \u0111\u01a1n v\u1ecb, \u0111\u01a1n h\u00e0ng, tr\u1ea1ng th\u00e1i license, Hardware ID d\u1ea1ng b\u0103m v\u00e0 d\u1eef li\u1ec7u k\u1ef9 thu\u1eadt c\u1ea7n thi\u1ebft \u0111\u1ec3 v\u1eadn h\u00e0nh d\u1ecbch v\u1ee5.'],
            ['M\u1ee5c \u0111\u00edch s\u1eed d\u1ee5ng', 'X\u00e1c th\u1ef1c, thanh to\u00e1n, c\u1ea5p ph\u00e9p, h\u1ed7 tr\u1ee3 v\u00e0 b\u1ea3o v\u1ec7 h\u1ec7 th\u1ed1ng.'],
            ['Li\u00ean h\u1ec7', 'Y\u00eau c\u1ea7u v\u1ec1 d\u1eef li\u1ec7u c\u00e1 nh\u00e2n \u0111\u01b0\u1ee3c g\u1eedi t\u1edbi support@natime.vn.'],
          ]
        : [
            ['Data collected', 'Account, company, order, license status, hashed Hardware ID and technical data required to operate the service.'],
            ['Use', 'Authentication, payment, licensing, support and system protection.'],
            ['Contact', 'Privacy requests can be sent to support@natime.vn.'],
          ],
    },
    terms: {
      title: vi ? '\u0110i\u1ec1u kho\u1ea3n s\u1eed d\u1ee5ng' : 'Terms of use',
      lead: vi ? '\u0110i\u1ec1u ki\u1ec7n s\u1eed d\u1ee5ng website, t\u00e0i kho\u1ea3n v\u00e0 license nATime.' : 'Conditions for using nATime website, account and licenses.',
      sections: vi
        ? [
            ['T\u00e0i kho\u1ea3n', 'Ng\u01b0\u1eddi d\u00f9ng ch\u1ecbu tr\u00e1ch nhi\u1ec7m b\u1ea3o v\u1ec7 th\u00f4ng tin \u0111\u0103ng nh\u1eadp v\u00e0 cung c\u1ea5p th\u00f4ng tin ch\u00ednh x\u00e1c.'],
            ['License', 'Quy\u1ec1n s\u1eed d\u1ee5ng ph\u1ee5 thu\u1ed9c g\u00f3i, th\u1eddi h\u1ea1n, module v\u00e0 s\u1ed1 thi\u1ebft b\u1ecb \u0111\u01b0\u1ee3c c\u1ea5p.'],
            ['Gi\u1edbi h\u1ea1n', 'C\u00e1c n\u1ed9i dung ch\u01b0a \u0111\u01b0\u1ee3c x\u00e1c nh\u1eadn b\u1eb1ng h\u1ee3p \u0111\u1ed3ng ho\u1eb7c b\u00e1o gi\u00e1 kh\u00f4ng t\u1ea1o th\u00e0nh cam k\u1ebft d\u1ecbch v\u1ee5 ri\u00eang.'],
          ]
        : [
            ['Account', 'Users are responsible for protecting credentials.'],
            ['License', 'Usage rights depend on purchased plan.'],
            ['Limitations', 'Content not confirmed in contract does not create separate service commitment.'],
          ],
    },
    payment: {
      title: vi ? 'Ch\u00ednh s\u00e1ch thanh to\u00e1n v\u00e0 giao nh\u1eadn s\u1ed1' : 'Payment and digital delivery policy',
      lead: vi ? 'Quy tr\u00ecnh thanh to\u00e1n PayOS v\u00e0 c\u1ea5p quy\u1ec1n s\u1eed d\u1ee5ng ph\u1ea7n m\u1ec1m.' : 'PayOS payment and digital software delivery flow.',
      sections: vi
        ? [
            ['Thanh to\u00e1n', 'Standard v\u00e0 Professional \u0111\u01b0\u1ee3c thanh to\u00e1n qua li\u00ean k\u1ebft PayOS.'],
            ['Giao nh\u1eadn', 'Sau khi x\u00e1c nh\u1eadn, entitlement \u0111\u01b0\u1ee3c c\u1eadp nh\u1eadt trong C\u1ed5ng kh\u00e1ch h\u00e0ng.'],
            ['H\u00f3a \u0111\u01a1n', 'Website ghi nh\u1eadn y\u00eau c\u1ea7u h\u00f3a \u0111\u01a1n nh\u01b0ng kh\u00f4ng cam k\u1ebft t\u1ef1 \u0111\u1ed9ng ph\u00e1t h\u00e0nh h\u00f3a \u0111\u01a1n GTGT.'],
          ]
        : [
            ['Payment', 'Standard and Professional are paid through PayOS payment link.'],
            ['Delivery', 'After confirmation, entitlement is updated in customer portal.'],
            ['Invoice', 'Website records invoice requests.'],
          ],
    },
    refund: {
      title: vi ? 'Ch\u00ednh s\u00e1ch ho\u00e0n ti\u1ec1n' : 'Refund policy',
      lead: vi ? 'C\u00e1ch ti\u1ebfp nh\u1eadn v\u00e0 \u0111\u00e1nh gi\u00e1 y\u00eau c\u1ea7u ho\u00e0n ti\u1ec1n.' : 'How refund requests are received and assessed.',
      sections: vi
        ? [
            ['G\u1eedi y\u00eau c\u1ea7u', 'Kh\u00e1ch h\u00e0ng g\u1eedi m\u00e3 \u0111\u01a1n h\u00e0ng v\u00e0 l\u00fd do t\u1edbi support@natime.vn.'],
            ['X\u1eed l\u00fd', 'Y\u00eau c\u1ea7u \u0111\u01b0\u1ee3c xem x\u00e9t theo tr\u1ea1ng th\u00e1i k\u00edch ho\u1ea1t, th\u1eddi gian s\u1eed d\u1ee5ng v\u00e0 th\u1ecfa thu\u1eadn.'],
            ['K\u1ebft qu\u1ea3', 'nATime th\u00f4ng b\u00e1o k\u1ebft qu\u1ea3 v\u00e0 ph\u01b0\u01a1ng th\u1ee9c x\u1eed l\u00fd qua email \u0111\u00e3 \u0111\u0103ng k\u00fd.'],
          ]
        : [
            ['Request', 'Send order reference and reason to support@natime.vn.'],
            ['Assessment', 'Requests are assessed based on activation status and usage.'],
            ['Outcome', 'nATime communicates outcome to registered email.'],
          ],
    },
  }[kind];

  return (
    <PublicShell locale={locale}>
      <Intro eyebrow={vi ? 'CH\u00cdNH S\u00c1CH' : 'POLICY'} title={policyContent.title} description={policyContent.lead} />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="mb-8 text-xs font-semibold text-ink/50">
          {vi ? 'C\u1eadp nh\u1eadt: 15/07/2026.' : 'Updated: 15 July 2026.'}
        </p>
        <div className="space-y-8">
          {policyContent.sections.map(([title, text]) => (
            <section key={title}>
              <h2 className="text-xl font-bold text-ink">{title}</h2>
              <p className="mt-2 leading-relaxed text-ink/70">{text}</p>
            </section>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
