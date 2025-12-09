import React from 'react';
import type { BlogPost } from '../../types';
import { AdminPostTableRow } from './AdminPostTableRow';

interface AdminPostTableProps {
  posts: BlogPost[];
  onDelete: (id: string) => void;
}

export const AdminPostTable: React.FC<AdminPostTableProps> = ({ posts, onDelete }) => (
  <div className="bg-white rounded-3xl shadow-sm border border-brand-soft/20 overflow-hidden">
    <table className="w-full text-left border-collapse">
      <thead className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wider border-b border-slate-100">
        <tr>
          <th className="p-6 font-bold">Titre</th>
          <th className="p-6 font-bold">Catégorie</th>
          <th className="p-6 font-bold">Statut</th>
          <th className="p-6 font-bold">Date</th>
          <th className="p-6 font-bold text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {posts.map(post => (
          <AdminPostTableRow key={post.id} post={post} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
    {posts.length === 0 && <div className="p-10 text-center text-slate-500">Aucun article trouvé.</div>}
  </div>
);
