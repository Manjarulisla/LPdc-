import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

interface MarqueeProps {
  items: string[];
  className?: string;
  reverse?: boolean;
}

/** Infinite horizontal ticker. The list is duplicated so the loop is seamless. */
export function Marquee({ items, className, reverse = false }: MarqueeProps) {
  const row = [...items, ...items];
  return (
    <div className={cn('relative w-full overflow-hidden mask-fade-x py-6', className)}>
      <div
        className="flex w-max gap-10 whitespace-nowrap animate-marquee"
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        {row.map((item, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="text-xl md:text-2xl font-semibold tracking-wide text-slate-500/70 dark:text-white/40 hover:text-brand-accent transition-colors">
              {item}
            </span>
            <Sparkles className="w-4 h-4 text-brand-gold/70" />
          </div>
        ))}
      </div>
    </div>
  );
}
