
import React, { useState } from 'react';
import { BlogPost, Chronicle, Echo } from '../types';
import { polishPost, generateSummary } from '../services/geminiService';

export const AdminPanel: React.FC<{ onAddPost: (post: BlogPost) => void }> = ({ onAddPost }) => {
  const [type, setType] = useState<'echo' | 'chronicle'>('echo');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [isPolishing, setIsPolishing] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const handlePolish = async () => {
    setIsPolishing(true);
    const polished = await polishPost(content, type);
    setContent(polished);
    setIsPolishing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const date = new Date().toISOString().split('T')[0];
    const tagArray = tags.split(',').map(t => t.trim());
    
    let newPost: BlogPost;
    if (type === 'chronicle') {
      const excerpt = await generateSummary(content);
      newPost = {
        id: Date.now().toString(),
        type: 'chronicle',
        date,
        tags: tagArray,
        title,
        excerpt,
        fullContent: content
      };
    } else {
      newPost = {
        id: Date.now().toString(),
        type: 'echo',
        date,
        tags: tagArray,
        content
      };
    }

    onAddPost(newPost);
    setContent('');
    setTitle('');
    setTags('');
    setShowCode(true);
  };

  return (
    <div className="bg-stone-100 p-8 retro-border retro-shadow mt-20">
      <h3 className="text-2xl font-serif font-bold mb-6 italic">内容管理局 / Management</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4 mb-4">
          <button 
            type="button"
            onClick={() => setType('echo')}
            className={`flex-1 py-2 font-mono text-sm retro-border transition-colors ${type === 'echo' ? 'bg-stone-800 text-white' : 'bg-white'}`}
          >
            发布回响 (微动态)
          </button>
          <button 
            type="button"
            onClick={() => setType('chronicle')}
            className={`flex-1 py-2 font-mono text-sm retro-border transition-colors ${type === 'chronicle' ? 'bg-stone-800 text-white' : 'bg-white'}`}
          >
            发布编年史 (文章)
          </button>
        </div>

        {type === 'chronicle' && (
          <input 
            type="text" 
            placeholder="文章标题..." 
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full p-3 retro-border font-serif text-xl outline-none"
            required
          />
        )}

        <textarea 
          placeholder={type === 'echo' ? "此刻在想什么？" : "书写你的编年史内容..."}
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full p-4 retro-border h-40 font-serif outline-none"
          required
        />

        <input 
          type="text" 
          placeholder="标签 (用逗号分隔)..." 
          value={tags}
          onChange={e => setTags(e.target.value)}
          className="w-full p-2 retro-border font-mono text-xs outline-none"
        />

        <div className="flex gap-4">
          <button 
            type="button"
            onClick={handlePolish}
            disabled={isPolishing || !content}
            className="flex-1 bg-stone-200 py-3 font-mono font-bold retro-border hover:bg-stone-300 disabled:opacity-50 transition-colors"
          >
            {isPolishing ? 'AI 润色中...' : '使用 Gemini AI 润色'}
          </button>
          <button 
            type="submit"
            className="flex-1 bg-stone-800 text-white py-3 font-mono font-bold hover:bg-black transition-colors"
          >
            本地预览发布
          </button>
        </div>
      </form>

      {showCode && (
        <div className="mt-8 p-4 bg-stone-900 text-stone-300 font-mono text-[10px] overflow-auto max-h-40">
          <p className="text-stone-500 mb-2">// 将以下内容复制到 constants.ts 即可永久保存：</p>
          <pre>{JSON.stringify(content, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
