import React, { useEffect, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBlogPosts, getBlogPostById } from '../services/firebase';
import { BlogPost } from '../types';
import { Calendar, User, ArrowLeft, Loader2, Filter, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';

// Blog List Component
export const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter & Sort State
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getBlogPosts();
      setPosts(data.filter(p => p.published)); // Only show published
      setLoading(false);
    };
    fetchPosts();
  }, []);

  // Reset page on filter/sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortOrder]);

  // Extract unique categories from posts
  const categories = useMemo(() => {
    const cats = new Set(posts.map(p => p.category).filter(Boolean));
    return ['Toutes', ...Array.from(cats)];
  }, [posts]);

  // Filter and Sort logic
  const displayedPosts = useMemo(() => {
    let result = [...posts];

    // Filter
    if (selectedCategory !== 'Toutes') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Sort
    result.sort((a, b) => {
      return sortOrder === 'desc' 
        ? b.createdAt - a.createdAt 
        : a.createdAt - b.createdAt;
    });

    return result;
  }, [posts, selectedCategory, sortOrder]);

  // Pagination Logic
  const totalPages = Math.ceil(displayedPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = displayedPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="animate-spin text-brand-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="bg-brand-light min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark">Le Journal des Entrepreneurs</h1>
          <p className="mt-4 text-slate-500 text-lg">Conseils, stratégies et inspirations pour votre croissance.</p>
        </div>

        {/* Filter & Sort Controls */}
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
             onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
             className="flex items-center gap-2 text-sm font-bold text-brand-dark hover:text-brand-primary transition-colors px-4 py-2 rounded-full hover:bg-brand-light"
           >
             <ArrowUpDown size={16} />
             {sortOrder === 'desc' ? 'Plus récents d\'abord' : 'Plus anciens d\'abord'}
           </button>
        </div>

        {displayedPosts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
            <p className="text-slate-500">Aucun article ne correspond à votre recherche.</p>
            <button 
              onClick={() => setSelectedCategory('Toutes')}
              className="mt-4 text-brand-primary hover:underline text-sm font-bold"
            >
              Voir tous les articles
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post) => (
                <Link 
                  key={post.id} 
                  to={`/blog/${post.id}`}
                  className="group bg-white rounded-[2rem] shadow-sm hover:shadow-[0_10px_30px_rgba(0,119,182,0.15)] hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col relative border border-transparent hover:border-brand-soft"
                >
                  {/* Category Badge */}
                  {post.category && (
                    <div className="absolute top-5 right-5 z-10">
                      <span className="inline-block px-4 py-1.5 bg-white/95 backdrop-blur-md text-xs font-bold text-brand-dark rounded-full shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  )}

                  <div className="h-56 overflow-hidden">
                    <img 
                      src={post.imageUrl || 'https://picsum.photos/seed/default/600/400'} 
                      alt={post.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center text-xs text-slate-400 mb-4 space-x-3 font-medium uppercase tracking-wide">
                      <span className="flex items-center"><Calendar size={12} className="mr-1"/> {new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h2 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-primary transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">
                      {post.summary}
                    </p>
                    <span className="text-brand-secondary text-sm font-bold mt-auto flex items-center group-hover:translate-x-2 transition-transform">
                      Lire l'article <ArrowLeft className="rotate-180 ml-2" size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center items-center space-x-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-3 rounded-full border border-slate-300 text-slate-600 hover:bg-white hover:border-brand-primary hover:text-brand-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                
                <span className="text-sm font-bold text-brand-dark bg-white px-4 py-2 rounded-full shadow-sm">
                  Page {currentPage} / {totalPages}
                </span>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-full border border-slate-300 text-slate-600 hover:bg-white hover:border-brand-primary hover:text-brand-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
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
    <article className="bg-brand-light min-h-screen pb-20">
      {/* Header Image */}
      <div className="h-[50vh] w-full relative overflow-hidden bg-brand-dark">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center pt-10">
           <div className="max-w-4xl px-4 text-center animate-fade-in">
             <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">{post.title}</h1>
             <div className="flex justify-center items-center text-brand-soft text-sm space-x-6 font-medium">
                <span className="flex items-center"><User size={16} className="mr-2"/> {post.author || 'Admin'}</span>
                <span className="flex items-center"><Calendar size={16} className="mr-2"/> {new Date(post.createdAt).toLocaleDateString()}</span>
                {post.category && (
                  <span className="px-3 py-1 border border-brand-soft rounded-full text-xs uppercase tracking-wider">{post.category}</span>
                )}
             </div>
           </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-20 relative z-10 animate-fade-in delay-100">
        <div className="bg-white p-8 md:p-14 rounded-[2.5rem] shadow-2xl">
           <Link to="/blog" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-brand-primary mb-10 transition-colors">
              <ArrowLeft size={16} className="mr-2" /> Retour aux articles
           </Link>
           
           <div className="prose prose-slate prose-lg max-w-none text-slate-700 prose-headings:font-serif prose-headings:text-brand-dark prose-a:text-brand-primary hover:prose-a:text-brand-secondary prose-img:rounded-2xl">
             {post.content.split('\n').map((paragraph, idx) => (
               <p key={idx} className="mb-4 leading-relaxed">{paragraph}</p>
             ))}
           </div>
        </div>
      </div>
    </article>
  );
};