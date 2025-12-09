import React from 'react';
import { ChevronLeft } from 'lucide-react';
import type { DiagnosticStep, DiagnosticFormData } from '../../types';

interface SituationStepProps {
  handleNext: (nextStep: DiagnosticStep) => void;
  setStep: (step: DiagnosticStep) => void;
  handleChange: (field: keyof DiagnosticFormData, value: string) => void;
  formData: DiagnosticFormData;
}

export const SituationStep: React.FC<SituationStepProps> = ({ handleNext, setStep, handleChange, formData }) => (
  <div className="animate-fade-in space-y-8">
    <h2 className="text-2xl font-serif font-bold text-brand-dark">Quelle est votre situation actuelle ?</h2>
    <div className="space-y-4">
      {['Je lance mon activité (< 2k€ / mois)', 'Je stagne (entre 2k€ et 5k€ / mois)', 'Je suis en croissance (5k€ - 10k€ / mois)', 'Je veux scaler (> 10k€ / mois)'].map((opt) => (
        <button
          key={opt}
          onClick={() => { handleChange('revenue', opt); handleNext('challenges'); }}
          className={`w-full p-5 text-left border rounded-2xl transition-all hover:border-brand-primary hover:bg-brand-light hover:shadow-md ${formData.revenue === opt ? 'border-brand-primary bg-brand-primary/5 ring-1 ring-brand-primary text-brand-dark font-bold' : 'border-slate-200 text-slate-700'}`}
        >
          {opt}
        </button>
      ))}
    </div>
    <button onClick={() => setStep('intro')} className="text-sm font-bold text-slate-400 hover:text-brand-primary flex items-center gap-1">
      <ChevronLeft size={16}/> Retour
    </button>
  </div>
);
