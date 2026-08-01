import { useState, useEffect, useRef } from 'react';

// AI Design Demo - 展示AI设计工具平台
const DESIGN_CATEGORIES = [
  { name: 'Logo设计', icon: '🎨' },
  { name: '海报设计', icon: '🖼️' },
  { name: 'UI设计', icon: '📱' },
  { name: '品牌设计', icon: '✨' },
];

export function AiDesignDemo() {
  const [activeCategory, setActiveCategory] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % DESIGN_CATEGORIES.length);
    }, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-4">
      {/* Header */}
      <div className="mb-3 flex items-center gap-2 border-b border-white/5 pb-3">
        <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
        <span className="text-[11px] text-text/85">AI Design Studio</span>
        <span className="ml-auto text-[9px] uppercase tracking-[0.2em] text-muted">
          在线平台
        </span>
      </div>

      {/* Design Categories */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {DESIGN_CATEGORIES.map((cat, i) => (
          <div
            key={cat.name}
            className={`flex items-center gap-2 rounded-lg border p-3 transition-all duration-300 ${
              activeCategory === i
                ? 'border-purple-400/50 bg-purple-400/10'
                : 'border-white/10 bg-white/[0.02]'
            }`}
          >
            <span className="text-lg">{cat.icon}</span>
            <span className={`text-xs ${activeCategory === i ? 'text-purple-300' : 'text-muted'}`}>
              {cat.name}
            </span>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-[11px]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="text-text/80">AI智能生成设计方案</span>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="text-text/80">多场景创意工具支持</span>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="text-text/80">在线使用无需安装</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
        <span className="text-[10px] text-muted">design.pojuai.com</span>
        <span className="rounded border border-purple-400/30 bg-purple-400/10 px-2 py-0.5 text-[10px] text-purple-300">
          访问网站
        </span>
      </div>
    </div>
  );
}
