import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CTA: React.FC = () => (
  <section id="contact" className="py-28 bg-brand-soft relative overflow-hidden text-center">
    <div className="max-w-3xl mx-auto px-4 relative z-10">
      <div className="inline-flex items-center justify-center p-4 rounded-full bg-white shadow-sm mb-8 text-brand-primary">
        <Star size={32} fill="currentColor" className="text-brand-primary" />
      </div>
      <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-8 leading-tight">
        Votre vocation mérite <br/> un business à sa hauteur.
      </h2>
      <p className="text-xl text-slate-600 mb-12 leading-relaxed">
        Votre mission mérite un système. Et votre impact mérite une stratégie claire.
        Ne restez plus seul face à votre croissance.
      </p>
      <Link to="/diagnostic" className="inline-block px-12 py-5 bg-brand-primary text-white font-bold text-lg rounded-md shadow-lg hover:bg-brand-secondary transition-colors duration-300">
        Réserver mon Diagnostic Stratégique
      </Link>
      <p className="mt-8 text-sm text-slate-500 font-medium">
        Appel gratuit de 30 minutes • Sans engagement
      </p>
    </div>
  </section>
);