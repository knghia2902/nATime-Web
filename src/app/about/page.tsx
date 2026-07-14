'use client';

import { useLanguage } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

// Custom SVG Icons for Core Values
function SecurityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 11 2 2 4-4" />
    </svg>
  );
}

// Custom SVG Icon for Performance
function PerformanceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

// Custom SVG Icon for Pride
function PrideIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  );
}

// Custom SVG Icon for Support
function SupportIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

// Icons for Clean Room compliance
function CodeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function FingerprintIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12a10 10 0 0 1 20 0c0 5.25-4.25 9.5-9.5 9.5a9.5 9.5 0 0 1-9.5-9.5Z" />
      <path d="M6 12a6 6 0 0 1 12 0c0 3.31-2.69 6-6 6a6 6 0 0 1-6-6Z" />
      <path d="M10 12a2 2 0 0 1 4 0" />
    </svg>
  );
}

function DecouplingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-4V6" />
      <path d="M6 14h4v4" />
      <path d="M18 4v6h-6" />
      <path d="M6 20v-6h6" />
      <line x1="3" y1="3" x2="21" y2="21" />
    </svg>
  );
}

export default function AboutPage() {
  const { t } = useLanguage();
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  // Core Values Data
  const coreValues = [
    {
      id: 1,
      icon: SecurityIcon,
      title: { vi: 'An toàn Bảo mật', en: 'Security & Safety' },
      description: {
        vi: 'Mã hóa dữ liệu AES-256 đầu cuối, tuân thủ nguyên tắc không lưu trữ dữ liệu sinh trắc học thô. Đảm bảo an toàn thông tin ở cấp độ cao nhất.',
        en: 'End-to-end AES-256 data encryption, complying with the zero-biometrics logging rule. Ensuring information security at the highest level.'
      },
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 2,
      icon: PerformanceIcon,
      title: { vi: 'Hiệu năng Tối ưu', en: 'Optimum Performance' },
      description: {
        vi: 'Xử lý hàng triệu giao dịch chấm công đồng thời với độ trễ tối thiểu nhờ kiến trúc phi tập trung và tối ưu hóa hệ thống sâu sắc.',
        en: 'Processing millions of concurrent attendance logs with minimal latency thanks to a decentralized architecture and deep system optimization.'
      },
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 3,
      icon: PrideIcon,
      title: { vi: 'Tự hào Việt Nam', en: 'Proudly Vietnamese' },
      description: {
        vi: 'Sản phẩm được phát triển bởi các kỹ sư công nghệ hàng đầu Việt Nam, thấu hiểu sâu sắc văn hóa và quy trình vận hành doanh nghiệp nội địa.',
        en: 'Developed by leading technology engineers in Vietnam, deeply understanding the culture and operation workflows of local enterprises.'
      },
      color: 'from-red-500 to-rose-600'
    },
    {
      id: 4,
      icon: SupportIcon,
      title: { vi: 'Hỗ trợ Chuyên sâu', en: 'Dedicated Expert Support' },
      description: {
        vi: 'Đội ngũ chuyên gia kỹ thuật hỗ trợ 24/7, sẵn sàng giải quyết các bài toán tích hợp phần cứng và phần mềm phức tạp nhất.',
        en: '24/7 expert technical support team, ready to solve the most complex hardware and software integration challenges.'
      },
      color: 'from-emerald-500 to-teal-600'
    }
  ];

  // Clean room pillars
  const cleanRoomPillars = [
    {
      icon: CodeIcon,
      tag: 'Net 10',
      title: { vi: 'Tuân thủ Net 10', en: 'Net 10 Compliance' },
      desc: {
        vi: 'Cam kết mã nguồn được xây dựng mới hoàn toàn độc lập. Quy trình kiểm định độc lập đảm bảo 100% không có bất cứ dòng mã nào kế thừa hay sao chép từ sản phẩm khác.',
        en: 'Commitment to completely independent source code build. Independent auditing ensures 100% clean implementation without any inherited or copied lines from other products.'
      }
    },
    {
      icon: DecouplingIcon,
      tag: 'Decoupling',
      title: { vi: 'Tách biệt Legacy AMMS', en: 'Legacy AMMS Decoupling' },
      desc: {
        vi: 'Không kết nối trực tiếp, không dùng chung thư viện hay cơ sở dữ liệu cũ của AMMS. Phân tách kiến trúc API rõ ràng giúp loại bỏ hoàn toàn các rủi ro tranh chấp sở hữu trí tuệ.',
        en: 'No direct connection, no shared libraries or database of legacy AMMS systems. Clean API boundaries remove any risks of intellectual property contamination.'
      }
    },
    {
      icon: LockIcon,
      tag: 'AES-256',
      title: { vi: 'Mã hóa cơ sở dữ liệu AES-256', en: 'Database AES-256 Encryption' },
      desc: {
        vi: 'Tất cả các trường thông tin nhạy cảm của doanh nghiệp, danh tính nhân viên và nhật ký truy cập đều được mã hóa bằng thuật toán đối xứng AES-256 siêu bảo mật.',
        en: 'All sensitive corporate data, employee identities, and access logs are protected with high-security symmetric AES-256 encryption at rest.'
      }
    },
    {
      icon: FingerprintIcon,
      tag: 'Zero-Biometrics',
      title: { vi: 'Không lưu sinh trắc học thô', en: 'Zero-Biometrics Logging Rule' },
      desc: {
        vi: 'Chúng tôi không bao giờ thu thập hình ảnh vân tay hoặc khuôn mặt thô lên máy chủ. Hệ thống chỉ xử lý mã băm không thể đảo ngược (hashes) hoặc đối sánh an toàn ngay tại thiết bị đầu cuối.',
        en: 'We never collect or upload raw fingerprint images or face templates to the server. The system only processes irreversible hashes or runs verification directly on edge devices.'
      }
    }
  ];

  // Stats
  const stats = [
    { value: '10M+', label: { vi: 'Lượt chấm công / tháng', en: 'Monthly attendance logs' } },
    { value: '500+', label: { vi: 'Doanh nghiệp tin dùng', en: 'Enterprise clients' } },
    { value: '99.99%', label: { vi: 'Cam kết Uptime SLA', en: 'Uptime SLA Commitment' } },
    { value: '< 0.2s', label: { vi: 'Thời gian xác thực', en: 'Average auth latency' } }
  ];

  // Mock partners
  const partners = [
    { name: 'VNG Tech', text: 'VNG Tech' },
    { name: 'FPT Software', text: 'FPT Software' },
    { name: 'Viettel IDC', text: 'Viettel IDC' },
    { name: 'Masan Group', text: 'Masan Group' },
    { name: 'VinGroup', text: 'VinGroup' },
    { name: 'Thaco Auto', text: 'Thaco Auto' }
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full bg-background text-foreground transition-colors duration-300 relative overflow-hidden pt-20">
        
        {/* Glow backgrounds */}
        <div className="absolute top-0 left-1/4 w-[500px].h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none -z-10" />
        <div className="absolute top-[40%] right-1/4 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none -z-10" />

        {/* Section 1: Hero Banner */}
        <section className="relative px-6 py-20 lg:py-32 xl:py-40 flex flex-col items-center text-center max-w-5xl mx-auto z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary-light dark:bg-primary-light/10 text-primary mb-6 animate-fade-in-up">
            <span>✨</span>
            <span>{t({ vi: 'Về nATime', en: 'About nATime' })}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 animate-fade-in-up text-gradient">
            {t(
              {
                vi: 'Sứ mệnh Chấm công & Kiểm soát Ra vào Độc lập, Bảo mật & Hiệu năng cao',
                en: 'Our Mission: Independent, Secure & High-Performance Access Control'
              }
            )}
          </h1>

          <p className="text-lg md:text-xl text-muted max-w-3xl leading-relaxed mb-12 animate-fade-in-up delay-100">
            {t(
              {
                vi: 'nATime được phát triển với sứ mệnh mang đến giải pháp Clean-room thay thế độc lập hoàn toàn, vượt trội về mặt hiệu năng và bảo mật cho doanh nghiệp lớn. Chúng tôi giải phóng doanh nghiệp khỏi những vướng mắc pháp lý và rủi ro rò rỉ dữ liệu thường gặp ở các hệ thống truyền thống.',
                en: 'nATime was developed with the mission to deliver a fully independent Clean-room alternative, outstanding in performance and absolute security for large enterprises. We free organizations from intellectual property disputes and data leakage risks common in legacy solutions.'
              }
            )}
          </p>

          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up delay-200">
            <a
              href="#cleanroom"
              className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium transition-all duration-300 shadow-lg shadow-primary/20 hover:scale-[1.02]"
            >
              {t({ vi: 'Tìm hiểu Clean-room', en: 'Explore Clean-room' })}
            </a>
            <a
              href="#values"
              className="px-6 py-3 rounded-lg border border-border bg-card hover:bg-card-hover font-medium transition-all duration-300 hover:scale-[1.02]"
            >
              {t({ vi: 'Giá trị cốt lõi', en: 'Core Values' })}
            </a>
          </div>
        </section>

        {/* Section 2: Core Values Grid */}
        <section id="values" className="relative px-6 py-20 bg-slate-50/50 dark:bg-slate-900/20 border-y border-border z-10 scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t({ vi: 'Giá Trị Cốt Lõi', en: 'Core Values' })}
              </h2>
              <p className="text-muted">
                {t(
                  {
                    vi: 'Chúng tôi xây dựng sản phẩm dựa trên 4 trụ cột cốt lõi nhằm định hình trải nghiệm quản trị nhân sự chuyên nghiệp và an toàn.',
                    en: 'We build our platform upon four core pillars to shape a professional and secure workforce management experience.'
                  }
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, idx) => {
                const Icon = value.icon;
                const isHovered = hoveredValue === idx;
                return (
                  <div
                    key={value.id}
                    className={`relative p-8 rounded-2xl transition-all duration-500 overflow-hidden bg-card border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 ${
                      isHovered ? 'border-primary/30' : ''
                    }`}
                    onMouseEnter={() => setHoveredValue(idx)}
                    onMouseLeave={() => setHoveredValue(null)}
                  >
                    {/* Top gradient line */}
                    <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${value.color}`} />
                    
                    {/* Glowing effect inside card */}
                    <div
                      className={`absolute -right-16 -top-16 w-32 h-32 rounded-full bg-gradient-to-br ${value.color} opacity-[0.03] transition-all duration-500 ${
                        isHovered ? 'scale-150 opacity-[0.08]' : ''
                      }`}
                    />

                    <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-br ${value.color} text-white mb-6 shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-foreground transition-colors duration-300">
                      {t(value.title)}
                    </h3>
                    
                    <p className="text-sm leading-relaxed text-muted">
                      {t(value.description)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 3: Clean-Room & IP protection compliance */}
        <section id="cleanroom" className="relative px-6 py-20 lg:py-32 z-10 scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left text column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-glow" />
                  <span>{t({ vi: 'Cam Kết Pháp Lý & Bản Quyền', en: 'Legal & Intellectual Property Compliance' })}</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                  {t(
                    {
                      vi: 'Giải Pháp Chấm Công Sạch Với Quy Trình Clean-Room Nghiêm Ngặt',
                      en: 'Clean-Room Architecture Designed for Total IP Protection'
                    }
                  )}
                </h2>

                <p className="text-muted leading-relaxed">
                  {t(
                    {
                      vi: 'Trong thị trường giải pháp chấm công phức tạp, nATime tự hào là một sản phẩm phát triển độc lập thuần khiết. Bằng việc thực thi nghiêm ngặt nguyên lý thiết kế Clean-room và tuân thủ Net 10, chúng tôi đem lại sự an tâm tuyệt đối cho khách hàng doanh nghiệp trước mọi rủi ro tranh chấp tài sản trí tuệ.',
                      en: 'In a highly complex time attendance market, nATime stands proud as a purely independent development. By strictly enforcing Clean-room design methodologies and Net 10 principles, we assure corporate partners of zero risk of software copyright conflicts.'
                    }
                  )}
                </p>

                <div className="pt-4 border-t border-border flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-light dark:bg-primary-light/10 flex items-center justify-center text-primary">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">
                      {t({ vi: '100% Mã Nguồn Sạch', en: '100% Clean Codebase' })}
                    </h4>
                    <p className="text-xs text-muted">
                      {t({ vi: 'Đã qua kiểm định bảo mật tĩnh và động độc lập.', en: 'Passed through external static and dynamic audit checks.' })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right compliance cards column */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {cleanRoomPillars.map((pillar, index) => {
                  const Icon = pillar.icon;
                  return (
                    <div key={index} className="glass p-6 rounded-2xl border border-border relative overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:scale-[1.01]">
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <div className="p-2.5 rounded-lg bg-primary/10 text-primary dark:text-indigo-400">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-primary-light dark:bg-primary-light/10 text-primary">
                            {pillar.tag}
                          </span>
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-foreground">
                          {t(pillar.title)}
                        </h3>
                        <p className="text-xs text-muted leading-relaxed">
                          {t(pillar.desc)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </section>

        {/* Section 4: Customer Success Statistics & Partners */}
        <section className="relative px-6 py-20 bg-slate-900 text-white dark:bg-slate-950/60 border-t border-slate-800 z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 to-slate-950/40 pointer-events-none -z-10" />
          
          <div className="max-w-7xl mx-auto">
            {/* Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden group hover:border-primary/50 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-gradient mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-slate-400 font-medium">
                    {t(stat.label)}
                  </div>
                </div>
              ))}
            </div>

            {/* Partner logos */}
            <div className="border-t border-white/10 pt-16">
              <div className="text-center mb-10">
                <h3 className="text-lg font-semibold tracking-wider text-slate-400 uppercase">
                  {t({ vi: 'Các đối tác chiến lược', en: 'Trusted Partners & Integrations' })}
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center">
                {partners.map((partner, index) => (
                  <div
                    key={index}
                    className="w-full max-w-[160px] h-16 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all duration-300 group px-4 text-center cursor-default"
                  >
                    <span className="text-slate-400 group-hover:text-white font-bold tracking-tight text-sm md:text-base select-none transition-colors duration-300">
                      {partner.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="relative px-6 py-20 lg:py-32 text-center max-w-4xl mx-auto z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t({ vi: 'Trải Nghiệm Sự Khác Biệt Từ nATime', en: 'Experience the nATime Difference' })}
          </h2>
          <p className="text-muted mb-8 max-w-2xl mx-auto">
            {t(
              {
                vi: 'Hãy trang bị cho doanh nghiệp của bạn hệ thống chấm công và kiểm soát an ninh chuyên nghiệp, tuân thủ pháp lý cao nhất và sẵn sàng mở rộng không giới hạn.',
                en: 'Equip your enterprise with an attendance and access security system designed for compliance, performance, and limitless scalability.'
              }
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:contact@natime.vn"
              className="px-8 py-4 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold transition-all duration-300 shadow-lg shadow-primary/20 hover:scale-[1.02]"
            >
              {t({ vi: 'Yêu cầu tư vấn (Demo)', en: 'Request a Demo' })}
            </a>
            <a
              href="tel:+84123456789"
              className="px-8 py-4 rounded-lg border border-border bg-card hover:bg-card-hover font-semibold transition-all duration-300 hover:scale-[1.02]"
            >
              {t({ vi: 'Hotline tư vấn', en: 'Call Sales Expert' })}
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
