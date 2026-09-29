import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Splash() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080b12]"
        >
          {/* Animated Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
            <motion.img 
              src="/logo.png" 
              alt="PLDC Logo" 
              className="w-48 h-auto md:w-64 drop-shadow-2xl brightness-0 invert"
              animate={{ 
                y: [0, -10, 0],
                filter: ["drop-shadow(0px 0px 0px rgba(59, 130, 246, 0))", "drop-shadow(0px 0px 20px rgba(59, 130, 246, 0.5))", "drop-shadow(0px 0px 0px rgba(59, 130, 246, 0))"]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            
            {/* Loading Bar */}
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden relative">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="absolute top-0 left-0 h-full bg-brand-accent rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
