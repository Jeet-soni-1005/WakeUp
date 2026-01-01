# STILL

An identity-based daily action system. No motivation, no streaks, no gamification.

## Philosophy

You don't need more motivation. You need a system.

## Tech Stack

- Next.js 13 (App Router)
- TypeScript
- Tailwind CSS
- LocalStorage only (no backend, no auth)

## Data Structure

All data is stored in LocalStorage under the key `still_data` with the following schema:

```typescript
{
  version: "v1",
  identities: Identity[],
  dailyLog: { [date: string]: { [identityId: string]: boolean } }
}
```

## Export Utility

For future migration when authentication is added, you can export all LocalStorage data:

**In Browser Console:**
```javascript
// Open browser console and run:
const data = JSON.parse(localStorage.getItem('still_data'));
console.log(JSON.stringify(data, null, 2));
```

Or use the built-in export function from storage.ts:
```typescript
import { exportStillData } from '@/lib/storage';
const jsonData = exportStillData();
```

## Deployment

```bash
npm run build
# Deploy to Vercel, Netlify, or any static host
```

## Hard-Coded Design Choices

1. **Identities**: 13 pre-defined options, max 3 selections
2. **Anchors**: 14 pre-defined time anchors
3. **No customization**: Users work within the system, not around it
4. **Black & white only**: No colors, no distractions
5. **No history view**: Focus is on today, not the past

## File Structure

```
/app
  /page.tsx                    # Welcome screen
  /onboarding/identity/        # Identity selection
  /onboarding/action/          # Action definition
  /onboarding/anchor/          # Time anchor selection
  /today/                      # Daily checklist
/lib
  storage.ts                   # LocalStorage utilities
  types.ts                     # TypeScript types & constants
  date.ts                      # Date formatting
/components
  IdentityCard.tsx             # Selectable identity cards
  ActionInput.tsx              # Action input fields
  ChecklistItem.tsx            # Today page checklist items
```

## Design Principles

- Radical simplicity
- Mobile-first
- No streaks or analytics
- Focus on identity, not goals
- Action over motivation
