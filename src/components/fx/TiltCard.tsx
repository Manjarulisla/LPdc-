import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  /** Max tilt in degrees */
  intensity?: number;
  /** Show the cursor-following spotlight overlay */
  spotlight?: boolean;
}

/**
 * 3D perspective tilt that follows the cursor, with a soft spotlight
 * highlight. Children can use the `translate-z-*` pattern via inline style
 * for extra depth.
 */
export function TiltCard({ children, className, intensity = 10, spotlight = true, style, ...rest }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 200, damping: 20, mass: 0.3 });
  const sy = useSpring(py, { stiffness: 200, damping: 20, mass: 0.3 });

  const rotateX = useTransform(sy, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(sx, [0, 1], [-intensity, intensity]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    px.set(x);
    py.set(y);
    el.style.setProperty('--mouse-x', `${x * 100}%`);
    el.style.setProperty('--mouse-y', `${y * 100}%`);
  };

  const onMouseLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 1000, ...style }}
      className={cn('relative will-change-transform', spotlight && 'spotlight', className)}
      {...(rest as any)}
    >
      {children}
    </motion.div>
  );
}
