import React, { useState } from 'react';
import { ArrowRight, Check, ChevronLeft, Send, ShieldCheck, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

type Step = 'intro' | 'situation' | 'challenges' | 'goals' | 'contact' | 'submitting' | 'success';

interface FormData {
  revenue: string;
  challenge: string;
  goal: string;
  name: string;
  email: string;
  phone: string;
}

export const Diagnostic: React.FC = () => {
  const [step, setStep] = useState<Step>('intro');
  const [formData, setFormData] = useState<FormData>({
    revenue: '',
    challenge: '',
    goal: '',
    name: '',
    email: '',
    phone: ''
  });

  const handleNext = (nextStep: Step) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(nextStep);
  };

  const handleChange = (field: keyof FormData, value: string) => {
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

  // --- SUB-COMPONENTS FOR STEPS ---

  const IntroStep = () => (
    <div className="animate-fade-in space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4">
          Candidature pour un Accompagnement Stratégique
        </h1>
        <p className="text-stone-600 text-lg leading-relaxed">
          Nous n'acceptons qu'un nombre limité d'entrepreneurs par mois pour garantir la qualité de notre suivi.
          Ce diagnostic nous permet de vérifier si notre méthode est adaptée à votre situation actuelle.
        </p>
      </div>
      
      <div className="bg-brand-light p-6 rounded-sm border border-brand-secondary/30">
        <h3 className="font-bold text-brand-primary mb-3 flex items-center gap-2">
          <ShieldCheck size={20}/> Ce diagnostic est pour vous si :
        </h3>
        <ul className="space-y-3 text-stone-700">
          <li className="flex gap-3"><Check size={18} className="text-brand-accent shrink-0"/> Vous êtes coach, consultant ou thérapeute.</li>
          <li className="flex gap-3"><Check size={18} className="text-brand-accent shrink-0"/> Vous voulez dépasser le "plafond de verre" de vos revenus.</li>
          <li className="flex gap-3"><Check size={18} className="text-brand-accent shrink-0"/> Vous êtes prêt à investir sur vous-même.</li>
        </ul>
      </div>

      <button 
        onClick={() => handleNext('situation')}
        className="w-full md:w-auto px-8 py-4 bg-brand-primary text-white font-bold rounded-sm shadow-lg hover:bg-brand-dark transition-all flex items-center justify-center gap-2"
      >
        Démarrer le diagnostic <ArrowRight size={20} />
      </button>
    </div>
  );

  const SituationStep = () => (
    <div className="animate-fade-in space-y-8">
      <h2 className="text-2xl font-serif font-bold text-brand-dark">Quelle est votre situation actuelle ?</h2>
      <div className="space-y-4">
        {['Je lance mon activité (< 2k€ / mois)', 'Je stagne (entre 2k€ et 5k€ / mois)', 'Je suis en croissance (5k€ - 10k€ / mois)', 'Je veux scaler (> 10k€ / mois)'].map((opt) => (
          <button
            key={opt}
            onClick={() => { handleChange('revenue', opt); handleNext('challenges'); }}
            className={`w-full p-4 text-left border rounded-sm transition-all hover:border-brand-primary hover:bg-stone-50 ${formData.revenue === opt ? 'border-brand-primary bg-brand-light ring-1 ring-brand-primary' : 'border-stone-200'}`}
          >
            {opt}
          </button>
        ))}
      </div>
      <button onClick={() => setStep('intro')} className="text-sm text-stone-500 hover:text-stone-800 flex items-center gap-1">
        <ChevronLeft size={16}/> Retour
      </button>
    </div>
  );

  const ChallengesStep = () => (
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
            className={`w-full p-4 text-left border rounded-sm transition-all hover:border-brand-primary hover:bg-stone-50 ${formData.challenge === opt ? 'border-brand-primary bg-brand-light ring-1 ring-brand-primary' : 'border-stone-200'}`}
          >
            {opt}
          </button>
        ))}
      </div>
      <button onClick={() => setStep('situation')} className="text-sm text-stone-500 hover:text-stone-800 flex items-center gap-1">
        <ChevronLeft size={16}/> Retour
      </button>
    </div>
  );

  const GoalsStep = () => (
    <div className="animate-fade-in space-y-8">
      <h2 className="text-2xl font-serif font-bold text-brand-dark">Quel est votre objectif principal à 90 jours ?</h2>
      <textarea
        autoFocus
        rows={4}
        className="w-full p-4 border border-stone-300 rounded-sm focus:ring-2 focus:ring-brand-primary outline-none"
        placeholder="Ex: Atteindre 5k€ de CA stable, lancer ma nouvelle offre..."
        value={formData.goal}
        onChange={(e) => handleChange('goal', e.target.value)}
      ></textarea>
      <div className="flex items-center justify-between">
        <button onClick={() => setStep('challenges')} className="text-sm text-stone-500 hover:text-stone-800 flex items-center gap-1">
          <ChevronLeft size={16}/> Retour
        </button>
        <button 
          disabled={!formData.goal}
          onClick={() => handleNext('contact')}
          className="px-8 py-3 bg-brand-primary text-white font-bold rounded-sm shadow-md hover:bg-brand-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continuer
        </button>
      </div>
    </div>
  );

  const ContactStep = () => (
    <div className="animate-fade-in space-y-8">
      <h2 className="text-2xl font-serif font-bold text-brand-dark">Dernière étape : Vos coordonnées</h2>
      <p className="text-stone-600">Où pouvons-nous vous envoyer le bilan de votre diagnostic ?</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Prénom & Nom</label>
          <input required type="text" className="w-full p-3 border border-stone-300 rounded-sm focus:ring-1 focus:ring-brand-primary outline-none" 
            value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Email professionnel</label>
          <input required type="email" className="w-full p-3 border border-stone-300 rounded-sm focus:ring-1 focus:ring-brand-primary outline-none" 
             value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Téléphone (Optionnel)</label>
          <input type="tel" className="w-full p-3 border border-stone-300 rounded-sm focus:ring-1 focus:ring-brand-primary outline-none" 
             value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} />
        </div>

        <div className="pt-4 flex items-center justify-between">
          <button type="button" onClick={() => setStep('goals')} className="text-sm text-stone-500 hover:text-stone-800 flex items-center gap-1">
            <ChevronLeft size={16}/> Retour
          </button>
          <button 
            type="submit"
            className="px-8 py-4 bg-brand-accent text-brand-dark font-bold rounded-sm shadow-lg hover:bg-yellow-500 transition-all flex items-center gap-2"
          >
            Envoyer ma candidature <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );

  const SuccessStep = () => (
    <div className="animate-fade-in text-center py-10">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check size={40} className="text-green-600" />
      </div>
      <h2 className="text-3xl font-serif font-bold text-brand-dark mb-4">Candidature reçue !</h2>
      <p className="text-stone-600 max-w-lg mx-auto mb-8 text-lg">
        Merci {formData.name}. Votre profil a retenu notre attention.
        <br/><br/>
        Un membre de notre équipe va analyser vos réponses sous 24h. Si votre profil correspond, vous recevrez un lien pour réserver votre appel stratégique.
      </p>
      <Link to="/" className="inline-block px-8 py-3 border border-stone-300 text-stone-600 rounded-sm hover:bg-stone-50 font-medium">
        Retour à l'accueil
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <div className="flex-grow flex flex-col md:flex-row max-w-7xl mx-auto w-full shadow-2xl my-0 md:my-10 bg-white rounded-lg overflow-hidden min-h-[600px]">
        
        {/* Left Sidebar (Desktop only) */}
        <div className="hidden md:flex md:w-1/3 bg-brand-dark text-white p-10 flex-col justify-between relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           <div className="relative z-10">
             <div className="mb-12">
               <span className="text-brand-accent tracking-widest text-xs font-bold uppercase">Entrepreneurs Epanouis</span>
               <h2 className="text-2xl font-serif font-bold mt-2">Votre transformation commence ici.</h2>
             </div>
             
             <div className="space-y-8">
               <div className="pl-4 border-l-2 border-brand-accent">
                 <p className="italic text-stone-300 text-sm mb-2">"Ce diagnostic a été un électrochoc. J'ai réalisé pourquoi je stagnais depuis 2 ans. 3 mois après l'accompagnement, j'ai doublé mon CA."</p>
                 <span className="font-bold text-white text-xs">— Sophie M., Thérapeute</span>
               </div>
               <div className="pl-4 border-l-2 border-brand-accent">
                 <p className="italic text-stone-300 text-sm mb-2">"Enfin une approche qui ne demande pas de devenir un requin de la vente. Juste de l'alignement."</p>
                 <span className="font-bold text-white text-xs">— Marc D., Coach Sportif</span>
               </div>
             </div>
           </div>
           
           <div className="relative z-10 pt-10">
             <div className="flex items-center gap-2 text-xs text-stone-400">
               <ShieldCheck size={14} /> 100% Confidentiel & Gratuit
             </div>
           </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-2/3 p-6 md:p-16 flex flex-col justify-center relative">
          
          {/* Progress Bar */}
          {step !== 'intro' && step !== 'success' && step !== 'submitting' && (
            <div className="absolute top-0 left-0 w-full h-1 bg-stone-100">
              <div 
                className="h-full bg-brand-primary transition-all duration-500"
                style={{ 
                  width: step === 'situation' ? '25%' : step === 'challenges' ? '50%' : step === 'goals' ? '75%' : '90%' 
                }}
              ></div>
            </div>
          )}

          {step === 'intro' && <IntroStep />}
          {step === 'situation' && <SituationStep />}
          {step === 'challenges' && <ChallengesStep />}
          {step === 'goals' && <GoalsStep />}
          {step === 'contact' && <ContactStep />}
          
          {step === 'submitting' && (
             <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
               <Loader2 className="animate-spin text-brand-primary mb-4" size={48} />
               <h3 className="text-xl font-bold text-brand-dark">Analyse de votre profil en cours...</h3>
               <p className="text-stone-500 mt-2">Veuillez patienter quelques instants.</p>
             </div>
          )}
          
          {step === 'success' && <SuccessStep />}

        </div>
      </div>
    </div>
  );
};