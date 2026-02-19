
import React from 'react';

export const TrustBadges: React.FC = () => {
  const badges = [
    { label: "Licensed Architect", sub: "California Registered" },
    { label: "LEED Certified", sub: "Sustainability Expert" },
    { label: "ASLA Member", sub: "Assoc. of Landscape Arch." },
    { label: "5-Year Plant", sub: "Exclusive Guarantee" }
  ];

  return (
    <section className="bg-white py-16 px-6 border-b border-earth/10">
      <div className="max-w-7xl mx-auto">
        <h2 className="sr-only">Certifications and Credentials</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center items-center">
          {badges.map((b) => (
            <div key={b.label} className="group">
              <div className="w-12 h-12 bg-warmBeige rounded-full mx-auto mb-4 flex items-center justify-center text-earth transition-transform group-hover:scale-110 group-hover:bg-sage group-hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold uppercase tracking-widest text-[10px] text-earth mb-1">{b.label}</h3>
              <p className="text-[10px] text-earth/40 uppercase tracking-[0.15em]">{b.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
