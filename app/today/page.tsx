'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChecklistItem } from '@/components/ChecklistItem';
import { getStillData, setStillData } from '@/lib/storage';
import { getTodayKey } from '@/lib/date';
import { Identity } from '@/lib/types';

export default function TodayPage() {
  const router = useRouter();
  const [identities, setIdentities] = useState<Identity[]>([]);
  const [completions, setCompletions] = useState<{ [id: string]: boolean }>({});
  const [justCompleted, setJustCompleted] = useState<string | null>(null);

  useEffect(() => {
    const data = getStillData();
    if (data.identities.length === 0) {
      router.push('/');
      return;
    }

    setIdentities(data.identities);

    const today = getTodayKey();
    const todayLog = data.dailyLog[today] || {};
    setCompletions(todayLog);
  }, [router]);

  const handleToggle = (id: string) => {
    const data = getStillData();
    const today = getTodayKey();

    if (!data.dailyLog[today]) {
      data.dailyLog[today] = {};
    }

    const newValue = !data.dailyLog[today][id];
    data.dailyLog[today][id] = newValue;

    setStillData(data);
    setCompletions({ ...data.dailyLog[today] });

    if (newValue) {
      setJustCompleted(id);
      setTimeout(() => setJustCompleted(null), 3000);
    } else {
      setJustCompleted(null);
    }
  };

  if (identities.length === 0) return null;

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-12">TODAY</h1>

        <div className="space-y-3">
          {identities.map((identity) => (
            <ChecklistItem
              key={identity.id}
              identity={identity}
              completed={completions[identity.id] || false}
              onToggle={handleToggle}
              showConfirmation={justCompleted === identity.id}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
