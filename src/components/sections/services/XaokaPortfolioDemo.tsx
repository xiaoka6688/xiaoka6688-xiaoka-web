import { useState, useEffect } from 'react';

// 小卡-AI实战项目集 · 作品集站全景 Demo
const SECTIONS = ['关于我', '服务', '项目', '联系'];
const AVG_STATS = [
  { k: 'AI 子站', v: '10+', note: '已上线' },
  { k: '数据看板', v: '11', note: '分析板块' },
  { k: '学习文档', v: '65+', note: '知识库' },
  { k: '主题', v: '2', note: '明暗切换' }
];

export const XaokaPortfolioDemo = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % SECTIONS.length);
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-xs">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[10px] tracking-[0.15em] text-violet-400">
          小卡-AI实战项目集 · 站点结构
        </span>
        <span className="text-[10px] text-muted">portfolio overview</span>
      </div>

      {/* Section nav */}
      <div className="mb-3 flex gap-1.5">
        {SECTIONS.map((s, i) => (
          <span
            key={s}
            className={`rounded-full border px-2 py-0.5 text-[10px] transition-colors ${
              i === active
                ? 'border-violet-400/40 bg-violet-400/15 text-violet-300'
                : 'border-white/5 bg-white/5 text-muted'
            }`}
          >
            {s}
          </span>
        ))}
      </div>

      {/* Sub-sites list */}
      <div className="mb-3 space-y-1.5">
        {['破局AI项目圈·资源站', 'FDE 学习中心', 'AI 绘图 · Logo 设计 · 海报编辑器'].map(
          (s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400/70" />
              <span className="flex-1 text-[10px] text-muted">{s}</span>
              <span className="text-[9px] text-violet-300/70">shipped</span>
            </div>
          )
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 text-center">
        {AVG_STATS.map((s) => (
          <div key={s.k}>
            <div className="text-sm font-bold text-violet-400">{s.v}</div>
            <div className="text-[9px] text-muted">{s.k}</div>
            <div className="text-[8px] text-muted/60">{s.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default XaokaPortfolioDemo;