import React from 'react';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import type { Step } from '../../types'; // Assuming Step type is defined in types.ts

interface IntroStepProps {
  handleNext: (nextStep: Step) => void;
}

export const IntroStep: React.FC<IntroStepProps> = ({ handleNext }) => (
  <div className="animate-fade-in space-y-8">
    <div>
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-6">
        Candidature pour un Accompagnement Stratégique
      </h1>
      <p className="text-slate-600 text-lg leading-relaxed">
        Nous n'acceptons qu'un nombre limité d'entrepreneurs par mois pour garantir la qualité de notre suivi.
        Ce diagnostic nous permet de vérifier si notre méthode est adaptée à votre situation actuelle.
      </p>
    </div>
    
    <div className="bg-brand-light/50 p-8 rounded-3xl border border-brand-primary/10">
      <h3 className="font-bold text-brand-primary mb-4 flex items-center gap-2 text-lg">
        <ShieldCheck size={24}/> Ce diagnostic est pour vous si :
      </h3>
      <ul className="space-y-4 text-slate-700">
        <li className="flex gap-4"><Check size={20} className="text-brand-secondary shrink-0"/> Vous êtes coach, consultant ou thérapeute.</li>
        <li className="flex gap-4"><Check size={20} className="text-brand-secondary shrink-0"/> Vous voulez dépasser le "plafond de verre" de vos revenus.</li>
        <li className="flex gap-4"><Check size={20} className="text-brand-secondary shrink-0"/> Vous êtes prêt à investir sur vous-même.</li>
      </ul>
    </div>

    <button 
      onClick={() => handleNext('situation')}
      className="w-full md:w-auto px-10 py-4 bg-brand-primary text-white font-bold rounded-full shadow-lg shadow-brand-primary/30 hover:bg-brand-dark hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
    >
      Démarrer le diagnostic <ArrowRight size={20} />
    </button>
  </div>
);
