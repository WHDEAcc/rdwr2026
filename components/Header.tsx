import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslatedNavCategories } from '../hooks/useTranslatedData';

export const Header: React.FC<{ onPeopleClick?: () => void }> = ({ onPeopleClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const NAV_CATEGORIES = useTranslatedNavCategories();

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <>
      {/* Fixed Minimal Header with Mix-Blend-Exclusion */}
      <header className="fixed top-0 left-0 right-0 z-50 header-blend transition-opacity duration-300">
        <div className="flex items-center justify-between px-8 py-6 md:px-16">
          <a href="/" className="text-lg font-serif tracking-tight z-50 relative">
            EDGE
          </a>
          <div className="flex items-center gap-6 md:gap-8 z-50 relative">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-sm uppercase tracking-[0.2em] font-light cursor-pointer hover:opacity-70 transition-opacity"
              aria-label={t('nav.menu')}
            >
              {t('nav.menu')}
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl text-white"
          >
            {/* Close Button */}
            <div className="flex justify-end px-8 py-6 md:px-16">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-sm uppercase tracking-[0.2em] font-light cursor-pointer hover:opacity-70 transition-opacity"
                aria-label={t('nav.close')}
              >
                {t('nav.close')}
              </button>
            </div>

            {/* Menu Content Grid */}
            <div className="px-8 md:px-16 py-12 grid grid-cols-1 md:grid-cols-3 gap-16 max-w-7xl mx-auto h-full content-center">
              {/* Main Navigation */}
              <nav className="md:col-span-1">
                <ul className="space-y-6">
                  {['portfolio', 'services', 'people', 'about', 'contact'].map(
                    (item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                      >
                        {item === 'people' ? (
                          <button
                            onClick={() => {
                              setIsMenuOpen(false);
                              onPeopleClick?.();
                            }}
                            className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white hover:text-white/60 transition-colors block cursor-pointer"
                          >
                            {t(`nav.${item}`)}
                          </button>
                        ) : (
                          <a
                            href={`#${item}`}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white hover:text-white/60 transition-colors block"
                          >
                            {t(`nav.${item}`)}
                          </a>
                        )}
                      </motion.li>
                    )
                  )}
                </ul>
              </nav>

              {/* Categorized Sub-navigation */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-12">
                {NAV_CATEGORIES.map((cat, ci) => (
                  <motion.div
                    key={cat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + ci * 0.1 }}
                  >
                    <h3 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-6 font-medium">
                      {cat.label}
                    </h3>
                    <ul className="space-y-3">
                      {cat.links.map((link) => (
                        <li key={link.text}>
                          <a
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-lg text-white/70 hover:text-white transition-colors font-light"
                          >
                            {link.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Search Bar (Bottom) */}
            <div className="absolute bottom-12 left-8 right-8 md:left-16 md:right-16 max-w-md">
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '100%' }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="relative"
              >
                <input
                  type="text"
                  placeholder={t('nav.searchPlaceholder', 'Search projects...')}
                  className="bg-transparent border-b border-white/20 text-white py-3 w-full text-lg focus:outline-none focus:border-white/60 placeholder:text-white/30 font-light"
                />
                <span className="absolute end-0 top-1/2 -translate-y-1/2 text-white/50 text-sm uppercase tracking-widest pointer-events-none">
                  {t('nav.search', 'Search')}
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
