'use client';
import { useEffect } from 'react';
import Link from 'next/link';
export default function DashboardRedirectPage() { useEffect(() => { window.location.replace(`/portal${window.location.search}`); }, []); return <main className="flex min-h-screen items-center justify-center bg-slate-50"><p className="text-sm text-slate-600">Đang chuyển tới <Link href="/portal" className="font-semibold text-blue-700 underline">Cổng khách hàng</Link>…</p></main>; }
