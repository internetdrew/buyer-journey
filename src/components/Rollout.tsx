import { Button } from '@/components/ui/button';
import type { ShiftPattern } from '../journey';

const shifts: { value: ShiftPattern; label: string; validation: string }[] = [
  { value: 'one', label: '1 shift', validation: 'Integrate with systems and validate during your operating shift.' },
  { value: 'two', label: '2 shifts', validation: 'Integrate with systems and validate across two shifts.' },
  { value: 'continuous', label: '24/7', validation: 'Integrate with systems and validate across continuous operations and shift handovers.' },
];

type RolloutProps = {
  shiftPattern: ShiftPattern | null;
  onSelect: (shiftPattern: ShiftPattern) => void;
  onBack: () => void;
  onContinue: () => void;
};

export default function Rollout({ shiftPattern, onSelect, onBack, onContinue }: RolloutProps) {
  const selected = shifts.find(({ value }) => value === shiftPattern);

  return (
    <div className="mx-auto mt-32 max-w-2xl pb-12 text-center sm:mt-40 md:mt-48">
      <h1 className="text-2xl font-semibold">Which best matches your operation today?</h1>
      <p className="mt-2 text-neutral-500">This helps us tailor your rollout timeline.</p>
      <fieldset className="my-6 flex justify-center gap-6">
        <legend className="sr-only">Operating shifts</legend>
        {shifts.map(({ value, label }) => (
          <label key={value} className="flex cursor-pointer items-center gap-2">
            <input type="radio" name="shifts" value={value} checked={shiftPattern === value} onChange={() => onSelect(value)} />
            {label}
          </label>
        ))}
      </fieldset>
      <section aria-live="polite" className="my-8 text-left">
        {selected ? (
          <>
            <h2 className="font-semibold">Your tailored rollout</h2>
            <ol className="mt-4 grid gap-6 sm:grid-cols-3">
              <li><p className="text-sm text-neutral-500">Week 1</p><h3 className="font-medium">Assess &amp; Plan</h3><p>On-site discovery and scope.</p></li>
              <li><p className="text-sm text-neutral-500">Week 2</p><h3 className="font-medium">Integrate &amp; Validate</h3><p>{selected.validation}</p></li>
              <li><p className="text-sm text-neutral-500">Week 3</p><h3 className="font-medium">Go Live &amp; Optimize</h3><p>Launch and monitor performance.</p></li>
            </ol>
            {shiftPattern !== 'one' && <p className="mt-4 text-sm text-neutral-500">Additional validation between shifts is usually recommended.</p>}
          </>
        ) : <p className="text-center text-neutral-500">Choose your shift pattern to see your tailored rollout.</p>}
      </section>
      <div className="flex justify-center gap-3">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button disabled={shiftPattern === null} onClick={onContinue}>View rollout timeline</Button>
      </div>
    </div>
  );
}
