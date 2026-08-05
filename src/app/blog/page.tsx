'use client';

import { useState } from 'react';
import Link from 'next/link';
import PublicShell from '@/components/site/PublicShell';

const filters = ['Tất cả', 'Chấm công', 'Trạm cân', 'Vận hành', 'Sản phẩm'];

const featuredPost = {
  category: 'TRẠM CÂN · 12 phút đọc',
  title: 'Cách một nhà máy vật liệu xây dựng loại bỏ hoàn toàn phiếu cân giấy',
  desc: 'Từ đối soát thủ công mỗi ca đến đối chiếu tự động theo thời gian thực — hành trình triển khai trạm cân điện tử tại Đồng Tâm Group.',
  date: '04.08.2026',
  quote: '"Giảm 40% thời gian đối soát phiếu cân sau 3 tháng triển khai nATime tại Đồng Tâm Group."',
  badge: 'Case study',
};

const articles = [
  {
    category: 'Chấm công',
    tag: 'CHẤM CÔNG · 6 phút đọc',
    title: 'Ba sai lầm phổ biến khi triển khai chấm công vân tay tại nhà máy',
    desc: 'Từ chọn sai vị trí đầu đọc đến bỏ qua ca gãy — những lỗi khiến dữ liệu chấm công sai lệch.',
    date: '28.07.2026',
    color: 'text-indigo',
  },
  {
    category: 'Vận hành',
    tag: 'VẬN HÀNH · 8 phút đọc',
    title: 'Kiểm soát nhà thầu phụ ra vào công trường: bài toán không chỉ là chiếc thẻ',
    desc: 'Khi có hàng chục nhà thầu phụ mỗi ngày, phân quyền theo khu vực trở thành yêu cầu bắt buộc.',
    date: '19.07.2026',
    color: 'text-emerald',
  },
  {
    category: 'Sản phẩm',
    tag: 'SẢN PHẨM · 4 phút đọc',
    title: 'nATime ra mắt API tích hợp trực tiếp với phần mềm lương',
    desc: 'Bảng công giờ có thể đẩy thẳng sang hệ thống lương, không cần xuất file trung gian.',
    date: '05.07.2026',
    color: 'text-sky',
  },
  {
    category: 'Trạm cân',
    tag: 'TÀI SẢN · 7 phút đọc',
    title: 'Vì sao nhà máy của bạn nên gắn mã định danh cho từng chiếc xe nâng',
    desc: 'Chi phí bảo trì đột xuất giảm rõ rệt khi lịch bảo trì được nhắc tự động.',
    date: '22.06.2026',
    color: 'text-amber',
  },
  {
    category: 'Vận hành',
    tag: 'VẬN HÀNH · 5 phút đọc',
    title: 'Đọc nhật ký ra vào như một nhà điều tra: 5 dấu hiệu bất thường',
    desc: 'Những mẫu hình lặp lại trong nhật ký ra vào thường là dấu hiệu sớm của rủi ro an ninh.',
    date: '14.06.2026',
    color: 'text-emerald',
  },
  {
    category: 'Trạm cân',
    tag: 'TRẠM CÂN · 9 phút đọc',
    title: 'Chuẩn kết nối đầu cân điện tử: những gì đội IT nhà máy cần biết',
    desc: 'Hướng dẫn kỹ thuật để tích hợp đầu cân hiện có với hệ thống nATime.',
    date: '02.06.2026',
    color: 'text-indigo',
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
        <p className="font-sans text-[13px] font-600 text-indigo mb-3">BLOG</p>
        <h1 className="font-sans font-800 text-[36px] md:text-[44px] leading-[1.1] text-ink max-w-2xl">
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
                className={`font-sans text-[13px] px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                  active
                    ? 'bg-indigo text-white font-600'
                    : 'border border-line text-sub bg-white hover:text-ink'
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
          className="grid md:grid-cols-[0.9fr_1.1fr] gap-8 bg-white border border-line rounded-2xl shadow-card p-6 md:p-8 hover:border-indigo/40 transition-colors block"
        >
          <div className="bg-ink rounded-xl p-6 flex flex-col justify-between min-h-[220px]">
            <span className="font-sans text-[11px] font-600 text-white/50 uppercase tracking-wider">{featuredPost.badge}</span>
            <div className="font-sans text-indigo-300 text-[15px] leading-relaxed font-500">
              {featuredPost.quote}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-sans text-[12px] font-600 text-indigo mb-2">
              {featuredPost.category}
            </span>
            <h2 className="font-sans font-700 text-[24px] text-ink mb-3 leading-snug">
              {featuredPost.title}
            </h2>
            <p className="font-sans text-[14px] text-sub leading-relaxed mb-4">
              {featuredPost.desc}
            </p>
            <span className="font-sans text-[12px] text-sub/70">{featuredPost.date}</span>
          </div>
        </Link>
      </section>

      {/* ARTICLES GRID */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <Link
            key={article.title}
            href="/docs"
            className="block bg-white border border-line rounded-xl shadow-card p-6 hover:border-indigo/40 transition-colors"
          >
            <span className={`font-sans text-[12px] font-600 ${article.color}`}>{article.tag}</span>
            <h3 className="font-sans font-700 text-[18px] text-ink mt-2 mb-3 leading-snug">
              {article.title}
            </h3>
            <p className="font-sans text-[13px] text-sub leading-relaxed mb-4">
              {article.desc}
            </p>
            <span className="font-sans text-[11px] text-sub/70">{article.date}</span>
          </Link>
        ))}
      </section>

      {/* NEWSLETTER */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="bg-ink rounded-2xl px-8 py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-sans font-700 text-[22px] text-white mb-1">
              Nhận ghi chép vận hành mới nhất
            </h2>
            <p className="font-sans text-[13px] text-white/60">
              Một email mỗi tháng, không spam.
            </p>
          </div>
          <form className="flex gap-3 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="email@congty.vn"
              className="bg-white/10 border border-white/15 rounded-lg px-4 py-2.5 font-sans text-[14px] text-white placeholder:text-white/40 flex-1 md:w-64"
            />
            <button
              type="submit"
              className="bg-indigo text-white font-sans text-[14px] font-600 rounded-lg px-5 py-2.5 whitespace-nowrap hover:bg-indigo-700 transition-colors"
            >
              Đăng ký
            </button>
          </form>
        </div>
      </section>
    </PublicShell>
  );
}
