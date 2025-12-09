import React from 'react';
import { Link } from 'react-router-dom';
import { Save, X, Loader2 } from 'lucide-react';
import type { BlogPost } from '../../types';

interface AdminPostFormProps {
  formData: Partial<BlogPost>;
  handleChange: (field: keyof BlogPost, value: any) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  isEdit: boolean;
}

export const AdminPostForm: React.FC<AdminPostFormProps> = ({
  formData,
  handleChange,
  handleSubmit,
  loading,
  isEdit,
}) => (
  <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-md border border-brand-soft/20 space-y-6">
    {/* Main Info */}
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Titre</label>
        <input 
          required
          type="text" 
          className="w-full px-5 py-3 border border-slate-300 rounded-xl focus:ring-1 focus:ring-brand-primary outline-none"
          value={formData.title}
          onChange={e => handleChange('title', e.target.value)}
        />
      </div>
      
       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
         <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Catégorie</label>
            <input 
              type="text" 
              required
              className="w-full px-5 py-3 border border-slate-300 rounded-xl focus:ring-1 focus:ring-brand-primary outline-none"
              value={formData.category}
              onChange={e => handleChange('category', e.target.value)}
              placeholder="ex: Mindset, Stratégie, Marketing..."
            />
         </div>
         <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">URL Image (Externe)</label>
            <input 
              type="url" 
              placeholder="https://example.com/image.jpg"
              className="w-full px-5 py-3 border border-slate-300 rounded-xl focus:ring-1 focus:ring-brand-primary outline-none"
              value={formData.imageUrl}
              onChange={e => handleChange('imageUrl', e.target.value)}
            />
         </div>
       </div>
       <p className="text-xs text-slate-400 -mt-2">L'image n'est pas stockée sur Firebase. Utilisez un lien externe.</p>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Résumé court</label>
        <textarea 
          required
          rows={2}
          className="w-full px-5 py-3 border border-slate-300 rounded-xl focus:ring-1 focus:ring-brand-primary outline-none resize-none"
          value={formData.summary}
          onChange={e => handleChange('summary', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Contenu</label>
        <textarea 
          required
          rows={12}
          className="w-full px-5 py-3 border border-slate-300 rounded-xl focus:ring-1 focus:ring-brand-primary outline-none font-mono text-sm"
          value={formData.content}
          onChange={e => handleChange('content', e.target.value)}
        />
      </div>
    </div>

    {/* Sidebar Settings */}
    <div className="flex items-center justify-between pt-8 border-t border-slate-100">
       <div className="flex items-center gap-3">
          <input 
            type="checkbox" 
            id="published"
            checked={formData.published}
            onChange={e => handleChange('published', e.target.checked)}
            className="w-5 h-5 text-brand-primary border-slate-300 rounded focus:ring-brand-primary"
          />
          <label htmlFor="published" className="text-sm font-medium text-slate-700 select-none">
            Publier immédiatement
          </label>
       </div>

       <div className="flex gap-4">
         <Link to="/admin" className="px-6 py-3 border border-slate-300 text-slate-600 font-medium rounded-full hover:bg-slate-50">
           Annuler
         </Link>
         <button 
          type="submit" 
          disabled={loading}
          className="flex items-center gap-2 px-8 py-3 bg-brand-primary text-white font-bold rounded-full hover:bg-brand-dark disabled:opacity-50 transition-all hover:scale-105"
         >
           {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18} />}
           Enregistrer
         </button>
       </div>
    </div>
  </form>
);
