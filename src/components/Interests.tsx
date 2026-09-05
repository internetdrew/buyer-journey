import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import PerspectiveIllustration from './PerspectiveIllustration';
import { AnimatedButton, AnimatedButtonGroup } from '@/components/ui/animated-button';
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { demoInterest, type Interest } from '../journey';

const interests: {
  value: Interest;
  perspective: string;
  title: [string, string];
  description: string;
}[] = [
  {
    value: 'operations',
    perspective: 'Operations',
    title: ['Keep the floor', 'running'],
    description:
      'Explore reliability, uptime, and throughput concerns on the floor.',
  },
  {
    value: 'finance',
    perspective: 'Finance',
    title: ['Understand', 'cost & risk'],
    description: 'Evaluate ROI, TCO, and financial risk.',
  },
  {
    value: 'technical',
    perspective: 'Technical',
    title: ['Check systems', '& integrations'],
    description: 'Validate compatibility, integrations, and implementation.',
  },
  {
    value: 'executive',
    perspective: 'Executive',
    title: ['Align the', 'business'],
    description: 'Align strategy, priorities, and organizational impact.',
  },
];

type InterestsProps = {
  interest: Interest | null;
  onSelect: (interest: Interest) => void;
  onBack: () => void;
  onContinue: () => void;
};

export default function Interests({
  interest,
  onSelect,
  onBack,
  onContinue,
}: InterestsProps) {
  const [illustrationActive, setIllustrationActive] = useState(false);
  const canContinue = interest === demoInterest;
  const continueLabel = canContinue ? 'Continue with Operations' : 'Continue';
  return (
    <div className='mx-auto mt-12 max-w-6xl pb-12'>
      <h1 className='text-center text-xl font-semibold tracking-tight text-balance'>
        What are you here to figure out?
      </h1>
      <p className='mx-auto mt-3 max-w-xl text-center text-pretty text-muted-foreground'>
        We'll shape the experience around the questions you're most likely to
        care about.
      </p>
      <FieldSet className='mt-4'>
        <FieldLegend
          id='perspective-legend'
          className='w-full text-center font-normal text-muted-foreground'
        >
          Choose the perspective you're coming from.
        </FieldLegend>
        <RadioGroup
          aria-labelledby='perspective-legend'
          name='interest'
          value={interest ?? ''}
          onValueChange={value => {
            if (value === demoInterest) onSelect(demoInterest);
          }}
          className='mt-5 grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'
        >
          {interests.map(({ value, perspective, title, description }) => {
            const disabled = value !== demoInterest;
            return (
              <FieldLabel
                key={value}
                htmlFor={`interest-${value}`}
                onMouseEnter={() => {
                  if (!disabled) setIllustrationActive(true);
                }}
                onMouseLeave={() => setIllustrationActive(false)}
                onFocus={() => {
                  if (!disabled) setIllustrationActive(true);
                }}
                onBlur={() => setIllustrationActive(false)}
                className={`perspective-card ${disabled ? 'perspective-card-disabled' : 'perspective-card-enabled'}`}
              >
                <Field className='h-full gap-0'>
                  <div className='perspective-art'>
                    <span
                      id={`interest-${value}-perspective`}
                      className='perspective-category'
                    >
                      {perspective}
                    </span>
                    <PerspectiveIllustration
                      perspective={value}
                      active={!disabled && illustrationActive}
                    />
                  </div>
                  <div className='perspective-copy'>
                    <span
                      id={`interest-${value}-title`}
                      className='block min-h-14 text-xl leading-7 font-medium tracking-tight text-balance'
                    >
                      {title[0]}
                      <br />
                      {title[1]}
                    </span>
                    <FieldDescription
                      id={`interest-${value}-description`}
                      className='mt-4! text-sm leading-relaxed'
                    >
                      {description}
                    </FieldDescription>
                  </div>
                  <div className='perspective-footer'>
                    <span aria-hidden='true' className='text-xs font-medium'>
                      {disabled
                        ? 'Unavailable'
                        : interest === value
                          ? 'Selected'
                          : 'Select perspective'}
                    </span>
                    <RadioGroupItem
                      id={`interest-${value}`}
                      value={value}
                      disabled={disabled}
                      aria-labelledby={`interest-${value}-title interest-${value}-perspective`}
                      aria-describedby={`interest-${value}-description`}
                    />
                  </div>
                </Field>
              </FieldLabel>
            );
          })}
        </RadioGroup>
      </FieldSet>
      <AnimatedButtonGroup className='mt-8'>
        <AnimatedButton
          label='Back'
          variant='ghost'
          className='h-11 px-4'
          onClick={onBack}
        />
        <AnimatedButton
          label={continueLabel}
          icon={<ArrowRight />}
          className='h-11 px-5'
          onClick={onContinue}
          disabled={!canContinue}
        />
      </AnimatedButtonGroup>
    </div>
  );
}
