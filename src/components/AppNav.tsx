import { CircleQuestionMark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

function AppNav() {
  return (
    <nav className='flex items-center justify-between py-4'>
      <span className='text-lg font-semibold'>Base Robotics</span>
      <Dialog>
        <DialogTrigger
          aria-label='Why this matters'
          render={<Button variant='ghost' size='icon' />}
        >
          <CircleQuestionMark
            aria-hidden='true'
            className='size-5 text-neutral-600'
            strokeWidth={2}
          />
        </DialogTrigger>
        <DialogContent className='max-h-[calc(100dvh-2rem)] overflow-y-auto p-6 sm:max-w-md sm:p-6'>
          <DialogHeader>
            <DialogTitle>Why this matters</DialogTitle>
            <DialogDescription>
              B2B buyers want to understand as much as they can before talking
              to someone, but the knowledge they need often lives inside the
              company.
            </DialogDescription>
          </DialogHeader>
          <div className='space-y-4 text-sm leading-normal text-muted-foreground'>
            <p>
              <span className='font-medium text-foreground'>
                This is an opportunity to turn that expertise into a guided
                experience
              </span>
              — helping buyers answer the questions that matter, understand how
              you'll execute, and build confidence on their own.
            </p>
            <p>
              And because the decision rarely belongs to one person, that
              understanding can travel across the buying committee.
            </p>
            <p className='font-medium text-foreground'>
              Not more content. More clarity, trust, and confidence to say yes.
            </p>
            <p>
              To make that idea tangible, this demo uses a fictional company,
              Base Robotics, and follows one operational buying path from
              question to confidence.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
}

export default AppNav;
