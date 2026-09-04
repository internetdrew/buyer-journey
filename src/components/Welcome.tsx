import { Button } from '@/components/ui/button';

function Welcome() {
  return (
    <div className='mx-auto mt-40 max-w-2xl text-center'>
      <h1 className='text-2xl font-semibold'>
        Let&apos;s find what matters to you
      </h1>
      <p className='mx-auto mt-2 max-w-5/6 text-neutral-600'>
        A few quick questions will help us guide you through the parts of Forge
        Robotics most relevant to your operation.
      </p>
      <Button className='mt-6'>Start</Button>
      <div className='text-center space-x-1 mt-4 text-neutral-500'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
          className='size-3 inline-block'
        >
          <rect width='18' height='11' x='3' y='11' rx='2' ry='2' />
          <path d='M7 11V7a5 5 0 0 1 10 0v4' />
        </svg>
        <small>Secure. Private. Built for B2B teams.</small>
      </div>
    </div>
  );
}

export default Welcome;
