import React, { useEffect } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { FloatingShapes } from './fx/FloatingShapes';
import { useLanguage } from '../i18n/LanguageContext';

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 0.92]);
  const blur = useTransform(scrollY, [0, 500], ['blur(0px)', 'blur(8px)']);
  const { t } = useLanguage();

  // Subtle 3D tilt of the whole hero block following the cursor
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const rotateX = useTransform(smy, [-1, 1], [4, -4]);
  const rotateY = useTransform(smx, [-1, 1], [-4, 4]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  const line = (delay: number) => ({
    initial: { opacity: 0, y: 50, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 1.1, delay, ease },
  });

  return (
    <section className="relative h-screen min-h-[640px] w-full flex items-center justify-center overflow-hidden">
      <FloatingShapes />

      {/* Spotlight glow behind the headline */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] bg-brand-accent/15 dark:bg-brand-accent/20 blur-[140px] rounded-full pointer-events-none" />

      {/* Content */}
      <motion.div
        style={{ opacity, y, scale, filter: blur, rotateX, rotateY, transformPerspective: 1200 }}
        className="relative z-20 max-w-5xl mx-auto px-6 text-center pt-20 will-change-transform"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease }}
        >
          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-brand-accent/50 bg-brand-accent/10 text-brand-accent text-sm font-medium mb-8 backdrop-blur-md shadow-[0_0_30px_rgba(59,130,246,0.25)] conic-border">
            <Sparkles className="w-4 h-4" />
            {t('hero.tag')}
          </span>
        </motion.div>

        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-8 leading-[1.3]">
          <motion.span {...line(0.4)} className="block">
            {t('hero.h1_1')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-sky-400 to-brand-accent text-shimmer">{t('hero.h1_growth')}</span>
            {t('hero.h1_2')}
          </motion.span>
          <motion.span {...line(0.55)} className="block">
            {t('hero.h1_precap')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-amber-300 to-brand-gold text-shimmer">{t('hero.h1_capability')}</span>
            {t('hero.h1_3')}
          </motion.span>
          <motion.span {...line(0.7)} className="block">
            {t('hero.h1_preimp')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-emerald-300 to-green-500 text-shimmer">{t('hero.h1_impact')}</span>
            {t('hero.h1_4')}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.9, ease }}
          className="text-base md:text-lg text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-10"
          dangerouslySetInnerHTML={{ __html: t('hero.desc') }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent via-purple-500 to-brand-gold rounded-full blur-md opacity-50 group-hover:opacity-90 transition duration-1000 group-hover:duration-200 animate-pulse" />
            <MagneticButton className="px-8 py-4 text-lg">
              {t('hero.btn1')}
            </MagneticButton>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 text-slate-700 dark:text-white font-medium hover:text-brand-accent transition-colors group"
          >
            <div className="relative w-12 h-12 rounded-full border border-slate-300 dark:border-white/30 flex items-center justify-center group-hover:border-brand-accent group-hover:bg-brand-accent/10 transition-all">
              <span className="absolute inset-0 rounded-full border border-brand-accent/60 opacity-0 group-hover:opacity-100 group-hover:animate-pulse-ring" />
              <Play className="w-5 h-5 ml-1" />
            </div>
            {t('hero.btn2')}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Bottom fade into the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none z-10" />
    </section>
  );
}
