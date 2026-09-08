import {
  ArrowRight,
  Blocks,
  Bookmark,
  Calendar,
  Clock,
  Flag,
  Layers,
  Lightbulb,
  NotebookPen,
  Target,
  Workflow,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ShiftPattern } from '../journey';
import { shifts } from '../rollout-data';

const approaches: Record<ShiftPattern, string> = {
  one: 'Pilot in a low-impact window, then validate with the team.',
  two: 'Pilot on one shift, then validate across both shifts.',
  continuous:
    'Pilot in a controlled zone, validate across all shifts, then go live in stages.',
};

const implementationInsights: Record<ShiftPattern, string> = {
  one: 'The biggest advantage of a single-shift operation is the room it creates for setup and testing outside production hours.',
  two: 'The handoff between shifts is often where differences in workflow surface, so validation needs to include both teams.',
  continuous:
    'Continuous operations leave no natural deployment window, so rollout works best when it’s broken into smaller, controlled moments.',
};

const shiftDescriptions: Record<ShiftPattern, string> = {
  one: 'Use off-hours for setup and testing, with validation built around the operating day.',
  two: 'Pilot with one shift first, then validate with the second before expanding.',
  continuous:
    'Use smaller rollout windows and controlled zones to validate across every shift while operations keep moving.',
};
const operationLabels: Record<ShiftPattern, string> = {
  one: '1 shift operation',
  two: '2 shift operation',
  continuous: '24/7 operation',
};
const shiftTitles: Record<ShiftPattern, string> = {
  one: 'Rollout around your shift',
  two: 'Rollout across both shifts',
  continuous: 'Rollout without stopping operations',
};
const teamReadinessDescriptions: Record<ShiftPattern, string> = {
  one: 'Train operators and leads before go-live so the rollout doesn’t create unnecessary friction.',
  two: 'Prepare both teams for the workflow and make shift handoffs part of validation before go-live.',
  continuous:
    'Prepare each shift in stages so training and adoption can happen without pulling the operation offline.',
};
const cards = [
  {
    icon: Blocks,
    title: 'Phased deployment',
    description: 'Start small, prove value, then scale.',
  },
  { icon: Clock, title: 'Shift considerations' },
  {
    icon: Users,
    title: 'Team Readiness',
    description: 'Upskill operators and leaders with role-based training.',
  },
];

type JourneySummaryProps = {
  shiftPattern: ShiftPattern | null;
  onBack: () => void;
  onContinue: () => void;
};

export default function JourneySummary({
  shiftPattern,
  onBack,
  onContinue,
}: JourneySummaryProps) {
  const shiftDescription = shiftPattern
    ? shiftDescriptions[shiftPattern]
    : 'Align rollout with your shift pattern and operator availability.';
  const selectedShift = shifts.find(shift => shift.value === shiftPattern);
  const notebookEntries = [
    { icon: Target, title: 'Priority', context: 'Minimize downtime' },
    {
      icon: Layers,
      title: 'Operating Pattern',
      context: selectedShift?.label ?? 'Choose your shift pattern',
    },
    {
      icon: Calendar,
      title: 'Rollout Range',
      context: selectedShift
        ? `${selectedShift.estimate[0]} – ${selectedShift.estimate[1]} weeks`
        : 'Choose your shift pattern to see your range',
    },
    {
      icon: Workflow,
      title: 'Approach',
      context: shiftPattern
        ? approaches[shiftPattern]
        : 'Assess, pilot, then scale.',
    },
    {
      icon: Lightbulb,
      title: 'Implementation Insight',
      context: shiftPattern
        ? implementationInsights[shiftPattern]
        : 'Start contained, validate, then expand.',
    },
  ];
  return (
    <div className='mx-auto mt-10 max-w-6xl pb-8 sm:mt-12 sm:pb-10'>
      <div className='grid items-start gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]'>
        <main className='min-w-0'>
          <header>
            <h1 className='text-lg font-semibold tracking-tight'>
              Your recommended approach
            </h1>
            <p className='max-w-xl text-base text-neutral-600'>
              Based on what you've explored and your{' '}
              {shiftPattern ? operationLabels[shiftPattern] : 'operation'}.
            </p>
          </header>
          <div className='mt-8 space-y-4'>
            {cards.map(({ icon: Icon, title, description }, index) => (
              <section
                key={title}
                className='rounded-xl ring-[0.5px] ring-neutral-300 p-4'
              >
                <div className='flex items-center gap-4'>
                  <span className='flex size-6 shrink-0 items-center justify-center rounded-xl bg-[#f0f3ec] text-[#60734f]'>
                    <Icon
                      aria-hidden='true'
                      className='size-6'
                      strokeWidth={1.7}
                    />
                  </span>
                  <div className='min-w-0 flex-1'>
                    <h2 className='font-semibold'>
                      {index === 1 && shiftPattern
                        ? shiftTitles[shiftPattern]
                        : title}
                    </h2>
                    <p className='mt-1 text-sm leading-relaxed text-neutral-600'>
                      {index === 1
                        ? shiftDescription
                        : index === 2 && shiftPattern
                          ? teamReadinessDescriptions[shiftPattern]
                          : description}
                    </p>
                  </div>
                </div>
              </section>
            ))}
            <section className='rounded-xl ring-[0.5px] ring-[#60734f]/30 bg-[#60734f]/5 mt-12 p-4'>
              <div className='flex items-center gap-4'>
                <span className='flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-[#60734f]'>
                  <Flag aria-hidden='true' className='size-4' />
                </span>
                <div className='min-w-0 flex-1'>
                  <small className='uppercase font-semibold text-[10px] text-[#60734f]'>
                    Suggested next step
                  </small>
                  <h2 className='mt-1 font-semibold'>Prepare your team</h2>
                  <p className='mt-1 text-sm leading-relaxed text-neutral-600'>
                    Review a change plan and team readiness checklist together.
                  </p>
                </div>
                <Button onClick={onContinue}>
                  Continue
                  <ArrowRight aria-hidden='true' />
                </Button>
              </div>
            </section>
          </div>
          <nav
            aria-label='Journey navigation'
            className='mt-8 flex flex-wrap gap-3'
          >
            <Button variant='outline' onClick={onBack}>
              Back
            </Button>
          </nav>
        </main>
        <aside className='rounded-[24px] ring-[0.5px] ring-neutral-300 bg-neutral-50 p-4'>
          <div className='flex items-center gap-2'>
            <NotebookPen
              aria-hidden='true'
              className='size-4 text-[#60734f] fill-[#60734f]/15'
            />
            <h2 className='font-semibold'>Evaluation notebook</h2>
          </div>
          <p className='mt-1 text-sm text-neutral-600'>
            Your saved insights from this journey.
          </p>
          <ul className='mt-6 space-y-3'>
            {notebookEntries.map(({ icon: Icon, title, context }) => (
              <li key={title} className='rounded-xl bg-white p-2'>
                <div className='flex items-center gap-3'>
                  <span className='flex size-8 shrink-0 items-center justify-center rounded-full bg-neutral-50 text-[#60734f]'>
                    <Icon
                      aria-hidden='true'
                      className='size-4'
                      strokeWidth={1.8}
                    />
                  </span>
                  <div className='min-w-0 text-xs flex-1'>
                    <p className='font-medium'>{title}</p>
                    <p className='mt-1.5 text-neutral-600'>{context}</p>
                  </div>
                  <Bookmark
                    aria-hidden='true'
                    className='size-4 shrink-0 text-neutral-400'
                  />
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
