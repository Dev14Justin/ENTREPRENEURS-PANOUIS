import React from 'react';
import { ArrowRight, Check, Star, Shield, TrendingUp, Users } from 'lucide-react';
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
  <section className="relative bg-brand-primary overflow-hidden">
    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-white space-y-8 animate-fade-in">
          <h1 className="text-4xl lg:text-6xl font-serif font-bold leading-tight">
            Accélérez votre impact. <br/>
            <span className="text-brand-accent">Attirez des clients premium.</span>
          </h1>
          <p className="text-lg text-stone-100 max-w-lg leading-relaxed font-light">
            Nous accompagnons les coachs, thérapeutes et experts en transformation de vie à créer une activité puissante, stable et hautement rentable — sans s’épuiser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/diagnostic" className="inline-flex justify-center items-center px-8 py-4 bg-brand-accent text-brand-dark font-bold rounded-sm shadow-lg hover:bg-yellow-500 transition-all transform hover:-translate-y-1">
              Réserver un Diagnostic Stratégique
            </Link>
            <Link to="/about" className="inline-flex justify-center items-center px-8 py-4 border border-white text-white font-medium rounded-sm hover:bg-white hover:text-brand-primary transition-colors">
              Découvrir notre approche
            </Link>
          </div>
        </div>
        <div className="relative hidden lg:block animate-fade-in delay-200">
          <div className="absolute inset-0 bg-brand-accent/20 transform translate-x-4 translate-y-4 rounded-sm"></div>
          <img 
            src="https://picsum.photos/seed/business/600/700" 
            alt="Entrepreneur Epanoui" 
            className="relative rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 object-cover h-[600px] w-full"
          />
        </div>
      </div>
    </div>
  </section>
);

const TargetAudience: React.FC = () => (
  <section className="py-20 bg-stone-50">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h2 className="text-3xl font-serif font-bold text-brand-dark mb-12">Est-ce que c’est pour moi ?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Users, title: "Attirer", desc: "Des clients engagés et hautement qualifiés." },
          { icon: Shield, title: "Vendre", desc: "Des offres premium avec intégrité." },
          { icon: TrendingUp, title: "Impacter", desc: "Grâce à un business clair, simple et efficace." }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow border-t-4 border-brand-primary">
            <item.icon className="w-12 h-12 text-brand-primary mx-auto mb-6" />
            <h3 className="text-xl font-bold mb-4">{item.title}</h3>
            <p className="text-stone-600">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-16 bg-white p-8 rounded-sm border border-stone-200 shadow-sm max-w-3xl mx-auto">
        <h3 className="text-2xl font-serif font-bold text-brand-primary mb-4">En deux mots</h3>
        <p className="text-lg text-stone-700 italic">
          "Si votre métier, c’est de transformer des vies… <br/>
          Notre métier, c’est de transformer votre business."
        </p>
      </div>
    </div>
  </section>
);

const Methodology: React.FC = () => (
  <section className="py-24 bg-brand-dark text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">La Méthode <span className="text-brand-accent">EPANOUIS™</span></h2>
        <p className="text-stone-400 max-w-2xl mx-auto">
          Une méthode qui honore la profondeur... et simplifie la stratégie.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {EPANOUIS_STEPS.map((step, idx) => (
          <div key={idx} className="group flex flex-col justify-between bg-stone-800/50 p-6 rounded-sm border border-stone-700 hover:border-brand-primary transition-colors cursor-default">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <span className="text-4xl font-black text-brand-primary opacity-30 group-hover:opacity-100 transition-opacity">
                  {step.l}
                </span>
                <h3 className="font-bold text-lg leading-tight">{step.t}</h3>
              </div>
              <p className="text-sm text-stone-400 mb-6">{step.d}</p>
            </div>
            
            <button
              onClick={() => document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' })}
              className="self-start text-xs font-bold text-brand-primary uppercase tracking-wider hover:text-brand-accent transition-colors flex items-center gap-1 mt-auto"
            >
              En savoir plus <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const WhyUs: React.FC = () => (
  <section id="why-us" className="py-24 animate-bg-pulse">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="order-2 lg:order-1 relative">
        <div className="absolute top-0 left-0 w-24 h-24 bg-brand-accent/20 -translate-x-4 -translate-y-4"></div>
        <img 
          src="https://picsum.photos/seed/meeting/600/400" 
          alt="Coaching" 
          className="relative z-10 rounded-sm shadow-xl grayscale hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-primary/10 translate-x-4 translate-y-4"></div>
      </div>
      <div className="order-1 lg:order-2 space-y-6">
        <h2 className="text-3xl font-serif font-bold text-brand-dark">Pourquoi travailler avec nous ?</h2>
        <ul className="space-y-4">
          <li className="flex gap-4 items-start">
            <Check className="text-brand-primary shrink-0 mt-1 animate-subtle-bounce" />
            <p className="text-stone-700">Parce que nous comprenons vos défis de visibilité et de légitimité.</p>
          </li>
          <li className="flex gap-4 items-start">
            <Check className="text-brand-primary shrink-0 mt-1 animate-subtle-bounce delay-100" />
            <p className="text-stone-700">Parce que nous avons accompagné des entrepreneurs à dépasser leurs blocages.</p>
          </li>
          <li className="flex gap-4 items-start">
            <Check className="text-brand-primary shrink-0 mt-1 animate-subtle-bounce delay-200" />
            <p className="text-stone-700 font-medium italic">"Nous voulons que votre appel devienne votre réussite."</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
);

const CTA: React.FC = () => (
  <section id="contact" className="py-24 bg-white text-center">
    <div className="max-w-3xl mx-auto px-4">
      <div className="inline-block p-4 rounded-full bg-brand-primary/10 mb-6 text-brand-primary">
        <Star size={32} />
      </div>
      <h2 className="text-4xl font-serif font-bold text-brand-dark mb-6">
        Votre vocation mérite un business à sa hauteur.
      </h2>
      <p className="text-xl text-stone-600 mb-10 leading-relaxed">
        Votre mission mérite un système. Et votre impact mérite une stratégie claire.
        Ne restez plus seul face à votre croissance.
      </p>
      <Link to="/diagnostic" className="inline-block px-10 py-5 bg-brand-primary text-white font-bold text-lg rounded-sm shadow-xl hover:bg-brand-dark transition-all transform hover:scale-105">
        Réserver mon Diagnostic Stratégique
      </Link>
      <p className="mt-6 text-sm text-stone-400">
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