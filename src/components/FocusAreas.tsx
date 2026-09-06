import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  AnimatedButton,
  AnimatedButtonGroup,
} from '@/components/ui/animated-button';
import {
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { RadioGroup } from '@/components/ui/radio-group';
import { demoFocusArea, type FocusArea } from '../journey';
import FocusIllustration from './FocusIllustration';
import RadioCard from './RadioCard';

const focusAreas: {
  value: FocusArea;
  title: string;
  description: string;
}[] = [
  {
    value: 'downtime',
    title: 'Minimizing downtime',
    description: 'Reduce unplanned stops and keep operations running.',
  },
  {
    value: 'throughput',
    title: 'Improve throughput',
    description: 'Increase output and optimize line performance.',
  },
  {
    value: 'team',
    title: 'Prepare your team',
    description: 'Enable adoption with training, support, and best practices.',
  },
];

type FocusAreasProps = {
  focusArea: FocusArea | null;
  onSelect: (focusArea: FocusArea) => void;
  onBack: () => void;
  onContinue: () => void;
};

export default function FocusAreas({
  focusArea,
  onSelect,
  onBack,
  onContinue,
}: FocusAreasProps) {
  const [activeArea, setActiveArea] = useState<FocusArea | null>(null);
  const canContinue = focusArea === demoFocusArea;

  return (
    <div className='mx-auto mt-12 max-w-6xl pb-12'>
      <h1 className='text-center text-xl font-semibold tracking-tight text-balance'>
        Which part of operations would you like to explore first?
      </h1>
      <p className='mx-auto mt-3 max-w-xl text-center text-pretty text-muted-foreground'>
        Choose a focus area and we'll tailor recommendations for your goals.
      </p>
      <FieldSet className='mx-auto mt-3 w-full max-w-4xl'>
        <FieldLegend className='sr-only'>Choose a focus area</FieldLegend>
        <RadioGroup
          aria-label='Choose a focus area'
          name='focus-area'
          value={focusArea ?? ''}
          onValueChange={value => {
            if (value === demoFocusArea) onSelect(demoFocusArea);
          }}
          className='mt-5 grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'
        >
          {focusAreas.map(({ value, title, description }) => {
            const disabled = value !== demoFocusArea;

            return (
              <RadioCard
                key={value}
                value={value}
                title={title}
                description={description}
                disabled={disabled}
                onActiveChange={active => setActiveArea(active ? value : null)}
              >
                <FocusIllustration focusArea={value} active={activeArea === value} />
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
          label={canContinue ? 'Continue with Minimize downtime' : 'Continue'}
          icon={<ArrowRight />}
          className='h-11 px-5'
          onClick={onContinue}
          disabled={!canContinue}
        />
      </AnimatedButtonGroup>
    </div>
  );
}
