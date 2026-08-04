'use client';
import { useEffect } from 'react';
import Link from 'next/link';
export default function DashboardRedirectPage() { useEffect(() => { window.location.replace(`/portal${window.location.search}`); }, []); return <main className="flex min-h-screen items-center justify-center bg-background"><p className="text-sm text-muted">Đang chuyển tới <Link href="/portal" className="font-semibold text-primary underline">Cổng khách hàng</Link>…</p></main>; }
