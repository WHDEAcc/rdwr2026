import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const TEAM_MEMBERS = [
  { id: 'weihao', isFounder: true, image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80' },
  { id: 'novaLin', isFounder: false, image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80' },
  { id: 'axiomK', isFounder: false, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80' },
  { id: 'terraZhang', isFounder: false, image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80' },
  { id: 'vectorWu', isFounder: false, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80' },
  { id: 'pixelChen', isFounder: false, image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80' },
  { id: 'synthWong', isFounder: false, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80' },
  { id: 'atlasFang', isFounder: false, image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=600&q=80' },
];

interface PeopleProps {
  isOpen: boolean;
  onClose: () => void;
}

export const People: React.FC<PeopleProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] bg-white dark:bg-[#0a0a0a] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={t('people.sectionTitle')}
        >
          {/* Header with close button */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-8 md:px-16 py-6 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md">
            <span className="text-lg font-serif tracking-tight text-black dark:text-white">
              EDGE
            </span>
            <button
              onClick={onClose}
              className="text-sm uppercase tracking-[0.2em] font-light cursor-pointer hover:opacity-70 transition-opacity text-black dark:text-white"
              aria-label={t('nav.close')}
            >
              {t('nav.close')}
            </button>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-8 md:px-16 pt-12 pb-32">
            {/* Section Label */}
            <h2 className="text-xs uppercase tracking-[0.3em] text-muted dark:text-white/50 mb-6">
              {t('people.sectionTitle')}
            </h2>

            {/* Section Description */}
            <div className="grid grid-cols-4 md:grid-cols-12 gap-x-4 md:gap-x-6 mb-20 md:mb-32">
              <div className="col-span-full md:col-span-7">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  className="text-2xl md:text-3xl font-serif font-light leading-snug text-black dark:text-white mt-8"
                >
                  {t('people.headline')}
                </motion.p>
              </div>
              <div className="col-span-full md:col-span-4 md:col-start-9 mt-6 md:mt-8">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                  className="text-sm font-light leading-relaxed text-muted dark:text-white/50"
                >
                  {t('people.description')}
                </motion.p>
              </div>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12 md:gap-y-16">
              {TEAM_MEMBERS.map((member, i) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.3 + i * 0.06,
                  }}
                  className="group"
                >
                  {/* Portrait - 3:4 aspect ratio */}
                  <div
                    className="relative w-full overflow-hidden mb-5 bg-neutral-100 dark:bg-neutral-900"
                    style={{ paddingBottom: '133%' }}
                  >
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={t(`people.team.${member.id}.name`)}
                        className="absolute inset-0 w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="w-16 h-16 text-neutral-300 dark:text-neutral-700"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="0.8"
                        >
                          <circle cx="12" cy="8" r="3.5" />
                          <path d="M5.5 21v-1a6.5 6.5 0 0 1 13 0v1" />
                        </svg>
                      </div>
                    )}
                    {/* Dark mode overlay */}
                    <div className="hidden dark:block absolute inset-0 bg-black/10" />
                    {/* Agent badge for non-founder */}
                    {!member.isFounder && (
                      <div className="absolute top-3 end-3">
                        <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 dark:text-neutral-600 bg-white/80 dark:bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm">
                          Agent
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <h3 className="text-sm font-medium text-black dark:text-white leading-snug">
                    {t(`people.team.${member.id}.name`)}
                  </h3>
                  <p className="text-xs text-muted dark:text-white/50 mt-1.5 leading-relaxed">
                    {t(`people.team.${member.id}.role`)}
                  </p>
                  <p className="text-xs text-muted dark:text-white/40 mt-0.5">
                    {t(`people.team.${member.id}.location`)}
                  </p>
                  <p className="text-xs text-muted dark:text-white/35 mt-2 leading-relaxed">
                    {t(`people.team.${member.id}.bio`)}
                  </p>
                  {member.isFounder && (
                    <p className="text-xs text-muted dark:text-white/30 mt-1.5">
                      {t(`people.team.${member.id}.email`)}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
