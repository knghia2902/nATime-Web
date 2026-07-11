'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '@/lib/i18n';

interface Feature {
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  icon: React.ReactNode;
  comingSoon?: boolean;
}

const features: Feature[] = [
  {
    titleVi: 'Chấm công thông minh',
    titleEn: 'Smart Attendance',
    descVi:
      'Hỗ trợ đa phương thức: vân tay, khuôn mặt, QR Code, thẻ từ. Tự động đồng bộ dữ liệu chấm công realtime với hệ thống quản lý nhân sự.',
    descEn:
      'Multi-modal support: fingerprint, facial recognition, QR code, RFID cards. Real-time attendance data sync with HR management systems.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    titleVi: 'Kiểm soát Cổng ra vào',
    titleEn: 'Gate Access Control',
    descVi:
      'Tích hợp barrier, cổng xoay, nhận diện biển số (ANPR). Quản lý khách ra vào, phân quyền khu vực linh hoạt theo thời gian thực.',
    descEn:
      'Integrated barriers, turnstiles, and ANPR plate recognition. Visitor management with flexible zone-based access permissions in real time.',
    comingSoon: true,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    titleVi: 'Quản lý Thiết bị',
    titleEn: 'Device Management',
    descVi:
      'Quản lý tập trung thiết bị Hikvision, ZKTeco, Suprema. Giám sát trạng thái, firmware, cấu hình từ xa với dashboard trực quan.',
    descEn:
      'Centralized management for Hikvision, ZKTeco, Suprema devices. Monitor status, firmware, and remote configuration via intuitive dashboards.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" rx="1" />
        <path d="M9 2v2" />
        <path d="M15 2v2" />
        <path d="M9 20v2" />
        <path d="M15 20v2" />
        <path d="M2 9h2" />
        <path d="M2 15h2" />
        <path d="M20 9h2" />
        <path d="M20 15h2" />
      </svg>
    ),
  },
  {
    titleVi: 'Nhà thầu & Khách',
    titleEn: 'Contractors & Visitors',
    descVi:
      'Quản lý nhân viên nhà thầu, dự án, tài sản mang vào. Đăng ký khách online, cấp thẻ tạm thời, theo dõi lịch sử ra vào chi tiết.',
    descEn:
      'Manage contractor staff, projects, and asset tracking. Online visitor registration, temporary pass issuance, and detailed entry/exit history.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    titleVi: 'Cân xe / Trạm cân',
    titleEn: 'Weighbridge',
    descVi:
      'Tích hợp cân điện tử, tự động ghi nhận khối lượng. Liên kết đơn hàng giao nhận, chống gian lận với camera giám sát.',
    descEn:
      'Integrated electronic scales with automatic weight recording. Linked delivery orders with anti-fraud surveillance camera verification.',
    comingSoon: true,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1 3h15v13H1z" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    titleVi: 'Tài sản CNTT',
    titleEn: 'IT Asset Management',
    descVi:
      'Quản lý toàn bộ vòng đời tài sản CNTT: kiểm kê, bàn giao, bảo trì, thanh lý. Quét QR/barcode để tra cứu nhanh chóng.',
    descEn:
      'Full IT asset lifecycle management: inventory, handover, maintenance, disposal. QR/barcode scanning for instant asset lookup.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="M7 8h4" />
        <path d="M7 11h2" />
      </svg>
    ),
  },
  {
    titleVi: 'Báo cáo & Phân tích',
    titleEn: 'Reports & Analytics',
    descVi:
      'Dashboard phân tích realtime, biểu đồ trực quan. Xuất báo cáo Excel/PDF tự động, lịch sử dữ liệu chi tiết theo thời gian.',
    descEn:
      'Real-time analytics dashboards with rich visualizations. Automated Excel/PDF report exports and detailed historical data timelines.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <path d="M18 20V10" />
        <path d="M12 20V4" />
        <path d="M6 20v-6" />
      </svg>
    ),
  },
  {
    titleVi: 'Ứng dụng Mobile',
    titleEn: 'Mobile App',
    descVi:
      'Ứng dụng Android (Capacitor) hỗ trợ chấm công QR, xem lịch sử, nhận thông báo push. Giao diện tối ưu, offline-ready.',
    descEn:
      'Android app (Capacitor) with QR check-in, history viewer, and push notifications. Optimized UI with offline-ready capabilities.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
        <path d="M9 6h6" />
      </svg>
    ),
  },
];

function FeatureCard({
  titleVi,
  titleEn,
  descVi,
  descEn,
  icon,
  index,
  isVisible,
  comingSoon,
}: {
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  icon: React.ReactNode;
  index: number;
  isVisible: boolean;
  comingSoon?: boolean;
}) {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`
        feature-card group relative flex flex-col items-start gap-4
        rounded-2xl border border-border/60 bg-card/60 p-6
        backdrop-blur-xl transition-all duration-500 ease-out
        hover:-translate-y-2 hover:border-primary/40
        hover:shadow-xl hover:shadow-primary/5
        dark:border-border/20 dark:bg-card/20
        dark:hover:border-primary/30
        dark:hover:shadow-2xl dark:hover:shadow-primary/5
        ${
          isVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-10 opacity-0'
        }
      `}
      style={{
        transitionDelay: isVisible ? `${150 + index * 80}ms` : '0ms',
      }}
    >
      {/* Mouse-tracking radial glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0
          transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(79, 70, 229, 0.08), transparent 40%)',
        }}
      />

      {/* Subtle top highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl
          bg-gradient-to-r from-transparent via-indigo-500/0 to-transparent
          transition-all duration-500 group-hover:via-indigo-500/30"
      />

      {/* Icon container */}
      <div
        className="relative flex h-12 w-12 shrink-0 items-center justify-center
          rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700
          text-white shadow-lg shadow-indigo-500/25
          transition-all duration-300
          group-hover:scale-110 group-hover:shadow-indigo-500/40"
      >
        {/* Icon glow ring */}
        <div
          className="absolute inset-0 rounded-xl bg-indigo-500/20 blur-xl
            opacity-0 transition-opacity duration-300
            group-hover:opacity-100"
        />
        <div className="relative z-10">{icon}</div>
      </div>

      {/* Text content */}
      <div className="flex flex-col gap-2">
        <h3
          className="text-lg font-semibold leading-tight text-zinc-900
            transition-colors duration-300 group-hover:text-indigo-700
            dark:text-white dark:group-hover:text-indigo-300 flex items-center justify-between gap-2 w-full"
        >
          <span>{t(titleVi, titleEn)}</span>
          {comingSoon && (
            <span className="inline-flex shrink-0 items-center rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary dark:bg-primary/20 dark:text-primary-light ring-1 ring-inset ring-primary/20 border border-primary/10">
              {t('Sắp ra mắt', 'Soon')}
            </span>
          )}
        </h3>
        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {t(descVi, descEn)}
        </p>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r
          from-transparent via-indigo-500/0 to-transparent
          transition-all duration-500 group-hover:via-indigo-500/40"
      />
    </div>
  );
}

export default function Features() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(section);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-24 sm:py-32"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2
            -translate-y-1/2 rounded-full bg-primary/[0.03] blur-3xl"
        />
        <div
          className="absolute bottom-0 right-0 h-[400px] w-[400px]
            translate-x-1/3 translate-y-1/3 rounded-full
            bg-primary/[0.04] blur-3xl"
        />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(79,70,229,1) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,1) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          className={`
            mx-auto max-w-2xl text-center transition-all duration-700
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          `}
        >
          {/* Badge */}
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full
              border border-primary/20 bg-primary/10 px-4 py-1.5
              text-sm font-medium text-primary
              dark:border-primary/20 dark:bg-primary/10
              dark:text-primary-light"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            {t('Nền tảng toàn diện', 'Comprehensive Platform')}
          </div>

          {/* Title */}
          <h2
            className="text-3xl font-bold tracking-tight text-zinc-900
              dark:text-white sm:text-4xl lg:text-5xl"
          >
            {t('Tính năng nổi bật', 'Key Features')}
          </h2>

          {/* Subtitle */}
          <p
            className="mt-4 text-lg leading-relaxed text-zinc-600
              dark:text-zinc-400 sm:text-xl"
          >
            {t(
              'Tất cả công cụ bạn cần để quản lý chấm công, kiểm soát ra vào và vận hành doanh nghiệp hiệu quả — trong một nền tảng duy nhất.',
              'All the tools you need to manage attendance, access control, and enterprise operations efficiently — in a single platform.'
            )}
          </p>
        </div>

        {/* Feature cards grid */}
        <div
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-20
            lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.titleEn}
              {...feature}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
