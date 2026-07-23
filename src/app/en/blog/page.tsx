'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function EnglishBlogRedirectPage() {
  useEffect(() => {
    window.location.replace('/en/changelog');
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-white p-6">
      <p className="text-sm text-slate-600">
        Redirecting to{' '}
        <Link className="font-semibold text-blue-700 underline" href="/en/changelog">
          Changelog
        </Link>
        …
      </p>
    </main>
  );
}
