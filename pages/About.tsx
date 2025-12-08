import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="bg-brand-light min-h-screen pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-6">L’essence d’ENTREPRENEURS ÉPANOUIS</h1>
          <div className="w-24 h-2 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full mx-auto"></div>
        </div>

        {/* Content Block 1 */}
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-brand-soft/20 mb-12 animate-fade-in delay-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-brand-primary"></div>
          <h2 className="text-3xl font-bold mb-8 text-brand-dark">Une conviction simple</h2>
          <p className="text-slate-700 text-lg leading-relaxed mb-6">
            ENTREPRENEURS ÉPANOUIS est né d’une conviction simple : les professionnels du mieux-être ont un don… mais pas encore un business à la hauteur de ce don.
          </p>
          <p className="text-slate-700 text-lg leading-relaxed">
            Vous avez une mission. Vous avez la sensibilité, la profondeur, la capacité d’accompagner des transformations profondes.
            Mais dans le monde réel : vous faites face au flou, aux clients non engagés, aux peurs de visibilité, à la culpabilité de vendre.
          </p>
        </div>

        {/* Content Block 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16 animate-fade-in delay-200">
          <div className="relative">
             <div className="absolute inset-0 bg-brand-secondary rounded-[2.5rem] rotate-3 opacity-20"></div>
            <img 
              src="https://picsum.photos/seed/story/500/600" 
              alt="Notre Histoire" 
              className="relative rounded-[2.5rem] shadow-2xl w-full object-cover h-96 hover:scale-[1.02] transition-all duration-500"
            />
          </div>
          <div>
            <h3 className="text-3xl font-serif font-bold text-brand-dark mb-6">Ce n’est pas de votre faute</h3>
            <p className="text-slate-600 mb-4 text-lg">
              Personne ne vous a appris à entreprendre. C'est un métier à part entière qui demande des codes, une structure et un état d'esprit spécifique.
            </p>
            <p className="text-slate-600 mb-8 text-lg">
              C’est pour cela qu'ENTREPRENEURS ÉPANOUIS existe : pour vous aider à vivre pleinement de votre vocation — avec clarté, autorité, structure et abondance.
            </p>
            <div className="p-8 bg-brand-dark text-white rounded-[2rem] shadow-lg">
              <p className="italic font-medium text-lg leading-relaxed text-center">
                "Nous ne créons pas seulement des business rentables. <br/> Nous créons des leaders épanouis."
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};