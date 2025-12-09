import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';

interface NavLink {
  label: string;
  path: string;
}

interface DesktopNavProps {
  links: NavLink[];
  isAdminSection: boolean;
  logout: () => void;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({ links, isAdminSection, logout }) => {
  const location = useLocation();

  return (
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
  );
};
