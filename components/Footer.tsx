
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-warmBeige py-20 px-6 border-t border-earth/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-earth rounded-full"></div>
              <span className="text-2xl font-serif text-earth tracking-tight">Verdant Vision</span>
            </div>
            <p className="text-earth/60 max-w-sm mb-8 leading-relaxed">
              Transforming outdoor spaces into evocative landscapes that celebrate the balance between nature and human experience.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-earth/40 hover:text-sage font-bold text-xs uppercase tracking-widest transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage" rel="noopener noreferrer" aria-label="Follow us on Instagram">Instagram</a>
              <a href="#" className="text-earth/40 hover:text-sage font-bold text-xs uppercase tracking-widest transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage" rel="noopener noreferrer" aria-label="Follow us on Pinterest">Pinterest</a>
              <a href="#" className="text-earth/40 hover:text-sage font-bold text-xs uppercase tracking-widest transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage" rel="noopener noreferrer" aria-label="Follow us on Vimeo">Vimeo</a>
            </div>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-widest text-[10px] text-earth mb-8">Studio</h3>
            <nav aria-label="Footer navigation" className="flex flex-col gap-4 text-earth/60 text-sm">
              <a href="#portfolio" className="hover:text-sage transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage">Portfolio</a>
              <a href="#services" className="hover:text-sage transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage">Services</a>
              <a href="#testimonials" className="hover:text-sage transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage">Journal</a>
              <a href="#contact" className="hover:text-sage transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage">Contact</a>
            </nav>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-widest text-[10px] text-earth mb-8">Newsletter</h3>
            <p className="text-earth/40 text-xs mb-6 uppercase tracking-widest leading-loose">
              Join our list for seasonal garden tips and design updates.
            </p>
            <form onSubmit={(e) => e.preventDefault()} aria-label="Newsletter signup">
              <div className="flex border-b border-earth/20 pb-2">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Your email"
                  className="bg-transparent text-sm w-full focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
                />
                <button type="submit" aria-label="Subscribe to newsletter" className="text-earth hover:text-sage font-bold text-xs uppercase tracking-widest cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage">→</button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-earth/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-earth/30 uppercase tracking-[0.2em]">&copy; 2024 Verdant Vision Studio. All rights reserved.</p>
          <div className="flex gap-8 text-[10px] text-earth/30 uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-earth transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage">Privacy Policy</a>
            <a href="#" className="hover:text-earth transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
