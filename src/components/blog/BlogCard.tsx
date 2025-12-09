import React from 'react';
import { Link } from 'react-router-dom';
import type { BlogPost } from '../../types';
import { Calendar, ArrowLeft } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => (
  <Link 
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
);
