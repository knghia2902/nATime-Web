'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PublicShell from '@/components/site/PublicShell';
import { featuredPost, blogArticles } from '@/data/blogPosts';

const filters = ['Tất cả', 'Chấm công', 'Trạm cân', 'Vận hành', 'Sản phẩm'];

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState('Tất cả');

  const filteredArticles = activeFilter === 'Tất cả'
    ? blogArticles
    : blogArticles.filter((a) => a.category === activeFilter);

  return (
    <PublicShell locale="vi">
      {/* HEADER SECTION */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <span className="badge-pill mb-3">BLOG & TÀI LIỆU VẬN HÀNH</span>
        <h1 className="font-sans font-black text-[36px] md:text-[46px] leading-[1.1] text-white max-w-2xl mt-2">
          Ghi chép từ hiện trường vận hành.
        </h1>
        <p className="font-sans text-[15px] text-white/60 mt-3 max-w-xl">
          Kinh nghiệm thực chiến triển khai hệ thống chấm công, trạm cân điện tử và kiểm soát an ninh tại các nhà máy công nghiệp.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mt-8">
          {filters.map((filter) => {
            const active = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`font-sans text-[13px] px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                  active
                    ? 'bg-white text-[#0a1628] font-bold shadow-xs'
                    : 'border border-white/10 text-white/70 bg-white/[0.04] hover:bg-white/10 hover:text-white'
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
          href={`/blog/${featuredPost.slug}`}
          className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 glass-panel rounded-3xl shadow-xl p-6 md:p-8 hover:border-white/25 transition-all block group overflow-hidden"
        >
          {/* Featured Image Box */}
          <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[300px] rounded-2xl overflow-hidden border border-white/10">
            <Image
              src={featuredPost.coverImage}
              alt={featuredPost.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#081120] via-[#081120]/40 to-transparent flex flex-col justify-between p-6">
              <span className="font-mono text-[11px] font-bold text-sky-300 bg-sky-500/20 border border-sky-400/30 px-3 py-1 rounded-full w-fit uppercase tracking-wider backdrop-blur-md">
                {featuredPost.badge}
              </span>
              <div className="space-y-2">
                <p className="font-sans text-white text-[14px] leading-relaxed font-medium italic drop-shadow-md">
                  {featuredPost.quote}
                </p>
              </div>
            </div>
          </div>

          {/* Featured Info */}
          <div className="flex flex-col justify-between py-2">
            <div>
              <div className="flex items-center gap-2 font-mono text-[12px] font-semibold text-sky-400 uppercase tracking-wider mb-2">
                <span>{featuredPost.category}</span>
                <span className="text-white/30">·</span>
                <span className="text-white/50">{featuredPost.readTime} đọc</span>
              </div>
              <h2 className="font-sans font-bold text-[24px] md:text-[28px] text-white mb-3 leading-snug group-hover:text-sky-300 transition-colors">
                {featuredPost.title}
              </h2>
              <p className="font-sans text-[14px] text-white/65 leading-relaxed mb-6">
                {featuredPost.desc}
              </p>
            </div>

            {/* Author & CTA */}
            <div className="flex items-center justify-between border-t border-white/[0.08] pt-4">
              <div className="flex items-center gap-2.5">
                <div className="relative w-7 h-7 rounded-full overflow-hidden bg-white/5 border border-white/15 flex items-center justify-center p-1">
                  <Image
                    src="/logo.png"
                    alt="nATime"
                    fill
                    className="object-contain p-0.5"
                  />
                </div>
                <span className="text-sm font-semibold text-white">nATime</span>
              </div>
              <span className="text-xs font-semibold text-sky-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Đọc bài viết <span>→</span>
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* ARTICLES GRID */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="flex flex-col justify-between glass-panel rounded-2xl shadow-sm p-5 hover:border-white/25 transition-all group overflow-hidden"
          >
            <div>
              {/* Card Cover Image */}
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4 border border-white/10">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="font-mono text-[10px] font-bold text-sky-300 bg-[#081120]/80 border border-sky-400/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-md">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Title & Desc */}
              <div className="flex items-center gap-2 font-mono text-[11px] text-white/50 mb-1.5">
                <span>{article.readTime} đọc</span>
                <span>·</span>
                <span>{article.date}</span>
              </div>
              <h3 className="font-sans font-bold text-[17px] text-white mb-2 leading-snug group-hover:text-sky-300 transition-colors">
                {article.title}
              </h3>
              <p className="font-sans text-[13px] text-white/60 leading-relaxed line-clamp-2 mb-4">
                {article.desc}
              </p>
            </div>

            {/* Author Footer */}
            <div className="flex items-center justify-between border-t border-white/[0.06] pt-3.5 mt-auto">
              <div className="flex items-center gap-2">
                <div className="relative w-6 h-6 rounded-full overflow-hidden bg-white/5 border border-white/15 flex items-center justify-center p-0.5">
                  <Image
                    src="/logo.png"
                    alt="nATime"
                    fill
                    className="object-contain p-0.5"
                  />
                </div>
                <span className="font-sans text-[12px] font-semibold text-white/90">nATime</span>
              </div>
              <span className="text-[12px] font-semibold text-sky-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                Chi tiết <span>→</span>
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* NEWSLETTER */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="glass-panel rounded-3xl px-8 py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-sans font-bold text-[22px] text-white mb-1">
              Nhận ghi chép vận hành mới nhất
            </h2>
            <p className="font-sans text-[13px] text-white/60">
              Một email mỗi tháng, cập nhật kinh nghiệm và tính năng kỹ thuật mới.
            </p>
          </div>
          <form className="flex gap-3 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="email@congty.vn"
              className="bg-[#0a1220] border border-white/[0.12] rounded-full px-5 py-2.5 font-sans text-[13px] text-white placeholder:text-white/30 flex-1 md:w-64 outline-none focus:border-white/40"
            />
            <button
              type="submit"
              className="btn-pill-primary px-6 py-2.5 text-xs whitespace-nowrap cursor-pointer"
            >
              Đăng ký
            </button>
          </form>
        </div>
      </section>
    </PublicShell>
  );
}
