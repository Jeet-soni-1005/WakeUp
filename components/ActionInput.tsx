'use client';

import { Identity } from '@/lib/types';

interface ActionInputProps {
  identity: Identity;
  value: string;
  onChange: (id: string, action: string) => void;
}

export function ActionInput({ identity, value, onChange }: ActionInputProps) {
  return (
    <div className="mb-8">
      <label className="block mb-2 text-sm font-medium">
        {identity.label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(identity.id, e.target.value)}
        placeholder="Write code for 20 minutes"
        className="w-full p-4 border-2 border-black text-base focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}
