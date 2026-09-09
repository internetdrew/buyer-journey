import type { ShiftPattern } from './journey';

export const approaches: Record<ShiftPattern, string> = {
  one: 'Pilot in a low-impact window, then validate with the team.',
  two: 'Pilot on one shift, then validate across both shifts.',
  continuous:
    'Pilot in a controlled zone, validate across all shifts, then go live in stages.',
};

export const implementationInsights: Record<ShiftPattern, string> = {
  one: 'The biggest advantage of a single-shift operation is the room it creates for setup and testing outside production hours.',
  two: 'The handoff between shifts is often where differences in workflow surface, so validation needs to include both teams.',
  continuous:
    'Continuous operations leave no natural deployment window, so rollout works best when it’s broken into smaller, controlled moments.',
};

