import { useState, useEffect } from 'react';

// 破局AI项目圈·资源站 数据看板Demo
const TRACKS = [
  { name: 'AI编程', count: 582 },
  { name: 'AI工具', count: 513 },
  { name: 'AI智能体', count: 472 },
  { name: 'AI写作', count: 464 },
  { name: 'AI企业培训', count: 297 }
];

const PLATFORMS = ['小红书', '公众号', '抖音', '视频号', '知乎'];

export const PojuAiDemo = () => {
  const [activeTrack, setActiveTrack] = useState(0);
  const [postCount, setPostCount] = useState(3591);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTrack((prev) => (prev + 1) % TRACKS.length);
      setPostCount((prev) => prev + Math.floor(Math.random() * 2));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const max = TRACKS[0].count;

  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-xs">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[10px] tracking-[0.15em] text-rose-400">
          破局AI项目圈 · 数据看板
        </span>
        <span className="text-[10px] text-muted">
          {postCount.toLocaleString()} AI项目帖
        </span>
      </div>

      {/* Track heat bars */}
      <div className="mb-3 space-y-1.5">
        {TRACKS.map((t, i) => (
          <div key={t.name} className="flex items-center gap-2">
            <span
              className={`w-16 shrink-0 text-[10px] transition-colors ${
                i === activeTrack ? 'text-rose-300' : 'text-muted'
              }`}
            >
              {t.name}
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  i === activeTrack ? 'bg-rose-400/80' : 'bg-white/20'
                }`}
                style={{ width: `${(t.count / max) * 100}%` }}
              />
            </div>
            <span className="w-8 shrink-0 text-right text-[10px] text-muted">
              {t.count}
            </span>
          </div>
        ))}
      </div>

      {/* Platform tags */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {PLATFORMS.map((p) => (
          <span
            key={p}
            className="rounded-full border border-white/5 bg-white/5 px-2 py-0.5 text-[10px] text-muted"
          >
            {p}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 text-center">
        <div>
          <div className="text-sm font-bold text-rose-400">52</div>
          <div className="text-[9px] text-muted">覆盖城市</div>
        </div>
        <div>
          <div className="text-sm font-bold text-blue-400">1809</div>
          <div className="text-[9px] text-muted">发起组局</div>
        </div>
        <div>
          <div className="text-sm font-bold text-amber-400">835</div>
          <div className="text-[9px] text-muted">精华帖</div>
        </div>
        <div>
          <div className="text-sm font-bold text-emerald-400">379</div>
          <div className="text-[9px] text-muted">高关联圈友</div>
        </div>
      </div>
    </div>
  );
};

export default PojuAiDemo;
