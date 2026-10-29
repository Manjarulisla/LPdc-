import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Layered animated background: drifting aurora blobs with mouse parallax,
 * a slowly panning grid, and a film-grain noise overlay.
 */
export function AuroraBackground() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });

  // Parallax offsets for each layer (px)
  const l1x = useTransform(sx, [-1, 1], [-40, 40]);
  const l1y = useTransform(sy, [-1, 1], [-40, 40]);
  const l2x = useTransform(sx, [-1, 1], [60, -60]);
  const l2y = useTransform(sy, [-1, 1], [60, -60]);
  const l3x = useTransform(sx, [-1, 1], [-25, 25]);
  const l3y = useTransform(sy, [-1, 1], [25, -25]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  return (
    <div className="fixed inset-0 -z-40 overflow-hidden pointer-events-none">
      {/* Aurora blobs */}
      <motion.div
        style={{ x: l1x, y: l1y }}
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full bg-brand-accent/25 dark:bg-brand-accent/20 blur-[120px] animate-aurora mix-blend-multiply dark:mix-blend-screen"
      />
      <motion.div
        style={{ x: l2x, y: l2y }}
        className="absolute top-[30%] -right-[15%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-purple-500/20 dark:bg-purple-500/20 blur-[140px] animate-aurora-slow mix-blend-multiply dark:mix-blend-screen"
      />
      <motion.div
        style={{ x: l3x, y: l3y }}
        className="absolute -bottom-[20%] left-[20%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-brand-gold/20 dark:bg-brand-gold/15 blur-[130px] animate-aurora mix-blend-multiply dark:mix-blend-screen"
        // offset the loop so the three blobs never move in sync
        initial={{ scale: 1.05 }}
      />
      <motion.div
        style={{ x: l1x, y: l2y }}
        className="absolute top-[55%] left-[45%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-emerald-400/15 dark:bg-emerald-400/10 blur-[120px] animate-aurora-slow mix-blend-multiply dark:mix-blend-screen"
      />

      {/* Panning grid, faded toward the edges */}
      <div className="absolute inset-0 bg-grid animate-grid-pan mask-radial-fade opacity-70" />

      {/* Film grain */}
      <div className="absolute inset-0 bg-noise opacity-[0.035] dark:opacity-[0.06] mix-blend-overlay" />
    </div>
  );
}
