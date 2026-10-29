import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from './MagneticButton';
import { Check, ChevronRight } from 'lucide-react';
import { Reveal, RevealText } from './fx/Reveal';
import { useLanguage } from '../i18n/LanguageContext';

const confettiColors = ['#3b82f6', '#eab308', '#8b5cf6', '#10b981', '#f472b6'];

function ConfettiBurst() {
  const pieces = Array.from({ length: 28 }, (_, i) => {
    const angle = (i / 28) * Math.PI * 2;
    const dist = 90 + Math.random() * 110;
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist - 40,
      rotate: Math.random() * 540 - 270,
      color: confettiColors[i % confettiColors.length],
      size: 6 + Math.random() * 6,
      round: i % 3 === 0,
    };
  });
  return (
    <div aria-hidden className="absolute left-1/2 top-24 pointer-events-none">
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
          animate={{ x: p.x, y: p.y + 120, opacity: 0, scale: 1, rotate: p.rotate }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          style={{ width: p.size, height: p.round ? p.size : p.size * 0.5, background: p.color, borderRadius: p.round ? '50%' : 2 }}
          className="absolute block"
        />
      ))}
    </div>
  );
}

export function OnboardingTeaser() {
  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const { t } = useLanguage();

  const goals = [
    { id: 'leadership', label: t('quiz.g1'), icon: '👑' },
    { id: 'networking', label: t('quiz.g2'), icon: '🤝' },
    { id: 'skills', label: t('quiz.g3'), icon: '⚡' },
    { id: 'impact', label: t('quiz.g4'), icon: '🌍' },
  ];

  return (
    <section className="py-32 bg-white/50 dark:bg-black/50 backdrop-blur-md relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full bg-gradient-to-tr from-brand-accent/10 via-purple-500/10 to-brand-gold/10 blur-3xl animate-aurora pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 text-center relative">
        <div className="mb-12">
          <RevealText as="h2" text={t('quiz.title')} className="text-4xl md:text-5xl font-bold mb-4" />
          <Reveal delay={0.15}>
            <p className="text-lg text-slate-600 dark:text-slate-400">{t('quiz.desc')}</p>
          </Reveal>
        </div>

        {/* Interactive Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 60, rotateX: 12 }}
          whileInView={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformPerspective: 1200 }}
          className="max-w-2xl mx-auto bg-white/70 dark:bg-black/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 dark:border-white/10 relative overflow-hidden conic-border"
        >
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 dark:bg-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-accent via-purple-500 to-brand-gold"
              initial={{ width: '25%' }}
              animate={{ width: step === 1 ? (selectedGoal ? '66%' : '40%') : '100%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 30, filter: 'blur(6px)' }}
                transition={{ duration: 0.35 }}
              >
                <h3 className="text-2xl font-bold mb-8">{t('quiz.q1')}</h3>

                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } } }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
                >
                  {goals.map((goal) => {
                    const selected = selectedGoal === goal.id;
                    return (
                      <motion.button
                        key={goal.id}
                        variants={{ hidden: { opacity: 0, y: 20, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1 } }}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedGoal(goal.id)}
                        className={`relative p-4 rounded-xl border-2 text-left flex items-center gap-3 transition-colors overflow-hidden ${
                          selected
                            ? 'border-brand-accent bg-brand-accent/5 dark:bg-brand-accent/10 shadow-[0_0_30px_rgba(59,130,246,0.25)]'
                            : 'border-slate-200 dark:border-white/10 hover:border-brand-accent/50 hover:bg-slate-50 dark:hover:bg-white/5'
                        }`}
                      >
                        {selected && (
                          <motion.span
                            layoutId="goal-glow"
                            className="absolute inset-0 bg-gradient-to-r from-brand-accent/10 to-transparent"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                        <motion.span
                          animate={selected ? { rotate: [0, -15, 15, 0], scale: [1, 1.3, 1] } : {}}
                          transition={{ duration: 0.5 }}
                          className="text-2xl relative"
                        >
                          {goal.icon}
                        </motion.span>
                        <span className="font-medium flex-1 relative">{goal.label}</span>
                        <AnimatePresence>
                          {selected && (
                            <motion.span
                              initial={{ scale: 0, rotate: -90 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0 }}
                              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                              className="relative"
                            >
                              <Check className="w-5 h-5 text-brand-accent" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    );
                  })}
                </motion.div>

                <MagneticButton
                  onClick={() => selectedGoal && setStep(2)}
                  className={`w-full max-w-xs mx-auto ${!selectedGoal ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!selectedGoal}
                >
                  {t('quiz.continue')} <ChevronRight className="w-4 h-4" />
                </MagneticButton>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 30, filter: 'blur(6px)' }}
                transition={{ duration: 0.35 }}
                className="py-8 relative"
              >
                <ConfettiBurst />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.1 }}
                  className="relative w-20 h-20 mx-auto bg-green-500/10 rounded-full flex items-center justify-center mb-6"
                >
                  <span className="absolute inset-0 rounded-full border-2 border-green-500/50 animate-pulse-ring" />
                  <span className="absolute inset-0 rounded-full border-2 border-green-500/30 animate-pulse-ring" style={{ animationDelay: '0.6s' }} />
                  <motion.div
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                  >
                    <Check className="w-10 h-10 text-green-500" />
                  </motion.div>
                </motion.div>
                <h3 className="text-2xl font-bold mb-4">{t('quiz.match')}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8">{t('quiz.matchDesc')}</p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <MagneticButton>{t('quiz.take')}</MagneticButton>
                  <button
                    onClick={() => { setStep(1); setSelectedGoal(null); }}
                    className="text-sm text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline underline-offset-4"
                  >
                    {t('quiz.startOver')}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
