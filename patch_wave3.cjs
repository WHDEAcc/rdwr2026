const fs = require('fs');

function replaceFile(path, replacer) {
  const content = fs.readFileSync(path, 'utf8');
  const newContent = replacer(content);
  fs.writeFileSync(path, newContent);
}

// 1. Header.tsx
replaceFile('components/Header.tsx', (code) => {
  let c = code;
  c = c.replace(
    `import { NAV_CATEGORIES } from '../constants';`,
    `import { useTranslation } from 'react-i18next';\nimport { LanguageSwitcher } from './LanguageSwitcher';\nimport { useTranslatedNavCategories } from '../hooks/useTranslatedData';`
  );
  c = c.replace(
    `const [isMenuOpen, setIsMenuOpen] = useState(false);`,
    `const [isMenuOpen, setIsMenuOpen] = useState(false);\n  const { t } = useTranslation();\n  const NAV_CATEGORIES = useTranslatedNavCategories();`
  );
  c = c.replace(
    `<button\n            onClick={() => setIsMenuOpen(true)}\n            className="text-sm uppercase tracking-[0.2em] font-light cursor-pointer z-50 relative hover:opacity-70 transition-opacity"\n            aria-label="Open menu"\n          >\n            Menu\n          </button>`,
    `<div className="flex items-center gap-6 md:gap-8 z-50 relative">\n            <LanguageSwitcher />\n            <button\n              onClick={() => setIsMenuOpen(true)}\n              className="text-sm uppercase tracking-[0.2em] font-light cursor-pointer hover:opacity-70 transition-opacity"\n              aria-label={t('nav.menu')}\n            >\n              {t('nav.menu')}\n            </button>\n          </div>`
  );
  c = c.replace(
    `aria-label="Close menu"\n              >\n                Close\n              </button>`,
    `aria-label={t('nav.close')}\n              >\n                {t('nav.close')}\n              </button>`
  );
  c = c.replace(
    `{['Portfolio', 'Services', 'About', 'Contact'].map(\n                    (item, i) => (\n                      <motion.li\n                        key={item}`,
    `{['portfolio', 'services', 'about', 'contact'].map(\n                    (item, i) => (\n                      <motion.li\n                        key={item}`
  );
  c = c.replace(
    `href={\`#\${item.toLowerCase()}\`}`,
    `href={\`#\${item}\`}`
  );
  c = c.replace(
    `>\n                          {item}\n                        </a>`,
    `>\n                          {t(\`nav.\${item}\`)}\n                        </a>`
  );
  c = c.replace(
    `placeholder="Search projects..."`,
    `placeholder={t('nav.searchPlaceholder', 'Search projects...')}`
  );
  c = c.replace(
    `<span className="absolute right-0 top-1/2 -translate-y-1/2 text-white/50 text-sm uppercase tracking-widest pointer-events-none">\n                  Search\n                </span>`,
    `<span className="absolute end-0 top-1/2 -translate-y-1/2 text-white/50 text-sm uppercase tracking-widest pointer-events-none">\n                  {t('nav.search', 'Search')}\n                </span>`
  );
  return c;
});

// 2. Hero.tsx
replaceFile('components/Hero.tsx', (code) => {
  let c = code;
  c = c.replace(
    `import { PROJECTS } from '../constants';`,
    `import { useTranslation } from 'react-i18next';\nimport { useTranslatedProjects } from '../hooks/useTranslatedData';\nimport { useDirection } from '../hooks/useDirection';`
  );
  c = c.replace(
    `const [activeIndex, setActiveIndex] = useState(0);`,
    `const [activeIndex, setActiveIndex] = useState(0);\n  const { t } = useTranslation();\n  const PROJECTS = useTranslatedProjects();\n  const { isRTL } = useDirection();`
  );
  c = c.replace(
    `Designing landscapes\n            <br />\n            that shape how people\n            <br />\n            <em className="font-light italic text-muted dark:text-white/70">experience the world</em>`,
    `{t('hero.title_line1')}\n            <br />\n            {t('hero.title_line2')}\n            <br />\n            <em className="font-light italic text-muted dark:text-white/70">{t('hero.title_line3')}</em>`
  );
  c = c.replace(
    `Award-winning landscape architecture spanning 14 years\n            across China, Hong Kong, and beyond.`,
    `{t('hero.subtitle')}`
  );
  c = c.replace(
    `dragConstraints={{\n            left: -(PROJECTS.length * 424 - (typeof window !== 'undefined' ? window.innerWidth : 1000) + 64),\n            right: 0,\n          }}`,
    `dragConstraints={isRTL ? {\n            right: (PROJECTS.length * 424 - (typeof window !== 'undefined' ? window.innerWidth : 1000) + 64),\n            left: 0,\n          } : {\n            left: -(PROJECTS.length * 424 - (typeof window !== 'undefined' ? window.innerWidth : 1000) + 64),\n            right: 0,\n          }}`
  );
  return c;
});

// 3. App.tsx
replaceFile('App.tsx', (code) => {
  let c = code;
  c = c.replace(
    `import { TESTIMONIALS } from './constants';`,
    `import './i18n';\nimport { useTranslation } from 'react-i18next';\nimport { useTranslatedTestimonials } from './hooks/useTranslatedData';\nimport { useDirection } from './hooks/useDirection';`
  );
  c = c.replace(
    `const [showAI, setShowAI] = useState(false);`,
    `const [showAI, setShowAI] = useState(false);\n  const { t } = useTranslation();\n  const TESTIMONIALS = useTranslatedTestimonials();\n  const { dir } = useDirection();`
  );
  c = c.replace(
    `useEffect(() => {\n    if (isDark) {`,
    `useEffect(() => {\n    document.documentElement.dir = dir;\n    document.documentElement.lang = document.documentElement.lang || 'en';\n  }, [dir]);\n\n  useEffect(() => {\n    if (isDark) {`
  );
  c = c.replace(
    `Perspectives`,
    `{t('testimonials.sectionTitle', 'Perspectives')}`
  );
  c = c.replace(
    `Let's work<br />together`,
    `{t('contact.heading_line1', "Let's work")}<br />{t('contact.heading_line2', 'together')}`
  );
  c = c.replace(
    `bottom-8 right-8 z-40 w-12 h-12`,
    `bottom-8 end-8 z-40 w-12 h-12`
  );
  return c;
});

// 4. Footer.tsx
replaceFile('components/Footer.tsx', (code) => {
  let c = code;
  c = c.replace(
    `import React from 'react';`,
    `import React from 'react';\nimport { useTranslation } from 'react-i18next';`
  );
  c = c.replace(
    `export const Footer: React.FC = () => {`,
    `export const Footer: React.FC = () => {\n  const { t } = useTranslation();`
  );
  c = c.replace(
    `EDGE<br/>Landscape Architecture`,
    `{t('footer.studioName_line1', 'EDGE')}<br/>{t('footer.studioName_line2', 'Landscape Architecture')}`
  );
  c = c.replace(
    `Award-winning landscape architecture studio with offices in\n              Shenzhen and Hong Kong. We create living environments that\n              resonate with the human spirit.`,
    `{t('footer.description')}`
  );
  c = c.replace(
    `<h3 className="text-xs uppercase tracking-[0.3em] text-muted dark:text-white/50 mb-6">Shenzhen</h3>`,
    `<h3 className="text-xs uppercase tracking-[0.3em] text-muted dark:text-white/50 mb-6">{t('footer.shenzhen')}</h3>`
  );
  c = c.replace(
    `Nanshan District<br />\n              Shenzhen, China`,
    `{t('footer.shenzhenAddress_line1')}<br />\n              {t('footer.shenzhenAddress_line2')}`
  );
  c = c.replace(
    `<h3 className="text-xs uppercase tracking-[0.3em] text-muted dark:text-white/50 mb-6">Hong Kong</h3>`,
    `<h3 className="text-xs uppercase tracking-[0.3em] text-muted dark:text-white/50 mb-6">{t('footer.hongKong')}</h3>`
  );
  c = c.replace(
    `Central District<br />\n              Hong Kong SAR`,
    `{t('footer.hongKongAddress_line1')}<br />\n              {t('footer.hongKongAddress_line2')}`
  );
  c = c.replace(
    `&copy; {new Date().getFullYear()} EDGE Landscape Architecture`,
    `{t('footer.copyright', { year: new Date().getFullYear() })}`
  );
  return c;
});

// 5. DisciplinesList.tsx
replaceFile('components/DisciplinesList.tsx', (code) => {
  let c = code;
  c = c.replace(
    `import { SERVICES } from '../constants';`,
    `import { useTranslation } from 'react-i18next';\nimport { useTranslatedServices } from '../hooks/useTranslatedData';\nimport { useDirection } from '../hooks/useDirection';`
  );
  c = c.replace(
    `const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);`,
    `const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);\n  const { t } = useTranslation();\n  const SERVICES = useTranslatedServices();\n  const { isRTL } = useDirection();`
  );
  c = c.replace(
    `Disciplines\n        </h2>`,
    `{t('disciplines.sectionTitle', 'Disciplines')}\n        </h2>`
  );
  c = c.replace(
    `className="text-3xl md:text-5xl lg:text-6xl font-serif font-light group-hover:translate-x-4 transition-transform duration-500 dark:text-white"`,
    `className={\`text-3xl md:text-5xl lg:text-6xl font-serif font-light \${isRTL ? 'group-hover:-translate-x-4' : 'group-hover:translate-x-4'} transition-transform duration-500 dark:text-white\`}`
  );
  return c;
});

// 6. Philosophy.tsx
replaceFile('components/Philosophy.tsx', (code) => {
  let c = code;
  c = c.replace(
    `import { PHILOSOPHY } from '../constants';`,
    `import { useTranslation } from 'react-i18next';\nimport { useTranslatedPhilosophy } from '../hooks/useTranslatedData';`
  );
  c = c.replace(
    `export const Philosophy: React.FC = () => {`,
    `export const Philosophy: React.FC = () => {\n  const { t } = useTranslation();\n  const PHILOSOPHY = useTranslatedPhilosophy();`
  );
  c = c.replace(
    `Philosophy\n              </h2>`,
    `{t('philosophy.sectionTitle', 'Philosophy')}\n              </h2>`
  );
  c = c.replace(
    `Harmonizing nature<br />\n                and human experience`,
    `{t('philosophy.title_line1')}<br />\n                {t('philosophy.title_line2')}`
  );
  return c;
});

// 7. DesignConsultant.tsx
replaceFile('components/DesignConsultant.tsx', (code) => {
  let c = code;
  c = c.replace(
    `import { motion, AnimatePresence } from 'framer-motion';`,
    `import { motion, AnimatePresence } from 'framer-motion';\nimport { useTranslation } from 'react-i18next';\nimport { useDirection } from '../hooks/useDirection';`
  );
  c = c.replace(
    `const [messages, setMessages] = useState<Message[]>([\n    {\n      id: 'welcome',\n      role: 'assistant',\n      content: "Hello. I am the EDGE Landscape Architecture design consultant. How can I assist with your landscape architecture needs today?"\n    }\n  ]);`,
    `const { t, i18n } = useTranslation();\n  const { isRTL } = useDirection();\n  const [messages, setMessages] = useState<Message[]>([]);\n\n  useEffect(() => {\n    setMessages([\n      {\n        id: 'welcome',\n        role: 'assistant',\n        content: t('ai.welcome', "Hello. I am the EDGE Landscape Architecture design consultant. How can I assist with your landscape architecture needs today?")\n      }\n    ]);\n  }, [i18n.language, t]);`
  );
  c = c.replace(
    `content: "I apologize, but I'm currently unable to connect to my design knowledge base. Please try again later."`,
    `content: t('ai.error', "I apologize, but I'm currently unable to connect to my design knowledge base. Please try again later.")`
  );
  c = c.replace(
    `initial={{ x: '100%' }}\n            animate={{ x: 0 }}\n            exit={{ x: '100%' }}`,
    `initial={{ x: isRTL ? '-100%' : '100%' }}\n            animate={{ x: 0 }}\n            exit={{ x: isRTL ? '-100%' : '100%' }}`
  );
  c = c.replace(
    `className="fixed right-0 top-0 bottom-0 w-full md:w-[450px] bg-white dark:bg-[#0a0a0a] shadow-2xl z-[160] flex flex-col border-l border-black/5 dark:border-white/5"`,
    `className={\`fixed \${isRTL ? 'left-0' : 'right-0'} top-0 bottom-0 w-full md:w-[450px] bg-white dark:bg-[#0a0a0a] shadow-2xl z-[160] flex flex-col border-s border-black/5 dark:border-white/5\`}`
  );
  c = c.replace(
    `Design Consultant`,
    `{t('ai.title', 'Design Consultant')}`
  );
  c = c.replace(
    `AI Assistant Online`,
    `{t('ai.status', 'AI Assistant Online')}`
  );
  c = c.replace(
    `Close\n              </button>`,
    `{t('ai.close', 'Close')}\n              </button>`
  );
  c = c.replace(
    `placeholder="Ask about sustainable materials..."`,
    `placeholder={t('ai.placeholder', 'Ask about sustainable materials...')}`
  );
  c = c.replace(
    `className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-3 pr-12 text-sm focus:outline-none focus:border-black/40 dark:focus:border-white/40 transition-colors placeholder:text-muted dark:placeholder:text-white/30 text-black dark:text-white"`,
    `className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-3 pe-12 text-sm focus:outline-none focus:border-black/40 dark:focus:border-white/40 transition-colors placeholder:text-muted dark:placeholder:text-white/30 text-black dark:text-white"`
  );
  c = c.replace(
    `absolute right-0 top-1/2`,
    `absolute end-0 top-1/2`
  );
  c = c.replace(
    `aria-label="Send message"`,
    `aria-label={t('ai.send', 'Send message')}`
  );
  c = c.replace(
    `AI can make mistakes. Please verify important information.`,
    `{t('ai.disclaimer', 'AI can make mistakes. Please verify important information.')}`
  );
  return c;
});

// 8. ProjectDetail.tsx
replaceFile('components/ProjectDetail.tsx', (code) => {
  let c = code;
  c = c.replace(
    `import { Project } from '../types';`,
    `import { Project } from '../types';\nimport { useTranslation } from 'react-i18next';`
  );
  c = c.replace(
    `export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, isOpen, onClose }) => {`,
    `export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, isOpen, onClose }) => {\n  const { t } = useTranslation();`
  );
  c = c.replace(
    `aria-label="Close project detail"\n            >\n              Close\n            </button>`,
    `aria-label={t('projectDetail.close', 'Close project detail')}\n            >\n              {t('projectDetail.close', 'Close')}\n            </button>`
  );
  c = c.replace(
    `Key Responsibilities\n                      </h3>`,
    `{t('projectDetail.keyResponsibilities', 'Key Responsibilities')}\n                      </h3>`
  );
  c = c.replace(
    `alt={\`Gallery image \${i + 1}\`}`,
    `alt={t('projectDetail.galleryAlt', { index: i + 1 })}`
  );
  c = c.replace(
    `text-right font-mono`,
    `text-end font-mono`
  );
  return c;
});

console.log("Patch complete!");
