'use client';

import { Identity } from '@/lib/types';

interface IdentityCardProps {
  identity: Identity;
  selected: boolean;
  onToggle: (id: string) => void;
  disabled?: boolean;
}

export function IdentityCard({ identity, selected, onToggle, disabled }: IdentityCardProps) {
  return (
    <button
      onClick={() => onToggle(identity.id)}
      disabled={disabled && !selected}
      className={`
        w-full p-6 border-2 text-left transition-all
        ${selected
          ? 'border-green-600 bg-green-600 text-white'
          : 'border-gray-700 bg-gray-900 text-white hover:bg-gray-800'
        }
        ${disabled && !selected ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <span className="text-lg font-medium">{identity.label}</span>
    </button>
  );
}
