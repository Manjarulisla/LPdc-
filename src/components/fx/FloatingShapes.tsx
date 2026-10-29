import React from 'react';
import { motion } from 'framer-motion';

/**
 * Decorative hero graphics: two slowly counter-rotating orbit rings with
 * glowing satellites, plus a few floating glass shapes.
 */
export function FloatingShapes() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Orbit rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vmin] h-[70vmin] md:w-[90vmin] md:h-[90vmin]">
        <div className="absolute inset-0 rounded-full border border-brand-accent/20 dark:border-brand-accent/25 animate-spin-slow">
          <span className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-brand-accent shadow-[0_0_20px_6px_rgba(59,130,246,0.45)]" />
          <span className="absolute top-1/2 -right-1.5 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_16px_4px_rgba(168,85,247,0.4)]" />
        </div>
        <div className="absolute inset-[12%] rounded-full border border-dashed border-brand-gold/30 animate-spin-reverse">
          <span className="absolute -bottom-1.5 left-1/2 w-3 h-3 rounded-full bg-brand-gold shadow-[0_0_20px_6px_rgba(234,179,8,0.45)]" />
        </div>
        <div className="absolute inset-[26%] rounded-full border border-emerald-400/20 animate-spin-slow" style={{ animationDuration: '25s' }}>
          <span className="absolute top-1/2 -left-1 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_14px_4px_rgba(52,211,153,0.4)]" />
        </div>
      </div>

      {/* Floating glass shapes */}
      <motion.div
        animate={{ y: [0, -24, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[18%] left-[8%] w-20 h-20 md:w-28 md:h-28 rounded-3xl glass shadow-xl rotate-12 bg-gradient-to-br from-brand-accent/20 to-transparent"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -12, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-[22%] right-[10%] w-16 h-16 md:w-24 md:h-24 rounded-full glass shadow-xl bg-gradient-to-br from-brand-gold/25 to-transparent"
      />
      <motion.div
        animate={{ y: [0, -16, 0], x: [0, 10, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-[30%] right-[18%] w-10 h-10 md:w-14 md:h-14 rotate-45 glass shadow-lg bg-gradient-to-br from-purple-500/25 to-transparent"
      />
      <motion.div
        animate={{ y: [0, 18, 0], rotate: [45, 60, 45] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute bottom-[18%] left-[16%] w-12 h-12 md:w-16 md:h-16 rounded-2xl glass shadow-lg bg-gradient-to-br from-emerald-400/25 to-transparent"
      />

      {/* Pulsing rings behind the headline */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {[0, 0.8, 1.6].map((d) => (
          <span
            key={d}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-brand-accent/30 animate-pulse-ring"
            style={{ animationDelay: `${d}s` }}
          />
        ))}
      </div>
    </div>
  );
}
