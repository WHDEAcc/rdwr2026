
import React from 'react';
import { PhilosophyItem as PhilosophyType } from '../types';

export const PhilosophyItem: React.FC<{ item: PhilosophyType }> = ({ item }) => {
  return (
    <div className="flex gap-4">
      <div className="text-3xl shrink-0" aria-hidden="true">{item.icon}</div>
      <div>
        <h4 className="text-lg font-serif mb-2 text-warmBeige">{item.title}</h4>
        <p className="text-sm text-warmBeige/60 leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
};
