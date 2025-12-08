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

  const SituationStep = () => (
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

  const GoalsStep = () => (
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
        <button onClick={() => setStep('challenges')} className="text-sm font-bold text-slate-400 hover:text-brand-primary flex items-center gap-1">
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

  const ContactStep = () => (
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

  const SuccessStep = () => (
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

  return (
    <div className="min-h-screen bg-brand-light flex flex-col py-0 md:py-10">
      <div className="flex-grow flex flex-col md:flex-row max-w-7xl mx-auto w-full shadow-2xl bg-white md:rounded-3xl overflow-hidden min-h-[650px]">
        
        {/* Left Sidebar (Desktop only) */}
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

          {step === 'intro' && <IntroStep />}
          {step === 'situation' && <SituationStep />}
          {step === 'challenges' && <ChallengesStep />}
          {step === 'goals' && <GoalsStep />}
          {step === 'contact' && <ContactStep />}
          
          {step === 'submitting' && (
             <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
               <Loader2 className="animate-spin text-brand-primary mb-6" size={56} />
               <h3 className="text-xl font-bold text-brand-dark">Analyse de votre profil en cours...</h3>
               <p className="text-slate-500 mt-2">Veuillez patienter quelques instants.</p>
             </div>
          )}
          
          {step === 'success' && <SuccessStep />}

        </div>
      </div>
    </div>
  );
};