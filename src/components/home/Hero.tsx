import React from 'react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => (
  <section className="relative bg-brand-dark overflow-hidden lg:pt-20">
    <div className="grid grid-cols-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:grid-cols-2 gap-16 items-center">
      <div className="text-white space-y-8 animate-fade-in">
        <h1 className="text-4xl lg:text-6xl font-serif font-bold leading-tight">
          Accélérez votre impact. <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-soft">Attirez des clients premium.</span>
        </h1>
        <p className="text-lg text-brand-light/80 max-w-lg leading-relaxed font-light">
          Nous accompagnons les coachs, thérapeutes et experts en transformation de vie à créer une activité puissante, stable et hautement rentable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link to="/diagnostic" className="inline-flex justify-center items-center px-8 py-4 bg-brand-secondary text-brand-dark font-bold rounded-full shadow-[0_0_20px_rgba(0,180,216,0.4)] hover:shadow-[0_0_30px_rgba(0,180,216,0.6)] hover:bg-white transition-all transform hover:-translate-y-1">
            Réserver un Diagnostic
          </Link>
          <Link to="/about" className="inline-flex justify-center items-center px-8 py-4 border border-brand-soft/30 text-white font-medium rounded-full hover:bg-white/10 transition-colors">
            Découvrir notre approche
          </Link>
        </div>
      </div>
      <div className="relative hidden lg:block animate-fade-in delay-200">
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary to-brand-secondary rounded-[3rem] transform rotate-3 scale-95 opacity-50 blur-lg"></div>
        <img 
          src="https://picsum.photos/seed/business/600/700" 
          alt="Entrepreneur Epanoui" 
          className="relative rounded-[3rem] shadow-2xl border-4 border-brand-primary/20 object-cover h-[600px] w-full transform transition-transform hover:scale-[1.01] duration-700"
        />
      </div>
    </div>
  </section>
);
