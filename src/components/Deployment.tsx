import { Button } from '@/components/ui/button';

type DeploymentProps = {
  onContinue: () => void;
  onBack: () => void;
};

export default function Deployment({ onContinue, onBack }: DeploymentProps) {
  return (
    <div className="mx-auto mt-24 max-w-2xl pb-12 text-center">
      <h1 className="text-2xl font-semibold">
        Let’s see what deployment would look like in your operation.
      </h1>
      <div className="my-6 flex aspect-video items-center justify-center rounded-lg border bg-neutral-50 text-neutral-500">
        Implementation overview video — coming soon
      </div>
      <h2 className="font-semibold">Your phased deployment plan</h2>
      <ol className="my-6 grid gap-6 text-left sm:grid-cols-3">
        <li><p className="text-sm text-neutral-500">Week 1</p><h3 className="font-medium">Assess</h3><p>On-site assessment and workflow validation.</p></li>
        <li><p className="text-sm text-neutral-500">Week 2</p><h3 className="font-medium">Pilot</h3><p>Deploy in a controlled cell or process.</p></li>
        <li><p className="text-sm text-neutral-500">Week 4</p><h3 className="font-medium">Scale</h3><p>Expand deployment based on results and readiness.</p></li>
      </ol>
      <div className="flex justify-center gap-3">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onContinue}>Tailor your rollout</Button>
      </div>
    </div>
  );
}
