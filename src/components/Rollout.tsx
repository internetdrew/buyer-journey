import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimateNumber } from 'motion-plus/react';

import type { ShiftPattern } from '../journey';

// Illustrative planning ranges; replace with approved rollout benchmarks.
const shifts: {
  value: ShiftPattern;
  label: string;
  estimate: [number, number];
  phases: string[];
  context: string;
}[] = [
  {
    value: 'one',
    label: '1 shift',
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

type RolloutProps = {
  shiftPattern: ShiftPattern | null;
  onSelect: (shiftPattern: ShiftPattern) => void;
  onBack: () => void;
  onContinue: () => void;
};

export default function Rollout({
  shiftPattern,
  onSelect,
  onBack,
  onContinue,
}: RolloutProps) {
  const activeShift = shiftPattern ?? 'one';
  const selectedShift = shifts.find(shift => shift.value === activeShift)!;
  const reduceMotion = useReducedMotion();
  const [pointerNavigation, setPointerNavigation] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const phasesRef = useRef<HTMLOListElement>(null);
  const [heights, setHeights] = useState<{
    phases: number;
    content: number;
  } | null>(null);

  useEffect(() => {
    const content = contentRef.current;
    const phases = phasesRef.current;
    const phasesContainer = phases?.parentElement;
    if (!content || !phases || !phasesContainer) return;

    const measure = () => {
      const phasesHeight = phases.getBoundingClientRect().height;
      // Remove the inset's animated height to measure the card's final size.
      const contentHeight =
        content.getBoundingClientRect().height +
        phasesHeight -
        phasesContainer.getBoundingClientRect().height;
      const next = {
        phases: Math.round(phasesHeight * 64) / 64,
        content: Math.round(contentHeight * 64) / 64,
      };
      setHeights(previous =>
        previous?.phases === next.phases && previous.content === next.content
          ? previous
          : next,
      );
    };

    // One observer and state update give both springs their targets together.
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    observer.observe(phases);
    measure();
    return () => observer.disconnect();
  }, []);

  const heightTransition =
    reduceMotion || !pointerNavigation
      ? { duration: 0 }
      : { type: 'spring' as const, duration: 0.25, bounce: 0 };

  const textTransition = {
    initial:
      reduceMotion || !pointerNavigation ? (false as const) : { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration: reduceMotion || !pointerNavigation ? 0 : 0.16,
      ease: 'easeOut' as const,
    },
  };

  return (
    <div className='mx-auto mt-12 max-w-lg pb-12 sm:mt-16'>
      <header>
        <h1 className='text-xl font-semibold tracking-tight'>
          See how rollout changes with your operation
        </h1>
        <p className='mt-2 text-sm text-muted-foreground'>
          Choose your operating pattern to see how Base Robotics would typically
          phase deployment while keeping disruption low.
        </p>
      </header>
      <Tabs
        value={activeShift}
        onValueChange={value => {
          if (value === 'one' || value === 'two' || value === 'continuous')
            onSelect(value);
        }}
        className='mt-6 gap-4'
      >
        <TabsList
          onPointerDownCapture={() => setPointerNavigation(true)}
          onKeyDownCapture={() => setPointerNavigation(false)}
          aria-label='Compare rollout by operating shifts'
          className='w-full'
        >
          {shifts.map(({ value, label }) => (
            <TabsTrigger
              key={value}
              value={value}
              className='flex-1 focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#647650]'
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        <Card className='gap-0 rounded-(--rollout-radius) py-0 [--rollout-radius:calc(var(--card-spacing)+8px)] [--card-spacing:--spacing(5)] sm:[--card-spacing:--spacing(6)]'>
          <motion.div
            initial={false}
            animate={{ height: heights?.content ?? 'auto' }}
            transition={heightTransition}
            className='overflow-hidden'
          >
            <div ref={contentRef} className='flow-root'>
              <CardHeader className='pt-(--card-spacing)'>
                <p className='text-xs text-muted-foreground'>
                  Typical rollout range
                </p>
                <h2
                  aria-label={`${selectedShift.estimate[0]}–${selectedShift.estimate[1]} weeks`}
                  className='mt-2 flex items-baseline gap-2.5 text-neutral-900'
                >
                  <span
                    aria-hidden='true'
                    className='inline-flex items-baseline text-3xl font-normal tracking-tight'
                  >
                    {reduceMotion ? (
                      selectedShift.estimate[0]
                    ) : (
                      <AnimateNumber
                        trend={1}
                        transition={{
                          type: 'spring',
                          duration: 0.35,
                          bounce: 0,
                        }}
                      >
                        {selectedShift.estimate[0]}
                      </AnimateNumber>
                    )}
                    <span> - </span>
                    {reduceMotion ? (
                      selectedShift.estimate[1]
                    ) : (
                      <AnimateNumber
                        trend={-1}
                        transition={{
                          type: 'spring',
                          duration: 0.35,
                          bounce: 0,
                        }}
                      >
                        {selectedShift.estimate[1]}
                      </AnimateNumber>
                    )}
                  </span>
                  <span
                    aria-hidden='true'
                    className='text-lg font-normal text-neutral-500'
                  >
                    weeks
                  </span>
                </h2>
              </CardHeader>
              <TabsContent
                value={activeShift}
                className='flex flex-col gap-(--card-spacing) py-(--card-spacing)'
              >
                <CardContent>
                  <motion.p
                    key={activeShift}
                    {...textTransition}
                    className='max-w-lg text-sm mb-8 leading-6 text-neutral-600'
                  >
                    {selectedShift.context}
                  </motion.p>
                  <div className='mt-4' aria-label='Typical rollout phases'>
                    <p className='mb-3 text-xs font-medium text-neutral-600'>
                      How we'd approach it
                    </p>
                    <motion.div
                      initial={false}
                      animate={{ height: heights?.phases ?? 'auto' }}
                      transition={heightTransition}
                      className='overflow-hidden rounded-[calc(var(--rollout-radius)-var(--card-spacing))] ring-[0.5px] ring-neutral-300/50 bg-neutral-50'
                    >
                      <ol ref={phasesRef} className='flex flex-col gap-5 p-4'>
                        {selectedShift.phases.map((label, index) => (
                          <li
                            key={label}
                            className='flex items-center gap-2 text-sm leading-6 text-neutral-600'
                          >
                            <span
                              aria-hidden='true'
                              className='flex size-4.5 shrink-0 items-center justify-center rounded-full bg-neutral-600 text-xs font-medium text-white'
                            >
                              {index + 1}
                            </span>
                            <span>{label}</span>
                          </li>
                        ))}
                      </ol>
                    </motion.div>
                    {/* <motion.p
                      key={activeShift}
                      {...textTransition}
                      className='mt-3 text-xs leading-5 text-neutral-600'
                    >
                      {selectedShift.validation}
                    </motion.p> */}
                  </div>
                </CardContent>
              </TabsContent>
            </div>
          </motion.div>
        </Card>
      </Tabs>
      <div className='mt-6 flex flex-wrap items-center justify-between gap-3'>
        <Button variant='ghost' onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={() => {
            if (shiftPattern === null) onSelect(activeShift);
            onContinue();
          }}
        >
          Hear from an Implementation Engineer
          <ArrowRight aria-hidden='true' />
        </Button>
      </div>
    </div>
  );
}
