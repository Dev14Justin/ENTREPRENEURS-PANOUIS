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
    <div className="min-h-screen flex items-center justify-center bg-brand-light px-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border-t-4 border-brand-primary">
        <h2 className="text-3xl font-serif font-bold text-center text-brand-dark mb-8">Espace Administration</h2>
        
        {error && <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">{error}</div>}
        <div className="mb-8 p-4 bg-blue-50 text-brand-dark text-xs rounded-xl border border-blue-100">
           <strong>Demo Mode:</strong> Utilisez <em>admin@epanouis.com</em> / <em>password</em>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
            <input 
              type="email" 
              required
              className="w-full px-5 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Mot de passe</label>
            <input 
              type="password" 
              required
              className="w-full px-5 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none transition-all"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            className="w-full py-3 bg-brand-primary text-white font-bold rounded-full hover:bg-brand-dark shadow-lg hover:shadow-xl hover:scale-105 transition-all"
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

  if (loading) return <div className="p-10 text-center text-brand-primary"><Loader2 className="animate-spin inline-block mr-2"/> Chargement...</div>;

  return (
    <div className="bg-brand-light min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-serif font-bold text-brand-dark">Gestion des Articles</h1>
          <Link 
            to="/admin/posts/new"
            className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white font-bold rounded-full hover:bg-brand-dark transition-all shadow-md hover:shadow-lg"
          >
            <Plus size={20} /> Nouvel Article
          </Link>
        </div>

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
                <tr key={post.id} className="hover:bg-brand-light/30 transition-colors">
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
                    <button onClick={() => handleDelete(post.id)} className="inline-block p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all" title="Supprimer">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {posts.length === 0 && <div className="p-10 text-center text-slate-500">Aucun article trouvé.</div>}
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
    category: 'Général',
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
    <div className="bg-brand-light min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-serif font-bold text-brand-dark">
            {isEdit ? 'Modifier l\'article' : 'Nouvel Article'}
            </h1>
            <Link to="/admin" className="text-slate-500 hover:text-brand-dark p-2 hover:bg-slate-200 rounded-full transition-all"><X size={24}/></Link>
        </div>

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
      </div>
    </div>
  );
};