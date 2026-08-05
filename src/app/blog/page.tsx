import type { Metadata } from 'next';
import Link from 'next/link';
import PublicShell from '@/components/site/PublicShell';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Ghi chép từ hiện trường vận hành và phát triển nATime.',
  alternates: { canonical: '/blog', languages: { vi: '/blog', en: '/en/blog' } },
};

const filters = ['Tất cả', 'Chấm công', 'Thiết bị', 'Vận hành', 'Sản phẩm'];

const featured = {
  tag: 'BẢN QUYỀN & HỆ THỐNG · 8 phút đọc',
  title: 'Kích hoạt bản quyền nATime trên Windows self-host qua Cổng khách hàng',
  desc: 'Hướng dẫn chi tiết quy trình tạo mã liên kết trên ứng dụng máy chủ và phê duyệt quyền tự động qua Cổng khách hàng natime.vn.',
  date: '04.08.2026',
  caseLine: 'Tự động hóa 100% quy trình cấp phép bản quyền cho bộ cài Windows.',
};

const articles = [
  { tag: 'CHẤM CÔNG · 6 phút đọc', title: 'Ba sai lầm phổ biến khi cấu hình ca gãy và ca qua đêm', desc: 'Những lưu ý quan trọng khi thiết lập khung giờ vào/ra để kết quả tính công chính xác.', date: '28.07.2026' },
  { tag: 'THIẾT BỊ · 8 phút đọc', title: 'Giám sát kết nối máy chấm công Hikvision và MCC tập trung', desc: 'Cách nATime theo dõi trạng thái trực tuyến và tự động kéo nhật ký sự kiện.', date: '19.07.2026' },
  { tag: 'SẢN PHẨM · 4 phút đọc', title: 'nATime ra mắt API tích hợp trực tiếp với phần mềm lương', desc: 'Bảng công giờ có thể đẩy thẳng sang hệ thống lương, không cần xuất file trung gian.', date: '05.07.2026' },
  { tag: 'BẢO MẬT · 7 phút đọc', title: 'Vì sao dữ liệu sinh trắc học và mật khẩu không bao giờ rời khỏi máy chủ cục bộ', desc: 'Kiến trúc bảo mật của nATime đảm bảo an toàn tuyệt đối cho doanh nghiệp.', date: '22.06.2026' },
  { tag: 'VẬN HÀNH · 5 phút đọc', title: 'Cách đối soát dữ liệu chấm công giữa các chi nhánh', desc: 'Mô hình kết nối đa điểm giúp ban quản trị theo dõi giờ công toàn công ty theo thời gian thực.', date: '14.06.2026' },
  { tag: 'BẢN PHÁT HÀNH · 9 phút đọc', title: 'Xác minh chữ ký số Authenticode trước khi cài đặt bộ cài Windows', desc: 'Hướng dẫn kiểm tra mã băm SHA-256 và chữ ký số được công bố minh bạch.', date: '02.06.2026' },
];

export default function BlogPage() {
  return (
    <PublicShell locale="vi">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <p className="font-mono text-[12px] text-teal tracking-wide mb-4">BLOG</p>
        <h1 className="font-display font-extrabold text-[36px] md:text-[46px] leading-[1.1] text-ink max-w-2xl">
          Ghi chép từ hiện trường vận hành.
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
            <span className="font-mono text-[11px] text-paper/50">HƯỚNG DẪN</span>
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
            <h2 className="font-display font-bold text-[22px] mb-1">Nhận tin tức & bản cập nhật mới nhất</h2>
            <p className="font-body text-[13px] text-paper/60">Một email mỗi tháng, không spam.</p>
          </div>
          <form className="flex gap-3 w-full md:w-auto">
            <input
              type="email"
              placeholder="email@congty.vn"
              className="bg-transparent border hairline border-white/20 px-4 py-2.5 font-body text-[14px] text-paper placeholder:text-paper/40 flex-1 md:w-64"
            />
            <button type="submit" className="bg-amber text-ink font-body text-[14px] font-semibold px-5 py-2.5 whitespace-nowrap">
              Đăng ký
            </button>
          </form>
        </div>
      </section>
    </PublicShell>
  );
}
