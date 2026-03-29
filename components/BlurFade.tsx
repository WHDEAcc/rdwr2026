import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BlurFadeProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

// SSR-safe synchronous mobile detection
const getIsMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

export const BlurFade: React.FC<BlurFadeProps> = ({ children, delay = 0, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = getIsMobile(); // Sync — no useEffect delay

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Mobile: skip blur filter entirely (GPU perf issue on iOS Safari)
  // Use opacity + translateY only — works everywhere
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: isMobile ? 0.4 : 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};
