import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

function Counter({ end, suffix = "", duration = 2 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      
      const animate = (time: number) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / (duration * 1000), 1);
        
        // Easing function: easeOutQuart
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeProgress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  // Format with commas if large number
  const formattedCount = count.toLocaleString();

  return (
    <span ref={ref} className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60">
      {formattedCount}{suffix}
    </span>
  );
}

const stats = [
  { value: 10000, suffix: "+", label: "Hours of Learning" },
  { value: 50, suffix: "+", label: "Expert Mentors" },
  { value: 5000, suffix: "+", label: "Active Professionals" },
  { value: 1, suffix: "M+", label: "Lives Impacted" },
];

export function ImpactCounters() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={ref} id="impact" className="relative py-32 overflow-hidden bg-transparent">
      {/* Parallax Background */}
      <motion.div 
        style={{ y }} 
        className="absolute inset-0 z-0 opacity-40"
      >
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2940&auto=format&fit=crop" 
          alt="Networking" 
          className="w-full h-[150%] object-cover -translate-y-[20%]"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-8 rounded-2xl glass hover:bg-white/10 transition-colors"
            >
              <Counter end={stat.value} suffix={stat.suffix} />
              <p className="mt-4 text-lg text-brand-accent font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
