import { useId, type ComponentProps, type Key, type ReactNode } from 'react';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

/* Selection storyboard: the action row and buttons resize with one spring.
 * Labels crossfade through a subtle blur while their positions are corrected.
 */
const BUTTON_MOTION = {
  layout: { type: 'spring' as const, stiffness: 400, damping: 30 },
  content: { duration: 0.18, ease: 'easeOut' as const },
  hidden: { opacity: 0, filter: 'blur(3px)' },
  visible: { opacity: 1, filter: 'blur(0px)' },
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
            exit={BUTTON_MOTION.hidden}
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
