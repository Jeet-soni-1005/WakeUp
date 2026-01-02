'use client';

import { Identity, ANCHOR_OPTIONS } from '@/lib/types';
import { ChevronDown } from 'lucide-react';

interface ActionInputProps {
  identity: Identity;
  action: string;
  anchor: string;
  onActionChange: (id: string, action: string) => void;
  onAnchorChange: (id: string, anchor: string) => void;
}

export function ActionInput({ identity, action, anchor, onActionChange, onAnchorChange }: ActionInputProps) {
  return (
    <div className="mb-8 p-5 rounded-lg bg-gray-800/50 border border-gray-700 animate-slideInUp">
      <label className="block mb-3 text-lg font-semibold text-white">
        {identity.label}
      </label>

      <input
        type="text"
        value={action}
        onChange={(e) => onActionChange(identity.id, e.target.value)}
        placeholder="Write code for 20 minutes"
        className="w-full mb-4 p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />

      <div className="relative">
        <select
          value={anchor}
          onChange={(e) => onAnchorChange(identity.id, e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
        >
          <option value="">When does this happen?</option>
          {ANCHOR_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}
