import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTranslatedProjects } from '../hooks/useTranslatedData';
import { useDirection } from '../hooks/useDirection';
import { Project } from '../types';

interface DisciplinesListProps {
  onProjectClick: (project: Project) => void;
}

export const DisciplinesList: React.FC<DisciplinesListProps> = ({ onProjectClick }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const { t } = useTranslation();
  const projects = useTranslatedProjects();
  const { isRTL } = useDirection();

  // Group projects by category
  const categoryMap = new Map<string, Project[]>();
  projects.forEach((project) => {
    const existing = categoryMap.get(project.category) || [];
    existing.push(project);
    categoryMap.set(project.category, existing);
  });
  const categories = Array.from(categoryMap.entries());

  // Get first project image for hover preview
  const getHoverImage = (categoryName: string): string | undefined => {
    return categoryMap.get(categoryName)?.[0]?.image;
  };

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };

  return (
    <section id="services" className="py-32 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xs uppercase tracking-[0.3em] text-muted mb-16 dark:text-white/50">
          {t('disciplines.sectionTitle', 'Disciplines')}
        </h2>

        <div className="relative">
          {/* Category List */}
          <div className="relative z-10">
            {categories.map(([categoryName, categoryProjects], i) => (
              <div
                key={categoryName}
                className="border-b border-black/10 dark:border-white/10"
              >
                {/* Category Header */}
                <button
                  className="w-full flex items-center justify-between py-8 md:py-12 group text-start"
                  onClick={() => toggleCategory(categoryName)}
                  onMouseEnter={() => setHoveredCategory(categoryName)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <div className="flex items-baseline gap-6">
                    <span className="text-sm text-muted font-light dark:text-white/50">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className={`text-3xl md:text-5xl lg:text-6xl font-serif font-light ${isRTL ? 'group-hover:-translate-x-4' : 'group-hover:translate-x-4'} transition-transform duration-500 dark:text-white`}>
                        {categoryName}
                      </h3>
                      <span className="text-sm text-muted dark:text-white/40 mt-1 block">
                        {categoryProjects.length} {categoryProjects.length === 1 ? 'project' : 'projects'}
                      </span>
                    </div>
                  </div>
                  <motion.span
                    className="text-xl dark:text-white"
                    animate={{ rotate: expandedCategory === categoryName ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    +
                  </motion.span>
                </button>

                {/* Expanded Project List */}
                <AnimatePresence>
                  {expandedCategory === categoryName && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ps-12 md:ps-16">
                        {categoryProjects.map((project) => (
                          <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="cursor-pointer group/card"
                            onClick={() => onProjectClick(project)}
                          >
                            <div className="aspect-[3/2] overflow-hidden bg-surface dark:bg-white/10 mb-4">
                              <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover grayscale-[0.3] group-hover/card:grayscale-0 transition-all duration-700 group-hover/card:scale-105"
                                loading="lazy"
                              />
                            </div>
                            <h4 className="text-base font-medium text-black dark:text-white mb-1 group-hover/card:text-black/70 dark:group-hover/card:text-white/70 transition-colors">
                              {project.title}
                            </h4>
                            <p className="text-xs text-muted dark:text-white/40">
                              {project.location} · {project.year}
                            </p>
                            {project.subtitle && (
                              <p className="text-sm text-black/60 dark:text-white/50 mt-2 line-clamp-2">
                                {project.subtitle}
                              </p>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Hover Image Reveal (Desktop Only) */}
          <AnimatePresence>
            {hoveredCategory && expandedCategory !== hoveredCategory && getHoverImage(hoveredCategory) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="hidden md:block absolute top-1/2 end-0 -translate-y-1/2 w-[400px] aspect-[4/3] pointer-events-none z-0"
              >
                <img
                  src={getHoverImage(hoveredCategory)}
                  alt=""
                  className="w-full h-full object-cover grayscale opacity-80"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
