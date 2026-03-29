import React from 'react';
import { BlurFade } from './BlurFade';
import { useTranslation } from 'react-i18next';
import { useTranslatedPhilosophy } from '../hooks/useTranslatedData';

export const Philosophy: React.FC = () => {
  const { t } = useTranslation();
  const PHILOSOPHY = useTranslatedPhilosophy();
  return (
    <section id="philosophy" className="py-32 px-8 md:px-16 bg-white dark:bg-[#111815] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <BlurFade>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            {/* Title Column */}
            <div className="md:col-span-4">
              <h2 className="text-xs uppercase tracking-[0.3em] text-muted dark:text-white/50 mb-8">
                {t('philosophy.sectionTitle', 'Philosophy')}
              </h2>
              <h3 className="text-3xl md:text-4xl font-serif font-light leading-tight text-black dark:text-white">
                {t('philosophy.title_line1')}<br />
                {t('philosophy.title_line2')}
              </h3>
            </div>

            {/* Content Column */}
            <div className="md:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                {PHILOSOPHY.map((item, i) => (
                  <div key={item.title} className="group">
                    <span className="block text-xs font-mono text-muted dark:text-white/50 mb-4">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h4 className="text-xl font-medium mb-3 text-black dark:text-white group-hover:text-black/70 dark:group-hover:text-white/70 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-muted dark:text-white/50">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
};
