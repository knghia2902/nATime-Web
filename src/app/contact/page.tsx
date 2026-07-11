'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/i18n';

interface FormState {
  fullName: string;
  workEmail: string;
  phoneNumber: string;
  companyName: string;
  employeeCount: string;
  modules: {
    attendance: boolean;
    gate: boolean;
    itAssets: boolean;
    weighbridge: boolean;
    mobileApp: boolean;
  };
  message: string;
}

interface FormErrors {
  fullName?: string;
  workEmail?: string;
  phoneNumber?: string;
  companyName?: string;
  employeeCount?: string;
}

export default function ContactPage() {
  const { t } = useLanguage();

  const [form, setForm] = useState<FormState>({
    fullName: '',
    workEmail: '',
    phoneNumber: '',
    companyName: '',
    employeeCount: '',
    modules: {
      attendance: false,
      gate: false,
      itAssets: false,
      weighbridge: false,
      mobileApp: false,
    },
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckboxChange = (moduleKey: keyof FormState['modules']) => {
    setForm((prev) => ({
      ...prev,
      modules: {
        ...prev.modules,
        [moduleKey]: !prev.modules[moduleKey],
      },
    }));
  };

  const validateForm = (): boolean => {
    const tempErrors: FormErrors = {};
    let isValid = true;

    if (!form.fullName.trim()) {
      tempErrors.fullName = t('Vui lòng nhập họ và tên', 'Please enter your full name');
      isValid = false;
    }

    if (!form.workEmail.trim()) {
      tempErrors.workEmail = t('Vui lòng nhập email công việc', 'Please enter your work email');
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.workEmail)) {
        tempErrors.workEmail = t('Email không hợp lệ', 'Invalid email address');
        isValid = false;
      }
    }

    if (!form.phoneNumber.trim()) {
      tempErrors.phoneNumber = t('Vui lòng nhập số điện thoại', 'Please enter your phone number');
      isValid = false;
    } else {
      const phoneRegex = /^[0-9\s\-+().]{9,15}$/;
      if (!phoneRegex.test(form.phoneNumber)) {
        tempErrors.phoneNumber = t('Số điện thoại không hợp lệ', 'Invalid phone number');
        isValid = false;
      }
    }

    if (!form.companyName.trim()) {
      tempErrors.companyName = t('Vui lòng nhập tên công ty', 'Please enter your company name');
      isValid = false;
    }

    if (!form.employeeCount) {
      tempErrors.employeeCount = t('Vui lòng chọn quy mô nhân sự', 'Please select number of employees');
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleReset = () => {
    setForm({
      fullName: '',
      workEmail: '',
      phoneNumber: '',
      companyName: '',
      employeeCount: '',
      modules: {
        attendance: false,
        gate: false,
        itAssets: false,
        weighbridge: false,
        mobileApp: false,
      },
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 w-full bg-background relative overflow-hidden py-16 sm:py-24">
        {/* Background glows */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full -z-10 opacity-30 dark:opacity-20"
          aria-hidden="true"
          style={{
            background: 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full -z-10 opacity-35 dark:opacity-15"
          aria-hidden="true"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)',
          }}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header section with DESIGN.md spacing */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-[3px]">
              {t('Liên hệ & Yêu cầu Demo', 'Contact & Demo Request')}
            </h1>
            <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto mt-2">
              {t(
                'Hãy để lại thông tin, đội ngũ chuyên gia của chúng tôi sẽ liên hệ tư vấn và thiết lập bản demo miễn phí phù hợp nhất cho doanh nghiệp của bạn.',
                'Leave your information, and our expert team will contact you to consult and set up the most suitable free demo for your enterprise.'
              )}
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Contact info cards */}
            <div className="lg:col-span-5 space-y-6">
              {/* Address Card */}
              <div className="flex gap-4 p-5 rounded-xl border border-border/80 bg-card/65 backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    {t('Trụ sở chính', 'Head Office')}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted leading-relaxed">
                    {t(
                      'Tầng 5, Tòa nhà ACS, 123 Đường Nguyễn Trãi, Thanh Xuân, Hà Nội',
                      '5th Floor, ACS Building, 123 Nguyen Trai Street, Thanh Xuan District, Hanoi'
                    )}
                  </p>
                </div>
              </div>

              {/* Hotline Card */}
              <div className="flex gap-4 p-5 rounded-xl border border-border/80 bg-card/65 backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    {t('Hotline & Kinh doanh', 'Hotline & Sales')}
                  </h3>
                  <div className="mt-1.5 space-y-1 text-sm text-muted">
                    <p className="flex justify-between gap-4">
                      <span>{t('Kinh doanh:', 'Sales:')}</span>
                      <span className="font-medium text-foreground hover:text-primary transition-colors">
                        <a href="tel:+8419008686">(+84) 1900 8686</a>
                      </span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span>{t('Hỗ trợ kỹ thuật:', 'Support:')}</span>
                      <span className="font-medium text-foreground hover:text-primary transition-colors">
                        <a href="tel:+8419008687">(+84) 1900 8687</a>
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Support Email Card */}
              <div className="flex gap-4 p-5 rounded-xl border border-border/80 bg-card/65 backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    {t('Email hỗ trợ', 'Support Email')}
                  </h3>
                  <div className="mt-1.5 space-y-1 text-sm text-muted">
                    <p className="flex justify-between gap-4">
                      <span>{t('Yêu cầu demo:', 'Demo Request:')}</span>
                      <span className="font-medium text-foreground hover:text-primary transition-colors">
                        <a href="mailto:demo@natime.xyz">demo@natime.xyz</a>
                      </span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span>{t('Hỗ trợ khách hàng:', 'Support:')}</span>
                      <span className="font-medium text-foreground hover:text-primary transition-colors">
                        <a href="mailto:support@natime.xyz">support@natime.xyz</a>
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Hours Card */}
              <div className="flex gap-4 p-5 rounded-xl border border-border/80 bg-card/65 backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    {t('Thời gian làm việc', 'Business Hours')}
                  </h3>
                  <div className="mt-1.5 space-y-1 text-sm text-muted">
                    <p className="flex justify-between gap-4">
                      <span>{t('Thứ 2 - Thứ 6:', 'Mon - Fri:')}</span>
                      <span className="text-foreground">8:00 - 17:30</span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span>{t('Thứ 7:', 'Saturday:')}</span>
                      <span className="text-foreground">8:00 - 12:00</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links Card */}
              <div className="p-5 rounded-xl border border-border/80 bg-card/65 backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20">
                <h3 className="text-base font-semibold text-foreground mb-3">
                  {t('Kết nối với chúng tôi', 'Connect with Us')}
                </h3>
                <div className="flex gap-3">
                  <a
                    href="https://facebook.com/natime"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-card border border-border text-muted hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 cursor-pointer"
                    aria-label="Facebook"
                  >
                    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com/company/natime"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-card border border-border text-muted hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 cursor-pointer"
                    aria-label="LinkedIn"
                  >
                    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/natime"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-card border border-border text-muted hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 cursor-pointer"
                    aria-label="GitHub"
                  >
                    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Request Demo Form */}
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden bg-card border border-border shadow-xl rounded-xl p-6 sm:p-8">
                {/* Accent glow on top right */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full -z-1 opacity-20"
                  aria-hidden="true"
                  style={{
                    background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
                  }}
                />

                {isSubmitted ? (
                  /* Success/Thank You Card */
                  <div className="flex flex-col items-center text-center py-8 px-4 animate-fade-in-up">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success mb-6">
                      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>

                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      {t('Gửi yêu cầu thành công!', 'Request Submitted Successfully!')}
                    </h2>

                    <div className="text-sm text-muted leading-relaxed max-w-md mb-8 space-y-4">
                      <p>
                        {t(
                          `Cảm ơn bạn, ${form.fullName}. Chúng tôi đã tiếp nhận yêu cầu từ công ty ${form.companyName}.`,
                          `Thank you, ${form.fullName}. We have received your request from ${form.companyName}.`
                        )}
                      </p>
                      <p>
                        {t(
                          `Đội ngũ chuyên viên tư vấn của nATime sẽ liên hệ với bạn qua email ${form.workEmail} hoặc số điện thoại ${form.phoneNumber} trong vòng 2 giờ làm việc để xếp lịch trình bày và cấp tài khoản trải nghiệm.`,
                          `Our consulting experts at nATime will reach out to you via ${form.workEmail} or ${form.phoneNumber} within 2 business hours to schedule a product walkthrough and provision your trial account.`
                        )}
                      </p>
                    </div>

                    <button
                      onClick={handleReset}
                      className="inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary-hover px-5 h-9 text-sm font-semibold text-white shadow-md shadow-primary/20 hover:shadow-lg transition-all duration-200 cursor-pointer"
                    >
                      {t('Gửi yêu cầu khác', 'Submit Another Request')}
                    </button>
                  </div>
                ) : (
                  /* Form */
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                        {t('Yêu cầu tư vấn & Demo', 'Consultation & Demo Request')}
                      </h2>
                      <p className="text-xs sm:text-sm text-muted mt-1">
                        {t(
                          'Vui lòng hoàn tất thông tin bên dưới để đăng ký một buổi giới thiệu chi tiết sản phẩm.',
                          'Please complete the form below to register a detailed product walkthrough.'
                        )}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-semibold text-muted mb-1">
                          {t('Họ và tên *', 'Full Name *')}
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={form.fullName}
                          onChange={handleInputChange}
                          className={`h-[34px] px-3 py-1 text-sm border ${
                            errors.fullName ? 'border-danger focus:ring-danger focus:border-danger' : 'border-border focus:ring-primary focus:border-primary'
                          } rounded-md bg-background text-foreground w-full focus:outline-none focus:ring-1 transition-all duration-200`}
                          placeholder={t('Nguyễn Văn A', 'John Doe')}
                        />
                        {errors.fullName && (
                          <p className="text-[11px] text-danger mt-1 font-medium">{errors.fullName}</p>
                        )}
                      </div>

                      {/* Work Email */}
                      <div>
                        <label className="block text-xs font-semibold text-muted mb-1">
                          {t('Email công việc *', 'Work Email *')}
                        </label>
                        <input
                          type="email"
                          name="workEmail"
                          value={form.workEmail}
                          onChange={handleInputChange}
                          className={`h-[34px] px-3 py-1 text-sm border ${
                            errors.workEmail ? 'border-danger focus:ring-danger focus:border-danger' : 'border-border focus:ring-primary focus:border-primary'
                          } rounded-md bg-background text-foreground w-full focus:outline-none focus:ring-1 transition-all duration-200`}
                          placeholder="name@company.com"
                        />
                        {errors.workEmail && (
                          <p className="text-[11px] text-danger mt-1 font-medium">{errors.workEmail}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone Number */}
                      <div>
                        <label className="block text-xs font-semibold text-muted mb-1">
                          {t('Số điện thoại *', 'Phone Number *')}
                        </label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={form.phoneNumber}
                          onChange={handleInputChange}
                          className={`h-[34px] px-3 py-1 text-sm border ${
                            errors.phoneNumber ? 'border-danger focus:ring-danger focus:border-danger' : 'border-border focus:ring-primary focus:border-primary'
                          } rounded-md bg-background text-foreground w-full focus:outline-none focus:ring-1 transition-all duration-200`}
                          placeholder="0901234567"
                        />
                        {errors.phoneNumber && (
                          <p className="text-[11px] text-danger mt-1 font-medium">{errors.phoneNumber}</p>
                        )}
                      </div>

                      {/* Company Name */}
                      <div>
                        <label className="block text-xs font-semibold text-muted mb-1">
                          {t('Tên công ty *', 'Company Name *')}
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={form.companyName}
                          onChange={handleInputChange}
                          className={`h-[34px] px-3 py-1 text-sm border ${
                            errors.companyName ? 'border-danger focus:ring-danger focus:border-danger' : 'border-border focus:ring-primary focus:border-primary'
                          } rounded-md bg-background text-foreground w-full focus:outline-none focus:ring-1 transition-all duration-200`}
                          placeholder={t('Công ty ABC', 'ABC Corporation')}
                        />
                        {errors.companyName && (
                          <p className="text-[11px] text-danger mt-1 font-medium">{errors.companyName}</p>
                        )}
                      </div>
                    </div>

                    {/* Number of Employees */}
                    <div>
                      <label className="block text-xs font-semibold text-muted mb-1">
                        {t('Quy mô nhân sự *', 'Number of Employees *')}
                      </label>
                      <select
                        name="employeeCount"
                        value={form.employeeCount}
                        onChange={handleInputChange}
                        className={`h-[34px] px-3 py-1 text-sm border ${
                          errors.employeeCount ? 'border-danger focus:ring-danger focus:border-danger' : 'border-border focus:ring-primary focus:border-primary'
                        } rounded-md bg-background text-foreground w-full focus:outline-none focus:ring-1 transition-all duration-200 cursor-pointer`}
                      >
                        <option value="">-- {t('Chọn quy mô nhân sự', 'Select size')} --</option>
                        <option value="under-100">{t('Dưới 100 nhân sự', 'Under 100 employees')}</option>
                        <option value="100-500">{t('Từ 100 - 500 nhân sự', '100 - 500 employees')}</option>
                        <option value="500-1000">{t('Từ 500 - 1.000 nhân sự', '500 - 1,000 employees')}</option>
                        <option value="1000-5000">{t('Từ 1.000 - 5.000 nhân sự', '1,000 - 5,000 employees')}</option>
                        <option value="over-5000">{t('Trên 5.000 nhân sự', 'Over 5,000 employees')}</option>
                      </select>
                      {errors.employeeCount && (
                        <p className="text-[11px] text-danger mt-1 font-medium">{errors.employeeCount}</p>
                      )}
                    </div>

                    {/* Modules Interested In */}
                    <div>
                      <label className="block text-xs font-semibold text-muted mb-2">
                        {t('Phân hệ quan tâm', 'Modules Interested In')}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {/* Attendance */}
                        <label className="flex items-center gap-2.5 rounded-lg border border-border bg-background px-3 py-2 hover:border-primary/20 transition-all duration-200 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.modules.attendance}
                            onChange={() => handleCheckboxChange('attendance')}
                            className="rounded text-primary focus:ring-primary border-border bg-background h-4 w-4 cursor-pointer"
                          />
                          <span className="text-xs font-medium text-foreground select-none">
                            {t('Chấm công thông minh', 'Smart Attendance')}
                          </span>
                        </label>

                        {/* Gate */}
                        <label className="flex items-center gap-2.5 rounded-lg border border-border bg-background px-3 py-2 hover:border-primary/20 transition-all duration-200 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.modules.gate}
                            onChange={() => handleCheckboxChange('gate')}
                            className="rounded text-primary focus:ring-primary border-border bg-background h-4 w-4 cursor-pointer"
                          />
                          <span className="text-xs font-medium text-foreground select-none">
                            {t('Kiểm soát Cổng ra vào', 'Gate Access Control')}
                          </span>
                        </label>

                        {/* IT Assets */}
                        <label className="flex items-center gap-2.5 rounded-lg border border-border bg-background px-3 py-2 hover:border-primary/20 transition-all duration-200 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.modules.itAssets}
                            onChange={() => handleCheckboxChange('itAssets')}
                            className="rounded text-primary focus:ring-primary border-border bg-background h-4 w-4 cursor-pointer"
                          />
                          <span className="text-xs font-medium text-foreground select-none">
                            {t('Tài sản CNTT', 'IT Asset Management')}
                          </span>
                        </label>

                        {/* Weighbridge */}
                        <label className="flex items-center gap-2.5 rounded-lg border border-border bg-background px-3 py-2 hover:border-primary/20 transition-all duration-200 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.modules.weighbridge}
                            onChange={() => handleCheckboxChange('weighbridge')}
                            className="rounded text-primary focus:ring-primary border-border bg-background h-4 w-4 cursor-pointer"
                          />
                          <span className="text-xs font-medium text-foreground select-none">
                            {t('Trạm cân / Cân xe', 'Weighbridge')}
                          </span>
                        </label>

                        {/* Mobile App */}
                        <label className="flex items-center gap-2.5 rounded-lg border border-border bg-background px-3 py-2 hover:border-primary/20 transition-all duration-200 cursor-pointer sm:col-span-2">
                          <input
                            type="checkbox"
                            checked={form.modules.mobileApp}
                            onChange={() => handleCheckboxChange('mobileApp')}
                            className="rounded text-primary focus:ring-primary border-border bg-background h-4 w-4 cursor-pointer"
                          />
                          <span className="text-xs font-medium text-foreground select-none">
                            {t('Ứng dụng di động (Mobile App)', 'Mobile Application')}
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Message textarea */}
                    <div>
                      <label className="block text-xs font-semibold text-muted mb-1">
                        {t('Yêu cầu chi tiết & Lời nhắn', 'Message / Detailed Requirements')}
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleInputChange}
                        rows={3}
                        className="py-1.5 px-3 text-sm border border-border rounded-md bg-background text-foreground w-full focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-200 min-h-[70px] max-h-[150px]"
                        placeholder={t(
                          'Mô tả các yêu cầu cụ thể của doanh nghiệp tại đây...',
                          'Describe any specific business requirements here...'
                        )}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative flex w-full h-11 items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary hover:bg-primary-hover px-5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] disabled:opacity-75 disabled:pointer-events-none cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          {t('Đang gửi...', 'Submitting...')}
                        </span>
                      ) : (
                        <>
                          <span className="relative z-10 flex items-center gap-1.5">
                            {t('Gửi yêu cầu Demo', 'Submit Request')}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </>
                      )}
                      <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
