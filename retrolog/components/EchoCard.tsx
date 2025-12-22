
import React from 'react';
import { Echo } from '../types';

interface EchoCardProps {
  echo: Echo;
}

export const EchoCard: React.FC<EchoCardProps> = ({ echo }) => {
  return (
    <div className="relative mb-12 group">
      {/* 时间轴上的小锚点 */}
      <div className="absolute left-[-2.35rem] top-6 w-3 h-3 rounded-full bg-stone-300 border-2 border-[#f4f1ea] hidden md:block z-10 transition-colors group-hover:bg-stone-800"></div>

      <div className="relative bg-[#fffcf0] p-6 md:p-8 retro-border shadow-sm transform -rotate-[0.3deg] transition-all duration-300 group-hover:rotate-0 group-hover:shadow-md group-hover:-translate-y-1 overflow-hidden max-w-2xl">
        
        {/* 背景装饰符号 - 更加淡化 */}
        <div className="absolute -top-2 -right-1 text-stone-100 text-8xl font-serif select-none pointer-events-none opacity-40 italic">
          ”
        </div>

        <div className="relative z-10">
          <header className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-stone-400 bg-white border border-stone-100 px-2 py-0.5">
              {echo.date}
            </span>
            <span className="text-stone-300 font-serif italic text-[10px] tracking-tight">
              // 碎语 ECHO
            </span>
          </header>

          {/* 优化后的字体大小：text-lg md:text-xl */}
          <blockquote className="text-lg md:text-xl text-stone-700 leading-relaxed font-serif italic mb-6 pr-4">
            {echo.content}
          </blockquote>

          <footer className="flex flex-wrap gap-3 pt-4 border-t border-stone-100/50">
            {echo.tags.map(tag => (
              <span key={tag} className="text-[9px] font-mono text-stone-400 hover:text-stone-600 transition-colors cursor-default tracking-tighter">
                #{tag}
              </span>
            ))}
          </footer>
        </div>

        {/* 底部装饰线条 */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-800/10 group-hover:bg-stone-800 transition-colors"></div>
      </div>
    </div>
  );
};
