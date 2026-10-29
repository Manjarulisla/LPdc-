import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, TrendingUp, Network, Globe } from 'lucide-react';
import { cn } from '../lib/utils';
import { Reveal, RevealText } from './fx/Reveal';
import { useLanguage } from '../i18n/LanguageContext';

const steps = [
  {
    id: 'learn',
    icon: BookOpen,
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2940&auto=format&fit=crop',
    color: 'from-blue-500/20 to-blue-500/5',
    glow: 'rgba(59,130,246,0.55)',
  },
  {
    id: 'grow',
    icon: TrendingUp,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop',
    color: 'from-purple-500/20 to-purple-500/5',
    glow: 'rgba(168,85,247,0.55)',
  },
  {
    id: 'connect',
    icon: Network,
    image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2940&auto=format&fit=crop',
    color: 'from-brand-accent/20 to-brand-accent/5',
    glow: 'rgba(14,165,233,0.55)',
  },
  {
    id: 'contribute',
    icon: Globe,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2869&auto=format&fit=crop',
    color: 'from-brand-gold/20 to-brand-gold/5',
    glow: 'rgba(234,179,8,0.55)',
  },
];

export function Pathway() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const pathLength = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section ref={ref} id="pathway" className="py-32 bg-white/40 dark:bg-black/40 backdrop-blur-sm relative overflow-hidden">
      {/* Animated journey line drawn as you scroll */}
      <motion.svg
        aria-hidden
        style={{ y: bgY }}
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 w-full h-full opacity-60 pointer-events-none"
      >
        <defs>
          <linearGradient id="pathGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>
        </defs>
        <motion.path
          d="M -50 320 C 200 320, 250 80, 480 110 S 760 330, 980 240 S 1300 40, 1500 120"
          fill="none"
          stroke="url(#pathGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1 14"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength }}
        />
        <motion.path
          d="M -50 320 C 200 320, 250 80, 480 110 S 760 330, 980 240 S 1300 40, 1500 120"
          fill="none"
          stroke="url(#pathGrad)"
          strokeWidth="1.5"
          strokeOpacity="0.35"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength }}
        />
      </motion.svg>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <RevealText
            as="h2"
            text={t('pathway.title')}
            className="text-4xl md:text-5xl font-bold mb-6"
          />
          <Reveal delay={0.2}>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {t('pathway.desc')}
            </p>
          </Reveal>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className="flex flex-col md:flex-row gap-4 h-auto md:h-[500px]"
        >
          {steps.map((step, i) => {
            const isHovered = hoveredId === step.id;
            const isOtherHovered = hoveredId !== null && !isHovered;

            return (
              <motion.div
                key={step.id}
                variants={{
                  hidden: { opacity: 0, y: 60, rotateX: -15, filter: 'blur(10px)' },
                  show: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
                }}
                onMouseEnter={() => setHoveredId(step.id)}
                onMouseLeave={() => setHoveredId(null)}
                layout
                style={{ boxShadow: isHovered ? `0 0 60px -10px ${step.glow}` : '0 0 0px transparent' }}
                className={cn(
                  'relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out border border-black/5 dark:border-white/10 sheen',
                  'flex-1 md:min-w-[100px] h-[250px] md:h-full',
                  isHovered ? 'md:flex-[3]' : isOtherHovered ? 'md:flex-[0.5] opacity-50 grayscale-[50%]' : 'md:flex-1'
                )}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                  style={{ backgroundImage: `url(${step.image})`, transform: isHovered ? 'scale(1.08)' : 'scale(1)' }}
                />

                {/* Overlay gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                <div className={cn('absolute inset-0 bg-gradient-to-br z-10 opacity-60 transition-opacity duration-300', step.color, isHovered ? 'opacity-40' : '')} />

                {/* Step number */}
                <span className="absolute top-6 left-6 z-20 text-white/40 font-bold text-sm tracking-[0.3em]">
                  0{i + 1}
                </span>

                {/* Content */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      animate={isHovered ? { rotate: [0, -10, 10, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className={cn('w-12 h-12 rounded-full glass flex items-center justify-center transition-all duration-300', isHovered ? 'bg-brand-accent border-brand-accent shadow-[0_0_25px_rgba(59,130,246,0.7)]' : '')}
                    >
                      <step.icon className={cn('w-6 h-6', isHovered ? 'text-white' : 'text-white/80')} />
                    </motion.div>
                    <h3 className={cn('text-2xl font-bold text-white transition-all duration-300 whitespace-nowrap', !isHovered && hoveredId !== null ? 'md:opacity-0' : 'opacity-100')}>
                      {t(`pathway.${step.id}`)}
                    </h3>
                  </div>

                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-500 ease-in-out',
                      isHovered ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0 md:max-h-24 md:opacity-100 md:h-auto md:block hidden'
                    )}
                  >
                    <p className="text-white/80 text-lg md:whitespace-nowrap">
                      {t(`pathway.${step.id}.desc`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
