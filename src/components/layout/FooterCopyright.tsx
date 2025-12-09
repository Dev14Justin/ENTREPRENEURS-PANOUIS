import React from 'react';
import { Link } from 'react-router-dom';

export const FooterCopyright: React.FC = () => (
  <div className="mt-16 pt-8 border-t border-brand-primary/20 text-center text-xs text-slate-400">
     © {new Date().getFullYear()} Entrepreneurs Epanouis. Tous droits réservés.
     <span className="mx-2">•</span>
     <Link to="/login" className="hover:text-brand-secondary transition-colors">Administration</Link>
  </div>
);
