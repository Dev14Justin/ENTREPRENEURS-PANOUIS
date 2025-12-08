import React from 'react';
import { ArrowRight, Check, Star, Shield, TrendingUp, Users, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const EPANOUIS_STEPS = [
  { l: 'E', t: 'Élever l’identité', d: 'Incarnez le leader que votre business mérite.' },
  { l: 'P', t: 'Poser le message clair', d: 'Soyez magnétique avec une communication précise.' },
  { l: 'A', t: 'Architecturer l’offre', d: 'Créez une offre premium irrésistible.' },
  { l: 'N', t: 'Normaliser l’autorité', d: 'Devenez la référence incontournable de votre niche.' },
  { l: 'O', t: 'Optimiser l’acquisition', d: 'Attirez des prospects qualifiés en continu.' },
  { l: 'U', t: 'Unifier énergie & stratégie', d: 'Alliez intuition et actions massives.' },
  { l: 'I', t: 'Inspirer et convertir', d: 'Vendez avec intégrité et impact.' },
  { l: 'S', t: 'Stabiliser le business', d: 'Sécurisez votre croissance sur le long terme.' },
];

const Hero: React.FC = () => (
  <section className="relative bg-brand-dark overflow-hidden pb-10 pt-10 lg:pt-20">
    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-secondary via-brand-dark to-brand-dark"></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="text-white space-y-8 animate-fade-in">
          <div className="inline-block px-4 py-1 rounded-full bg-brand-primary/20 border border-brand-primary/50 text-brand-soft text-sm font-medium mb-2">
            🚀 Accompagnement Premium
          </div>
          <h1 className="text-4xl lg:text-6xl font-serif font-bold leading-tight">
            Accélérez votre impact. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-soft">Attirez des clients premium.</span>
          </h1>
          <p className="text-lg text-brand-light/80 max-w-lg leading-relaxed font-light">
            Nous accompagnons les coachs, thérapeutes et experts en transformation de vie à créer une activité puissante, stable et hautement rentable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/diagnostic" className="inline-flex justify-center items-center px-8 py-4 bg-brand-secondary text-brand-dark font-bold rounded-full shadow-[0_0_20px_rgba(0,180,216,0.4)] hover:shadow-[0_0_30px_rgba(0,180,216,0.6)] hover:bg-white transition-all transform hover:-translate-y-1">
              Réserver un Diagnostic
            </Link>
            <Link to="/about" className="inline-flex justify-center items-center px-8 py-4 border border-brand-soft/30 text-white font-medium rounded-full hover:bg-white/10 transition-colors">
              Découvrir notre approche
            </Link>
          </div>
        </div>
        <div className="relative hidden lg:block animate-fade-in delay-200">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary to-brand-secondary rounded-[3rem] transform rotate-3 scale-95 opacity-50 blur-lg"></div>
          <img 
            src="https://picsum.photos/seed/business/600/700" 
            alt="Entrepreneur Epanoui" 
            className="relative rounded-[3rem] shadow-2xl border-4 border-brand-primary/20 object-cover h-[600px] w-full transform transition-transform hover:scale-[1.01] duration-700"
          />
        </div>
      </div>
    </div>
    {/* Curve divider */}
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
      <svg className="relative block w-full h-16 md:h-24" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-brand-light"></path>
      </svg>
    </div>
  </section>
);

const TargetAudience: React.FC = () => (
  <section className="py-24 bg-brand-light">
    <div className="max-w-6xl mx-auto px-4 text-center">
      <h2 className="text-3xl font-serif font-bold text-brand-dark mb-16">Est-ce que c’est pour moi ?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Users, title: "Attirer", desc: "Des clients engagés et hautement qualifiés." },
          { icon: Shield, title: "Vendre", desc: "Des offres premium avec intégrité." },
          { icon: TrendingUp, title: "Impacter", desc: "Grâce à un business clair, simple et efficace." }
        ].map((item, idx) => (
          <div key={idx} className="group bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-6 bg-brand-soft/20 rounded-2xl flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-colors text-brand-primary">
              <item.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-brand-dark">{item.title}</h3>
            <p className="text-slate-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-20 bg-gradient-to-r from-brand-primary to-brand-secondary p-1 rounded-3xl shadow-lg max-w-4xl mx-auto">
        <div className="bg-white rounded-[1.3rem] p-10">
          <h3 className="text-2xl font-serif font-bold text-brand-primary mb-4">En deux mots</h3>
          <p className="text-xl text-slate-700 italic font-light">
            "Si votre métier, c’est de transformer des vies… <br/>
            Notre métier, c’est de transformer votre business."
          </p>
        </div>
      </div>
    </div>
  </section>
);

const Methodology: React.FC = () => (
  <section className="py-24 bg-brand-dark text-white relative">
    {/* Decorative background circles */}
    <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-20">
        <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">La Méthode <span className="text-brand-secondary">EPANOUIS™</span></h2>
        <p className="text-brand-soft/80 max-w-2xl mx-auto text-lg">
          Une méthode qui honore la profondeur... et simplifie la stratégie.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {EPANOUIS_STEPS.map((step, idx) => (
          <div key={idx} className="group flex flex-col justify-between bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-brand-secondary/50 hover:bg-white/10 transition-all duration-300">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-brand-primary to-brand-secondary opacity-50 group-hover:opacity-100 transition-opacity">
                  {step.l}
                </span>
                <h3 className="font-bold text-lg leading-tight text-brand-light">{step.t}</h3>
              </div>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">{step.d}</p>
            </div>
            
            <button
              onClick={() => document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' })}
              className="self-start px-4 py-2 rounded-full bg-brand-primary/10 text-xs font-bold text-brand-secondary uppercase tracking-wider hover:bg-brand-secondary hover:text-brand-dark transition-all flex items-center gap-2 mt-auto"
            >
              Détails <ArrowUpRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const WhyUs: React.FC = () => (
  <section id="why-us" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <div className="order-2 lg:order-1 relative">
        <div className="absolute top-0 left-0 w-32 h-32 bg-brand-soft rounded-full -translate-x-8 -translate-y-8 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-brand-primary rounded-full translate-x-8 translate-y-8 opacity-20"></div>
        <img 
          src="https://picsum.photos/seed/meeting/600/400" 
          alt="Coaching" 
          className="relative z-10 rounded-[3rem] shadow-2xl object-cover"
        />
      </div>
      <div className="order-1 lg:order-2 space-y-8">
        <h2 className="text-4xl font-serif font-bold text-brand-dark">Pourquoi nous ?</h2>
        <div className="space-y-6">
          <div className="flex gap-6 items-start p-4 rounded-2xl hover:bg-brand-light transition-colors">
            <div className="shrink-0 w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center mt-1 shadow-lg shadow-brand-primary/30">
              <Check size={20} />
            </div>
            <div>
              <h4 className="font-bold text-brand-dark text-lg mb-1">Compréhension Profonde</h4>
              <p className="text-slate-600">Nous comprenons vos défis de visibilité et de légitimité car nous les avons vécus.</p>
            </div>
          </div>
          <div className="flex gap-6 items-start p-4 rounded-2xl hover:bg-brand-light transition-colors">
            <div className="shrink-0 w-10 h-10 rounded-full bg-brand-secondary text-white flex items-center justify-center mt-1 shadow-lg shadow-brand-secondary/30">
              <Check size={20} />
            </div>
             <div>
              <h4 className="font-bold text-brand-dark text-lg mb-1">Résultats Concrets</h4>
              <p className="text-slate-600">Nous avons accompagné des entrepreneurs à dépasser leurs blocages mentaux et financiers.</p>
            </div>
          </div>
          <div className="flex gap-6 items-start p-4 rounded-2xl hover:bg-brand-light transition-colors">
            <div className="shrink-0 w-10 h-10 rounded-full bg-brand-dark text-white flex items-center justify-center mt-1 shadow-lg shadow-brand-dark/30">
              <Star size={20} />
            </div>
             <div>
              <h4 className="font-bold text-brand-dark text-lg mb-1">Succès Partagé</h4>
              <p className="text-slate-600 italic">"Nous voulons que votre appel devienne votre réussite."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CTA: React.FC = () => (
  <section id="contact" className="py-28 bg-brand-light relative overflow-hidden text-center">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white rounded-full blur-3xl opacity-60 pointer-events-none"></div>
    
    <div className="max-w-3xl mx-auto px-4 relative z-10">
      <div className="inline-flex items-center justify-center p-4 rounded-full bg-white shadow-sm mb-8 text-brand-primary">
        <Star size={32} fill="currentColor" className="text-brand-secondary" />
      </div>
      <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-8 leading-tight">
        Votre vocation mérite <br/> un business à sa hauteur.
      </h2>
      <p className="text-xl text-slate-600 mb-12 leading-relaxed">
        Votre mission mérite un système. Et votre impact mérite une stratégie claire.
        Ne restez plus seul face à votre croissance.
      </p>
      <Link to="/diagnostic" className="inline-block px-12 py-5 bg-gradient-to-r from-brand-primary to-brand-dark text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
        Réserver mon Diagnostic Stratégique
      </Link>
      <p className="mt-8 text-sm text-slate-500 font-medium">
        Appel gratuit de 30 minutes • Sans engagement
      </p>
    </div>
  </section>
);

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <TargetAudience />
      <Methodology />
      <WhyUs />
      <CTA />
    </>
  );
};