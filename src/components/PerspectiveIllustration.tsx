import { useEffect, useId, useRef } from 'react';
import { motion, useAnimationControls, useReducedMotion } from 'motion/react';
import type { Interest } from '../journey';

/* ANIMATION STORYBOARD
 *    0ms   belt and package travel at the same constant speed
 * 3000ms   package leaves with forward momentum and accelerates downward
 * 3500ms   replacement starts above the loading position
 * ~3940ms replacement impacts, rebounds 4px, then makes a smaller bounce
 * ~4200ms contact shadow and slight rocking settle; scene rests
 */
const TIMING = { travel: 3, exit: 0.5 };
const BELT = { spacing: 14, slope: 70 / 209, distance: 168, seamCount: 34 };
const PHYSICS = {
  gravity: 1500, // SVG units per second squared.
  rebound: 4, // A loaded carton has very little restitution.
  secondRebound: 0.3,
  landingTilt: 1.6,
  samples: 32,
  rockSpring: {
    type: 'spring' as const,
    stiffness: 700,
    damping: 24,
    mass: 0.5,
  },
};
const PACKAGE = {
  beltCenterOffset: 9,
  startX: -68,
  endX: 100,
  aboveY: -170,
  loading: `translate(-68px, ${-68 * BELT.slope}px)`,
  end: `translate(100px, ${100 * BELT.slope}px)`,
  above: 'translate(-68px, -170px)',
};
const SHADOW = {
  contactOpacity: 0.16,
  airborneOpacity: 0.035,
  contact: 'scale(1)',
  airborne: 'scale(1.35)',
};
const loadingY = PACKAGE.startX * BELT.slope;
const fallDuration = Math.sqrt(
  (2 * (loadingY - PACKAGE.aboveY)) / PHYSICS.gravity,
);
const firstBounceDuration =
  2 * Math.sqrt((2 * PHYSICS.rebound) / PHYSICS.gravity);
const secondBounceDuration =
  2 * Math.sqrt((2 * PHYSICS.secondRebound) / PHYSICS.gravity);
const sample = (duration: number, frame: (time: number) => string) =>
  Array.from({ length: PHYSICS.samples + 1 }, (_, i) =>
    frame((duration * i) / PHYSICS.samples),
  );
const exitFrames = sample(TIMING.exit, time => {
  const forward = (BELT.distance / TIMING.travel) * time;
  return `translate(${PACKAGE.endX + forward}px, ${PACKAGE.endX * BELT.slope + forward * BELT.slope + 0.5 * PHYSICS.gravity * time * time}px)`;
});
const landingFrames = sample(
  fallDuration,
  time =>
    `translate(${PACKAGE.startX}px, ${PACKAGE.aboveY + 0.5 * PHYSICS.gravity * time * time}px)`,
);
const bounceFrames = sample(
  firstBounceDuration + secondBounceDuration,
  time => {
    const first = time <= firstBounceDuration;
    const localTime = first ? time : time - firstBounceDuration;
    const velocity = Math.sqrt(
      2 * PHYSICS.gravity * (first ? PHYSICS.rebound : PHYSICS.secondRebound),
    );
    const height = Math.max(
      0,
      velocity * localTime - 0.5 * PHYSICS.gravity * localTime * localTime,
    );
    return `translate(${PACKAGE.startX}px, ${loadingY - height}px)`;
  },
);

export default function PerspectiveIllustration({
  perspective,
  active,
}: {
  perspective: Interest;
  active: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const clipId = useId();
  const beltClipId = `${clipId}-belt`;
  const floorShadowId = `${clipId}-floor-shadow`;
  const packageControls = useAnimationControls();
  const beltControls = useAnimationControls();
  const rockControls = useAnimationControls();
  const shadowControls = useAnimationControls();
  const shadowAppearance = useAnimationControls();
  const cycleRunning = useRef(false);
  const cycleVersion = useRef(0);

  useEffect(() => {
    if (reduceMotion) {
      cycleVersion.current += 1;
      cycleRunning.current = false;
      packageControls.stop();
      beltControls.stop();
      rockControls.stop();
      shadowControls.stop();
      shadowAppearance.stop();
      rockControls.set({ rotate: 0 });
      shadowControls.set({ transform: PACKAGE.loading });
      shadowAppearance.set({
        transform: SHADOW.contact,
        opacity: SHADOW.contactOpacity,
      });
      packageControls.set({ transform: PACKAGE.loading });
      beltControls.set({ transform: 'translate(0px, 0px)' });
      return;
    }
    if (!active || cycleRunning.current) return;
    cycleRunning.current = true;
    const version = ++cycleVersion.current;

    async function runCycle() {
      beltControls.set({ transform: 'translate(0px, 0px)' });
      await Promise.all([
        beltControls.start({
          transform: `translate(${BELT.distance}px, ${BELT.distance * BELT.slope}px)`,
          transition: { duration: TIMING.travel, ease: 'linear' },
        }),
        packageControls.start({
          transform: PACKAGE.end,
          transition: { duration: TIMING.travel, ease: 'linear' },
        }),
        shadowControls.start({
          transform: PACKAGE.end,
          transition: { duration: TIMING.travel, ease: 'linear' },
        }),
      ]);
      if (version !== cycleVersion.current) return;
      await Promise.all([
        packageControls.start({
          transform: exitFrames,
          transition: { duration: TIMING.exit, ease: 'linear' },
        }),
        shadowAppearance.start({
          opacity: 0,
          transition: { duration: TIMING.exit, ease: 'easeOut' },
        }),
      ]);
      if (version !== cycleVersion.current) return;
      // Reset only while clipped out, then reveal through a gravity-driven fall.
      packageControls.set({ transform: PACKAGE.above });
      rockControls.set({ rotate: PHYSICS.landingTilt });
      shadowControls.set({ transform: PACKAGE.loading });
      shadowAppearance.set({
        transform: SHADOW.airborne,
        opacity: SHADOW.airborneOpacity,
      });
      await Promise.all([
        packageControls.start({
          transform: landingFrames,
          transition: { duration: fallDuration, ease: 'linear' },
        }),
        shadowAppearance.start({
          transform: SHADOW.contact,
          opacity: SHADOW.contactOpacity,
          transition: { duration: fallDuration, ease: 'easeIn' },
        }),
      ]);
      if (version !== cycleVersion.current) return;
      await Promise.all([
        packageControls.start({
          transform: bounceFrames,
          transition: {
            duration: firstBounceDuration + secondBounceDuration,
            ease: 'linear',
          },
        }),
        rockControls.start({ rotate: 0, transition: PHYSICS.rockSpring }),
        shadowAppearance.start({
          opacity: [SHADOW.contactOpacity, 0.11, SHADOW.contactOpacity],
          transition: {
            duration: firstBounceDuration + secondBounceDuration,
            ease: 'easeInOut',
          },
        }),
      ]);
      if (version === cycleVersion.current) cycleRunning.current = false;
    }
    void runCycle();
  }, [
    active,
    reduceMotion,
    packageControls,
    beltControls,
    rockControls,
    shadowControls,
    shadowAppearance,
  ]);

  useEffect(
    () => () => {
      cycleVersion.current += 1;
      cycleRunning.current = false;
      packageControls.stop();
      beltControls.stop();
      rockControls.stop();
      shadowControls.stop();
      shadowAppearance.stop();
    },
    [
      packageControls,
      beltControls,
      rockControls,
      shadowControls,
      shadowAppearance,
    ],
  );

  return (
    <svg
      viewBox='0 0 320 230'
      fill='none'
      aria-hidden='true'
      className='h-full w-full'
      stroke='#b6b7bd'
      strokeWidth='1'
      strokeLinejoin='round'
    >
      <defs>
        <filter id={floorShadowId} x='-15%' y='-30%' width='130%' height='160%'>
          <feGaussianBlur stdDeviation='4' />
        </filter>
        <clipPath id={clipId}>
          <rect width='320' height='230' rx='18' />
        </clipPath>
        <clipPath id={beltClipId}>
          <path d='m27 110 209 70 61-21-209-70Z' />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        {perspective === 'operations' && (
          <>
            <path
              d='M27 204 236 251 297 227 88 180Z'
              fill='#555766'
              stroke='none'
              opacity='.1'
              filter={`url(#${floorShadowId})`}
            />
            <path d='M88 99V180M27 119V204M236 189V251M297 169V227' />
            <path d='m27 110 209 70 61-21-209-70Z' fill='#fff' />
            <g clipPath={`url(#${beltClipId})`}>
              <motion.g
                initial={{ transform: 'translate(0px, 0px)' }}
                animate={beltControls}
              >
                {Array.from({ length: BELT.seamCount }, (_, i) => {
                  const offset = (i - 12) * BELT.spacing;
                  return (
                    <path
                      key={i}
                      d={`M${27 + offset} ${110 + offset * BELT.slope}l61-21`}
                    />
                  );
                })}
              </motion.g>
            </g>
            <path d='m27 110 209 70v10L27 120Z' fill='#ececef' />
            <path d='m236 180 61-21v10l-61 21Z' fill='#dddde2' />
            {[
              [33, 117],
              [229, 183],
              [243, 182],
              [291, 166],
            ].map(([cx, cy]) => (
              <circle
                key={cx}
                cx={cx}
                cy={cy}
                r='1.8'
                fill='#8d8e96'
                stroke='none'
              />
            ))}
            <g clipPath={`url(#${beltClipId})`}>
              <motion.g
                initial={{ transform: PACKAGE.loading }}
                animate={shadowControls}
              >
                <motion.g
                  initial={{
                    transform: SHADOW.contact,
                    opacity: SHADOW.contactOpacity,
                  }}
                  animate={shadowAppearance}
                  style={{ transformOrigin: '165px 137px' }}
                >
                  <ellipse
                    cx='165'
                    cy='137'
                    rx='43'
                    ry='14'
                    fill='#555766'
                    stroke='none'
                    opacity='.25'
                  />
                  <path
                    d='m123 135 43 15 41-14-43-14Z'
                    fill='#555766'
                    stroke='none'
                  />
                </motion.g>
              </motion.g>
            </g>
            <motion.g
              initial={{ transform: PACKAGE.loading }}
              animate={packageControls}
            >
              <g transform={`translate(0 ${PACKAGE.beltCenterOffset})`}>
                <motion.g
                  initial={{ rotate: 0 }}
                  animate={rockControls}
                  style={{ transformOrigin: '166px 140px' }}
                >
                  <path d='m126 84 40 13 38-13-40-13Z' fill='#fff' />
                  <path d='m126 84 40 13v43l-40-13Z' fill='#fafafa' />
                  <path d='m166 97 38-13v43l-38 13Z' fill='#e5e5e9' />
                  <path
                    d='m147 77 40 13 10-3-40-13Z'
                    fill='#d9f99d'
                    stroke='#c3de91'
                  />
                  <path
                    d='m187 90 10-3v43l-10 3Z'
                    fill='#d9f99d'
                    stroke='#c3de91'
                  />
                  <path d='m133 112 15 5m-15 0 10 3' stroke='#c4c5cb' />
                </motion.g>
              </g>
            </motion.g>
          </>
        )}
        {perspective === 'finance' && (
          <g transform='translate(-16 -13) scale(1.1)'>
            <path
              d='m48 168 116 39 109-37-116-39Z'
              fill='#e3e3e9'
              stroke='none'
            />
            {[
              { x: 73, y: 142, h: 20 },
              { x: 123, y: 131, h: 48 },
              { x: 173, y: 105, h: 91 },
            ].map(({ x, y, h }) => (
              <g key={x}>
                <path d={`M${x} ${y}l30 10 25-9-30-10Z`} fill='#fff' />
                <path d={`M${x} ${y}v${h}l30 10v-${h}Z`} fill='#f9f9fb' />
                <path
                  d={`M${x + 30} ${y + 10}l25-9v${h}l-25 9Z`}
                  fill='#dddde5'
                />
              </g>
            ))}
            <path
              d='m89 124 50-20 50-26 27-24m-11 2 11-2-2 11'
              stroke='#91939e'
              strokeWidth='1.5'
            />
            {[
              [89, 124],
              [139, 104],
              [189, 78],
            ].map(([cx, cy]) => (
              <circle
                key={cx}
                cx={cx}
                cy={cy}
                r='2.5'
                fill='#f9f9fb'
                stroke='#91939e'
              />
            ))}
          </g>
        )}
        {perspective === 'technical' && (
          <g transform='translate(-16 -13) scale(1.1)'>
            <path
              d='m43 169 119 40 115-39-119-40Z'
              fill='#e3e3e9'
              stroke='none'
            />
            <path
              d='M88 134v16l72 24 74-25v-25M179 164v17l-19-7'
              stroke='#a5a6b1'
            />
            <path d='m154 174 6-2 6 2-6 2Z' fill='#f9f9fb' />
            {[
              { x: 62, y: 71 },
              { x: 153, y: 101 },
              { x: 208, y: 61 },
            ].map(({ x, y }) => (
              <g key={x}>
                <path
                  d={`M${x - 4} ${y + 56}l44 15 20-7-44-15Z`}
                  fill='#d4d5dd'
                  stroke='none'
                  opacity='.55'
                />
                <path d={`M${x} ${y}l41 14v54l-41-14Z`} fill='#fafafb' />
                <path
                  d={`M${x + 41} ${y + 14}l12-4v54l-12 4Z`}
                  fill='#dcdde4'
                />
                <path d={`M${x} ${y}l12-4 41 14-12 4Z`} fill='#fff' />
                {[14, 27, 40].map(d => (
                  <path
                    key={d}
                    d={`M${x + 8} ${y + d}l24 8`}
                    stroke='#c4c5ce'
                  />
                ))}
              </g>
            ))}
          </g>
        )}
        {perspective === 'executive' && (
          <g transform='translate(-16 -13) scale(1.1)'>
            <path
              d='m51 166 109 37 111-37-109-36Z'
              fill='#e3e3e9'
              stroke='none'
            />
            <path
              d='M160 94v23m0 0-71 24m71-24 71 24m-71-24v59'
              stroke='#a5a6b1'
            />
            {[
              { x: 160, y: 64 },
              { x: 89, y: 142 },
              { x: 231, y: 142 },
              { x: 160, y: 179 },
            ].map(({ x, y }) => (
              <g key={`${x}-${y}`}>
                <path d={`M${x - 28} ${y}l28-10 28 10-28 10Z`} fill='#fff' />
                <path
                  d={`M${x - 28} ${y}v12l28 10 28-10v-12l-28 10Z`}
                  fill='#e1e2e8'
                />
                <path d={`M${x} ${y + 10}v12`} />
                <circle cx={x} cy={y - 13} r='7' fill='#fafafb' />
                <path
                  d={`M${x - 12} ${y + 1}q0-13 12-13t12 13`}
                  fill='#fafafb'
                />
              </g>
            ))}
          </g>
        )}
      </g>
    </svg>
  );
}
