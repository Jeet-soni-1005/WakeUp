import { StillData } from './types';

const STORAGE_KEY = 'still_data';

const defaultData: StillData = {
  version: 'v1',
  identities: [],
  dailyLog: {},
};

export function getStillData(): StillData {
  if (typeof window === 'undefined') return defaultData;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultData;

    const parsed = JSON.parse(stored);
    if (parsed.version !== 'v1') return defaultData;

    return parsed;
  } catch {
    return defaultData;
  }
}

export function setStillData(data: StillData): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save data', error);
  }
}

export function exportStillData(): string {
  const data = getStillData();
  return JSON.stringify(data, null, 2);
}
