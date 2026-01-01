export interface Identity {
  id: string;
  label: string;
  action?: string;
  anchor?: string;
}

export interface StillData {
  version: 'v1';
  identities: Identity[];
  dailyLog: { [date: string]: { [identityId: string]: boolean } };
}

export const IDENTITY_OPTIONS: Identity[] = [
  { id: 'builder', label: 'Builder' },
  { id: 'creator', label: 'Creator' },
  { id: 'learner', label: 'Learner' },
  { id: 'athlete', label: 'Athlete' },
  { id: 'calm_mind', label: 'Calm Mind' },
  { id: 'deep_thinker', label: 'Deep Thinker' },
  { id: 'consistent_professional', label: 'Consistent Professional' },
  { id: 'financially_sharp', label: 'Financially Sharp' },
  { id: 'healthy_human', label: 'Healthy Human' },
  { id: 'minimalist', label: 'Minimalist' },
  { id: 'disciplined_individual', label: 'Disciplined Individual' },
  { id: 'curious_explorer', label: 'Curious Explorer' },
  { id: 'reliable_person', label: 'Reliable Person' },
];

export interface AnchorOption {
  id: string;
  label: string;
}

export const ANCHOR_OPTIONS: AnchorOption[] = [
  { id: 'after_waking_up', label: 'After waking up' },
  { id: 'after_brushing_teeth', label: 'After brushing teeth' },
  { id: 'after_shower', label: 'After shower' },
  { id: 'after_breakfast', label: 'After breakfast' },
  { id: 'after_lunch', label: 'After lunch' },
  { id: 'after_work', label: 'After work' },
  { id: 'before_dinner', label: 'Before dinner' },
  { id: 'after_dinner', label: 'After dinner' },
  { id: 'before_bed', label: 'Before bed' },
  { id: 'right_after_opening_laptop', label: 'Right after opening laptop' },
  { id: 'right_before_opening_phone_in_the_morning', label: 'Right before opening phone in the morning' },
  { id: 'during_commute', label: 'During commute' },
  { id: 'right_after_gym_walk', label: 'Right after gym / walk' },
  { id: 'end_of_workday_shutdown', label: 'End of workday shutdown' },
];
