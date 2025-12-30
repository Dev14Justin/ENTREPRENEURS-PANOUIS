import React from 'react';
import { Users, Shield, TrendingUp } from 'lucide-react';

export const TargetAudience: React.FC = () => (
  <section className="py-24 bg-white">
    <div className="max-w-6xl mx-auto px-4 text-center">
      <h2 className="text-3xl font-serif font-bold text-brand-dark mb-16">Est-ce que c’est pour moi ?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Users, title: "Attirer", desc: "Des clients engagés et hautement qualifiés." },
          { icon: Shield, title: "Vendre", desc: "Des offres premium avec intégrité." },
          { icon: TrendingUp, title: "Impacter", desc: "Grâce à un business clair, simple et efficace." }
        ].map((item, idx) => (
          <div key={idx} className="group bg-brand-soft p-10 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-brand-soft/50">
            <div className="w-16 h-16 mx-auto mb-6 bg-white rounded-lg flex items-center justify-center text-brand-primary shadow-sm">
              <item.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-brand-dark">{item.title}</h3>
            <p className="text-slate-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-20 max-w-4xl mx-auto">
        <div className="bg-brand-primary text-white rounded-lg p-10 shadow-xl">
          <h3 className="text-2xl font-serif font-bold mb-4 text-white">En deux mots</h3>
          <p className="text-xl italic font-light text-white/90">
            "Si votre métier, c’est de transformer des vies… <br/>
            Notre métier, c’est de transformer votre business."
          </p>
        </div>
      </div>
    </div>
  </section>
);