import React, { useState } from 'react';
import { Instagram, Linkedin, Facebook, ArrowRight, Copy, Check } from 'lucide-react';

export const FooterSocial: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('contact@entrepreneurs-epanouis.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <h4 className="text-white font-semibold mb-6">Restons Connectés</h4>
      <div className="flex space-x-4 mb-8">
        <a href="#" className="p-2 bg-brand-primary/20 rounded-full hover:bg-brand-secondary/20 text-white hover:text-brand-secondary transition-all"><Instagram size={20} /></a>
        <a href="#" className="p-2 bg-brand-primary/20 rounded-full hover:bg-brand-secondary/20 text-white hover:text-brand-secondary transition-all"><Linkedin size={20} /></a>
        <a href="#" className="p-2 bg-brand-primary/20 rounded-full hover:bg-brand-secondary/20 text-white hover:text-brand-secondary transition-all"><Facebook size={20} /></a>
      </div>
      <div className="flex flex-col items-start gap-4">
         <a 
           href="mailto:contact@entrepreneurs-epanouis.com" 
           className="inline-flex items-center gap-2 text-sm border border-brand-primary/30 px-6 py-3 rounded-full hover:border-brand-secondary hover:bg-brand-secondary/10 hover:text-white transition-all"
         >
           Nous contacter <ArrowRight size={14} />
         </a>
         <button 
           onClick={handleCopy}
           className="flex items-center gap-2 text-xs text-slate-400 hover:text-brand-secondary transition-colors ml-1 group"
         >
           {copied ? <Check size={14} className="text-brand-secondary" /> : <Copy size={14} className="group-hover:scale-110 transition-transform"/>}
           <span className="underline decoration-dotted underline-offset-4 decoration-slate-600 group-hover:decoration-brand-secondary">
              {copied ? 'Adresse copiée !' : 'Copier l\'email'}
           </span>
         </button>
      </div>
    </div>
  );
};
