import React from 'react';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="py-24 px-8 md:px-16 border-t border-black/10 dark:border-white/10 bg-white dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          {/* Studio Info */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-serif font-light mb-6">{t('footer.studioName_line1', 'EDGE')}<br/>{t('footer.studioName_line2', 'Landscape Architecture')}</h2>
            <p className="text-muted dark:text-white/50 text-sm leading-relaxed max-w-md">
              {t('footer.description')}
            </p>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.3em] text-muted dark:text-white/50 mb-6">{t('footer.shenzhen')}</h3>
            <address className="not-italic text-sm leading-relaxed text-black/70 dark:text-white/70">
              {t('footer.shenzhenAddress_line1')}<br />
              {t('footer.shenzhenAddress_line2')}
            </address>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.3em] text-muted dark:text-white/50 mb-6">{t('footer.hongKong')}</h3>
            <address className="not-italic text-sm leading-relaxed text-black/70 dark:text-white/70">
              {t('footer.hongKongAddress_line1')}<br />
              {t('footer.hongKongAddress_line2')}
            </address>
          </div>
        </div>

        {/* Bottom Bar: Social + Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-8 border-t border-black/5 dark:border-white/5">
          <div className="flex gap-8">
            <a href="#" className="text-xs uppercase tracking-[0.2em] text-muted dark:text-white/50 hover:text-black dark:hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-xs uppercase tracking-[0.2em] text-muted dark:text-white/50 hover:text-black dark:hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="text-xs uppercase tracking-[0.2em] text-muted dark:text-white/50 hover:text-black dark:hover:text-white transition-colors">Vimeo</a>
          </div>
          <p className="text-xs text-muted dark:text-white/30">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
};
