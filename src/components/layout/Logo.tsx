import React from 'react';
import { Link } from 'react-router-dom';

export const Logo: React.FC = () => (
  <Link to="/" className="flex flex-col items-start group">
    <span className="text-2xl font-serif font-bold text-brand-dark tracking-tight group-hover:text-brand-primary transition-colors">
      ENTREPRENEURS
    </span>
    <span className="text-sm font-sans font-medium tracking-[0.2em] text-brand-primary group-hover:text-brand-secondary transition-colors">
      EPANOUIS
    </span>
  </Link>
);
