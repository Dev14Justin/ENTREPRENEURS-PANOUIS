import React from 'react';
import { ChevronLeft, Send } from 'lucide-react';
import type { DiagnosticStep, DiagnosticFormData } from '../../types';

interface ContactStepProps {
  setStep: (step: DiagnosticStep) => void;
  handleChange: (field: keyof DiagnosticFormData, value: string) => void;
  formData: DiagnosticFormData;
  handleSubmit: (e: React.FormEvent) => void;
}

export const ContactStep: React.FC<ContactStepProps> = ({ setStep, handleChange, formData, handleSubmit }) => (
  <div className="animate-fade-in space-y-8">
    <h2 className="text-2xl font-serif font-bold text-brand-dark">Dernière étape : Vos coordonnées</h2>
    <p className="text-slate-600">Où pouvons-nous vous envoyer le bilan de votre diagnostic ?</p>
    
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Prénom & Nom</label>
        <input required type="text" className="w-full px-5 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none" 
          value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Email professionnel</label>
        <input required type="email" className="w-full px-5 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none" 
           value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Téléphone (Optionnel)</label>
        <input type="tel" className="w-full px-5 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none" 
           value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} />
      </div>

      <div className="pt-6 flex items-center justify-between">
        <button type="button" onClick={() => setStep('goals')} className="text-sm font-bold text-slate-400 hover:text-brand-primary flex items-center gap-1">
          <ChevronLeft size={16}/> Retour
        </button>
        <button 
          type="submit"
          className="px-8 py-4 bg-brand-secondary text-brand-dark font-bold rounded-full shadow-lg hover:bg-white transition-all flex items-center gap-2 hover:scale-105"
        >
          Envoyer ma candidature <Send size={18} />
        </button>
      </div>
    </form>
  </div>
);
