import React, { useEffect, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBlogPosts, getBlogPostById } from '../../services/firebase';
import type { BlogPost } from '../../types';
import { Loader2, ArrowLeft } from 'lucide-react';
import { BlogCard, BlogControls, BlogDetailHeader, ArticleBody } from '../../components/blog';
import { Pagination } from '../../components/ui';

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

        <BlogControls
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

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
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
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
      <BlogDetailHeader post={post} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-20 relative z-10 animate-fade-in delay-100">
        <div className="bg-white p-8 md:p-14 rounded-[2.5rem] shadow-2xl">
           <Link to="/blog" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-brand-primary mb-10 transition-colors">
              <ArrowLeft size={16} className="mr-2" /> Retour aux articles
           </Link>
           
           <ArticleBody content={post.content} />
        </div>
      </div>
    </article>
  );
};