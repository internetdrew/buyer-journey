import { Button } from '@/components/ui/button';
import { demoInterest, type Interest } from '../journey';

const interests: { value: Interest; label: string }[] = [
  { value: 'operations', label: 'Keep the floor running — Operations' },
  { value: 'finance', label: 'Understand cost & risk — Finance' },
  { value: 'technical', label: 'Check systems & integrations — Technical' },
  { value: 'executive', label: 'Align the business — Executive' },
];

type InterestsProps = {
  interest: Interest | null;
  onSelect: (interest: Interest) => void;
  onBack: () => void;
};

export default function Interests({
  interest,
  onSelect,
  onBack,
}: InterestsProps) {
  return (
    <div className='mx-auto mt-32 max-w-2xl sm:mt-40 md:mt-48'>
      <h1 className='text-center text-2xl font-semibold'>
        What are you here to figure out?
      </h1>
      <p className='mt-2 text-center text-neutral-500'>
        We'll shape the experience around the questions you're most likely to
        care about.
      </p>
      <fieldset className='mx-auto my-6 max-w-md space-y-3'>
        <legend className='mb-4 font-medium'>
          What's your primary focus right now?
        </legend>
        {interests.map(({ value, label }) => (
          <label
            key={value}
            className={`flex items-center gap-3 ${value === demoInterest ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'}`}
          >
            <input
              type='radio'
              name='interest'
              value={value}
              checked={interest === value}
              disabled={value !== demoInterest}
              onChange={() => onSelect(value)}
            />
            {label}
          </label>
        ))}
      </fieldset>
      <div className='text-center'>
        <Button variant='outline' onClick={onBack}>
          Back
        </Button>
      </div>
    </div>
  );
}
