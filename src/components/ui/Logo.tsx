import Image from 'next/image';

interface LogoProps {
  /**
   * 'full': emblem + PHARNEECHAR text (+ optional tagline)
   * 'mark': just the iconic P-chair monogram emblem
   * 'image': the 3D first logo image from the brand presentation
   */
  variant?: 'full' | 'mark' | 'image';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  theme?: 'dark' | 'light';
}

export function PharneecharEmblem({
  className = 'h-8 w-8',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Vertical stem of P */}
      <line
        x1="22"
        y1="12"
        x2="22"
        y2="108"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Outer loop of P */}
      <path
        d="M22 14 H 58 C 82 14, 84 60, 58 60"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Pendant lamp hanging inside loop */}
      <line
        x1="50"
        y1="16"
        x2="50"
        y2="38"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      {/* Lamp shade */}
      <path
        d="M43 45 L 50 38 L 57 45 Z"
        fill="currentColor"
      />
      <ellipse
        cx="50"
        cy="45"
        rx="7"
        ry="2.2"
        fill="currentColor"
      />

      {/* Modern lounge chair backrest */}
      <line
        x1="30"
        y1="64"
        x2="42"
        y2="82"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
      />

      {/* Chair seat cushion */}
      <rect
        x="38"
        y="82"
        width="46"
        height="7.5"
        rx="3.5"
        fill="currentColor"
      />

      {/* Chair legs (front and back angled legs) */}
      <line
        x1="43"
        y1="89.5"
        x2="35"
        y2="108"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <line
        x1="78"
        y1="89.5"
        x2="85"
        y2="108"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Logo({
  variant = 'full',
  size = 'md',
  showTagline = false,
  className = '',
  theme = 'light',
}: LogoProps) {
  if (variant === 'image') {
    const imgSizes = {
      sm: { width: 120, height: 72 },
      md: { width: 180, height: 109 },
      lg: { width: 260, height: 157 },
      xl: { width: 360, height: 218 },
    };
    const s = imgSizes[size] || imgSizes.md;

    return (
      <div className={`overflow-hidden rounded-lg shadow-sm ${className}`}>
        <Image
          src="/images/general/pharneechar-logo-first.jpg"
          alt="Pharneechar — Crafted Spaces. Timeless Stories."
          width={s.width}
          height={s.height}
          className="h-auto w-full object-cover"
          priority
        />
      </div>
    );
  }

  const emblemSizes = {
    sm: 'h-5 w-5 sm:h-6 sm:w-6',
    md: 'h-7 w-7 sm:h-8 sm:w-8',
    lg: 'h-9 w-9 sm:h-10 sm:w-10',
    xl: 'h-11 w-11 sm:h-14 sm:w-14',
  };

  const textSizes = {
    sm: 'text-xs min-[360px]:text-sm sm:text-base tracking-[0.1em] sm:tracking-[0.14em]',
    md: 'text-sm min-[360px]:text-base sm:text-lg md:text-xl tracking-[0.1em] sm:tracking-[0.15em]',
    lg: 'text-xl sm:text-2xl tracking-[0.12em] sm:tracking-[0.16em]',
    xl: 'text-2xl sm:text-3xl tracking-[0.14em] sm:tracking-[0.18em]',
  };

  const isDark = theme === 'dark';
  const textColor = isDark ? 'text-white' : 'text-primary-900';
  const emblemColor = isDark ? 'text-accent-400' : 'text-accent-500';
  const taglineColor = isDark ? 'text-neutral-400' : 'text-neutral-500';

  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <PharneecharEmblem className={`${emblemSizes[size]} ${emblemColor}`} />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 sm:gap-3 ${className}`}>
      <PharneecharEmblem className={`${emblemSizes[size]} ${emblemColor} shrink-0`} />
      <div className="flex flex-col">
        <span className={`font-bold font-sans uppercase leading-none whitespace-nowrap ${textSizes[size]} ${textColor}`}>
          PHΛRNEECHAR
        </span>
        {showTagline && (
          <span className={`mt-1 text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.2em] font-medium leading-none ${taglineColor}`}>
            Crafted Spaces. Timeless Stories.
          </span>
        )}
      </div>
    </div>
  );
}
