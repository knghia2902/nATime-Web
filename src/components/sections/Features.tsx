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
  comingSoon?: boolean;
  bulletsVi: string[];
  bulletsEn: string[];
}

export default function Features() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // SVG Icons
  const clockIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );

  const shieldIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );

  const cpuIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
    </svg>
  );

  const usersIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );

  const truckIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 3h15v13H1z" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );

  const laptopIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 8h4" />
      <path d="M7 11h2" />
    </svg>
  );

  const chartIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2" />
      <path d="M18 20V10" />
      <path d="M12 20V4" />
      <path d="M6 20v-6" />
    </svg>
  );

  const phoneIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M12 18h.01" />
      <path d="M9 6h6" />
    </svg>
  );

  const featuresList: FeatureItem[] = [
    {
      id: 'attendance',
      titleVi: 'Chấm công thông minh',
      titleEn: 'Smart Attendance',
      image: '/screenshots/attendance.png',
      descVi: 'Ghi nhận và đối soát thời gian vào ca, ra ca của nhân sự. Hệ thống tự động tính toán giờ công, tăng ca, phạt đi muộn/về sớm dựa trên ca làm việc cấu hình sẵn.',
      descEn: 'Track and verify employee check-in and check-out times. Automatically calculate working hours, overtime, and late/early departure penalties based on configured shifts.',
      icon: clockIcon,
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
      id: 'gate',
      titleVi: 'Kiểm soát Cổng ra vào',
      titleEn: 'Gate Access Control',
      image: '/screenshots/devices.png',
      comingSoon: true,
      descVi: 'Tích hợp barrier, cổng xoay, nhận diện biển số (ANPR). Quản lý khách ra vào, phân quyền khu vực linh hoạt theo thời gian thực.',
      descEn: 'Integrated barriers, turnstiles, and ANPR plate recognition. Visitor management with flexible zone-based access permissions in real time.',
      icon: shieldIcon,
      bulletsVi: [
        'Tích hợp barie, cổng xoay tripod và kiểm soát cửa',
        'Đồng bộ ca kíp và phân quyền ra vào của nhân sự',
        'Giám sát lịch sử quét thẻ và trạng thái rơ-le từ xa',
        'Cảnh báo đột nhập và mở cửa trái phép tức thời'
      ],
      bulletsEn: [
        'Integrate barriers, tripod turnstiles & door locks',
        'Sync shifts and staff access permissions remotely',
        'Monitor remote swipe logs and relay status',
        'Instant intrusion and unauthorized door open alerts'
      ]
    },
    {
      id: 'devices',
      titleVi: 'Quản lý Thiết bị',
      titleEn: 'Device Management',
      image: '/screenshots/devices.png',
      descVi: 'Giám sát trạng thái hoạt động trực tuyến của hàng chục thiết bị IoT (máy chấm công, đầu đọc khuôn mặt, barie, camera). Đồng bộ dữ liệu ca kíp và vân tay/FaceID từ xa.',
      descEn: 'Monitor the online operational status of dozens of IoT devices (attendance machines, facial readers, barriers, cameras). Sync shift data and fingerprints/FaceID remotely.',
      icon: cpuIcon,
      bulletsVi: [
        'Giám sát trạng thái thiết bị thời gian thực (Online / Offline)',
        'Đồng bộ danh sách vân tay, khuôn mặt và ca kíp xuống thiết bị từ xa',
        'Hỗ trợ cập nhật firmware và cấu hình thông số mạng hàng loạt',
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
      id: 'contractors',
      titleVi: 'Nhà thầu & Khách',
      titleEn: 'Contractors & Visitors',
      image: '/screenshots/handover.png',
      descVi: 'Quản lý nhân viên nhà thầu, dự án, tài sản mang vào. Đăng ký khách online, cấp thẻ tạm thời, theo dõi lịch sử ra vào chi tiết.',
      descEn: 'Manage contractor staff, projects, and asset tracking. Online visitor registration, temporary pass issuance, and detailed entry/exit history.',
      icon: usersIcon,
      bulletsVi: [
        'Quản lý nhân viên nhà thầu, dự án và thiết bị mang vào',
        'Đăng ký thông tin khách vãng lai, cấp thẻ tạm thời',
        'Đối soát lịch sử ra vào chi tiết tại từng chốt an ninh',
        'Phê duyệt trực tuyến danh sách nhân sự nhà thầu'
      ],
      bulletsEn: [
        'Manage contractor staff, projects, and incoming tools',
        'Visitor pre-registration and temporary pass issuance',
        'Reconcile detailed entry/exit history at security posts',
        'Online approval workflow for contractor personnel list'
      ]
    },
    {
      id: 'weighbridge',
      titleVi: 'Cân xe / Trạm cân',
      titleEn: 'Weighbridge',
      image: '/screenshots/dashboard.png',
      comingSoon: true,
      descVi: 'Tích hợp cân điện tử, tự động ghi nhận khối lượng. Liên kết đơn hàng giao nhận, chống gian lận với camera giám sát.',
      descEn: 'Integrated electronic scales with automatic weight recording. Linked delivery orders with anti-fraud surveillance camera verification.',
      icon: truckIcon,
      bulletsVi: [
        'Tự động ghi nhận cân nặng từ đầu cân điện tử',
        'Liên kết thông tin phiếu cân với đơn hàng giao nhận',
        'Chụp ảnh phương tiện và nhận diện biển số chống gian lận',
        'Đối chiếu chênh lệch khối lượng đầu vào và đầu ra'
      ],
      bulletsEn: [
        'Automatically log weight values from scale indicators',
        'Link weight tickets with active delivery orders',
        'Vehicle snapshot & plate recognition to prevent fraud',
        'Reconcile weight discrepancies between entry and exit'
      ]
    },
    {
      id: 'assets',
      titleVi: 'Tài sản CNTT',
      titleEn: 'IT Asset Management',
      image: '/screenshots/assets.png',
      descVi: 'Quản lý toàn bộ danh sách thiết bị công nghệ thông tin trong doanh nghiệp (máy tính để bàn, màn hình, RAM, cấu hình phần cứng). Theo dõi thông tin phòng ban đang sử dụng.',
      descEn: 'Manage the entire inventory of information technology assets in the enterprise (desktops, monitors, RAM, hardware specs). Track department usage assignments.',
      icon: laptopIcon,
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
      id: 'reports',
      titleVi: 'Báo cáo & Phân tích',
      titleEn: 'Reports & Analytics',
      image: '/screenshots/dashboard.png',
      descVi: 'Dashboard phân tích realtime, biểu đồ trực quan. Xuất báo cáo Excel/PDF tự động, lịch sử dữ liệu chi tiết theo thời gian.',
      descEn: 'Real-time analytics dashboards with rich visualizations. Automated Excel/PDF report exports and detailed historical data timelines.',
      icon: chartIcon,
      bulletsVi: [
        'Dashboard phân tích realtime với biểu đồ trực quan',
        'Xuất báo cáo công Excel/PDF tự động định kỳ',
        'Theo dõi lịch sử dữ liệu chi tiết theo dòng thời gian',
        'Báo cáo hiệu suất thiết bị và tỉ lệ đi làm đúng giờ'
      ],
      bulletsEn: [
        'Real-time analytics dashboards with rich charts',
        'Automated Excel/PDF timesheet report exports',
        'Trace complete historical data timelines',
        'Device performance and on-time attendance rate reports'
      ]
    },
    {
      id: 'mobile',
      titleVi: 'Ứng dụng Mobile',
      titleEn: 'Mobile App',
      image: '/screenshots/mobile.png',
      descVi: 'Ứng dụng di động đa nền tảng giúp nhân viên theo dõi lịch làm việc, ngày công thực tế, tra cứu lịch sử chấm công và quản lý đơn từ phép trực tuyến, quét QR tại thiết bị.',
      descEn: 'Cross-platform mobile application enabling employees to view work schedules, actual timesheets, check logs, and manage leaves, with QR scanning at devices.',
      icon: phoneIcon,
      bulletsVi: [
        'Theo dõi lịch làm việc và ngày công chi tiết hàng tháng',
        'Xem thời gian vào/ra thực tế, số giờ công và số phút đi muộn',
        'Đăng ký xin nghỉ phép, làm thêm giờ (OT) ngay trên điện thoại',
        'Tra cứu lịch sử chấm công và trạng thái kết nối của thiết bị'
      ],
      bulletsEn: [
        'View personal work schedules and monthly attendance details',
        'Track actual clock-in/out times, hours worked, and late minutes',
        'Submit leave requests and overtime (OT) claims on your phone',
        'Check personal attendance logs and device connection status'
      ]
    }
  ];

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
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.03] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-primary/[0.04] blur-3xl" />
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
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {/* Badge */}
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary dark:border-primary/20 dark:bg-primary/10 dark:text-primary-light"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            {t('Nền tảng toàn diện', 'Comprehensive Platform')}
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl lg:text-5xl">
            {t('Tính năng nổi bật', 'Key Features')}
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-xl">
            {t(
              'Khám phá giao diện hệ thống trực quan sinh động từ các phân hệ chức năng cốt lõi của nATime.',
              'Explore intuitive live interfaces from the core system modules of nATime.'
            )}
          </p>
        </div>

        {/* ── UNIFIED FEATURES & SHOWCASE SECTION ── */}
        <div className={`mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          
          {/* Left Column: Interactive Feature Selector (Tabs) */}
          <div className="lg:col-span-4 space-y-4">
            {featuresList.map((feature, idx) => {
              const isActive = activeTab === idx;
              return (
                <div
                  key={feature.id}
                  onClick={() => setActiveTab(idx)}
                  className={`group relative flex flex-col items-start gap-3 rounded-2xl border p-5 backdrop-blur-xl transition-all duration-300 cursor-pointer select-none ${
                    isActive
                      ? 'border-primary/50 bg-primary/[0.03] dark:bg-primary/[0.02] shadow-lg shadow-primary/5'
                      : 'border-border/60 bg-card/40 hover:bg-slate-50 dark:hover:bg-slate-900/30'
                  }`}
                >
                  {/* Left highlight bar on active */}
                  {isActive && (
                    <div className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full bg-primary" />
                  )}
                  
                  {/* Icon & Title row */}
                  <div className="flex items-center gap-3.5 w-full">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br transition-all duration-300 ${
                        isActive
                          ? 'from-primary to-indigo-600 text-white shadow-md shadow-primary/20 scale-105'
                          : 'from-slate-100 to-slate-200 text-slate-600 dark:from-slate-800 dark:to-slate-900 dark:text-slate-400 group-hover:scale-105'
                      }`}
                    >
                      {feature.icon}
                    </div>
                    <div className="flex-grow flex items-center justify-between gap-2">
                      <h3 className={`font-semibold leading-tight transition-colors duration-300 ${
                        isActive ? 'text-primary dark:text-primary-light' : 'text-slate-800 dark:text-slate-200 group-hover:text-foreground'
                      }`}>
                        {t(feature.titleVi, feature.titleEn)}
                      </h3>
                      {feature.comingSoon && (
                        <span className="inline-flex shrink-0 items-center rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary dark:bg-primary/20 dark:text-primary-light ring-1 ring-inset ring-primary/20 border border-primary/10">
                          {t('Sắp ra mắt', 'Soon')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expanded description on active */}
                  <div className={`transition-all duration-300 overflow-hidden ${
                    isActive ? 'max-h-[300px] opacity-100 mt-2' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}>
                    <p className="text-xs text-muted leading-relaxed mb-3.5 pl-[52px]">
                      {t(feature.descVi, feature.descEn)}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-[52px] text-[11px] text-foreground/80 font-medium">
                      {feature.bulletsVi.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-1.5">
                          <svg className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{t(bullet, feature.bulletsEn[bIdx])}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mobile-only inline preview screenshot */}
                  <div className={`lg:hidden w-full transition-all duration-300 overflow-hidden ${
                    isActive ? 'max-h-[450px] opacity-100 mt-4' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}>
                    <div className="border-t border-border/40 pt-4 flex justify-center w-full">
                      {feature.image === '/screenshots/mobile.png' ? (
                        <div className="flex items-center justify-center gap-2 py-2 w-full overflow-hidden select-none">
                          {/* Phone 1: Calendar */}
                          <div className="max-w-[85px] w-full relative overflow-hidden rounded-[16px] border-[2.5px] border-slate-800 bg-background shadow-lg rotate-[-4deg] -mr-4 opacity-85">
                            <img src="/screenshots/mobile_calendar.png" alt="nA Mobile Calendar" className="w-full h-auto object-cover rounded-[14px]" />
                          </div>
                          {/* Phone 2: Main Home */}
                          <div className="max-w-[105px] w-full relative overflow-hidden rounded-[20px] border-[3px] border-slate-800 bg-background shadow-xl z-10">
                            <img src="/screenshots/mobile.png" alt="nA Mobile Home" className="w-full h-auto object-cover rounded-[17px]" />
                          </div>
                          {/* Phone 3: Details */}
                          <div className="max-w-[85px] w-full relative overflow-hidden rounded-[16px] border-[2.5px] border-slate-800 bg-background shadow-lg rotate-[4deg] -ml-4 opacity-85">
                            <img src="/screenshots/mobile_detail.png" alt="nA Mobile Detail" className="w-full h-auto object-cover rounded-[14px]" />
                          </div>
                        </div>
                      ) : (
                        <div className="group relative overflow-hidden rounded-xl border border-border/80 bg-background shadow-lg w-full max-w-[400px]">
                          {/* Browser bar */}
                          <div className="flex items-center justify-between border-b border-border bg-slate-100/60 dark:bg-slate-900/50 px-2 py-1 select-none">
                            <div className="flex items-center gap-0.5 shrink-0">
                              <span className="h-1.5 w-1.5 rounded-full bg-red-400/80" />
                              <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/80" />
                              <span className="h-1.5 w-1.5 rounded-full bg-green-400/80" />
                            </div>
                            <div className="rounded bg-card border border-border/40 px-2 py-0.5 text-[8px] text-muted/80 font-mono truncate text-center">
                              app.natime.vn/{feature.id}
                            </div>
                            <div className="w-4 shrink-0" />
                          </div>
                          <img src={feature.image} alt={t(feature.titleVi, feature.titleEn)} className="w-full h-auto object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Large Desktop Preview Frame (Sticky) */}
          <div className="hidden lg:block lg:col-span-8 sticky top-24">
            <div className="relative rounded-2xl overflow-hidden p-2 bg-gradient-to-tr from-slate-200 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 border border-border/60 shadow-inner">
              
              {featuresList[activeTab].image === '/screenshots/mobile.png' ? (
                <div className="flex items-center justify-center gap-6 py-12 w-full overflow-hidden select-none bg-card/30 dark:bg-slate-950/20 rounded-xl backdrop-blur-md">
                  {/* Phone 1: Calendar */}
                  <div className="max-w-[170px] w-full relative overflow-hidden rounded-[28px] border-[5px] border-slate-800 bg-background shadow-lg rotate-[-5deg] -mr-10 opacity-80 hover:opacity-100 hover:rotate-0 hover:scale-[1.05] hover:z-20 transition-all duration-300 cursor-pointer">
                    <img
                      src="/screenshots/mobile_calendar.png"
                      alt="nA Mobile Calendar"
                      className="w-full h-auto object-cover relative z-10 rounded-[24px]"
                    />
                  </div>

                  {/* Phone 2: Main Home */}
                  <div className="max-w-[210px] w-full relative overflow-hidden rounded-[34px] border-[5px] border-slate-800 bg-background shadow-2xl z-10 hover:scale-[1.05] transition-all duration-300 cursor-pointer">
                    <img
                      src="/screenshots/mobile.png"
                      alt="nA Mobile Home"
                      className="w-full h-auto object-cover relative z-10 rounded-[30px]"
                    />
                  </div>

                  {/* Phone 3: Details */}
                  <div className="max-w-[170px] w-full relative overflow-hidden rounded-[28px] border-[5px] border-slate-800 bg-background shadow-lg rotate-[5deg] -ml-10 opacity-80 hover:opacity-100 hover:rotate-0 hover:scale-[1.05] hover:z-20 transition-all duration-300 cursor-pointer">
                    <img
                      src="/screenshots/mobile_detail.png"
                      alt="nA Mobile Detail"
                      className="w-full h-auto object-cover relative z-10 rounded-[24px]"
                    />
                  </div>
                </div>
              ) : (
                <div className="group relative overflow-hidden rounded-xl border border-border/80 bg-background shadow-2xl transition-all duration-300 w-full">
                  {/* Browser top header */}
                  <div className="flex items-center justify-between border-b border-border bg-slate-100/60 dark:bg-slate-900/50 px-3.5 py-2.5 select-none">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                    </div>
                    <div className="rounded-md bg-card border border-border/40 px-4 py-0.5 text-[10px] text-muted/80 font-mono truncate max-w-[220px] w-full text-center">
                      app.natime.vn/{featuresList[activeTab].id}
                    </div>
                    <div className="w-8 shrink-0" />
                  </div>
                  {/* Screenshot image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                    <img
                      src={featuresList[activeTab].image}
                      alt={t(featuresList[activeTab].titleVi, featuresList[activeTab].titleEn)}
                      className="w-full h-auto object-cover transform transition duration-500 group-hover:scale-[1.015]"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
