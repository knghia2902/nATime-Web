'use client';

import { useState, Fragment } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/i18n';
import Link from 'next/link';

// Features for quick comparison on pricing cards
interface PlanFeature {
  vi: string;
  en: string;
  included: boolean;
}

interface PricingPlan {
  id: string;
  nameVi: string;
  nameEn: string;
  descriptionVi: string;
  descriptionEn: string;
  priceMonthly: number; // in VND
  priceYearly: number;  // in VND (20% off)
  badgeVi?: string;
  badgeEn?: string;
  popular?: boolean;
  buttonTextVi: string;
  buttonTextEn: string;
  buttonHref: string;
  features: PlanFeature[];
}

// Full features comparison table data
interface FeatureRow {
  nameVi: string;
  nameEn: string;
  standard: string | boolean;
  professional: string | boolean;
  enterprise: string | boolean;
}

interface FeatureCategory {
  categoryNameVi: string;
  categoryNameEn: string;
  features: FeatureRow[];
}

export default function PricingPage() {
  const { t } = useLanguage();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Pricing Plans definitions
  const plans: PricingPlan[] = [
    {
      id: 'standard',
      nameVi: 'Standard',
      nameEn: 'Standard',
      descriptionVi: 'Cài đặt tại chỗ (Self-Host). Giải pháp cơ bản cho văn phòng, doanh nghiệp nhỏ và startups.',
      descriptionEn: 'On-premises (Self-Host). Basic solution for offices, small businesses, and startups.',
      priceMonthly: 490000,
      priceYearly: 392000, // 20% off
      buttonTextVi: 'Dùng thử miễn phí',
      buttonTextEn: 'Start Free Trial',
      buttonHref: '/register?plan=standard',
      features: [
        { vi: 'Lên tới 50 nhân viên', en: 'Up to 50 employees', included: true },
        { vi: 'Hỗ trợ tối đa 2 thiết bị', en: 'Supports up to 2 devices', included: true },
        { vi: 'Triển khai Self-Host tại chỗ', en: 'On-premises Self-Host deployment', included: true },
        { vi: 'Bộ cài đặt tự động (.EXE Setup)', en: 'Automated Windows setup (.EXE)', included: true },
        { vi: 'Xác thực bản quyền: Thuê bao năm', en: 'Licensing: Annual subscription', included: true },
        { vi: 'Kiểm soát cổng ra vào', en: 'Gate access control', included: false },
        { vi: 'Quản lý nhà thầu & khách', en: 'Contractor & visitor management', included: false },
      ],
    },
    {
      id: 'professional',
      nameVi: 'Professional',
      nameEn: 'Professional',
      descriptionVi: 'Cài đặt tại chỗ (Self-Host). Phù hợp nhất cho chuỗi cửa hàng, doanh nghiệp đang tăng trưởng và nhà máy vừa.',
      descriptionEn: 'On-premises (Self-Host). Best fit for chain stores, growing businesses, and medium factories.',
      priceMonthly: 1490000,
      priceYearly: 1192000, // 20% off
      popular: true,
      badgeVi: 'Bán chạy nhất',
      badgeEn: 'Most Popular',
      buttonTextVi: 'Bắt đầu ngay',
      buttonTextEn: 'Get Started Now',
      buttonHref: '/register?plan=professional',
      features: [
        { vi: 'Lên tới 500 nhân viên', en: 'Up to 500 employees', included: true },
        { vi: 'Hỗ trợ tối đa 10 thiết bị', en: 'Supports up to 10 devices', included: true },
        { vi: 'Triển khai Self-Host tại chỗ', en: 'On-premises Self-Host deployment', included: true },
        { vi: 'Bộ cài đặt tự động (.EXE Setup)', en: 'Automated Windows setup (.EXE)', included: true },
        { vi: 'Xác thực bản quyền: Thuê bao năm', en: 'Licensing: Annual subscription', included: true },
        { vi: 'Hỗ trợ nâng cao từ xa 24/7', en: '24/7 remote technical support', included: true },
        { vi: 'Đầy đủ tính năng chấm công, ca kíp', en: 'Full attendance & shifts features', included: true },
      ],
    },
    {
      id: 'enterprise',
      nameVi: 'Enterprise',
      nameEn: 'Enterprise',
      descriptionVi: 'Giải pháp toàn diện thiết kế riêng cho tập đoàn lớn, khu công nghiệp và hạ tầng phức tạp.',
      descriptionEn: 'Comprehensive solution tailored for large corporations, industrial parks, and complex infra.',
      priceMonthly: 0, // Custom pricing
      priceYearly: 0,
      buttonTextVi: 'Liên hệ tư vấn',
      buttonTextEn: 'Contact Sales',
      buttonHref: '#contact-sales',
      features: [
        { vi: 'Không giới hạn nhân viên & thiết bị', en: 'Unlimited employees & devices', included: true },
        { vi: 'Bản quyền trọn đời (Mua đứt)', en: 'Lifetime Perpetual License', included: true },
        { vi: 'Triển khai Self-Host tại chỗ chuyên sâu', en: 'On-premises / Self-host custom deployment', included: true },
        { vi: 'Kỹ sư nATime lắp đặt & bàn giao tận nơi', en: 'On-site installation & onboarding', included: true },
        { vi: 'Kích hoạt tùy chọn các Module nâng cao', en: 'Custom modular feature activation', included: true },
        { vi: 'Tích hợp Trạm cân (Weighbridge)', en: 'Weighbridge integration support', included: true },
        { vi: 'Cam kết SLA kỹ thuật khắt khe 24/7', en: 'Dedicated 24/7 Hotline & strict SLA', included: true },
      ],
    },
  ];

  // Full Feature Comparison Matrix data
  const featureCategories: FeatureCategory[] = [
    {
      categoryNameVi: 'Quy mô & Thiết bị',
      categoryNameEn: 'Scale & Devices',
      features: [
        { nameVi: 'Số lượng nhân viên tối đa', nameEn: 'Maximum employees', standard: '50', professional: '500', enterprise: t('Không giới hạn', 'Unlimited') },
        { nameVi: 'Số lượng thiết bị tối đa', nameEn: 'Maximum devices', standard: '2', professional: '10', enterprise: t('Không giới hạn', 'Unlimited') },
        { nameVi: 'Số lượng chi nhánh/địa điểm', nameEn: 'Branches / Sites', standard: '1', professional: '10', enterprise: t('Không giới hạn', 'Unlimited') },
        { nameVi: 'Dung lượng lưu trữ dữ liệu', nameEn: 'Data storage limit', standard: t('1 năm', '1 year'), professional: t('5 năm', '5 years'), enterprise: t('Không giới hạn', 'Unlimited') },
      ],
    },
    {
      categoryNameVi: 'Phân hệ Chấm công & Kiểm soát',
      categoryNameEn: 'Attendance & Access Modules',
      features: [
        { nameVi: 'Chấm công thông minh (Smart Attendance)', nameEn: 'Smart Time Attendance', standard: t('Cơ bản', 'Basic'), professional: t('Nâng cao', 'Advanced'), enterprise: t('Tùy biến cao', 'Highly Customized') },
        { nameVi: 'Kiểm soát cổng ra vào (Gate Access Control) (Sắp ra mắt)', nameEn: 'Gate Access Control (Soon)', standard: false, professional: true, enterprise: true },
        { nameVi: 'Quản lý thiết bị đa điểm', nameEn: 'Multi-site device management', standard: t('Cơ bản', 'Basic'), professional: t('Nâng cao', 'Advanced'), enterprise: t('Tập trung & Tự động', 'Centralized & Auto') },
        { nameVi: 'Quản lý ca kíp phức tạp', nameEn: 'Complex shift schedules', standard: false, professional: true, enterprise: true },
        { nameVi: 'Đăng ký khuôn mặt/vân tay từ xa', nameEn: 'Remote face/fingerprint enrollment', standard: false, professional: true, enterprise: true },
      ],
    },
    {
      categoryNameVi: 'Các phân hệ mở rộng',
      categoryNameEn: 'Add-on Modules',
      features: [
        { nameVi: 'Nhà thầu & Khách (Contractor & Visitor)', nameEn: 'Contractor & Visitor Management', standard: false, professional: t('Cơ bản', 'Basic'), enterprise: t('Chuyên sâu', 'Enterprise Pro') },
        { nameVi: 'Tài sản CNTT (IT Asset Management)', nameEn: 'IT Asset Management', standard: false, professional: t('Cơ bản', 'Basic'), enterprise: t('Nâng cao', 'Advanced') },
        { nameVi: 'Phân hệ Cân xe / Trạm cân (Weighbridge) (Sắp ra mắt)', nameEn: 'Weighbridge integration (Soon)', standard: false, professional: false, enterprise: true },
        { nameVi: 'Ứng dụng di động (Mobile App)', nameEn: 'Mobile Application', standard: t('Cơ bản (Chỉ xem)', 'Basic (View Only)'), professional: t('Pro (GPS / Wifi)', 'Pro (GPS / Wifi)'), enterprise: t('Tùy biến thương hiệu', 'Custom Brand / Whitelabel') },
      ],
    },
    {
      categoryNameVi: 'Báo cáo & Tích hợp',
      categoryNameEn: 'Reports & Integration',
      features: [
        { nameVi: 'Báo cáo & Phân tích (Reports & Analytics)', nameEn: 'Reports & Analytics', standard: t('Cơ bản', 'Basic'), professional: t('Nâng cao', 'Advanced'), enterprise: t('Tự thiết kế BI', 'Custom BI Reports') },
        { nameVi: 'Xuất dữ liệu Excel/PDF tự động', nameEn: 'Auto Excel/PDF export', standard: true, professional: true, enterprise: true },
        { nameVi: 'API kết nối & Webhooks', nameEn: 'API access & Webhooks', standard: false, professional: t('Cơ bản', 'Basic API'), enterprise: t('Đầy đủ / Không giới hạn', 'Full / Unlimited API') },
        { nameVi: 'Tích hợp ERP/HRM bên thứ 3', nameEn: 'ERP/HRM 3rd party integration', standard: false, professional: false, enterprise: true },
        { nameVi: 'Phương thức triển khai', nameEn: 'Deployment Method', standard: t('Self-Host (Thuê bao năm)', 'Self-Host (Annual)'), professional: t('Self-Host (Thuê bao năm)', 'Self-Host (Annual)'), enterprise: t('Self-Host (Bản quyền trọn đời)', 'Self-Host (Lifetime Perpetual)') },
      ],
    },
    {
      categoryNameVi: 'Hỗ trợ & Bảo mật',
      categoryNameEn: 'Support & Security',
      features: [
        { nameVi: 'Mã hóa dữ liệu đầu cuối (End-to-end encryption)', nameEn: 'End-to-end data encryption', standard: true, professional: true, enterprise: true },
        { nameVi: 'Phân quyền tài khoản chi tiết', nameEn: 'Granular role-based permissions', standard: t('Cơ bản', 'Basic'), professional: t('Chi tiết', 'Granular'), enterprise: t('Tùy biến sâu', 'Deeply Customized') },
        { nameVi: 'Kênh hỗ trợ kỹ thuật', nameEn: 'Support channels', standard: 'Email / Ticket', professional: 'Email / Chat / Phone', enterprise: t('Hotline riêng 24/7', 'Dedicated 24/7 Hotline') },
        { nameVi: 'Cam kết thời gian phản hồi (SLA)', nameEn: 'Response time SLA', standard: t('Trong 24 giờ', 'Within 24h'), professional: t('4 - 8 giờ làm việc', '4 - 8 business hours'), enterprise: t('Dưới 1 giờ (24/7)', 'Under 1 hour (24/7)') },
        { nameVi: 'Đào tạo & Chuyển giao công nghệ', nameEn: 'Onboarding & Training', standard: t('Tài liệu trực tuyến', 'Online Docs'), professional: t('Đào tạo trực tuyến', 'Online Training'), enterprise: t('Trực tiếp tại doanh nghiệp', 'On-site & Dedicated Engineer') },
      ],
    },
  ];

  // FAQ list
  const faqs = [
    {
      qVi: 'Tôi có thể nâng cấp hoặc hạ cấp gói dịch vụ sau này không?',
      qEn: 'Can I upgrade or downgrade my plan later?',
      aVi: 'Có, bạn có thể tự do nâng cấp hoặc hạ cấp gói dịch vụ bất kỳ lúc nào. Phần chi phí chênh lệch sẽ được tự động tính toán lại vào hóa đơn tiếp theo của bạn.',
      aEn: 'Yes, you can freely upgrade or downgrade my plan at any time. The price difference will be automatically recalculated and prorated in your next billing invoice.'
    },
    {
      qVi: 'nATime hỗ trợ các phương thức thanh toán nào?',
      qEn: 'What payment methods does nATime support?',
      aVi: 'Chúng tôi hỗ trợ chuyển khoản ngân hàng, thanh toán thẻ quốc tế (Visa/Mastercard) và các cổng ví điện tử phổ biến. Đối với gói Enterprise, chúng tôi cung cấp hình thức thanh toán theo hợp đồng doanh nghiệp và hóa đơn VAT đầy đủ.',
      aEn: 'We support bank transfers, international cards (Visa/Mastercard), and popular e-wallet gateways. For the Enterprise plan, we support corporate contracts and complete VAT invoicing terms.'
    },
    {
      qVi: 'Tôi có thể tự cài đặt trên server nội bộ (Self-host / On-Premises) không?',
      qEn: 'Can I deploy self-hosted (On-Premises)?',
      aVi: 'Có, toàn bộ các gói cước của nATime đều được thiết kế để triển khai Self-Host tại chỗ. Đối với gói Standard và Professional, chúng tôi cung cấp bộ cài đặt tự động (.EXE Setup) giúp bạn tự cài đặt SQL Server và phần mềm lên máy tính văn phòng chỉ trong 5 phút. Đối với gói Enterprise, đội ngũ kỹ sư nATime sẽ hỗ trợ khảo sát, tích hợp trạm cân, cổng barie và cài đặt trực tiếp tại doanh nghiệp.',
      aEn: 'Yes, all nATime plans are designed for On-Premises Self-Host deployment. For Standard and Professional plans, we provide an automated installer (.EXE Setup) that configures SQL Server and the application on your office PC in just 5 minutes. For the Enterprise plan, nATime engineers will assist with site surveys, weighbridge/gate integrations, and on-site deployment.'
    },
    {
      qVi: 'SLA hỗ trợ của gói Professional và Enterprise là gì?',
      qEn: 'What is the support SLA for Professional and Enterprise plans?',
      aVi: 'Gói Professional đi kèm với hỗ trợ giờ hành chính qua email, chat và hotline với cam kết phản hồi từ 4-8 tiếng. Gói Enterprise cam kết hỗ trợ kỹ thuật chuyên biệt 24/7/365 với hotline riêng và thời gian phản hồi sự cố khẩn cấp dưới 1 giờ.',
      aEn: 'The Professional plan includes business-hour support via email, chat, and hotline with a response time guarantee of 4-8 hours. The Enterprise plan guarantees dedicated 24/7/365 technical support with a separate hotline and emergency incident response in under 1 hour.'
    },
    {
      qVi: 'Chi phí thiết bị phần cứng có bao gồm trong bảng giá này không?',
      qEn: 'Are hardware device costs included in this pricing?',
      aVi: 'Bảng giá trên chỉ bao gồm phí bản quyền sử dụng phần mềm nATime. Bạn hoàn toàn có thể tận dụng các thiết bị chấm công vân tay, nhận diện khuôn mặt (FaceID) sẵn có của doanh nghiệp nếu tương thích, hoặc mua thêm các thiết bị chính hãng do nATime cung cấp với mức giá ưu đãi.',
      aEn: 'The pricing shown includes only the software licensing fee for nATime. You can fully utilize your existing fingerprint or face recognition (FaceID) hardware if compatible, or purchase genuine devices supplied by nATime at preferential rates.'
    }
  ];

  // Price formatting helper
  const formatPrice = (price: number) => {
    if (price === 0) return t('Liên hệ', 'Contact');
    return price.toLocaleString('vi-VN') + 'đ';
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 w-full bg-background text-foreground transition-colors duration-300">
        
        {/* ── 1. HERO HEADER ───────────────────────────────────── */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
          {/* Decorative glowing gradient spheres */}
          <div className="absolute top-[-10%] left-[-20%] h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px] dark:bg-indigo-500/5 pointer-events-none" />
          <div className="absolute top-[20%] right-[-20%] h-[600px] w-[600px] rounded-full bg-purple-500/10 blur-[130px] dark:bg-purple-500/5 pointer-events-none" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary dark:bg-primary/20 mb-4 animate-fade-in-up">
              {t('Gói dịch vụ linh hoạt', 'Flexible Pricing Plans')}
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6 text-gradient animate-fade-in-up delay-100">
              {t('Bảng giá linh hoạt', 'Flexible Pricing')}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted md:text-xl animate-fade-in-up delay-200">
              {t(
                'Lựa chọn gói dịch vụ tối ưu cho doanh nghiệp của bạn. Bắt đầu quản lý thông minh ngay hôm nay.',
                'Choose the optimal plan for your business. Start smart management today.'
              )}
            </p>

            {/* Billing Toggle Switch */}
            <div className="mt-10 flex items-center justify-center gap-4 animate-fade-in-up delay-300">
              <span className={`text-sm font-semibold transition-colors duration-200 ${billingPeriod === 'monthly' ? 'text-foreground font-bold' : 'text-muted'}`}>
                {t('Theo tháng', 'Monthly')}
              </span>
              <button
                onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
                className="relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-200 dark:bg-slate-800 transition-colors duration-300 ease-in-out focus:outline-none"
                role="switch"
                aria-checked={billingPeriod === 'yearly'}
              >
                <span
                  className={`${
                    billingPeriod === 'yearly' ? 'translate-x-7 bg-primary' : 'translate-x-0 bg-slate-400 dark:bg-slate-500'
                  } pointer-events-none inline-block h-6 w-6 transform rounded-full shadow-md ring-0 transition duration-300 ease-in-out`}
                />
              </button>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-semibold transition-colors duration-200 ${billingPeriod === 'yearly' ? 'text-foreground font-bold' : 'text-muted'}`}>
                  {t('Theo năm', 'Yearly')}
                </span>
                <span className="inline-flex items-center rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {t('Tiết kiệm 20%', 'Save 20%')}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. PRICING CARDS ROW ─────────────────────────────── */}
        <section className="pb-24 relative z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
              {plans.map((plan, idx) => {
                const isEnterprise = plan.id === 'enterprise';
                const currentPrice = billingPeriod === 'yearly' ? plan.priceYearly : plan.priceMonthly;
                const yearlyTotal = plan.priceYearly * 12;

                return (
                  <div
                    key={plan.id}
                    className={`relative flex flex-col justify-between rounded-2xl bg-card p-8 border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                      plan.popular
                        ? 'border-primary shadow-xl shadow-primary/5 dark:shadow-primary/10'
                        : 'border-border'
                    } animate-fade-in-up`}
                    style={{ animationDelay: `${idx * 100 + 300}ms` }}
                  >
                    {/* Popular Badge */}
                    {plan.popular && (
                      <span className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                        {t(plan.badgeVi || '', plan.badgeEn || '')}
                      </span>
                    )}

                    {/* Card Top Section */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-foreground">
                          {t(plan.nameVi, plan.nameEn)}
                        </h3>
                      </div>
                      
                      <p className="text-sm text-muted mb-6 min-h-[40px]">
                        {t(plan.descriptionVi, plan.descriptionEn)}
                      </p>

                      {/* Pricing Display */}
                      <div className="mb-6 flex flex-col justify-end min-h-[70px]">
                        {isEnterprise ? (
                          <div className="text-4xl font-extrabold tracking-tight text-foreground">
                            {t('Liên hệ', 'Contact Us')}
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-baseline">
                              <span className="text-4xl font-extrabold tracking-tight text-foreground transition-all duration-300">
                                {formatPrice(currentPrice)}
                              </span>
                              <span className="ml-2 text-sm text-muted">
                                / {t('tháng', 'month')}
                              </span>
                            </div>
                            {billingPeriod === 'yearly' && (
                              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                                {t('Thanh toán hàng năm:', 'Billed annually:')} {formatPrice(yearlyTotal)} / {t('năm', 'year')}
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-border my-6" />

                      {/* Key Features List */}
                      <ul className="space-y-4 mb-8">
                        {plan.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-3 text-sm">
                            {feature.included ? (
                              <svg
                                className="h-5 w-5 shrink-0 text-success"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg
                                className="h-5 w-5 shrink-0 text-slate-300 dark:text-slate-700"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )}
                            <span className={feature.included ? 'text-foreground' : 'text-muted line-through'}>
                              {t(feature.vi, feature.en)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto">
                      {isEnterprise ? (
                        <button
                          onClick={() => handleScrollToSection('contact-sales')}
                          className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-sm font-semibold border border-border bg-card text-foreground transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 shadow-sm cursor-pointer"
                        >
                          {t(plan.buttonTextVi, plan.buttonTextEn)}
                        </button>
                      ) : (
                        <Link
                          href={plan.buttonHref}
                          className={`w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                            plan.popular
                              ? 'bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30'
                              : 'border border-primary text-primary hover:bg-primary/5'
                          }`}
                        >
                          {t(plan.buttonTextVi, plan.buttonTextEn)}
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 3. FEATURE COMPARISON TABLE ─────────────────────── */}
        <section className="py-16 md:py-24 bg-card-hover border-y border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {t('So sánh chi tiết tính năng', 'Compare Features Details')}
              </h2>
              <p className="mt-4 text-muted text-base">
                {t(
                  'Xem xét tất cả các phân hệ và quyền lợi cụ thể của từng phiên bản để đưa ra quyết định tối ưu.',
                  'Review all modules and specific benefits of each version to make the optimal decision.'
                )}
              </p>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-hidden rounded-2xl border border-border shadow-sm bg-card">
              <table className="w-full table-fixed border-collapse">
                <thead>
                  <tr className="border-b border-border bg-slate-50 dark:bg-slate-900/50">
                    <th className="w-[34%] py-5 px-6 text-left text-sm font-bold text-foreground">
                      {t('TÍNH NĂNG & PHÂN HỆ', 'FEATURES & MODULES')}
                    </th>
                    <th className="w-[22%] py-5 px-6 text-center text-sm font-bold text-foreground">
                      Standard
                    </th>
                    <th className="w-[22%] py-5 px-6 text-center text-sm font-bold text-primary relative">
                      Professional
                      <span className="absolute top-1 left-1/2 -translate-x-1/2 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                        {t('Phổ biến', 'Popular')}
                      </span>
                    </th>
                    <th className="w-[22%] py-5 px-6 text-center text-sm font-bold text-foreground">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {featureCategories.map((cat, catIdx) => (
                    <Fragment key={catIdx}>
                      {/* Category Header Row */}
                      <tr className="bg-slate-100/55 dark:bg-slate-800/40">
                        <td colSpan={4} className="py-3 px-6 text-sm font-bold text-foreground tracking-wider uppercase">
                          {t(cat.categoryNameVi, cat.categoryNameEn)}
                        </td>
                      </tr>
                      {cat.features.map((feature, fIdx) => (
                        <tr
                          key={fIdx}
                          className="hover:bg-primary-light/10 dark:hover:bg-primary-light/5 transition-colors duration-150"
                        >
                          <td className="py-4 px-6 text-sm font-medium text-foreground">
                            {t(feature.nameVi, feature.nameEn)}
                          </td>
                          <td className="py-4 px-6 text-center text-sm text-muted">
                            {renderCellContent(feature.standard)}
                          </td>
                          <td className="py-4 px-6 text-center text-sm text-muted bg-primary/[0.01]">
                            {renderCellContent(feature.professional)}
                          </td>
                          <td className="py-4 px-6 text-center text-sm text-muted">
                            {renderCellContent(feature.enterprise)}
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile / Tablet Accordion-like Feature List */}
            <div className="block lg:hidden space-y-6">
              {featureCategories.map((cat, catIdx) => (
                <div key={catIdx} className="rounded-xl border border-border bg-card overflow-hidden">
                  <div className="bg-slate-50 dark:bg-slate-900/50 py-3 px-4 border-b border-border">
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                      {t(cat.categoryNameVi, cat.categoryNameEn)}
                    </h3>
                  </div>
                  <div className="divide-y divide-border">
                    {cat.features.map((feature, fIdx) => (
                      <div key={fIdx} className="p-4 space-y-3">
                        <h4 className="text-sm font-semibold text-foreground">
                          {t(feature.nameVi, feature.nameEn)}
                        </h4>
                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                          <div className="rounded bg-slate-50 dark:bg-slate-900/40 p-2">
                            <span className="block font-bold text-muted mb-1">Standard</span>
                            <span className="text-foreground">{renderCellContent(feature.standard)}</span>
                          </div>
                          <div className="rounded bg-primary/[0.04] p-2 border border-primary/10">
                            <span className="block font-bold text-primary mb-1">Professional</span>
                            <span className="text-foreground">{renderCellContent(feature.professional)}</span>
                          </div>
                          <div className="rounded bg-slate-50 dark:bg-slate-900/40 p-2">
                            <span className="block font-bold text-muted mb-1">Enterprise</span>
                            <span className="text-foreground">{renderCellContent(feature.enterprise)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. ENTERPRISE CONTACT SALES SECTION ──────────────── */}
        <section id="contact-sales" className="py-20 relative overflow-hidden bg-background">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="rounded-3xl border border-border bg-card p-8 md:p-12 shadow-xl text-center">
              <h2 className="text-3xl font-extrabold text-foreground mb-4">
                {t('Cần giải pháp tùy biến cho doanh nghiệp lớn?', 'Need a custom solution for your enterprise?')}
              </h2>
              <p className="text-muted text-base max-w-2xl mx-auto mb-8">
                {t(
                  'Đội ngũ kỹ sư và tư vấn giải pháp của nATime sẽ khảo sát trực tiếp nhu cầu, tư vấn kiến trúc tích hợp hệ thống kiểm soát ra vào, trạm cân, và tùy chỉnh quy trình chấm công theo đặc thù của doanh nghiệp.',
                  'Our engineers and solution consultants will analyze your needs, advise on access control & weighbridge architectures, and customize attendance flows to match your requirements.'
                )}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="mailto:sales@natime.xyz"
                  className="inline-flex justify-center items-center py-3.5 px-6 rounded-xl bg-primary text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                >
                  <svg
                    className="mr-2 h-4 w-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8m-2 11H4a2 2 0 01-2-2V7a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2z" />
                  </svg>
                  {t('Gửi Email cho chúng tôi', 'Email Our Sales')}
                </a>
                <Link
                  href="/register?plan=enterprise"
                  className="inline-flex justify-center items-center py-3.5 px-6 rounded-xl border border-border bg-card text-sm font-semibold text-foreground hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300"
                >
                  {t('Đăng ký nhận báo giá', 'Request Custom Proposal')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. FAQ SECTION ───────────────────────────────────── */}
        <section className="py-20 border-t border-border">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {t('Câu hỏi thường gặp', 'Frequently Asked Questions')}
              </h2>
              <p className="mt-4 text-muted text-base">
                {t(
                  'Giải đáp các thắc mắc phổ biến về chi phí, cài đặt phần mềm và hỗ trợ kỹ thuật.',
                  'Get answers to common queries about pricing, installation, and technical support.'
                )}
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-border rounded-2xl bg-card overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left font-semibold text-foreground hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors duration-200 cursor-pointer"
                    >
                      <span className="text-base md:text-lg">
                        {t(faq.qVi, faq.qEn)}
                      </span>
                      <span className="ml-4 shrink-0 p-1 rounded-full border border-border text-muted">
                        <svg
                          className={`h-4 w-4 transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>

                    {/* Collapsible Answer */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="p-5 pt-0 text-sm md:text-base text-muted leading-relaxed border-t border-border/50 bg-slate-50/50 dark:bg-slate-900/10">
                          {t(faq.aVi, faq.aEn)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

// Helper to render check, cross, or string text in comparison table
function renderCellContent(value: string | boolean) {
  if (typeof value === 'boolean') {
    return value ? (
      <span className="inline-flex items-center justify-center p-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
        <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
    ) : (
      <span className="inline-flex items-center justify-center p-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600">
        <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
    );
  }
  return <span className="font-semibold text-foreground">{value}</span>;
}
