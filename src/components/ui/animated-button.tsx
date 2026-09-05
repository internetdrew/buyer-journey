import { useId, type ComponentProps, type Key, type ReactNode } from 'react';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

/* Selection storyboard: the action row and buttons resize with one spring.
 * A replacement label drops in from just above the button while the old label
 * settles out below it. The short travel keeps the interaction responsive.
 */
const BUTTON_MOTION = {
  layout: { type: 'spring' as const, stiffness: 400, damping: 30 },
  content: { type: 'spring' as const, stiffness: 500, damping: 32 },
  hidden: { opacity: 0, y: -9, filter: 'blur(2px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: 7, filter: 'blur(2px)' },
  pressedScale: 0.98,
};

type AnimatedButtonProps = Omit<ComponentProps<typeof Button>, 'children' | 'render' | 'nativeButton'> & {
  label: string;
  icon?: ReactNode;
  /** Override when the icon changes without a corresponding label change. */
  contentKey?: Key;
};

export function AnimatedButton({
  label,
  icon,
  contentKey = label,
  className,
  disabled,
  style,
  'aria-label': accessibleLabel,
  ...props
}: AnimatedButtonProps) {
  const reduceMotion = useReducedMotion();
  const content = <>{label}{icon}</>;

  return (
    <Button
      {...props}
      disabled={disabled}
      aria-label={accessibleLabel ?? label}
      className={cn('relative transition-colors! active:translate-y-0 motion-reduce:transition-none!', className)}
      style={{ borderRadius: 8, ...style }}
      render={
        <motion.button
          layout={!reduceMotion}
          transition={BUTTON_MOTION.layout}
          whileTap={!disabled && !reduceMotion ? { scale: BUTTON_MOTION.pressedScale } : undefined}
        />
      }
    >
      {reduceMotion ? (
        <span aria-hidden='true' className='inline-flex items-center gap-3'>{content}</span>
      ) : (
        <AnimatePresence mode='popLayout' initial={false}>
          <motion.span
            key={contentKey}
            aria-hidden='true'
            className='inline-flex items-center gap-3 whitespace-nowrap'
            layout='position'
            initial={BUTTON_MOTION.hidden}
            animate={BUTTON_MOTION.visible}
            exit={BUTTON_MOTION.exit}
            transition={{ ...BUTTON_MOTION.content, layout: BUTTON_MOTION.layout }}
          >
            {content}
          </motion.span>
        </AnimatePresence>
      )}
    </Button>
  );
}

/** Coordinate neighboring AnimatedButtons as their labels and widths change. */
export function AnimatedButtonGroup({
  children,
  className,
  ...props
}: Omit<ComponentProps<typeof motion.div>, 'layout' | 'transition'>) {
  const id = useId();
  const reduceMotion = useReducedMotion();

  return (
    <LayoutGroup id={id}>
      <motion.div
        {...props}
        layout={!reduceMotion}
        transition={BUTTON_MOTION.layout}
        className={cn('mx-auto flex w-fit items-center justify-center gap-3', className)}
      >
        {children}
      </motion.div>
    </LayoutGroup>
  );
}
