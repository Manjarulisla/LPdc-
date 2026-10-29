import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Custom cursor: a small dot that tracks the pointer exactly and a glowing
 * ring that trails behind it with a spring. Grows over interactive elements.
 * Only mounts on devices with a fine pointer (mouse / trackpad).
 */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 250, damping: 25, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 250, damping: 25, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add('custom-cursor');

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      setHovering(!!target?.closest('a, button, [role="button"], input, textarea, select, label, .cursor-pointer'));
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      document.documentElement.classList.remove('custom-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Trailing ring / glow */}
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 64 : 36,
          height: hovering ? 64 : 36,
          opacity: pressed ? 0.5 : 1,
          scale: pressed ? 0.85 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border border-brand-accent/70 mix-blend-difference"
      >
        <div className="absolute inset-0 rounded-full bg-brand-accent/20 blur-md" />
      </motion.div>

      {/* Exact dot */}
      <motion.div
        aria-hidden
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hovering ? 0.5 : 1 }}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_12px_rgba(59,130,246,0.9)]"
      />
    </>
  );
}
