import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BlurFade } from './BlurFade';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export const About: React.FC = () => {
  const { t } = useTranslation();

  const experience = [
    {
      period: '2018 — 2023',
      role: t('about.experience.aecom.role'),
      company: 'AECOM',
      location: t('about.experience.aecom.location'),
    },
    {
      period: '2016 — 2018',
      role: t('about.experience.newground.role'),
      company: t('about.experience.newground.company'),
      location: t('about.experience.newground.location'),
    },
    {
      period: '2015',
      role: t('about.experience.urbis.role'),
      company: 'URBIS',
      location: t('about.experience.urbis.location'),
    },
    {
      period: '2012 — 2015',
      role: t('about.experience.arup.role'),
      company: 'ARUP',
      location: t('about.experience.arup.location'),
    },
  ];

  const education = [
    {
      degree: t('about.education.masters.degree'),
      university: t('about.education.masters.university'),
      year: '2011',
    },
    {
      degree: t('about.education.bachelors.degree'),
      university: t('about.education.bachelors.university'),
      year: '2007',
    },
  ];

  const skills = {
    ai: ['Claude Code', 'Cursor', 'Replit', 'ChatGPT', 'Midjourney', 'CapCut'],
    professional: ['AutoCAD', 'SketchUp', 'Rhino', 'Adobe Suite', 'Lumion', 'V-Ray', 'Revit', 'ArcGIS'],
  };

  const languages = [
    { lang: t('about.languages.english'), level: t('about.languages.advanced') },
    { lang: t('about.languages.chinese'), level: t('about.languages.fluent') },
    { lang: t('about.languages.cantonese'), level: t('about.languages.fluent') },
  ];


  return (
    <section id="about" className="py-32 border-t border-black/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <BlurFade>
          {/* Section Label */}
          <h2 className="text-xs uppercase tracking-[0.3em] text-muted dark:text-white/50 mb-16 md:mb-24">
            {t('about.sectionTitle')}
          </h2>

          {/* Name & Summary - Editorial Layout */}
          <div className="grid grid-cols-4 md:grid-cols-12 gap-x-4 md:gap-x-6 mb-20 md:mb-32">
            <div className="col-span-full md:col-span-5">
              <motion.h3
                {...fadeUp}
                className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-black dark:text-white mb-4"
              >
                {t('about.name')}
              </motion.h3>
              <motion.p
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 }}
                className="text-lg text-muted dark:text-white/50 font-light"
              >
                {t('about.title')}
              </motion.p>
              <motion.p
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.15 }}
                className="text-sm text-muted dark:text-white/40 mt-2"
              >
                {t('about.location')}
              </motion.p>
            </div>
            <div className="col-span-full md:col-span-6 md:col-start-7 mt-8 md:mt-2">
              <motion.p
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.2 }}
                className="text-lg md:text-xl font-light leading-relaxed text-black/80 dark:text-white/80"
              >
                {t('about.summary')}
              </motion.p>
              <motion.p
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.3 }}
                className="text-base font-light leading-relaxed text-black/60 dark:text-white/60 mt-6"
              >
                {t('about.aiSummary')}
              </motion.p>
            </div>
          </div>

          {/* Experience */}
          <div className="grid grid-cols-4 md:grid-cols-12 gap-x-4 md:gap-x-6 mb-20 md:mb-32">
            <div className="col-span-full md:col-span-3 mb-8 md:mb-0">
              <h4 className="text-sm uppercase tracking-[0.2em] text-muted dark:text-white/50">
                {t('about.experienceTitle')}
              </h4>
            </div>
            <div className="col-span-full md:col-span-8 md:col-start-5">
              {experience.map((exp, i) => (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                  className="border-b border-black/10 dark:border-white/10 py-6 first:pt-0 last:border-b-0 group"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1 md:gap-4">
                    <div className="flex-1">
                      <span className="text-lg md:text-xl font-light text-black dark:text-white">
                        {exp.role}
                      </span>
                      <span className="text-lg md:text-xl font-serif italic text-muted dark:text-white/50 ms-2">
                        {exp.company}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-3 md:gap-4">
                      <span className="text-sm text-muted dark:text-white/40">{exp.location}</span>
                      <span className="text-xs tabular-nums text-muted dark:text-white/30">{exp.period}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education + Certification */}
          <div className="grid grid-cols-4 md:grid-cols-12 gap-x-4 md:gap-x-6 mb-20 md:mb-32">
            <div className="col-span-full md:col-span-3 mb-8 md:mb-0">
              <h4 className="text-sm uppercase tracking-[0.2em] text-muted dark:text-white/50">
                {t('about.educationTitle')}
              </h4>
            </div>
            <div className="col-span-full md:col-span-8 md:col-start-5">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                  className="border-b border-black/10 dark:border-white/10 py-6 first:pt-0 last:border-b-0"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1 md:gap-4">
                    <div>
                      <span className="text-lg font-light text-black dark:text-white">{edu.degree}</span>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-sm text-muted dark:text-white/40">{edu.university}</span>
                      <span className="text-xs tabular-nums text-muted dark:text-white/30">{edu.year}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
              {/* Certification */}
              <motion.div
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.2 }}
                className="pt-6"
              >
                <span className="text-sm text-muted dark:text-white/40 uppercase tracking-[0.15em]">
                  {t('about.certificationLabel')}
                </span>
                <p className="text-base font-light text-black dark:text-white mt-2">
                  {t('about.certification')}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-4 md:grid-cols-12 gap-x-4 md:gap-x-6 mb-20 md:mb-32">
            <div className="col-span-full md:col-span-3 mb-8 md:mb-0">
              <h4 className="text-sm uppercase tracking-[0.2em] text-muted dark:text-white/50">
                {t('about.skillsTitle')}
              </h4>
            </div>
            <div className="col-span-full md:col-span-8 md:col-start-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* AI Tools */}
                <motion.div {...fadeUp}>
                  <h5 className="text-sm text-muted dark:text-white/50 mb-4 uppercase tracking-[0.15em]">
                    {t('about.aiToolsLabel')}
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {skills.ai.map((skill) => (
                      <span
                        key={skill}
                        className="text-sm font-light px-3 py-1.5 border border-black/10 dark:border-white/10 text-black dark:text-white rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
                {/* Professional Software */}
                <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
                  <h5 className="text-sm text-muted dark:text-white/50 mb-4 uppercase tracking-[0.15em]">
                    {t('about.professionalToolsLabel')}
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {skills.professional.map((skill) => (
                      <span
                        key={skill}
                        className="text-sm font-light px-3 py-1.5 border border-black/10 dark:border-white/10 text-black dark:text-white rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="grid grid-cols-4 md:grid-cols-12 gap-x-4 md:gap-x-6">
            <div className="col-span-full md:col-span-3 mb-8 md:mb-0">
              <h4 className="text-sm uppercase tracking-[0.2em] text-muted dark:text-white/50">
                {t('about.languagesTitle')}
              </h4>
            </div>
            <div className="col-span-full md:col-span-8 md:col-start-5">
              <div className="grid grid-cols-3 gap-6">
                {languages.map((item, i) => (
                  <motion.div
                    key={i}
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                  >
                    <div className="text-lg font-light text-black dark:text-white">{item.lang}</div>
                    <div className="text-sm text-muted dark:text-white/40 mt-1">{item.level}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
};
