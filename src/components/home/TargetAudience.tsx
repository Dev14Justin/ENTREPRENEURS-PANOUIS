import React from 'react';
import { Users, Shield, TrendingUp } from 'lucide-react';

export const TargetAudience: React.FC = () => (
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
