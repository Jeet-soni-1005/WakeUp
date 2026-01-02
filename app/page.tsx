'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getStillData } from '@/lib/storage';
import { ArrowRight } from 'lucide-react';

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
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-12 animate-fadeIn">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-bold leading-tight">
            <div>You don't need</div>
            <div>more motivation.</div>
          </h1>
          <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            You need a system.
          </p>
          
        </div>

        <p className="text-lg text-gray-300 max-w-md mx-auto leading-relaxed">
          Define your identity. Commit to one action. Build consistency through simplicity.
        </p>

        <button
          onClick={() => router.push('/onboarding/identity')}
          className="group relative mx-auto block"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          <div className="relative px-8 py-4 bg-gray-900 rounded-lg flex items-center justify-center gap-2 hover:gap-3 transition-all">
            <span className="text-lg font-semibold">Wake Up</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>
    </main>
  );
}
