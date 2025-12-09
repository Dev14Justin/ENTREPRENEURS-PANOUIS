import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, children }) => (
  <div className="text-center mb-16 animate-fade-in">
    <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-6">{title}</h1>
    {subtitle && <p className="mt-4 text-slate-500 text-lg">{subtitle}</p>}
    {children}
  </div>
);
