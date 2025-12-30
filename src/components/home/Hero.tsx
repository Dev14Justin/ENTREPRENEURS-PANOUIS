import React from 'react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => (
  <section className="relative bg-brand-light overflow-hidden pt-10 pb-20 lg:pt-24 lg:pb-32">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-8 animate-fade-in">
        <h1 className="text-4xl lg:text-6xl font-serif font-bold leading-tight text-brand-dark">
          Accélérez votre impact. <br/>
          <span className="text-brand-primary">Attirez des clients premium.</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-lg leading-relaxed font-light">
          Nous accompagnons les coachs, thérapeutes et experts en transformation de vie à créer une activité puissante, stable et hautement rentable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link to="/diagnostic" className="inline-flex justify-center items-center px-8 py-4 bg-brand-primary text-white font-bold rounded-md shadow-lg hover:bg-brand-secondary transition-colors duration-300">
            Réserver un Diagnostic
          </Link>
          <Link to="/about" className="inline-flex justify-center items-center px-8 py-4 border border-brand-dark text-brand-dark font-medium rounded-md hover:bg-brand-soft transition-colors duration-300">
            Découvrir notre approche
          </Link>
        </div>
      </div>
      <div className="relative hidden lg:block animate-fade-in delay-200">
        <img 
          src="https://picsum.photos/seed/business/600/700" 
          alt="Entrepreneur Epanoui" 
          className="relative rounded-lg shadow-xl object-cover h-[600px] w-full"
        />
      </div>
    </div>
  </section>
);