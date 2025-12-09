import React from 'react';
import type { BlogPost } from '../../types';
import { Calendar, User } from 'lucide-react';

interface BlogDetailHeaderProps {
  post: BlogPost;
}

export const BlogDetailHeader: React.FC<BlogDetailHeaderProps> = ({ post }) => (
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
);
