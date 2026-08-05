import Link from 'next/link';

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
      <div>
        <p className="font-mono text-[12px] text-teal tracking-wide mb-5">
          H\u1ec6 TH\u1ed0NG V\u1eacN H\u00c0NH NH\u00c0 M\u00c1Y
        </p>
        <h1 className="font-display font-[800] text-[40px] md:text-[52px] leading-[1.08] tracking-tight text-ink">
          M\u1ed9t n\u1ec1n t\u1ea3ng,<br />b\u1ed1n tr\u1ea1m ki\u1ec3m so\u00e1t v\u1eadn h\u00e0nh.
        </h1>
        <p className="font-body text-[16px] leading-relaxed text-ink/70 mt-6 max-w-md">
          nATime h\u1ee3p nh\u1ea5t ch\u1ea5m c\u00f4ng, ki\u1ec3m so\u00e1t ra v\u00e0o, tr\u1ea1m c\u00e2n v\u00e0 qu\u1ea3n l\u00fd t\u00e0i s\u1ea3n v\u00e0o m\u1ed9t h\u1ec7 th\u1ed1ng duy nh\u1ea5t \u2014 \u0111\u1ec3 m\u1ecdi con s\u1ed1 v\u1eadn h\u00e0nh \u0111\u1ec1u c\u00f3 th\u1ec3 truy v\u1ebft, \u0111\u1ed1i chi\u1ebfu v\u00e0 tin c\u1eady.
        </p>
        <div className="flex flex-wrap gap-3 mt-8">
          <Link
            href="/contact"
            className="bg-ink text-paper font-body text-[14px] font-medium px-6 py-3 hover:bg-graphite transition-colors"
          >
            Y\u00eau c\u1ea7u demo
          </Link>
          <Link
            href="/features"
            className="border hairline font-body text-[14px] font-medium px-6 py-3 hover:bg-white transition-colors"
          >
            Xem t\u00ednh n\u0103ng
          </Link>
        </div>
      </div>

      {/* Data Panel */}
      <div className="diag-corner bg-graphite p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[11px] text-paper/50">TR\u1ea0M C\u00c2N \u00b7 C\u1ed4NG 02</span>
          <span className="w-2 h-2 rounded-full bg-teal" />
        </div>
        <div className="font-mono text-amber text-[44px] leading-none mb-1">
          18.420<span className="text-[18px] ml-1 text-amber/70">kg</span>
        </div>
        <p className="font-mono text-[11px] text-paper/40 mb-6">
          Xe 51C-224.19 \u00b7 \u0110\u1ed1i chi\u1ebfu phi\u1ebfu c\u00e2n: kh\u1edbp
        </p>
        <div className="border-t border-white/10 pt-4 space-y-3">
          <div className="flex justify-between font-mono text-[12px] text-paper/70">
            <span>NV-0482</span>
            <span className="text-teal">V\u00e0o ca \u2014 07:58:12</span>
          </div>
          <div className="flex justify-between font-mono text-[12px] text-paper/70">
            <span>C\u1ed5ng B</span>
            <span className="text-teal">M\u1edf \u2014 nh\u00e0 th\u1ea7u #114</span>
          </div>
          <div className="flex justify-between font-mono text-[12px] text-paper/70">
            <span>FL-07</span>
            <span className="text-amber">B\u1ea3o tr\u00ec c\u00f2n 3 ng\u00e0y</span>
          </div>
        </div>
      </div>
    </section>
  );
}
