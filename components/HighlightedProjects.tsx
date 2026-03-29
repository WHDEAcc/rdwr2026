import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTranslatedProjects } from '../hooks/useTranslatedData';
import { Project } from '../types';

interface HighlightedProjectsProps {
  onProjectClick: (project: Project) => void;
}

export const HighlightedProjects: React.FC<HighlightedProjectsProps> = ({ onProjectClick }) => {
  const { t } = useTranslation();
  const projects = useTranslatedProjects();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const hoveredProject = projects.find((p) => p.id === hoveredId);

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="flex w-full justify-between mb-6 md:mb-10">
          <h2 className="text-xs uppercase tracking-[0.3em] text-muted dark:text-white/50">
            {t('disciplines.sectionTitle', 'Highlighted Projects')}
          </h2>
        </div>
      </div>

      <div
        ref={sectionRef}
        className="relative max-w-7xl mx-auto px-8 md:px-16"
        onMouseMove={handleMouseMove}
      >
        <ul>
          {projects.map((project) => (
            <li
              key={project.id}
              className="border-b border-black/10 dark:border-white/10 first:border-t overflow-hidden"
            >
              <button
                className="block relative w-full text-start py-3 md:py-4 bg-transparent cursor-pointer group/row"
                onClick={() => onProjectClick(project)}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Hover color swipe — Sasaki style */}
                <motion.div
                  className="absolute inset-0 bg-black dark:bg-white origin-left pointer-events-none"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredId === project.id ? 1 : 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />

                <div className="relative flex items-baseline gap-4 z-10">
                  <span
                    className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-light transition-colors duration-300 me-3 md:me-4"
                    style={{ color: hoveredId === project.id ? (document.documentElement.classList.contains('dark') ? '#000' : '#fff') : '' }}
                  >
                    {project.title}
                  </span>
                  <span
                    className="text-lg md:text-2xl lg:text-3xl xl:text-4xl font-serif font-light transition-colors duration-300"
                    style={{ color: hoveredId === project.id ? (document.documentElement.classList.contains('dark') ? '#00000080' : '#ffffff80') : '' }}
                  >
                    {project.subtitle}
                  </span>
                </div>

                {/* Location + arrow appear on hover */}
                <motion.div
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex items-center gap-2 pointer-events-none"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: hoveredId === project.id ? 1 : 0, x: hoveredId === project.id ? 0 : -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="text-xs uppercase tracking-[0.2em] font-light" style={{ color: hoveredId === project.id ? (document.documentElement.classList.contains('dark') ? '#000' : '#fff') : '' }}>
                    {project.location ?? ''}
                  </span>
                  <span style={{ color: hoveredId === project.id ? (document.documentElement.classList.contains('dark') ? '#000' : '#fff') : '' }}>→</span>
                </motion.div>
              </button>
            </li>
          ))}
        </ul>

        {/* Mouse-following hover image */}
        <AnimatePresence>
          {hoveredId !== null && hoveredProject && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed z-50 w-[300px] md:w-[400px] aspect-square pointer-events-none hidden md:block tilt-card"
              style={{
                left: mousePos.x + (sectionRef.current?.getBoundingClientRect().left ?? 0) + 20,
                top: mousePos.y + (sectionRef.current?.getBoundingClientRect().top ?? 0) - 200,
                transform: `perspective(800px) rotateX(${((mousePos.y / (sectionRef.current?.getBoundingClientRect().height ?? 1)) - 0.5) * -12}deg) rotateY(${((mousePos.x / (sectionRef.current?.getBoundingClientRect().width ?? 1)) - 0.5) * 12}deg)`,
              }}
            >
              <img
                src={hoveredProject.image}
                alt=""
                className="w-full h-full object-cover"
              />
              {/* Glare overlay */}
              <div
                className="tilt-glare"
                style={{
                  '--glare-x': `${(mousePos.x / (sectionRef.current?.getBoundingClientRect().width ?? 1)) * 100}%`,
                  '--glare-y': `${(mousePos.y / (sectionRef.current?.getBoundingClientRect().height ?? 1)) * 100}%`,
                  opacity: 1,
                } as React.CSSProperties}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
