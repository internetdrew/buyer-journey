import { useId, useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ShiftPattern } from '../journey';
import { shifts, timelines } from '../rollout-data';
import TimelineWeekDetails from './TimelineWeekDetails';
import './rollout-timeline.css';

type RolloutTimelineProps = {
  shiftPattern: ShiftPattern | null;
  onBack: () => void;
  onContinue: () => void;
};

export default function RolloutTimeline({
  shiftPattern,
  onBack,
  onContinue,
}: RolloutTimelineProps) {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [animateDetails, setAnimateDetails] = useState(false);
  const id = useId();

  if (!shiftPattern) {
    return (
      <section className='mx-auto mt-12 max-w-6xl pb-10'>
        <h1 className='text-xl font-semibold'>Choose your operating pattern</h1>
        <p className='mt-2 text-sm text-neutral-600'>
          Select your shifts to explore a rollout timeline tailored to your
          operation.
        </p>
        <Button onClick={onBack} className='mt-6'>
          Choose operating pattern
        </Button>
      </section>
    );
  }

  const weeks = timelines[shiftPattern];
  const shift = shifts.find(item => item.value === shiftPattern)!;

  return (
    <div className='mx-auto mt-12 max-w-6xl pb-10'>
      <header>
        <h1 className='text-xl font-semibold tracking-tight'>
          Your rollout timeline
        </h1>
        <p className='mt-2 text-sm text-neutral-600'>
          {shift.label} · Typically {shift.estimate[0]}–{shift.estimate[1]}{' '}
          weeks
        </p>
        <p className='mt-2 max-w-2xl text-sm text-neutral-600'>
          {shift.timelineContext}
        </p>
      </header>

      <p className='mt-4 text-xs text-neutral-500'>
        Select any week · Illustrative {weeks.length}-week plan, paced by
        readiness.
      </p>
      <ol
        className='rollout-timeline my-4'
        style={{ '--week-count': weeks.length } as CSSProperties}
      >
        {weeks.map((week, index) => (
          <li key={week.title} className='rollout-timeline-week'>
            <button
              id={`${id}-week-${index}`}
              type='button'
              aria-expanded={selectedWeek === index}
              aria-controls={`${id}-details`}
              className='rollout-timeline-trigger'
              onClick={event => {
                if (index === selectedWeek) return;
                setAnimateDetails(event.detail > 0);
                setSelectedWeek(index);
              }}
            >
              <span aria-hidden='true' className='rollout-timeline-number'>
                {index + 1}
              </span>
              <span>
                <span className='block text-xs font-medium uppercase tracking-wide text-neutral-500'>
                  Week {index + 1}
                </span>
                <span className='mt-1 block text-sm font-medium'>
                  {week.title}
                </span>
              </span>
            </button>
            {selectedWeek === index && (
              <section
                id={`${id}-details`}
                aria-labelledby={`${id}-heading`}
                className='rollout-timeline-details rounded-xl border p-4 sm:p-6'
              >
                <TimelineWeekDetails
                  animateChanges={animateDetails}
                  week={week}
                  previousZones={weeks[index - 1]?.activeZones ?? []}
                  number={index + 1}
                  headingId={`${id}-heading`}
                />
              </section>
            )}
          </li>
        ))}
      </ol>
      <nav
        aria-label='Journey navigation'
        className='mt-6 flex flex-wrap items-center justify-between'
      >
        <Button variant='ghost' onClick={onBack} className='min-h-11'>
          <ArrowLeft aria-hidden='true' />
          Back
        </Button>
        <Button onClick={onContinue} className='min-h-11'>
          See your recommended approach
          <ArrowRight aria-hidden='true' />
        </Button>
      </nav>
    </div>
  );
}
