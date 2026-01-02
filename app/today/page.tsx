'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChecklistItem } from '@/components/ChecklistItem';
import { getStillData, setStillData } from '@/lib/storage';
import { getTodayKey } from '@/lib/date';
import { Identity, ANCHOR_OPTIONS } from '@/lib/types';

export default function TodayPage() {
  const router = useRouter();
  const [identities, setIdentities] = useState<Identity[]>([]);
  const [completions, setCompletions] = useState<{ [id: string]: boolean }>({});
  const [justCompleted, setJustCompleted] = useState<string | null>(null);
  const [celebrationKey, setCelebrationKey] = useState<string | null>(null);

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
      setCelebrationKey(`${id}-${Date.now()}`);
      setTimeout(() => setJustCompleted(null), 1500);
    } else {
      setJustCompleted(null);
      setCelebrationKey(null);
    }
  };

  const getAnchorLabel = (anchorId: string | undefined) => {
    if (!anchorId) return '';
    const anchor = ANCHOR_OPTIONS.find((a) => a.id === anchorId);
    return anchor?.label || '';
  };

  const completedIdentities = identities.filter((id) => completions[id.id]);

  if (identities.length === 0) return null;

  return (
    <main className="min-h-screen p-6 flex flex-col">
      <div className="max-w-2xl mx-auto w-full animate-fadeIn">
        <h1 className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          TODAY
        </h1>
        <p className="text-gray-400 mb-12 text-lg">
          Make it count
        </p>

        <div className="mb-12">
          {identities.map((identity, index) => (
            <div key={identity.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-slideInUp">
              <ChecklistItem
                identity={identity}
                completed={completions[identity.id] || false}
                onToggle={handleToggle}
                showConfirmation={justCompleted === identity.id}
                anchorLabel={getAnchorLabel(identity.anchor)}
                celebrationKey={celebrationKey === `${identity.id}-${Date.now()}` ? celebrationKey : null}
              />
            </div>
          ))}
        </div>

        {completedIdentities.length > 0 && (
          <div className="mt-12 p-6 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 animate-slideInUp">
            <h2 className="text-xl font-semibold mb-4 text-white">
              How did I act today
            </h2>
            <div className="space-y-2">
              {completedIdentities.map((identity) => (
                <div
                  key={identity.id}
                  className="text-gray-300 text-lg animate-slideInLeft"
                  style={{ animationDelay: '100ms' }}
                >
                  You acted like a <span className="text-blue-400 font-semibold">{identity.label}</span> today.
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
