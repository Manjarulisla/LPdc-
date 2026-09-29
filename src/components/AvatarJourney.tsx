import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { User, Briefcase, GraduationCap, Award, Crown } from 'lucide-react';
import { cn } from '../lib/utils';

export function AvatarJourney() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const [levelIndex, setLevelIndex] = useState(0);

  const levels = [
    {
      title: "Beginner",
      subtitle: "Starting the journey",
      icon: User,
      color: "text-slate-400",
      bg: "bg-slate-100 dark:bg-slate-800"
    },
    {
      title: "Apprentice",
      subtitle: "Gaining basic skills",
      icon: GraduationCap,
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
      title: "Professional",
      subtitle: "Applying knowledge",
      icon: Briefcase,
      color: "text-brand-accent",
      bg: "bg-blue-100 dark:bg-brand-accent/20"
    },
    {
      title: "Expert",
      subtitle: "Leading others",
      icon: Award,
      color: "text-purple-500",
      bg: "bg-purple-100 dark:bg-purple-900/30"
    },
    {
      title: "Master",
      subtitle: "Global impact",
      icon: Crown,
      color: "text-brand-gold",
      bg: "bg-yellow-100 dark:bg-yellow-900/30"
    }
  ];

  useEffect(() => {
    return smoothProgress.onChange((latest) => {
      // Map scroll progress (0 to 1) to level index (0 to 4)
      const index = Math.min(Math.floor(latest * 5), 4);
      if (index !== levelIndex) {
        setLevelIndex(index);
      }
    });
  }, [smoothProgress, levelIndex]);

  const currentLevel = levels[levelIndex];
  const Icon = currentLevel.icon;

  // The avatar will move slightly vertically relative to its container to show progress
  const avatarY = useTransform(smoothProgress, [0, 1], ["0%", "80%"]);

  return (
    <div className="fixed right-6 top-1/4 h-1/2 z-40 hidden lg:flex flex-col items-center pointer-events-none">
      {/* Progress Track */}
      <div className="absolute w-1 h-full bg-slate-200 dark:bg-white/10 rounded-full left-1/2 -translate-x-1/2 -z-10">
        <motion.div 
          className="w-full bg-gradient-to-b from-brand-accent to-brand-gold rounded-full"
          style={{ height: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
        />
      </div>

      <motion.div
        style={{ y: avatarY }}
        className="relative flex items-center justify-center w-14 h-14"
      >
        <motion.div
          key={levelIndex}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-black backdrop-blur-md",
            currentLevel.bg
          )}
        >
          <Icon className={cn("w-6 h-6", currentLevel.color)} />
        </motion.div>

        {/* Tooltip */}
        <motion.div
          key={`tooltip-${levelIndex}`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: -20 }}
          className="absolute right-full mr-4 bg-white dark:bg-[#1a2235] px-4 py-2 rounded-xl shadow-xl border border-slate-200 dark:border-white/10 whitespace-nowrap"
        >
          <p className="font-bold text-sm dark:text-white">{currentLevel.title}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{currentLevel.subtitle}</p>
          
          {/* Arrow */}
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white dark:bg-[#1a2235] border-r border-t border-slate-200 dark:border-white/10 rotate-45" />
        </motion.div>
      </motion.div>
    </div>
  );
}
