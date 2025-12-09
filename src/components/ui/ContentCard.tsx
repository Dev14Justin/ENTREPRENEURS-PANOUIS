import React from 'react';

interface ContentCardProps {
  children: React.ReactNode;
  className?: string;
}

export const ContentCard: React.FC<ContentCardProps> = ({ children, className = '' }) => (
  <div className={`bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-brand-soft/20 ${className}`}>
    {children}
  </div>
);
