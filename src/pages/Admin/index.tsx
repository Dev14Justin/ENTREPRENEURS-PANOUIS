import React, { useState, useEffect } from 'react';
import { useAuth } from '../../App';
import type { BlogPost } from '../../types';
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from '../../services/firebase';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Plus, Loader2 } from 'lucide-react';
import { AdminPostTable, AdminPostForm } from '../../components/admin';

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

        <AdminPostTable posts={posts} onDelete={handleDelete} />
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

        <AdminPostForm 
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
          isEdit={isEdit}
        />
      </div>
    </div>
  );
};