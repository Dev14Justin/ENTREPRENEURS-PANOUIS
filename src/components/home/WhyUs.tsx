import React from 'react';
import { Check, Star } from 'lucide-react';

export const WhyUs: React.FC = () => (
  <section id="why-us" className="py-24 bg-brand-soft">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <div className="order-2 lg:order-1 relative">
        <img 
          src="https://picsum.photos/seed/meeting/600/400" 
          alt="Coaching" 
          className="relative z-10 rounded-lg shadow-xl object-cover border border-white"
        />
      </div>
      <div className="order-1 lg:order-2 space-y-8">
        <h2 className="text-4xl font-serif font-bold text-brand-dark">Pourquoi nous ?</h2>
        <div className="space-y-6">
          <div className="flex gap-6 items-start p-6 bg-white rounded-lg shadow-sm border border-transparent hover:border-brand-primary/20 transition-colors">
            <div className="shrink-0 w-10 h-10 rounded-md bg-brand-primary text-white flex items-center justify-center mt-1">
              <Check size={20} />
            </div>
            <div>
              <h4 className="font-bold text-brand-dark text-lg mb-1">Compréhension Profonde</h4>
              <p className="text-slate-600">Nous comprenons vos défis de visibilité et de légitimité car nous les avons vécus.</p>
            </div>
          </div>
          <div className="flex gap-6 items-start p-6 bg-white rounded-lg shadow-sm border border-transparent hover:border-brand-primary/20 transition-colors">
            <div className="shrink-0 w-10 h-10 rounded-md bg-brand-primary text-white flex items-center justify-center mt-1">
              <Check size={20} />
            </div>
             <div>
              <h4 className="font-bold text-brand-dark text-lg mb-1">Résultats Concrets</h4>
              <p className="text-slate-600">Nous avons accompagné des entrepreneurs à dépasser leurs blocages mentaux et financiers.</p>
            </div>
          </div>
          <div className="flex gap-6 items-start p-6 bg-white rounded-lg shadow-sm border border-transparent hover:border-brand-primary/20 transition-colors">
            <div className="shrink-0 w-10 h-10 rounded-md bg-brand-dark text-white flex items-center justify-center mt-1">
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