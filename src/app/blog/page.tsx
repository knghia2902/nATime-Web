'use client';
import { useEffect } from 'react';
import Link from 'next/link';
export default function BlogRedirectPage() {
  useEffect(() => { window.location.replace('/changelog'); }, []);
  return <main className="flex min-h-screen items-center justify-center bg-white p-6"><p className="text-sm text-slate-600">Đang chuyển tới <Link className="font-semibold text-blue-700 underline" href="/changelog">Nhật ký thay đổi</Link>…</p></main>;
}
