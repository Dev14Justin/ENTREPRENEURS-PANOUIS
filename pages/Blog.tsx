import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBlogPosts, getBlogPostById } from '../services/firebase';
import { BlogPost } from '../types';
import { Calendar, User, ArrowLeft, Loader2 } from 'lucide-react';

// Blog List Component
export const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getBlogPosts();
      setPosts(data.filter(p => p.published)); // Only show published
      setLoading(false);
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="animate-spin text-brand-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-brand-dark">Le Journal des Entrepreneurs</h1>
          <p className="mt-4 text-stone-500">Conseils, stratégies et inspirations pour votre croissance.</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-sm shadow-sm">
            <p className="text-stone-500">Aucun article publié pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link 
                key={post.id} 
                to={`/blog/${post.id}`}
                className="group bg-white rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 overflow-hidden flex flex-col"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.imageUrl || 'https://picsum.photos/seed/default/600/400'} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center text-xs text-stone-400 mb-3 space-x-3">
                    <span className="flex items-center"><Calendar size={12} className="mr-1"/> {new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h2 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-stone-600 text-sm mb-4 line-clamp-3 flex-1">
                    {post.summary}
                  </p>
                  <span className="text-brand-primary text-sm font-semibold mt-auto flex items-center">
                    Lire l'article <ArrowLeft className="rotate-180 ml-2 transition-transform group-hover:translate-x-1" size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Blog Detail Component
export const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getBlogPostById(id).then(data => {
        setPost(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-brand-primary"/></div>;
  if (!post) return <div className="text-center p-20 text-red-500">Article introuvable</div>;

  return (
    <article className="bg-white min-h-screen pb-20">
      {/* Header Image */}
      <div className="h-[40vh] w-full relative overflow-hidden bg-brand-dark">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="max-w-4xl px-4 text-center">
             <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">{post.title}</h1>
             <div className="flex justify-center items-center text-stone-300 text-sm space-x-6">
                <span className="flex items-center"><User size={14} className="mr-2"/> {post.author || 'Admin'}</span>
                <span className="flex items-center"><Calendar size={14} className="mr-2"/> {new Date(post.createdAt).toLocaleDateString()}</span>
             </div>
           </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-10 relative z-10">
        <div className="bg-white p-8 md:p-12 rounded-sm shadow-lg">
           <Link to="/blog" className="inline-flex items-center text-sm text-stone-500 hover:text-brand-primary mb-8 transition-colors">
              <ArrowLeft size={16} className="mr-2" /> Retour aux articles
           </Link>
           
           <div className="prose prose-stone prose-lg max-w-none text-stone-700">
             {/* Using simple newline to br conversion for this basic example. Use a markdown parser in prod. */}
             {post.content.split('\n').map((paragraph, idx) => (
               <p key={idx} className="mb-4">{paragraph}</p>
             ))}
           </div>
        </div>
      </div>
    </article>
  );
};