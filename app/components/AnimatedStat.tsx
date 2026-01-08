'use client';

import { useCountUp } from '../hooks/useCountUp';

interface AnimatedStatProps {
  value: string;
  label: string;
  color: 'teal' | 'green';
  delay?: number;
}

export default function AnimatedStat({ value, label, color, delay = 0 }: AnimatedStatProps) {
  // Extract number from value string (e.g., "10+" -> 10, "20M" -> 20, "49%" -> 49)
  const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  const { count, ref } = useCountUp(numericValue, 2000 + delay * 200);

  const colorClasses = color === 'teal'
    ? 'text-[#00A89D]'
    : 'text-[#31871B]';

  return (
    <div
      ref={ref}
      className="flex flex-col gap-2 opacity-0 translate-y-4 animate-fade-in-up"
      style={{
        animationDelay: `${delay * 100}ms`,
        animationFillMode: 'forwards'
      }}
    >
      <p className={`${colorClasses} font-montserrat text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight`}>
        {count}{suffix}
      </p>
      <p className={`${colorClasses} font-openSans ${color === 'teal' ? 'text-sm md:text-base' : 'text-xs md:text-sm'} font-normal leading-tight`}>
        {label}
      </p>
    </div>
  );
}
