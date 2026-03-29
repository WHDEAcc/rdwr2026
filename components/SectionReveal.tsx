import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
}

// SSR-safe synchronous mobile detection
const getIsMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

export const SectionReveal: React.FC<SectionRevealProps> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = getIsMobile(); // Sync — no useEffect delay

  const isInView = useInView(ref, {
    once: true,
    margin: isMobile ? '0px 0px' : '-80px 0px',
  });

  // Use opacity+translateY for ALL devices (universally compatible)
  // Desktop additionally gets clipPath for the dramatic curtain effect
  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={
          isMobile
            ? { opacity: 0, y: 30 }
            : { opacity: 0, clipPath: 'inset(100% 0 0 0)' }
        }
        animate={
          isInView
            ? isMobile
              ? { opacity: 1, y: 0 }
              : { opacity: 1, clipPath: 'inset(0% 0 0 0)' }
            : undefined
        }
        transition={{
          duration: isMobile ? 0.5 : 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
