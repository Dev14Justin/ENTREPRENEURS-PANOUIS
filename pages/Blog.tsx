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
    <div className="bg-stone-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-brand-dark">Le Journal des Entrepreneurs</h1>
          <p className="mt-4 text-stone-500">Conseils, stratégies et inspirations pour votre croissance.</p>
        </div>

        {/* Filter & Sort Controls */}
        <div className="max-w-7xl mx-auto mb-10 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-sm shadow-sm border border-stone-200">
           
           {/* Category Filter */}
           <div className="flex items-center gap-2 w-full sm:w-auto">
             <Filter size={18} className="text-stone-400" />
             <span className="text-sm font-medium text-stone-600">Filtrer par :</span>
             <select 
               value={selectedCategory}
               onChange={(e) => setSelectedCategory(e.target.value)}
               className="bg-stone-50 border border-stone-200 text-stone-700 text-sm rounded-sm focus:ring-brand-primary focus:border-brand-primary block p-2 outline-none flex-grow sm:flex-grow-0"
             >
               {categories.map(cat => (
                 <option key={cat} value={cat}>{cat}</option>
               ))}
             </select>
           </div>

           {/* Sort Toggle */}
           <button 
             onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
             className="flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-brand-primary transition-colors px-3 py-2 rounded-sm hover:bg-stone-50"
           >
             <ArrowUpDown size={16} />
             {sortOrder === 'desc' ? 'Plus récents d\'abord' : 'Plus anciens d\'abord'}
           </button>
        </div>

        {displayedPosts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-sm shadow-sm">
            <p className="text-stone-500">Aucun article ne correspond à votre recherche.</p>
            <button 
              onClick={() => setSelectedCategory('Toutes')}
              className="mt-4 text-brand-primary hover:underline text-sm"
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
                  className="group bg-white rounded-sm shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-brand-primary/30 transition-all duration-300 border border-stone-100 overflow-hidden flex flex-col relative"
                >
                  {/* Category Badge */}
                  {post.category && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-brand-primary rounded-full shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  )}

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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center space-x-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-sm border border-stone-300 text-stone-600 hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                
                <span className="text-sm font-medium text-stone-600">
                  Page {currentPage} sur {totalPages}
                </span>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-sm border border-stone-300 text-stone-600 hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                {post.category && (
                  <span className="px-2 py-0.5 border border-stone-500 rounded-full text-xs">{post.category}</span>
                )}
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