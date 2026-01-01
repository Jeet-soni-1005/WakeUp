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
    <main className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Who do you want to be in 2026?
          </h1>
          <p className="text-muted-foreground">
            Choose up to 3. Fewer works better.
          </p>
        </div>

        <div className="space-y-3 mb-8">
          {IDENTITY_OPTIONS.map((identity) => (
            <IdentityCard
              key={identity.id}
              identity={identity}
              selected={selectedIds.includes(identity.id)}
              onToggle={handleToggle}
              disabled={maxReached}
            />
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={selectedIds.length === 0}
          className="w-full p-4 bg-primary text-primary-foreground text-lg font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </main>
  );
}
