import { Button } from '@/components/ui/button';

export default function PeerInsight({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  return (
    <div className="mx-auto mt-20 max-w-3xl pb-12">
      <p className="mb-2 text-sm font-medium text-neutral-500">Peer insight · Demo story</p>
      <h1 className="text-2xl font-semibold">Hear from another Ops Director</h1>
      <p className="mt-2 text-neutral-500">What another team learned along the way.</p>

      <section aria-label="Operations director story" className="my-6 grid gap-6 rounded-xl border p-6 sm:grid-cols-2">
        <div>
          <div className="mb-4 flex aspect-video items-center justify-center rounded-lg bg-neutral-50 p-4 text-center text-neutral-500">
            Peer insight video — coming soon
          </div>
          <h2 className="font-semibold">Maya Patel</h2>
          <p className="text-sm text-neutral-500">Director of Operations</p>
          <p className="text-sm text-neutral-500">Northline Manufacturing</p>
          <p className="mt-2 text-sm text-neutral-500">Detroit, MI</p>
        </div>
        <blockquote className="self-center text-xl leading-relaxed">
          “We expected downtime to be the big issue — training turned out to be the bigger lift.”
        </blockquote>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold">Key takeaway</h2>
        <p className="mt-2 text-neutral-600">Downtime prep is important — but people readiness makes or breaks a smooth transition.</p>
      </section>

      <section className="mb-6 border-t pt-6">
        <p className="text-sm text-neutral-500">Next recommended topic</p>
        <h2 className="mt-1 font-semibold">Prepare your team</h2>
        <p className="mt-1 text-neutral-600">Build confidence and clarity before you launch.</p>
      </section>
      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onContinue}>See your recommended approach</Button>
      </div>
    </div>
  );
}
