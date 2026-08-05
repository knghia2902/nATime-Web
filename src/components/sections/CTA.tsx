import Link from 'next/link';

export default function CTA() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-24 text-center">
      <h2 className="font-sans font-700 text-[28px] md:text-[34px] text-ink max-w-xl mx-auto mb-6">
        Sẵn sàng nhìn thấy vận hành nhà máy của bạn theo thời gian thực?
      </h2>
      <Link
        href="/contact"
        className="inline-block bg-indigo text-white font-sans text-[14px] font-600 px-7 py-3.5 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Yêu cầu demo miễn phí
      </Link>
    </section>
  );
}
