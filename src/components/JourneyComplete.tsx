import {
  Calendar,
  Copy,
  Layers,
  Lightbulb,
  MessageCircle,
  Target,
  Users,
  Workflow,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ShiftPattern } from '../journey';
import { shifts } from '../rollout-data';
import { approaches } from '../evaluation-data';

const operationalImplications: Record<ShiftPattern, string> = {
  one: 'Use time outside production hours for setup and testing, with training and validation built around the operating day.',
  two: 'Both teams need time to train and validate the workflow, including how work is handed off between shifts.',
  continuous:
    'With no regular downtime window, setup, testing, and training need to fit around production.',
};

const trainingQuestions: Record<ShiftPattern, string> = {
  one: 'When can operators and leads train and validate the workflow around the operating day?',
  two: 'How will both teams participate in training and validate shift handoffs?',
  continuous: 'How will each shift participate in training and validation?',
};

const teammates = [
  {
    initials: 'AK',
    name: 'You',
    role: 'Operations',
    status: 'Owner',
    color: 'bg-[#60734f]/15 text-[#60734f]',
  },
  {
    initials: 'M',
    name: 'Maya',
    role: 'Finance',
    status: 'Active',
    color: 'bg-violet-100 text-violet-800',
  },
  {
    initials: 'S',
    name: 'Sam',
    role: 'IT',
    status: 'Active',
    color: 'bg-blue-100 text-blue-800',
  },
  {
    initials: 'J',
    name: 'Jordan',
    role: 'Executive',
    status: 'Invited',
    color: 'bg-orange-100 text-orange-800',
  },
];

export default function JourneyComplete({
  shiftPattern,
  onBack,
}: {
  shiftPattern: ShiftPattern | null;
  onBack: () => void;
}) {
  const selectedShift = shifts.find(shift => shift.value === shiftPattern);
  const facts = [
    { icon: Target, title: 'Your priority', context: 'Minimize downtime' },
    {
      icon: Layers,
      title: 'Operating pattern',
      context: selectedShift?.label ?? 'Not selected',
    },
    {
      icon: Calendar,
      title: 'Illustrative rollout range',
      context: selectedShift
        ? `${selectedShift.estimate[0]} – ${selectedShift.estimate[1]} weeks`
        : 'Not selected',
    },
  ];
  const guidance = [
    {
      icon: Workflow,
      title: 'Suggested rollout approach',
      context:
        shiftPattern === 'continuous'
          ? 'Pilot in a controlled zone, validate across every shift, then expand in stages.'
          : shiftPattern
            ? approaches[shiftPattern]
            : 'Assess, pilot, then scale.',
    },
    {
      icon: Lightbulb,
      title: 'What this means for your operation',
      context: shiftPattern
        ? operationalImplications[shiftPattern]
        : 'Plan setup, testing, and training around production.',
    },
  ];
  const discussionQuestions = [
    'Where could a pilot run with minimal disruption?',
    shiftPattern
      ? trainingQuestions[shiftPattern]
      : 'How will your team participate in training and validation?',
    'What site preparation and system integrations need to be confirmed?',
  ];

  return (
    <div className='mx-auto mt-10 max-w-6xl pb-8 sm:mt-12 sm:pb-10'>
      <div className='grid items-start gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]'>
        <main className='min-w-0'>
          <header>
            <h1 className='text-lg font-semibold tracking-tight'>
              Bring your team in
            </h1>
            <p className='mt-1 max-w-xl text-base text-neutral-600'>
              Your evaluation is ready. Invite your team to review the approach,
              add their perspective, and explore from their role.
            </p>
          </header>
          <section aria-label='Discuss your rollout' className='mt-5'>
            <Button size='lg' disabled aria-describedby='rollout-contact-availability'>
              <MessageCircle aria-hidden='true' />
              Discuss your rollout with us
            </Button>
            <p className='mt-3 max-w-xl text-sm leading-relaxed text-neutral-600'>
              Talk through your requirements and validate what a rollout could
              look like for your operation.
            </p>
            <p id='rollout-contact-availability' className='mt-2 text-xs text-neutral-500'>
              Demo preview. Rollout conversations are coming soon.
            </p>
          </section>
          <section
            aria-labelledby='shared-evaluation-heading'
            className='mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_2px_8px_-4px_rgba(0,0,0,0.12)]'
          >
            <div className='p-5 sm:p-6'>
              <div className='flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#60734f]'>
                <span aria-hidden='true' className='h-px w-5 bg-[#60734f]' />
                Your rollout brief
              </div>
              <h2
                id='shared-evaluation-heading'
                className='mt-3 text-xl font-semibold tracking-tight sm:text-2xl'
              >
                Your operations summary
              </h2>
              <p className='mt-2 max-w-md text-sm leading-relaxed text-neutral-500'>
                A starting point for reviewing the rollout with your buying team.
              </p>
              <dl className='mt-6 grid grid-cols-2 gap-x-5 gap-y-5 border-t border-neutral-100 pt-5 sm:grid-cols-[1.2fr_1fr_1fr]'>
                {facts.map(({ icon: Icon, title, context }, index) => (
                  <div key={title} className={`min-w-0 ${index === 2 ? 'col-span-2 sm:col-span-1' : ''}`}>
                    <dt className='grid grid-cols-[1rem_minmax(0,1fr)] items-start gap-3 text-[11px] leading-relaxed text-neutral-500'>
                      <Icon aria-hidden='true' className='size-4' strokeWidth={1.8} />
                      <span>{title}</span>
                    </dt>
                    <dd className={`mt-2 pl-7 font-semibold tracking-tight ${index === 2 ? 'text-xl text-[#4f6240]' : 'text-sm text-neutral-800'}`}>
                      {context}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className='px-5 pb-5 sm:px-6 sm:pb-6'>
              {guidance.map(({ icon: Icon, title, context }, index) => (
                <section
                  key={title}
                  className={`grid grid-cols-[1rem_minmax(0,1fr)] items-start gap-3 p-4 sm:p-5 ${index === 0
                    ? 'rounded-xl bg-[#f3f5ef] ring-1 ring-inset ring-[#60734f]/15'
                    : 'mt-1'}`}
                >
                  <Icon
                    aria-hidden='true'
                    className='size-4 text-[#60734f]'
                    strokeWidth={1.8}
                  />
                  <div className='min-w-0'>
                    <h3 className={`text-xs font-medium ${index === 0 ? 'text-[#4f6240]' : 'text-neutral-800'}`}>
                      {title}
                    </h3>
                    <p className={index === 0
                      ? 'mt-3 max-w-lg text-lg font-medium leading-snug tracking-tight text-[#293322] sm:text-xl'
                      : 'mt-1.5 text-sm leading-relaxed text-neutral-600'}>
                      {context}
                    </p>
                  </div>
                </section>
              ))}
            </div>
            <section
              aria-labelledby='team-discussion-heading'
              className='border-t border-neutral-200/80 bg-neutral-50/70 px-9 py-5 sm:px-11'
            >
              <div className='grid grid-cols-[1rem_minmax(0,1fr)] items-start gap-3'>
                  <MessageCircle aria-hidden='true' className='mt-0.5 size-4 text-[#60734f]' strokeWidth={1.8} />
                <div className='flex flex-wrap items-baseline justify-between gap-2'>
                  <h3 id='team-discussion-heading' className='text-sm font-semibold'>
                    What to review with your team
                  </h3>
                  <span className='text-[11px] text-neutral-500'>3 discussion points</span>
                </div>
              </div>
              <ol className='mt-3 divide-y divide-neutral-200/70'>
                {discussionQuestions.map((question, index) => (
                  <li key={question} className='grid grid-cols-[1rem_minmax(0,1fr)] items-baseline gap-3 py-3 last:pb-0'>
                    <span aria-hidden='true' className='shrink-0 font-mono text-[11px] tabular-nums text-[#60734f]'>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className='text-sm leading-relaxed text-neutral-600'>{question}</p>
                  </li>
                ))}
              </ol>
            </section>
          </section>
          <nav aria-label='Journey navigation' className='mt-6'>
            <Button variant='link' className='px-0 text-neutral-500' onClick={onBack}>
              Back to summary
            </Button>
          </nav>
        </main>
        <aside
          aria-labelledby='team-heading'
          className='min-w-0 rounded-[24px] bg-neutral-50 p-4 ring-[0.5px] ring-neutral-300'
        >
          <div className='flex items-center gap-2'>
            <Users aria-hidden='true' className='size-4 text-[#60734f]' />
            <h2 id='team-heading' className='font-semibold'>
              Invite your team
            </h2>
          </div>
          <p className='mt-1 text-sm text-neutral-600'>
            Bring the right people into the conversation.
          </p>
          <div className='mt-6'>
            <h3 className='text-xs font-medium text-neutral-500'>
              Example buying team
            </h3>
            <ul className='mt-3 space-y-3'>
              {teammates.map(teammate => (
                <li
                  key={teammate.name}
                  className='flex items-center gap-3 rounded-xl bg-white p-3'
                >
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${teammate.color}`}
                  >
                    {teammate.initials}
                  </span>
                  <div className='min-w-0 flex-1 text-xs'>
                    <p className='font-medium'>{teammate.name}</p>
                    <p className='mt-1 text-neutral-500'>{teammate.role}</p>
                  </div>
                  <span
                    className={`rounded-md px-2 py-1 text-[10px] font-medium ${teammate.status === 'Invited' ? 'bg-orange-50 text-orange-800' : 'bg-[#f0f3ec] text-[#60734f]'}`}
                  >
                    {teammate.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className='mt-6 border-t border-neutral-200 pt-4'>
            <label
              htmlFor='evaluation-invite-link'
              className='text-xs font-medium'
            >
              Invite link
            </label>
            <div className='mt-2 flex gap-2'>
              <input
                id='evaluation-invite-link'
                readOnly
                disabled
                placeholder='Sharing coming soon'
                className='min-w-0 flex-1 rounded-md border border-neutral-200 bg-white px-3 py-2 text-xs placeholder:text-neutral-500'
              />
              <Button
                variant='outline'
                size='icon'
                disabled
                aria-label='Copy invite link'
              >
                <Copy aria-hidden='true' />
              </Button>
            </div>
            <p className='mt-3 text-xs leading-relaxed text-neutral-500'>
              Demo preview. Invitations and shared access are not connected yet.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
