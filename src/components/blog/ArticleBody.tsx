import React from 'react';

interface ArticleBodyProps {
  content: string;
}

export const ArticleBody: React.FC<ArticleBodyProps> = ({ content }) => (
  <div className="prose prose-slate prose-lg max-w-none text-slate-700 prose-headings:font-serif prose-headings:text-brand-dark prose-a:text-brand-primary hover:prose-a:text-brand-secondary prose-img:rounded-2xl">
    {content.split('\n').map((paragraph, idx) => (
      <p key={idx} className="mb-4 leading-relaxed">{paragraph}</p>
    ))}
  </div>
);