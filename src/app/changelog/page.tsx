'use client';

import { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Icons for tag labels
function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l-1.81-5.096L2.1 14.1 7.19 13.2l.9-5.1 1.81 5.1 5.09 1.8-5.09 1.804zM19.071 5.929l-.929 2.571-.929-2.571-2.571-.929 2.571-.929.929-2.571.929 2.571 2.571.929-2.571.929z" />
    </svg>
  );
}

function TrendingUpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.94" />
    </svg>
  );
}

function WrenchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.67 2.67 0 1021 17.25l-5.83-5.83m-3.75 3.75L14.25 12M11.42 15.17l-4.15-4.15m0 0L3 15.25a2.67 2.67 0 103.75-3.75l5.83-5.83m-5.83 5.83L6 14.25m3.75-3.75L12 14.25m-2.25-2.25l5.83-5.83m0 0a2.67 2.67 0 10-3.75-3.75l-5.83 5.83m5.83-5.83L14.25 6" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
    </svg>
  );
}

interface TranslationItem {
  vi: string;
  en: string;
}

interface ChangelogItem {
  tag: 'new' | 'improved' | 'fixed';
  text: TranslationItem;
}

interface ChangelogVersion {
  version: string;
  date: TranslationItem;
  title: TranslationItem;
  type: 'official' | 'beta' | 'alpha';
  description: TranslationItem;
  changes: ChangelogItem[];
}

const changelogData: ChangelogVersion[] = [
  {
    version: 'v1.0.0',
    date: { vi: 'Q3/2026', en: 'Q3/2026' },
    title: { vi: 'Phiên bản Chính thức', en: 'Official Release' },
    type: 'official',
    description: {
      vi: 'Bản phát hành chính thức: Tái cấu trúc sạch hoàn toàn (Clean-room rewrite), hỗ trợ API web chạy trên .NET 10.0, ứng dụng máy trạm Vue 3, ứng dụng di động Android native Capacitor, hỗ trợ các dòng thiết bị Hikvision & ZKTeco, mã hóa thiết bị AES-256 và tối ưu hóa hiệu năng vượt trội.',
      en: 'Official Release: Complete clean-room rewrite, net10.0 web API, Vue 3 desktop app, Capacitor Android App, Hikvision & ZKTeco support, AES-256 device encryption, and significant performance speedups.'
    },
    changes: [
      {
        tag: 'new',
        text: {
          vi: 'Hệ thống Web API xây dựng độc lập trên nền tảng .NET 10.0, tối ưu hóa xử lý hàng chục ngàn thiết bị kết nối song song.',
          en: 'Web API engineered independently on .NET 10.0, optimized to manage tens of thousands of parallel device connections.'
        }
      },
      {
        tag: 'new',
        text: {
          vi: 'Ứng dụng di động Android biên dịch native qua Capacitor, tối ưu hóa định vị GPS chuẩn xác và Geofencing chấm công.',
          en: 'Native Android App compiled via Capacitor, optimizing precise GPS positioning and geofencing for attendance tracking.'
        }
      },
      {
        tag: 'new',
        text: {
          vi: 'Ứng dụng desktop cho các máy trạm giám sát và đăng ký vân tay/thẻ, xây dựng trên Vue 3 và Electron siêu nhẹ.',
          en: 'Lightweight desktop monitoring and biometric registration workstation app built with Vue 3 and Electron.'
        }
      },
      {
        tag: 'new',
        text: {
          vi: 'Tích hợp SDK gốc độc lập hỗ trợ thiết bị của Hikvision & ZKTeco, không phụ thuộc phần mềm trung gian.',
          en: 'Native SDK integrations for Hikvision & ZKTeco devices, completely independent of legacy middleware.'
        }
      },
      {
        tag: 'improved',
        text: {
          vi: 'Áp dụng mã hóa AES-256 cho toàn bộ dữ liệu lưu trữ trên thiết bị đầu cuối và các kênh truyền thông điệp.',
          en: 'Applied AES-256 encryption standard for all edge device storage and messaging channels.'
        }
      },
      {
        tag: 'improved',
        text: {
          vi: 'Tối ưu hóa công cụ tính toán và xuất báo cáo chấm công tháng, giảm thời gian xử lý xuống gấp 5 lần.',
          en: 'Optimized calculation engine for monthly attendance reports, cutting processing times by 5x.'
        }
      },
      {
        tag: 'fixed',
        text: {
          vi: 'Khắc phục triệt để sự cố ngắt kết nối Socket định kỳ xảy ra trên một số dòng máy chấm công Hikvision cũ.',
          en: 'Resolved socket connection drops periodically observed on legacy Hikvision terminal lines.'
        }
      },
      {
        tag: 'fixed',
        text: {
          vi: 'Sửa lỗi lệch múi giờ khi đồng bộ hóa nhật ký chấm công từ các chi nhánh có chênh lệch thời gian vùng miền.',
          en: 'Fixed timezone offset bugs when synchronizing attendance logs from multi-region branch locations.'
        }
      }
    ]
  },
  {
    version: 'v0.9.0',
    date: { vi: 'Q2/2026', en: 'Q2/2026' },
    title: { vi: 'Phiên bản Thử nghiệm (Beta)', en: 'Beta Release' },
    type: 'beta',
    description: {
      vi: 'Bản phát hành thử nghiệm: Ra mắt các phân hệ kiểm soát cổng (Gate Access Control) nâng cao, kiểm soát trạm cân và cân xe tự động, kiểm kê tài sản CNTT tự động và tích hợp hệ thống kiểm thử toàn diện.',
      en: 'Beta Release: Advanced Gate & Weighbridge modules, IT Asset audits, integration tests, and automated calculation scheduler.'
    },
    changes: [
      {
        tag: 'new',
        text: {
          vi: 'Phân hệ Kiểm soát Cổng ra vào (Gate Access Control) nâng cao hỗ trợ quản lý quyền hạn theo nhóm và khoảng thời gian linh hoạt.',
          en: 'Advanced Gate Access Control module supporting group permissions and customizable time slots.'
        }
      },
      {
        tag: 'new',
        text: {
          vi: 'Phân hệ Trạm cân & Cân xe tự động, tích hợp camera ANPR nhận dạng biển số tự động thời gian thực.',
          en: 'Automated Weighbridge and vehicle scale module integrating real-time ANPR license plate recognition.'
        }
      },
      {
        tag: 'new',
        text: {
          vi: 'Phân hệ Quản lý & Kiểm toán Tài sản CNTT (IT Asset Management) tự động kiểm kê cấu hình qua Agent cài đặt trên máy trạm.',
          en: 'IT Asset Management and Audit module with automated client-agent configuration inventory tracking.'
        }
      },
      {
        tag: 'new',
        text: {
          vi: 'Bộ lập lịch tự động tính toán dữ liệu chấm công thời gian thực (Automated Calculation Scheduler).',
          en: 'Automated Calculation Scheduler processing real-time attendance logs continuously.'
        }
      },
      {
        tag: 'improved',
        text: {
          vi: 'Tích hợp bộ kiểm thử tự động (Integration Tests) giả lập luồng dữ liệu 1,000+ thiết bị đồng thời gửi nhật ký.',
          en: 'Integrated automated testing suite capable of simulating concurrent log streams from 1,000+ virtual devices.'
        }
      },
      {
        tag: 'fixed',
        text: {
          vi: 'Sửa lỗi tràn bộ nhớ đệm cache khi nhận lượng lớn dữ liệu thô liên tục từ trạm cân trong khu vực cao điểm.',
          en: 'Fixed buffer cache memory leaks during high-frequency raw data ingestion from weighbridges at peak hours.'
        }
      },
      {
        tag: 'fixed',
        text: {
          vi: 'Khắc phục xung đột phân quyền ưu tiên đối với tài khoản phụ của quản trị viên chi nhánh.',
          en: 'Resolved priority permission overrides for local branch administrator accounts.'
        }
      }
    ]
  },
  {
    version: 'v0.8.0',
    date: { vi: 'Q1/2026', en: 'Q1/2026' },
    title: { vi: 'Phiên bản Thử nghiệm Nội bộ (Alpha)', en: 'Alpha Release' },
    type: 'alpha',
    description: {
      vi: 'Bản phát hành nội bộ: Thiết lập sơ đồ cơ sở dữ liệu quan hệ, xây dựng ranh giới di trú sạch (Migration Boundary Setup) và các bộ giải quyết tham chiếu (Reference Resolvers) độc lập.',
      en: 'Alpha Release: Main database schema design, migration boundary setup, and clean-room reference resolvers.'
    },
    changes: [
      {
        tag: 'new',
        text: {
          vi: 'Thiết kế chi tiết sơ đồ cơ sở dữ liệu quan hệ tối ưu hóa cho lưu trữ lượng dữ liệu chuỗi thời gian khổng lồ.',
          en: 'Primary relational database schema design optimized for high-volume time-series log entries.'
        }
      },
      {
        tag: 'new',
        text: {
          vi: 'Xây dựng ranh giới di trú dữ liệu độc lập (Migration Boundary Setup) nhằm ngăn ngừa lây nhiễm mã nguồn legacy từ hệ thống cũ.',
          en: 'Established independent data migration boundaries to securely transition from legacy systems.'
        }
      },
      {
        tag: 'new',
        text: {
          vi: 'Triển khai các bộ giải quyết tham chiếu sạch (Clean-room Reference Resolvers) đảm bảo mã nguồn tuân thủ tiêu chuẩn độc lập bản quyền.',
          en: 'Implementation of clean-room reference resolvers ensuring zero legacy code contamination.'
        }
      },
      {
        tag: 'improved',
        text: {
          vi: 'Thiết lập quy trình CI/CD tích hợp hệ thống kiểm tra tiêu chuẩn mã nguồn sạch tự động.',
          en: 'Established automated CI/CD pipelines checking for code cleanliness and compliance rules.'
        }
      },
      {
        tag: 'fixed',
        text: {
          vi: 'Khắc phục các cảnh báo bảo mật ban đầu đối với thư viện mã hóa dữ liệu.',
          en: 'Addressed initial dependency security warnings within database helper libraries.'
        }
      },
      {
        tag: 'fixed',
        text: {
          vi: 'Sửa lỗi khởi tạo ban đầu khi cấu hình môi trường phát triển cục bộ bằng Docker.',
          en: 'Fixed initialization bottlenecks during local Docker development setups.'
        }
      }
    ]
  }
];

export default function ChangelogPage() {
  const { t, locale } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'new' | 'improved' | 'fixed'>('all');
  const [hoveredVersion, setHoveredVersion] = useState<string | null>(null);

  // Set document title dynamically
  useEffect(() => {
    document.title = t('Nhật ký Thay đổi - nATime', 'Changelog - nATime');
  }, [locale, t]);

  // Compute filtered versions and changes
  const filteredVersions = useMemo(() => {
    return changelogData
      .map((ver) => {
        const matchingChanges = ver.changes.filter((change) => {
          const matchesTag =
            activeFilter === 'all' ||
            (activeFilter === 'new' && change.tag === 'new') ||
            (activeFilter === 'improved' && change.tag === 'improved') ||
            (activeFilter === 'fixed' && change.tag === 'fixed');

          const viText = change.text.vi.toLowerCase();
          const enText = change.text.en.toLowerCase();
          const q = searchQuery.toLowerCase().trim();
          const matchesSearch =
            q === '' || viText.includes(q) || enText.includes(q);

          return matchesTag && matchesSearch;
        });

        return {
          ...ver,
          changes: matchingChanges,
        };
      })
      .filter((ver) => ver.changes.length > 0);
  }, [activeFilter, searchQuery]);

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full bg-background text-foreground transition-colors duration-300 relative overflow-hidden pt-20">
        {/* Glow backgrounds */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none -z-10 animate-pulse" />
        <div className="absolute top-[30%] right-1/4 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none -z-10" />

        {/* Section 1: Hero Banner */}
        <section className="relative px-6 pt-16 pb-8 flex flex-col items-center text-center max-w-4xl mx-auto z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary-light dark:bg-primary-light/10 text-primary mb-6 animate-fade-in-up">
            <SparklesIcon className="w-4 h-4" />
            <span>{t('Nhật ký Thay đổi', 'Product Changelog')}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up text-gradient">
            {t('Hành trình Phát triển nATime', 'The Evolution of nATime')}
          </h1>

          <p className="text-lg text-muted max-w-2xl leading-relaxed mb-8 animate-fade-in-up delay-100">
            {t(
              'Theo dõi các phiên bản cập nhật tính năng mới, cải tiến hiệu năng và sửa lỗi của giải pháp Chấm công & Kiểm soát Ra vào Thông minh nATime.',
              'Track updates, new features, performance enhancements, and bug-fixes of the nATime Smart Time Attendance & Access Control platform.'
            )}
          </p>
        </section>

        {/* Section 2: Filters */}
        <section className="max-w-5xl mx-auto px-6 mb-16 z-10 relative">
          <div className="glass p-4 rounded-2xl border border-border flex flex-col md:flex-row gap-4 items-center justify-between shadow-lg">
            {/* Search Box */}
            <div className="relative w-full md:w-96">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder={t('Tìm kiếm bản cập nhật...', 'Search updates...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/45 transition-all duration-300 placeholder:text-muted"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground text-xs p-1 rounded-full hover:bg-muted/15 transition-colors"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {(['all', 'new', 'improved', 'fixed'] as const).map((filter) => {
                const label = {
                  all: t('Tất cả', 'All'),
                  new: t('Tính năng mới', 'New'),
                  improved: t('Cải tiến', 'Improved'),
                  fixed: t('Sửa lỗi', 'Fixed'),
                }[filter];

                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-primary text-white shadow-md shadow-primary/20'
                        : 'bg-background hover:bg-card-hover text-muted hover:text-foreground border border-border'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Result Summary */}
          {searchQuery && (
            <div className="mt-4 text-sm text-muted animate-fade-in-up px-2 flex justify-between items-center">
              <span>
                {t(
                  `Tìm thấy ${filteredVersions.reduce((acc, v) => acc + v.changes.length, 0)} thay đổi phù hợp cho "${searchQuery}"`,
                  `Found ${filteredVersions.reduce((acc, v) => acc + v.changes.length, 0)} changes matching "${searchQuery}"`
                )}
              </span>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="text-xs text-primary hover:underline font-semibold cursor-pointer"
              >
                {t('Đặt lại bộ lọc', 'Reset filters')}
              </button>
            </div>
          )}
        </section>

        {/* Section 3: Timeline */}
        <section className="max-w-5xl mx-auto px-6 relative pb-32">
          {/* Vertical line running down */}
          <div className="absolute left-[20px] md:left-[180px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary via-indigo-500/40 to-border/10 pointer-events-none -z-10" />

          {filteredVersions.length === 0 ? (
            <div className="text-center py-20 bg-card border border-border rounded-2xl max-w-2xl mx-auto shadow-sm">
              <div className="w-16 h-16 bg-muted/10 rounded-full flex items-center justify-center mx-auto mb-4 text-muted">
                <SearchIcon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {t('Không tìm thấy kết quả', 'No changes found')}
              </h3>
              <p className="text-sm text-muted max-w-sm mx-auto mb-6">
                {t(
                  'Không tìm thấy thay đổi nào phù hợp với bộ lọc hoặc từ khóa tìm kiếm của bạn. Vui lòng thử lại.',
                  'We couldn\'t find any changelog entries matching your criteria. Try adjusting your search query or filters.'
                )}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-hover shadow-md transition-all duration-300 cursor-pointer"
              >
                {t('Đặt lại bộ lọc', 'Reset filters')}
              </button>
            </div>
          ) : (
            <div className="space-y-16">
              {filteredVersions.map((ver) => (
                <div
                  key={ver.version}
                  className="relative grid grid-cols-1 md:grid-cols-[160px_40px_1fr] gap-4 group"
                  onMouseEnter={() => setHoveredVersion(ver.version)}
                  onMouseLeave={() => setHoveredVersion(null)}
                >
                  {/* Left details: Version and release window */}
                  <div className="pl-12 md:pl-0 md:text-right flex flex-col justify-start md:pt-4">
                    <span className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                      {ver.version}
                    </span>
                    <div className="flex items-center gap-1.5 md:justify-end text-sm text-muted font-medium mt-1">
                      <CalendarIcon className="w-4 h-4 text-muted/70" />
                      <span>{t(ver.date)}</span>
                    </div>

                    {/* Release Type Badge */}
                    <div className="mt-3 flex md:justify-end">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                        ver.type === 'official'
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400'
                          : ver.type === 'beta'
                          ? 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20 dark:bg-indigo-500/20 dark:text-indigo-400'
                          : 'bg-amber-500/10 text-amber-500 border-amber-500/20 dark:bg-amber-500/20 dark:text-amber-400'
                      }`}>
                        {ver.type === 'official'
                          ? t('Bản chính thức', 'Official Release')
                          : ver.type === 'beta'
                          ? t('Bản Beta', 'Beta Release')
                          : t('Bản Alpha', 'Alpha Release')}
                      </span>
                    </div>
                  </div>

                  {/* Middle timeline dot indicator */}
                  <div className="absolute left-[12px] md:relative md:left-0 flex justify-center pt-5 md:pt-6">
                    <div className="relative">
                      {/* Outer pulsing halo */}
                      <div className={`absolute -inset-2.5 rounded-full bg-primary/20 opacity-0 scale-75 transition-all duration-300 ${
                        hoveredVersion === ver.version ? 'opacity-100 scale-100 animate-pulse' : ''
                      }`} />
                      {/* Central node dot */}
                      <div className={`w-4 h-4 rounded-full border-4 border-background transition-all duration-300 z-10 relative ${
                        hoveredVersion === ver.version
                          ? 'bg-primary scale-125 shadow-lg shadow-primary/40'
                          : 'bg-muted border-border'
                      }`} />
                    </div>
                  </div>

                  {/* Right card container */}
                  <div className="pl-12 md:pl-0">
                    <div className={`p-6 rounded-2xl bg-card border border-border shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary/20 ${
                      hoveredVersion === ver.version ? 'shadow-indigo-500/5' : ''
                    }`}>
                      {/* Version Summary description */}
                      <p className="text-sm font-semibold text-muted leading-relaxed mb-6 border-b border-border/60 pb-4">
                        {t(ver.description)}
                      </p>

                      {/* Changes list grouped by tag category */}
                      <div className="space-y-6">
                        {(['new', 'improved', 'fixed'] as const).map((tag) => {
                          const tagChanges = ver.changes.filter((c) => c.tag === tag);
                          if (tagChanges.length === 0) return null;

                          const tagLabel = {
                            new: { vi: 'Tính năng mới', en: 'New Features' },
                            improved: { vi: 'Cải tiến', en: 'Improvements' },
                            fixed: { vi: 'Sửa lỗi', en: 'Bug Fixes' },
                          }[tag];

                          const tagColor = {
                            new: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400',
                            improved: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20 dark:bg-indigo-500/20 dark:text-indigo-400',
                            fixed: 'bg-rose-500/10 text-rose-500 border-rose-500/20 dark:bg-rose-500/20 dark:text-rose-400',
                          }[tag];

                          const TagIcon = {
                            new: PlusIcon,
                            improved: TrendingUpIcon,
                            fixed: WrenchIcon,
                          }[tag];

                          return (
                            <div key={tag} className="space-y-3">
                              {/* Sub-header for group */}
                              <div className="flex items-center">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border ${tagColor}`}>
                                  <TagIcon className="w-3.5 h-3.5" />
                                  <span>{t(tagLabel)}</span>
                                </span>
                              </div>

                              {/* Bullet list items */}
                              <ul className="space-y-2.5 pl-1.5">
                                {tagChanges.map((change, idx) => (
                                  <li key={idx} className="group/item flex items-start gap-3 text-sm text-foreground/90 leading-relaxed">
                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-muted group-hover/item:bg-primary shrink-0 transition-colors duration-200" />
                                    <span>{t(change.text)}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
