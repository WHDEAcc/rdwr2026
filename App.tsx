
import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS, SERVICES, PHILOSOPHY, TESTIMONIALS } from './constants';
import { Project } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SocialProof } from './components/SocialProof';
import { ServiceCard } from './components/ServiceCard';
import { ProjectCard } from './components/ProjectCard';
import { PhilosophyItem } from './components/Philosophy';
import { TestimonialCard } from './components/TestimonialCard';
import { TrustBadges } from './components/TrustBadges';
import { LeadCapture } from './components/LeadCapture';
import { Footer } from './components/Footer';
import { DesignConsultant } from './components/DesignConsultant';
import { ProjectDetail } from './components/ProjectDetail';

const App: React.FC = () => {
  const [showAI, setShowAI] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen font-sans selection:bg-sage selection:text-white overflow-x-hidden">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-earth focus:text-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:uppercase focus:tracking-widest">
        Skip to main content
      </a>
      <Header />

      <main id="main-content">
        <Hero onConsultClick={() => setShowAI(true)} />

        <SocialProof />

        {/* Services Section */}
        <section id="services" className="py-24 px-6 bg-warmBeige">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-serif text-earth mb-4">Our Services</h2>
              <p className="text-earth/70 max-w-2xl mx-auto">Masterfully crafted landscapes for every scale and vision.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SERVICES.map((s) => (
                <ServiceCard key={s.title} service={s} />
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 flex flex-col md:flex-row items-end justify-between gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif text-earth mb-4">Selected Works</h2>
                <p className="text-earth/70 max-w-xl">Award-winning landscape architecture projects spanning 14 years of international experience across China, Hong Kong, and beyond.</p>
              </div>
              <a href="https://ryondu-portfolio-2025.lovable.app/work" target="_blank" rel="noopener noreferrer" className="text-earth font-medium border-b-2 border-sage pb-1 hover:text-sage transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage">
                View Full Portfolio
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {PROJECTS.map((p) => (
                <ProjectCard key={p.id} project={p} onClick={() => setSelectedProject(p)} />
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-24 px-6 bg-earth text-warmBeige">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif mb-8 italic">The Verdant Philosophy</h2>
                <p className="text-warmBeige/80 text-lg mb-12 leading-relaxed">
                  We believe that a garden is not just a collection of plants, but a living dialogue between architecture and nature. Our designs are born from deep ecological understanding and an unwavering commitment to beauty.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {PHILOSOPHY.map((item) => (
                    <PhilosophyItem key={item.title} item={item} />
                  ))}
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-2xl aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1599307767316-776533bb941c?auto=format&fit=crop&q=80&w=1200"
                  alt="Verdant Vision landscape design process"
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-24 px-6 bg-warmBeige">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-earth mb-4 italic">Living Experiences</h2>
            <p className="text-earth/70">What our clients say about their new environments.</p>
          </div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.name} testimonial={t} />
            ))}
          </div>
        </section>

        <TrustBadges />

        <LeadCapture />
      </main>

      <Footer />

      {/* AI Design Assistant Widget */}
      <DesignConsultant isOpen={showAI} onClose={() => setShowAI(false)} />

      {/* Project Detail Modal */}
      <ProjectDetail project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};

export default App;
