'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n';
import { useAuth } from '@/lib/authContext';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import { supabase, isMockEnabled } from '@/lib/supabase';

// -------------------------------------------------------------
// TS interfaces & Types
// -------------------------------------------------------------
type TabId = 'overview' | 'licenses' | 'tickets' | 'profile';

interface LicenseKey {
  key: string;
  moduleVi: string;
  moduleEn: string;
  status: 'active' | 'suspended' | 'trial';
  devicesConnected: number;
  devicesMax: number;
  expireDate: string;
}

interface SupportTicket {
  id: string;
  subject: string;
  status: 'pending' | 'answered' | 'closed';
  priority: 'low' | 'medium' | 'high';
  date: string;
  description?: string;
}

interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'info' | 'error';
}

export default function CustomerDashboard() {
  const { t, locale } = useLanguage();
  const { user, loading, signOut, updateProfile } = useAuth();
  const router = useRouter();

  // Navigation & UI States
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Dropdown & Click-outside refs
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Toast notifications state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Fallback mock fields for AuthUser
  const avatarFallback = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80';
  const supportTierFallback = 'Enterprise Support';
  const daysRemainingFallback = 185;

  // -------------------------------------------------------------
  // Stateful Data & Fallbacks
  // -------------------------------------------------------------
  const [licenses, setLicenses] = useState<LicenseKey[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);

  // Default Mock Values for Offline Mode
  const DEFAULT_LICENSES: LicenseKey[] = [
    {
      key: 'NT-ATT-2910-8839',
      moduleVi: 'Chấm công thông minh (Smart Attendance)',
      moduleEn: 'Smart Time Attendance',
      status: 'active',
      devicesConnected: 8,
      devicesMax: 10,
      expireDate: '2027-12-31',
    },
    {
      key: 'NT-ACC-8829-4710',
      moduleVi: 'Kiểm soát Cổng ra vào (Gate Access Control)',
      moduleEn: 'Gate Access Control',
      status: 'active',
      devicesConnected: 4,
      devicesMax: 4,
      expireDate: '2027-06-30',
    },
    {
      key: 'NT-WGH-1849-3910',
      moduleVi: 'Trạm cân xe (Weighbridge Control)',
      moduleEn: 'Weighbridge Management',
      status: 'active',
      devicesConnected: 2,
      devicesMax: 5,
      expireDate: '2026-12-15',
    },
    {
      key: 'NT-ITM-3341-9920',
      moduleVi: 'Tài sản CNTT (IT Asset Management)',
      moduleEn: 'IT Asset Management',
      status: 'trial',
      devicesConnected: 15,
      devicesMax: 50,
      expireDate: '2026-08-30',
    },
  ];

  const DEFAULT_TICKETS: SupportTicket[] = [
    {
      id: 'TK-2849',
      subject: 'Cần hỗ trợ đồng bộ dữ liệu FaceID giữa 2 văn phòng',
      status: 'answered',
      priority: 'high',
      date: '2026-07-10',
      description: 'Hiện tại văn phòng Hà Nội và HCM không tự động đồng bộ vân tay và FaceID khi nhân viên di chuyển.',
    },
    {
      id: 'TK-2831',
      subject: 'Lỗi không nhận diện được mã vạch trên ứng dụng di động',
      status: 'closed',
      priority: 'medium',
      date: '2026-06-25',
      description: 'Camera quét mã QR chấm công báo lỗi camera initialization error trên dòng Android 14.',
    },
    {
      id: 'TK-2804',
      subject: 'Hỏi về tài liệu API tích hợp máy chấm công Suprema',
      status: 'closed',
      priority: 'low',
      date: '2026-06-18',
      description: 'Xin vui lòng cung cấp tài liệu đặc tả API RESTful để hệ thống ERP bên tôi đẩy danh sách nhân viên.',
    },
  ];

  const getModuleTranslationVi = (planType: string) => {
    const map: Record<string, string> = {
      'Attendance': 'Chấm công thông minh (Smart Attendance)',
      'Gate': 'Kiểm soát Cổng ra vào (Gate Access Control)',
      'Weighbridge': 'Trạm cân xe (Weighbridge Control)',
      'Asset': 'Tài sản CNTT (IT Asset Management)',
    };
    return map[planType] || planType;
  };

  const getModuleTranslationEn = (planType: string) => {
    const map: Record<string, string> = {
      'Attendance': 'Smart Time Attendance',
      'Gate': 'Gate Access Control',
      'Weighbridge': 'Weighbridge Management',
      'Asset': 'IT Asset Management',
    };
    return map[planType] || planType;
  };

  const planTypeMapping: Record<string, string> = {
    attendance: 'Attendance',
    access: 'Gate',
    weighbridge: 'Weighbridge',
    asset: 'Asset',
  };

  // Form states
  const [newKey, setNewKey] = useState('');
  const [newKeyModule, setNewKeyModule] = useState('attendance');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketPriority, setTicketPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [ticketDescription, setTicketDescription] = useState('');
  const [showAddTicketForm, setShowAddTicketForm] = useState(false);

  // Profile Form States
  const [profileName, setProfileName] = useState('');
  const [profilePhone, setProfilePhone] = useState('0987.654.321');
  const [profileOrg, setProfileOrg] = useState('ACS Solutions JSC');

  // Fetch licenses and tickets on mount / user change
  useEffect(() => {
    if (!user) return;

    const loadDashboardData = async () => {
      if (isMockEnabled || !supabase) {
        // Mock Mode: read from LocalStorage
        const cachedLicenses = localStorage.getItem('natime-licenses');
        if (cachedLicenses) {
          try { setLicenses(JSON.parse(cachedLicenses)); } catch (e) {}
        } else {
          setLicenses(DEFAULT_LICENSES);
          localStorage.setItem('natime-licenses', JSON.stringify(DEFAULT_LICENSES));
        }

        const cachedTickets = localStorage.getItem('natime-tickets');
        if (cachedTickets) {
          try { setTickets(JSON.parse(cachedTickets)); } catch (e) {}
        } else {
          setTickets(DEFAULT_TICKETS);
          localStorage.setItem('natime-tickets', JSON.stringify(DEFAULT_TICKETS));
        }
      } else {
        // Real Supabase Connection
        try {
          // 1. Fetch user licenses
          const { data: licenseData, error: licenseErr } = await supabase
            .from('licenses')
            .select('*')
            .eq('user_id', user?.id)
            .order('created_at', { ascending: false });

          if (licenseErr) {
            console.error('Error loading licenses from Supabase:', licenseErr.message);
          } else if (licenseData) {
            const mapped: LicenseKey[] = licenseData.map((item: any) => ({
              key: item.license_key,
              moduleVi: getModuleTranslationVi(item.plan_type),
              moduleEn: getModuleTranslationEn(item.plan_type),
              status: item.status.toLowerCase() as any,
              devicesConnected: item.devices_used,
              devicesMax: item.devices_limit,
              expireDate: item.expiry_date.split('T')[0],
            }));
            setLicenses(mapped);
          }

          // 2. Fetch user tickets
          const { data: ticketData, error: ticketErr } = await supabase
            .from('tickets')
            .select('*')
            .eq('user_id', user?.id)
            .order('created_at', { ascending: false });

          if (ticketErr) {
            console.error('Error loading tickets from Supabase:', ticketErr.message);
          } else if (ticketData) {
            const mapped: SupportTicket[] = ticketData.map((item: any) => ({
              id: item.ticket_number,
              subject: item.subject,
              status: item.status.toLowerCase() as any,
              priority: item.priority.toLowerCase() as any,
              date: item.created_at.split('T')[0],
              description: '',
            }));
            setTickets(mapped);
          }
        } catch (err) {
          console.error('Error fetching Supabase database data:', err);
        }
      }
    };

    loadDashboardData();
  }, [user]);

  // Load profile values once user loads
  useEffect(() => {
    if (user) {
      setProfileName(user.name || '');
      setProfileOrg(user.company || 'ACS Solutions JSC');

      // Check if redirected from email auth validation link to show success toast
      if (typeof window !== 'undefined') {
        const hasRedirected = sessionStorage.getItem('natime-auth-redirect-success');
        if (hasRedirected === 'true') {
          showToast(t('Xác thực tài khoản thành công! Chào mừng bạn đến với nATime.', 'Account verified successfully! Welcome to nATime.'), 'success');
          sessionStorage.removeItem('natime-auth-redirect-success');
        }
      }
    }
  }, [user]);

  // -------------------------------------------------------------
  // Helpers & Handlers
  // -------------------------------------------------------------
  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      showToast(t('Dữ liệu đã được cập nhật mới nhất', 'Data successfully refreshed'), 'info');
    }, 800);
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    showToast(t('Đã sao chép License Key vào clipboard', 'Copied License Key to clipboard'), 'success');
  };

  const handleActivateLicense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey.trim()) {
      showToast(t('Vui lòng nhập mã kích hoạt', 'Please enter activation key'), 'error');
      return;
    }

    const isDuplicate = licenses.some((l) => l.key.toUpperCase() === newKey.trim().toUpperCase());
    if (isDuplicate) {
      showToast(t('License Key này đã được kích hoạt trước đó', 'This License Key is already active'), 'error');
      return;
    }

    const modulesMapping: Record<string, { vi: string; en: string; maxDev: number }> = {
      attendance: { vi: 'Chấm công thông minh (Smart Attendance)', en: 'Smart Time Attendance', maxDev: 15 },
      access: { vi: 'Kiểm soát Cổng ra vào (Gate Access Control)', en: 'Gate Access Control', maxDev: 8 },
      weighbridge: { vi: 'Trạm cân xe (Weighbridge Control)', en: 'Weighbridge Management', maxDev: 2 },
      asset: { vi: 'Tài sản CNTT (IT Asset Management)', en: 'IT Asset Management', maxDev: 100 },
    };

    const mod = modulesMapping[newKeyModule];
    const newLicense: LicenseKey = {
      key: newKey.trim().toUpperCase(),
      moduleVi: mod.vi,
      moduleEn: mod.en,
      status: 'active',
      devicesConnected: 0,
      devicesMax: mod.maxDev,
      expireDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    };

    if (isMockEnabled || !supabase) {
      // Mock logic
      const updated = [newLicense, ...licenses];
      setLicenses(updated);
      localStorage.setItem('natime-licenses', JSON.stringify(updated));
      setNewKey('');
      showToast(t('Kích hoạt License thành công!', 'License key activated successfully!'), 'success');
    } else {
      // Real Supabase insertion
      try {
        const plan = planTypeMapping[newKeyModule] || 'Attendance';
        const { error } = await supabase
          .from('licenses')
          .insert([{
            license_key: newKey.trim().toUpperCase(),
            plan_type: plan,
            devices_limit: mod.maxDev,
            devices_used: 0,
            status: 'Active',
            expiry_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
            user_id: user?.id,
          }]);

        if (error) {
          showToast(error.message, 'error');
        } else {
          setLicenses([newLicense, ...licenses]);
          setNewKey('');
          showToast(t('Kích hoạt License thành công!', 'License key activated successfully!'), 'success');
        }
      } catch (err: any) {
        showToast(err.message || 'Error communicating with Supabase', 'error');
      }
    }
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim()) {
      showToast(t('Vui lòng nhập tiêu đề yêu cầu', 'Please enter a ticket subject'), 'error');
      return;
    }

    const ticketNo = `TK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket: SupportTicket = {
      id: ticketNo,
      subject: ticketSubject.trim(),
      status: 'pending',
      priority: ticketPriority,
      date: new Date().toISOString().split('T')[0],
      description: ticketDescription.trim(),
    };

    if (isMockEnabled || !supabase) {
      // Mock logic
      const updated = [newTicket, ...tickets];
      setTickets(updated);
      localStorage.setItem('natime-tickets', JSON.stringify(updated));
      setTicketSubject('');
      setTicketDescription('');
      setShowAddTicketForm(false);
      showToast(t('Tạo yêu cầu hỗ trợ thành công!', 'Support ticket created successfully!'), 'success');
    } else {
      // Real Supabase insertion
      try {
        // Priority to Uppercase-first
        const priorityVal = ticketPriority.charAt(0).toUpperCase() + ticketPriority.slice(1);
        const { error } = await supabase
          .from('tickets')
          .insert([{
            ticket_number: ticketNo,
            subject: ticketSubject.trim(),
            category: 'Device', // Default to Device
            priority: priorityVal,
            status: 'Open',
            user_id: user?.id,
          }]);

        if (error) {
          showToast(error.message, 'error');
        } else {
          setTickets([newTicket, ...tickets]);
          setTicketSubject('');
          setTicketDescription('');
          setShowAddTicketForm(false);
          showToast(t('Tạo yêu cầu hỗ trợ thành công!', 'Support ticket created successfully!'), 'success');
        }
      } catch (err: any) {
        showToast(err.message || 'Error communicating with Supabase', 'error');
      }
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileName.trim()) {
      showToast(t('Tên không được để trống', 'Name cannot be empty'), 'error');
      return;
    }

    const { error } = await updateProfile(profileName, profileOrg);
    if (error) {
      showToast(error.message, 'error');
    } else {
      showToast(t('Cập nhật thông tin tài khoản thành công', 'Profile updated successfully'), 'success');
    }
  };

  // Click outside listener for profile menu & mobile sidebar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        if (window.innerWidth < 1024) {
          setSidebarOpen(false);
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen]);

  // -------------------------------------------------------------
  // Client-side authentication check & redirection
  // -------------------------------------------------------------
  useEffect(() => {
    if (!loading && !user) {
      setIsRedirecting(true);
      const timer = setTimeout(() => {
        router.push('/login');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [user, loading, router]);

  // If page loading auth, render loader skeleton
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm font-medium text-muted">
            {t('Đang xác thực thông tin...', 'Authenticating connection...')}
          </p>
        </div>
      </div>
    );
  }

  // If redirecting, show the beautiful fading overlay
  if (isRedirecting || !user) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 text-white transition-opacity duration-700 ease-in-out">
        <div className="flex flex-col items-center gap-5 text-center px-6 max-w-md animate-fade-in-up">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/30 text-primary shadow-[0_0_50px_rgba(79,70,229,0.3)]">
            <svg className="h-8 w-8 animate-pulse-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white mb-1.5">
              {t('Yêu cầu Đăng nhập', 'Authentication Required')}
            </h2>
            <p className="text-sm text-slate-400">
              {t('Hệ thống đang chuyển hướng bạn sang trang đăng nhập nATime.', 'Redirecting you to the nATime login portal.')}
            </p>
          </div>
          <div className="h-1.5 w-32 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-full origin-left animate-[loading_1.5s_ease-in-out_infinite] bg-primary rounded-full" />
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes loading {
            0% { transform: scaleX(0); }
            50% { transform: scaleX(0.7); }
            100% { transform: scaleX(1); }
          }
        ` }} />
      </div>
    );
  }

  // -------------------------------------------------------------
  // Dashboard UI Layout
  // -------------------------------------------------------------
  return (
    <div className="flex min-h-screen bg-background text-foreground transition-all duration-300">
      
      {/* Toast notifications container */}
      <div className="fixed top-5 right-5 z-[100] flex flex-col gap-2.5 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 rounded-lg px-4 py-3.5 shadow-lg border text-sm font-semibold transition-all duration-300 animate-slide-in-right ${
              toast.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-400'
                : toast.type === 'error'
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/50 text-rose-800 dark:text-rose-400'
                : 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900/50 text-indigo-800 dark:text-indigo-400'
            }`}
          >
            {toast.type === 'success' && (
              <svg className="h-4 w-4 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
            {toast.type === 'error' && (
              <svg className="h-4 w-4 shrink-0 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            {toast.type === 'info' && (
              <svg className="h-4 w-4 shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className="flex-1">{toast.text}</span>
          </div>
        ))}
      </div>

      {/* ----------------------------------------------------------- */}
      {/* Sidebar Navigation */}
      {/* ----------------------------------------------------------- */}
      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-border bg-card transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] lg:translate-x-0 lg:static
          ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64 lg:w-[220px]'}`}
        style={{ width: '220px' }}
      >
        {/* Sidebar Header / Logo */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="/logo.png"
              alt="nATime Logo"
              className="h-7 w-auto object-contain dark:brightness-110"
            />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-card-hover lg:hidden"
          >
            <svg className="h-4 w-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sidebar Navigation Menu */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          <button
            onClick={() => {
              setActiveTab('overview');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold tracking-wide transition-all duration-200 select-none cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-primary/10 text-primary border-l-2 border-primary'
                : 'text-muted hover:text-foreground hover:bg-card-hover'
            }`}
          >
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            {t('Tổng quan', 'Overview')}
          </button>

          <button
            onClick={() => {
              setActiveTab('licenses');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold tracking-wide transition-all duration-200 select-none cursor-pointer ${
              activeTab === 'licenses'
                ? 'bg-primary/10 text-primary border-l-2 border-primary'
                : 'text-muted hover:text-foreground hover:bg-card-hover'
            }`}
          >
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m-2 4a2 2 0 012 2m-8-3a3 3 0 10.002-6.001A3 3 0 009 12zm0 0l-5.903 5.903a2 2 0 00-.597 1.414V21h3v-2h2v-2h3v-2.097a2 2 0 00-.586-1.414L15 12z" />
            </svg>
            {t('Quản lý License', 'Licenses')}
          </button>

          <button
            onClick={() => {
              setActiveTab('tickets');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold tracking-wide transition-all duration-200 select-none cursor-pointer ${
              activeTab === 'tickets'
                ? 'bg-primary/10 text-primary border-l-2 border-primary'
                : 'text-muted hover:text-foreground hover:bg-card-hover'
            }`}
          >
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {t('Hỗ trợ kỹ thuật', 'Support Tickets')}
          </button>

          <button
            onClick={() => {
              setActiveTab('profile');
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold tracking-wide transition-all duration-200 select-none cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-primary/10 text-primary border-l-2 border-primary'
                : 'text-muted hover:text-foreground hover:bg-card-hover'
            }`}
          >
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {t('Thông tin tài khoản', 'Profile')}
          </button>
        </nav>

        {/* Sidebar Footer Link (Back to Home) */}
        <div className="p-3 border-t border-border shrink-0">
          <Link
            href="/"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold tracking-wide text-muted hover:text-foreground hover:bg-card-hover transition-colors duration-200"
          >
            <svg className="h-4 w-4 shrink-0 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('Quay lại trang chủ', 'Back to Site')}
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar backdrop overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* ----------------------------------------------------------- */}
      {/* Main Content Area */}
      {/* ----------------------------------------------------------- */}
      <div className="flex flex-1 flex-col overflow-hidden min-h-screen">
        
        {/* Top Header Bar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-4 sm:px-6 lg:px-8 select-none">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger menu */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card hover:bg-card-hover lg:hidden cursor-pointer"
              aria-label="Open sidebar"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Current Page Title / Breadcrumb */}
            <div className="hidden sm:block">
              <span className="text-xs font-semibold tracking-wider uppercase text-muted">nATime Client Portal</span>
              <span className="mx-2 text-border">/</span>
              <span className="text-xs font-bold text-foreground">
                {activeTab === 'overview' && t('Tổng quan', 'Overview')}
                {activeTab === 'licenses' && t('Quản lý License', 'Licenses')}
                {activeTab === 'tickets' && t('Hỗ trợ kỹ thuật', 'Support Tickets')}
                {activeTab === 'profile' && t('Hồ sơ tài khoản', 'Profile')}
              </span>
            </div>
          </div>

          {/* Top Bar Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageToggle />

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-border bg-card p-1 pr-3 hover:bg-card-hover hover:border-primary/30 transition-all duration-200 cursor-pointer"
              >
                <img
                  src={avatarFallback}
                  alt={user.name || 'User'}
                  className="h-7 w-7 rounded-full object-cover ring-2 ring-primary/20"
                />
                <span className="hidden md:inline text-xs font-bold text-foreground">
                  {user.name || t('Người dùng', 'User')}
                </span>
                <svg className="h-3.5 w-3.5 text-muted transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Profile Dropdown List */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2.5 w-56 origin-top-right rounded-lg border border-border bg-card p-1 shadow-xl ring-1 ring-black/5 focus:outline-none z-50 animate-fade-in-up">
                  <div className="px-3.5 py-3 border-b border-border/60">
                    <p className="text-xs font-bold text-foreground truncate">{user.name || t('Người dùng', 'User')}</p>
                    <p className="text-[10px] font-medium text-muted truncate mt-0.5">{user.email}</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setProfileDropdownOpen(false);
                      }}
                      className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-xs font-semibold text-foreground hover:bg-card-hover transition-colors duration-150 cursor-pointer"
                    >
                      <svg className="h-4 w-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {t('Thông tin tài khoản', 'Profile Details')}
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('licenses');
                        setProfileDropdownOpen(false);
                      }}
                      className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-xs font-semibold text-foreground hover:bg-card-hover transition-colors duration-150 cursor-pointer"
                    >
                      <svg className="h-4 w-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m-2 4a2 2 0 012 2m-8-3a3 3 0 10.002-6.001A3 3 0 009 12zm0 0l-5.903 5.903a2 2 0 00-.597 1.414V21h3v-2h2v-2h3v-2.097a2 2 0 00-.586-1.414L15 12z" />
                      </svg>
                      {t('Quản lý License', 'My Licenses')}
                    </button>
                  </div>
                  <div className="border-t border-border/60 pt-1">
                    <button
                      onClick={async () => {
                        setProfileDropdownOpen(false);
                        await signOut();
                        showToast(t('Đã đăng xuất thành công', 'Logged out successfully'), 'info');
                      }}
                      className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors duration-150 cursor-pointer"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      {t('Đăng xuất', 'Sign Out')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Dashboard View */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">

            {/* ------------------------------------------------------- */}
            {/* TAB: OVERVIEW */}
            {/* ------------------------------------------------------- */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-[fade-in-up_0.4s_ease-out_both]">
                
                {/* Dashboard Page Header */}
                <header className="header flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-border/60 gap-4">
                  <div>
                    <h1 className="title text-xl font-bold tracking-tight text-foreground mb-[3px] select-none flex items-center gap-2">
                      {t('Chào mừng trở lại,', 'Welcome back,')} {user.name || t('Người dùng', 'User')} 👋
                    </h1>
                    <p className="subtitle text-xs text-muted">
                      {t('Hệ thống quản lý bản quyền phần mềm và cổng thông tin hỗ trợ nATime', 'nATime software license management and client support portal')}
                    </p>
                  </div>
                  <div className="header-actions flex items-center gap-3">
                    <button
                      onClick={handleRefresh}
                      className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-md border border-border bg-card hover:bg-card-hover text-foreground cursor-pointer transition-all duration-200"
                    >
                      <svg className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.253 8H18" />
                      </svg>
                      {t('Làm mới', 'Refresh')}
                    </button>
                    <button
                      onClick={() => setActiveTab('licenses')}
                      className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-md bg-primary text-white hover:bg-primary-hover shadow-sm hover:shadow-primary/20 cursor-pointer transition-all duration-200"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      {t('Kích hoạt License', 'Activate License')}
                    </button>
                  </div>
                </header>

                {/* 3 Metrics Cards Grid */}
                <div className="metrics-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  
                  {/* Card 1: Active Licenses */}
                  <div className="relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md group">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted tracking-wide">
                        {t('Giấy phép hoạt động', 'Active Licenses')}
                      </span>
                      <div className="rounded-lg bg-indigo-50 dark:bg-indigo-950/40 p-2 text-primary group-hover:scale-110 transition-transform duration-200">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m-2 4a2 2 0 012 2m-8-3a3 3 0 10.002-6.001A3 3 0 009 12zm0 0l-5.903 5.903a2 2 0 00-.597 1.414V21h3v-2h2v-2h3v-2.097a2 2 0 00-.586-1.414L15 12z" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-2xl font-bold tracking-tight text-foreground">
                        {licenses.filter(l => l.status === 'active').length}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">
                        {t('Đang chạy', 'Running')}
                      </span>
                    </div>
                    <p className="mt-2.5 text-[11px] text-muted">
                      {t('Tổng cộng', 'Total of')} {licenses.length} {t('giấy phép được liên kết', 'linked license keys')}
                    </p>
                    <span className="absolute bottom-0 right-0 h-10 w-24 translate-x-4 translate-y-4 opacity-5 bg-gradient-to-tl from-primary to-transparent blur-lg rounded-full" />
                  </div>

                  {/* Card 2: Open Support Tickets */}
                  <div className="relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md group">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted tracking-wide">
                        {t('Yêu cầu hỗ trợ', 'Open Support Tickets')}
                      </span>
                      <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/40 p-2 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-200">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-2xl font-bold tracking-tight text-foreground">
                        {tickets.filter(t => t.status === 'pending' || t.status === 'answered').length}
                      </span>
                      {tickets.filter(t => t.status === 'pending').length > 0 && (
                        <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded">
                          {tickets.filter(t => t.status === 'pending').length} {t('Đang xử lý', 'Pending')}
                        </span>
                      )}
                    </div>
                    <p className="mt-2.5 text-[11px] text-muted">
                      {t('Cam kết phản hồi trong vòng 60 phút', 'Committed SLA response within 60 mins')}
                    </p>
                    <span className="absolute bottom-0 right-0 h-10 w-24 translate-x-4 translate-y-4 opacity-5 bg-gradient-to-tl from-emerald-500 to-transparent blur-lg rounded-full" />
                  </div>

                  {/* Card 3: Support Tier / Expiry */}
                  <div className="relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md group">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted tracking-wide">
                        {t('Gói hỗ trợ kỹ thuật', 'Support Service Level')}
                      </span>
                      <div className="rounded-lg bg-purple-50 dark:bg-purple-950/40 p-2 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-200">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-lg font-bold tracking-tight text-foreground truncate max-w-full">
                        {supportTierFallback}
                      </span>
                    </div>
                    <p className="mt-3.5 text-[11px] font-semibold text-primary">
                      ⏳ {daysRemainingFallback} {t('ngày dịch vụ còn lại', 'active support days remaining')}
                    </p>
                    <span className="absolute bottom-0 right-0 h-10 w-24 translate-x-4 translate-y-4 opacity-5 bg-gradient-to-tl from-purple-500 to-transparent blur-lg rounded-full" />
                  </div>
                </div>

                {/* Grid Split Content: Recent Activity Feed & Download Links */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  
                  {/* Left Column: Recent Activity Feed */}
                  <div className="rounded-xl border border-border bg-card p-5 shadow-sm lg:col-span-2">
                    <div className="flex items-center justify-between pb-4 border-b border-border/60">
                      <div>
                        <h2 className="text-sm font-bold text-foreground">
                          {t('Lịch sử hoạt động tài khoản', 'Account Activity Feed')}
                        </h2>
                        <p className="text-[10px] text-muted mt-0.5">
                          {t('Nhật ký sự kiện gần đây liên quan đến License & Hỗ trợ', 'Audit log of recent license and ticket status updates')}
                        </p>
                      </div>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                        {t('Tự động cập nhật', 'Live Feed')}
                      </span>
                    </div>

                    <div className="mt-4 space-y-4.5">
                      
                      {/* Event 1 */}
                      <div className="flex gap-3">
                        <div className="flex shrink-0 items-center justify-center h-8 w-8 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-foreground truncate">
                            {t('Kích hoạt thành công License kiểm soát cổng tại Nhà máy 1', 'Successfully activated Access Control license at Factory 1')}
                          </p>
                          <p className="text-[10px] text-muted mt-0.5">
                            {t('Người thực hiện: Nguyễn Văn An • 2 giờ trước', 'Triggered by: Nguyen Van An • 2 hours ago')}
                          </p>
                        </div>
                      </div>

                      {/* Event 2 */}
                      <div className="flex gap-3">
                        <div className="flex shrink-0 items-center justify-center h-8 w-8 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-foreground truncate">
                            {t('Yêu cầu hỗ trợ mới #TK-2849 được khởi tạo thành công', 'New technical ticket #TK-2849 created successfully')}
                          </p>
                          <p className="text-[10px] text-muted mt-0.5">
                            {t('Trạng thái: Đang chờ phân bổ kỹ thuật viên • Hôm qua', 'Status: Awaiting engineer allocation • Yesterday')}
                          </p>
                        </div>
                      </div>

                      {/* Event 3 */}
                      <div className="flex gap-3">
                        <div className="flex shrink-0 items-center justify-center h-8 w-8 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-primary">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.253 8H18" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-foreground truncate">
                            {t('Gia hạn tự động thành công Module Chấm công Mobile', 'Auto-renewed Mobile Attendance license package')}
                          </p>
                          <p className="text-[10px] text-muted mt-0.5">
                            {t('Thời hạn mới kéo dài tới: 2027-12-31 • 4 ngày trước', 'Extended expiry to: 2027-12-31 • 4 days ago')}
                          </p>
                        </div>
                      </div>

                      {/* Event 4 */}
                      <div className="flex gap-3">
                        <div className="flex shrink-0 items-center justify-center h-8 w-8 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m-2 4a2 2 0 012 2m-8-3a3 3 0 10.002-6.001A3 3 0 009 12zm0 0l-5.903 5.903a2 2 0 00-.597 1.414V21h3v-2h2v-2h3v-2.097a2 2 0 00-.586-1.414L15 12z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-foreground truncate">
                            {t('Phát hiện đăng nhập tài khoản từ địa chỉ IP mới: 113.161.4.92', 'Detected client portal login from a new IP location: 113.161.4.92')}
                          </p>
                          <p className="text-[10px] text-muted mt-0.5">
                            {t('Thiết bị: Chrome on Windows 11 • 7 ngày trước', 'User-Agent: Chrome on Windows 11 • 7 days ago')}
                          </p>
                        </div>
                      </div>

                      {/* Event 5 */}
                      <div className="flex gap-3">
                        <div className="flex shrink-0 items-center justify-center h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 text-foreground">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-foreground truncate">
                            {t('Tải xuống SDK cấu hình kết nối thiết bị kiểm soát ra vào v1.2', 'Downloaded Gate Access device SDK & Connection Package v1.2')}
                          </p>
                          <p className="text-[10px] text-muted mt-0.5">
                            {t('File: nATime_Gate_SDK_v1.2.zip (45 MB) • 10 ngày trước', 'File: nATime_Gate_SDK_v1.2.zip (45 MB) • 10 days ago')}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Right Column: Quick Software Downloads Card */}
                  <div className="rounded-xl border border-border bg-card p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-foreground pb-3 border-b border-border/60">
                        {t('Tải xuống phần mềm', 'Downloads & SDKs')}
                      </h2>
                      <p className="text-[10.5px] text-muted mt-2">
                        {t('Tải phiên bản mới nhất của ứng dụng khách nATime và tài liệu đi kèm:', 'Get the latest installation bundles, client software, and developer manuals:')}
                      </p>

                      <div className="mt-4.5 space-y-3">
                        
                        {/* Download Item 1 */}
                        <div className="flex items-center justify-between p-2 rounded-lg bg-card-hover border border-border/40 hover:border-primary/20 transition-colors duration-200">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="shrink-0 text-xl">🤖</span>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-foreground truncate">nATime Mobile App</p>
                              <p className="text-[9.5px] text-muted">Android APK v2.4.0 • 34 MB</p>
                            </div>
                          </div>
                          <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); showToast(t('Đang tải ứng dụng Android APK...', 'Downloading Android APK...'), 'info'); }}
                            className="flex h-7 w-7 items-center justify-center rounded bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer"
                          >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </a>
                        </div>

                        {/* Download Item 2 */}
                        <div className="flex items-center justify-between p-2 rounded-lg bg-card-hover border border-border/40 hover:border-primary/20 transition-colors duration-200">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="shrink-0 text-xl">🪟</span>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-foreground truncate">nATime Client (Win)</p>
                              <p className="text-[9.5px] text-muted">Desktop Bundle v2.4.1 • 185 MB</p>
                            </div>
                          </div>
                          <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); showToast(t('Đang tải nATime Client cho Windows...', 'Downloading nATime Client for Windows...'), 'info'); }}
                            className="flex h-7 w-7 items-center justify-center rounded bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer"
                          >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </a>
                        </div>

                        {/* Download Item 3 */}
                        <div className="flex items-center justify-between p-2 rounded-lg bg-card-hover border border-border/40 hover:border-primary/20 transition-colors duration-200">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="shrink-0 text-xl">🍏</span>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-foreground truncate">nATime Client (macOS)</p>
                              <p className="text-[9.5px] text-muted">Desktop DMG v2.4.1 • 190 MB</p>
                            </div>
                          </div>
                          <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); showToast(t('Đang tải nATime Client cho macOS...', 'Downloading nATime Client for macOS...'), 'info'); }}
                            className="flex h-7 w-7 items-center justify-center rounded bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer"
                          >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </a>
                        </div>

                        {/* Download Item 4 */}
                        <div className="flex items-center justify-between p-2 rounded-lg bg-card-hover border border-border/40 hover:border-primary/20 transition-colors duration-200">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="shrink-0 text-xl">📕</span>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-foreground truncate">Manual Setup Guide</p>
                              <p className="text-[9.5px] text-muted">PDF Document • 12 MB</p>
                            </div>
                          </div>
                          <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); showToast(t('Đang tải tài liệu hướng dẫn...', 'Downloading documentation...'), 'info'); }}
                            className="flex h-7 w-7 items-center justify-center rounded bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer"
                          >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </a>
                        </div>

                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-border/60">
                      <p className="text-[10px] text-muted leading-relaxed">
                        ⚠️ {t('Mọi liên kết tải xuống đều được mã hóa chữ ký số của ACS. Vui lòng không cài đặt file từ các nguồn không chính thức.', 'All file downloads are cryptographically signed by ACS. Avoid running software components from untrusted origins.')}
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* ------------------------------------------------------- */}
            {/* TAB: LICENSES */}
            {/* ------------------------------------------------------- */}
            {activeTab === 'licenses' && (
              <div className="space-y-6 animate-[fade-in-up_0.4s_ease-out_both]">
                
                {/* Licenses Header */}
                <header className="header flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-border/60 gap-4">
                  <div>
                    <h1 className="title text-xl font-bold tracking-tight text-foreground mb-[3px] select-none flex items-center gap-2">
                      <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m-2 4a2 2 0 012 2m-8-3a3 3 0 10.002-6.001A3 3 0 009 12zm0 0l-5.903 5.903a2 2 0 00-.597 1.414V21h3v-2h2v-2h3v-2.097a2 2 0 00-.586-1.414L15 12z" />
                      </svg>
                      {t('Danh sách Giấy phép nATime', 'Your Licensed Features')}
                    </h1>
                    <p className="subtitle text-xs text-muted">
                      {t('Quản lý khóa kích hoạt bản quyền, số lượng thiết bị được kết nối trên các phân hệ', 'Manage your feature activation keys and device limits across all system modules')}
                    </p>
                  </div>
                </header>

                {/* Form to activate new license */}
                <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                  <h2 className="text-sm font-bold text-foreground mb-1 select-none">
                    🔑 {t('Kích hoạt License mới', 'Activate New License Key')}
                  </h2>
                  <p className="text-[10px] text-muted mb-4 leading-normal">
                    {t('Nhập chuỗi License Key do nhà cung cấp ACS cấp để kích hoạt thêm các tính năng nâng cao cho hệ thống của bạn.', 'Type the activation token supplied by ACS sales representative to unlock advanced sub-modules.')}
                  </p>

                  <form onSubmit={handleActivateLicense} className="flex flex-col sm:flex-row items-end gap-4.5">
                    <div className="flex-1 w-full">
                      <label className="block text-[10.5px] font-bold text-muted mb-1.5">
                        {t('Mã kích hoạt (License Key)', 'Activation Key')}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. NT-ATT-XXXX-XXXX"
                        value={newKey}
                        onChange={(e) => setNewKey(e.target.value)}
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground placeholder-muted/60 focus:border-primary/50 focus:outline-none transition-colors duration-200"
                      />
                    </div>

                    <div className="w-full sm:w-56">
                      <label className="block text-[10.5px] font-bold text-muted mb-1.5">
                        {t('Phân hệ ứng dụng', 'Target Software Module')}
                      </label>
                      <select
                        value={newKeyModule}
                        onChange={(e) => setNewKeyModule(e.target.value)}
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary/50 focus:outline-none transition-colors duration-200 cursor-pointer"
                      >
                        <option value="attendance">{t('Chấm công thông minh', 'Smart Attendance')}</option>
                        <option value="access">{t('Kiểm soát Cổng ra vào', 'Gate Access Control')}</option>
                        <option value="weighbridge">{t('Cân xe / Trạm cân', 'Weighbridge System')}</option>
                        <option value="asset">{t('Tài sản CNTT', 'IT Asset Management')}</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-md bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md shadow-primary/20 transition-all duration-200 shrink-0 cursor-pointer"
                    >
                      {t('Kích hoạt ngay', 'Activate Key')}
                    </button>
                  </form>
                </div>

                {/* Licenses List table */}
                <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-xs">
                      <thead className="bg-slate-50 dark:bg-slate-900 border-b border-border/80 text-[10.5px] text-muted font-bold select-none">
                        <tr>
                          <th className="px-5 py-3.5 whitespace-nowrap">{t('Tính năng / Module', 'Feature / Module')}</th>
                          <th className="px-5 py-3.5 whitespace-nowrap">{t('Khóa bản quyền (License Key)', 'License Key')}</th>
                          <th className="px-5 py-3.5 whitespace-nowrap">{t('Trạng thái', 'Status')}</th>
                          <th className="px-5 py-3.5 whitespace-nowrap text-center">{t('Thiết bị kết nối', 'Connected Devices')}</th>
                          <th className="px-5 py-3.5 whitespace-nowrap">{t('Ngày hết hạn', 'Expiry Date')}</th>
                          <th className="px-5 py-3.5 whitespace-nowrap text-center">{t('Hành động', 'Actions')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        {licenses.map((lic) => (
                          <tr key={lic.key} className="hover:bg-primary-light/40 dark:hover:bg-primary-light/10 transition-colors duration-150">
                            <td className="px-5 py-4 font-bold text-foreground">
                              {locale === 'vi' ? lic.moduleVi : lic.moduleEn}
                            </td>
                            <td className="px-5 py-4 font-mono font-medium text-muted">
                              {lic.key}
                            </td>
                            <td className="px-5 py-4">
                              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9.5px] font-bold ${
                                lic.status === 'active'
                                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                                  : lic.status === 'trial'
                                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'
                                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400'
                              }`}>
                                <span className={`h-1.5 w-1.5 rounded-full ${
                                  lic.status === 'active'
                                    ? 'bg-emerald-500'
                                    : lic.status === 'trial'
                                    ? 'bg-amber-500'
                                    : 'bg-rose-500'
                                }`} />
                                {lic.status === 'active' && t('Hoạt động', 'Active')}
                                {lic.status === 'trial' && t('Dùng thử', 'Trial')}
                                {lic.status === 'suspended' && t('Tạm ngưng', 'Suspended')}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-center font-semibold text-foreground">
                              <div className="flex items-center justify-center gap-1.5">
                                <span>{lic.devicesConnected} / {lic.devicesMax}</span>
                                <span className="text-[10px] text-muted font-normal">
                                  ({Math.round((lic.devicesConnected / lic.devicesMax) * 100)}%)
                                </span>
                              </div>
                              <div className="mt-1.5 w-24 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full h-1 overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    lic.devicesConnected >= lic.devicesMax
                                      ? 'bg-amber-500'
                                      : 'bg-primary'
                                  }`}
                                  style={{ width: `${(lic.devicesConnected / lic.devicesMax) * 100}%` }}
                                />
                              </div>
                            </td>
                            <td className="px-5 py-4 text-muted font-medium">
                              {lic.expireDate}
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => handleCopyKey(lic.key)}
                                  title={t('Sao chép Key', 'Copy License Key')}
                                  className="p-1.5 rounded border border-border bg-card hover:bg-card-hover hover:border-primary/30 text-muted hover:text-primary transition-all duration-150 cursor-pointer"
                                >
                                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => {
                                    showToast(t('Đã yêu cầu gia hạn bản quyền cho key ' + lic.key, 'Requested subscription renewal for key ' + lic.key), 'info');
                                  }}
                                  className="px-2 py-1 text-[10px] font-bold rounded border border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all duration-150 cursor-pointer"
                                >
                                  {t('Gia hạn', 'Renew')}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* ------------------------------------------------------- */}
            {/* TAB: SUPPORT TICKETS */}
            {/* ------------------------------------------------------- */}
            {activeTab === 'tickets' && (
              <div className="space-y-6 animate-[fade-in-up_0.4s_ease-out_both]">
                
                {/* Tickets Header */}
                <header className="header flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-border/60 gap-4">
                  <div>
                    <h1 className="title text-xl font-bold tracking-tight text-foreground mb-[3px] select-none flex items-center gap-2">
                      <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      {t('Hỗ trợ kỹ thuật nATime', 'Technical Support Tickets')}
                    </h1>
                    <p className="subtitle text-xs text-muted">
                      {t('Tạo và theo dõi tiến độ các yêu cầu giải đáp, sửa lỗi thiết bị hoặc kích hoạt dịch vụ', 'Create and monitor support cases, hardware issues, or custom API integration inquiries')}
                    </p>
                  </div>
                  <div className="header-actions">
                    <button
                      onClick={() => setShowAddTicketForm((v) => !v)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-md bg-primary text-white hover:bg-primary-hover shadow-sm hover:shadow-primary/20 cursor-pointer transition-all duration-200"
                    >
                      {showAddTicketForm ? (
                        <>
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          {t('Hủy bỏ', 'Cancel')}
                        </>
                      ) : (
                        <>
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {t('Tạo yêu cầu mới', 'Create New Ticket')}
                        </>
                      )}
                    </button>
                  </div>
                </header>

                {/* Expandable Form container */}
                {showAddTicketForm && (
                  <div className="rounded-xl border border-border bg-card p-5 shadow-sm animate-fade-in-up">
                    <h2 className="text-sm font-bold text-foreground mb-1 select-none">
                      📝 {t('Gửi yêu cầu hỗ trợ mới', 'Open a New Ticket')}
                    </h2>
                    <p className="text-[10px] text-muted mb-4">
                      {t('Vui lòng mô tả chi tiết lỗi hoặc thắc mắc. Kỹ sư nATime sẽ phản hồi trong khung thời gian cam kết SLA.', 'Please detail your technical issue. Our system reliability engineers will respond within SLA terms.')}
                    </p>

                    <form onSubmit={handleCreateTicket} className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[10.5px] font-bold text-muted mb-1.5">
                            {t('Tiêu đề yêu cầu hỗ trợ', 'Subject / Summary')}
                          </label>
                          <input
                            type="text"
                            placeholder={t('Ví dụ: Lỗi thiết bị FaceID không kết nối server...', 'e.g. FaceID reader connection timeouts...')}
                            value={ticketSubject}
                            onChange={(e) => setTicketSubject(e.target.value)}
                            className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground placeholder-muted/60 focus:border-primary/50 focus:outline-none transition-colors duration-200"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10.5px] font-bold text-muted mb-1.5">
                            {t('Mức độ ưu tiên', 'Priority Level')}
                          </label>
                          <select
                            value={ticketPriority}
                            onChange={(e) => setTicketPriority(e.target.value as any)}
                            className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary/50 focus:outline-none transition-colors duration-200 cursor-pointer"
                          >
                            <option value="low">{t('Thấp (Low)', 'Low')}</option>
                            <option value="medium">{t('Trung bình (Medium)', 'Medium')}</option>
                            <option value="high">{t('Cao (High - Critical)', 'High')}</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10.5px] font-bold text-muted mb-1.5">
                          {t('Mô tả chi tiết nội dung sự cố', 'Detailed Description')}
                        </label>
                        <textarea
                          rows={4}
                          placeholder={t('Hãy ghi rõ mã lỗi hiển thị, dòng máy chấm công đang sử dụng, và các bước thao tác gây ra lỗi để chúng tôi xử lý nhanh hơn.', 'Provide error messages, device model names, logs, or replication steps to speed up diagnostic processing.')}
                          value={ticketDescription}
                          onChange={(e) => setTicketDescription(e.target.value)}
                          className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground placeholder-muted/60 focus:border-primary/50 focus:outline-none transition-colors duration-200 resize-y"
                          required
                        />
                      </div>

                      <div className="flex justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAddTicketForm(false)}
                          className="px-4 py-2 border border-border rounded bg-card text-xs font-semibold text-foreground hover:bg-card-hover cursor-pointer transition-all"
                        >
                          {t('Hủy bỏ', 'Cancel')}
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md shadow-primary/20 transition-all cursor-pointer"
                        >
                          {t('Gửi yêu cầu', 'Submit Ticket')}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Ticket Table */}
                <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-xs">
                      <thead className="bg-slate-50 dark:bg-slate-900 border-b border-border/80 text-[10.5px] text-muted font-bold select-none">
                        <tr>
                          <th className="px-5 py-3.5 whitespace-nowrap">{t('Mã Ticket', 'Ticket ID')}</th>
                          <th className="px-5 py-3.5 whitespace-nowrap">{t('Chủ đề yêu cầu', 'Subject')}</th>
                          <th className="px-5 py-3.5 whitespace-nowrap">{t('Trạng thái', 'Status')}</th>
                          <th className="px-5 py-3.5 whitespace-nowrap">{t('Độ ưu tiên', 'Priority')}</th>
                          <th className="px-5 py-3.5 whitespace-nowrap">{t('Ngày cập nhật', 'Last Updated')}</th>
                          <th className="px-5 py-3.5 whitespace-nowrap text-center">{t('Thao tác', 'Action')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        {tickets.map((tck) => (
                          <tr key={tck.id} className="hover:bg-primary-light/40 dark:hover:bg-primary-light/10 transition-colors duration-150">
                            <td className="px-5 py-4 font-mono font-bold text-foreground">
                              {tck.id}
                            </td>
                            <td className="px-5 py-4 font-semibold text-foreground">
                              <div>
                                <p className="text-foreground">{tck.subject}</p>
                                {tck.description && (
                                  <p className="text-[10px] text-muted font-normal truncate max-w-md mt-1">{tck.description}</p>
                                )}
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9.5px] font-bold ${
                                tck.status === 'answered'
                                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                                  : tck.status === 'pending'
                                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'
                                  : 'bg-slate-100 dark:bg-slate-800 text-muted'
                              }`}>
                                <span className={`h-1.2 w-1.2 rounded-full ${
                                  tck.status === 'answered'
                                    ? 'bg-emerald-500'
                                    : tck.status === 'pending'
                                    ? 'bg-amber-500'
                                    : 'bg-muted'
                                }`} />
                                {tck.status === 'answered' && t('Đã phản hồi', 'Answered')}
                                {tck.status === 'pending' && t('Đang chờ', 'Pending')}
                                {tck.status === 'closed' && t('Đã đóng', 'Closed')}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <span className={`inline-flex rounded px-1.5 py-0.5 text-[9.5px] font-bold uppercase ${
                                tck.priority === 'high'
                                  ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border border-rose-100 dark:border-rose-900/40'
                                  : tck.priority === 'medium'
                                  ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-900/40'
                                  : 'bg-slate-50 dark:bg-slate-900 text-muted border border-border/60'
                              }`}>
                                {tck.priority === 'high' && t('Cao', 'High')}
                                {tck.priority === 'medium' && t('Trung bình', 'Medium')}
                                {tck.priority === 'low' && t('Thấp', 'Low')}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-muted font-medium">
                              {tck.date}
                            </td>
                            <td className="px-5 py-4 text-center">
                              <button
                                onClick={() => {
                                  showToast(t(`Đang mở chi tiết yêu cầu ${tck.id}`, `Opening details for support case ${tck.id}`), 'info');
                                }}
                                className="px-2.5 py-1 rounded border border-border bg-card hover:bg-card-hover text-foreground font-semibold hover:border-primary/30 transition-all duration-150 cursor-pointer"
                              >
                                {t('Xem chi tiết', 'View Ticket')}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* ------------------------------------------------------- */}
            {/* TAB: PROFILE */}
            {/* ------------------------------------------------------- */}
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-[fade-in-up_0.4s_ease-out_both]">
                
                {/* Profile Header */}
                <header className="header flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-border/60 gap-4">
                  <div>
                    <h1 className="title text-xl font-bold tracking-tight text-foreground mb-[3px] select-none flex items-center gap-2">
                      <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {t('Thông tin Tài khoản & Doanh nghiệp', 'Profile & Account Settings')}
                    </h1>
                    <p className="subtitle text-xs text-muted">
                      {t('Quản lý hồ sơ cá nhân của bạn, thông tin tổ chức sở hữu bản quyền nATime', 'Manage your personal user credentials and organization metadata')}
                    </p>
                  </div>
                </header>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  
                  {/* Left Column: Summary avatar card */}
                  <div className="rounded-xl border border-border bg-card p-5 shadow-sm flex flex-col items-center text-center">
                    <div className="relative">
                      <img
                        src={avatarFallback}
                        alt={user.name || 'User'}
                        className="h-24 w-24 rounded-full object-cover ring-4 ring-primary/10 shadow-md"
                      />
                      <span className="absolute bottom-1 right-1 h-4.5 w-4.5 rounded-full border-2 border-card bg-emerald-500" title="Online" />
                    </div>

                    <h2 className="text-sm font-bold text-foreground mt-4 select-none">{user.name || t('Người dùng', 'User')}</h2>
                    <p className="text-[10px] text-muted mt-0.5">{user.email}</p>
                    
                    <span className="mt-3.5 rounded bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/50 px-2.5 py-1 text-[10.5px] font-bold text-purple-700 dark:text-purple-400">
                      🛡️ {supportTierFallback}
                    </span>

                    <div className="w-full mt-6 pt-5 border-t border-border/60 text-left space-y-3">
                      <div>
                        <span className="block text-[9px] font-bold text-muted uppercase tracking-wider">{t('ID Tài khoản', 'User ID')}</span>
                        <span className="text-xs font-mono font-bold text-foreground">{user.id}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] font-bold text-muted uppercase tracking-wider">{t('Trạng thái xác thực', 'Auth Status')}</span>
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">✓ Verified Account</span>
                      </div>
                      <div>
                        <span className="block text-[9px] font-bold text-muted uppercase tracking-wider">{t('Bản quyền sở hữu', 'Subscribed modules')}</span>
                        <span className="text-xs font-semibold text-foreground">
                          {licenses.length} {t('Module ứng dụng', 'Feature Subscriptions')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Profile Form edit */}
                  <div className="rounded-xl border border-border bg-card p-5 shadow-sm lg:col-span-2">
                    <h2 className="text-sm font-bold text-foreground mb-4 select-none pb-2.5 border-b border-border/60">
                      ⚙️ {t('Cập nhật thông tin', 'Edit Personal Profile')}
                    </h2>

                    <form onSubmit={handleSaveProfile} className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-[10.5px] font-bold text-muted mb-1.5">
                            {t('Họ và tên của bạn', 'Full Name')}
                          </label>
                          <input
                            type="text"
                            value={profileName}
                            onChange={(e) => setProfileName(e.target.value)}
                            className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary/50 focus:outline-none transition-colors duration-200"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10.5px] font-bold text-muted mb-1.5">
                            {t('Địa chỉ Email đăng nhập (Không thể đổi)', 'Email Address (Non-changeable)')}
                          </label>
                          <input
                            type="email"
                            value={user.email}
                            disabled
                            className="w-full rounded-md border border-border bg-slate-100 dark:bg-slate-800/80 px-3 py-2 text-xs text-muted cursor-not-allowed focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-[10.5px] font-bold text-muted mb-1.5">
                            {t('Số điện thoại liên hệ', 'Phone Number')}
                          </label>
                          <input
                            type="text"
                            value={profilePhone}
                            onChange={(e) => setProfilePhone(e.target.value)}
                            className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary/50 focus:outline-none transition-colors duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-[10.5px] font-bold text-muted mb-1.5">
                            {t('Doanh nghiệp / Tổ chức', 'Company Name')}
                          </label>
                          <input
                            type="text"
                            value={profileOrg}
                            onChange={(e) => setProfileOrg(e.target.value)}
                            className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary/50 focus:outline-none transition-colors duration-200"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-3">
                        <button
                          type="submit"
                          className="px-5 py-2.5 rounded bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md shadow-primary/20 transition-all cursor-pointer"
                        >
                          {t('Lưu thay đổi', 'Save Settings')}
                        </button>
                      </div>
                    </form>
                  </div>

                </div>

              </div>
            )}

          </div>
        </main>
      </div>

    </div>
  );
}
