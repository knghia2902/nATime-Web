'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function EnglishSupportRedirectPage() {
  useEffect(() => {
    window.location.replace('/en/docs');
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-white p-6">
      <p className="text-sm text-slate-600">
        Redirecting to{' '}
        <Link className="font-semibold text-blue-700 underline" href="/en/docs">
          Support documentation
        </Link>
        …
      </p>
    </main>
  );
}
