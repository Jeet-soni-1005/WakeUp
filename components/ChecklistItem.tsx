'use client';

import { Identity } from '@/lib/types';
import { Check, Sparkles } from 'lucide-react';

interface ChecklistItemProps {
  identity: Identity;
  completed: boolean;
  onToggle: (id: string) => void;
  showConfirmation: boolean;
  anchorLabel?: string;
  celebrationKey?: string | null;
}

export function ChecklistItem({
  identity,
  completed,
  onToggle,
  showConfirmation,
  anchorLabel,
  celebrationKey,
}: ChecklistItemProps) {
  return (
    <div className="mb-8 relative">
      <button
        onClick={() => onToggle(identity.id)}
        className={`
          w-full flex items-start gap-4 text-left transition-all duration-300 p-5 rounded-lg
          ${completed
            ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30'
            : 'bg-gray-800/30 border border-gray-700/50 hover:border-gray-600 hover:bg-gray-800/50'
          }
        `}
      >
        <div
          className={`
            flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all mt-1
            ${completed
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-blue-400 animate-checkBounce'
              : 'border-gray-600 group-hover:border-gray-500'
            }
          `}
        >
          {completed && <Check className="w-5 h-5 text-white" strokeWidth={3} />}
        </div>
        <div className="flex-1">
          <div className="text-lg font-semibold text-white mb-1">{identity.label}</div>
          {identity.action && anchorLabel && (
            <div className="text-sm text-gray-400">
              {identity.action} — {anchorLabel}
            </div>
          )}
          {identity.action && !anchorLabel && (
            <div className="text-sm text-gray-400">{identity.action}</div>
          )}
        </div>
      </button>

      {celebrationKey && completed && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Sparkles className="w-8 h-8 text-yellow-400 animate-celebratePopup" />
          </div>
          <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 delay-100">
            <Sparkles className="w-6 h-6 text-blue-400 animate-celebratePopup" style={{ animationDelay: '100ms' }} />
          </div>
          <div className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2">
            <Sparkles className="w-6 h-6 text-purple-400 animate-celebratePopup" style={{ animationDelay: '200ms' }} />
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="mt-4 text-center">
          <p className="text-base text-blue-400 font-medium animate-slideInUp">
            Excellent! You're a {identity.label}
          </p>
        </div>
      )}
    </div>
  );
}
