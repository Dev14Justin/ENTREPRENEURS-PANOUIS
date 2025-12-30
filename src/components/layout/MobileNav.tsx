import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';

interface NavLink {
  label: string;
  path: string;
}

interface MobileNavProps {
  links: NavLink[];
  isAdminSection: boolean;
  logout: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ links, isAdminSection, logout, isOpen, setIsOpen }) => {
  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-brand-dark hover:text-brand-primary focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute top-full left-0 w-full animate-fade-in shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-base font-medium text-brand-dark hover:text-brand-primary hover:bg-brand-soft rounded-lg"
              >
                {link.label}
              </Link>
            ))}
            {isAdminSection ? (
              <button 
                onClick={() => { logout(); setIsOpen(false); }}
                className="block w-full text-left px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg"
              >
                 <LogOut size={16} className="inline-block mr-2" />
                Déconnexion
              </button>
            ) : (
              <Link
                to="/diagnostic"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center mt-4 px-5 py-3 text-base font-bold rounded-lg text-white bg-brand-primary hover:bg-brand-secondary transition-colors"
              >
                Diagnostic Stratégique
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};