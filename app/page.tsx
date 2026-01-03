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
    <main className="min-h-screen grid grid-rows-[1fr_auto] p-6">
      
      {/* HERO — perfectly centered */}
      <section className="flex items-center justify-center">
        <div className="max-w-2xl w-full text-center space-y-12 animate-fadeIn">

        <div className="space-y-6 text-center">
          {/* Less focus */}
          <h1
            className="
              text-gray-400 font-medium
              text-2xl sm:text-3xl md:text-4xl
              leading-snug
              sm:whitespace-nowrap
            "
          >
            Motivation is temporary
          </h1>

          {/* More focus */}
          <p
            className="
              font-extrabold
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl
              leading-[1.15] pb-3
              whitespace-nowrap
              bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400
              bg-clip-text text-transparent
            "
          >
            You need a system
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
      </section>

      {/* FOOTER — true bottom */}
      <footer className="pt-8 text-center text-xs text-gray-500">
        © Wake Up 2026 · Built to help you show up.
      </footer>

    </main>

  );
}
