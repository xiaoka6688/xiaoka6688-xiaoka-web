import { useState, useEffect, useRef } from 'react';

// News Trend Demo - 展示新闻趋势聚合平台
const TRENDING_TOPICS = [
  { title: 'AI 技术突破', source: '科技', hot: '98%' },
  { title: '新能源汽车销量创新高', source: '财经', hot: '92%' },
  { title: '世界杯预选赛', source: '体育', hot: '88%' },
  { title: '元宇宙最新进展', source: '科技', hot: '85%' },
];

const NEWS_SOURCES = [
  { name: '新浪', count: 1256 },
  { name: '腾讯', count: 987 },
  { name: '网易', count: 856 },
  { name: '头条', count: 2341 },
];

export function NewsTrendDemo() {
  const [activeTopic, setActiveTopic] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveTopic((prev) => (prev + 1) % TRENDING_TOPICS.length);
    }, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-4">
      {/* Header */}
      <div className="mb-3 flex items-center gap-2 border-b border-white/5 pb-3">
        <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
        <span className="text-[11px] text-text/85">News Trend</span>
        <span className="ml-auto text-[9px] uppercase tracking-[0.2em] text-muted">
          实时更新
        </span>
      </div>

      {/* Trending Topics */}
      <div className="mb-4">
        <div className="text-[10px] text-muted uppercase tracking-wider mb-2">热点趋势</div>
        <div className="space-y-2">
          {TRENDING_TOPICS.map((topic, i) => (
            <div
              key={topic.title}
              className={`flex items-center gap-3 rounded-lg border p-2.5 transition-all duration-300 ${
                activeTopic === i
                  ? 'border-sky-400/50 bg-sky-400/10'
                  : 'border-white/10 bg-white/[0.02]'
              }`}
            >
              <span className={`text-xs font-bold ${activeTopic === i ? 'text-sky-300' : 'text-muted'}`}>
                {i + 1}
              </span>
              <span className={`flex-1 text-[11px] ${activeTopic === i ? 'text-text' : 'text-muted'}`}>
                {topic.title}
              </span>
              <span className="text-[9px] text-muted">{topic.source}</span>
              <span className={`text-[9px] ${activeTopic === i ? 'text-sky-300' : 'text-muted'}`}>
                {topic.hot}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* News Sources */}
      <div className="mb-3">
        <div className="text-[10px] text-muted uppercase tracking-wider mb-2">资讯来源</div>
        <div className="grid grid-cols-2 gap-2">
          {NEWS_SOURCES.map((source) => (
            <div
              key={source.name}
              className="flex items-center justify-between rounded border border-white/10 bg-white/[0.02] px-2 py-1.5"
            >
              <span className="text-[10px] text-text/80">{source.name}</span>
              <span className="text-[9px] text-muted">{source.count}篇</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/5 pt-3">
        <span className="text-[10px] text-muted">news.pojuai.com</span>
        <span className="rounded border border-sky-400/30 bg-sky-400/10 px-2 py-0.5 text-[10px] text-sky-300">
          访问网站
        </span>
      </div>
    </div>
  );
}
