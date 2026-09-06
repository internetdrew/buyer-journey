import { motion, useReducedMotion } from 'motion/react';
import type { FocusArea } from '../journey';

const INK = '#9698a2';
const LIGHT = '#f9f9fb';
const SHADE = '#dfe0e7';
const LIME = '#d5f69a';

/* ANIMATION STORYBOARD
 *    rest   needle sits in the right-hand red / high-downtime zone
 *  hover   needle decreases counterclockwise into the left-hand green zone
 *  leave   needle returns with the same interruptible spring
 */

// angle: degrees, 0 = straight up, positive = clockwise (matches METER.restRotation/improvedRotation)

const CENTER = { x: 80, y: 89 };
const RIM_RADIUS = 59;

function polar(angle: number, radius: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: CENTER.x + Math.cos(rad) * radius,
    y: CENTER.y + Math.sin(rad) * radius,
  };
}

// arc path from startAngle to endAngle at a fixed radius — every band uses this, so every band is truly concentric
function describeArc(startAngle: number, endAngle: number, radius: number) {
  const start = polar(startAngle, radius);
  const end = polar(endAngle, radius);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M${start.x} ${start.y}A${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

const METER = {
  restRotation: 68,
  improvedRotation: -48,
  // Near-critical damping: quick response, soft settle, no visible bounce.
  spring: { type: 'spring' as const, stiffness: 400, damping: 36, mass: 0.8 },
};

function Meter({ active }: { active: boolean }) {
  const reducedMotion = useReducedMotion();
  return (
    <svg
      viewBox='0 0 160 120'
      className='h-28 w-36'
      fill='none'
      stroke={INK}
      strokeWidth='2'
      strokeLinecap='round'
      aria-hidden='true'
    >
      <g strokeWidth='11' strokeLinecap='butt'>
        <path d={describeArc(-90, 90, RIM_RADIUS)} stroke='#c95048' />
        <path d={describeArc(-90, 46, RIM_RADIUS)} stroke='#79a942' />
      </g>
      {[-78, -59, -40, -20, 0, 20, 40, 59, 78].map(angle => {
        const inner = polar(angle, 43);
        const outer = polar(angle, 50);
        return (
          <path
            key={angle}
            d={`M${inner.x} ${inner.y}L${outer.x} ${outer.y}`}
            strokeWidth={angle % 40 === 0 ? '2' : '1.4'}
          />
        );
      })}
      <path
        d='M36 99q44 12 88 0'
        stroke='#bfc0c8'
        strokeWidth='1'
        strokeDasharray='2 4'
      />
      <g transform={`translate(${CENTER.x} ${CENTER.y})`}>
        <motion.g
          initial={{ rotate: METER.restRotation }}
          animate={{
            rotate:
              active && !reducedMotion
                ? METER.improvedRotation
                : METER.restRotation,
          }}
          transition={METER.spring}
          style={{ transformBox: 'view-box', originX: 0, originY: 0 }}
        >
          <path d='M0 0V-49' stroke='#34353c' strokeWidth='3' />
          <path d='M0 0V-45' stroke='#fff' strokeWidth='0.7' opacity='.7' />
        </motion.g>
      </g>
      <circle cx='80' cy='89' r='8' fill='#34353c' stroke='none' />
      <circle cx='80' cy='89' r='3' fill='#f0eff3' stroke='none' />
    </svg>
  );
}

function Throughput() {
  return (
    <svg
      viewBox='0 0 180 125'
      className='h-28 w-36'
      fill='none'
      stroke={INK}
      strokeWidth='1.8'
      strokeLinejoin='round'
      aria-hidden='true'
    >
      <path
        d='m20 103 70 22 70-24-70-22Z'
        fill={SHADE}
        stroke='none'
        opacity='.55'
      />
      {[
        { x: 35, y: 72, h: 31, w: 21 },
        { x: 63, y: 60, h: 43, w: 23 },
        { x: 93, y: 43, h: 60, w: 24 },
        { x: 124, y: 23, h: 80, w: 25 },
      ].map(({ x, y, h, w }) => (
        <g key={x}>
          <path d={`M${x} ${y}l${w} 7 11-4-${w}-7Z`} fill={LIGHT} />
          <path d={`M${x} ${y}v${h}l${w} 7v-${h}Z`} fill='#fafafd' />
          <path d={`M${x + w} ${y + 7}l11-4v${h}l-11 4Z`} fill={SHADE} />
        </g>
      ))}
      <path
        d='M27 56c22-2 38-10 53-22 17-13 35-16 67-26'
        stroke='#737681'
        strokeWidth='2.5'
      />
      <path d='m136 9 12-2-2 12' stroke='#737681' strokeWidth='2.5' />
      <path d='M29 108h120' stroke='#c4c5cd' />
    </svg>
  );
}

function DollarBill() {
  return (
    <svg
      viewBox='0 0 180 125'
      className='h-28 w-36'
      fill='none'
      stroke={INK}
      strokeWidth='1.8'
      strokeLinejoin='round'
      aria-hidden='true'
    >
      <path
        d='m26 79 82-40 49 18-82 40Z'
        fill={SHADE}
        stroke='none'
        opacity='.6'
      />
      <path d='m35 55 83-33 36 14-83 34Z' fill={LIGHT} />
      <path d='m35 55v42l36 15V70Z' fill='#fbfbfd' />
      <path d='m71 70 83-34v42l-83 34Z' fill={SHADE} />
      <path d='m35 55 36 15 83-34-36-14Z' fill='#fff' />
      <path
        d='M84 62c0-7 10-12 20-8 10 4 10 13 0 17-10 4-20-1-20-9Z'
        fill='#eef0e5'
      />
      <path
        d='M94 52v24m-5-17c6-5 16-4 20 1m-20 10c5 5 15 5 21 0'
        stroke='#737681'
      />
      <path d='m48 59 12 5m-12 4 8 3m69-28 10 4m-10 5 8 3' stroke='#c3c4cc' />
    </svg>
  );
}

function Integrations() {
  return (
    <svg
      viewBox='0 0 180 125'
      className='h-28 w-36'
      fill='none'
      stroke={INK}
      strokeWidth='1.8'
      strokeLinejoin='round'
      aria-hidden='true'
    >
      <path
        d='m25 99 65 21 66-22-65-21Z'
        fill={SHADE}
        stroke='none'
        opacity='.55'
      />
      <path d='M44 70 90 85l46-15' strokeDasharray='3 5' />
      <g>
        <path d='M28 37h26V25h19v12h28v22H73v14H54V59H28Z' fill={LIGHT} />
        <path d='M101 37h25v22h-25M73 59h28v22H73' fill={SHADE} />
      </g>
      <g transform='translate(69 16)'>
        <path d='M28 37h26V25h19v12h28v22H73v14H54V59H28Z' fill={LIGHT} />
        <path d='M101 37h25v22h-25M73 59h28v22H73' fill={SHADE} />
      </g>
      <path d='M90 62v-9' stroke='#737681' />
      <circle cx='90' cy='49' r='3' fill={LIME} />
    </svg>
  );
}

function Team() {
  return (
    <svg
      viewBox='0 0 180 125'
      className='h-28 w-36'
      fill='none'
      stroke={INK}
      strokeWidth='1.8'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
    >
      <path
        d='m27 100 63 21 64-22-63-21Z'
        fill={SHADE}
        stroke='none'
        opacity='.55'
      />
      <path d='M90 52v17M90 61 46 84m44-23 44 23m-44-23v42' stroke='#a7a8b2' />
      {[
        { x: 90, y: 30 },
        { x: 43, y: 86 },
        { x: 137, y: 86 },
        { x: 90, y: 105 },
      ].map(({ x, y }) => (
        <g key={`${x}-${y}`}>
          <path d={`M${x - 18} ${y + 7}l18-7 18 7-18 7Z`} fill='#fff' />
          <path d={`M${x - 18} ${y + 7}v8l18 7 18-7v-8`} fill={SHADE} />
          <circle cx={x} cy={y - 10} r='7' fill={LIGHT} />
          <path d={`M${x - 11} ${y + 4}q0-9 11-9t11 9`} fill={LIGHT} />
        </g>
      ))}
      <circle cx='90' cy='61' r='3' fill={LIME} />
    </svg>
  );
}

export default function FocusIllustration({
  focusArea,
  active,
}: {
  focusArea: FocusArea;
  active: boolean;
}) {
  if (focusArea === 'downtime') return <Meter active={active} />;
  if (focusArea === 'throughput') return <Throughput />;
  if (focusArea === 'roi') return <DollarBill />;
  if (focusArea === 'integrations') return <Integrations />;
  return <Team />;
}
