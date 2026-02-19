
import React from 'react';
import { Testimonial } from '../types';

export const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <div className="bg-white p-12 text-center group border border-earth/5 hover:border-sage transition-all duration-700">
      <div className="relative inline-block mb-8">
        <div className="absolute inset-0 bg-sage rotate-6 rounded-sm group-hover:rotate-12 transition-transform"></div>
        <img
          src={testimonial.image}
          alt={`Photo of ${testimonial.name}`}
          className="relative w-24 h-24 object-cover border-4 border-white grayscale group-hover:grayscale-0 transition-all rounded-sm"
          loading="lazy"
        />
      </div>

      <div className="flex justify-center gap-1 mb-6 text-yellow-400" aria-label={`${testimonial.rating} out of 5 stars`}>
        {[...Array(testimonial.rating)].map((_, i) => <span key={i} aria-hidden="true">★</span>)}
      </div>

      <blockquote className="text-lg text-earth leading-relaxed italic mb-8">
        "{testimonial.quote}"
      </blockquote>

      <div>
        <cite className="not-italic block font-serif text-xl text-earth">{testimonial.name}</cite>
        <span className="text-[10px] uppercase tracking-widest text-earth/40 font-bold">{testimonial.location}</span>
      </div>
    </div>
  );
};
