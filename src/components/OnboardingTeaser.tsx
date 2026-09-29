import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from './MagneticButton';
import { Check, ChevronRight } from 'lucide-react';

export function OnboardingTeaser() {
  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const goals = [
    { id: 'leadership', label: 'Leadership Development', icon: '👑' },
    { id: 'networking', label: 'Professional Networking', icon: '🤝' },
    { id: 'skills', label: 'Advanced Skill Building', icon: '⚡' },
    { id: 'impact', label: 'Social Impact', icon: '🌍' },
  ];

  return (
    <section className="py-32 bg-slate-100/10 dark:bg-black/50 backdrop-blur-md relative">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Not sure where to start?</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Let's find the perfect pathway tailored to your professional ambitions.
          </p>
        </motion.div>

        {/* Interactive Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto bg-white/40 dark:bg-black/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 dark:border-white/10 relative overflow-hidden"
        >
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 dark:bg-white/5">
            <motion.div 
              className="h-full bg-brand-accent"
              initial={{ width: '25%' }}
              animate={{ width: step === 1 ? '50%' : '100%' }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold mb-8">What is your primary goal right now?</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {goals.map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => setSelectedGoal(goal.id)}
                      className={`p-4 rounded-xl border-2 text-left flex items-center gap-3 transition-all ${
                        selectedGoal === goal.id
                          ? 'border-brand-accent bg-brand-accent/5 dark:bg-brand-accent/10'
                          : 'border-slate-200 dark:border-white/10 hover:border-brand-accent/50 hover:bg-slate-50 dark:hover:bg-white/5'
                      }`}
                    >
                      <span className="text-2xl">{goal.icon}</span>
                      <span className="font-medium flex-1">{goal.label}</span>
                      {selectedGoal === goal.id && (
                        <Check className="w-5 h-5 text-brand-accent" />
                      )}
                    </button>
                  ))}
                </div>

                <MagneticButton 
                  onClick={() => selectedGoal && setStep(2)}
                  className={`w-full max-w-xs mx-auto ${!selectedGoal ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!selectedGoal}
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </MagneticButton>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="py-8"
              >
                <div className="w-20 h-20 mx-auto bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                  <Check className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Perfect match found.</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                  Based on your goal, we've crafted a customized pathway to accelerate your growth.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <MagneticButton>
                    Take the Full Assessment
                  </MagneticButton>
                  <button 
                    onClick={() => setStep(1)}
                    className="text-sm text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline underline-offset-4"
                  >
                    Start over
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
