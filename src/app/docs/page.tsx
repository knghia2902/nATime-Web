'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/i18n';

// ── TYPES & INTERFACES ───────────────────────────────────────────────

interface SubTopic {
  id: string;
  titleVi: string;
  titleEn: string;
}

interface Category {
  id: string;
  titleVi: string;
  titleEn: string;
  topics: SubTopic[];
}

interface DocContent {
  breadcrumbsVi: string[];
  breadcrumbsEn: string[];
  titleVi: string;
  titleEn: string;
  descriptionVi: string;
  descriptionEn: string;
  renderContent: (t: (vi: string | { vi: string; en: string }, en?: string) => string) => React.JSX.Element;
}

// ── UTILITY COMPONENT: COPY BUTTON & CODE BLOCK ──────────────────────

function CodeBlock({ code, language, filename }: { code: string; language: string; filename?: string }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="my-5 overflow-hidden rounded-xl border border-border bg-slate-900 shadow-md text-slate-100 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-2 text-slate-400 select-none">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
          {filename && <span className="ml-2 text-[11px] font-sans text-slate-500 tracking-wide">{filename}</span>}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">{language}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded bg-slate-800 px-2 py-1 text-[11px] font-sans font-medium text-slate-300 transition-all hover:bg-slate-700 hover:text-white cursor-pointer active:scale-95"
          >
            {copied ? (
              <>
                <svg className="h-3 w-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-emerald-400 font-bold">{t('Đã chép!', 'Copied!')}</span>
              </>
            ) : (
              <>
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                <span>{t('Sao chép', 'Copy')}</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto p-4 leading-relaxed whitespace-pre bg-[#0f172a] text-[#f8fafc]">
        <code>{code}</code>
      </div>
    </div>
  );
}

// ── UTILITY COMPONENT: INTERACTIVE CHECKLIST ─────────────────────────

function ChecklistItem({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false);
  return (
    <label className="flex items-start gap-3 py-1 cursor-pointer select-none group">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
        className="mt-1 h-4 w-4 shrink-0 rounded border-border text-primary focus:ring-primary/20 accent-indigo-600 cursor-pointer"
      />
      <span className={`text-sm leading-relaxed transition-all duration-150 ${
        checked 
          ? 'text-muted line-through opacity-60' 
          : 'text-foreground group-hover:text-primary'
      }`}>
        {children}
      </span>
    </label>
  );
}

// ── MOCK SYSTEM DATA FOR DOCUMENTATION ───────────────────────────────

const categories: Category[] = [
  {
    id: 'getting-started',
    titleVi: 'Giới thiệu & Khởi chạy',
    titleEn: 'Getting Started',
    topics: [
      { id: 'introduction', titleVi: 'Giới thiệu tổng quan', titleEn: 'Introduction' },
      { id: 'quick-start', titleVi: 'Cài đặt nhanh 5 phút', titleEn: 'Quick Start' },
    ],
  },
  {
    id: 'installation',
    titleVi: 'Cài đặt & Triển khai',
    titleEn: 'Installation',
    topics: [
      { id: 'docker-deploy', titleVi: 'Docker Deployment', titleEn: 'Docker Deployment' },
      { id: 'net10-host', titleVi: 'Triển khai .NET 10 Host', titleEn: '.NET 10 Host Service' },
    ],
  },
  {
    id: 'device-integration',
    titleVi: 'Tích hợp Thiết bị',
    titleEn: 'Device Integration',
    topics: [
      { id: 'hikvision', titleVi: 'Kết nối Hikvision (ISUP)', titleEn: 'Hikvision (ISUP)' },
      { id: 'zkteco', titleVi: 'Kết nối ZKTeco (ADMS)', titleEn: 'ZKTeco (ADMS)' },
      { id: 'barie-gate', titleVi: 'Kết nối Barie Gate', titleEn: 'Barrier Gate Control' },
    ],
  },
  {
    id: 'attendance-rules',
    titleVi: 'Cấu hình Chấm công',
    titleEn: 'Attendance Rules',
    topics: [
      { id: 'shift-setup', titleVi: 'Thiết lập Ca làm việc', titleEn: 'Shift Setup' },
      { id: 'timesheet-setup', titleVi: 'Bảng công & Công thức', titleEn: 'Timesheet & Formulas' },
      { id: 'shift-assign', titleVi: 'Xếp lịch & Phân ca', titleEn: 'Scheduling & Shift Assignment' },
    ],
  },
  {
    id: 'security',
    titleVi: 'Bảo mật & Hệ thống',
    titleEn: 'Security & Access Control',
    topics: [
      { id: 'aes-encryption', titleVi: 'Mã hóa AES-256', titleEn: 'AES-256 Encryption' },
      { id: 'permission-mgmt', titleVi: 'Quản lý phân quyền RBAC', titleEn: 'Permission Management (RBAC)' },
    ],
  },
];

// ── CORE DOCUMENTATION CONTENT DEFINITION ─────────────────────────────

const docsContents: Record<string, DocContent> = {
  introduction: {
    breadcrumbsVi: ['Tài liệu', 'Giới thiệu & Khởi chạy', 'Giới thiệu tổng quan'],
    breadcrumbsEn: ['Docs', 'Getting Started', 'Introduction'],
    titleVi: 'Giới thiệu về nATime',
    titleEn: 'Introduction to nATime',
    descriptionVi: 'nATime là giải pháp toàn diện được phát triển trên kiến trúc Microservices hiện đại, hỗ trợ quản lý chấm công, giám sát an ninh và kiểm soát ra vào thời gian thực.',
    descriptionEn: 'nATime is a comprehensive solution built on modern Microservices architecture, supporting real-time time attendance, security surveillance, and access control management.',
    renderContent: (t) => (
      <div className="space-y-6">
        <p className="text-sm md:text-base leading-relaxed text-muted">
          {t(
            'Hệ thống nATime được thiết kế cho các doanh nghiệp quy mô lớn, nhà máy sản xuất, khu công nghiệp và tòa nhà văn phòng thông minh. Với khả năng tương thích cao, nATime kết nối trực tiếp đến hàng ngàn thiết bị sinh trắc học và cổng barie tự động một cách liền mạch.',
            'The nATime system is engineered for large-scale enterprises, manufacturing plants, industrial zones, and smart office buildings. With high compatibility, nATime connects directly to thousands of biometric terminals and automated gates seamlessly.'
          )}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="rounded-xl border border-border p-4 bg-card shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-bold text-foreground text-sm flex items-center gap-2 mb-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/10 text-primary">⚡</span>
              {t('Kiến trúc Real-time', 'Real-time Architecture')}
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              {t(
                'Dữ liệu quẹt thẻ, nhận diện khuôn mặt được đẩy về máy chủ ngay lập tức trong vòng dưới 1 giây qua giao thức TCP/IP, WebSockets và gRPC.',
                'Card swiping and facial recognition records are pushed to the server instantly under 1 second via TCP/IP, WebSockets, and gRPC.'
              )}
            </p>
          </div>
          <div className="rounded-xl border border-border p-4 bg-card shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-bold text-foreground text-sm flex items-center gap-2 mb-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/10 text-primary">⚙️</span>
              {t('Kết nối đa thiết bị', 'Multi-device Integration')}
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              {t(
                'Hỗ trợ tích hợp sâu các dòng máy chấm công Hikvision, Dahua, ZKTeco, Hanvon, Suprema cùng hệ thống kiểm soát cửa từ, Barie.',
                'Supports deep integration with Hikvision, Dahua, ZKTeco, Hanvon, Suprema attendance terminals and turnstile/barrier gate systems.'
              )}
            </p>
          </div>
          <div className="rounded-xl border border-border p-4 bg-card shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-bold text-foreground text-sm flex items-center gap-2 mb-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/10 text-primary">📊</span>
              {t('Báo cáo thông minh', 'Smart Reporting')}
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              {t(
                'Tự động tổng hợp bảng công dựa trên công thức tùy biến động, giúp bộ phận nhân sự tiết kiệm 95% thời gian xử lý cuối tháng.',
                'Automatically compiles timesheets based on dynamic custom formulas, saving HR departments 95% of processing time at the end of the month.'
              )}
            </p>
          </div>
          <div className="rounded-xl border border-border p-4 bg-card shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-bold text-foreground text-sm flex items-center gap-2 mb-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/10 text-primary">🔒</span>
              {t('An toàn bảo mật', 'Enterprise Security')}
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              {t(
                'Mã hóa cơ sở dữ liệu AES-256, bảo vệ thông tin sinh trắc học và phân quyền truy cập chi tiết tới từng nút chức năng và nhóm thiết bị.',
                'AES-256 database encryption, protecting biometric credentials and granting granular access down to buttons and device groups.'
              )}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-foreground">
          <div className="flex gap-3">
            <div className="shrink-0 p-1 text-emerald-600 dark:text-emerald-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h5 className="font-bold text-emerald-800 dark:text-emerald-400 mb-1">{t('Mô hình triển khai lai (Hybrid Model)', 'Hybrid Deployment Model')}</h5>
              <p className="text-muted leading-relaxed text-xs">
                {t(
                  'nATime hỗ trợ cả hai mô hình: Cloud SaaS (quản lý từ xa, không tốn chi phí hạ tầng) và On-Premises (tự lưu trữ hoàn toàn trên hệ thống máy chủ nội bộ của doanh nghiệp để đảm bảo tuyệt đối an toàn dữ liệu).',
                  'nATime supports both models: Cloud SaaS (remote management, zero infrastructure costs) and On-Premises (fully self-hosted on corporate servers for absolute data privacy).'
                )}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-foreground text-lg mb-3">{t('Tại sao các doanh nghiệp chọn nATime?', 'Why do companies choose nATime?')}</h4>
          <div className="space-y-2 bg-card border border-border p-4 rounded-xl">
            <ChecklistItem>
              {t('Thời gian xử lý dữ liệu quẹt thẻ thực tế đạt dưới 0.5 giây trên 10,000 nhân viên.', 'Swiping data processing time is under 0.5 seconds for over 10,000 employees.')}
            </ChecklistItem>
            <ChecklistItem>
              {t('Tính tương thích ngược mạnh mẽ, tận dụng tối đa hệ thống phần cứng sẵn có.', 'Powerful backward compatibility, maximizing the return on existing hardware.')}
            </ChecklistItem>
            <ChecklistItem>
              {t('API Open-Docs dễ dàng tích hợp vào phần mềm kế toán, ERP (SAP, Oracle) hoặc HRM.', 'Open-Docs API for painless integration with accounting, ERP (SAP, Oracle), or HRM systems.')}
            </ChecklistItem>
            <ChecklistItem>
              {t('Ứng dụng Mobile đi kèm hỗ trợ GPS / Wifi chấm công linh hoạt cho nhân viên làm việc bên ngoài.', 'Companion Mobile App supports GPS / Wifi geofencing for remote or field employees.')}
            </ChecklistItem>
          </div>
        </div>
      </div>
    ),
  },
  'quick-start': {
    breadcrumbsVi: ['Tài liệu', 'Giới thiệu & Khởi chạy', 'Cài đặt nhanh 5 phút'],
    breadcrumbsEn: ['Docs', 'Getting Started', 'Quick Start Guide'],
    titleVi: 'Cài đặt nhanh nATime trong 5 phút',
    titleEn: '5-Minute Quick Start Guide',
    descriptionVi: 'Hướng dẫn các bước cơ bản để thiết lập, khởi chạy và cấu hình kết nối thiết bị đầu tiên trên hệ thống nATime.',
    descriptionEn: 'Step-by-step guide to set up, launch, and configure your first device connection in nATime.',
    renderContent: (t) => (
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-foreground text-lg mb-3">{t('1. Kiểm tra điều kiện tiên quyết', '1. Prerequisite Checklist')}</h4>
          <p className="text-sm text-muted mb-3">
            {t('Trước khi cài đặt, hãy đảm bảo hệ điều hành của bạn đáp ứng các yêu cầu tối thiểu sau:', 'Before starting, ensure your operating system meets these minimum requirements:')}
          </p>
          <div className="space-y-2 bg-card border border-border p-4 rounded-xl">
            <ChecklistItem>
              {t('Docker v24.0 hoặc mới hơn và Docker Compose v2.20+ đã được cài đặt sẵn.', 'Docker v24.0 or newer and Docker Compose v2.20+ are installed.')}
            </ChecklistItem>
            <ChecklistItem>
              {t('Mở các cổng mạng: 8080 (Web UI), 8000 (Hikvision ISUP), 5000 (ZKTeco ADMS).', 'Open networking ports: 8080 (Web UI), 8000 (Hikvision ISUP), 5000 (ZKTeco ADMS).')}
            </ChecklistItem>
            <ChecklistItem>
              {t('Kết nối Internet ổn định để kéo Docker Images từ registry của nATime.', 'Stable internet connection to pull Docker images from nATime registry.')}
            </ChecklistItem>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-foreground text-lg mb-2">{t('2. Khởi chạy cài đặt tự động', '2. Run the Automated Installer')}</h4>
          <p className="text-sm text-muted mb-3">
            {t(
              'Sao chép và chạy dòng lệnh sau trên Terminal (Linux/macOS) hoặc PowerShell (Windows) để cài đặt tự động:',
              'Copy and run the following command in your Terminal (Linux/macOS) or PowerShell (Windows) to run the automated setup:'
            )}
          </p>
          <CodeBlock
            language="bash"
            code={`# Tải và chạy script cài đặt tự động cho nATime\n# Download and run the automated installer script\ncurl -sSL https://get.natime.xyz/install.sh | bash`}
          />
        </div>

        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-sm text-foreground">
          <div className="flex gap-3">
            <div className="shrink-0 p-1 text-yellow-600 dark:text-yellow-500">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h5 className="font-bold text-yellow-800 dark:text-yellow-500 mb-1">{t('Khuyến nghị bảo mật quan trọng', 'Important Security Recommendation')}</h5>
              <p className="text-muted leading-relaxed text-xs">
                {t(
                  'Tài khoản quản trị mặc định là "admin" với mật khẩu "nATime@2026". Hãy bắt buộc thay đổi mật khẩu này ngay trong lần đăng nhập đầu tiên tại mục Cài đặt hệ thống > Bảo mật để bảo vệ thông tin doanh nghiệp.',
                  'The default administrator account is "admin" with the password "nATime@2026". You are strictly required to change this password during your first login under System Settings > Security.'
                )}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-foreground text-lg mb-2">{t('3. Truy cập Bảng điều khiển', '3. Access Admin Dashboard')}</h4>
          <p className="text-sm text-muted">
            {t(
              'Sau khi script hoàn thành, mở trình duyệt và truy cập: http://localhost:8080. Đăng nhập để bắt đầu kết nối máy chấm công đầu tiên của bạn.',
              'Once the script finishes execution, open your web browser and navigate to: http://localhost:8080. Log in to start linking your first attendance terminal.'
            )}
          </p>
        </div>
      </div>
    ),
  },
  'docker-deploy': {
    breadcrumbsVi: ['Tài liệu', 'Cài đặt & Triển khai', 'Docker Deployment'],
    breadcrumbsEn: ['Docs', 'Installation', 'Docker Deployment'],
    titleVi: 'Triển khai nATime bằng Docker Compose',
    titleEn: 'Deploying nATime with Docker Compose',
    descriptionVi: 'Cấu hình chi tiết tệp docker-compose.yml phục vụ chạy production cho giải pháp nATime.',
    descriptionEn: 'Detailed docker-compose.yml configuration guidelines to run nATime in production environments.',
    renderContent: (t) => (
      <div className="space-y-6">
        <p className="text-sm text-muted">
          {t(
            'Phương thức triển khai qua Docker Compose giúp đồng bộ hóa các dịch vụ backend API, cơ sở dữ liệu PostgreSQL và dịch vụ cache Redis một cách chuẩn hóa, độc lập và dễ dàng mở rộng.',
            'Deploying via Docker Compose standardizes the integration of backend API, PostgreSQL databases, and Redis caching services in a standardized, isolated, and scalable manner.'
          )}
        </p>

        <div>
          <h4 className="font-bold text-foreground text-sm mb-2">{t('Cấu hình docker-compose.yml chuẩn', 'Standard docker-compose.yml configuration')}</h4>
          <CodeBlock
            language="yaml"
            filename="docker-compose.yml"
            code={`version: '3.8'\n\nservices:\n  natime-db:\n    image: postgres:15-alpine\n    container_name: natime-postgres\n    restart: always\n    environment:\n      POSTGRES_USER: natime_user\n      POSTGRES_PASSWORD: SecretSecurePassword99\n      POSTGRES_DB: natime_prod\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n    ports:\n      - "5432:5432"\n\n  natime-api:\n    image: natime/core-engine:latest\n    container_name: natime-api-service\n    restart: always\n    depends_on:\n      - natime-db\n    ports:\n      - "8080:80"\n      - "8000:8000"\n      - "5000:5000"\n    environment:\n      - ConnectionStrings__DefaultConnection=Host=natime-db;Database=natime-prod;Username=natime_user;Password=SecretSecurePassword99\n      - ASPNETCORE_ENVIRONMENT=Production\n      - Security__JwtSecret=VeryLongAndSecureSecretKeyWithAtLeast256BitsOfEntropyHere\n\nvolumes:\n  pgdata:\n    driver: local`}
          />
        </div>

        <div>
          <h4 className="font-bold text-foreground text-sm mb-2">{t('Lệnh vận hành container', 'Container operations commands')}</h4>
          <p className="text-sm text-muted mb-2">
            {t('Khởi động toàn bộ các dịch vụ chạy ngầm:', 'Start all services in background detached mode:')}
          </p>
          <CodeBlock language="bash" code="docker compose up -d" />
          <p className="text-sm text-muted mb-2">
            {t('Kiểm tra trạng thái hoạt động của các container:', 'Verify container execution status:')}
          </p>
          <CodeBlock language="bash" code="docker compose ps" />
        </div>

        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-sm text-foreground">
          <div className="flex gap-3">
            <div className="shrink-0 p-1 text-yellow-600 dark:text-yellow-500">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h5 className="font-bold text-yellow-800 dark:text-yellow-500 mb-1">{t('Sao lưu dữ liệu PostgreSQL định kỳ', 'Regular PostgreSQL backups')}</h5>
              <p className="text-muted leading-relaxed text-xs">
                {t(
                  'Không xóa volume "pgdata" khi cập nhật phiên bản (recreate container). Hãy đảm bảo lập lịch cron job tự động backup database PostgreSQL thông qua công cụ pg_dump hàng ngày để bảo toàn lịch sử chấm công.',
                  'Never delete the "pgdata" volume during software updates. Ensure you schedule daily pg_dump cron jobs for PostgreSQL to prevent loss of critical attendance logs.'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  'net10-host': {
    breadcrumbsVi: ['Tài liệu', 'Cài đặt & Triển khai', 'Triển khai .NET 10 Host'],
    breadcrumbsEn: ['Docs', 'Installation', '.NET 10 Host Service'],
    titleVi: 'Triển khai Cực chạy trên .NET 10',
    titleEn: '.NET 10 Core Engine Host Deployment',
    descriptionVi: 'Cài đặt và cấu hình nATime Core Engine dưới dạng Windows Service hoặc Linux daemon chạy trên nền tảng .NET 10.',
    descriptionEn: 'Install and configure nATime Core Engine as a native Windows Service or Linux daemon built on .NET 10 platform.',
    renderContent: (t) => (
      <div className="space-y-6">
        <p className="text-sm text-muted">
          {t(
            'nATime Core Engine được tối ưu hóa cho .NET 10 (lên tới 40% hiệu suất xử lý dữ liệu quẹt thẻ đồng thời và giảm dung lượng sử dụng RAM nhờ cải tiến GC). Thích hợp chạy trực tiếp trên Windows Server hoặc Linux OS không thông qua ảo hóa.',
            'nATime Core Engine is fully optimized for .NET 10 (delivering up to 40% higher throughput for concurrent card-swipe events and lower memory footprint due to GC improvements). Ideal for native Windows Server or Linux deployments without virtualization overhead.'
          )}
        </p>

        <div>
          <h4 className="font-bold text-foreground text-sm mb-2">{t('1. Biên dịch dự án', '1. Publish Application')}</h4>
          <CodeBlock
            language="powershell"
            code={`# Khôi phục và biên dịch phiên bản tự thực thi không cần cài runtime\n# Restore and publish self-contained package\ndotnet publish src/backend/nATime.Api -c Release -r win-x64 --self-contained -o C:\\nATime\\Service`}
          />
        </div>

        <div>
          <h4 className="font-bold text-foreground text-sm mb-2">{t('2. Cài đặt Windows Service', '2. Install Windows Service')}</h4>
          <p className="text-sm text-muted mb-2">
            {t('Sử dụng quyền Administrator để đăng ký dịch vụ chạy nền của Windows:', 'Use Administrator rights to register the Windows background service:')}
          </p>
          <CodeBlock
            language="powershell"
            code={`# Tạo service\nsc.exe create nATimeEngine binPath= "C:\\nATime\\Service\\nATime.Api.exe" start= auto\n\n# Khởi chạy service\nsc.exe start nATimeEngine`}
          />
        </div>

        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-foreground">
          <div className="flex gap-3">
            <div className="shrink-0 p-1 text-emerald-600 dark:text-emerald-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h5 className="font-bold text-emerald-800 dark:text-emerald-400 mb-1">{t('Tự động khôi phục dịch vụ', 'Automatic Service Recovery')}</h5>
              <p className="text-muted leading-relaxed text-xs">
                {t(
                  'Cấu hình cho Windows tự khởi động lại Service nATime khi gặp sự cố ngắt kết nối phần cứng bằng lệnh: "sc.exe failure nATimeEngine reset= 86400 actions= restart/60000/restart/60000".',
                  'Configure Windows to auto-restart the nATime Service if network hardware failure occurs: "sc.exe failure nATimeEngine reset= 86400 actions= restart/60000/restart/60000".'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  hikvision: {
    breadcrumbsVi: ['Tài liệu', 'Tích hợp Thiết bị', 'Kết nối Hikvision'],
    breadcrumbsEn: ['Docs', 'Device Integration', 'Hikvision (ISUP)'],
    titleVi: 'Kết nối Máy Chấm công Hikvision qua ISUP 5.0',
    titleEn: 'Hikvision Integration via ISUP 5.0 / EHome',
    descriptionVi: 'Hướng dẫn cấu hình thiết bị nhận diện khuôn mặt Hikvision đẩy dữ liệu quẹt thẻ thời gian thực trực tiếp về Server nATime.',
    descriptionEn: 'Guide to configure Hikvision face recognition terminals to push real-time attendance events directly to the nATime Server.',
    renderContent: (t) => (
      <div className="space-y-6">
        <p className="text-sm text-muted">
          {t(
            'Giao thức ISUP 5.0 (trước đây là EHome) cho phép máy chấm công Hikvision nằm ở chi nhánh mạng nội bộ (mạng LAN khác) đẩy trực tiếp dữ liệu về Máy chủ trung tâm của bạn qua mạng WAN/Internet mà không cần NAT port tại chi nhánh.',
            'The ISUP 5.0 protocol (formerly EHome) enables Hikvision terminals located behind regional LANs/private firewalls to push event records directly to your central Cloud/WAN server without complex local port-forwarding configurations.'
          )}
        </p>

        <div>
          <h4 className="font-bold text-foreground text-sm mb-2">{t('Các bước thiết lập trên thiết bị Hikvision', 'Steps to configure Hikvision Terminal')}</h4>
          <div className="space-y-2 bg-card border border-border p-4 rounded-xl">
            <ChecklistItem>
              {t('Truy cập trang cấu hình web của thiết bị Hikvision bằng địa chỉ IP của máy.', 'Log in to the Hikvision device web interface using its local IP address.')}
            </ChecklistItem>
            <ChecklistItem>
              {t('Đi tới: Network > Advanced Settings > Platform Access. Chọn Mode là "ISUP" hoặc "EHome".', 'Go to Network > Advanced Settings > Platform Access. Set Access Mode to "ISUP" or "EHome".')}
            </ChecklistItem>
            <ChecklistItem>
              {t('Nhập Server Address là IP/Domain của máy chủ nATime và Server Port là 8000.', 'Set Server Address to your nATime server IP/Domain and Server Port to 8000.')}
            </ChecklistItem>
            <ChecklistItem>
              {t('Thiết lập Device ID (Mã thiết bị) khớp với mã đã đăng ký trên giao diện Admin nATime.', 'Configure the Device ID to match the exact ID registered in the nATime Admin UI.')}
            </ChecklistItem>
            <ChecklistItem>
              {t('Lưu lại cấu hình và khởi động lại thiết bị nếu được yêu cầu.', 'Save settings and restart the terminal if prompted.')}
            </ChecklistItem>
          </div>
        </div>

        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-sm text-foreground">
          <div className="flex gap-3">
            <div className="shrink-0 p-1 text-yellow-600 dark:text-yellow-500">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h5 className="font-bold text-yellow-800 dark:text-yellow-500 mb-1">{t('Đồng bộ thời gian NTP', 'NTP Time Synchronization')}</h5>
              <p className="text-muted leading-relaxed text-xs">
                {t(
                  'Bắt buộc kích hoạt đồng bộ thời gian NTP trên thiết bị Hikvision đến máy chủ NTP trung tâm (ví dụ pool.ntp.org hoặc máy chủ nATime). Sai lệch thời gian vượt quá 10 giây sẽ làm sai lệch ca làm việc được tính toán.',
                  'Ensure NTP time sync is activated on the Hikvision device linking to a stable NTP Server (e.g. pool.ntp.org). Time discrepancies exceeding 10 seconds will lead to shifted work hours processing.'
                )}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-foreground text-sm mb-2">{t('Định dạng Webhook Event từ thiết bị', 'Device Webhook Event JSON format')}</h4>
          <CodeBlock
            language="json"
            code={`{\n  "ipAddress": "192.168.1.120",\n  "port": 8000,\n  "eventTime": "2026-07-11T12:00:00.000Z",\n  "eventType": "faceRecognition",\n  "employeeCode": "EMP089",\n  "cardNo": "987654321",\n  "temperature": 36.5\n}`}
          />
        </div>
      </div>
    ),
  },
  zkteco: {
    breadcrumbsVi: ['Tài liệu', 'Tích hợp Thiết bị', 'Kết nối ZKTeco'],
    breadcrumbsEn: ['Docs', 'Device Integration', 'ZKTeco (ADMS)'],
    titleVi: 'Kết nối Máy Chấm công ZKTeco qua ADMS',
    titleEn: 'ZKTeco Integration via ADMS Protocol',
    descriptionVi: 'Cấu hình giao thức truyền tải dữ liệu tự động ADMS trên các dòng máy vân tay và khuôn mặt ZKTeco.',
    descriptionEn: 'Configure ADMS (Automatic Data Master Server) communications on ZKTeco fingerprint and facial terminals.',
    renderContent: (t) => (
      <div className="space-y-6">
        <p className="text-sm text-muted">
          {t(
            'Giao thức ADMS của ZKTeco giúp thiết bị tự động đồng bộ vân tay, khuôn mặt và dữ liệu chấm công trực tiếp về Web Server trung tâm mà không cần sử dụng SDK cục bộ phức tạp hay NAT IP tĩnh.',
            'ZKTeco ADMS protocol allows devices to sync fingerprints, faces, and transaction logs directly to the central cloud web server, removing the need for local desktop SDK operations or static WAN IPs.'
          )}
        </p>

        <div>
          <h4 className="font-bold text-foreground text-sm mb-2">{t('Thông số cấu hình trên thiết bị ZKTeco', 'Configuration parameters on ZKTeco Device')}</h4>
          <p className="text-sm text-muted mb-2">
            {t('Truy cập menu Comm. > Cloud Server Setting trên thiết bị và thiết lập:', 'Go to Comm. > Cloud Server Setting menu on the device and configure:')}
          </p>
          <CodeBlock
            language="ini"
            code={`# Kích hoạt máy chủ đám mây\nServer Address: 192.168.1.50   # Thay bằng IP/Domain máy chủ nATime\nServer Port: 5000               # Cổng ADMS của nATime Core\nEnable Proxy: Off\nEnable Auto Upload: Yes         # Bật tự động đẩy dữ liệu`}
          />
        </div>

        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-sm text-foreground">
          <div className="flex gap-3">
            <div className="shrink-0 p-1 text-yellow-600 dark:text-yellow-500">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h5 className="font-bold text-yellow-800 dark:text-yellow-500 mb-1">{t('Kích hoạt bản quyền ADMS', 'ADMS License Activation')}</h5>
              <p className="text-muted leading-relaxed text-xs">
                {t(
                  'Một số dòng máy ZKTeco yêu cầu phải kích hoạt bản quyền tính năng ADMS từ hãng sản xuất trước khi có thể truyền dữ liệu. Vui lòng liên hệ nhà phân phối phần cứng nếu không tìm thấy mục "Cloud Server" trong cài đặt.',
                  'Certain ZKTeco models require a pre-activated ADMS firmware license from the manufacturer. Please contact your hardware distributor if the "Cloud Server" settings menu is missing.'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  'barie-gate': {
    breadcrumbsVi: ['Tài liệu', 'Tích hợp Thiết bị', 'Kết nối Barie Gate'],
    breadcrumbsEn: ['Docs', 'Device Integration', 'Barrier Gate Control'],
    titleVi: 'Điều khiển Cổng Barie & Cửa Từ',
    titleEn: 'Barrier Gate & Turnstile Controller Integration',
    descriptionVi: 'Cấu hình kích hoạt đóng/mở barie tự động và tích hợp camera chụp ảnh biển số khi xe đi qua trạm kiểm soát.',
    descriptionEn: 'Configure automatic opening/closing triggers for barrier gates and integrate license plate recognition cameras at checkpoints.',
    renderContent: (t) => (
      <div className="space-y-6">
        <p className="text-sm text-muted">
          {t(
            'nATime kết nối trực tiếp với bộ điều khiển cổng TCP/IP thông qua tín hiệu rơ-le (IO Relay). Khi nhân viên hoặc phương tiện quẹt thẻ/quét khuôn mặt thành công, hệ thống gửi lệnh đóng mở tức thì.',
            'nATime communicates directly with TCP/IP gate controllers using relay signal protocols. Upon validated facial authentication or card swipes, an instant trigger command is sent.'
          )}
        </p>

        <div>
          <h4 className="font-bold text-foreground text-sm mb-2">{t('API Gửi lệnh Mở Barie khẩn cấp', 'Emergency Open Gate API Call')}</h4>
          <CodeBlock
            language="json"
            code={`POST /api/v1/devices/gate-control\nHeaders: Authorization: Bearer <token>\n\n{\n  "deviceId": "GATE_LOBBY_ENTRY",\n  "action": "OPEN",\n  "durationMs": 3000,\n  "reason": "Emergency override"\n}`}
          />
        </div>

        <div>
          <h4 className="font-bold text-foreground text-sm mb-2">{t('Các bước kiểm tra an toàn phần cứng', 'Hardware safety validation checks')}</h4>
          <div className="space-y-2 bg-card border border-border p-4 rounded-xl">
            <ChecklistItem>
              {t('Kiểm tra vòng từ cảm biến xe (Loop detector) hoạt động ổn định để tránh hạ thanh barie đè lên xe.', 'Test the vehicle loop detector loop functionality to prevent gate arm descending onto vehicles.')}
            </ChecklistItem>
            <ChecklistItem>
              {t('Đo độ trễ mạng ping đến bộ điều khiển IO Relay đảm bảo dưới 50ms.', 'Verify network latency to the IO Relay controller is under 50ms.')}
            </ChecklistItem>
          </div>
        </div>
      </div>
    ),
  },
  'shift-setup': {
    breadcrumbsVi: ['Tài liệu', 'Cấu hình Chấm công', 'Thiết lập Ca làm việc'],
    breadcrumbsEn: ['Docs', 'Attendance Rules', 'Shift Setup'],
    titleVi: 'Thiết lập Ca làm việc linh hoạt',
    titleEn: 'Flexible Shift Configuration',
    descriptionVi: 'Hướng dẫn cấu hình ca hành chính, ca xoay, ca đêm, ca gãy và các quy tắc đi muộn về sớm.',
    descriptionEn: 'Guide to configure standard, rotating, night, split shifts, and grace rules for tardiness or early exits.',
    renderContent: (t) => (
      <div className="space-y-6">
        <p className="text-sm text-muted">
          {t(
            'nATime hỗ trợ cấu hình đa dạng các loại ca đáp ứng đặc thù sản xuất của nhà máy (ca 12 tiếng, ca đêm gối ngày) cũng như khối văn phòng (ca hành chính nghỉ trưa).',
            'nATime supports a rich array of shift structures matching complex industrial setups (12-hour shifts, cross-day night shifts) and standard office schedules.'
          )}
        </p>

        <div>
          <h4 className="font-bold text-foreground text-sm mb-2">{t('Định nghĩa cấu trúc Ca trong hệ thống', 'Shift structure schema code example')}</h4>
          <CodeBlock
            language="typescript"
            code={`interface ShiftRule {\n  code: "OFFICE_NORMAL";\n  name: "Hành chính văn phòng";\n  startTime: "08:00";\n  endTime: "17:00";\n  graceInMinutes: 15;        // Cho phép đi muộn tối đa 15p\n  halfDayThresholdMin: 240;  // Quẹt dưới 4 tiếng tính nửa công\n  breakTimeStart: "12:00";\n  breakTimeEnd: "13:00";\n}`}
          />
        </div>

        <div>
          <h4 className="font-bold text-foreground text-sm mb-2">{t('Lưu ý khi thiết lập ca qua đêm (Night Shift)', 'Important notes for night shift configurations')}</h4>
          <div className="space-y-2 bg-card border border-border p-4 rounded-xl">
            <ChecklistItem>
              {t('Phải tích chọn thuộc tính "Ca qua đêm" (IsNightShift) để hệ thống nhận diện đúng giờ ra ngày hôm sau.', 'Enable the "IsNightShift" flag so the system matches clock-outs falling on the following calendar day.')}
            </ChecklistItem>
            <ChecklistItem>
              {t('Xác định giờ chốt ngày (Day Cutoff Time) là 04:00 sáng để chia tách dữ liệu quẹt thẻ giữa 2 ngày.', 'Set the "Day Cutoff Time" to 04:00 AM to properly separate logs between two consecutive days.')}
            </ChecklistItem>
          </div>
        </div>
      </div>
    ),
  },
  'timesheet-setup': {
    breadcrumbsVi: ['Tài liệu', 'Cấu hình Chấm công', 'Bảng công & Công thức'],
    breadcrumbsEn: ['Docs', 'Attendance Rules', 'Timesheet & Formulas'],
    titleVi: 'Cấu hình Công thức Tính Công tự động',
    titleEn: 'Automated Timesheet Formula Customization',
    descriptionVi: 'Cách thức viết mã động để tính toán ngày công, giờ tăng ca (OT) và tự động hóa kết xuất Excel.',
    descriptionEn: 'How to write dynamic scripts to compute paid days, overtime multipliers, and automate spreadsheet generation.',
    renderContent: (t) => (
      <div className="space-y-6">
        <p className="text-sm text-muted">
          {t(
            'nATime sở hữu bộ máy biên dịch công thức (Formula Engine) viết bằng C#, cho phép thiết lập biểu thức tính toán động dựa trên luật lao động riêng của từng doanh nghiệp.',
            'nATime features a C#-based Formula Engine that processes dynamic expressions tailored to your business rules and local labor compliance policies.'
          )}
        </p>

        <div>
          <h4 className="font-bold text-foreground text-sm mb-2">{t('Ví dụ Công thức tính Công chuẩn trong ngày', 'Daily Work Day calculation code example')}</h4>
          <CodeBlock
            language="csharp"
            code={`// Định nghĩa công thức tính công hành chính chuẩn\ndouble CalculateWorkDay(double totalWorkMinutes, double lateMinutes) {\n    if (totalWorkMinutes < 240) return 0.0;     // Làm dưới 4 tiếng tính nghỉ phép\n    if (totalWorkMinutes < 480) return 0.5;     // Làm từ 4h - 8h tính nửa công\n    \n    // Nếu đi muộn trên 30 phút, trừ 0.05 ngày công phạt\n    double penalty = (lateMinutes > 30) ? 0.05 : 0.0;\n    return 1.0 - penalty;\n}`}
          />
        </div>

        <div>
          <h4 className="font-bold text-foreground text-sm mb-2">{t('Hệ số nhân tăng ca (OT Multipliers)', 'Overtime multipliers setup')}</h4>
          <div className="space-y-2 bg-card border border-border p-4 rounded-xl">
            <ChecklistItem>
              {t('Ngày thường (Workdays): Nhân hệ số 1.5.', 'Normal working days: 1.5x multiplier.')}
            </ChecklistItem>
            <ChecklistItem>
              {t('Ngày nghỉ tuần (Weekends): Nhân hệ số 2.0.', 'Weekly days off (Sunday/Saturday): 2.0x multiplier.')}
            </ChecklistItem>
            <ChecklistItem>
              {t('Ngày lễ/Tết (Public Holidays): Nhân hệ số 3.0.', 'National holidays: 3.0x multiplier.')}
            </ChecklistItem>
          </div>
        </div>
      </div>
    ),
  },
  'shift-assign': {
    breadcrumbsVi: ['Tài liệu', 'Cấu hình Chấm công', 'Xếp lịch & Phân ca'],
    breadcrumbsEn: ['Docs', 'Attendance Rules', 'Scheduling & Shift Assignment'],
    titleVi: 'Xếp lịch & Phân ca làm việc Nhân viên',
    titleEn: 'Employee Scheduling & Shift Assignment',
    descriptionVi: 'Xếp lịch làm việc định kỳ, quản lý phân ca tự động theo tuần hoặc theo chu kỳ sản xuất lặp.',
    descriptionEn: 'Schedule recurring shifts, manage automatic weekly assignments, or configure cyclical production rotations.',
    renderContent: (t) => (
      <div className="space-y-6">
        <p className="text-sm text-muted">
          {t(
            'Việc phân ca có thể thực hiện thủ công cho từng nhân sự hoặc tự động áp dụng lịch làm việc chu kỳ cố định cho cả bộ phận phòng ban.',
            'Shift assignment can be executed manually for individuals or mass-assigned to complete departments using cyclical rota templates.'
          )}
        </p>

        <div>
          <h4 className="font-bold text-foreground text-sm mb-2">{t('Các bước cấu hình phân ca chu kỳ (Cycle Roster)', 'Steps to assign cyclical rosters')}</h4>
          <div className="space-y-2 bg-card border border-border p-4 rounded-xl">
            <ChecklistItem>
              {t('Tạo chu kỳ ca (Ví dụ: 2 ca ngày, 2 ca đêm, 2 ngày nghỉ - Chu kỳ 6 ngày).', 'Define the rotation sequence (e.g. 2 Day shifts, 2 Night shifts, 2 Days off - 6-day cycle).')}
            </ChecklistItem>
            <ChecklistItem>
              {t('Chọn ngày bắt đầu áp dụng chu kỳ để làm mốc tính toán lịch biểu.', 'Select the starting calendar date to anchor the rotation timeline.')}
            </ChecklistItem>
            <ChecklistItem>
              {t('Gán danh sách nhân sự thực hiện theo chu kỳ này.', 'Map selected employee lists to this rotation scheme.')}
            </ChecklistItem>
          </div>
        </div>
      </div>
    ),
  },
  'aes-encryption': {
    breadcrumbsVi: ['Tài liệu', 'Bảo mật & Hệ thống', 'Mã hóa AES-256'],
    breadcrumbsEn: ['Docs', 'Security & Access', 'AES-256 Encryption'],
    titleVi: 'Mã hóa và An toàn Dữ liệu Sinh trắc học',
    titleEn: 'AES-256 Encryption & Biometric Data Security',
    descriptionVi: 'nATime áp dụng các tiêu chuẩn an ninh nghiêm ngặt nhất để mã hóa dữ liệu nhân viên và truyền tải an toàn.',
    descriptionEn: 'nATime implements strict security standards to encrypt employee records and secure communication channels.',
    renderContent: (t) => (
      <div className="space-y-6">
        <p className="text-sm text-muted">
          {t(
            'Thông tin nhạy cảm của nhân sự bao gồm: mã PIN, khuôn mặt, mã hóa vân tay và dữ liệu đăng nhập được bảo mật nghiêm ngặt thông qua thuật toán mã hóa đối xứng AES-256-GCM.',
            'Sensitive identity variables including: access PINs, fingerprint templates, and user login credentials are encrypted at rest using AES-256-GCM.'
          )}
        </p>

        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-foreground">
          <div className="flex gap-3">
            <div className="shrink-0 p-1 text-emerald-600 dark:text-emerald-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h5 className="font-bold text-emerald-800 dark:text-emerald-400 mb-1">{t('Bảo vệ vân tay & khuôn mặt', 'Biometric credential hashing')}</h5>
              <p className="text-muted leading-relaxed text-xs">
                {t(
                  'nATime không lưu trữ ảnh khuôn mặt gốc hoặc mẫu vân tay gốc dưới dạng hình ảnh thông thường. Các mẫu sinh trắc học được băm thành các vector số nhị phân mã hóa một chiều, không thể khôi phục lại ảnh gốc nếu bị rò rỉ.',
                  'nATime never stores raw face photos or fingerprint images in the database. Biometric credentials are mathematical one-way vector signatures that cannot be reconstructed back to the original face or finger print.'
                )}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-foreground text-sm mb-2">{t('Cấu hình Khóa Mã hóa cơ sở dữ liệu', 'Database encryption settings sample')}</h4>
          <CodeBlock
            language="json"
            filename="appsettings.json"
            code={`{\n  "Security": {\n    "DbEncryptionEnabled": true,\n    "Algorithm": "AES_256_GCM",\n    "KeyRotationIntervalDays": 90,\n    "EncryptionKey": "EncryptedKeyStoredInSecureAzureKeyVaultOrAwsKMS"\n  }\n}`}
          />
        </div>
      </div>
    ),
  },
  'permission-mgmt': {
    breadcrumbsVi: ['Tài liệu', 'Bảo mật & Hệ thống', 'Quản lý phân quyền RBAC'],
    breadcrumbsEn: ['Docs', 'Security & Access', 'Permission Management (RBAC)'],
    titleVi: 'Phân quyền Dựa trên Vai trò (RBAC)',
    titleEn: 'Role-Based Access Control (RBAC)',
    descriptionVi: 'Quản lý phân quyền nhân sự điều hành, giới hạn quyền truy cập theo từng chi nhánh, phòng ban hoặc cụm thiết bị.',
    descriptionEn: 'Manage administrative roles, restricting system rights to specific branches, departments, or device zones.',
    renderContent: (t) => (
      <div className="space-y-6">
        <p className="text-sm text-muted">
          {t(
            'Hệ thống phân quyền RBAC của nATime cho phép quản trị viên cấp cao (Super Admin) tạo lập các vai trò cụ thể cho nhân viên nhân sự, nhân viên IT vận hành, hoặc bảo vệ trực cổng.',
            'nATime RBAC mechanism empowers Super Administrators to establish granular access groups targeting HR managers, IT operators, or security guards.'
          )}
        </p>

        <div>
          <h4 className="font-bold text-foreground text-sm mb-2">{t('Bảng phân cấp vai trò hệ thống', 'System default roles matrix')}</h4>
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border bg-slate-50 dark:bg-slate-900/50">
                  <th className="p-3 font-bold text-foreground">{t('Vai trò', 'Role')}</th>
                  <th className="p-3 font-bold text-foreground">{t('Phạm vi dữ liệu', 'Data Scope')}</th>
                  <th className="p-3 font-bold text-foreground">{t('Quyền hạn chính', 'Key Privileges')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted">
                <tr>
                  <td className="p-3 font-semibold text-foreground">Super Admin</td>
                  <td className="p-3">{t('Toàn bộ hệ thống', 'All sites / global')}</td>
                  <td className="p-3">{t('Toàn quyền cấu hình và phân quyền', 'Full configuration & user rights management')}</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-foreground">HR Manager</td>
                  <td className="p-3">{t('Nhân viên phụ trách', 'Assigned departments')}</td>
                  <td className="p-3">{t('Cấu hình ca, duyệt bảng công, đăng ký nhân viên', 'Shift setup, timesheet approvals, employee enrollment')}</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-foreground">IT Operator</td>
                  <td className="p-3">{t('Cụm thiết bị phụ trách', 'Assigned device groups')}</td>
                  <td className="p-3">{t('Cấu hình IP, kiểm tra kết nối thiết bị, xem logs hệ thống', 'IP configuration, device monitoring, inspect system logs')}</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-foreground">Security Guard</td>
                  <td className="p-3">{t('Cửa/Cổng chỉ định', 'Assigned gates / turnstiles')}</td>
                  <td className="p-3">{t('Mở cổng khẩn cấp, xem sự kiện quét thẻ real-time', 'Emergency remote gate release, monitor real-time event logs')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-foreground text-sm mb-2">{t('Các bước gán quyền cho tài khoản mới', 'Steps to assign permissions to a new account')}</h4>
          <div className="space-y-2 bg-card border border-border p-4 rounded-xl">
            <ChecklistItem>
              {t('Truy cập: Hệ thống > Quản trị viên. Tạo tài khoản đăng nhập.', 'Go to System > Administrators. Add new login credentials.')}
            </ChecklistItem>
            <ChecklistItem>
              {t('Tại phần "Vai trò", chọn nhóm quyền tương ứng (ví dụ IT Operator).', 'Under "Roles", select the corresponding permission group (e.g. IT Operator).')}
            </ChecklistItem>
            <ChecklistItem>
              {t('Chọn phạm vi chi nhánh hoặc nhóm thiết bị mà tài khoản được quyền thao tác.', 'Select branch scopes or device groups this account is authorized to manage.')}
            </ChecklistItem>
          </div>
        </div>
      </div>
    ),
  },
};

// ── MAIN DOCUMENTATION CLIENT COMPONENT ──────────────────────────────

export default function DocsPage() {
  const { t, locale } = useLanguage();
  const [selectedTopicId, setSelectedTopicId] = useState('quick-start');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter topics based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const query = searchQuery.toLowerCase();
    return categories
      .map((cat) => {
        const matchingTopics = cat.topics.filter(
          (topic) =>
            topic.titleVi.toLowerCase().includes(query) ||
            topic.titleEn.toLowerCase().includes(query)
        );
        return {
          ...cat,
          topics: matchingTopics,
        };
      })
      .filter((cat) => cat.topics.length > 0);
  }, [searchQuery]);

  // Selected Doc Content
  const currentContent = useMemo(() => {
    return docsContents[selectedTopicId] || docsContents['quick-start'];
  }, [selectedTopicId]);

  // Handle switching topic
  const selectTopic = (id: string) => {
    setSelectedTopicId(id);
    setMobileMenuOpen(false);
    // Smooth scroll main content on mobile selection
    const element = document.getElementById('docs-main-content');
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  // Find a topic by ID to display in the dropdown selection button
  const currentTopicName = useMemo(() => {
    for (const cat of categories) {
      const tpc = cat.topics.find((t) => t.id === selectedTopicId);
      if (tpc) {
        return locale === 'vi' ? tpc.titleVi : tpc.titleEn;
      }
    }
    return locale === 'vi' ? 'Cài đặt nhanh 5 phút' : 'Quick Start';
  }, [selectedTopicId, locale]);

  return (
    <>
      <Navbar />

      <main className="flex-1 w-full bg-background text-foreground transition-colors duration-300 min-h-[calc(100vh-64px)] pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
          
          {/* ── HEADER TITLE BLOCK ──────────────────────────────── */}
          <header className="mb-8 border-b border-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2" style={{ margin: '0 0 3px 0' }}>
                <span className="text-gradient">nATime Docs</span>
              </h1>
              <p className="text-sm text-muted">
                {t(
                  'Tài liệu hướng dẫn triển khai hệ thống chấm công và kiểm soát cửa thông minh',
                  'Developer and operator guide to deploy smart attendance & gate access control'
                )}
              </p>
            </div>
            
            {/* Interactive Search Bar */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('Tìm kiếm tài liệu...', 'Search documentation...')}
                className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-border bg-card text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted hover:text-foreground cursor-pointer"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </header>

          {/* ── MOBILE ACCORDION CATEGORY BUTTON ───────────────── */}
          <div className="block lg:hidden mb-6 relative">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-full flex items-center justify-between p-3.5 rounded-xl border border-border bg-card font-semibold text-sm hover:bg-card-hover transition-colors duration-150 cursor-pointer"
            >
              <span className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                {t('Danh mục tài liệu:', 'Doc Section:')} <span className="text-primary font-bold">{currentTopicName}</span>
              </span>
              <svg
                className={`h-4 w-4 text-muted transform transition-transform duration-200 ${mobileMenuOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Mobile Dropdown Category List */}
            {mobileMenuOpen && (
              <div className="absolute top-[105%] left-0 right-0 z-30 rounded-xl border border-border bg-card p-4 shadow-xl max-h-[70vh] overflow-y-auto animate-fade-in-up duration-200">
                <div className="space-y-4">
                  {filteredCategories.length === 0 ? (
                    <div className="text-center py-4 text-xs text-muted">
                      {t('Không có kết quả tìm kiếm', 'No search results found')}
                    </div>
                  ) : (
                    filteredCategories.map((category) => (
                      <div key={category.id} className="space-y-1.5">
                        <div className="text-[11px] font-bold tracking-wider text-muted uppercase px-2.5">
                          {locale === 'vi' ? category.titleVi : category.titleEn}
                        </div>
                        <div className="space-y-0.5 pl-2">
                          {category.topics.map((topic) => (
                            <button
                              key={topic.id}
                              onClick={() => selectTopic(topic.id)}
                              className={`w-full text-left rounded-lg px-3 py-2 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                                selectedTopicId === topic.id
                                  ? 'bg-primary-light text-primary'
                                  : 'hover:bg-card-hover text-foreground'
                              }`}
                            >
                              <span className={`h-1.5 w-1.5 rounded-full ${selectedTopicId === topic.id ? 'bg-primary' : 'bg-transparent'}`} />
                              {locale === 'vi' ? topic.titleVi : topic.titleEn}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── TWO-COLUMN DESKTOP GRID ─────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8 items-start">
            
            {/* 1. LEFT COLUMN: SIDEBAR */}
            <aside className="hidden lg:block sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pr-2 border-r border-border/40 select-none">
              <div className="space-y-6">
                {filteredCategories.length === 0 ? (
                  <div className="text-center py-8 text-xs text-muted">
                    {t('Không tìm thấy kết quả', 'No results found')}
                  </div>
                ) : (
                  filteredCategories.map((category) => (
                    <div key={category.id} className="space-y-2">
                      <h3 className="text-[11px] font-extrabold tracking-wider text-muted uppercase px-2 flex items-center gap-1.5">
                        <svg className="h-3.5 w-3.5 text-indigo-500/80 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                        {locale === 'vi' ? category.titleVi : category.titleEn}
                      </h3>
                      <div className="space-y-1 pl-2.5 border-l border-border/70 ml-2">
                        {category.topics.map((topic) => (
                          <button
                            key={topic.id}
                            onClick={() => selectTopic(topic.id)}
                            className={`w-full text-left rounded-lg px-3 py-1.5 text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
                              selectedTopicId === topic.id
                                ? 'bg-primary-light text-primary shadow-[inset_2px_0_0_0_#4f46e5]'
                                : 'hover:bg-card-hover text-muted hover:text-foreground'
                            }`}
                          >
                            {locale === 'vi' ? topic.titleVi : topic.titleEn}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </aside>

            {/* 2. RIGHT COLUMN: MAIN CONTENT */}
            <article id="docs-main-content" className="min-w-0 bg-card rounded-2xl border border-border p-6 md:p-10 shadow-sm relative overflow-hidden">
              
              {/* Top Accent Gradient Line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />
              
              {/* Breadcrumbs */}
              <nav className="mb-4 flex items-center gap-1.5 text-[11px] font-semibold text-muted select-none">
                {(locale === 'vi' ? currentContent.breadcrumbsVi : currentContent.breadcrumbsEn).map((item, idx, arr) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <span className={idx === arr.length - 1 ? 'text-foreground' : ''}>{item}</span>
                    {idx < arr.length - 1 && (
                      <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </span>
                ))}
              </nav>

              {/* Title & Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-extrabold tracking-tight text-foreground" style={{ margin: '0 0 3px 0' }}>
                  {locale === 'vi' ? currentContent.titleVi : currentContent.titleEn}
                </h2>
                <p className="text-sm text-muted mt-2 leading-relaxed">
                  {locale === 'vi' ? currentContent.descriptionVi : currentContent.descriptionEn}
                </p>
              </div>

              {/* Separator */}
              <div className="h-px bg-border my-6" />

              {/* Beautiful Markdown-like Rendered Content */}
              <div className="prose dark:prose-invert max-w-none text-foreground">
                {currentContent.renderContent(t)}
              </div>
            </article>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
