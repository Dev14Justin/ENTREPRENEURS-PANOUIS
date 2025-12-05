import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';
import { BlogPost } from '../types';
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from '../services/firebase';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Plus, Edit, Trash2, Save, X, Loader2, Eye } from 'lucide-react';

// --- LOGIN ---
export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError("Erreur de connexion. Vérifiez vos identifiants.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 px-4">
      <div className="bg-white p-8 rounded-sm shadow-md w-full max-w-md border-t-4 border-brand-primary">
        <h2 className="text-2xl font-serif font-bold text-center text-brand-dark mb-6">Espace Administration</h2>
        
        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-sm">{error}</div>}
        <div className="mb-6 p-3 bg-blue-50 text-blue-800 text-xs rounded-sm">
           <strong>Demo Mode:</strong> Utilisez <em>admin@epanouis.com</em> / <em>password</em>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-2 border border-stone-300 rounded-sm focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Mot de passe</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-2 border border-stone-300 rounded-sm focus:ring-2 focus:ring-brand-primary outline-none"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            className="w-full py-3 bg-brand-primary text-white font-bold rounded-sm hover:bg-brand-dark transition-colors"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

// --- DASHBOARD ---
export const AdminDashboard: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const data = await getBlogPosts();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      await deleteBlogPost(id);
      fetchPosts();
    }
  };

  if (loading) return <div className="p-10 text-center">Chargement...</div>;

  return (
    <div className="bg-stone-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-brand-dark">Gestion des Articles</h1>
          <Link 
            to="/admin/posts/new"
            className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-sm hover:bg-brand-dark transition-colors"
          >
            <Plus size={18} /> Nouvel Article
          </Link>
        </div>

        <div className="bg-white rounded-sm shadow-sm border border-stone-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-stone-100 text-stone-600 text-sm uppercase tracking-wider">
              <tr>
                <th className="p-4 font-semibold">Titre</th>
                <th className="p-4 font-semibold">Statut</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {posts.map(post => (
                <tr key={post.id} className="hover:bg-stone-50 transition-colors">
                  <td className="p-4 font-medium text-stone-800">{post.title}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${post.published ? 'bg-green-100 text-green-800' : 'bg-stone-200 text-stone-600'}`}>
                      {post.published ? 'Publié' : 'Brouillon'}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-stone-500">{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-right space-x-2">
                     <Link to={`/blog/${post.id}`} target="_blank" className="inline-block p-2 text-stone-400 hover:text-brand-primary" title="Voir">
                      <Eye size={18} />
                    </Link>
                    <Link to={`/admin/posts/${post.id}`} className="inline-block p-2 text-stone-400 hover:text-blue-600" title="Modifier">
                      <Edit size={18} />
                    </Link>
                    <button onClick={() => handleDelete(post.id)} className="inline-block p-2 text-stone-400 hover:text-red-600" title="Supprimer">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {posts.length === 0 && <div className="p-8 text-center text-stone-500">Aucun article trouvé.</div>}
        </div>
      </div>
    </div>
  );
};

// --- EDITOR (CREATE/UPDATE) ---
export const AdminEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // If id exists, it's edit mode
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    summary: '',
    content: '',
    imageUrl: '',
    published: false,
    author: 'Admin'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      // Find post from list (or fetch detail)
      getBlogPosts().then(posts => {
        const p = posts.find(p => p.id === id);
        if (p) setFormData(p);
      });
    }
  }, [id, isEdit]);

  const handleChange = (field: keyof BlogPost, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit && id) {
        await updateBlogPost(id, formData);
      } else {
        await createBlogPost({
          ...formData as BlogPost,
          createdAt: Date.now()
        });
      }
      navigate('/admin');
    } catch (err) {
      alert("Erreur lors de l'enregistrement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-serif font-bold text-brand-dark">
            {isEdit ? 'Modifier l\'article' : 'Nouvel Article'}
            </h1>
            <Link to="/admin" className="text-stone-500 hover:text-stone-800"><X size={24}/></Link>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-sm shadow-md border border-stone-200 space-y-6">
          
          {/* Main Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Titre</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-2 border border-stone-300 rounded-sm focus:ring-1 focus:ring-brand-primary outline-none"
                value={formData.title}
                onChange={e => handleChange('title', e.target.value)}
              />
            </div>
            
             <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">URL Image (Externe)</label>
              <input 
                type="url" 
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2 border border-stone-300 rounded-sm focus:ring-1 focus:ring-brand-primary outline-none"
                value={formData.imageUrl}
                onChange={e => handleChange('imageUrl', e.target.value)}
              />
              <p className="text-xs text-stone-400 mt-1">L'image n'est pas stockée sur Firebase. Utilisez un lien externe.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Résumé court</label>
              <textarea 
                required
                rows={2}
                className="w-full px-4 py-2 border border-stone-300 rounded-sm focus:ring-1 focus:ring-brand-primary outline-none resize-none"
                value={formData.summary}
                onChange={e => handleChange('summary', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Contenu</label>
              <textarea 
                required
                rows={12}
                className="w-full px-4 py-2 border border-stone-300 rounded-sm focus:ring-1 focus:ring-brand-primary outline-none font-mono text-sm"
                value={formData.content}
                onChange={e => handleChange('content', e.target.value)}
              />
            </div>
          </div>

          {/* Sidebar Settings */}
          <div className="flex items-center justify-between pt-6 border-t border-stone-100">
             <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="published"
                  checked={formData.published}
                  onChange={e => handleChange('published', e.target.checked)}
                  className="w-4 h-4 text-brand-primary border-stone-300 rounded focus:ring-brand-primary"
                />
                <label htmlFor="published" className="text-sm font-medium text-stone-700 select-none">
                  Publier immédiatement
                </label>
             </div>

             <div className="flex gap-4">
               <Link to="/admin" className="px-6 py-2 border border-stone-300 text-stone-600 rounded-sm hover:bg-stone-50">
                 Annuler
               </Link>
               <button 
                type="submit" 
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-brand-primary text-white rounded-sm hover:bg-brand-dark disabled:opacity-50"
               >
                 {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18} />}
                 Enregistrer
               </button>
             </div>
          </div>

        </form>
      </div>
    </div>
  );
};