
import React from 'react';

export const SocialProof: React.FC = () => {
  return (
    <section className="bg-white border-y border-earth/10 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="sr-only">Featured In and Statistics</h2>
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-12 opacity-60 hover:opacity-100 transition-opacity">
          <span className="text-earth font-serif text-lg italic tracking-wider whitespace-nowrap">Featured In:</span>
          <div className="flex flex-wrap justify-center items-center gap-12 text-earth font-bold text-sm uppercase tracking-[0.3em]">
            <span>Architectural Digest</span>
            <span>Garden Design</span>
            <span>Houzz Pro</span>
            <span>LUXE Magazine</span>
          </div>
          <div className="hidden lg:flex items-center gap-8 border-l border-earth/20 pl-8">
            <div className="text-center">
              <p className="text-2xl font-serif text-earth">500+</p>
              <p className="text-[10px] text-earth/50 uppercase tracking-widest">Projects</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-serif text-earth">10+</p>
              <p className="text-[10px] text-earth/50 uppercase tracking-widest">Years</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
