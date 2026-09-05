import { Button } from '@/components/ui/button';
import type { ShiftPattern } from '../journey';

const shiftLabels: Record<ShiftPattern, string> = {
  one: '1 shift',
  two: '2 shifts',
  continuous: '24/7 operations',
};

type JourneySummaryProps = {
  shiftPattern: ShiftPattern | null;
  onBack: () => void;
  onContinue: () => void;
};

export default function JourneySummary({ shiftPattern, onBack, onContinue }: JourneySummaryProps) {
  return (
    <div className="mx-auto mt-20 max-w-4xl pb-12">
      <h1 className="text-2xl font-semibold">Your recommended approach</h1>
      <p className="mt-2 text-neutral-500">Based on your goals, team, and exploration.</p>
      <div className="my-8 grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <section className="rounded-lg border p-4">
            <h2 className="font-semibold">Phased deployment</h2>
            <p className="mt-2 text-neutral-600">Start small, prove value, then scale.</p>
          </section>
          <section className="rounded-lg border p-4">
            <h2 className="font-semibold">Shift considerations</h2>
            <p className="mt-2 text-neutral-600">Align rollout with {shiftPattern ? shiftLabels[shiftPattern] : 'your shift pattern'} and operator availability.</p>
          </section>
          <section className="rounded-lg border p-4">
            <h2 className="font-semibold">Training needs</h2>
            <p className="mt-2 text-neutral-600">Upskill operators and leaders with role-based training.</p>
          </section>
          <section className="rounded-lg border bg-neutral-50 p-4">
            <p className="text-sm text-neutral-500">Suggested next path</p>
            <h2 className="mt-1 font-semibold">Prepare your team</h2>
            <p className="mt-2 text-neutral-600">Review a change plan and team readiness checklist together.</p>
          </section>
        </div>
        <aside className="rounded-lg border p-6">
          <h2 className="font-semibold">Evaluation notebook</h2>
          <p className="mt-2 text-neutral-500">Highlights from your journey.</p>
          <ul className="mt-6 space-y-4">
            <li className="rounded-lg border p-4">Operations priority: Minimize downtime</li>
            <li className="rounded-lg border p-4">Deployment approach: Assess, pilot, then scale</li>
            <li className="rounded-lg border p-4">Peer insight: Prepare people alongside the technology</li>
          </ul>
        </aside>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onContinue}>Bring your team together →</Button>
      </div>
    </div>
  );
}
