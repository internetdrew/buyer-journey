import { Button } from '@/components/ui/button';

export default function JourneyComplete({ onBack }: { onBack: () => void }) {
  return (
    <div className="mx-auto mt-20 max-w-4xl pb-12">
      <p className="mb-3 text-sm font-medium text-neutral-500">Your personalized demo plan is complete</p>
      <h1 className="text-2xl font-semibold">Ready to align your team</h1>
      <p className="mt-3 max-w-xl text-neutral-600">
        You’ve explored and tailored a plan for Base Robotics. Now bring your team together to review and move forward.
      </p>
      <section className="my-8 rounded-lg border p-6">
        <h2 className="font-semibold">Review this plan with an implementation specialist</h2>
        <p className="mt-2 text-neutral-500">Discuss your rollout, shift considerations, and team readiness.</p>
      </section>
      <section className="mb-6">
        <h2 className="font-semibold">Bring the right people into the conversation</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-4">
          {['You · Plan owner', 'Operations', 'Finance', 'IT'].map((role) => (
            <li key={role} className="rounded-lg border p-4">{role}</li>
          ))}
        </ul>
      </section>
      <section className="mb-6 rounded-lg border p-6">
        <h2 className="font-semibold">Evaluation notebook</h2>
        <p className="mt-2 text-neutral-500">Your plan summary, all in one place.</p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Operations priorities and downtime goals</li>
          <li>Phased implementation roadmap</li>
          <li>Shift considerations</li>
          <li>Training and team readiness</li>
        </ul>
      </section>
      <p className="mb-6 text-sm text-neutral-500">End of guided demo. Sharing, invitations, and specialist booking are not connected yet.</p>
      <Button variant="outline" onClick={onBack}>Back to summary</Button>
    </div>
  );
}
