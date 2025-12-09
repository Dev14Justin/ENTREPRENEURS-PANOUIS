import React from 'react';
import { Filter, ArrowUpDown } from 'lucide-react';

interface BlogControlsProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortOrder: 'desc' | 'asc';
  setSortOrder: (order: 'desc' | 'asc') => void;
}

export const BlogControls: React.FC<BlogControlsProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  sortOrder,
  setSortOrder,
}) => (
  <div className="max-w-7xl mx-auto mb-12 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-brand-soft/20">
    {/* Category Filter */}
    <div className="flex items-center gap-3 w-full sm:w-auto">
      <Filter size={20} className="text-brand-primary" />
      <span className="text-sm font-bold text-slate-700">Filtrer par :</span>
      <select 
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="bg-brand-light border-none text-brand-dark text-sm rounded-full focus:ring-2 focus:ring-brand-primary block py-2 px-4 outline-none flex-grow sm:flex-grow-0 cursor-pointer font-medium"
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>

    {/* Sort Toggle */}
    <button 
      onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
      className="flex items-center gap-2 text-sm font-bold text-brand-dark hover:text-brand-primary transition-colors px-4 py-2 rounded-full hover:bg-brand-light"
    >
      <ArrowUpDown size={16} />
      {sortOrder === 'desc' ? 'Plus récents d\'abord' : 'Plus anciens d\'abord'}
    </button>
  </div>
);
