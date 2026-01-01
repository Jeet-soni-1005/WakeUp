'use client';

import { Identity } from '@/lib/types';
import { Check } from 'lucide-react';

interface ChecklistItemProps {
  identity: Identity;
  completed: boolean;
  onToggle: (id: string) => void;
  showConfirmation: boolean;
}

export function ChecklistItem({ identity, completed, onToggle, showConfirmation }: ChecklistItemProps) {
  return (
    <div className="mb-6">
      <button
        onClick={() => onToggle(identity.id)}
        className="w-full flex items-start gap-4 text-left group"
      >
        <div
          className={`
            flex-shrink-0 w-8 h-8 border-2 border-black flex items-center justify-center transition-all mt-1
            ${completed ? 'bg-black' : 'bg-white group-hover:bg-gray-50'}
          `}
        >
          {completed && <Check className="w-5 h-5 text-white" strokeWidth={3} />}
        </div>
        <div className="flex-1">
          <div className="text-xl font-medium mb-1">{identity.label}</div>
          {identity.action && (
            <div className="text-sm text-gray-600">{identity.action}</div>
          )}
        </div>
      </button>
      {showConfirmation && (
        <div className="mt-3 ml-12 text-sm text-black">
          You acted like a {identity.label} today.
        </div>
      )}
    </div>
  );
}
