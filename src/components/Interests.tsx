import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import PerspectiveIllustration from './PerspectiveIllustration';
import RadioCard from './RadioCard';
import {
  AnimatedButton,
  AnimatedButtonGroup,
} from '@/components/ui/animated-button';
import { FieldLegend, FieldSet } from '@/components/ui/field';
import { RadioGroup } from '@/components/ui/radio-group';
import { demoInterest, type Interest } from '../journey';

const interests: {
  value: Interest;
  title: string;
  description: string;
}[] = [
  {
    value: 'operations',
    title: 'Keeping operations running smoothly',
    description:
      'Explore reliability, uptime, and throughput concerns on the floor.',
  },
  {
    value: 'finance',
    title: 'Understanding cost and impact',
    description: 'Evaluate ROI, TCO, and financial risk.',
  },
  {
    value: 'technical',
    title: 'Making sure systems connect',
    description: 'Validate compatibility, integrations, and implementation.',
  },
  {
    value: 'executive',
    title: 'Getting everyone aligned',
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
        Let's start with what matters most.
      </h1>
      <p className='mx-auto mt-3 max-w-xl text-center text-pretty text-muted-foreground'>
        Choose where you're coming from, and we'll guide you through the
        questions, details, and considerations most relevant to you.
      </p>
      <FieldSet className='mt-4'>
        <FieldLegend
          id='perspective-legend'
          className='w-full sr-only text-center font-normal text-muted-foreground'
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
          {interests.map(({ value, title, description }) => {
            const disabled = value !== demoInterest;
            return (
              <RadioCard
                key={value}
                value={value}
                title={title}
                description={description}
                disabled={disabled}
                onActiveChange={setIllustrationActive}
              >
                <PerspectiveIllustration
                  perspective={value}
                  active={!disabled && illustrationActive}
                />
              </RadioCard>
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
