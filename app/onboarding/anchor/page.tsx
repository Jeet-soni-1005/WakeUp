'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getStillData, setStillData } from '@/lib/storage';
import { ANCHOR_OPTIONS } from '@/lib/types';

export default function AnchorOnboarding() {
  const router = useRouter();
  const [anchors, setAnchors] = useState<{ [id: string]: string }>({});
  const [identities, setIdentities] = useState<Array<{ id: string; label: string }>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const data = getStillData();
    if (data.identities.length === 0) {
      router.push('/onboarding/identity');
      return;
    }
    setIdentities(data.identities);

    const initialAnchors: { [id: string]: string } = {};
    data.identities.forEach((identity) => {
      initialAnchors[identity.id] = identity.anchor || '';
    });
    setAnchors(initialAnchors);
  }, [router]);

  const handleSelectAnchor = (anchorId: string) => {
    const currentIdentity = identities[currentIndex];
    setAnchors((prev) => ({ ...prev, [currentIdentity.id]: anchorId }));

    if (currentIndex < identities.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const data = getStillData();
      data.identities = data.identities.map((identity) => ({
        ...identity,
        anchor:
          anchors[identity.id] === anchorId && identity.id === currentIdentity.id
            ? anchorId
            : anchors[identity.id] || '',
      }));
      data.identities[currentIndex].anchor = anchorId;
      setStillData(data);
      router.push('/today');
    }
  };

  if (identities.length === 0) return null;

  const currentIdentity = identities[currentIndex];

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            When does this happen?
          </h1>
          <p className="text-gray-400 mb-4">
            Attach it to something you already do.
          </p>
          <p className="text-lg font-medium">
            {currentIdentity?.label}
          </p>
        </div>

        <div className="space-y-3">
          {ANCHOR_OPTIONS.map((anchor) => (
            <button
              key={anchor.id}
              onClick={() => handleSelectAnchor(anchor.id)}
              className="
                w-full p-4 text-left
                border-2 border-gray-700
                bg-gray-900 text-white
                hover:bg-gray-800
                transition-colors
              "
            >
              {anchor.label}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
