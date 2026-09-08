import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Box,
  ChartNoAxesColumnIncreasing,
  Sparkles,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const principles = [
  {
    icon: Box,
    title: 'Start contained',
    description:
      'Begin in a controlled area so we can prove the workflow, validate results, and keep the rest of your operation running smoothly.',
  },
  {
    icon: Users,
    title: 'Validate with the people doing the work',
    description:
      'We work closely with your teams across shifts to make sure the process fits your reality — not just the plan.',
  },
  {
    icon: ChartNoAxesColumnIncreasing,
    title: 'Expand when you’re ready',
    description:
      'Once we’ve proven it works, we scale based on what we learn, at a pace that makes sense for your operation.',
  },
];

export default function ImplementationInsight({
  onBack,
  onContinue,
}: {
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div className='mx-auto mt-10 max-w-6xl pb-8 text-[#1c2429] sm:mt-12 sm:pb-10'>
      <div className='grid items-start gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]'>
        <section aria-labelledby='implementation-heading' className='min-w-0'>
          <header>
            <h1
              id='implementation-heading'
              className='text-xl font-semibold tracking-tight'
            >
              How we'd keep disruption low
            </h1>
            <p className='mt-1 max-w-xl text-base leading-relaxed text-neutral-500'>
              Hear what our implementation team has learned about rolling out
              into operations like yours — and how we keep production moving.
            </p>
          </header>

          <div className='mt-4 aspect-video overflow-hidden rounded-2xl bg-black sm:mt-9'>
            <iframe
              src='https://player.mux.com/Wg01T5GuG6C013LxKzvfRGq4ssEVG5pvhtV6UFLJW011s4?metadata-video-title=kling_20260907_VIDEO_10_12_seco_5676_0&video-title=kling_20260907_VIDEO_10_12_seco_5676_0'
              title='Implementation insight video'
              className='block h-full w-full border-0'
              allow='autoplay; encrypted-media; picture-in-picture; fullscreen'
              allowFullScreen
            />
          </div>

          <div className='mt-7 flex flex-col gap-5 sm:mt-8 xl:flex-row xl:gap-6'>
            <div className='flex items-start gap-3'>
              <span className='flex p-2 shrink-0 items-center justify-center rounded-full bg-[#f0f3ec] text-[#60734f]'>
                <BookOpen aria-hidden='true' className='size-4' />
              </span>
              <div className='pt-1'>
                <h2 className='text-sm font-semibold'>
                  Implementation insight
                </h2>
                <p className='mt-1 text-xs leading-relaxed text-neutral-600'>
                  Built from guidance used by Base Robotics implementation
                  specialists.
                </p>
              </div>
            </div>
            <div className='flex flex-1 shrink-0 items-start gap-3 border-t pt-5 xl:border-t-0 xl:border-l xl:pt-0 xl:pl-6'>
              <Sparkles
                aria-hidden='true'
                className='mt-1 size-4 shrink-0 text-[#60734f]'
                strokeWidth={1.8}
              />
              <p className='text-xs leading-relaxed text-neutral-600'>
                AI-generated briefing based on insights from our subject-matter
                experts.
              </p>
            </div>
          </div>
        </section>

        <aside
          aria-labelledby='principles-heading'
          className='rounded-2xl bg-neutral-50 p-4'
        >
          <h2 id='principles-heading' className='font-semibold tracking-tight'>
            What matters most
          </h2>
          <p className='mt-1.5 text-sm text-neutral-600'>
            Three principles guide a successful rollout in operations like
            yours.
          </p>
          <ul className='mt-7 space-y-8 bg-white p-2 rounded-sm'>
            {principles.map(({ icon: Icon, title, description }) => (
              <li key={title} className='flex items-start gap-4'>
                <span className='flex p-2 shrink-0 items-center justify-center rounded-full bg-[#f0f3ec] text-[#60734f]'>
                  <Icon
                    aria-hidden='true'
                    className='size-4'
                    strokeWidth={1.8}
                  />
                </span>
                <div className='min-w-0 pt-1'>
                  <h3 className='leading-snug font-medium text-sm'>{title}</h3>
                  <p className='mt-1 text-xs leading-relaxed text-neutral-500'>
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <nav
        aria-label='Journey navigation'
        className='mt-12 flex items-center justify-between gap-3 border-t pt-6 sm:mt-20'
      >
        <Button variant='ghost' onClick={onBack}>
          <ArrowLeft aria-hidden='true' className='size-4' />
          Back
        </Button>
        <Button onClick={onContinue}>
          Continue to next step
          <ArrowRight aria-hidden='true' className='size-4' />
        </Button>
      </nav>
    </div>
  );
}
