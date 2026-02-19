
import React, { useState, useEffect } from 'react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="/" className="group flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage">
          <div aria-hidden="true" className="w-10 h-10 bg-earth rounded-full flex items-center justify-center text-warmBeige text-xl transition-transform group-hover:rotate-12">🌿</div>
          <span className={`text-2xl font-serif tracking-tight ${isScrolled ? 'text-earth' : 'text-earth'}`}>
            Verdant Vision
          </span>
        </a>

        {/* Desktop Nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-10">
          <a href="#portfolio" className="text-sm uppercase tracking-widest font-medium hover:text-sage transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage">Portfolio</a>
          <a href="#services" className="text-sm uppercase tracking-widest font-medium hover:text-sage transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage">Services</a>
          <a href="#testimonials" className="text-sm uppercase tracking-widest font-medium hover:text-sage transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage">Client Journal</a>
          <a
            href="tel:5551234567"
            className="px-6 py-2 border-2 border-earth hover:bg-earth hover:text-white transition-all text-sm uppercase tracking-widest font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
          >
            (555) 123-4567
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-earth p-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Open menu"
          aria-expanded={isMobileMenuOpen}
        >
          <div className="w-6 h-0.5 bg-current mb-1.5"></div>
          <div className="w-6 h-0.5 bg-current mb-1.5"></div>
          <div className="w-6 h-0.5 bg-current"></div>
        </button>
      </div>

      {/* Mobile Menu */}
      <nav
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!isMobileMenuOpen}
        className={`fixed inset-0 bg-earth transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} z-50 p-8`}
      >
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
          className="absolute top-8 right-8 text-warmBeige text-4xl cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
        >
          &times;
        </button>
        <div className="flex flex-col gap-10 mt-20 text-center">
          <a onClick={() => setIsMobileMenuOpen(false)} href="#portfolio" className="text-3xl font-serif text-warmBeige transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage">Portfolio</a>
          <a onClick={() => setIsMobileMenuOpen(false)} href="#services" className="text-3xl font-serif text-warmBeige transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage">Services</a>
          <a onClick={() => setIsMobileMenuOpen(false)} href="#testimonials" className="text-3xl font-serif text-warmBeige transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage">Client Journal</a>
          <a href="tel:5551234567" className="text-xl font-bold text-sage transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage">CALL US: (555) 123-4567</a>
        </div>
      </nav>
    </header>
  );
};
