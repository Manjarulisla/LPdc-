import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Clock, Users, Briefcase, HeartHandshake } from 'lucide-react';
import { TiltCard } from './fx/TiltCard';
import { useLanguage } from '../i18n/LanguageContext';

function Counter({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const animate = (time: number) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / (duration * 1000), 1);
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeProgress * end));
        if (progress < 1) requestAnimationFrame(animate);
        else setCount(end);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/50 drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  { value: 10000, suffix: '+', key: 'impact.hours', icon: Clock, color: 'from-brand-accent to-sky-400' },
  { value: 50, suffix: '+', key: 'impact.mentors', icon: Users, color: 'from-purple-500 to-fuchsia-400' },
  { value: 5000, suffix: '+', key: 'impact.pros', icon: Briefcase, color: 'from-brand-gold to-amber-300' },
  { value: 1, suffix: 'M+', key: 'impact.lives', icon: HeartHandshake, color: 'from-emerald-500 to-green-300' },
];

export function ImpactCounters() {
  const ref = useRef(null);
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const glowX = useTransform(scrollYProgress, [0, 1], ['-20%', '120%']);

  return (
    <section ref={ref} id="impact" className="relative py-32 overflow-hidden bg-transparent">
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-50">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2940&auto=format&fit=crop"
          alt="Networking"
          className="w-full h-[150%] object-cover -translate-y-[20%]"
        />
      </motion.div>

      {/* Sweeping light beam that moves across as you scroll */}
      <motion.div
        aria-hidden
        style={{ left: glowX }}
        className="absolute top-0 bottom-0 w-[30%] bg-gradient-to-r from-transparent via-brand-accent/25 to-transparent blur-3xl skew-x-12 z-[1] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center perspective-1000"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.key}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.9 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <TiltCard
                intensity={12}
                className="group flex flex-col items-center justify-center p-8 rounded-3xl glass bg-black/30 dark:bg-black/40 hover:bg-black/40 border-white/10 transition-colors overflow-hidden h-full"
              >
                {/* Corner glow */}
                <div className={`absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br ${stat.color} opacity-20 group-hover:opacity-50 blur-2xl transition-opacity duration-500`} />

                <div
                  style={{ transform: 'translateZ(40px)' }}
                  className={`w-14 h-14 mb-5 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="w-7 h-7" />
                </div>
                <div style={{ transform: 'translateZ(30px)' }}>
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <p style={{ transform: 'translateZ(20px)' }} className="mt-4 text-lg text-brand-accent font-medium">
                  {t(stat.key)}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
