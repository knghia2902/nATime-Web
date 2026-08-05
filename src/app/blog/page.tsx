import type { Metadata } from 'next';
import Link from 'next/link';
import PublicShell from '@/components/site/PublicShell';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Ghi chep tu hien truong van hanh nha may.',
  alternates: { canonical: '/blog', languages: { vi: '/blog', en: '/en/blog' } },
};

const filters = ['T\u1ea5t c\u1ea3', 'Ch\u1ea5m c\u00f4ng', 'Tr\u1ea1m c\u00e2n', 'V\u1eadn h\u00e0nh', 'S\u1ea3n ph\u1ea9m'];

const featured = {
  tag: 'TR\u1ea0M C\u00c2N \u00b7 12 ph\u00fat \u0111\u1ecdc',
  title: 'C\u00e1ch m\u1ed9t nh\u00e0 m\u00e1y v\u1eadt li\u1ec7u x\u00e2y d\u1ef1ng lo\u1ea1i b\u1ecf ho\u00e0n to\u00e0n phi\u1ebfu c\u00e2n gi\u1ea5y',
  desc: 'T\u1eeb \u0111\u1ed1i so\u00e1t th\u1ee7 c\u00f4ng m\u1ed7i ca \u0111\u1ebfn \u0111\u1ed1i chi\u1ebfu t\u1ef1 \u0111\u1ed9ng theo th\u1eddi gian th\u1ef1c \u2014 h\u00e0nh tr\u00ecnh tri\u1ec3n khai tr\u1ea1m c\u00e2n \u0111i\u1ec7n t\u1eed t\u1ea1i \u0110\u1ed3ng T\u00e2m Group.',
  date: '04.08.2026',
  caseLine: 'Gi\u1ea3m 40% th\u1eddi gian \u0111\u1ed1i so\u00e1t phi\u1ebfu c\u00e2n sau 3 th\u00e1ng tri\u1ec3n khai nATime t\u1ea1i \u0110\u1ed3ng T\u00e2m Group.',
};

const articles = [
  { tag: 'CH\u1ea4M C\u00d4NG \u00b7 6 ph\u00fat \u0111\u1ecdc', title: 'Ba sai l\u1ea7m ph\u1ed5 bi\u1ebfn khi tri\u1ec3n khai ch\u1ea5m c\u00f4ng v\u00e2n tay t\u1ea1i nh\u00e0 m\u00e1y', desc: 'T\u1eeb ch\u1ecdn sai v\u1ecb tr\u00ed \u0111\u1ea7u \u0111\u1ecdc \u0111\u1ebfn b\u1ecf qua ca g\u00e3y \u2014 nh\u1eefng l\u1ed7i khi\u1ebfn d\u1eef li\u1ec7u ch\u1ea5m c\u00f4ng sai l\u1ec7ch.', date: '28.07.2026' },
  { tag: 'V\u1eacN H\u00c0NH \u00b7 8 ph\u00fat \u0111\u1ecdc', title: 'Ki\u1ec3m so\u00e1t nh\u00e0 th\u1ea7u ph\u1ee5 ra v\u00e0o c\u00f4ng tr\u01b0\u1eddng: b\u00e0i to\u00e1n kh\u00f4ng ch\u1ec9 l\u00e0 chi\u1ebfc th\u1ebb', desc: 'Khi c\u00f3 h\u00e0ng ch\u1ee5c nh\u00e0 th\u1ea7u ph\u1ee5 m\u1ed7i ng\u00e0y, ph\u00e2n quy\u1ec1n theo khu v\u1ef1c tr\u1edf th\u00e0nh y\u00eau c\u1ea7u b\u1eaft bu\u1ed9c.', date: '19.07.2026' },
  { tag: 'S\u1ea2N PH\u1ea8M \u00b7 4 ph\u00fat \u0111\u1ecdc', title: 'nATime ra m\u1eaft API t\u00edch h\u1ee3p tr\u1ef1c ti\u1ebfp v\u1edbi ph\u1ea7n m\u1ec1m l\u01b0\u01a1ng', desc: 'B\u1ea3ng c\u00f4ng gi\u1edd c\u00f3 th\u1ec3 \u0111\u1ea9y th\u1eb3ng sang h\u1ec7 th\u1ed1ng l\u01b0\u01a1ng, kh\u00f4ng c\u1ea7n xu\u1ea5t file trung gian.', date: '05.07.2026' },
  { tag: 'T\u00c0I S\u1ea2N \u00b7 7 ph\u00fat \u0111\u1ecdc', title: 'V\u00ec sao nh\u00e0 m\u00e1y c\u1ee7a b\u1ea1n n\u00ean g\u1eafn m\u00e3 \u0111\u1ecbnh danh cho t\u1eebng chi\u1ebfc xe n\u00e2ng', desc: 'Chi ph\u00ed b\u1ea3o tr\u00ec \u0111\u1ed9t xu\u1ea5t gi\u1ea3m r\u00f5 r\u1ec7t khi l\u1ecbch b\u1ea3o tr\u00ec \u0111\u01b0\u1ee3c nh\u1eafc t\u1ef1 \u0111\u1ed9ng.', date: '22.06.2026' },
  { tag: 'V\u1eacN H\u00c0NH \u00b7 5 ph\u00fat \u0111\u1ecdc', title: '\u0110\u1ecdc nh\u1eadt k\u00fd ra v\u00e0o nh\u01b0 m\u1ed9t nh\u00e0 \u0111i\u1ec1u tra: 5 d\u1ea5u hi\u1ec7u b\u1ea5t th\u01b0\u1eddng', desc: 'Nh\u1eefng m\u1eabu h\u00ecnh l\u1eb7p l\u1ea1i trong nh\u1eadt k\u00fd ra v\u00e0o th\u01b0\u1eddng l\u00e0 d\u1ea5u hi\u1ec7u s\u1edbm c\u1ee7a r\u1ee7i ro an ninh.', date: '14.06.2026' },
  { tag: 'TR\u1ea0M C\u00c2N \u00b7 9 ph\u00fat \u0111\u1ecdc', title: 'Chu\u1ea9n k\u1ebft n\u1ed1i \u0111\u1ea7u c\u00e2n \u0111i\u1ec7n t\u1eed: nh\u1eefng g\u00ec \u0111\u1ed9i IT nh\u00e0 m\u00e1y c\u1ea7n bi\u1ebft', desc: 'H\u01b0\u1edbng d\u1eabn k\u1ef9 thu\u1eadt \u0111\u1ec3 t\u00edch h\u1ee3p \u0111\u1ea7u c\u00e2n hi\u1ec7n c\u00f3 v\u1edbi h\u1ec7 th\u1ed1ng nATime.', date: '02.06.2026' },
];

export default function BlogPage() {
  return (
    <PublicShell locale="vi">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <p className="font-mono text-[12px] text-teal tracking-wide mb-4">BLOG</p>
        <h1 className="font-display font-[800] text-[36px] md:text-[46px] leading-[1.1] text-ink max-w-2xl">
          Ghi ch\u00e9p t\u1eeb hi\u1ec7n tr\u01b0\u1eddng v\u1eadn h\u00e0nh.
        </h1>
        <div className="flex flex-wrap gap-2 mt-8">
          {filters.map((f, i) => (
            <span
              key={f}
              className={`font-body text-[13px] px-3 py-1.5 ${
                i === 0
                  ? 'bg-ink text-paper'
                  : 'border hairline text-ink/60'
              }`}
            >
              {f}
            </span>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-6xl mx-auto px-6 pb-14">
        <Link href="#" className="grid md:grid-cols-[0.9fr_1.1fr] gap-8 border hairline p-6 md:p-8 hover:border-ink/30 transition-colors">
          <div className="bg-graphite p-6 flex flex-col justify-between min-h-[220px]">
            <span className="font-mono text-[11px] text-paper/50">CASE STUDY</span>
            <div className="font-mono text-amber text-[13px] leading-relaxed">
              &ldquo;{featured.caseLine}&rdquo;
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-mono text-[11px] text-teal mb-2">{featured.tag}</span>
            <h2 className="font-display font-bold text-[24px] text-ink mb-3 leading-snug">{featured.title}</h2>
            <p className="font-body text-[14px] text-ink/65 leading-relaxed mb-4">{featured.desc}</p>
            <span className="font-mono text-[12px] text-ink/40">{featured.date}</span>
          </div>
        </Link>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-8">
        {articles.map((a) => (
          <Link key={a.title} href="#" className="block border hairline p-6 hover:border-ink/30 transition-colors">
            <span className="font-mono text-[11px] text-teal">{a.tag}</span>
            <h3 className="font-display font-bold text-[18px] text-ink mt-2 mb-3 leading-snug">{a.title}</h3>
            <p className="font-body text-[13px] text-ink/60 leading-relaxed mb-4">{a.desc}</p>
            <span className="font-mono text-[11px] text-ink/40">{a.date}</span>
          </Link>
        ))}
      </section>

      {/* Newsletter */}
      <section className="bg-ink text-paper">
        <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display font-bold text-[22px] mb-1">Nh\u1eadn ghi ch\u00e9p v\u1eadn h\u00e0nh m\u1edbi nh\u1ea5t</h2>
            <p className="font-body text-[13px] text-paper/60">M\u1ed9t email m\u1ed7i th\u00e1ng, kh\u00f4ng spam.</p>
          </div>
          <form className="flex gap-3 w-full md:w-auto">
            <input
              type="email"
              placeholder="email@congty.vn"
              className="bg-transparent border hairline border-white/20 px-4 py-2.5 font-body text-[14px] text-paper placeholder:text-paper/40 flex-1 md:w-64"
            />
            <button type="submit" className="bg-amber text-ink font-body text-[14px] font-semibold px-5 py-2.5 whitespace-nowrap">
              \u0110\u0103ng k\u00fd
            </button>
          </form>
        </div>
      </section>
    </PublicShell>
  );
}
