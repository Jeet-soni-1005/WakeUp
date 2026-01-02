'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ActionInput } from '@/components/ActionInput';
import { getStillData, setStillData } from '@/lib/storage';

export default function ActionOnboarding() {
  const router = useRouter();
  const [actions, setActions] = useState<{ [id: string]: string }>({});
  const [anchors, setAnchors] = useState<{ [id: string]: string }>({});
  const [identities, setIdentities] = useState<Array<{ id: string; label: string }>>([]);

  useEffect(() => {
    const data = getStillData();
    if (data.identities.length === 0) {
      router.push('/onboarding/identity');
      return;
    }
    setIdentities(data.identities);

    const initialActions: { [id: string]: string } = {};
    const initialAnchors: { [id: string]: string } = {};
    data.identities.forEach((identity) => {
      initialActions[identity.id] = identity.action || '';
      initialAnchors[identity.id] = identity.anchor || '';
    });
    setActions(initialActions);
    setAnchors(initialAnchors);
  }, [router]);

  const handleActionChange = (id: string, action: string) => {
    setActions((prev) => ({ ...prev, [id]: action }));
  };

  const handleAnchorChange = (id: string, anchor: string) => {
    setAnchors((prev) => ({ ...prev, [id]: anchor }));
  };

  const handleContinue = () => {
    const data = getStillData();
    data.identities = data.identities.map((identity) => ({
      ...identity,
      action: actions[identity.id] || '',
      anchor: anchors[identity.id] || '',
    }));
    setStillData(data);
    router.push('/today');
  };

  const allFilled = identities.every(
    (identity) => actions[identity.id]?.trim() && anchors[identity.id]
  );

  if (identities.length === 0) return null;

  return (
    <main className="min-h-screen p-6 flex items-center">
      <div className="max-w-2xl mx-auto w-full animate-fadeIn">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
            Define your actions
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            Be honest while writing!<br/>Action should take 20 minutes or less | Can be done everyday. 
          </p>
        </div>

        <div className="mb-8">
          {identities.map((identity, index) => (
            <div key={identity.id} style={{ animationDelay: `${index * 100}ms` }}>
              <ActionInput
                identity={identity}
                action={actions[identity.id] || ''}
                anchor={anchors[identity.id] || ''}
                onActionChange={handleActionChange}
                onAnchorChange={handleAnchorChange}
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
            disabled={!allFilled}
            className="flex-1 px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            Go to Today
          </button>
        </div>
      </div>
    </main>
  );
}
