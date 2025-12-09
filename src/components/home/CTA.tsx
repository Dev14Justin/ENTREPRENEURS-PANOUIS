import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CTA: React.FC = () => (
  <section id="contact" className="py-28 bg-brand-light relative overflow-hidden text-center">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white rounded-full blur-3xl opacity-60 pointer-events-none"></div>
    
    <div className="max-w-3xl mx-auto px-4 relative z-10">
      <div className="inline-flex items-center justify-center p-4 rounded-full bg-white shadow-sm mb-8 text-brand-primary">
        <Star size={32} fill="currentColor" className="text-brand-secondary" />
      </div>
      <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-8 leading-tight">
        Votre vocation mérite <br/> un business à sa hauteur.
      </h2>
      <p className="text-xl text-slate-600 mb-12 leading-relaxed">
        Votre mission mérite un système. Et votre impact mérite une stratégie claire.
        Ne restez plus seul face à votre croissance.
      </p>
      <Link to="/diagnostic" className="inline-block px-12 py-5 bg-gradient-to-r from-brand-primary to-brand-dark text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
        Réserver mon Diagnostic Stratégique
      </Link>
      <p className="mt-8 text-sm text-slate-500 font-medium">
        Appel gratuit de 30 minutes • Sans engagement
      </p>
    </div>
  </section>
);
