import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { TiltCard } from './fx/TiltCard';
import { Reveal, RevealText } from './fx/Reveal';
import { useLanguage } from '../i18n/LanguageContext';

const solutions = [
  {
    id: 1,
    key: 's1',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2874&auto=format&fit=crop',
    tags: ['Leadership', 'Strategy'],
    accent: 'from-brand-accent to-sky-400',
  },
  {
    id: 2,
    key: 's2',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2940&auto=format&fit=crop',
    tags: ['Sustainability', 'Impact'],
    accent: 'from-emerald-500 to-green-300',
  },
  {
    id: 3,
    key: 's3',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2940&auto=format&fit=crop',
    tags: ['Networking', 'Communication'],
    accent: 'from-brand-gold to-amber-300',
  },
];

export function Solutions() {
  const { t } = useLanguage();

  return (
    <section id="solutions" className="py-32 bg-white/50 dark:bg-black/60 backdrop-blur-md relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-aurora" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 animate-aurora-slow" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <RevealText as="h2" text={t('solutions.title')} className="text-4xl md:text-5xl font-bold mb-4" />
            <Reveal delay={0.15}>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl">{t('solutions.desc')}</p>
            </Reveal>
          </div>
          <Reveal from="right" delay={0.3}>
            <button className="text-brand-accent font-medium flex items-center gap-2 hover:gap-4 transition-all pb-2 group">
              {t('solutions.viewAll')}
              <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </Reveal>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000"
        >
          {solutions.map((solution) => (
            <motion.div
              key={solution.id}
              variants={{
                hidden: { opacity: 0, y: 70, rotateX: -12, filter: 'blur(8px)' },
                show: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <TiltCard
                intensity={8}
                className="group rounded-3xl overflow-hidden bg-white/60 dark:bg-black/40 backdrop-blur-md border border-white/20 dark:border-white/10 glow-card h-full"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent z-10 transition-colors duration-500" />
                  <div className={`absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent z-10`} />
                  <img
                    src={solution.image}
                    alt={t(`solutions.${solution.key}.title`)}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110 group-hover:rotate-1"
                  />
                  {/* Accent bar */}
                  <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${solution.accent} w-0 group-hover:w-full transition-all duration-700 z-20`} />
                </div>

                {/* Content */}
                <div className="p-8 relative z-20" style={{ transform: 'translateZ(30px)' }}>
                  <div className="flex gap-2 mb-4">
                    {solution.tags.map((tag) => (
                      <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-transparent group-hover:border-brand-accent/40 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-brand-accent transition-colors">{t(`solutions.${solution.key}.title`)}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">{t(`solutions.${solution.key}.desc`)}</p>

                  <div className="flex items-center text-brand-accent font-medium opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                    {t('solutions.explore')} <ArrowUpRight className="w-5 h-5 ml-2" />
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
