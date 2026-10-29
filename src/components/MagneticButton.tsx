import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export function MagneticButton({ children, className, variant = 'primary', ...props }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ripple, setRipple] = useState<{ x: number; y: number; id: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = buttonRef.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.25, y: middleY * 0.25 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = buttonRef.current!.getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top, id: Date.now() });
    props.onClick?.(e);
  };

  const baseClass = 'relative px-6 py-3 rounded-full font-medium transition-colors duration-300 overflow-hidden sheen';
  const variants = {
    primary: 'bg-brand-accent text-white hover:bg-blue-600 shadow-[0_8px_30px_-8px_rgba(59,130,246,0.7)]',
    secondary: 'bg-white text-black hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20',
    outline: 'border border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white',
  };

  return (
    // @ts-ignore
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      whileTap={{ scale: 0.95 }}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(baseClass, variants[variant], className)}
      {...props}
      onClick={handleClick}
    >
      {ripple && (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 8, opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          onAnimationComplete={() => setRipple(null)}
          style={{ left: ripple.x, top: ripple.y }}
          className="absolute w-8 h-8 -ml-4 -mt-4 rounded-full bg-white pointer-events-none"
        />
      )}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
