import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { DiagnosticFormData } from '../../types';

interface SuccessStepProps {
  formData: DiagnosticFormData;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({ formData }) => (
  <div className="animate-fade-in text-center py-10">
    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-subtle-bounce">
      <Check size={48} className="text-green-600" />
    </div>
    <h2 className="text-3xl font-serif font-bold text-brand-dark mb-4">Candidature reçue !</h2>
    <p className="text-slate-600 max-w-lg mx-auto mb-10 text-lg leading-relaxed">
      Merci {formData.name}. Votre profil a retenu notre attention.
      <br/><br/>
      Un membre de notre équipe va analyser vos réponses sous 24h. Si votre profil correspond, vous recevrez un lien pour réserver votre appel stratégique.
    </p>
    <Link to="/" className="inline-block px-10 py-3 border-2 border-slate-200 text-slate-600 rounded-full hover:border-brand-primary hover:text-brand-primary font-bold transition-all">
      Retour à l'accueil
    </Link>
  </div>
);
