import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">


      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 max-w-5xl mx-auto px-6 text-center pt-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block py-1 px-3 rounded-full border border-brand-accent/50 bg-brand-accent/10 text-brand-accent text-sm font-medium mb-6 backdrop-blur-md">
            Learn. Grow. Connect. Contribute.
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-8 leading-tight"
        >
          Transform Learning into <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-blue-500 dark:to-blue-300">Growth</span>, <br className="hidden md:block" />
          Growth into <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-500 dark:to-yellow-200">Capability</span>, <br className="hidden md:block" />
          Capability into <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-400">Impact</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-lg text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-10"
        >
          <strong>PLDC (Professional Learning & Development Center)</strong> is a platform for individuals who aspire to grow beyond conventional boundaries—personally, professionally, and socially. We bring together thought-provoking insights, meaningful networks, practical knowledge, and proven actionable solutions to help you unlock your potential, advance your career, and create positive impact in society.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-brand-accent rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <MagneticButton className="px-8 py-4 text-lg">
              Find Your Growth Path
            </MagneticButton>
          </div>
          
          <button className="flex items-center gap-3 text-slate-700 dark:text-white font-medium hover:text-brand-accent transition-colors group">
            <div className="w-12 h-12 rounded-full border border-slate-300 dark:border-white/30 flex items-center justify-center group-hover:border-brand-accent group-hover:bg-brand-accent/10 transition-all">
              <Play className="w-5 h-5 ml-1" />
            </div>
            Explore the Platform
          </button>
        </motion.div>
      </motion.div>

    </section>
  );
}
