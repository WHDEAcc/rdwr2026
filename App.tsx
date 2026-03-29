import React, { useState, useEffect } from 'react';
import './i18n';
import { useTranslation } from 'react-i18next';
import { useTranslatedTestimonials } from './hooks/useTranslatedData';
import { useDirection } from './hooks/useDirection';
import { Project } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DisciplinesList } from './components/DisciplinesList';
import { Philosophy } from './components/Philosophy';
import { Footer } from './components/Footer';
import { DesignConsultant } from './components/DesignConsultant';
import { ProjectDetail } from './components/ProjectDetail';
import { HighlightedProjects } from './components/HighlightedProjects';
import { About } from './components/About';
import { People } from './components/People';
import { SectionReveal } from './components/SectionReveal';

const App: React.FC = () => {
  const [showAI, setShowAI] = useState(false);
  const [showPeople, setShowPeople] = useState(false);
  const { t } = useTranslation();
  const TESTIMONIALS = useTranslatedTestimonials();
  const { dir } = useDirection();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Dark mode state
  const [isDark, setIsDark] = useState(false);

  // Handle system color scheme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Apply dark class to document
  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = document.documentElement.lang || 'en';
  }, [dir]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <Header onPeopleClick={() => setShowPeople(true)} />

      <main>
        <Hero
          onConsultClick={() => setShowAI(true)}
          onProjectClick={setSelectedProject}
        />

        <SectionReveal>
          <DisciplinesList onProjectClick={setSelectedProject} />
        </SectionReveal>

        <SectionReveal>
          <HighlightedProjects onProjectClick={setSelectedProject} />
        </SectionReveal>

        <SectionReveal>
          <Philosophy />
        </SectionReveal>

        {/* Ideas / Thought Leadership — SWA XL Lab inspired */}
        <SectionReveal>
        <section className="py-20 md:py-32 px-6 md:px-16 border-t border-black/10 dark:border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-16">
              <h2 className="text-xs uppercase tracking-[0.3em] text-muted dark:text-white/50">
                {t('ideas.sectionTitle')}
              </h2>
              <span className="hidden md:block text-xs text-muted dark:text-white/40 tracking-widest uppercase">
                {t('ideas.viewAll')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/10 dark:bg-white/10">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <a
                  key={i}
                  href={t(`ideas.items.${i}.url`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-[#111815] p-6 md:p-10 group cursor-pointer hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors duration-300 flex flex-col h-full block"
                >
                  <div className="flex justify-between items-start mb-6 gap-4">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-muted dark:text-white/50 leading-relaxed font-bold">{t(`ideas.items.${i}.topic`)}</span>
                    <span className="text-[10px] text-muted dark:text-white/30 shrink-0">{t(`ideas.items.${i}.year`)}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-serif font-light leading-snug text-black dark:text-white mb-4 group-hover:text-black/80 dark:group-hover:text-white/80 transition-colors">
                    {t(`ideas.items.${i}.headline`)}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted dark:text-white/50 mb-8 flex-grow">{t(`ideas.items.${i}.teaser`)}</p>

                  <div className="mt-auto border-t border-black/5 dark:border-white/5 pt-6 flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-widest text-muted/70 dark:text-white/30 font-mono">
                      {t(`ideas.items.${i}.source`)}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted dark:text-white/40 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
                      <span>{t('ideas.readMore')}</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
        </SectionReveal>

        <SectionReveal>
        <About />
        </SectionReveal>

        {/* Testimonials - Horizontal Scroll */}
        <SectionReveal>
        <section className="py-32 border-t border-black/10 dark:border-white/10 overflow-hidden">
          <div className="px-8 md:px-16 mb-16 flex items-center justify-between">
            <h2 className="text-xs uppercase tracking-[0.3em] text-muted dark:text-white/50">
              {t('testimonials.sectionTitle', 'Perspectives')}
            </h2>
            <span className="hidden md:block text-xs text-muted dark:text-white/30 font-mono">22°N 114°E → 31°N 121°E</span>
          </div>

          <div className="flex gap-8 px-8 md:px-16 overflow-x-auto hide-scrollbar pb-12 snap-x drag-cursor">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`shrink-0 snap-start ${i % 2 === 0 ? 'w-[280px] md:w-[350px]' : 'w-[280px] md:w-[450px]'
                  }`}
              >
                <div className="text-xs text-muted dark:text-white/30 font-mono uppercase tracking-[0.2em] mb-6">
                  {['Shenzhen, China', 'Shenzhen, China', 'Dongguan, China'][i] ?? 'China'}
                </div>
                <blockquote className="text-lg md:text-2xl font-serif font-light italic leading-tight mb-8">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <cite className="not-italic text-sm text-muted dark:text-white/50 block">
                  — {t.name}, {t.role}
                </cite>
              </div>
            ))}
            {/* Padding for end of scroll */}
            <div className="w-8 shrink-0" />
          </div>
        </section>
        </SectionReveal>

        {/* Minimal Contact Section */}
        <SectionReveal>
        <section id="contact" className="py-48 px-8 md:px-16 flex flex-col items-center justify-center text-center border-t border-black/10 dark:border-white/10">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-normal tracking-tight mb-12">
            {t('contact.heading_line1', "Let's work")}<br />{t('contact.heading_line2', 'together')}
          </h2>
          <a
            href="mailto:rdxmmcdu@gmail.com"
            className="text-sm uppercase tracking-[0.2em] hover:text-muted transition-colors border-b border-black dark:border-white pb-1"
          >
            rdxmmcdu@gmail.com
          </a>
        </section>
        </SectionReveal>
      </main>

      <Footer />

      {/* Floating AI Button */}
      <button
        onClick={() => setShowAI(true)}
        className="fixed bottom-8 end-8 z-40 w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label="Open Design Consultant"
      >
        <span className="w-3 h-3 bg-current rounded-full animate-pulse" />
      </button>

      {/* Modals */}
      <DesignConsultant isOpen={showAI} onClose={() => setShowAI(false)} />
      <ProjectDetail
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <People isOpen={showPeople} onClose={() => setShowPeople(false)} />
    </div>
  );
};

export default App;
