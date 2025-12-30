import React from 'react';
import { Link } from 'react-router-dom';

export const Logo: React.FC = () => (
  <Link to="/" className="flex flex-col items-start group">
    <span className="text-2xl font-serif font-bold text-brand-dark tracking-tight group-hover:text-brand-primary transition-colors">
      ENTREPRENEURS
    </span>
    <span className="text-xs font-sans font-semibold tracking-[0.25em] text-brand-primary group-hover:text-brand-dark transition-colors uppercase">
      Epanouis
    </span>
  </Link>
);