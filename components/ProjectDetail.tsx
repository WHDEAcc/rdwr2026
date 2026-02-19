
import React, { useState, useEffect, useCallback } from 'react';
import { Project } from '../types';

interface ProjectDetailProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const allImages = project ? [project.image, ...project.gallery] : [];

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  // Reset index when project changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [project?.id]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose, goNext, goPrev]);

  if (!isOpen || !project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project details`}
      className="fixed inset-0 z-[100] bg-earth/30 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-warmBeige w-full max-w-5xl max-h-[90vh] shadow-2xl rounded-sm overflow-hidden border border-earth/10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-earth px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-warmBeige font-serif text-xl italic">{project.title}</h3>
            <p className="text-warmBeige/50 text-[10px] uppercase tracking-widest">
              {project.location} · {project.year} · {project.scale}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="text-warmBeige/60 hover:text-warmBeige text-3xl cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
          >
            &times;
          </button>
        </div>

        {/* Image carousel */}
        <div className="relative bg-black/5 shrink-0">
          <div className="aspect-[16/9] relative overflow-hidden">
            <img
              src={allImages[currentIndex]}
              alt={`${project.title} - Image ${currentIndex + 1} of ${allImages.length}`}
              className="w-full h-full object-contain bg-black/5"
              loading="lazy"
            />
          </div>

          {/* Nav arrows */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={goPrev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-earth/70 text-warmBeige rounded-full flex items-center justify-center hover:bg-earth transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
              >
                ‹
              </button>
              <button
                onClick={goNext}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-earth/70 text-warmBeige rounded-full flex items-center justify-center hover:bg-earth transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
              >
                ›
              </button>

              {/* Counter */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-earth/70 text-warmBeige px-3 py-1 rounded-full text-xs font-medium tracking-wider">
                {currentIndex + 1} / {allImages.length}
              </div>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {allImages.length > 1 && (
          <div className="flex gap-1.5 px-6 py-3 overflow-x-auto shrink-0 bg-white/50">
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`View image ${i + 1}`}
                className={`shrink-0 w-16 h-10 rounded-sm overflow-hidden cursor-pointer transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage ${
                  i === currentIndex ? 'ring-2 ring-sage opacity-100' : 'opacity-50 hover:opacity-80'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        )}

        {/* Project info */}
        <div className="px-6 py-5 overflow-y-auto">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-sage/20 text-earth px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-sm">
              {project.category}
            </span>
          </div>

          <p className="text-earth/80 text-sm leading-relaxed mb-5">{project.description}</p>

          <h4 className="text-earth font-serif text-lg mb-3">Key Responsibilities</h4>
          <ul className="space-y-2">
            {project.keyResponsibilities.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-earth/70 text-sm leading-relaxed">
                <span className="w-1.5 h-1.5 bg-sage rounded-full mt-2 shrink-0"></span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
