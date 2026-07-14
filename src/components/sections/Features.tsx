'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '@/lib/i18n';

interface FeatureItem {
  id: string;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  icon: React.ReactNode;
  image: string;
  isMobile?: boolean;
  comingSoon?: boolean;
  bulletsVi: string[];
  bulletsEn: string[];
}

export default function Features() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [slideDir, setSlideDir] = useState<'left' | 'right'>('left');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // --- Icons ---
  const clockIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
  const shieldIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
    </svg>
  );
  const cpuIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
    </svg>
  );
  const usersIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
  const truckIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 3h15v13H1z" /><path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
  const laptopIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" />
    </svg>
  );
  const chartIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2" />
      <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
    </svg>
  );
  const phoneIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /><path d="M9 6h6" />
    </svg>
  );

  const featuresList: FeatureItem[] = [
    {
      id: 'attendance',
      titleVi: 'Chấm công thông minh',
      titleEn: 'Smart Attendance',
      image: '/screenshots/attendance.png',
      descVi: 'Tự động đối soát thời gian vào/ra ca. Tính toán giờ công, tăng ca, phạt đi muộn/về sớm dựa trên ca làm việc cấu hình sẵn.',
      descEn: 'Auto-reconcile shift check-in/out times. Calculate hours, overtime, and late/early penalties based on configured shifts.',
      icon: clockIcon,
      bulletsVi: ['Đối soát ca kíp linh hoạt theo ngày/tuần', 'Tính giờ công & tăng ca thời gian thực', 'Phát hiện đi muộn, về sớm, vắng mặt', 'Xuất Excel tổng hợp tự động qua email'],
      bulletsEn: ['Flexible daily/weekly shift reconciliation', 'Real-time hours & overtime calculation', 'Detect late, early-out, absent events', 'Auto-export Excel summaries via email'],
    },
    {
      id: 'gate',
      titleVi: 'Kiểm soát Cổng ra vào',
      titleEn: 'Gate Access Control',
      image: '/screenshots/devices.png',
      comingSoon: true,
      descVi: 'Tích hợp barrier, cổng xoay, ANPR. Quản lý khách ra vào, phân quyền khu vực linh hoạt theo thời gian thực.',
      descEn: 'Integrated barriers, turnstiles, and ANPR. Visitor management with zone-based access permissions in real time.',
      icon: shieldIcon,
      bulletsVi: ['Tích hợp barie, cổng xoay & kiểm soát cửa', 'Đồng bộ ca kíp và phân quyền ra vào', 'Giám sát lịch sử quét thẻ từ xa', 'Cảnh báo đột nhập tức thời'],
      bulletsEn: ['Integrate barriers, turnstiles & door locks', 'Sync shifts and staff access permissions', 'Monitor swipe history remotely', 'Instant intrusion alerts'],
    },
    {
      id: 'devices',
      titleVi: 'Quản lý Thiết bị',
      titleEn: 'Device Management',
      image: '/screenshots/devices.png',
      descVi: 'Giám sát trực tuyến hàng chục thiết bị IoT. Đồng bộ dữ liệu ca kíp và vân tay/FaceID từ xa qua mạng nội bộ.',
      descEn: 'Monitor dozens of IoT devices online. Sync shift data and fingerprints/FaceID remotely over the network.',
      icon: cpuIcon,
      bulletsVi: ['Trạng thái thiết bị thời gian thực (Online/Offline)', 'Đồng bộ vân tay, FaceID & ca kíp từ xa', 'Cập nhật firmware hàng loạt', 'Điều khiển mở/khóa cổng từ web quản trị'],
      bulletsEn: ['Real-time device status (Online/Offline)', 'Remote fingerprint, FaceID & shift sync', 'Batch firmware updates', 'Trigger door lock/unlock from admin panel'],
    },
    {
      id: 'contractors',
      titleVi: 'Nhà thầu & Khách',
      titleEn: 'Contractors & Visitors',
      image: '/screenshots/handover.png',
      descVi: 'Quản lý nhân viên nhà thầu, dự án, thiết bị mang vào. Đăng ký khách, cấp thẻ tạm thời, theo dõi lịch sử ra vào.',
      descEn: 'Manage contractor staff, projects, and assets. Visitor registration, temporary passes, and entry/exit logs.',
      icon: usersIcon,
      bulletsVi: ['Quản lý nhà thầu, dự án & tài sản mang vào', 'Đăng ký khách & cấp thẻ tạm thời', 'Lịch sử ra vào tại từng chốt an ninh', 'Phê duyệt danh sách nhân sự nhà thầu'],
      bulletsEn: ['Manage contractors, projects & incoming assets', 'Visitor registration & temp pass issuance', 'Entry/exit logs at each security post', 'Online contractor personnel approval'],
    },
    {
      id: 'weighbridge',
      titleVi: 'Cân xe / Trạm cân',
      titleEn: 'Weighbridge',
      image: '/screenshots/dashboard.png',
      comingSoon: true,
      descVi: 'Tích hợp cân điện tử, ghi nhận khối lượng tự động. Liên kết đơn hàng giao nhận, chống gian lận với camera giám sát.',
      descEn: 'Integrated electronic scales with auto weight recording. Linked to delivery orders with anti-fraud camera verification.',
      icon: truckIcon,
      bulletsVi: ['Ghi nhận cân nặng tự động từ đầu cân', 'Liên kết phiếu cân với đơn hàng', 'Nhận diện biển số & chụp ảnh phương tiện', 'Đối chiếu chênh lệch cân vào/ra'],
      bulletsEn: ['Auto-log weight from scale indicators', 'Link weight tickets with delivery orders', 'Plate recognition & vehicle snapshot', 'Reconcile entry/exit weight discrepancy'],
    },
    {
      id: 'assets',
      titleVi: 'Tài sản CNTT',
      titleEn: 'IT Asset Management',
      image: '/screenshots/assets.png',
      descVi: 'Quản lý danh sách thiết bị CNTT (máy tính, màn hình, RAM, cấu hình). Theo dõi bàn giao phòng ban và nhân sự sử dụng.',
      descEn: 'Manage IT assets (PCs, monitors, RAM, specs). Track department assignments and responsible personnel.',
      icon: laptopIcon,
      bulletsVi: ['Lưu cấu hình phần cứng chi tiết (CPU, RAM, SSD)', 'Theo dõi phòng ban & nhân sự sử dụng', 'Mã QR riêng biệt cho từng tài sản', 'Bộ lọc theo phòng ban & trạng thái'],
      bulletsEn: ['Detailed hardware specs (CPU, RAM, SSD)', 'Track department & user assignments', 'Unique QR codes per asset', 'Filter by department & status'],
    },
    {
      id: 'reports',
      titleVi: 'Báo cáo & Phân tích',
      titleEn: 'Reports & Analytics',
      image: '/screenshots/dashboard.png',
      descVi: 'Dashboard phân tích realtime với biểu đồ trực quan. Xuất báo cáo Excel/PDF tự động và lịch sử dữ liệu chi tiết.',
      descEn: 'Real-time analytics dashboards with rich charts. Automated Excel/PDF exports and detailed historical data.',
      icon: chartIcon,
      bulletsVi: ['Dashboard phân tích realtime & biểu đồ', 'Xuất Excel/PDF tự động định kỳ', 'Theo dõi lịch sử theo dòng thời gian', 'Báo cáo hiệu suất thiết bị & tỉ lệ đúng giờ'],
      bulletsEn: ['Real-time dashboards & charts', 'Scheduled Excel/PDF auto-exports', 'Historical data timeline tracing', 'Device performance & punctuality reports'],
    },
    {
      id: 'mobile',
      titleVi: 'Ứng dụng Mobile',
      titleEn: 'Mobile App',
      image: '/screenshots/mobile.png',
      isMobile: true,
      descVi: 'Ứng dụng di động đa nền tảng giúp nhân viên theo dõi lịch làm việc, ngày công thực tế, tra cứu lịch sử và quản lý đơn từ phép.',
      descEn: 'Cross-platform app for employees to view schedules, actual timesheets, attendance logs, and manage leave requests.',
      icon: phoneIcon,
      bulletsVi: ['Lịch làm việc & ngày công hàng tháng', 'Giờ vào/ra thực tế & phút đi muộn', 'Đăng ký nghỉ phép & OT trên điện thoại', 'Tra cứu lịch sử & trạng thái thiết bị'],
      bulletsEn: ['Monthly schedules & work day tracking', 'Actual clock-in/out & late minutes', 'Leave & OT requests on mobile', 'Check logs & device connection status'],
    },
  ];

  const total = featuresList.length;

  const goTo = useCallback((next: number, dir: 'left' | 'right') => {
    if (sliding) return;
    setSlideDir(dir);
    setSliding(true);
    setTimeout(() => {
      setActiveTab(next);
      setSliding(false);
    }, 350);
  }, [sliding]);

  const goNext = useCallback(() => {
    goTo((activeTab + 1) % total, 'left');
  }, [activeTab, total, goTo]);

  const goPrev = useCallback(() => {
    goTo((activeTab - 1 + total) % total, 'right');
  }, [activeTab, total, goTo]);

  // Auto-play
  useEffect(() => {
    timerRef.current = setTimeout(goNext, 5000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [activeTab, goNext]);

  // Intersection observer
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(section); } },
      { threshold: 0.05, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const current = featuresList[activeTab];

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-24 sm:py-32"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.03] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-primary/[0.04] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(79,70,229,1) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,1) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className={`mx-auto max-w-2xl text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary dark:text-primary-light">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            {t('Nền tảng toàn diện', 'Comprehensive Platform')}
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-5xl">
            {t('Tính năng nổi bật', 'Key Features')}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {t('Khám phá giao diện hệ thống trực quan sinh động từ các phân hệ cốt lõi của nATime.', 'Explore live interfaces from nATime\'s core system modules.')}
          </p>
        </div>

        {/* ── Centered Carousel Showcase ── */}
        <div className={`mt-16 lg:mt-20 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>

          {/* ── Preview Frame (Center) ── */}
          <div className="relative mx-auto max-w-5xl">

            {/* Arrow: Left */}
            <button
              onClick={goPrev}
              aria-label="Previous"
              className="absolute left-0 top-1/2 z-20 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card/80 text-muted shadow-lg backdrop-blur-sm transition hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Arrow: Right */}
            <button
              onClick={goNext}
              aria-label="Next"
              className="absolute right-0 top-1/2 z-20 -translate-y-1/2 translate-x-4 sm:translate-x-6 flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card/80 text-muted shadow-lg backdrop-blur-sm transition hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Image viewport (clipped) */}
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-tr from-slate-200 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 shadow-2xl p-2">
              <div
                className="transition-all duration-350 ease-in-out"
                style={{
                  opacity: sliding ? 0 : 1,
                  transform: sliding
                    ? `translateX(${slideDir === 'left' ? '-32px' : '32px'})`
                    : 'translateX(0)',
                  transition: 'opacity 0.35s ease, transform 0.35s ease',
                }}
              >
                {current.isMobile ? (
                  /* ── 3-Phone Deck (Mobile) ── */
                  <div className="flex items-center justify-center gap-6 py-10 w-full overflow-hidden select-none bg-card/30 dark:bg-slate-950/20 rounded-xl backdrop-blur-md">
                    <div className="max-w-[160px] w-full relative overflow-hidden rounded-[28px] border-[5px] border-slate-800 bg-background shadow-lg rotate-[-5deg] -mr-10 opacity-80 hover:opacity-100 hover:rotate-0 hover:scale-[1.05] hover:z-20 transition-all duration-300 cursor-pointer">
                      <img src="/screenshots/mobile_calendar.png" alt="nA Mobile Calendar" className="w-full h-auto object-cover rounded-[24px]" />
                    </div>
                    <div className="max-w-[200px] w-full relative overflow-hidden rounded-[34px] border-[5px] border-slate-800 bg-background shadow-2xl z-10 hover:scale-[1.05] transition-all duration-300 cursor-pointer">
                      <img src="/screenshots/mobile.png" alt="nA Mobile Home" className="w-full h-auto object-cover rounded-[30px]" />
                    </div>
                    <div className="max-w-[160px] w-full relative overflow-hidden rounded-[28px] border-[5px] border-slate-800 bg-background shadow-lg rotate-[5deg] -ml-10 opacity-80 hover:opacity-100 hover:rotate-0 hover:scale-[1.05] hover:z-20 transition-all duration-300 cursor-pointer">
                      <img src="/screenshots/mobile_detail.png" alt="nA Mobile Detail" className="w-full h-auto object-cover rounded-[24px]" />
                    </div>
                  </div>
                ) : (
                  /* ── Browser Screenshot ── */
                  <div className="group relative overflow-hidden rounded-xl border border-border/80 bg-background shadow-xl w-full">
                    <div className="flex items-center justify-between border-b border-border bg-slate-100/70 dark:bg-slate-900/60 px-3.5 py-2.5 select-none">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                      </div>
                      <div className="rounded-md bg-card border border-border/40 px-4 py-0.5 text-[10px] text-muted/80 font-mono truncate max-w-[260px] w-full text-center">
                        app.natime.vn/{current.id}
                      </div>
                      <div className="w-8 shrink-0" />
                    </div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                      <img
                        src={current.image}
                        alt={t(current.titleVi, current.titleEn)}
                        className="w-full h-full object-cover transform transition duration-500 group-hover:scale-[1.012]"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4 flex gap-1.5 justify-center">
              {featuresList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx, idx > activeTab ? 'left' : 'right')}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeTab ? 'w-8 bg-primary' : 'w-1.5 bg-border hover:bg-primary/40'}`}
                />
              ))}
            </div>
          </div>

          {/* ── Feature Info Panel ── */}
          <div
            className="mt-8 mx-auto max-w-5xl transition-all duration-350 ease-in-out"
            style={{
              opacity: sliding ? 0 : 1,
              transform: sliding
                ? `translateX(${slideDir === 'left' ? '-20px' : '20px'})`
                : 'translateX(0)',
              transition: 'opacity 0.35s ease, transform 0.35s ease',
            }}
          >
            {/* Title + badge */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-indigo-600 text-white shadow-md shadow-primary/20`}>
                {current.icon}
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                {t(current.titleVi, current.titleEn)}
              </h3>
              {current.comingSoon && (
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary dark:bg-primary/20 dark:text-primary-light ring-1 ring-inset ring-primary/20">
                  {t('Sắp ra mắt', 'Coming Soon')}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-muted leading-relaxed mb-5 max-w-3xl">
              {t(current.descVi, current.descEn)}
            </p>

            {/* Bullets */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {current.bulletsVi.map((bullet, bIdx) => (
                <li key={bIdx} className="flex items-start gap-2 rounded-xl border border-border/50 bg-card/50 px-3.5 py-3 text-[12px] text-foreground/80 font-medium backdrop-blur-sm">
                  <svg className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t(bullet, current.bulletsEn[bIdx])}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Feature Nav Tabs ── */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {featuresList.map((feat, idx) => (
              <button
                key={feat.id}
                onClick={() => goTo(idx, idx > activeTab ? 'left' : 'right')}
                className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === idx
                    ? 'border-primary/50 bg-primary/[0.07] text-primary dark:text-primary-light shadow-sm shadow-primary/10'
                    : 'border-border/60 bg-card/40 text-muted hover:text-foreground hover:bg-slate-50 dark:hover:bg-slate-900/30'
                }`}
              >
                <span className={`flex items-center justify-center w-5 h-5 rounded-md transition-all ${activeTab === idx ? 'text-primary' : 'text-muted'}`}>
                  {feat.icon}
                </span>
                {t(feat.titleVi, feat.titleEn)}
                {feat.comingSoon && (
                  <span className="ml-1 rounded-full bg-primary/10 px-1.5 py-0.5 text-[8px] font-bold text-primary dark:bg-primary/20 dark:text-primary-light">
                    {t('Sắp ra mắt', 'Soon')}
                  </span>
                )}
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
