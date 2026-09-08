import type { ShiftPattern } from './journey';

// Illustrative planning ranges; replace with approved rollout benchmarks.
export const shifts: {
  value: ShiftPattern;
  label: string;
  estimate: [number, number];
  phases: string[];
  context: string;
  timelineContext: string;
}[] = [
  {
    value: 'one',
    label: '1 shift',
    timelineContext: 'Setup outside operating hours, with supervised practice during your shift.',
    estimate: [2, 3],
    phases: [
      'Assess & plan',
      'Pilot during a low-impact window',
      'Validate with the full team',
      'Go live & optimize',
    ],
    context:
      'With one shift, we have more room outside operating hours to set up, test, and train without disrupting the day.',
  },
  {
    value: 'two',
    label: '2 shifts',
    timelineContext: 'Pilot with one team, then repeat training and validation across both shifts.',
    estimate: [3, 4],
    phases: [
      'Assess & plan',
      'Pilot on one shift',
      'Validate across both shifts',
      'Go live & optimize',
    ],
    context:
      "With two shifts, we'd usually prove the workflow with one team first, then validate it across the second before going live.",
  },
  {
    value: 'continuous',
    label: '24/7',
    timelineContext: 'Staggered training across every rotation, with rollout in controlled operating windows.',
    estimate: [4, 6],
    phases: [
      'Map rollout windows',
      'Pilot in a controlled zone',
      'Validate across all shifts',
      'Stage go-live',
      'Optimize & expand',
    ],
    context:
      'For continuous operations, we break rollout into smaller windows so every shift can validate the system without asking the operation to stop.',
  },
];

export type ZoneId = 'A' | 'B' | 'C' | 'D' | 'E';

export type TimelineWeek = {
  title: string;
  goal: string;
  actions: string[];
  trainingWindow: string;
  support: string;
  rollout: string;
  activeZones: ZoneId[];
  readiness: string;
};

// Illustrative sequences at the upper end of the overview's planning ranges.
export const timelines: Record<ShiftPattern, TimelineWeek[]> = {
  one: [
    {
      title: 'Foundation & setup',
      goal: 'Prepare the site and agree on a low-impact rollout window.',
      actions: ['Map workflows and access routes', 'Confirm integration and site requirements', 'Agree on pilot success criteria'],
      trainingWindow: 'Supervisor orientation before or after the operating shift.',
      support: 'Implementation specialists guide site preparation and setup.',
      rollout: 'Survey all zones; keep deployment inactive while the team prepares.',
      activeZones: [],
      readiness: 'Site requirements, operator availability, and success criteria are agreed.',
    },
    {
      title: 'Pilot & team validation',
      goal: 'Prove the workflow in one zone with the full operating team.',
      actions: ['Run end-to-end task flows', 'Validate navigation and task accuracy', 'Confirm integrations and operator readiness'],
      trainingWindow: 'Setup outside operating hours, followed by supervised practice during the shift.',
      support: 'On-site pilot support with remote monitoring.',
      rollout: 'Start in Zone B with trained operators and agreed workflows.',
      activeZones: ['B'],
      readiness: 'The operating team has validated the pilot workflow and knows how to handle exceptions.',
    },
    {
      title: 'Go live, optimize & handoff',
      goal: 'Expand validated workflows and prepare the team to own daily operation.',
      actions: ['Release additional zones after readiness checks', 'Review performance with operators', 'Practice escalation and transfer operating guidance'],
      trainingWindow: 'Short refresher sessions around shift start or finish.',
      support: 'Supported go-live followed by an agreed remote support handoff.',
      rollout: 'Expand from B through A, C, and D to E as each zone meets readiness criteria.',
      activeZones: ['A', 'B', 'C', 'D', 'E'],
      readiness: 'The team can run daily checks and use the agreed support process.',
    },
  ],
  two: [
    {
      title: 'Foundation',
      goal: 'Plan deployment around both teams and their handover window.',
      actions: ['Map work across both shifts', 'Confirm integrations and pilot criteria', 'Choose shift champions and handover owners'],
      trainingWindow: 'Repeat supervisor orientation for each shift.',
      support: 'Implementation specialists coordinate with both shift leads.',
      rollout: 'Survey the site and prepare Zone B without activating deployment.',
      activeZones: [],
      readiness: 'Both shift leads agree on the work window and handover owners.',
    },
    {
      title: 'Pilot on first shift',
      goal: 'Prove reliability with one team before introducing the second.',
      actions: ['Run controlled task flows', 'Validate navigation and task accuracy', 'Document results and open issues for handover'],
      trainingWindow: 'Supervised practice on the pilot shift, with a briefing for the second shift.',
      support: 'On-site support during pilot windows and remote review between shifts.',
      rollout: 'Limit operation to Zone B and the trained pilot team.',
      activeZones: ['B'],
      readiness: 'Pilot results meet the agreed criteria and handover guidance is ready.',
    },
    {
      title: 'Validate second shift & expand',
      goal: 'Confirm the workflow works for both teams before expanding coverage.',
      actions: ['Repeat validation with the second shift', 'Rehearse shift handovers and escalation', 'Approve the next zone using results from both teams'],
      trainingWindow: 'Repeat hands-on sessions for the second shift and practice the shared handover.',
      support: 'Support spans both shift windows with a shared issue log.',
      rollout: 'Keep B active and introduce A once both teams are ready.',
      activeZones: ['A', 'B'],
      readiness: 'Both teams have validated the workflow and practiced handovers.',
    },
    {
      title: 'Go live, optimize & handoff',
      goal: 'Scale across both shifts with clear ownership and consistent performance.',
      actions: ['Release remaining zones in stages', 'Compare results across shifts', 'Transfer daily checks and escalation guidance to both leads'],
      trainingWindow: 'Refresher sessions on each shift and a joint lead handover.',
      support: 'Supported expansion followed by agreed remote monitoring.',
      rollout: 'Expand into C, D, and E after readiness checks across both shifts.',
      activeZones: ['A', 'B', 'C', 'D', 'E'],
      readiness: 'Both shift leads confirm readiness and support ownership.',
    },
  ],
  continuous: [
    {
      title: 'Foundation',
      goal: 'Find controlled rollout windows while production keeps moving.',
      actions: ['Map workflows and shift overlaps', 'Agree on controlled work areas and fallback procedures', 'Define success criteria with every shift lead'],
      trainingWindow: 'Staggered lead briefings across all shift rotations.',
      support: 'Implementation specialists coordinate access and support windows with shift leads.',
      rollout: 'Survey all zones and prepare an isolated pilot area; no active deployment yet.',
      activeZones: [],
      readiness: 'Every shift lead agrees on controlled windows and fallback procedures.',
    },
    {
      title: 'Pilot & validate',
      goal: 'Prove reliability in a controlled area and refine workflows.',
      actions: ['Run end-to-end task flows', 'Validate navigation and task accuracy', 'Confirm system integrations and fallback procedures'],
      trainingWindow: 'Small-group practice in agreed pilot windows, repeated for rotating teams.',
      support: 'On-site support during planned pilot windows plus remote monitoring.',
      rollout: 'Start in Zone B, limited to trained operators and approved workflows.',
      activeZones: ['B'],
      readiness: 'Pilot results meet the agreed criteria and participating operators are ready.',
    },
    {
      title: 'Expand zone',
      goal: 'Extend the proven workflow without disrupting neighboring operations.',
      actions: ['Review pilot results with shift leads', 'Validate routes into the next zone', 'Check handovers between trained teams'],
      trainingWindow: 'Staggered zone-specific practice during shift overlaps.',
      support: 'Supported zone activation with remote review of each shift’s results.',
      rollout: 'Keep B active and introduce A in controlled windows.',
      activeZones: ['A', 'B'],
      readiness: 'The new routes and handovers have been validated in both active zones.',
    },
    {
      title: 'Scale across shifts',
      goal: 'Validate consistent operation across all shift rotations.',
      actions: ['Repeat readiness checks on every shift', 'Introduce additional zones in stages', 'Rehearse escalation and recovery at handover'],
      trainingWindow: 'Repeat practical sessions for every rotation without a site-wide training stop.',
      support: 'Coordinate support with scheduled activation windows and shift handovers.',
      rollout: 'Add C and D after each team demonstrates readiness.',
      activeZones: ['A', 'B', 'C', 'D'],
      readiness: 'Every rotation has validated the workflow and escalation process.',
    },
    {
      title: 'Optimize',
      goal: 'Improve performance and complete the remaining zone rollout.',
      actions: ['Compare task accuracy and throughput across shifts', 'Resolve recurring exceptions', 'Validate the final zone before activation'],
      trainingWindow: 'Targeted refreshers for each team using observed exceptions.',
      support: 'Remote performance review with targeted implementation support.',
      rollout: 'Bring E online when validated, completing the illustrative zone footprint.',
      activeZones: ['A', 'B', 'C', 'D', 'E'],
      readiness: 'The final zone is validated and recurring exceptions are resolved.',
    },
    {
      title: 'Handoff & iterate',
      goal: 'Transfer daily ownership and agree on ongoing improvements.',
      actions: ['Confirm each shift’s operating owner', 'Practice support escalation and routine checks', 'Agree on a review cadence and improvement backlog'],
      trainingWindow: 'Handoff sessions repeated for all leads and shift champions.',
      support: 'Transition to the agreed support model with documented owners and contacts.',
      rollout: 'Maintain validated coverage across all zones and review changes before further expansion.',
      activeZones: ['A', 'B', 'C', 'D', 'E'],
      readiness: 'Every shift has an operating owner and the support process is agreed.',
    },
  ],
};
