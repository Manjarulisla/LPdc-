import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, Network, Globe } from 'lucide-react';
import { cn } from '../lib/utils';

const steps = [
  {
    id: 'learn',
    title: 'Learn',
    description: 'Actionable knowledge.',
    icon: BookOpen,
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2940&auto=format&fit=crop',
    color: 'from-blue-500/20 to-blue-500/5'
  },
  {
    id: 'grow',
    title: 'Grow',
    description: 'Personal & professional advancement.',
    icon: TrendingUp,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop',
    color: 'from-purple-500/20 to-purple-500/5'
  },
  {
    id: 'connect',
    title: 'Connect',
    description: 'Meaningful relationships.',
    icon: Network,
    image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2940&auto=format&fit=crop',
    color: 'from-brand-accent/20 to-brand-accent/5'
  },
  {
    id: 'contribute',
    title: 'Contribute',
    description: 'Positive societal impact.',
    icon: Globe,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2869&auto=format&fit=crop',
    color: 'from-brand-gold/20 to-brand-gold/5'
  }
];

export function Pathway() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="pathway" className="py-32 bg-white/40 dark:bg-black/40 backdrop-blur-sm relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">The PLDC Pathway</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A continuous journey designed to elevate your career, expand your mindset, and amplify your impact on the world.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[500px]">
          {steps.map((step) => {
            const isHovered = hoveredId === step.id;
            const isOtherHovered = hoveredId !== null && !isHovered;
            
            return (
              <motion.div
                key={step.id}
                onMouseEnter={() => setHoveredId(step.id)}
                onMouseLeave={() => setHoveredId(null)}
                layout
                className={cn(
                  "relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out border border-black/5 dark:border-white/10",
                  "flex-1 md:min-w-[100px] h-[250px] md:h-full",
                  isHovered ? "md:flex-[3]" : isOtherHovered ? "md:flex-[0.5] opacity-50 grayscale-[50%]" : "md:flex-1"
                )}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                  style={{ backgroundImage: `url(${step.image})`, transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
                />
                
                {/* Overlay gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                <div className={cn("absolute inset-0 bg-gradient-to-br z-10 opacity-60 transition-opacity duration-300", step.color, isHovered ? "opacity-40" : "")} />

                {/* Content */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={cn("w-12 h-12 rounded-full glass flex items-center justify-center transition-all duration-300", isHovered ? "bg-brand-accent border-brand-accent" : "")}>
                      <step.icon className={cn("w-6 h-6", isHovered ? "text-white" : "text-white/80")} />
                    </div>
                    <h3 className={cn("text-2xl font-bold text-white transition-all duration-300 whitespace-nowrap", !isHovered && hoveredId !== null ? "md:opacity-0" : "opacity-100")}>
                      {step.title}
                    </h3>
                  </div>
                  
                  <div className={cn(
                    "overflow-hidden transition-all duration-500 ease-in-out",
                    isHovered ? "max-h-24 opacity-100" : "max-h-0 opacity-0 md:max-h-24 md:opacity-100 md:h-auto md:block hidden"
                  )}>
                    <p className="text-white/80 text-lg md:whitespace-nowrap">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
