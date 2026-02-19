
import React from 'react';
import { Service } from '../types';

export const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  return (
    <div className="group bg-white p-10 border border-earth/5 hover:border-sage transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full cursor-pointer">
      <div className="text-5xl mb-8 grayscale group-hover:grayscale-0 transition-all scale-100 group-hover:scale-110 origin-left duration-500" aria-hidden="true">
        {service.icon}
      </div>
      <h3 className="text-2xl font-serif text-earth mb-4 group-hover:text-sage transition-colors">
        {service.title}
      </h3>
      <p className="text-earth/70 leading-relaxed mb-8 flex-grow">
        {service.description}
      </p>
      {service.price && (
        <p className="text-sm font-bold text-accent uppercase tracking-widest border-t border-earth/10 pt-6">
          {service.price}
        </p>
      )}
    </div>
  );
};
