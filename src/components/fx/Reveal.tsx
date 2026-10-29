import React from 'react';
import { motion, type Variants } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Which direction the element slides in from */
  from?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** Animate once (default) or every time it enters the viewport */
  once?: boolean;
  blur?: boolean;
}

/** Blur-and-slide-in reveal when the element scrolls into view. */
export function Reveal({ children, className, delay = 0, from = 'up', once = true, blur = true }: RevealProps) {
  const offset = { up: { y: 40 }, down: { y: -40 }, left: { x: -40 }, right: { x: 40 }, none: {} }[from];
  return (
    <motion.div
      initial={{ opacity: 0, filter: blur ? 'blur(12px)' : 'blur(0px)', ...offset }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: '60%', rotateX: -40, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease } },
};

interface RevealTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  inView?: boolean;
}

/** Splits text into words and staggers each one in with a 3D flip. */
export function RevealText({ text, className, wordClassName, as = 'span', delay = 0, inView = true }: RevealTextProps) {
  const Tag = motion[as] as any;
  const words = text.split(' ');
  const animProps = inView
    ? { whileInView: 'show', viewport: { once: true, margin: '-60px' } }
    : { animate: 'show' };

  return (
    <Tag
      className={className}
      variants={{ ...containerVariants, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
      initial="hidden"
      {...animProps}
      style={{ perspective: 800 }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span variants={wordVariants} className={`inline-block ${wordClassName ?? ''}`}>
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
