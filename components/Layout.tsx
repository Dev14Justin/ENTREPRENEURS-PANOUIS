import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Linkedin, Facebook, ArrowRight, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../App';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const { isAdmin, logout } = useAuth();
  
  // Do not show public navbar on login page, but show on Admin dashboard with different links
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
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start group">
            <span className="text-2xl font-serif font-bold text-brand-primary tracking-tight group-hover:opacity-80 transition-opacity">
              ENTREPRENEURS
            </span>
            <span className="text-sm font-sans font-medium tracking-[0.2em] text-stone-500 group-hover:text-brand-accent transition-colors">
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
                    ? 'text-brand-primary font-semibold'
                    : 'text-stone-600 hover:text-brand-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {isAdminSection ? (
              <button 
                onClick={logout}
                className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700"
              >
                <LogOut size={16} />
                Déconnexion
              </button>
            ) : (
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-sm text-white bg-brand-primary hover:bg-brand-dark transition-all shadow-sm"
              >
                Diagnostic Stratégique
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-500 hover:text-stone-900 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 text-base font-medium text-stone-700 hover:text-brand-primary hover:bg-stone-50 rounded-md"
              >
                {link.label}
              </Link>
            ))}
             {isAdminSection ? (
              <button 
                onClick={() => { logout(); setIsOpen(false); }}
                className="block w-full text-left px-3 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-md"
              >
                Déconnexion
              </button>
            ) : (
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center mt-4 px-5 py-3 text-base font-medium rounded-md text-white bg-brand-primary"
              >
                Diagnostic Stratégique
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer: React.FC = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/admin') || location.pathname === '/login') return null;

  return (
    <footer className="bg-brand-dark text-stone-300 py-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-serif text-white font-bold">ENTREPRENEURS</h3>
              <p className="text-sm font-sans tracking-[0.2em] text-brand-accent">EPANOUIS</p>
            </div>
            <p className="text-sm text-stone-400 max-w-xs leading-relaxed">
              Accompagnement premium pour coachs et thérapeutes francophones.
              Transformez votre vocation en un business d'impact.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-brand-accent transition-colors">Accueil</Link></li>
              <li><Link to="/about" className="hover:text-brand-accent transition-colors">À Propos</Link></li>
              <li><Link to="/blog" className="hover:text-brand-accent transition-colors">Le Blog</Link></li>
              <li><span className="text-stone-600 cursor-default">Mentions Légales</span></li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Restons Connectés</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="hover:text-brand-accent transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-brand-accent transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-brand-accent transition-colors"><Facebook size={20} /></a>
            </div>
            <a 
              href="mailto:contact@entrepreneurs-epanouis.com" 
              className="inline-flex items-center gap-2 text-sm border border-stone-700 px-4 py-2 rounded-sm hover:border-brand-accent hover:text-white transition-colors"
            >
              Nous contacter <ArrowRight size={14} />
            </a>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-stone-800 text-center text-xs text-stone-500">
          © {new Date().getFullYear()} Entrepreneurs Epanouis. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};