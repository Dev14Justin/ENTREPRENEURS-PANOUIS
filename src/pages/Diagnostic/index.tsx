import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  IntroStep,
  SituationStep,
  ChallengesStep,
  GoalsStep,
  ContactStep,
  SuccessStep,
  DiagnosticLeftSidebar,
} from '../../components/diagnostic';
import type { DiagnosticStep, DiagnosticFormData } from '../../types';


export const Diagnostic: React.FC = () => {
  const [step, setStep] = useState<DiagnosticStep>('intro');
  const [formData, setFormData] = useState<DiagnosticFormData>({
    revenue: '',
    challenge: '',
    goal: '',
    name: '',
    email: '',
    phone: ''
  });

  const handleNext = (nextStep: DiagnosticStep) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(nextStep);
  };

  const handleChange = (field: keyof DiagnosticFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('submitting');
    // Simulate API call
    setTimeout(() => {
      setStep('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-brand-light flex flex-col py-0 md:py-10">
      <div className="flex-grow flex flex-col md:flex-row max-w-7xl mx-auto w-full shadow-2xl bg-white md:rounded-3xl overflow-hidden min-h-[650px]">
        
        <DiagnosticLeftSidebar />

        {/* Main Content */}
        <div className="w-full md:w-2/3 p-6 md:p-16 flex flex-col justify-center relative">
          
          {/* Progress Bar */}
          {step !== 'intro' && step !== 'success' && step !== 'submitting' && (
            <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
              <div 
                className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary transition-all duration-700 ease-out"
                style={{ 
                  width: step === 'situation' ? '25%' : step === 'challenges' ? '50%' : step === 'goals' ? '75%' : '90%' 
                }}
              ></div>
            </div>
          )}

          {step === 'intro' && <IntroStep handleNext={handleNext} />}
          {step === 'situation' && <SituationStep handleNext={handleNext} setStep={setStep} handleChange={handleChange} formData={formData} />}
          {step === 'challenges' && <ChallengesStep handleNext={handleNext} setStep={setStep} handleChange={handleChange} formData={formData} />}
          {step === 'goals' && <GoalsStep handleNext={handleNext} setStep={setStep} handleChange={handleChange} formData={formData} />}
          {step === 'contact' && <ContactStep setStep={setStep} handleChange={handleChange} formData={formData} handleSubmit={handleSubmit} />}
          
          {step === 'submitting' && (
             <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
               <Loader2 className="animate-spin text-brand-primary mb-6" size={56} />
               <h3 className="text-xl font-bold text-brand-dark">Analyse de votre profil en cours...</h3>
               <p className="text-slate-500 mt-2">Veuillez patienter quelques instants.</p>
             </div>
          )}
          
          {step === 'success' && <SuccessStep formData={formData} />}

        </div>
      </div>
    </div>
  );
};