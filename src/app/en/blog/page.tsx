'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function EnglishBlogRedirectPage() {
  useEffect(() => {
    window.location.replace('/en/changelog');
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#081120] p-6 text-white">
      <p className="text-sm text-white/60">
        Redirecting to{' '}
        <Link className="font-semibold text-white underline" href="/en/changelog">
          Changelog
        </Link>
        …
      </p>
    </main>
  );
}
