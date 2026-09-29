import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { useLanguage } from '../i18n/LanguageContext';

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const { t } = useLanguage();

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
            {t('hero.tag')}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-8 leading-tight"
        >
          {t('hero.h1_1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-blue-500 dark:to-blue-300">{t('hero.h1_growth')}</span>
          {t('hero.h1_2').includes('\n') && <br className="hidden md:block" />}
          {t('hero.h1_2').replace('\n', '')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-500 dark:to-yellow-200">{t('hero.h1_capability')}</span>
          {t('hero.h1_3').includes('\n') && <br className="hidden md:block" />}
          {t('hero.h1_3').replace('\n', '')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-400">{t('hero.h1_impact')}</span>{t('hero.h1_4')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-lg text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-10"
          dangerouslySetInnerHTML={{ __html: t('hero.desc') }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-brand-accent rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <MagneticButton className="px-8 py-4 text-lg">
              {t('hero.btn1')}
            </MagneticButton>
          </div>
          
          <button className="flex items-center gap-3 text-slate-700 dark:text-white font-medium hover:text-brand-accent transition-colors group">
            <div className="w-12 h-12 rounded-full border border-slate-300 dark:border-white/30 flex items-center justify-center group-hover:border-brand-accent group-hover:bg-brand-accent/10 transition-all">
              <Play className="w-5 h-5 ml-1" />
            </div>
            {t('hero.btn2')}
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
