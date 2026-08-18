import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PublicShell from '@/components/site/PublicShell';
import { getAllPosts, getPostBySlug } from '@/data/blogPosts';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Bài viết không tồn tại' };

  return {
    title: `${post.title} | nATime Blog`,
    description: post.desc,
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <PublicShell locale="vi">
      <article className="max-w-4xl mx-auto px-6 pt-12 pb-24 font-sans text-white">
        {/* ── BREADCRUMB & BACK LINK ── */}
        <div className="flex items-center gap-2 text-[13px] text-white/50 mb-8">
          <Link href="/" className="hover:text-white transition-colors">
            Trang chủ
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-white transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-white/80 truncate max-w-xs">{post.title}</span>
        </div>

        {/* ── ARTICLE HEADER ── */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-sky-500/15 border border-sky-400/30 text-sky-300 font-mono text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-white/40 text-[13px]">·</span>
            <span className="text-white/60 text-[13px]">{post.date}</span>
            <span className="text-white/40 text-[13px]">·</span>
            <span className="text-white/60 text-[13px]">{post.readTime} đọc</span>
          </div>

          <h1 className="text-[32px] md:text-[44px] font-extrabold leading-[1.15] text-white mb-6">
            {post.title}
          </h1>

          <p className="text-[17px] text-white/75 leading-relaxed mb-6">
            {post.desc}
          </p>

          {/* Author Block */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/[0.08]">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white/5 border border-white/15 flex items-center justify-center p-1">
              <Image
                src="/logo.png"
                alt="nATime"
                fill
                className="object-contain p-0.5"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">nATime</p>
            </div>
          </div>
        </header>

        {/* ── HERO COVER BANNER ── */}
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>

        {/* ── ARTICLE BODY CONTENT ── */}
        <div className="space-y-10 text-[16px] leading-[1.8] text-white/85">
          {/* Summary Callout */}
          <div className="glass-panel rounded-2xl p-6 border-l-4 border-l-sky-400 bg-white/[0.02]">
            <p className="text-[15px] font-medium text-white/90 leading-relaxed italic">
              &ldquo;{post.content.summary}&rdquo;
            </p>
          </div>

          {/* Article Sections */}
          {post.content.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-[22px] md:text-[26px] font-bold text-white mt-8 mb-4">
                {section.heading}
              </h2>

              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-white/80 leading-relaxed">
                  {p}
                </p>
              ))}

              {section.bullets && section.bullets.length > 0 && (
                <ul className="space-y-2.5 my-4 ml-4">
                  {section.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-white/80">
                      <span className="text-sky-400 font-bold mt-0.5">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.callout && (
                <div className="glass-panel rounded-2xl p-6 my-6 border border-white/10 bg-indigo-950/20">
                  <h3 className="text-sm font-bold text-sky-300 uppercase tracking-wider mb-2">
                    {section.callout.title}
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {section.callout.text}
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* ── BACK TO BLOG & SHARE ── */}
        <div className="mt-16 pt-8 border-t border-white/[0.08] flex items-center justify-between">
          <Link
            href="/blog"
            className="btn-pill-glass inline-flex items-center gap-2 py-2 px-5 text-xs font-semibold"
          >
            <span>←</span>
            <span>Quay lại tất cả bài viết</span>
          </Link>
          <Link
            href="/support"
            className="btn-pill-primary py-2 px-5 text-xs font-semibold"
          >
            Yêu cầu tư vấn kỹ thuật
          </Link>
        </div>

        {/* ── RELATED POSTS ── */}
        {relatedPosts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-white/[0.08]">
            <h3 className="text-[20px] font-bold text-white mb-6">
              Bài viết cùng chủ đề
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="glass-panel rounded-2xl p-5 hover:border-white/20 transition-all block group overflow-hidden"
                >
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-3 border border-white/10">
                    <Image
                      src={r.coverImage}
                      alt={r.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider block mb-1.5">
                    {r.category}
                  </span>
                  <h4 className="text-[16px] font-bold text-white mb-2 group-hover:text-sky-300 transition-colors leading-snug">
                    {r.title}
                  </h4>
                  <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                    {r.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </PublicShell>
  );
}
