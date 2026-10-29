import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin gradient bar at the very top showing scroll progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-brand-accent via-purple-500 to-brand-gold shadow-[0_0_12px_rgba(59,130,246,0.6)]"
    />
  );
}
