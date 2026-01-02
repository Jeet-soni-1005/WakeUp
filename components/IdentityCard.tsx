'use client';

import { Identity } from '@/lib/types';
import { Check } from 'lucide-react';

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
        group relative w-full p-5 text-left transition-all duration-300 rounded-lg
        ${selected
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 border border-blue-500 shadow-lg shadow-blue-500/20'
          : 'bg-gray-800/50 border border-gray-700 hover:border-gray-600 hover:bg-gray-800/70'
        }
        ${disabled && !selected ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
        animate-scaleIn
      `}
    >
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-white">{identity.label}</span>
        {selected && (
          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
            <Check className="w-4 h-4 text-purple-600" strokeWidth={3} />
          </div>
        )}
      </div>
    </button>
  );
}
