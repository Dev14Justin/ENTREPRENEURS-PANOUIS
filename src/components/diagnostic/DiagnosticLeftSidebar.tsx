import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const DiagnosticLeftSidebar: React.FC = () => (
  <div className="hidden md:flex md:w-1/3 bg-brand-dark text-white p-12 flex-col justify-between relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/20 to-brand-dark/90"></div>
    <div className="relative z-10">
      <div className="mb-12">
        <span className="text-brand-secondary tracking-[0.2em] text-xs font-bold uppercase">Entrepreneurs Epanouis</span>
        <h2 className="text-3xl font-serif font-bold mt-4 leading-tight">Votre transformation commence ici.</h2>
      </div>
      
      <div className="space-y-8">
        <div className="pl-6 border-l-2 border-brand-secondary">
          <p className="italic text-brand-soft text-sm mb-3 leading-relaxed">"Ce diagnostic a été un électrochoc. J'ai réalisé pourquoi je stagnais depuis 2 ans. 3 mois après l'accompagnement, j'ai doublé mon CA."</p>
          <span className="font-bold text-white text-xs tracking-wide">— Sophie M., Thérapeute</span>
        </div>
        <div className="pl-6 border-l-2 border-brand-secondary">
          <p className="italic text-brand-soft text-sm mb-3 leading-relaxed">"Enfin une approche qui ne demande pas de devenir un requin de la vente. Juste de l'alignement."</p>
          <span className="font-bold text-white text-xs tracking-wide">— Marc D., Coach Sportif</span>
        </div>
      </div>
    </div>
    
    <div className="relative z-10 pt-10">
      <div className="flex items-center gap-2 text-xs font-bold text-brand-soft/70 uppercase tracking-widest">
        <ShieldCheck size={14} /> 100% Confidentiel & Gratuit
      </div>
    </div>
  </div>
);
