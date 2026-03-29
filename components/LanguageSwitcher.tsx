import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { SUPPORTED_LANGUAGES, Locale } from '../i18n';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = (i18n.language || 'en') as Locale;

  const changeLanguage = (lng: Locale) => {
    i18n.changeLanguage(lng);
    const dir = SUPPORTED_LANGUAGES[lng].dir;
    document.documentElement.dir = dir;
    document.documentElement.lang = lng;
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="text-sm uppercase tracking-[0.2em] font-light cursor-pointer hover:opacity-70 transition-opacity"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentLang.toUpperCase()}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute end-0 z-[300] mt-4 min-w-[140px] bg-white dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 shadow-lg"
            role="menu"
            aria-orientation="vertical"
          >
            {(Object.keys(SUPPORTED_LANGUAGES) as Locale[]).map((lng) => (
              <button
                key={lng}
                className={`block w-full text-start px-4 py-3 text-sm transition-colors ${
                  currentLang === lng
                    ? 'text-black dark:text-white font-medium'
                    : 'text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
                role="menuitem"
                onClick={() => changeLanguage(lng)}
              >
                {SUPPORTED_LANGUAGES[lng].label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
