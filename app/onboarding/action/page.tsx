'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ActionInput } from '@/components/ActionInput';
import { getStillData, setStillData } from '@/lib/storage';

export default function ActionOnboarding() {
  const router = useRouter();
  const [actions, setActions] = useState<{ [id: string]: string }>({});
  const [identities, setIdentities] = useState<Array<{ id: string; label: string }>>([]);

  useEffect(() => {
    const data = getStillData();
    if (data.identities.length === 0) {
      router.push('/onboarding/identity');
      return;
    }
    setIdentities(data.identities);

    const initialActions: { [id: string]: string } = {};
    data.identities.forEach((identity) => {
      initialActions[identity.id] = identity.action || '';
    });
    setActions(initialActions);
  }, [router]);

  const handleChange = (id: string, action: string) => {
    setActions((prev) => ({ ...prev, [id]: action }));
  };

  const handleContinue = () => {
    const data = getStillData();
    data.identities = data.identities.map((identity) => ({
      ...identity,
      action: actions[identity.id] || '',
    }));
    setStillData(data);
    router.push('/onboarding/anchor');
  };

  const allFilled = identities.every((identity) => actions[identity.id]?.trim());

  if (identities.length === 0) return null;

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            What proves you're a {identities[0]?.label}?
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            Takes 20 minutes or less.<br />
            Can be done every day.<br />
            Binary: done or not done.
          </p>
        </div>

        <div className="mb-8">
          {identities.map((identity) => (
            <ActionInput
              key={identity.id}
              identity={identity}
              value={actions[identity.id] || ''}
              onChange={handleChange}
            />
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={!allFilled}
          className="w-full p-4 bg-white text-black text-lg font-medium
                    hover:bg-gray-200 transition-colors
                    disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </main>
  );
}
