
import React from 'react';

export const LeadCapture: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-6 bg-earth relative overflow-hidden">
      {/* Visual Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="white">
          <path d="M0,0 C30,40 70,60 100,100 L100,0 Z" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif text-warmBeige mb-6 italic">Start Your Dream Garden</h2>
          <p className="text-warmBeige/60 text-lg max-w-2xl mx-auto">
            Let's collaborate to create a sanctuary that grows with you. Fill out the form below for a complimentary initial consultation.
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-12 shadow-2xl rounded-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-[10px] uppercase tracking-widest font-bold text-earth/50 mb-2">Full Name</label>
              <input
                id="fullName"
                type="text"
                name="name"
                autocomplete="name"
                required
                aria-required="true"
                placeholder="Eleanor Vance"
                className="w-full bg-transparent border-b border-earth/20 py-3 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage focus:border-sage transition-colors placeholder:text-earth/20"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-[10px] uppercase tracking-widest font-bold text-earth/50 mb-2">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                autocomplete="email"
                required
                aria-required="true"
                placeholder="eleanor@example.com"
                className="w-full bg-transparent border-b border-earth/20 py-3 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage focus:border-sage transition-colors placeholder:text-earth/20"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-[10px] uppercase tracking-widest font-bold text-earth/50 mb-2">Phone Number</label>
              <input
                id="phone"
                type="tel"
                name="tel"
                autocomplete="tel"
                required
                aria-required="true"
                placeholder="(555) 000-0000"
                className="w-full bg-transparent border-b border-earth/20 py-3 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage focus:border-sage transition-colors placeholder:text-earth/20"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="projectScope" className="block text-[10px] uppercase tracking-widest font-bold text-earth/50 mb-2">Project Scope</label>
              <select id="projectScope" className="w-full bg-transparent border-b border-earth/20 py-3 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage focus:border-sage transition-colors appearance-none text-earth cursor-pointer">
                <option>Residential New Design</option>
                <option>Residential Renovation</option>
                <option>Commercial Development</option>
                <option>Garden Maintenance</option>
              </select>
            </div>
            <div>
              <label htmlFor="budget" className="block text-[10px] uppercase tracking-widest font-bold text-earth/50 mb-2">Estimated Budget Range</label>
              <select id="budget" className="w-full bg-transparent border-b border-earth/20 py-3 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage focus:border-sage transition-colors appearance-none text-earth cursor-pointer">
                <option>$5k - $15k</option>
                <option>$15k - $50k</option>
                <option>$50k - $100k</option>
                <option>$100k+</option>
              </select>
            </div>
            <div>
              <label htmlFor="vision" className="block text-[10px] uppercase tracking-widest font-bold text-earth/50 mb-2">Project Vision (Optional)</label>
              <textarea
                id="vision"
                rows={1}
                placeholder="Describe your perfect outdoor escape..."
                className="w-full bg-transparent border-b border-earth/20 py-3 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage focus:border-sage transition-colors placeholder:text-earth/20"
              ></textarea>
            </div>
          </div>

          <div className="md:col-span-2 pt-8">
            <button type="submit" className="w-full bg-sage text-white py-6 font-bold uppercase tracking-[0.3em] hover:bg-earth transition-all shadow-xl hover:shadow-sage/20 cursor-pointer">
              Submit Inquiry
            </button>
            <p className="text-center text-[10px] text-earth/30 mt-6 uppercase tracking-widest">
              By submitting, you agree to our privacy policy and terms of service.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};
