import Link from 'next/link';

export default function CTA() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 text-center">
      <h2 className="font-display font-bold text-[28px] md:text-[36px] text-ink max-w-xl mx-auto mb-6">
        S\u1eb5n s\u00e0ng nh\u00ecn th\u1ea5y v\u1eadn h\u00e0nh nh\u00e0 m\u00e1y c\u1ee7a b\u1ea1n theo th\u1eddi gian th\u1ef1c?
      </h2>
      <Link
        href="/contact"
        className="inline-block bg-ink text-paper font-body text-[14px] font-medium px-7 py-3.5 hover:bg-graphite transition-colors"
      >
        Y\u00eau c\u1ea7u demo mi\u1ec5n ph\u00ed
      </Link>
    </section>
  );
}
