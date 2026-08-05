import Link from 'next/link';

export default function CTA() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 text-center">
      <h2 className="font-display font-bold text-[28px] md:text-[36px] text-ink max-w-xl mx-auto mb-6">
        Sẵn sàng trải nghiệm phần mềm chấm công nATime?
      </h2>
      <Link
        href="/register?trial=standard"
        className="inline-block bg-ink text-paper font-body text-[14px] font-semibold px-7 py-3.5 hover:bg-graphite transition-colors"
      >
        Đăng ký dùng thử miễn phí 7 ngày
      </Link>
    </section>
  );
}
