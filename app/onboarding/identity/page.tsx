'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IdentityCard } from '@/components/IdentityCard';
import { IDENTITY_OPTIONS } from '@/lib/types';
import { getStillData, setStillData } from '@/lib/storage';

export default function IdentityOnboarding() {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleContinue = () => {
    const data = getStillData();
    data.identities = selectedIds.map((id) => {
      const identity = IDENTITY_OPTIONS.find((i) => i.id === id);
      return {
        id,
        label: identity?.label || '',
      };
    });
    setStillData(data);
    router.push('/onboarding/action');
  };

  const maxReached = selectedIds.length >= 3;

  return (
    <main className="min-h-screen p-6 flex items-center">
      <div className="max-w-2xl mx-auto w-full animate-fadeIn">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
            Who do you want to be in 2026?
          </h1>
          <p className="text-gray-400 text-lg">
            Choose up to 3. Fewer works better.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          {IDENTITY_OPTIONS.map((identity, index) => (
            <div key={identity.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-slideInUp">
              <IdentityCard
                identity={identity}
                selected={selectedIds.includes(identity.id)}
                onToggle={handleToggle}
                disabled={maxReached}
              />
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => router.back()}
            className="flex-1 px-8 py-3 rounded-lg border border-gray-700 hover:border-gray-600 hover:bg-gray-800/50 text-white font-semibold transition-all duration-300"
          >
            Back
          </button>
          <button
            onClick={handleContinue}
            disabled={selectedIds.length === 0}
            className="flex-1 px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            Continue
          </button>
        </div>
      </div>
    </main>
  );
}
