import React from 'react';
import { ArrowUpRight } from 'lucide-react';

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

export const Methodology: React.FC = () => (
  <section className="py-24 bg-brand-dark text-white relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-20">
        <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">La Méthode <span className="text-brand-primary">EPANOUIS™</span></h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Une méthode qui honore la profondeur... et simplifie la stratégie.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {EPANOUIS_STEPS.map((step, idx) => (
          <div key={idx} className="group flex flex-col justify-between bg-white/5 p-8 rounded-lg border border-white/10 hover:border-brand-primary hover:bg-white/10 transition-all duration-300">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl font-black text-brand-primary opacity-80 group-hover:opacity-100 transition-opacity">
                  {step.l}
                </span>
                <h3 className="font-bold text-lg leading-tight text-white">{step.t}</h3>
              </div>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">{step.d}</p>
            </div>
            
            <button
              onClick={() => document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' })}
              className="self-start px-4 py-2 rounded-md bg-brand-primary/20 text-xs font-bold text-brand-primary uppercase tracking-wider hover:bg-brand-primary hover:text-white transition-all flex items-center gap-2 mt-auto"
            >
              Détails <ArrowUpRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);