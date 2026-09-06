import { useId, type ReactNode } from 'react';
import { Radio } from '@base-ui/react/radio';

interface RadioCardProps {
  value: string;
  title: string;
  description: string;
  pill?: string;
  disabled?: boolean;
  children: ReactNode;
  onActiveChange?: (active: boolean) => void;
}

export default function RadioCard({
  value,
  title,
  description,
  pill,
  disabled = false,
  children,
  onActiveChange,
}: RadioCardProps) {
  const id = useId();

  return (
    <label
      htmlFor={id}
      onMouseEnter={() => !disabled && onActiveChange?.(true)}
      onMouseLeave={() => onActiveChange?.(false)}
      onFocus={() => !disabled && onActiveChange?.(true)}
      onBlur={() => onActiveChange?.(false)}
      className={`flex flex-col gap-4 rounded-3xl border border-[#e5e5ea] bg-white p-2 text-[#25262b] has-data-checked:border-[#8a9677] has-data-checked:ring-1 has-data-checked:ring-[#e0e8d4] has-focus-visible:outline-2 has-focus-visible:outline-offset-4 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer transition-[border-color,box-shadow] duration-150 ease-out hover:border-[#b8beae] hover:shadow-sm hover:has-data-checked:border-[#8a9677] motion-reduce:transition-none'}`}
    >
      <div className='relative grid aspect-[1.45] place-items-center overflow-hidden rounded-[18px] bg-[#f0eff3]'>
        <div className={`grid size-full place-items-center ${disabled ? 'opacity-55' : ''}`}>
          {children}
        </div>
        {disabled && (
          <span
            id={`${id}-availability`}
            className='absolute bottom-3 left-3 rounded-lg bg-white/90 px-2 py-1 text-xs font-medium text-[#656570]'
          >
            Not available in this demo
          </span>
        )}
        <div className='absolute top-3 left-2 right-2 flex items-center justify-between gap-2'>
          {pill && (
            <span
              className={`rounded-lg px-2 py-1 text-xs font-medium ${disabled ? 'bg-white/70 text-[#73737e]' : 'bg-[#25262b] text-white'}`}
            >
              {pill}
            </span>
          )}
          <Radio.Root
            id={id}
            value={value}
            disabled={disabled}
            aria-labelledby={`${id}-title`}
            aria-describedby={`${id}-description${disabled ? ` ${id}-availability` : ''}`}
            className='sr-only'
          />
        </div>
      </div>
      <div className='flex items-start justify-between gap-3'>
        <span
          id={`${id}-title`}
          className={`text-lg leading-7 font-medium tracking-tight ${disabled ? 'text-[#73737e]' : ''}`}
        >
          {title}
        </span>
      </div>
      <p
        id={`${id}-description`}
        className='mb-2 text-sm leading-relaxed text-[#737373]'
      >
        {description}
      </p>
    </label>
  );
}
