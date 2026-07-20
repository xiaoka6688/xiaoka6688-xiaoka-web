import { useState, useEffect } from 'react';

// 小卡AI绘图平台Demo
const MODELS = ['GPT Image 2', 'Nano Banana Pro'];
const RATIOS = ['自动', '1:1', '16:9', '9:16', '4:3', '3:4'];
const RESOLUTIONS = ['1K 标准', '2K 高清', '4K 超清'];

const SAMPLE_PROMPTS = [
  '一只可爱的橘猫在阳光下打盹',
  '赛博朋克风格的未来城市夜景',
  '中国风水墨画：山水之间的小屋',
  '梦幻星空下的薰衣草花海',
  '蒸汽朋克风格的机械蝴蝶',
];

export const AiDrawDemo = () => {
  const [modelIndex, setModelIndex] = useState(0);
  const [ratioIndex, setRatioIndex] = useState(0);
  const [resIndex, setResIndex] = useState(2);
  const [promptIndex, setPromptIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setModelIndex((prev) => (prev + 1) % MODELS.length);
      setRatioIndex((prev) => (prev + 1) % RATIOS.length);
      setPromptIndex((prev) => (prev + 1) % SAMPLE_PROMPTS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isGenerating) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsGenerating(false);
            return 0;
          }
          return prev + 10;
        });
      }, 200);
      return () => clearInterval(timer);
    }
  }, [isGenerating]);

  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-xs">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[10px] tracking-[0.15em] text-purple-400">
          小卡AI绘图 · 国内可用
        </span>
        <span className="text-[10px] text-muted">
          无需翻墙
        </span>
      </div>

      {/* Prompt Input */}
      <div className="mb-3 rounded-lg border border-white/10 bg-white/5 p-3">
        <div className="mb-1 text-[9px] text-muted">创意描述 (PROMPT)</div>
        <p className="text-[11px] leading-relaxed text-text/90 min-h-[32px]">
          {SAMPLE_PROMPTS[promptIndex]}
        </p>
      </div>

      {/* Settings */}
      <div className="mb-3 grid grid-cols-3 gap-2">
        <div className="rounded-lg border border-white/10 bg-white/5 p-2 text-center">
          <div className="text-[9px] text-muted mb-1">模型</div>
          <div className="text-[10px] text-purple-300">{MODELS[modelIndex]}</div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-2 text-center">
          <div className="text-[9px] text-muted mb-1">画幅</div>
          <div className="text-[10px] text-blue-300">{RATIOS[ratioIndex]}</div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-2 text-center">
          <div className="text-[9px] text-muted mb-1">分辨率</div>
          <div className="text-[10px] text-green-300">{RESOLUTIONS[resIndex]}</div>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={() => setIsGenerating(true)}
        disabled={isGenerating}
        className={`w-full rounded-lg py-2 text-[11px] font-bold transition-all ${
          isGenerating
            ? 'bg-purple-500/20 text-purple-300 cursor-wait'
            : 'bg-purple-500/30 text-purple-200 hover:bg-purple-500/40 cursor-pointer'
        }`}
      >
        {isGenerating ? `生成中... ${progress}%` : '✨ 点击生成'}
      </button>

      {/* Progress Bar */}
      {isGenerating && (
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Features */}
      <div className="mt-3 grid grid-cols-2 gap-2 text-center">
        <div>
          <div className="text-sm font-bold text-purple-400">2+</div>
          <div className="text-[9px] text-muted">AI模型</div>
        </div>
        <div>
          <div className="text-sm font-bold text-blue-400">4K</div>
          <div className="text-[9px] text-muted">超清分辨率</div>
        </div>
      </div>
    </div>
  );
};

export default AiDrawDemo;
