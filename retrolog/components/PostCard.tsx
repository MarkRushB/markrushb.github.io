
import React from 'react';
import { Chronicle } from '../types';

interface PostCardProps {
  post: Chronicle;
  // Added missing onClick handler to interface definition
  onClick: (post: Chronicle) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  // 计算阅读时间
  const calculateReadTime = (content: string): number => {
    const wordCount = content.length;
    // 中文阅读速度约400字/分钟
    const readTime = Math.ceil(wordCount / 400);
    return readTime < 1 ? 1 : readTime;
  };
  
  const readTime = calculateReadTime(post.fullContent);
  
  return (
    <article 
      className="bg-white p-8 md:p-12 retro-border retro-shadow mb-16 hover:-translate-x-1 hover:-translate-y-2 transition-all duration-300 cursor-pointer group relative overflow-hidden"
      onClick={() => onClick(post)}
    >
      {/* 时间轴上的核心锚点 */}
      <div className="absolute left-[-2.35rem] top-12 w-3 h-3 rounded-full bg-white border-2 border-stone-800 hidden md:block z-10 group-hover:bg-stone-800 transition-colors"></div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-stone-800 font-bold">
            {post.date}
          </span>
          <span className="text-stone-400 font-serif italic text-xs mt-1">
            // 深度编年史 / CHRONICLE
          </span>
        </div>
        <div className="flex gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="text-[9px] px-2 py-0.5 bg-stone-50 text-stone-500 border border-stone-100 rounded-sm font-mono uppercase tracking-tighter">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 group-hover:text-stone-700 transition-colors leading-tight">
        {post.title}
      </h2>
      
      <div className="relative mb-8">
        <p className="text-stone-600 leading-relaxed font-serif text-lg md:text-xl pl-6 border-l-2 border-stone-800 py-1 italic">
          {post.excerpt}
        </p>
      </div>
      
      <div className="flex items-center justify-between pt-6 border-t border-stone-50">
        <div className="flex items-center gap-4">
          <button className="font-mono text-[10px] uppercase font-bold tracking-widest bg-stone-800 text-white px-3 py-1.5 hover:bg-black transition-colors">
            阅读全文 / READ
          </button>
          <span className="hidden sm:inline font-mono text-[10px] text-stone-300 uppercase tracking-widest">
            约 {readTime} 分钟
          </span>
        </div>
        <div className="text-stone-200 group-hover:text-stone-800 transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </div>
    </article>
  );
};
