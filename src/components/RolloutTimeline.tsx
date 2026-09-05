import { useState } from 'react';
import { Button } from '@/components/ui/button';

const phases = [
  { title: 'Foundation', goal: 'Assess the site and establish the rollout plan.' },
  { title: 'Pilot & Validate', goal: 'Prove reliability in a controlled area and refine workflows.' },
  { title: 'Expand Zone', goal: 'Extend validated workflows to additional warehouse zones.' },
  { title: 'Scale Ops', goal: 'Expand operations based on readiness and pilot results.' },
  { title: 'Optimize', goal: 'Review performance and refine operational workflows.' },
  { title: 'Handoff & Iterate', goal: 'Transition ownership to your team and plan ongoing improvements.' },
];

type RolloutTimelineProps = {
  onBack: () => void;
  onContinue: () => void;
};

export default function RolloutTimeline({ onBack, onContinue }: RolloutTimelineProps) {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(1);
  const phase = selectedPhase === null ? null : phases[selectedPhase];

  return (
    <div className="mx-auto mt-20 max-w-4xl pb-12">
      <h1 className="text-2xl font-semibold">Rollout Timeline</h1>
      <p className="mt-2 text-neutral-500">Click a phase to explore.</p>
      <ol className="my-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {phases.map(({ title }, index) => (
          <li key={title}>
            <button
              type="button"
              aria-pressed={selectedPhase === index}
              onClick={() => setSelectedPhase(index)}
              className={`h-full w-full rounded-lg border p-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 ${selectedPhase === index ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-50'}`}
            >
              <span className="block text-sm">Week {index + 1}</span>
              <span className="mt-1 block font-medium">{title}</span>
            </button>
          </li>
        ))}
      </ol>
      {phase && selectedPhase !== null && (
        <section aria-label="Phase details" className="mb-6 rounded-xl border p-6">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold">Week {selectedPhase + 1}: {phase.title}</h2>
            <Button variant="ghost" aria-label="Close phase details" onClick={() => setSelectedPhase(null)}>×</Button>
          </div>
          <p className="mt-2 text-neutral-500">Goal: {phase.goal}</p>
          {selectedPhase === 1 && (
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="space-y-5">
                <div>
                  <h3 className="font-medium">Validation Steps</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-neutral-600">
                    <li>Run end-to-end task flows</li>
                    <li>Validate safety + navigation</li>
                    <li>Measure pick accuracy</li>
                    <li>Confirm system integrations</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium">Training Window</h3>
                  <p className="mt-2 text-neutral-600">May 6 – May 12 (demo dates)</p>
                  <p className="text-neutral-600">On-site support + remote monitoring</p>
                </div>
                <div>
                  <h3 className="font-medium">Zone-Based Rollout</h3>
                  <p className="mt-2 text-neutral-600">Start in Zone B. Limited to trained operators and pre-approved workflows.</p>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Warehouse Zones</h3>
                <div className="mt-4 grid grid-cols-2 gap-2" aria-label="Schematic warehouse zones; pilot starts in Zone B">
                  {['A', 'B', 'C', 'D', 'E'].map((zone) => (
                    <div key={zone} className={`flex min-h-20 items-center justify-center rounded border text-sm ${zone === 'B' ? 'bg-neutral-900 text-white' : 'bg-neutral-50'}`}>
                      Zone {zone}{zone === 'B' ? ' · Pilot' : ''}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      )}
      <div className="mb-6 rounded-lg border p-4">
        <h2 className="font-medium">What does rollout look like for another team?</h2>
        <p className="mt-1 mb-4 text-neutral-500">Hear what an operations leader learned about downtime and getting their team ready.</p>
        <Button onClick={onContinue}>Hear from an Ops Director</Button>
      </div>
      <Button variant="outline" onClick={onBack}>Back</Button>
    </div>
  );
}
