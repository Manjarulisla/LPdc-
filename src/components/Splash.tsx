import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tagline = ['Learn.', 'Grow.', 'Connect.', 'Contribute.'];

export function Splash() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080b12] overflow-hidden"
        >
          {/* Animated backdrop */}
          <div className="absolute inset-0 bg-grid animate-grid-pan mask-radial-fade opacity-40" />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-[60vmin] h-[60vmin] rounded-full bg-brand-accent/30 blur-[100px]"
          />
          <motion.div
            animate={{ scale: [1.2, 0.9, 1.2], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-[40vmin] h-[40vmin] rounded-full bg-brand-gold/25 blur-[90px] translate-x-1/3"
          />

          {/* Orbiting ring */}
          <div className="absolute w-[80vmin] h-[80vmin] rounded-full border border-white/5 animate-spin-slow">
            <span className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_16px_4px_rgba(59,130,246,0.6)]" />
          </div>
          <div className="absolute w-[55vmin] h-[55vmin] rounded-full border border-dashed border-white/10 animate-spin-reverse">
            <span className="absolute -bottom-1 left-1/2 w-2 h-2 rounded-full bg-brand-gold shadow-[0_0_16px_4px_rgba(234,179,8,0.6)]" />
          </div>

          {/* Animated Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative flex flex-col items-center gap-6"
          >
            <motion.img
              src="/logo.png"
              alt="PLDC Logo"
              className="w-48 h-auto md:w-64 drop-shadow-2xl brightness-0 invert"
              animate={{
                y: [0, -10, 0],
                filter: [
                  'brightness(0) invert(1) drop-shadow(0px 0px 0px rgba(59, 130, 246, 0))',
                  'brightness(0) invert(1) drop-shadow(0px 0px 24px rgba(59, 130, 246, 0.7))',
                  'brightness(0) invert(1) drop-shadow(0px 0px 0px rgba(59, 130, 246, 0))',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Tagline, word by word */}
            <div className="flex gap-3 text-white/70 text-sm md:text-base tracking-[0.3em] uppercase">
              {tagline.map((w, i) => (
                <motion.span
                  key={w}
                  initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.6 + i * 0.25, duration: 0.6 }}
                >
                  {w}
                </motion.span>
              ))}
            </div>

            {/* Loading Bar */}
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.3, ease: 'easeInOut' }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-accent via-purple-500 to-brand-gold rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
