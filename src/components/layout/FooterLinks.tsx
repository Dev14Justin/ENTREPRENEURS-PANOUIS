import React from 'react';
import { Link } from 'react-router-dom';

export const FooterLinks: React.FC = () => (
  <div>
    <h4 className="text-white font-semibold mb-6">Navigation</h4>
    <ul className="space-y-3 text-sm">
      <li><Link to="/" className="hover:text-brand-secondary transition-colors">Accueil</Link></li>
      <li><Link to="/about" className="hover:text-brand-secondary transition-colors">À Propos</Link></li>
      <li><Link to="/blog" className="hover:text-brand-secondary transition-colors">Le Blog</Link></li>
      <li><span className="text-slate-500 cursor-default">Mentions Légales</span></li>
    </ul>
  </div>
);
