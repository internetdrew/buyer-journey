import { Button } from '@/components/ui/button';
import { demoFocusArea, type FocusArea } from '../journey';

const focusAreas: { value: FocusArea; label: string }[] = [
  { value: 'downtime', label: 'Minimize downtime' },
  { value: 'throughput', label: 'Improve throughput' },
  { value: 'roi', label: 'Understand ROI' },
  { value: 'integrations', label: 'Explore integrations' },
  { value: 'team', label: 'Prepare your team' },
];

type FocusAreasProps = {
  focusArea: FocusArea | null;
  onSelect: (focusArea: FocusArea) => void;
  onBack: () => void;
};

export default function FocusAreas({ focusArea, onSelect, onBack }: FocusAreasProps) {
  return (
    <div className="mx-auto mt-32 max-w-2xl sm:mt-40 md:mt-48">
      <h1 className="text-center text-2xl font-semibold">
        What would you like to explore first?
      </h1>
      <p className="mt-2 text-center text-neutral-500">
        Choose a focus area and we’ll tailor recommendations for your goals.
      </p>
      <fieldset className="mx-auto my-6 max-w-md space-y-3">
        <legend className="sr-only">Choose a focus area</legend>
        {focusAreas.map(({ value, label }) => (
          <label
            key={value}
            className={`flex items-center gap-3 ${value === demoFocusArea ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'}`}
          >
            <input
              type="radio"
              name="focus-area"
              value={value}
              checked={focusArea === value}
              disabled={value !== demoFocusArea}
              onChange={() => onSelect(value)}
            />
            {label}
          </label>
        ))}
      </fieldset>
      <div className="text-center">
        <Button variant="outline" onClick={onBack}>Back</Button>
      </div>
    </div>
  );
}
