import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-10 md:mb-14',
        align === 'center' && 'text-center',
        className
      )}
    >
      <h2 className="text-3xl font-bold tracking-tight text-primary-800 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-lg text-neutral-500 mx-auto">
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          'mt-4 h-1 w-16 bg-accent-500 rounded-full',
          align === 'center' && 'mx-auto'
        )}
        aria-hidden="true"
      />
    </div>
  );
}
