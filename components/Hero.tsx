
import React from 'react';

interface HeroProps {
  onConsultClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onConsultClick }) => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background with parallax effect simulation */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=2000"
          alt="Verdant Vision landscape architecture showcase"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-black/40" role="presentation"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-warmBeige text-sm mb-8 animate-fade-in-up">
          <span className="text-yellow-400" aria-hidden="true">★★★★★</span>
          <span className="font-medium tracking-wide" aria-label="5 out of 5 stars">4.9★ from 200+ Happy Clients</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-serif text-white mb-6 leading-tight tracking-tight drop-shadow-lg">
          Designing Living <br />
          <span className="italic">Landscapes</span> That Inspire
        </h1>

        <p className="text-xl md:text-2xl text-warmBeige/90 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
          Award-winning landscape architecture for residential and commercial spaces that harmonize with the soul.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            onClick={onConsultClick}
            className="group relative px-8 py-4 bg-sage text-white font-bold uppercase tracking-widest text-sm overflow-hidden transition-all hover:pr-12 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span className="relative z-10">Get Your Free Consultation</span>
            <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300" aria-hidden="true">→</div>
            <div className="absolute inset-0 bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          </button>

          <a
            href="#portfolio"
            className="px-8 py-4 border border-white/40 text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-earth transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            View Our Portfolio
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce" aria-hidden="true">
        <div className="w-[1px] h-12 bg-white/30"></div>
        <span className="text-white/50 text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
      </div>
    </section>
  );
};
