import { useState, useEffect, useRef } from 'react';

// Logo Design Demo - 展示Logo设计流程
const LOGO_STYLES = [
  { name: '简约', color: '#1a1a2e' },
  { name: '科技', color: '#0f172a' },
  { name: '优雅', color: '#1e1b4b' },
  { name: '活力', color: '#451a03' },
];

const PLATFORMS = [
  { name: 'Favicon', size: '16×16' },
  { name: 'Apple Touch', size: '180×180' },
  { name: 'Android', size: '192×192' },
  { name: 'OG Image', size: '1200×630' },
];

export function LogoDesignDemo() {
  const [brandName, setBrandName] = useState('XCARD');
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [showPlatforms, setShowPlatforms] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Auto-cycle through steps
    intervalRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 3) {
          setShowPlatforms(true);
          return 0;
        }
        return prev + 1;
      });
    }, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-4">
      {/* Header */}
      <div className="mb-3 flex items-center gap-2 border-b border-white/5 pb-3">
        <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
        <span className="text-[11px] text-text/85">Logo Design Studio</span>
        <span className="ml-auto text-[9px] uppercase tracking-[0.2em] text-muted">
          {currentStep === 0 ? '输入品牌名' : currentStep === 1 ? '选择风格' : currentStep === 2 ? '生成中...' : '完成'}
        </span>
      </div>

      {/* Brand Name Input */}
      <div className="mb-3">
        <label className="text-[10px] text-muted uppercase tracking-wider">品牌名称</label>
        <div className="mt-1 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="flex-1 bg-transparent text-sm text-text outline-none"
            placeholder="输入品牌名..."
          />
          <span className="text-[10px] text-muted">免费 · 无需API</span>
        </div>
      </div>

      {/* Style Selection */}
      <div className="mb-3">
        <label className="text-[10px] text-muted uppercase tracking-wider">风格选择</label>
        <div className="mt-1 grid grid-cols-4 gap-2">
          {LOGO_STYLES.map((style, i) => (
            <button
              key={style.name}
              onClick={() => setSelectedStyle(i)}
              className={`rounded-lg border p-2 text-center text-[10px] transition-all ${
                selectedStyle === i
                  ? 'border-blue-400/50 bg-blue-400/10 text-blue-300'
                  : 'border-white/10 bg-white/[0.03] text-muted hover:border-white/20'
              }`}
            >
              <div
                className="mx-auto mb-1 h-8 w-8 rounded"
                style={{ background: style.color }}
              />
              {style.name}
            </button>
          ))}
        </div>
      </div>

      {/* Logo Preview */}
      <div className="mb-3 rounded-lg border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-4 text-center">
        <div className="text-2xl font-bold text-white tracking-wider">{brandName || 'LOGO'}</div>
        <div className="mt-1 text-[10px] text-white/60">{LOGO_STYLES[selectedStyle].name}风格</div>
      </div>

      {/* Platform Adaptation */}
      {showPlatforms && (
        <div className="mb-3">
          <label className="text-[10px] text-muted uppercase tracking-wider">多平台适配</label>
          <div className="mt-1 grid grid-cols-2 gap-2">
            {PLATFORMS.map((platform) => (
              <div
                key={platform.name}
                className="flex items-center justify-between rounded border border-white/10 bg-white/[0.03] px-2 py-1.5"
              >
                <span className="text-[10px] text-text/80">{platform.name}</span>
                <span className="text-[9px] text-muted">{platform.size}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between border-t border-white/5 pt-3">
        <span className="text-[10px] text-muted">4 种尺寸 · SVG + PNG</span>
        <span className="rounded border border-blue-400/30 bg-blue-400/10 px-2 py-0.5 text-[10px] text-blue-300">
          ↓ 下载打包
        </span>
      </div>
    </div>
  );
}
