'use client';

import { useState } from 'react';
import Link from 'next/link';
import PublicShell from '@/components/site/PublicShell';

const filters = ['Tất cả', 'Chấm công', 'Thiết bị', 'Bản quyền', 'Vận hành'];

const featuredPost = {
  category: 'BẢN QUYỀN & HỆ THỐNG',
  readTime: '8 phút đọc',
  title: 'Kích hoạt bản quyền nATime trên Windows self-host qua Cổng khách hàng',
  desc: 'Hướng dẫn chi tiết quy trình tạo mã liên kết trên ứng dụng máy chủ và phê duyệt quyền tự động qua Cổng khách hàng natime.vn.',
  date: '04.08.2026',
  quote: 'Tự động hóa 100% quy trình cấp phép bản quyền cho bộ cài Windows self-host.',
  badge: 'HƯỚNG DẪN',
};

const articles = [
  {
    category: 'Chấm công',
    tag: 'CHẤM CÔNG · 6 phút đọc',
    title: 'Ba sai lầm phổ biến khi cấu hình ca gãy và ca qua đêm',
    desc: 'Những lưu ý quan trọng khi thiết lập khung giờ vào/ra để kết quả tính công chính xác.',
    date: '28.07.2026',
  },
  {
    category: 'Thiết bị',
    tag: 'THIẾT BỊ · 8 phút đọc',
    title: 'Giám sát kết nối máy chấm công Hikvision và MCC tập trung',
    desc: 'Cách nATime theo dõi trạng thái trực tuyến và tự động kéo nhật ký sự kiện.',
    date: '19.07.2026',
  },
  {
    category: 'Vận hành',
    tag: 'VẬN HÀNH · 4 phút đọc',
    title: 'nATime ra mắt API tích hợp trực tiếp với phần mềm lương',
    desc: 'Bảng công giờ có thể đẩy thẳng sang hệ thống lương, không cần xuất file trung gian.',
    date: '05.07.2026',
  },
  {
    category: 'Bản quyền',
    tag: 'BẢN QUYỀN · 7 phút đọc',
    title: 'Vì sao dữ liệu sinh trắc học và mật khẩu không bao giờ rời khỏi máy chủ cục bộ',
    desc: 'Kiến trúc bảo mật của nATime đảm bảo an toàn tuyệt đối cho doanh nghiệp.',
    date: '22.06.2026',
  },
  {
    category: 'Vận hành',
    tag: 'VẬN HÀNH · 5 phút đọc',
    title: 'Cách đối soát dữ liệu chấm công giữa các chi nhánh',
    desc: 'Mô hình kết nối đa điểm giúp ban quản trị theo dõi giờ công toàn công ty theo thời gian thực.',
    date: '14.06.2026',
  },
  {
    category: 'Bản quyền',
    tag: 'BẢN QUYỀN · 9 phút đọc',
    title: 'Xác minh chữ ký số Authenticode trước khi cài đặt bộ cài Windows',
    desc: 'Hướng dẫn kiểm tra mã băm SHA-256 và chữ ký số được công bố minh bạch.',
    date: '02.06.2026',
  },
];

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState('Tất cả');

  const filteredArticles = activeFilter === 'Tất cả'
    ? articles
    : articles.filter((a) => a.category === activeFilter);

  return (
    <PublicShell locale="vi">
      {/* HEADER SECTION */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <p className="font-mono text-[12px] text-teal tracking-wide mb-4">BLOG</p>
        <h1 className="font-display font-extrabold text-[36px] md:text-[46px] leading-[1.1] text-ink max-w-2xl">
          Ghi chép từ hiện trường vận hành.
        </h1>
        <div className="flex flex-wrap gap-2 mt-8">
          {filters.map((filter) => {
            const active = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`font-body text-[13px] px-3 py-1.5 transition-colors cursor-pointer ${
                  active
                    ? 'bg-ink text-paper'
                    : 'border hairline text-ink/60 hover:text-ink hover:border-ink/40'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </section>

      {/* FEATURED POST */}
      <section className="max-w-6xl mx-auto px-6 pb-14">
        <Link
          href="/docs"
          className="grid md:grid-cols-[0.9fr_1.1fr] gap-8 border hairline p-6 md:p-8 hover:border-ink/30 transition-colors block"
        >
          <div className="bg-graphite p-6 flex flex-col justify-between min-h-[220px]">
            <span className="font-mono text-[11px] text-paper/50">{featuredPost.badge}</span>
            <div className="font-mono text-amber text-[13px] leading-relaxed">
              &ldquo;{featuredPost.quote}&rdquo;
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-mono text-[11px] text-teal mb-2">
              {featuredPost.category} · {featuredPost.readTime}
            </span>
            <h2 className="font-display font-bold text-[24px] text-ink mb-3 leading-snug">
              {featuredPost.title}
            </h2>
            <p className="font-body text-[14px] text-ink/65 leading-relaxed mb-4">
              {featuredPost.desc}
            </p>
            <span className="font-mono text-[12px] text-ink/40">{featuredPost.date}</span>
          </div>
        </Link>
      </section>

      {/* ARTICLES GRID */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-8">
        {filteredArticles.map((article) => (
          <Link
            key={article.title}
            href="/docs"
            className="block border hairline p-6 hover:border-ink/30 transition-colors"
          >
            <span className="font-mono text-[11px] text-teal">{article.tag}</span>
            <h3 className="font-display font-bold text-[18px] text-ink mt-2 mb-3 leading-snug">
              {article.title}
            </h3>
            <p className="font-body text-[13px] text-ink/60 leading-relaxed mb-4">
              {article.desc}
            </p>
            <span className="font-mono text-[11px] text-ink/40">{article.date}</span>
          </Link>
        ))}
      </section>

      {/* NEWSLETTER */}
      <section className="bg-ink text-paper">
        <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display font-bold text-[22px] mb-1">
              Nhận ghi chép vận hành mới nhất
            </h2>
            <p className="font-body text-[13px] text-paper/60">
              Một email mỗi tháng, không spam.
            </p>
          </div>
          <form className="flex gap-3 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="email@congty.vn"
              className="bg-transparent border hairline border-white/20 px-4 py-2.5 font-body text-[14px] text-paper placeholder:text-paper/40 flex-1 md:w-64"
            />
            <button
              type="submit"
              className="bg-amber text-ink font-body text-[14px] font-semibold px-5 py-2.5 whitespace-nowrap cursor-pointer hover:bg-amber/90 transition-colors"
            >
              Đăng ký
            </button>
          </form>
        </div>
      </section>
    </PublicShell>
  );
}
