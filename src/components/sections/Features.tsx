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


const previewTabs = [
  {
    labelVi: 'Chấm công thông minh',
    labelEn: 'Smart Attendance',
    image: '/screenshots/attendance.png',
    descVi: 'Ghi nhận và đối soát thời gian vào ca, ra ca của nhân viên. Hệ thống tự động tính toán giờ công, tăng ca, phạt đi muộn/về sớm dựa trên ca làm việc cấu hình sẵn.',
    descEn: 'Track and verify employee check-in and check-out times. Automatically calculate working hours, overtime, and late/early departure penalties based on configured shifts.',
    bulletsVi: [
      'Tự động đối soát ca kíp linh hoạt theo ngày/tuần',
      'Tính toán giờ công, tăng ca thực tế thời gian thực',
      'Phát hiện nhanh các lỗi ca: đi muộn, về sớm, vắng mặt',
      'Xuất báo cáo tổng hợp Excel gửi email tự động'
    ],
    bulletsEn: [
      'Automatic daily/weekly shift matching and rotation',
      'Real-time calculation of actual work hours & overtime',
      'Instant detection of shift violations: late arrival, early out',
      'Auto-export summary Excel reports directly to emails'
    ]
  },
  {
    labelVi: 'Quản lý Thiết bị',
    labelEn: 'Device Management',
    image: '/screenshots/devices.png',
    descVi: 'Giám sát trạng thái hoạt động trực tuyến của hàng chục thiết bị IoT (máy chấm công, đầu đọc khuôn mặt, barie, camera). Đồng bộ dữ liệu ca kíp và vân tay/FaceID từ xa.',
    descEn: 'Monitor the online operational status of dozens of IoT devices (attendance machines, facial readers, barriers, cameras). Sync shift data and fingerprints/FaceID remotely.',
    bulletsVi: [
      'Giám sát trạng thái thiết bị thời gian thực (Online / Offline)',
      'Đồng bộ danh sách vân tay, khuôn mặt và ca kíp xuống thiết bị từ xa',
      'Hỗ trợ cập nhật firmware và đồng bộ thông số mạng hàng loạt',
      'Điều khiển đóng/mở khóa cổng trực tiếp từ trang web quản trị'
    ],
    bulletsEn: [
      'Real-time tracking of device connectivity (Online / Offline)',
      'Remote synchronization of fingerprints, FaceIDs, and shift rules',
      'Batch firmware updates and network parameters alignment',
      'Trigger door/gate unlock signals directly from the admin panel'
    ]
  },
  {
    labelVi: 'Danh sách Tài sản',
    labelEn: 'IT Asset List',
    image: '/screenshots/assets.png',
    descVi: 'Quản lý toàn bộ danh sách thiết bị công nghệ thông tin trong doanh nghiệp (máy tính để bàn, màn hình, RAM, cấu hình phần cứng). Theo dõi thông tin phòng ban đang sử dụng.',
    descEn: 'Manage the entire inventory of information technology assets in the enterprise (desktops, monitors, RAM, hardware specs). Track department usage assignments.',
    bulletsVi: [
      'Lưu trữ chi tiết cấu hình phần cứng (CPU, RAM, SSD/HDD)',
      'Theo dõi vị trí phòng ban và nhân sự chịu trách nhiệm sử dụng',
      'Tạo mã QR/code riêng biệt trên từng tài sản để quét tra cứu nhanh',
      'Bộ lọc tìm kiếm thông minh theo phòng ban và trạng thái tài sản'
    ],
    bulletsEn: [
      'Detailed specifications logging (CPU, RAM, storage, specs)',
      'Track physical department assignment and employee accountability',
      'Generate unique QR codes for instant mobile camera lookup scan',
      'Smart filters by department, category, and current status'
    ]
  },
  {
    labelVi: 'Bàn giao & Thu hồi',
    labelEn: 'Handover & Recovery',
    image: '/screenshots/handover.png',
    descVi: 'Lịch sử chi tiết quy trình cấp phát, bàn giao thiết bị công nghệ cho nhân viên mới và thu hồi lại khi họ nghỉ việc hoặc đổi máy. Đính kèm các văn bản scan biên bản bàn giao.',
    descEn: 'Detailed history logs of tech hardware issuance and handover to new hires, and recovery when they exit or change devices. Attach scan sheets.',
    bulletsVi: [
      'Ghi nhận đầy đủ thời gian và nhân sự thực hiện bàn giao/thu hồi',
      'Upload và lưu trữ file scan biên bản bàn giao để đối chiếu pháp lý',
      'Xuất trực tiếp biên bản bàn giao ra file Word theo mẫu chuẩn',
      'Theo dõi lịch sử di chuyển của tài sản qua nhiều nhân sự'
    ],
    bulletsEn: [
      'Record exact timestamp and staff involved in handover/recovery',
      'Upload and store scan sheets of paper forms for legal reference',
      'Export ready-to-print handover Word files automatically',
      'Trace complete asset ownership lifecycle logs'
    ]
  },
  {
    labelVi: 'Ứng dụng Mobile',
    labelEn: 'Mobile App',
    image: '/screenshots/mobile.png',
    descVi: 'Ứng dụng di động đa nền tảng giúp nhân viên tự chấm công bằng khuôn mặt và GPS Geofencing, theo dõi ca làm việc, ngày công và quản lý đơn từ phép trực tuyến.',
    descEn: 'Cross-platform mobile application enabling employees to check-in via facial recognition and GPS Geofencing, view shift details, days worked, and submit leaves online.',
    bulletsVi: [
      'Chấm công bằng nhận diện khuôn mặt kết hợp định vị GPS',
      'Đăng ký xin nghỉ phép, làm thêm giờ (OT) ngay trên điện thoại',
      'Xem bảng công, lịch làm và chi tiết giờ vào/ra hàng ngày',
      'Quản lý và duyệt đơn từ từ xa dành cho cấp lãnh đạo'
    ],
    bulletsEn: [
      'Facial recognition clock-in matched with GPS location validation',
      'Submit leave requests, overtime (OT) claims right on your phone',
      'View personal timesheets, shift calendars, and daily details',
      'Remote request approval workflow optimized for managers'
    ]
  }
];

export default function Features() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activePreviewTab, setActivePreviewTab] = useState(0);

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

        {/* ── INTERACTIVE SYSTEM PREVIEW SHOWCASE ─────────────── */}
        <div className={`mt-20 lg:mt-28 border-t border-border/80 pt-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="mx-auto max-w-3xl text-center mb-10">
            <span className="text-xs uppercase font-mono tracking-widest text-primary font-bold">{t('GIAO DIỆN HỆ THỐNG', 'SYSTEM INTERFACE')}</span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl mt-2 tracking-tight">
              {t('Khám phá phân hệ thực tế của nATime', 'Explore nATime Live Modules')}
            </h3>
            <p className="mt-3 text-sm text-muted">
              {t(
                'Hình ảnh giao diện làm việc trực quan từ các phân hệ chức năng cốt lõi đang vận hành trong hệ thống.',
                'Actual screenshots from the core system modules actively running in the enterprise portal.'
              )}
            </p>
          </div>

          {/* Tab Switcher Headers */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-10 max-w-3xl mx-auto">
            {previewTabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActivePreviewTab(idx)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  activePreviewTab === idx
                    ? 'bg-primary text-white shadow-md shadow-primary/15'
                    : 'bg-card text-muted border border-border/60 hover:text-foreground hover:bg-slate-50 dark:hover:bg-slate-900/40'
                }`}
              >
                {t(tab.labelVi, tab.labelEn)}
              </button>
            ))}
          </div>

          {/* Active Tab Panel Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-card/45 dark:bg-card/5 border border-border/60 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
            {/* Left side details */}
            <div className="lg:col-span-5 space-y-5">
              <span className="inline-flex items-center rounded-md bg-indigo-500/10 px-2.5 py-0.5 text-xs font-bold text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
                {t(previewTabs[activePreviewTab].labelVi, previewTabs[activePreviewTab].labelEn)}
              </span>
              <p className="text-sm text-muted leading-relaxed">
                {t(previewTabs[activePreviewTab].descVi, previewTabs[activePreviewTab].descEn)}
              </p>
              <ul className="space-y-2.5 text-xs text-foreground/80">
                {previewTabs[activePreviewTab].bulletsVi.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2.5">
                    <svg className="h-4 w-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{t(bullet, previewTabs[activePreviewTab].bulletsEn[bIdx])}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right side image browser/phone frame */}
            <div className="lg:col-span-7 flex justify-center w-full">
              {previewTabs[activePreviewTab].image === '/screenshots/mobile.png' ? (
                <div className="max-w-[240px] w-full relative overflow-hidden rounded-[36px] border-[5px] border-slate-800 bg-background shadow-2xl aspect-[9/18.5]">
                  {/* Notch */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4.5 bg-slate-800 rounded-full z-20" />
                  <img
                    src="/screenshots/mobile.png"
                    alt="nA Mobile App"
                    className="w-full h-auto object-cover select-none relative z-10 rounded-[30px]"
                  />
                </div>
              ) : (
                <div className="group relative overflow-hidden rounded-xl border border-border/80 bg-background shadow-lg transition-all duration-300 w-full">
                  {/* Browser top header */}
                  <div className="flex items-center justify-between border-b border-border bg-slate-100/60 dark:bg-slate-900/50 px-3 py-2 select-none">
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="h-2 w-2 rounded-full bg-red-400/80" />
                      <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
                      <span className="h-2 w-2 rounded-full bg-green-400/80" />
                    </div>
                    <div className="rounded-md bg-card border border-border/40 px-3 py-0.5 text-[9px] text-muted/80 font-mono truncate max-w-[180px] w-full text-center">
                      app.natime.vn/dashboard
                    </div>
                    <div className="w-6 shrink-0" />
                  </div>
                  {/* Screenshot image */}
                  <img
                    src={previewTabs[activePreviewTab].image}
                    alt={previewTabs[activePreviewTab].labelEn}
                    className="w-full h-auto object-cover select-none"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
