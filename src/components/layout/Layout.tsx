import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../App';
import { Logo } from './Logo';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { FooterBrand } from './FooterBrand';
import { FooterLinks } from './FooterLinks';
import { FooterSocial } from './FooterSocial';
import { FooterCopyright } from './FooterCopyright';

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
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Logo />
          <DesktopNav links={links} isAdminSection={isAdminSection} logout={logout} />
          <MobileNav links={links} isAdminSection={isAdminSection} logout={logout} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </nav>
  );
};

export const Footer: React.FC = () => {
  const location = useLocation();

  if (location.pathname.startsWith('/admin') || location.pathname === '/login') return null;

  return (
    <footer className="bg-brand-dark text-slate-400 py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <FooterBrand />
          <FooterLinks />
          <FooterSocial />
        </div>
        <FooterCopyright />
      </div>
    </footer>
  );
};