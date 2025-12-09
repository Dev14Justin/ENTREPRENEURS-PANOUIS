import React from 'react';
import { ChevronLeft } from 'lucide-react';
import type { DiagnosticStep, DiagnosticFormData } from '../../types';

interface GoalsStepProps {
  handleNext: (nextStep: DiagnosticStep) => void;
  setStep: (step: DiagnosticStep) => void;
  handleChange: (field: keyof DiagnosticFormData, value: string) => void;
  formData: DiagnosticFormData;
}

export const GoalsStep: React.FC<GoalsStepProps> = ({ handleNext, setStep, handleChange, formData }) => (
  <div className="animate-fade-in space-y-8">
    <h2 className="text-2xl font-serif font-bold text-brand-dark">Quel est votre objectif principal à 90 jours ?</h2>
    <textarea
      autoFocus
      rows={4}
      className="w-full p-5 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none shadow-sm"
      placeholder="Ex: Atteindre 5k€ de CA stable, lancer ma nouvelle offre..."
      value={formData.goal}
      onChange={(e) => handleChange('goal', e.target.value)}
    ></textarea>
    <div className="flex items-center justify-between">
      <button type="button" onClick={() => setStep('challenges')} className="text-sm font-bold text-slate-400 hover:text-brand-primary flex items-center gap-1">
        <ChevronLeft size={16}/> Retour
      </button>
      <button 
        disabled={!formData.goal}
        onClick={() => handleNext('contact')}
        className="px-10 py-3 bg-brand-primary text-white font-bold rounded-full shadow-md hover:bg-brand-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:-translate-y-1"
      >
        Continuer
      </button>
    </div>
  </div>
);
