import { useState, useEffect } from 'react';

// FDE 学习中心 · 学习路径Demo
const PATHS = [
  { name: 'FDE 系统学习', n: 17, total: 17, note: '17 阶段' },
  { name: 'Agentic AI', n: 5, total: 5, note: 'L1-L5' }
];

const PHASES = [
  'AI基础认知',
  '模型架构',
  'GPU底层',
  '推理优化',
  '分布式推理',
  '生产部署',
  'Agent架构',
  '动手实验'
];

export const FdeAcademyDemo = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % PHASES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-xs">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[10px] tracking-[0.15em] text-orange-400">
          FDE 学习中心 · 学习路径
        </span>
        <span className="text-[10px] text-muted">weekly auto-update</span>
      </div>

      {/* Dual learning paths */}
      <div className="mb-3 space-y-2">
        {PATHS.map((p) => (
          <div key={p.name} className="flex items-center gap-2">
            <span className="w-28 shrink-0 text-[10px] text-muted">{p.name}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-orange-400 to-rose-400 transition-all duration-700"
                style={{ width: `${(p.n / p.total) * 100}%` }}
              />
            </div>
            <span className="w-12 shrink-0 text-right text-[10px] text-orange-300">{p.note}</span>
          </div>
        ))}
      </div>

      {/* Skill-tree phase chips */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {PHASES.map((ph, i) => (
          <span
            key={ph}
            className={`rounded-full border px-2 py-0.5 text-[10px] transition-colors ${
              i === active
                ? 'border-orange-400/40 bg-orange-400/15 text-orange-300'
                : 'border-white/5 bg-white/5 text-muted'
            }`}
          >
            {ph}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 text-center">
        <div>
          <div className="text-sm font-bold text-orange-400">17</div>
          <div className="text-[9px] text-muted">学习阶段</div>
        </div>
        <div>
          <div className="text-sm font-bold text-blue-400">65+</div>
          <div className="text-[9px] text-muted">技术文档</div>
        </div>
        <div>
          <div className="text-sm font-bold text-amber-400">40+</div>
          <div className="text-[9px] text-muted">架构图</div>
        </div>
        <div>
          <div className="text-sm font-bold text-emerald-400">7</div>
          <div className="text-[9px] text-muted">动手实验</div>
        </div>
      </div>
    </div>
  );
};

export default FdeAcademyDemo;