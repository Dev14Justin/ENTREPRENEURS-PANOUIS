import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Linkedin, Facebook, ArrowRight, LogOut, Copy, Check } from 'lucide-react';
import { useAuth } from '../App';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAdmin, logout } = useAuth();
  
  const isLoginPage = location.pathname === '/login';
  const isAdminSection = location.pathname.startsWith('/admin');

  if (isLoginPage) return null;

  const links = isAdminSection 
    ? [
        { label: 'Tableau de bord', path: '/admin' },
        { label: 'Voir le site', path: '/' },
      ]
    : [
        { label: 'Accueil', path: '/' },
        { label: 'À Propos', path: '/about' },
        { label: 'Blog', path: '/blog' },
      ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-brand-light/90 backdrop-blur-md border-b border-brand-soft/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start group">
            <span className="text-2xl font-serif font-bold text-brand-dark tracking-tight group-hover:text-brand-primary transition-colors">
              ENTREPRENEURS
            </span>
            <span className="text-sm font-sans font-medium tracking-[0.2em] text-brand-primary group-hover:text-brand-secondary transition-colors">
              EPANOUIS
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-brand-primary font-bold'
                    : 'text-slate-600 hover:text-brand-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {isAdminSection ? (
              <button 
                onClick={logout}
                className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-700"
              >
                <LogOut size={16} />
                Déconnexion
              </button>
            ) : (
              <Link
                to="/diagnostic"
                className="inline-flex items-center px-8 py-3 border border-transparent text-sm font-bold rounded-full text-white bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Diagnostic Stratégique
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-dark hover:text-brand-primary focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-light border-b border-brand-soft animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-base font-medium text-brand-dark hover:text-brand-primary hover:bg-brand-soft/20 rounded-2xl"
              >
                {link.label}
              </Link>
            ))}
             {isAdminSection ? (
              <button 
                onClick={() => { logout(); setIsOpen(false); }}
                className="block w-full text-left px-4 py-3 text-base font-medium text-red-500 hover:bg-red-50 rounded-2xl"
              >
                Déconnexion
              </button>
            ) : (
              <Link
                to="/diagnostic"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center mt-4 px-5 py-3 text-base font-bold rounded-full text-white bg-brand-primary"
              >
                Diagnostic Stratégique
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer: React.FC = () => {
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  if (location.pathname.startsWith('/admin') || location.pathname === '/login') return null;

  const handleCopy = () => {
    navigator.clipboard.writeText('contact@entrepreneurs-epanouis.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-brand-dark text-brand-soft py-16 rounded-t-[3rem] mt-10 shadow-[0_-10px_40px_rgba(3,4,94,0.2)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-serif text-white font-bold">ENTREPRENEURS</h3>
              <p className="text-sm font-sans tracking-[0.2em] text-brand-secondary">EPANOUIS</p>
            </div>
            <p className="text-sm text-slate-300 max-w-xs leading-relaxed">
              Accompagnement premium pour coachs et thérapeutes francophones.
              Transformez votre vocation en un business d'impact.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Navigation</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-brand-secondary transition-colors">Accueil</Link></li>
              <li><Link to="/about" className="hover:text-brand-secondary transition-colors">À Propos</Link></li>
              <li><Link to="/blog" className="hover:text-brand-secondary transition-colors">Le Blog</Link></li>
              <li><span className="text-slate-500 cursor-default">Mentions Légales</span></li>
            </ul>
          </div>

          {/* Social & Contact */}
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
        </div>
        <div className="mt-16 pt-8 border-t border-brand-primary/20 text-center text-xs text-slate-400">
           © {new Date().getFullYear()} Entrepreneurs Epanouis. Tous droits réservés.
           <span className="mx-2">•</span>
           <Link to="/login" className="hover:text-brand-secondary transition-colors">Administration</Link>
        </div>
      </div>
    </footer>
  );
};