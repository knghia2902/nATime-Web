'use client';

import { useLanguage } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState, useMemo } from 'react';

// Custom SVG Icons
function AndroidIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.523 15.3c-.55 0-1-.45-1-1 0-.56.45-1 1-1s1 .44 1 1c0 .55-.45 1-1 1zm-11 0c-.56 0-1-.45-1-1 0-.56.44-1 1-1s1 .44 1 1c0 .55-.44 1-1 1zM18 9.3l1.8-3.1c.1-.2 0-.5-.2-.6-.2-.1-.5 0-.6.2L17.2 9c-1.6-.7-3.4-1.1-5.2-1.1-1.8 0-3.6.4-5.2 1.1L5 5.8c-.1-.2-.4-.3-.6-.2-.2.1-.3.4-.2.6L6 9.3C2.8 11.2 1 14.5 1 18.2h22c0-3.7-1.8-7-5-8.9z" />
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.7-1.13 1.84-.99 2.94.1.08.2.12.3.12.85 0 1.95-.57 2.52-1.45z" />
    </svg>
  );
}

function ServerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
      <line x1="10" y1="6" x2="10.01" y2="6" />
      <line x1="10" y1="18" x2="10.01" y2="18" />
    </svg>
  );
}

function CodeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function CpuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="15" x2="23" y2="15" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="15" x2="4" y2="15" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

export default function DownloadPage() {
  const { t, locale } = useLanguage();

  // State Management
  const [activeTab, setActiveTab] = useState<'all' | 'face' | 'gate' | 'weigh' | 'it'>('all');
  const [activeMobileTab, setActiveMobileTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedBlock, setCopiedBlock] = useState<string | null>(null);
  const [activeCodeTab, setActiveCodeTab] = useState<'cli' | 'yaml'>('cli');

  // Clipboard Copier
  const handleCopy = (text: string, blockId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBlock(blockId);
    setTimeout(() => setCopiedBlock(null), 2000);
  };

  // Mock Codes
  const cliCode = `# Tạo thư mục cài đặt nATime và di chuyển vào
mkdir natime && cd natime

# Tải tệp cấu hình docker-compose.yml chính thức
curl -L https://natime.xyz/dist/docker-compose.yml -o docker-compose.yml

# Khởi chạy hệ thống ở chế độ chạy ngầm (detached mode)
docker compose up -d

# Kiểm tra trạng thái các container đang chạy
docker compose ps`;

  const dockerComposeYaml = `version: '3.8'

services:
  natime-web:
    image: registry.natime.xyz/enterprise/web:v2.4.0
    container_name: natime-web-app
    restart: always
    ports:
      - "8080:80"
    environment:
      - ConnectionStrings__DefaultConnection=Server=sql-server;Database=nATimeDb;User Id=sa;Password=YourSecurePassword123;TrustServerCertificate=true;
      - Jwt__Secret=SuperSecretKeyForSigningTokens_nAKey2026!
      - ASPNETCORE_ENVIRONMENT=Production
    depends_on:
      - sql-server

  natime-worker:
    image: registry.natime.xyz/enterprise/worker:v2.4.0
    container_name: natime-bg-worker
    restart: always
    environment:
      - ConnectionStrings__DefaultConnection=Server=sql-server;Database=nATimeDb;User Id=sa;Password=YourSecurePassword123;TrustServerCertificate=true;
      - DeviceCommunication__Port=5005
    ports:
      - "5005:5005"
    depends_on:
      - sql-server

  sql-server:
    image: mcr.microsoft.com/mssql/server:2022-latest
    container_name: natime-db-server
    restart: always
    ports:
      - "1433:1433"
    environment:
      - ACCEPT_EULA=Y
      - MSSQL_SA_PASSWORD=YourSecurePassword123`;

  // Hardware Compatibility Data
  const hardwareList = useMemo(() => [
    {
      id: 'hik-1',
      brand: 'Hikvision',
      name: 'DS-K1T673DX',
      category: 'face',
      imageText: 'Hikvision Face Terminal',
      description: {
        vi: 'Thiết bị nhận diện khuôn mặt cao cấp gắn tường, hỗ trợ tới 10,000 khuôn mặt và xác thực siêu nhanh.',
        en: 'Premium wall-mounted face recognition terminal, supporting up to 10,000 faces with ultra-fast verification.'
      },
      protocols: ['TCP/IP', 'HikISUP (EHome)', 'Wiegand'],
      status: 'verified',
      specs: {
        vi: ['Khuôn mặt: 10,000', 'Vân tay: 10,000', 'Màn hình: 7 inch cảm ứng', 'Độ trễ: < 0.2 giây'],
        en: ['Faces: 10,000', 'Fingerprints: 10,000', 'Screen: 7" Touchscreen', 'Latency: < 0.2s']
      }
    },
    {
      id: 'hik-2',
      brand: 'Hikvision',
      name: 'DS-K1T343MX',
      category: 'face',
      imageText: 'Compact Face Terminal',
      description: {
        vi: 'Thiết bị nhận diện khuôn mặt phân khúc tầm trung, thiết kế nhỏ gọn, chi phí tối ưu cho doanh nghiệp vừa và nhỏ.',
        en: 'Mid-range face recognition terminal, compact design, highly cost-effective for small and medium enterprises.'
      },
      protocols: ['TCP/IP', 'Wi-Fi', 'Web Interface'],
      status: 'verified',
      specs: {
        vi: ['Khuôn mặt: 1,500', 'Thẻ cảm ứng: 3,000', 'Màn hình: 4.3 inch', 'Khoảng cách: 0.3m đến 1.5m'],
        en: ['Faces: 1,500', 'Cards: 3,000', 'Screen: 4.3"', 'Distance: 0.3m to 1.5m']
      }
    },
    {
      id: 'zk-1',
      brand: 'ZKTeco',
      name: 'SpeedFace V5L [TI]',
      category: 'face',
      imageText: 'ZKTeco SpeedFace',
      description: {
        vi: 'Thiết bị kiểm soát ra vào tích hợp nhận diện khuôn mặt, lòng bàn tay và phát hiện thân nhiệt bằng hồng ngoại.',
        en: 'Access control terminal integrating face recognition, palm verification, and thermal imaging body temperature detection.'
      },
      protocols: ['TCP/IP', 'ADMS (Push SDK)', 'RS-485'],
      status: 'verified',
      specs: {
        vi: ['Khuôn mặt: 6,000', 'Lòng bàn tay: 3,000', 'Đo nhiệt độ cơ thể', 'Hệ điều hành: Linux'],
        en: ['Faces: 6,000', 'Palms: 3,000', 'Temperature Screening', 'OS: Linux']
      }
    },
    {
      id: 'zk-2',
      brand: 'ZKTeco',
      name: 'ProFace X',
      category: 'face',
      imageText: 'ZKTeco ProFace X',
      description: {
        vi: 'Thiết bị nhận diện khuôn mặt cấp dự án với tiêu chuẩn kháng nước bụi IP68, chống va đập IK04 chuyên dụng ngoài trời.',
        en: 'Project-grade face recognition terminal with IP68 weather-proof and IK04 impact protection ratings, ideal for outdoor sites.'
      },
      protocols: ['TCP/IP', 'ADMS', 'Wiegand Input/Output'],
      status: 'verified',
      specs: {
        vi: ['Khuôn mặt: 30,000 / 50,000', 'Lòng bàn tay: 5,000', 'Chống ngược sáng (WDR)', 'Chuẩn ngoài trời: IP68'],
        en: ['Faces: 30,000 / 50,000', 'Palms: 5,000', 'Wide Dynamic Range (WDR)', 'Outdoor rating: IP68']
      }
    },
    {
      id: 'gate-1',
      brand: 'nATime Hardware',
      name: 'nA-Gate-IO-4',
      category: 'gate',
      imageText: 'Access Controller',
      description: {
        vi: 'Bộ kiểm soát trung tâm 4 cổng relay thông minh do nATime thiết kế, tích hợp máy đọc thẻ RFID và nút bấm khẩn cấp.',
        en: 'Smart 4-port relay central access controller designed by nATime, integrated with RFID card readers and emergency release buttons.'
      },
      protocols: ['TCP/IP', 'Wiegand 26/34', 'Modbus TCP', 'Dry Contact'],
      status: 'native',
      specs: {
        vi: ['Điều khiển: 4 Cổng độc lập', 'Nhật ký offline: 100,000 logs', 'Nguồn: PoE hoặc 12V DC', 'Chống kẹt cổng thông minh'],
        en: ['Control: 4 Independent Gates', 'Offline logs: 100,000 logs', 'Power: PoE or 12V DC', 'Smart gate anti-jam logic']
      }
    },
    {
      id: 'gate-2',
      brand: 'ZKTeco',
      name: 'C3-400 Controller',
      category: 'gate',
      imageText: 'ZKTeco C3-400 Panel',
      description: {
        vi: 'Bảng điều khiển kiểm soát truy cập 4 cửa truyền thống, tương thích cao với đầu đọc vân tay/thẻ bên thứ ba.',
        en: 'Classic 4-door access control panel, highly compatible with third-party fingerprint or card readers.'
      },
      protocols: ['TCP/IP', 'RS-485', 'Wiegand 26'],
      status: 'verified',
      specs: {
        vi: ['Quản lý: 4 Cửa', 'Dung lượng thẻ: 30,000 thẻ', 'Đầu vào bổ trợ: 4 cổng', 'Cổng khóa relay: 4 cổng'],
        en: ['Management: 4 Doors', 'Card capacity: 30,000 cards', 'Auxiliary inputs: 4 ports', 'Lock relay ports: 4 ports']
      }
    },
    {
      id: 'weigh-1',
      brand: 'nATime IoT',
      name: 'nA-Weigh-RTU',
      category: 'weigh',
      imageText: 'Weighbridge Controller',
      description: {
        vi: 'Thiết bị gateway trạm cân chuyên dụng, tự động kết xuất dữ liệu cân xe theo thời gian thực và đồng bộ với hệ thống nATime.',
        en: 'Dedicated weighbridge gateway controller, automatically capturing vehicle weight data in real-time and syncing with the nATime cloud.'
      },
      protocols: ['RS-232', 'RS-485', 'Modbus RTU', 'TCP/IP Gateway'],
      status: 'native',
      specs: {
        vi: ['Chụp khối lượng tự động', 'Tích hợp camera chụp biển số', 'Kết nối cảm biến hồng ngoại', 'Hỗ trợ Modbus RTU/TCP'],
        en: ['Auto Weight Capture', 'License plate camera integration', 'IR photocell sensor input', 'Modbus RTU/TCP support']
      }
    },
    {
      id: 'weigh-2',
      brand: 'Yaohua',
      name: 'XK3190-A9+',
      category: 'weigh',
      imageText: 'Yaohua Indicator',
      description: {
        vi: 'Đầu chỉ thị cân xe điện tử phổ biến tại Việt Nam, tích hợp máy in phiếu mini và cổng giao tiếp serial truyền nhận dữ liệu.',
        en: 'Highly popular weighbridge indicator in Vietnam, features built-in thermal ticket printer and DB9 serial data output.'
      },
      protocols: ['RS-232 Serial', 'Current Loop'],
      status: 'verified',
      specs: {
        vi: ['Tốc độ truyền: 600 đến 9600 bps', 'Tương thích hầu hết bàn cân', 'Hỗ trợ máy in hóa đơn mini', 'Nguồn điện xoay chiều AC'],
        en: ['Baudrate: 600 to 9600 bps', 'Compatible with major load cells', 'Mini invoice printer support', 'AC power input']
      }
    },
    {
      id: 'it-1',
      brand: 'nATime Security',
      name: 'nA-Scan-PDA',
      category: 'it',
      imageText: 'Industrial Handheld PDA',
      description: {
        vi: 'Thiết bị cầm tay chuyên dụng chạy Android, phục vụ quét mã vạch kiểm kê tài sản CNTT hoặc quét QR check-in sự kiện di động.',
        en: 'Rugged Android handheld terminal, tailored for IT asset barcode auditing or scanning QR codes for mobile event check-ins.'
      },
      protocols: ['Wi-Fi 6', 'Bluetooth 5.1', 'NFC / RFID Reader'],
      status: 'native',
      specs: {
        vi: ['Hệ điều hành: Android 11', 'Quét mã vạch: 1D/2D Zebra Scanner', 'Bảo vệ: Chống rơi vỡ 1.5m', 'Pin: 5000mAh sử dụng 12h'],
        en: ['OS: Android 11', 'Barcode scanner: 1D/2D Zebra Scanner', 'Protection: 1.5m drop resistance', 'Battery: 5000mAh for 12h use']
      }
    }
  ], []);

  // Filtering Logic
  const filteredHardware = useMemo(() => {
    return hardwareList.filter((item) => {
      const matchesTab = activeTab === 'all' || item.category === activeTab;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        item.brand.toLowerCase().includes(searchLower) ||
        item.name.toLowerCase().includes(searchLower) ||
        item.protocols.some((p) => p.toLowerCase().includes(searchLower)) ||
        (item.description.vi.toLowerCase().includes(searchLower) ||
          item.description.en.toLowerCase().includes(searchLower));
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery, hardwareList]);

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full bg-background text-foreground transition-colors duration-300 relative overflow-hidden pt-20">
        
        {/* Glow backgrounds */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none -z-10" />
        <div className="absolute top-[40%] right-1/4 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none -z-10" />

        {/* Hero Section */}
        <section className="relative px-6 py-16 lg:py-24 text-center max-w-5xl mx-auto z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary-light dark:bg-primary-light/10 text-primary mb-6 animate-fade-in-up">
            <span>💾</span>
            <span>{t({ vi: 'Tải Xuống & Tương Thích', en: 'Downloads & Compatibility' })}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 animate-fade-in-up text-gradient">
            {t(
              {
                vi: 'Trung Tâm Tải Xuống Khách Hàng nATime',
                en: 'nATime Client Download & Asset Hub'
              }
            )}
          </h1>

          <p className="text-lg md:text-xl text-muted max-w-3xl leading-relaxed mb-12 animate-fade-in-up delay-100">
            {t(
              {
                vi: 'Tải về ứng dụng chấm công di động, bộ tài liệu cấu hình máy chủ tự vận hành (Self-Host), hoặc tra cứu danh mục thiết bị kiểm soát ra vào được hệ thống hỗ trợ chính thức.',
                en: 'Download the employee mobile check-in app, fetch the Self-Hosted deployment bundle, or look up our hardware compatibility list for physical terminals.'
              }
            )}
          </p>

          {/* Quick Links Nav */}
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up delay-200">
            <a
              href="#mobile-app"
              className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium transition-all duration-300 shadow-lg shadow-primary/20 hover:scale-[1.02]"
            >
              {t({ vi: '1. Ứng dụng Di động', en: '1. Mobile App' })}
            </a>
            <a
              href="#self-host"
              className="px-6 py-3 rounded-lg border border-border bg-card hover:bg-card-hover font-medium transition-all duration-300 hover:scale-[1.02]"
            >
              {t({ vi: '2. Tự vận hành (Self-Host)', en: '2. Self-Hosted Server' })}
            </a>
            <a
              href="#hardware"
              className="px-6 py-3 rounded-lg border border-border bg-card hover:bg-card-hover font-medium transition-all duration-300 hover:scale-[1.02]"
            >
              {t({ vi: '3. Thiết bị tương thích', en: '3. Compatible Hardware' })}
            </a>
          </div>
        </section>

        {/* Section 1: Mobile App Download */}
        <section id="mobile-app" className="relative px-6 py-20 border-t border-border z-10 scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Hand-crafted SVG mock & QR */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center gap-8">
                <div className="relative group select-none">
                  {/* Glowing light background effect */}
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-primary to-indigo-600 rounded-[42px] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                  
                  {/* Three Devices Deck */}
                  <div className="flex items-center justify-center gap-2 sm:gap-4 py-4 w-full overflow-hidden select-none">
                    {/* Phone 1: Calendar */}
                    <div className="hidden sm:block max-w-[135px] w-full relative overflow-hidden rounded-[24px] border-[4px] border-slate-800 bg-background shadow-lg rotate-[-4deg] -mr-6 opacity-80 hover:opacity-100 hover:rotate-0 hover:scale-[1.05] hover:z-20 transition-all duration-300 cursor-pointer">
                      
                      <img
                        src="/screenshots/mobile_calendar.png"
                        alt="nA Mobile Calendar"
                        className="w-full h-auto object-cover relative z-10 rounded-[20px]"
                      />
                    </div>

                    {/* Phone 2: Main Home */}
                    <div className="max-w-[160px] w-full relative overflow-hidden rounded-[28px] border-[4px] border-slate-800 bg-background shadow-2xl z-10 hover:scale-[1.05] transition-all duration-300 cursor-pointer">
                      
                      <img
                        src="/screenshots/mobile.png"
                        alt="nA Mobile Home"
                        className="w-full h-auto object-cover relative z-10 rounded-[24px]"
                      />
                    </div>

                    {/* Phone 3: Details */}
                    <div className="hidden sm:block max-w-[135px] w-full relative overflow-hidden rounded-[24px] border-[4px] border-slate-800 bg-background shadow-lg rotate-[4deg] -ml-6 opacity-80 hover:opacity-100 hover:rotate-0 hover:scale-[1.05] hover:z-20 transition-all duration-300 cursor-pointer">
                      
                      <img
                        src="/screenshots/mobile_detail.png"
                        alt="nA Mobile Detail"
                        className="w-full h-auto object-cover relative z-10 rounded-[20px]"
                      />
                    </div>
                  </div>
                </div>

                {/* QR Code section */}
                <div className="glass p-5 rounded-2xl border border-border/80 flex flex-col items-center gap-3 text-center max-w-[280px]">
                  <div className="bg-white p-3.5 rounded-xl shadow-inner relative group/qr">
                    {/* Mock QR SVG */}
                    <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Quiet zone grid background */}
                      <path d="M0 0h140v140H0z" fill="#fff" />
                      {/* Top-Left Corner block */}
                      <path d="M10 10h30v30H10zm5 5h20v20H15zm5 5h10v10H20z" fill="#1e1b4b" />
                      {/* Top-Right Corner block */}
                      <path d="M100 10h30v30h-30zm5 5h20v20h-20zm5 5h10v10h-10z" fill="#1e1b4b" />
                      {/* Bottom-Left Corner block */}
                      <path d="M10 100h30v30H10zm5 5h20v20H15zm5 5h10v10H20z" fill="#1e1b4b" />
                      {/* Smaller Alignment pattern (Bottom-Right-ish) */}
                      <path d="M105 105h10v10h-10zm5 5h5v5h-5z" fill="#1e1b4b" />
                      {/* Random Mock QR dots */}
                      <path d="M50 15h5v5h-5zm10 0h5v15h-5zm15 0h5v5h-5zm10 0h5v5h-5zM50 25h10v5H50zm25 0h5v5h-5zm10 0h5v10h-5zM50 35h5v5h-5zm15 0h10v5H65zm10 10h5v10h-5zm5-10h5v5h-5zm15 10h10v5H95zm10-5h5v5h-5zm20 5h5v5h-5z" fill="#1e1b4b" />
                      <path d="M15 50h5v15h-5zm0 20h10v5H15zm10 10h5v5h-5zM35 50h10v5H35zm0 10h5v10h-5zm10 15h5v15h-5zM55 55h5v25h-5zm10 0h15v5H65zm0 15h5v10h-5zm15 0h5v5h-5zm-5 15h10v5H75zm15-20h5v10h-5zm5 15h5v15h-5z" fill="#1e1b4b" />
                      <path d="M100 50h5v10h-5zm10 0h5v5h-5zm10 0h5v15h-5zm-5 25h10v5h-10zm10 10h5v10h-5zM50 95h15v5H50zm10 10h5v5h-5zm10 10h5v5h-5zm5-20h10v5H75zm15 10h5v10h-5zm5-15h5v5h-5zm15 15h10v5h-10zm0 10h5v5h-5z" fill="#1e1b4b" />
                      {/* Logo container in the middle */}
                      <rect x="58" y="58" width="24" height="24" rx="4" fill="#ffffff" stroke="#4f46e5" strokeWidth="2" />
                      <path d="M64 74v-7l3 3.5 3-3.5v7" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/qr:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />
                  </div>
                  <div className="text-xs text-muted leading-relaxed">
                    <span className="font-bold text-foreground block mb-0.5">
                      {t('Quét để tải nhanh', 'Scan to download')}
                    </span>
                    {t('Sử dụng camera quét để tải APK cho Android', 'Scan using your mobile camera to get the Android APK')}
                  </div>
                </div>
              </div>

              {/* Right Column: Detailed info & styled download cards */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gradient">
                    nA Mobile App
                  </h2>
                  <p className="text-muted leading-relaxed">
                    {t(
                      {
                        vi: 'Ứng dụng nA Mobile giúp nhân sự ghi nhận ngày công trực tiếp trên điện thoại thông qua cơ chế định vị GPS (Geofencing) và nhận diện khuôn mặt AI cực kỳ chính xác. Hỗ trợ gửi đơn từ nghỉ phép, xem bảng công thời gian thực và quản lý lịch ca làm việc tức thời.',
                        en: 'nA Mobile App enables employees to check-in directly from their devices using precision GPS geofencing and AI-based facial recognition. Easily submit leave requests, view real-time timesheets, and manage shifts instantly.'
                      }
                    )}
                  </p>
                </div>

                {/* Download Cards Group */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Android APK Card */}
                  <div className="glass p-6 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                          <AndroidIcon className="w-7 h-7" />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-500 dark:text-indigo-300">
                          APK Direct
                        </span>
                      </div>
                      <h3 className="font-bold text-xl mb-2 text-foreground">
                        Android Client
                      </h3>
                      <p className="text-xs text-muted mb-4 leading-relaxed">
                        {t(
                          'Tải trực tiếp tệp cài đặt APK cho các dòng máy Android. Tự cài đặt nhanh chóng không cần qua cửa hàng CH Play.',
                          'Download the installation APK directly for Android devices. Easy side-load deployment bypassing the Play Store.'
                        )}
                      </p>
                      
                      {/* Specs snippet */}
                      <div className="space-y-1.5 border-t border-border/60 pt-3.5 mb-6 text-xs text-muted">
                        <div className="flex justify-between">
                          <span>{t('Phiên bản:', 'Version:')}</span>
                          <span className="font-semibold text-foreground">v2.4.1 (Stable)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t('Dung lượng tệp:', 'File size:')}</span>
                          <span className="font-semibold text-foreground">48.2 MB</span>
                        </div>
                        <div className="flex justify-between">
                          <span>MD5 Hash:</span>
                          <span className="font-mono text-[10px] select-all text-foreground">8f92bd5e27a69b...</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href="/dist/namobile-v2.4.1.apk"
                      download
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm transition-all duration-300 shadow-md shadow-primary/10 hover:scale-[1.01]"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                      {t('Tải APK Trực Tiếp', 'Download APK File')}
                    </a>
                  </div>

                  {/* iOS App Store Card */}
                  <div className="glass p-6 rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-slate-500/10 text-slate-600 dark:text-slate-300">
                          <AppleIcon className="w-7 h-7" />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-500/10 text-slate-600 dark:text-slate-300">
                          App Store
                        </span>
                      </div>
                      <h3 className="font-bold text-xl mb-2 text-foreground">
                        iOS Client
                      </h3>
                      <p className="text-xs text-muted mb-4 leading-relaxed">
                        {t(
                          'Cài đặt ứng dụng nA Mobile chính thức cho iPhone, iPad thông qua Apple App Store. Nhận cập nhật bảo mật tự động.',
                          'Install the official nA Mobile application for iPhone and iPad via the Apple App Store. Receive automated security updates.'
                        )}
                      </p>

                      {/* Specs snippet */}
                      <div className="space-y-1.5 border-t border-border/60 pt-3.5 mb-6 text-xs text-muted">
                        <div className="flex justify-between">
                          <span>{t('Phiên bản:', 'Version:')}</span>
                          <span className="font-semibold text-foreground">v2.4.0 (Official)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t('Dung lượng tệp:', 'File size:')}</span>
                          <span className="font-semibold text-foreground">56.4 MB</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t('Nền tảng:', 'Platform:')}</span>
                          <span className="font-semibold text-foreground">iOS 15.0+</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href="https://apps.apple.com/vn/app/natime"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-border bg-card hover:bg-card-hover font-semibold text-sm transition-all duration-300 hover:scale-[1.01]"
                    >
                      <AppleIcon className="w-4 h-4" />
                      App Store
                    </a>
                  </div>

                </div>

                {/* Requirements list */}
                <div className="bg-slate-50/50 dark:bg-slate-900/40 p-6 rounded-2xl border border-border space-y-4">
                  <h4 className="font-bold text-base flex items-center gap-2 text-foreground">
                    <InfoIcon className="w-5 h-5 text-primary" />
                    {t('Yêu Cầu Hệ Thống Thiết Bị Di Động', 'Mobile App System Requirements')}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-2">
                      <div className="font-semibold text-foreground">{t('Hệ điều hành tối thiểu', 'Minimum OS Version')}</div>
                      <ul className="list-disc list-inside text-muted space-y-1">
                        <li>Android: Version 8.0 (Oreo) trở lên</li>
                        <li>iOS: Version 15.0 trở lên</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <div className="font-semibold text-foreground">{t('Cấu hình phần cứng tối thiểu', 'Minimum Hardware Requirements')}</div>
                      <ul className="list-disc list-inside text-muted space-y-1">
                        <li>Camera: {t('Hỗ trợ lấy nét tự động (Autofocus)', 'Autofocus support')}</li>
                        <li>Định vị: {t('Cảm biến định vị GPS/GLONASS', 'GPS/GLONASS positioning sensor')}</li>
                        <li>{t('Internet: Kết nối Wi-Fi/4G ổn định', 'Internet: Stable Wi-Fi/4G connection')}</li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Section 2: Self-Host Server Bundle */}
        <section id="self-host" className="relative px-6 py-20 bg-slate-50/50 dark:bg-slate-900/20 border-t border-border z-10 scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-glow" />
                <span>{t({ vi: 'Dành Cho Doanh Nghiệp Lớn', en: 'For Large Enterprises' })}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t({ vi: 'Máy Chủ Tự Vận Hành (Self-Host Bundle)', en: 'Self-Host Enterprise Server Bundle' })}
              </h2>
              <p className="text-muted leading-relaxed">
                {t(
                  {
                    vi: 'Triển khai nATime hoàn toàn nằm trong hạ tầng máy chủ nội bộ (On-Premise) của doanh nghiệp nhằm đảm bảo an toàn tuyệt đối cho dữ liệu chấm công và quản lý truy cập ra vào.',
                    en: 'Deploy nATime entirely within your corporate on-premise infrastructure to ensure complete custody and security of access control and employee data.'
                  }
                )}
              </p>
            </div>

            {/* Server Bundle Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              
              {/* Card 1: Docker Compose */}
              <div className="glass p-8 rounded-2xl border border-border relative overflow-hidden flex flex-col justify-between group hover:border-primary/30 transition-all duration-300">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="p-3.5 rounded-xl bg-primary/10 text-primary">
                      <ServerIcon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-primary-light dark:bg-primary-light/10 text-primary">
                      Docker Compose
                    </span>
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-foreground">
                    Docker Bundle
                  </h3>
                  <p className="text-xs text-muted leading-relaxed mb-6">
                    {t(
                      'Bộ gói container dựng sẵn chứa Web App, Background API, Redis Cache và DB Migrator. Phù hợp nhất cho môi trường Linux/Unix và Docker Swarm.',
                      'Pre-packaged container orchestration hosting the Web App, Background API, Redis Cache, and DB Migrator. Ideal for Linux/Unix and Docker Swarm environments.'
                    )}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="text-[11px] text-muted border-t border-border/60 pt-4 flex justify-between">
                    <span>{t('Dung lượng:', 'Bundle Size:')}</span>
                    <span className="font-semibold text-foreground">~45 KB (YAML configuration)</span>
                  </div>
                  <a
                    href="/dist/docker-compose.yml"
                    download
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm transition-all duration-300 shadow-md shadow-primary/10 hover:scale-[1.01]"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    {t('Tải Docker Compose', 'Get Docker Compose')}
                  </a>
                </div>
              </div>

              {/* Card 2: SQL Server Migration Scripts */}
              <div className="glass p-8 rounded-2xl border border-border relative overflow-hidden flex flex-col justify-between group hover:border-primary/30 transition-all duration-300">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="p-3.5 rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                      <CodeIcon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-500 dark:text-indigo-300">
                      SQL Database
                    </span>
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-foreground">
                    SQL Schema Script
                  </h3>
                  <p className="text-xs text-muted leading-relaxed mb-6">
                    {t(
                      'Tập lệnh khởi tạo cơ sở dữ liệu cho Microsoft SQL Server 2019/2022. Đã tối ưu hóa các index tìm kiếm khuôn mặt, mã hóa AES-256 các trường nhạy cảm.',
                      'Database schema initialization and migration scripts for Microsoft SQL Server 2019/2022. Optimized indexes for face hash lookups, AES-256 encrypted fields.'
                    )}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="text-[11px] text-muted border-t border-border/60 pt-4 flex justify-between">
                    <span>{t('Dung lượng:', 'Script Size:')}</span>
                    <span className="font-semibold text-foreground">~2.4 MB (.sql format)</span>
                  </div>
                  <a
                    href="/dist/natime-schema-v2.4.0.sql"
                    download
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-border bg-card hover:bg-card-hover font-semibold text-sm transition-all duration-300 hover:scale-[1.01]"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    {t('Tải DB Schema', 'Get Migration Scripts')}
                  </a>
                </div>
              </div>

              {/* Card 3: .NET 10 Hosting Bundle */}
              <div className="glass p-8 rounded-2xl border border-border relative overflow-hidden flex flex-col justify-between group hover:border-primary/30 transition-all duration-300">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="p-3.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      <CpuIcon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-300">
                      IIS / Windows Server
                    </span>
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-foreground">
                    .NET 10 Hosting Bundle
                  </h3>
                  <p className="text-xs text-muted leading-relaxed mb-6">
                    {t(
                      'Gói runtime cấu hình cài đặt chạy native ứng dụng API nATime trên môi trường IIS (Internet Information Services) của Windows Server 2022+.',
                      'Hosting runtime bundle to deploy nATime API natively on IIS (Internet Information Services) on Windows Server 2022+ platforms.'
                    )}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="text-[11px] text-muted border-t border-border/60 pt-4 flex justify-between">
                    <span>{t('Dung lượng:', 'Bundle Size:')}</span>
                    <span className="font-semibold text-foreground">~142 MB (.exe installer)</span>
                  </div>
                  <a
                    href="https://download.visualstudio.microsoft.com/download/pr/dotnet-hosting-bundle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-border bg-card hover:bg-card-hover font-semibold text-sm transition-all duration-300 hover:scale-[1.01]"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {t('Tải từ Microsoft', 'Get .NET Runtime')}
                  </a>
                </div>
              </div>

            </div>

            {/* Copyable Code Blocks */}
            <div className="glass rounded-2xl border border-border overflow-hidden">
              <div className="flex border-b border-border bg-slate-900/40 p-4 justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs text-muted ml-3 font-mono">
                    {activeCodeTab === 'cli' ? 'setup.sh' : 'docker-compose.yml'}
                  </span>
                </div>
                
                {/* Code Tabs & Copy Button */}
                <div className="flex items-center gap-4">
                  <div className="bg-slate-800/80 dark:bg-slate-950/60 p-1 rounded-lg flex gap-1">
                    <button
                      onClick={() => setActiveCodeTab('cli')}
                      className={`px-3 py-1 text-xs rounded-md transition-all font-semibold ${
                        activeCodeTab === 'cli'
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-muted hover:text-foreground'
                      }`}
                    >
                      CLI Shell
                    </button>
                    <button
                      onClick={() => setActiveCodeTab('yaml')}
                      className={`px-3 py-1 text-xs rounded-md transition-all font-semibold ${
                        activeCodeTab === 'yaml'
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-muted hover:text-foreground'
                      }`}
                    >
                      docker-compose.yml
                    </button>
                  </div>
                  
                  <button
                    onClick={() => handleCopy(activeCodeTab === 'cli' ? cliCode : dockerComposeYaml, activeCodeTab)}
                    className="p-2 rounded-lg border border-border/80 hover:border-primary/40 bg-card transition-all text-muted hover:text-foreground flex items-center gap-1.5 text-xs font-semibold"
                    title={t('Sao chép mã nguồn', 'Copy source code')}
                  >
                    {copiedBlock === activeCodeTab ? (
                      <>
                        <CheckIcon className="w-4 h-4 text-emerald-500" />
                        <span className="text-emerald-500 font-semibold">{t('Đã chép!', 'Copied!')}</span>
                      </>
                    ) : (
                      <>
                        <CopyIcon className="w-4 h-4" />
                        <span>{t('Sao chép', 'Copy')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Code display */}
              <div className="p-6 bg-slate-950 font-mono text-xs overflow-x-auto text-slate-300 leading-relaxed max-h-[360px] scrollbar-thin">
                <pre className="select-all">
                  <code>{activeCodeTab === 'cli' ? cliCode : dockerComposeYaml}</code>
                </pre>
              </div>
            </div>

          </div>
        </section>

        {/* Section 3: Hardware Compatibility Catalog */}
        <section id="hardware" className="relative px-6 py-20 border-t border-border z-10 scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 mb-4">
                  <span>🔌</span>
                  <span>{t({ vi: 'Tích hợp phần cứng', en: 'Hardware Integrations' })}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                  {t({ vi: 'Danh Mục Thiết Bị Tương Thích', en: 'Hardware Compatibility Catalog' })}
                </h2>
                <p className="text-muted text-sm leading-relaxed">
                  {t(
                    {
                      vi: 'nATime hỗ trợ giao tiếp native trực tiếp đến phần cứng đầu cuối không qua SDK trung gian của bên thứ ba, tối ưu hóa tốc độ nhận diện khuôn mặt và điều khiển rơ-le thông minh.',
                      en: 'nATime supports native direct communication with end-point hardware without third-party intermediate SDKs, optimizing face recognition speeds and smart relay controls.'
                    }
                  )}
                </p>
              </div>

              {/* Client Side Search bar */}
              <div className="relative w-full md:w-80">
                <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="text"
                  placeholder={t('Tìm kiếm thiết bị, giao thức...', 'Search devices, protocols...')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:border-primary/50 text-sm shadow-sm transition-all"
                />
              </div>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 border-b border-border/80 pb-4 mb-8">
              {[
                { id: 'all', vi: 'Tất cả thiết bị', en: 'All Devices' },
                { id: 'face', vi: 'Khuôn mặt & Vân tay', en: 'Face & Fingerprint' },
                { id: 'gate', vi: 'Cổng & Barie', en: 'Gates & Barriers' },
                { id: 'weigh', vi: 'Cân xe & Trạm cân', en: 'Weighbridge & Scales' },
                { id: 'it', vi: 'Tài sản CNTT', en: 'IT Assets' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary text-white shadow-md shadow-primary/10'
                      : 'text-muted hover:text-foreground hover:bg-primary/5'
                  }`}
                >
                  {t(tab.vi, tab.en)}
                </button>
              ))}
            </div>

            {/* Hardware list grid */}
            {filteredHardware.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredHardware.map((item) => (
                  <div
                    key={item.id}
                    className="glass rounded-2xl border border-border p-6 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
                  >
                    <div>
                      {/* Brand and name */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className="text-[10px] font-bold text-primary uppercase tracking-wide bg-primary/10 px-2 py-0.5 rounded">
                            {item.brand}
                          </span>
                          <h3 className="font-bold text-lg text-foreground mt-1.5">{item.name}</h3>
                        </div>

                        {/* Connection status badges */}
                        {item.status === 'native' ? (
                          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-full flex items-center gap-1 border border-emerald-500/20">
                            <span className="w-1 h-1 rounded-full bg-emerald-600 animate-pulse" />
                            nA Native
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold text-indigo-600 bg-indigo-500/10 px-2 py-1 rounded-full flex items-center gap-1 border border-indigo-500/20">
                            <span className="w-1 h-1 rounded-full bg-indigo-600" />
                            {t('Đã chứng thực', 'Verified')}
                          </span>
                        )}
                      </div>

                      {/* Device graphic placeholder */}
                      <div className="h-28 rounded-xl bg-slate-100 dark:bg-slate-900 border border-border/80 flex items-center justify-center text-center p-4 mb-4 select-none relative overflow-hidden group/img">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
                        <div className="text-slate-400 dark:text-slate-600 font-extrabold tracking-widest text-xs uppercase relative z-10">
                          {item.imageText}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-muted leading-relaxed mb-4">
                        {t(item.description)}
                      </p>

                      {/* Protocols list */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {item.protocols.map((protocol) => (
                          <span
                            key={protocol}
                            className="text-[9px] font-mono font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-border/60"
                          >
                            {protocol}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Specs breakdown */}
                    <div className="border-t border-border/60 pt-4 space-y-2">
                      <h4 className="text-[10px] uppercase font-bold text-muted tracking-wider">
                        {t('Thông số kỹ thuật:', 'Device Specifications:')}
                      </h4>
                      <ul className="text-[11px] text-muted space-y-1">
                        {item.specs[locale].map((spec: string, i: number) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="text-primary font-bold">✓</span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-50/50 dark:bg-slate-900/40 rounded-2xl border border-border">
                <svg className="w-10 h-10 mx-auto text-muted mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-muted text-sm font-semibold">
                  {t('Không tìm thấy thiết bị phù hợp.', 'No matching devices found.')}
                </p>
                <p className="text-xs text-muted mt-1">
                  {t('Hãy thử tìm kiếm với các từ khóa khác hoặc liên hệ bộ phận hỗ trợ kỹ thuật.', 'Try adjusting your search query or contact our support representatives.')}
                </p>
              </div>
            )}

            {/* Direct Hardware connection API Banner */}
            <div className="mt-16 bg-gradient-to-r from-indigo-900/20 to-purple-900/10 dark:from-indigo-950/40 dark:to-purple-950/20 p-8 rounded-3xl border border-indigo-500/25 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-2 max-w-3xl">
                <h3 className="font-bold text-xl text-foreground">
                  {t('Yêu cầu hỗ trợ giao thức đặc biệt?', 'Need a custom protocol integration?')}
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  {t(
                    'Đội ngũ kỹ sư nATime sẵn sàng nghiên cứu tích hợp API/SDK riêng cho các loại thiết bị trạm cân đặc biệt, cổng tự động hoặc camera phân tích nhiệt độ chuyên dụng của doanh nghiệp bạn.',
                    'Our engineering team is ready to build tailored API/SDK integrations for proprietary weighing indicators, automated high-security gates, or custom thermal vision cameras.'
                  )}
                </p>
              </div>
              <a
                href="/contact"
                className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs md:text-sm transition-all duration-300 shrink-0 hover:scale-[1.02]"
              >
                {t('Yêu cầu tích hợp ngay', 'Request Integration')}
              </a>
            </div>

          </div>
        </section>

        {/* Support Section Banner */}
        <section className="relative px-6 py-20 text-center max-w-4xl mx-auto z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('Có Câu Hỏi Về Triển Khai?', 'Have Deployment Questions?')}
          </h2>
          <p className="text-muted mb-8 max-w-2xl mx-auto text-sm leading-relaxed">
            {t(
              {
                vi: 'Hãy liên hệ với đội ngũ kỹ sư hỗ trợ chuyên nghiệp của chúng tôi để nhận tư vấn kiến trúc hệ thống, hướng dẫn nâng cấp từ AMMS cũ hoặc kết nối các dòng máy chấm công sẵn có.',
                en: 'Get in touch with our operations support engineers to consult on layout architecture, get instructions on migrating from legacy AMMS, or wiring up existing time terminals.'
              }
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:support@natime.xyz"
              className="px-8 py-4 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold transition-all duration-300 shadow-lg shadow-primary/20 hover:scale-[1.02]"
            >
              {t('Gửi Email Kỹ Thuật', 'Email Support Team')}
            </a>
            <a
              href="/contact"
              className="px-8 py-4 rounded-lg border border-border bg-card hover:bg-card-hover font-semibold transition-all duration-300 hover:scale-[1.02]"
            >
              {t('Liên hệ chuyên gia', 'Talk to an Expert')}
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
