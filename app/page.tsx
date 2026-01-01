'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getStillData } from '@/lib/storage';

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const data = getStillData();
    if (data.identities.length > 0) {
      router.push('/today');
    }
  }, [router]);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-5xl font-bold mb-8 leading-tight">
          You don't need more motivation.<br />
          You need a system.
        </h1>
        <button
          onClick={() => router.push('/onboarding/identity')}
          className="w-full p-4 bg-black text-white text-lg font-medium hover:bg-gray-900 transition-colors"
        >
          Start
        </button>
      </div>
    </main>
  );
}
