import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Eye } from 'lucide-react';
import type { BlogPost } from '../../types';

interface AdminPostTableRowProps {
  post: BlogPost;
  onDelete: (id: string) => void;
}

export const AdminPostTableRow: React.FC<AdminPostTableRowProps> = ({ post, onDelete }) => (
  <tr className="hover:bg-brand-light/30 transition-colors">
    <td className="p-6 font-bold text-brand-dark">{post.title}</td>
    <td className="p-6 text-sm text-slate-600 font-medium">{post.category || '-'}</td>
    <td className="p-6">
      <span className={`px-3 py-1 text-xs font-bold rounded-full ${post.published ? 'bg-green-100 text-green-800' : 'bg-slate-200 text-slate-600'}`}>
        {post.published ? 'Publié' : 'Brouillon'}
      </span>
    </td>
    <td className="p-6 text-sm text-slate-500">{new Date(post.createdAt).toLocaleDateString()}</td>
    <td className="p-6 text-right space-x-2">
       <Link to={`/blog/${post.id}`} target="_blank" className="inline-block p-2 text-slate-400 hover:text-brand-primary hover:bg-brand-light rounded-full transition-all" title="Voir">
        <Eye size={18} />
      </Link>
      <Link to={`/admin/posts/${post.id}`} className="inline-block p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all" title="Modifier">
        <Edit size={18} />
      </Link>
      <button onClick={() => onDelete(post.id)} className="inline-block p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all" title="Supprimer">
        <Trash2 size={18} />
      </button>
    </td>
  </tr>
);
