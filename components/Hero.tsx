import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTranslatedProjects } from '../hooks/useTranslatedData';
import { useDirection } from '../hooks/useDirection';
import { Project } from '../types';

interface HeroProps {
  onConsultClick: () => void;
  onProjectClick: (project: Project) => void;
}

// Slide dimensions
const ACTIVE_W = 0.52;   // 52vw
const INACTIVE_W = 0.12;  // 12vw
const HOVER_W = 0.20;     // 20vw - when hovering an inactive slide
const ACTIVE_H = 0.62;   // 62vh
const INACTIVE_H = 0.35;  // 35vh
const HOVER_H = 0.45;     // 45vh

const TABLET_ACTIVE_W = 0.60;
const TABLET_INACTIVE_W = 0.15;
const TABLET_ACTIVE_H = 0.50;
const TABLET_INACTIVE_H = 0.30;

const MOBILE_ACTIVE_W = 0.80;
const MOBILE_INACTIVE_W = 0.15;
const MOBILE_ACTIVE_H = 0.40;
const MOBILE_INACTIVE_H = 0.22;

export const Hero: React.FC<HeroProps> = ({ onProjectClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [viewport, setViewport] = useState({ w: typeof window !== 'undefined' ? window.innerWidth : 1440, h: typeof window !== 'undefined' ? window.innerHeight : 900 });
  const { t } = useTranslation();
  const PROJECTS = useTranslatedProjects();
  const { isRTL } = useDirection();

  // Reactive viewport dimensions — handles iPad rotation + resize
  useEffect(() => {
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, []);

  const isMobile = viewport.w < 768;
  const isTablet = viewport.w >= 768 && viewport.w < 1024;
  const vw = viewport.w;
  const vh = viewport.h;

  // Preload ALL slideshow images on mount
  useEffect(() => {
    PROJECTS.forEach((project, i) => {
      const img = new Image();
      img.src = project.image;
      img.onload = () => setLoadedImages((prev) => new Set(prev).add(i));
    });
  }, [PROJECTS]);

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index % PROJECTS.length);
  }, [PROJECTS.length]);

  // Autoplay — stable ref to avoid stale closures
  const countRef = useRef(PROJECTS.length);
  countRef.current = PROJECTS.length;

  useEffect(() => {
    if (isPaused || countRef.current === 0) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % countRef.current);
    }, 3000);
    return () => clearInterval(id);
  }, [isPaused]);

  // Arrow keys
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setActiveIndex((p) => (p + 1) % countRef.current);
      if (e.key === 'ArrowLeft') setActiveIndex((p) => (p - 1 + countRef.current) % countRef.current);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Calculate the translateX needed to center the active slide
  const getTranslateX = useMemo(() => {
    if (PROJECTS.length === 0) return 0;

    const aw = isMobile ? vw * MOBILE_ACTIVE_W : isTablet ? vw * TABLET_ACTIVE_W : vw * ACTIVE_W;
    const iw = isMobile ? vw * MOBILE_INACTIVE_W : isTablet ? vw * TABLET_INACTIVE_W : vw * INACTIVE_W;

    // Position of the left edge of active slide = sum of widths of all slides before it
    const leftEdge = activeIndex * iw;
    // We want the center of the active slide at the center of the viewport
    const centerOffset = leftEdge + aw / 2;
    const tx = vw / 2 - centerOffset;

    return tx;
  }, [activeIndex, PROJECTS.length, isMobile, isTablet, vw]);

  // Get dimensions for a slide based on its state
  const getSlideWidth = (i: number) => {
    if (i === activeIndex) return isMobile ? vw * MOBILE_ACTIVE_W : isTablet ? vw * TABLET_ACTIVE_W : vw * ACTIVE_W;
    if (i === hoveredIndex) return isMobile ? vw * MOBILE_INACTIVE_W : isTablet ? vw * TABLET_INACTIVE_W : vw * HOVER_W;
    return isMobile ? vw * MOBILE_INACTIVE_W : isTablet ? vw * TABLET_INACTIVE_W : vw * INACTIVE_W;
  };

  const getSlideHeight = (i: number) => {
    if (i === activeIndex) return isMobile ? vh * MOBILE_ACTIVE_H : isTablet ? vh * TABLET_ACTIVE_H : vh * ACTIVE_H;
    if (i === hoveredIndex) return isMobile ? vh * MOBILE_INACTIVE_H : isTablet ? vh * TABLET_INACTIVE_H : vh * HOVER_H;
    return isMobile ? vh * MOBILE_INACTIVE_H : isTablet ? vh * TABLET_INACTIVE_H : vh * INACTIVE_H;
  };

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const titleOp = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Split title into individual words for staggered reveal
  const titleLine1 = t('hero.title_line1');
  const titleLine2 = t('hero.title_line2');
  const titleLine3 = t('hero.title_line3');
  const allWords = [...titleLine1.split(' '), ...titleLine2.split(' '), ...titleLine3.split(' ')];

  // Mouse parallax handler for text mask
  const handleHeroMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, []);

  // Current project image for text mask
  const currentMaskImage = PROJECTS[activeIndex]?.image || '';

  return (
    <>
      {/* Part A: Typography Statement */}
      <section ref={heroRef} className="min-h-screen flex flex-col justify-center px-8 md:px-16 pt-24 md:pt-40 relative overflow-hidden" onMouseMove={handleHeroMouseMove}>
        {/* Subtle ambient texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.06]" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundSize: '256px 256px',
        }} />

        <motion.div className="max-w-5xl" style={{ y: titleY, opacity: titleOp }}>
          {/* Text-mask hero: project imagery fills the display-font title */}
          <h1
            className="text-[clamp(2.5rem,8vw,7rem)] leading-[1.05] font-display font-normal tracking-tight text-balance hidden lg:block text-mask"
            style={{
              backgroundImage: `url(${currentMaskImage})`,
              backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
            }}
          >
            {titleLine1} {titleLine2} {titleLine3}
          </h1>
          {/* Mobile fallback: standard serif text */}
          <h1 className="text-[clamp(1.5rem,7vw,3.75rem)] leading-[1.15] font-serif font-light tracking-tight text-primary dark:text-white text-balance lg:hidden">
            {/* Word-by-word staggered reveal */}
            {titleLine1.split(' ').map((word, wi) => (
              <motion.span
                key={`l1-${wi}`}
                className="inline-block me-[0.25em]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: wi * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            ))}
            {' '}
            {titleLine2.split(' ').map((word, wi) => (
              <motion.span
                key={`l2-${wi}`}
                className="inline-block me-[0.25em]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: (titleLine1.split(' ').length + wi) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            ))}
            {' '}
            <em className="font-light italic text-muted dark:text-white/70">
              {titleLine3.split(' ').map((word, wi) => (
                <motion.span
                  key={`l3-${wi}`}
                  className="inline-block me-[0.25em]"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: (titleLine1.split(' ').length + titleLine2.split(' ').length + wi) * 0.08,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </em>
          </h1>
          {/* Slide indicator for text-mask mode */}
          <motion.div
            className="hidden lg:flex items-center gap-3 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: allWords.length * 0.08 + 0.5, duration: 0.6 }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted dark:text-white/40 font-mono">
              {PROJECTS[activeIndex]?.title}
            </span>
            <span className="text-[10px] text-muted dark:text-white/30">
              {String(activeIndex + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: allWords.length * 0.08 + 0.3, duration: 0.8 }}
            className="mt-8 text-lg text-muted dark:text-white/50 max-w-xl font-light leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>
        </motion.div>
      </section>

      {/* Part B: Centered Slideshow */}
      <section
        className="pb-32 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setHoveredIndex(null);
        }}
        onTouchStart={(e) => {
          const touch = e.touches[0];
          (e.currentTarget as any)._touchStartX = touch.clientX;
        }}
        onTouchEnd={(e) => {
          const startX = (e.currentTarget as any)._touchStartX;
          if (startX === undefined) return;
          const endX = e.changedTouches[0].clientX;
          const diff = startX - endX;
          if (Math.abs(diff) > 50) {
            if (diff > 0 && activeIndex < PROJECTS.length - 1) {
              goToSlide(activeIndex + 1);
            } else if (diff < 0 && activeIndex > 0) {
              goToSlide(activeIndex - 1);
            }
          }
        }}
      >
        {/* Sliding strip — translateX centers the active slide */}
        <motion.div
          className="flex items-end"
          animate={{ x: getTranslateX }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: 'transform' }}
        >
          {PROJECTS.map((project, i) => {
            const isActive = i === activeIndex;
            const isHovered = i === hoveredIndex && !isActive;

            return (
              <motion.div
                key={project.id}
                className="relative overflow-hidden cursor-pointer shrink-0 bg-black/5 dark:bg-white/5"
                style={{ willChange: 'width, height' }}
                animate={{
                  width: getSlideWidth(i),
                  height: getSlideHeight(i),
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => {
                  if (isActive) {
                    onProjectClick(project);
                  } else {
                    goToSlide(i);
                  }
                }}
                onMouseEnter={() => {
                  if (!isActive) setHoveredIndex(i);
                }}
                onMouseLeave={() => {
                  if (!isActive) setHoveredIndex(null);
                }}
              >
                {/* Image */}
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className={`absolute inset-0 w-full h-full object-cover select-none transition-opacity duration-500 ${loadedImages.has(i) ? 'opacity-100' : 'opacity-0'}`}
                  style={{ pointerEvents: 'none', willChange: 'transform' }}
                  loading="eager"
                  decoding="async"
                  draggable={false}
                  animate={{
                    scale: isActive ? 1 : isHovered ? 1.05 : 1.15,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />

                {/* Dark overlay — less dark when hovered */}
                <motion.div
                  className="absolute inset-0 bg-black pointer-events-none"
                  animate={{
                    opacity: isActive ? 0 : isHovered ? 0.1 : 0.35,
                  }}
                  transition={{ duration: 0.5 }}
                />

                {/* Dark mode extra overlay */}
                <div className="hidden dark:block absolute inset-0 bg-black/10 pointer-events-none" />

                {/* Slide number on inactive */}
                <motion.div
                  className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none"
                  animate={{ opacity: isActive ? 0 : 0.7 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="text-white text-xs tracking-[0.2em] uppercase font-light">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Project info + navigation */}
        <div className="px-8 md:px-16 mt-6 flex justify-between items-start">
          <div className="relative min-h-[60px] flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-base md:text-lg font-light text-primary dark:text-white">
                  {PROJECTS[activeIndex]?.title}
                </p>
                <p className="text-sm text-muted dark:text-white/40 mt-1">
                  {PROJECTS[activeIndex]?.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-6 pt-1">
            <div className="hidden md:flex items-center gap-2">
              {PROJECTS.map((_, i) => (
                <button
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === activeIndex
                      ? 'bg-black dark:bg-white scale-125'
                      : 'bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40'
                    }`}
                  onClick={() => goToSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                className="text-sm text-muted dark:text-white/40 hover:text-primary dark:hover:text-white transition-colors duration-300"
                onClick={() => setActiveIndex((p) => (p - 1 + PROJECTS.length) % PROJECTS.length)}
                aria-label="Previous slide"
              >
                ←
              </button>
              <span className="text-xs text-muted dark:text-white/30 tabular-nums">
                {String(activeIndex + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
              </span>
              <button
                className="text-sm text-muted dark:text-white/40 hover:text-primary dark:hover:text-white transition-colors duration-300"
                onClick={() => setActiveIndex((p) => (p + 1) % PROJECTS.length)}
                aria-label="Next slide"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
