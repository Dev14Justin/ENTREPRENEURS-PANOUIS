import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="bg-stone-50 min-h-screen pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl font-serif font-bold text-brand-dark mb-4">L’essence d’ENTREPRENEURS ÉPANOUIS</h1>
          <div className="w-24 h-1 bg-brand-accent mx-auto"></div>
        </div>

        {/* Content Block 1 */}
        <div className="bg-white p-8 md:p-12 rounded-sm shadow-sm border-l-4 border-brand-primary mb-12 animate-fade-in delay-100">
          <h2 className="text-2xl font-bold mb-6 text-brand-primary">Une conviction simple</h2>
          <p className="text-stone-700 text-lg leading-relaxed mb-6">
            ENTREPRENEURS ÉPANOUIS est né d’une conviction simple : les professionnels du mieux-être ont un don… mais pas encore un business à la hauteur de ce don.
          </p>
          <p className="text-stone-700 leading-relaxed">
            Vous avez une mission. Vous avez la sensibilité, la profondeur, la capacité d’accompagner des transformations profondes.
            Mais dans le monde réel : vous faites face au flou, aux clients non engagés, aux peurs de visibilité, à la culpabilité de vendre.
          </p>
        </div>

        {/* Content Block 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16 animate-fade-in delay-200">
          <div>
            <img 
              src="https://picsum.photos/seed/story/500/600" 
              alt="Notre Histoire" 
              className="rounded-sm shadow-lg w-full object-cover h-96 grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4">Ce n’est pas de votre faute</h3>
            <p className="text-stone-600 mb-4">
              Personne ne vous a appris à entreprendre. C'est un métier à part entière qui demande des codes, une structure et un état d'esprit spécifique.
            </p>
            <p className="text-stone-600 mb-6">
              C’est pour cela qu'ENTREPRENEURS ÉPANOUIS existe : pour vous aider à vivre pleinement de votre vocation — avec clarté, autorité, structure et abondance.
            </p>
            <div className="p-6 bg-brand-light border border-stone-200 rounded-sm">
              <p className="italic text-brand-primary font-medium">
                "Nous ne créons pas seulement des business rentables. Nous créons des leaders épanouis."
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};