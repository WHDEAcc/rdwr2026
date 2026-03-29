import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import { useTranslation } from 'react-i18next';

// Progressive image component with placeholder bg + fade-in
const ProgressiveImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = '' }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
      <div className="hidden dark:block absolute inset-0 bg-black/15 pointer-events-none z-10" />
    </>
  );
};

interface ProjectDetailProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, isOpen, onClose }) => {
  const { t } = useTranslation();

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!project) return null;

  const descriptionParagraphs = project.description.split(/\n\n|\n/).filter(p => p.trim() !== '');
  const firstParagraph = descriptionParagraphs[0];
  const secondParagraph = descriptionParagraphs.length > 1 ? descriptionParagraphs.slice(1).join('\n\n') : null;

  const TechDetail = ({ label, value }: { label: string, value: React.ReactNode }) => (
    <div>
      <div className="text-sm text-muted dark:text-white/50 mb-2 uppercase tracking-[0.2em]">{label}</div>
      <div className="text-base font-light text-black dark:text-white">{value}</div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-white dark:bg-[#0a0a0a] overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Close Button - Fixed */}
          <div className="fixed top-0 left-0 right-0 z-10 p-8 flex justify-end pointer-events-none">
            <button
              onClick={onClose}
              className="pointer-events-auto text-sm uppercase tracking-[0.2em] font-light cursor-pointer hover:opacity-70 transition-opacity bg-white/50 dark:bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-black dark:text-white"
              aria-label={t('projectDetail.close', 'Close project detail')}
            >
              {t('projectDetail.close', 'Close')}
            </button>
          </div>

          <main className="w-full pb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {/* Main Grid Container */}
              <div className="grid grid-cols-4 md:grid-cols-12 gap-x-4 md:gap-x-6 px-4 md:px-8 pt-24 md:pt-32">

                {/* Header Area */}
                <div className="col-span-full md:col-span-10 mb-6 md:mb-10">
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-balance text-black dark:text-white">
                    {project.title}
                  </h1>
                </div>

                {/* Metadata Row */}
                <div className="col-span-full md:col-span-4 md:row-start-2 mb-4 md:mb-0 text-lg font-light text-muted dark:text-white/50">
                  {project.year}
                </div>
                <div className="col-span-full md:col-span-8 md:row-start-2 text-lg font-light text-black dark:text-white mb-12 md:mb-20">
                  {project.category}
                </div>

                {/* Hero Image */}
                <div className="col-span-full relative w-full aspect-[5/3] md:aspect-[16/9] overflow-hidden mb-20 md:mb-32 bg-black/5 dark:bg-white/5">
                  <ProgressiveImage src={project.image} alt={project.title} />
                </div>

                {/* Introduction Text */}
                {firstParagraph && (
                  <div className="col-span-full md:col-span-8 md:col-start-5 text-lg md:text-xl font-light leading-relaxed max-w-[60ch] text-black/80 dark:text-white/80">
                    <p>{firstParagraph}</p>
                  </div>
                )}

                {/* Technical Details Grid */}
                <div className="col-span-full md:col-span-8 md:col-start-5 mt-16 md:mt-24 mb-20 md:mb-32">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
                    <TechDetail label={t('projectDetail.category', 'Category')} value={project.category} />
                    <TechDetail label={t('projectDetail.status', 'Status')} value={t('projectDetail.completed', 'Completed')} />
                    <TechDetail label={t('projectDetail.location', 'Location')} value={project.location} />
                    <TechDetail label={t('projectDetail.scale', 'Scale')} value={project.scale} />
                  </div>

                  {project.keyResponsibilities && project.keyResponsibilities.length > 0 && (
                    <div className="mt-12">
                      <div className="text-sm text-muted dark:text-white/50 mb-4 uppercase tracking-[0.2em]">
                        {t('projectDetail.keyResponsibilities', 'Key Responsibilities')}
                      </div>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">
                        {project.keyResponsibilities.map((resp, idx) => (
                          <li key={idx} className="text-base font-light text-black dark:text-white flex items-start gap-2">
                            <span className="w-1 h-1 bg-black/30 dark:bg-white/30 rounded-full mt-2 shrink-0" />
                            <span className="leading-relaxed">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Editorial Gallery Layout Engine */}
                {(() => {
                  const elements = [];
                  let i = 0;
                  const gallery = project.gallery || [];

                  // Pattern A
                  if (i < gallery.length) {
                    elements.push(
                      <div key={`gal-${i}`} className="col-span-full aspect-[4/3] relative w-full overflow-hidden mb-20 md:mb-32 bg-black/5 dark:bg-white/5">
                        <ProgressiveImage src={gallery[i]} alt="" />
                      </div>
                    );
                    i++;
                  }

                  // Pattern B (8+4 Asymmetric)
                  if (i + 1 < gallery.length) {
                    elements.push(
                      <div key={`gal-b-${i}`} className="col-span-full grid grid-cols-4 md:grid-cols-12 gap-x-4 md:gap-x-6 items-end mb-20 md:mb-32">
                        <div className="col-span-full md:col-span-8 aspect-[3/4] relative w-full overflow-hidden mb-4 md:mb-0 bg-black/5 dark:bg-white/5">
                          <ProgressiveImage src={gallery[i]} alt="" />
                        </div>
                        <div className="col-span-full md:col-span-4 aspect-[4/3] relative w-full overflow-hidden bg-black/5 dark:bg-white/5">
                          <ProgressiveImage src={gallery[i+1]} alt="" />
                        </div>
                      </div>
                    );
                    i += 2;
                  }

                  // Pattern C (Text Interstitial)
                  if (secondParagraph) {
                    elements.push(
                      <div key="text-interstitial" className="col-span-full md:col-span-6 md:col-start-7 max-w-[60ch] my-20 md:my-32 text-lg font-light text-black/80 dark:text-white/80">
                        <p className="whitespace-pre-line leading-relaxed">{secondParagraph}</p>
                      </div>
                    );
                  }

                  // Pattern A
                  if (i < gallery.length) {
                    elements.push(
                      <div key={`gal-a2-${i}`} className="col-span-full aspect-[4/3] relative w-full overflow-hidden mb-20 md:mb-32 bg-black/5 dark:bg-white/5">
                        <ProgressiveImage src={gallery[i]} alt="" />
                      </div>
                    );
                    i++;
                  }

                  // Pattern D (4+4+4)
                  if (i + 2 < gallery.length) {
                    elements.push(
                      <div key={`gal-d-${i}`} className="col-span-full grid grid-cols-4 md:grid-cols-12 gap-x-4 md:gap-x-6 mb-20 md:mb-32">
                        {[0, 1, 2].map((offset) => (
                          <div key={offset} className="col-span-full md:col-span-4 aspect-[3/4] md:aspect-square relative w-full overflow-hidden mb-4 md:mb-0 bg-black/5 dark:bg-white/5">
                            <ProgressiveImage src={gallery[i + offset]} alt="" />
                          </div>
                        ))}
                      </div>
                    );
                    i += 3;
                  }

                  // Remaining (Fallback Pattern A)
                  while (i < gallery.length) {
                    elements.push(
                      <div key={`gal-r-${i}`} className="col-span-full aspect-[4/3] relative w-full overflow-hidden mb-20 md:mb-32 bg-black/5 dark:bg-white/5">
                        <ProgressiveImage src={gallery[i]} alt="" />
                      </div>
                    );
                    i++;
                  }

                  return elements;
                })()}

              </div>
            </motion.div>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
