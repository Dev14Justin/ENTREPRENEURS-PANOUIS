import React from 'react';
import { ChevronLeft } from 'lucide-react';
import type { DiagnosticStep, DiagnosticFormData } from '../../types';

interface ChallengesStepProps {
  handleNext: (nextStep: DiagnosticStep) => void;
  setStep: (step: DiagnosticStep) => void;
  handleChange: (field: keyof DiagnosticFormData, value: string) => void;
  formData: DiagnosticFormData;
}

export const ChallengesStep: React.FC<ChallengesStepProps> = ({ handleNext, setStep, handleChange, formData }) => (
  <div className="animate-fade-in space-y-8">
    <h2 className="text-2xl font-serif font-bold text-brand-dark">Quel est votre plus grand obstacle ?</h2>
    <div className="space-y-4">
      {[
        'Manque de visibilité / Je ne sais pas où trouver mes clients',
        'Difficulté à vendre / Je n\'ose pas annoncer mes prix',
        'Offre floue / Je m\'éparpille',
        'Syndrome de l\'imposteur / Mindset',
        'Gestion du temps / Je suis débordé'
      ].map((opt) => (
        <button
          key={opt}
          onClick={() => { handleChange('challenge', opt); handleNext('goals'); }}
          className={`w-full p-5 text-left border rounded-2xl transition-all hover:border-brand-primary hover:bg-brand-light hover:shadow-md ${formData.challenge === opt ? 'border-brand-primary bg-brand-primary/5 ring-1 ring-brand-primary text-brand-dark font-bold' : 'border-slate-200 text-slate-700'}`}
        >
          {opt}
        </button>
      ))}
    </div>
    <button onClick={() => setStep('situation')} className="text-sm font-bold text-slate-400 hover:text-brand-primary flex items-center gap-1">
      <ChevronLeft size={16}/> Retour
    </button>
  </div>
);
