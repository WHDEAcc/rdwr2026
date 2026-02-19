
import React from 'react';
import { Project } from '../types';

export const ProjectCard: React.FC<{ project: Project; onClick?: () => void }> = ({ project, onClick }) => {
  return (
    <div
      className="group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' && onClick) onClick(); }}
      role="button"
      aria-label={`View details for ${project.title}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-earth/10 rounded-sm">
        <img
          src={project.image}
          alt={`${project.title} - Landscape architecture project in ${project.location}`}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          loading="lazy"
        />

        {/* Category badge */}
        <div className="absolute top-4 left-4 bg-earth/80 text-warmBeige px-3 py-1 text-[10px] uppercase tracking-widest font-bold backdrop-blur-sm">
          {project.category}
        </div>

        {/* Year + Scale */}
        <div className="absolute top-4 right-4 flex flex-col gap-1 items-end">
          <span className="bg-sage/90 text-white px-2 py-0.5 text-[9px] uppercase tracking-widest font-bold backdrop-blur-sm">
            {project.year}
          </span>
          <span className="bg-sage/90 text-white px-2 py-0.5 text-[9px] uppercase tracking-widest font-bold backdrop-blur-sm">
            {project.scale}
          </span>
        </div>

        {/* Hover overlay with description + responsibilities */}
        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent translate-y-full group-hover:translate-y-0 focus-within:translate-y-0 transition-transform duration-500">
          <p className="text-white/90 text-sm leading-relaxed mb-3">{project.description}</p>
          <ul className="space-y-1">
            {project.keyResponsibilities.slice(0, 3).map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-white/60 text-[11px] leading-snug">
                <span className="w-1 h-1 bg-sage rounded-full mt-1.5 shrink-0"></span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h4 className="text-xl font-serif text-earth mb-1">{project.title}</h4>
        <p className="text-xs text-earth/50 uppercase tracking-widest font-medium">
          {project.location} · {project.scale}
        </p>
      </div>
    </div>
  );
};
