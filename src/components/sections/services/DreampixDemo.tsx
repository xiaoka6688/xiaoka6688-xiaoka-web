import { useState, useEffect } from 'react';

// Dreampix-AI 绘图与提示词案例库Demo
const CATEGORIES = [
  '全部', '学术配图', '素材资产', '头像人设', '品牌包装',
  '图像编辑', '网格拼贴', '信息图', '地图', '人物视觉',
  '海报营销', '产品视觉', '氛围插画', '视觉文档'
];

const SAMPLE_CASES = [
  { title: 'Taylor Swift 3×3 古今形象肖像网格', category: '头像人设', count: 161 },
  { title: 'Sam Altman 4×4 开发者人设合辑', category: '头像人设', count: 161 },
  { title: '唐宋元明清五朝帝王胸像横五联', category: '头像人设', count: 161 },
  { title: '希腊神话十二主神胸像古典油画', category: '头像人设', count: 161 },
  { title: '微信场景16枚打工人日常贴纸', category: '头像人设', count: 161 },
];

export const DreampixDemo = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [caseIndex, setCaseIndex] = useState(0);
  const [totalCases, setTotalCases] = useState(161);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % CATEGORIES.length);
      setCaseIndex((prev) => (prev + 1) % SAMPLE_CASES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-xs">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[10px] tracking-[0.15em] text-cyan-400">
          Dreampix-AI · 提示词案例库
        </span>
        <span className="text-[10px] text-muted">
          {totalCases}+ 案例
        </span>
      </div>

      {/* Categories */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {CATEGORIES.slice(0, 8).map((cat, i) => (
          <span
            key={cat}
            className={`rounded-full px-2 py-0.5 text-[10px] transition-all duration-300 ${
              i === activeCategory % 8
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'bg-white/5 text-muted border border-white/5'
            }`}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Case Card */}
      <div className="rounded-lg border border-white/10 bg-white/5 p-3">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-[9px] text-cyan-300">
            📚 案例库
          </span>
          <span className="rounded bg-purple-500/20 px-1.5 py-0.5 text-[9px] text-purple-300">
            {SAMPLE_CASES[caseIndex].category}
          </span>
        </div>
        <p className="mb-2 text-[11px] leading-relaxed text-text/90">
          {SAMPLE_CASES[caseIndex].title}
        </p>
        <div className="flex items-center justify-between text-[10px] text-muted">
          <span>可复用提示词</span>
          <span>查看详情 →</span>
        </div>
      </div>

      {/* Features */}
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="text-sm font-bold text-cyan-400">161+</div>
          <div className="text-[9px] text-muted">提示词案例</div>
        </div>
        <div>
          <div className="text-sm font-bold text-purple-400">17+</div>
          <div className="text-[9px] text-muted">分类标签</div>
        </div>
        <div>
          <div className="text-sm font-bold text-green-400">4K</div>
          <div className="text-[9px] text-muted">超清输出</div>
        </div>
      </div>
    </div>
  );
};

export default DreampixDemo;
