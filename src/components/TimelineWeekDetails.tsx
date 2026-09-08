import { motion, useReducedMotion } from 'motion/react';
import type { TimelineWeek, ZoneId } from '../rollout-data';
import WarehouseZones from './WarehouseZones';

export default function TimelineWeekDetails({
  week,
  previousZones,
  number,
  headingId,
  animateChanges = false,
}: {
  week: TimelineWeek;
  previousZones: ZoneId[];
  number: number;
  headingId: string;
  animateChanges?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const shouldAnimate = animateChanges && !reduceMotion;
  // One short entrance per changed text block; no delayed exit or panel blur.
  const reveal = {
    initial: shouldAnimate
      ? { opacity: 0.5, filter: 'blur(2px)' }
      : (false as const),
    animate: { opacity: 1, filter: 'blur(0px)' },
    transition: {
      duration: shouldAnimate ? 0.18 : 0,
      ease: 'easeOut' as const,
    },
  };

  return (
    <>
      <motion.h2 {...reveal} id={headingId} className='text-lg font-semibold'>
        Week {number}: {week.title}
      </motion.h2>
      <motion.p {...reveal} className='text-sm leading-6 text-neutral-600'>
        {week.goal}
      </motion.p>
      <div className='timeline-week-content mt-5 grid items-start gap-8'>
        <div className='max-w-[60ch] space-y-8 text-sm'>
          <section>
            <h3 className='font-medium'>Key Actions</h3>
            <motion.ul
              {...reveal}
              className='mt-2 list-inside bg-neutral-50 space-y-4 p-4 rounded-[10px] text-neutral-600 text-sm'
            >
              {week.actions.map(action => (
                <li key={action}>
                  <span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      className='size-3 inline-block mr-1.5 shrink-0 text-[#60734f]'
                    >
                      <path d='M20 6 9 17l-5-5' />
                    </svg>
                  </span>
                  {action}
                </li>
              ))}
            </motion.ul>
          </section>
          <section>
            <h3 className='font-medium'>Training & Support</h3>
            <dl className='mt-2 bg-neutral-50 space-y-6 p-4 rounded-[10px] text-neutral-600'>
              <div>
                <dt className='text-sm font-medium'>Your team</dt>
                <motion.dd
                  {...reveal}
                  className='mt-1 text-xs text-neutral-600'
                >
                  {week.trainingWindow}
                </motion.dd>
              </div>
              <div>
                <dt className='text-sm font-medium'>Implementation support</dt>
                <motion.dd
                  {...reveal}
                  className='mt-1 text-xs text-neutral-600'
                >
                  {week.support}
                </motion.dd>
              </div>
            </dl>
          </section>
        </div>
        <section className='w-full max-w-90 text-sm'>
          <WarehouseZones
            activeZones={week.activeZones}
            previousZones={previousZones}
          />
          <motion.p {...reveal} className='mt-3 leading-6 text-neutral-600'>
            {week.rollout}
          </motion.p>
        </section>
      </div>
      <footer className='mt-6 border-t pt-4 text-sm leading-6'>
        <h3 className='font-medium'>Ready to advance when...</h3>
        <motion.p {...reveal} className='mt-1 text-neutral-600'>
          {week.readiness}
        </motion.p>
      </footer>
    </>
  );
}
