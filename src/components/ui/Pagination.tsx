import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-16 flex justify-center items-center space-x-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-3 rounded-full border border-slate-300 text-slate-600 hover:bg-white hover:border-brand-primary hover:text-brand-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        aria-label="Page précédente"
      >
        <ChevronLeft size={20} />
      </button>
      
      <span className="text-sm font-bold text-brand-dark bg-white px-4 py-2 rounded-full shadow-sm">
        Page {currentPage} / {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-3 rounded-full border border-slate-300 text-slate-600 hover:bg-white hover:border-brand-primary hover:text-brand-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        aria-label="Page suivante"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
