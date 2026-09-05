import { Button } from '@/components/ui/button';

type WelcomeProps = {
  onStart: () => void;
};

function Welcome({ onStart }: WelcomeProps) {
  return (
    <div className='mx-auto mt-32 max-w-2xl text-center text-pretty sm:mt-40 md:mt-48'>
      <h1 className='text-xl font-semibold'>
        Start with what you need to understand.
      </h1>
      <p className='mx-auto mt-2 text-neutral-500'>
        Choose what matters most, and we'll guide you through how Base Robotics
        could work in your operation.
      </p>
      <Button className='my-6 min-w-24' onClick={onStart}>
        Explore
      </Button>
      <div className='text-center space-x-1 text-neutral-500'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
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
