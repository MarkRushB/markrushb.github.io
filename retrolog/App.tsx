
import React, { useState, useMemo, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { INITIAL_POSTS } from './constants';
import { BlogPost, Chronicle, Echo } from './types';
import { PostCard } from './components/PostCard';
import { EchoCard } from './components/EchoCard';
import { AdminPanel } from './components/AdminPanel';

// --- Shared Components ---

const Header: React.FC = () => (
  <header className="py-20 border-b-2 border-stone-800 mb-20">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div>
        <Link to="/" className="text-7xl font-serif font-bold tracking-tighter hover:italic transition-all duration-500">
          复古日志
        </Link>
        <p className="text-stone-400 font-mono text-xs mt-6 uppercase tracking-[0.4em] max-w-md leading-loose">
          CHRONICLE & ECHO — 寻找数字生活的留白与深度
        </p>
      </div>
      <nav className="flex gap-10 font-mono text-xs uppercase font-bold tracking-widest">
        <Link to="/" className="hover:line-through decoration-2">存档 / Archive</Link>
        <Link to="/about" className="hover:line-through decoration-2">关于 / About</Link>
        <Link to="/admin" className="text-stone-300 hover:text-stone-800 transition-colors">管理 / Bureau</Link>
      </nav>
    </div>
  </header>
);

const Footer: React.FC = () => (
  <footer className="py-24 mt-32 border-t-2 border-stone-800 flex flex-col items-center bg-[#f0ede4]">
    <div className="max-w-md w-full mb-20 p-10 bg-white retro-border retro-shadow text-center">
      <h4 className="font-serif text-2xl mb-4 font-bold">书信往来</h4>
      <p className="font-serif italic text-sm mb-8 text-stone-500 leading-relaxed">
        如果你喜欢这些文字，可以留下你的地址。我们将不定期发送思想的深度回响。
      </p>
      <div className="flex flex-col gap-4">
        <input 
          type="email" 
          placeholder="电子邮箱地址..." 
          className="w-full bg-stone-50 border border-stone-200 p-3 text-xs font-mono outline-none focus:border-stone-800 transition-colors"
        />
        <button className="w-full bg-stone-800 text-white font-mono text-xs uppercase font-bold py-3 tracking-widest hover:bg-black transition-colors">
          订阅更新 / SUBSCRIBE
        </button>
      </div>
    </div>
    <p className="font-serif italic text-stone-400 mb-6 text-center text-lg">“媒介即讯息。”</p>
    <div className="font-mono text-[10px] text-stone-300 uppercase tracking-[0.3em] text-center">
      Designed with intention • {new Date().getFullYear()}
    </div>
  </footer>
);

// --- Pages ---

const Home: React.FC<{ posts: BlogPost[] }> = ({ posts }) => {
  const navigate = useNavigate();

  const timelinePosts = useMemo(() => {
    return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [posts]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-0">
      <div className="relative">
        <div className="absolute left-[-2rem] top-0 bottom-0 w-[2px] bg-stone-200 hidden md:block"></div>
        
        <div className="space-y-4">
          {timelinePosts.map((post) => (
            <div key={post.id} className="relative">
              <div className="hidden md:block absolute left-[-6rem] top-12 font-mono text-[9px] text-stone-300 rotate-[-90deg] origin-right tracking-widest uppercase">
                {post.date}
              </div>
              
              {post.type === 'chronicle' ? (
                <PostCard 
                  post={post as Chronicle} 
                  onClick={(p) => navigate(`/post/${p.id}`)} 
                />
              ) : (
                <EchoCard echo={post as Echo} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PostDetail: React.FC<{ posts: BlogPost[] }> = ({ posts }) => {
  const navigate = useNavigate();
  const id = window.location.hash.split('/').pop();
  const post = posts.find(p => p.id === id && p.type === 'chronicle') as Chronicle;
  const [isTocOpen, setIsTocOpen] = useState(false);

  const toc = useMemo(() => {
    if (!post) return [];
    return post.fullContent
      .split('\n\n')
      .filter(para => para.startsWith('###'))
      .map((para, index) => ({
        id: `heading-${index}`,
        text: para.replace('###', '').trim()
      }));
  }, [post]);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsTocOpen(false);
    }
  };

  if (!post) return <div className="py-32 text-center font-mono uppercase tracking-widest text-stone-400">未找到相关编年史 / 404 Not Found</div>;

  return (
    <div className="relative max-w-4xl mx-auto px-6 md:px-0">
      
      {/* --- Floating Archive Tab (TOC) --- */}
      {toc.length > 0 && (
        <>
          {/* Backdrop */}
          {isTocOpen && (
            <div 
              className="fixed inset-0 bg-stone-900/10 backdrop-blur-[2px] z-[60] transition-opacity duration-500"
              onClick={() => setIsTocOpen(false)}
            />
          )}

          {/* Floating Tab Button */}
          <button 
            onClick={() => setIsTocOpen(!isTocOpen)}
            className={`fixed right-0 top-1/2 -translate-y-1/2 z-[70] flex items-center transition-all duration-500 ${isTocOpen ? 'translate-x-full' : 'translate-x-0'}`}
          >
            <div className="bg-stone-800 text-white py-8 px-2 flex flex-col items-center gap-4 rounded-l-lg retro-shadow-sm border-2 border-stone-800 border-r-0 group">
              <span className="font-mono text-[10px] uppercase font-bold tracking-[0.4em] [writing-mode:vertical-lr] rotate-180 group-hover:tracking-[0.6em] transition-all">
                INDEX 目录
              </span>
              <div className="w-px h-8 bg-stone-600 border-l border-dashed border-stone-500"></div>
              <span className="font-mono text-xs">{isTocOpen ? '×' : '—'}</span>
            </div>
          </button>

          {/* Drawer Panel */}
          <aside 
            className={`fixed top-0 right-0 h-full w-80 md:w-96 bg-[#fdfcfb] z-[65] border-l-4 border-stone-800 shadow-2xl transition-transform duration-500 ease-in-out transform ${isTocOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <div className="h-full flex flex-col p-10 md:p-12 overflow-y-auto paper-texture">
              <header className="mb-12 flex justify-between items-end border-b border-stone-100 pb-8">
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-stone-300 font-bold mb-2">ARCHIVE INDEX</h4>
                  <h3 className="font-serif text-3xl font-bold italic">档案索引</h3>
                </div>
                <button 
                  onClick={() => setIsTocOpen(false)}
                  className="font-mono text-sm text-stone-400 hover:text-stone-800 transition-colors mb-1"
                >
                  CLOSE [×]
                </button>
              </header>

              <nav className="flex flex-col gap-8">
                {toc.map((item, index) => (
                  <a 
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className="group block"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-[10px] text-stone-300 group-hover:text-stone-800 transition-colors">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                      <span className="font-serif text-lg text-stone-600 group-hover:text-stone-900 group-hover:italic transition-all leading-tight">
                        {item.text}
                      </span>
                    </div>
                  </a>
                ))}
              </nav>

              <footer className="mt-auto pt-12">
                <div className="border-t border-stone-100 pt-8 flex flex-col gap-2">
                  <span className="font-mono text-[9px] text-stone-300 uppercase tracking-widest leading-loose">
                    FILE ID: {post.id}<br/>
                    TYPE: CHRONICLE<br/>
                    DATE: {post.date}
                  </span>
                </div>
              </footer>
            </div>
          </aside>
        </>
      )}

      {/* --- Article Body --- */}
      <article className="pb-40">
        <button 
          onClick={() => navigate(-1)}
          className="mb-20 font-mono text-xs uppercase font-bold text-stone-400 hover:text-stone-800 transition-colors group flex items-center gap-2"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> 返回归档 / BACK
        </button>
        
        <header className="mb-24">
          <div className="flex items-center gap-6 mb-8">
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-stone-800 font-bold">
              {post.date}
            </span>
            <div className="h-[1px] flex-1 bg-stone-200"></div>
          </div>
          <h1 className="text-5xl md:text-8xl font-serif font-bold mb-12 leading-[1.1] tracking-tighter">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-4">
            {post.tags.map(tag => (
              <span key={tag} className="px-5 py-1.5 bg-stone-100 text-stone-600 text-[10px] font-mono rounded-sm border border-stone-200 uppercase tracking-widest">
                #{tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose-custom font-serif text-xl md:text-2xl leading-[1.8] text-stone-800 space-y-12">
          {post.fullContent.split('\n\n').map((para, idx) => {
            if (para.startsWith('###')) {
              const headingIdx = toc.findIndex(item => item.text === para.replace('###', '').trim());
              const anchorId = headingIdx !== -1 ? toc[headingIdx].id : `heading-${idx}`;
              
              return (
                <div key={idx} className="pt-12 pb-4">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-px bg-stone-800"></div>
                    <span className="font-mono text-xs text-stone-300">SEC. { (headingIdx + 1).toString().padStart(2, '0') }</span>
                  </div>
                  <h3 
                    id={anchorId}
                    className="text-3xl md:text-4xl font-bold italic text-stone-900 scroll-mt-24"
                  >
                    {para.replace('###', '').trim()}
                  </h3>
                </div>
              );
            }
            return <p key={idx} className="first-letter:text-5xl first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:leading-none first-letter:mt-1">{para}</p>;
          })}
        </div>
      </article>
    </div>
  );
};

const About: React.FC = () => (
  <div className="max-w-2xl mx-auto py-16 px-4 sm:px-0">
    <h2 className="text-5xl font-serif font-bold mb-12 italic border-b-2 border-stone-800 inline-block pb-2">关于本刊 / About</h2>
    <div className="space-y-8 font-serif text-xl leading-relaxed text-stone-700">
      <p>
        这是一个致力于记录思想深度与广度的数字花园。在碎片化信息的洪流中，我们选择留住那些有分量的瞬间。
      </p>
      <div className="p-8 bg-white retro-border">
        <p className="mb-6">我们将内容分为两个维度：</p>
        <ul className="space-y-6 ml-4">
          <li className="flex gap-4">
            <span className="font-mono text-xs bg-stone-800 text-white h-6 w-6 flex items-center justify-center flex-shrink-0">C</span>
            <div>
              <strong className="block text-stone-900 mb-1">编年史 (Chronicle)</strong>
              <span className="text-lg opacity-80 italic">深度的、结构化的长篇思考与研究成果。</span>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="font-mono text-xs bg-stone-400 text-white h-6 w-6 flex items-center justify-center flex-shrink-0">E</span>
            <div>
              <strong className="block text-stone-900 mb-1">回响 (Echo)</strong>
              <span className="text-lg opacity-80 italic">日常的、瞬时的灵感，它是思想碎片的自然流露。</span>
            </div>
          </li>
        </ul>
      </div>
      <p>
        在这里，快与慢、深与浅交织在一起，构成一个完整的思维演化路径。
      </p>
      <div className="pt-20">
        <div className="w-20 h-1 bg-stone-800 mb-6"></div>
        <p className="font-mono text-xs uppercase tracking-[0.5em] text-stone-400">CURATED BY THE CURATOR</p>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);

  const handleAddPost = (newPost: BlogPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <HashRouter>
      <div className="min-h-screen">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <Header />
          
          <Routes>
            <Route path="/" element={<Home posts={posts} />} />
            <Route path="/post/:id" element={<PostDetail posts={posts} />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<AdminPanel onAddPost={handleAddPost} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
