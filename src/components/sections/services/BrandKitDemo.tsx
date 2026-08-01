import { useState, useEffect, useRef } from 'react';

// Brand Kit Demo - 展示品牌资产生成过程
const BRAND_ASSETS = [
  { type: 'Logo', name: '主Logo', variant: '深底绿边卡片 + 白色 XK + 绿点' },
  { type: 'Logo', name: '图标版', variant: '简约圆形适配' },
  { type: '头像', name: '主头像', variant: '严肃表情 · 抱手姿态' },
  { type: '头像', name: '动态头像', variant: '呼吸动画 3.6s 循环' },
  { type: '封面', name: 'GitHub封面', variant: '1280×640 社交适配' },
  { type: '封面', name: '微信封面', variant: '900×383 平台适配' },
  { type: 'Favicon', name: '网站图标', variant: '多尺寸 16-512px' },
  { type: '水印', name: '品牌水印', variant: '半透明叠加层' },
];

const STEPS = [
  '上传参考图...',
  '分析设计语言...',
  '生成 Logo 家族...',
  '生成头像系列...',
  '创建社交封面...',
  '打包资产文件...',
  '完成 ✓',
];

export function BrandKitDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showAssets, setShowAssets] = useState(false);
  const [highlightedAsset, setHighlightedAsset] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Step animation
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= STEPS.length - 1) {
          clearInterval(stepInterval);
          setShowAssets(true);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(stepInterval);
  }, []);

  useEffect(() => {
    if (showAssets) {
      // Highlight assets one by one
      let idx = 0;
      intervalRef.current = setInterval(() => {
        setHighlightedAsset(idx);
        idx++;
        if (idx >= BRAND_ASSETS.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setTimeout(() => setHighlightedAsset(null), 1000);
        }
      }, 400);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [showAssets]);

  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-4">
      {/* Header */}
      <div className="mb-3 flex items-center gap-2 border-b border-white/5 pb-3">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[11px] text-text/85">AI Brand Kit Generator</span>
        <span className="ml-auto text-[9px] uppercase tracking-[0.2em] text-muted">
          {showAssets ? '资产已生成' : '处理中...'}
        </span>
      </div>

      {/* Progress Steps */}
      <div className="mb-4 space-y-1">
        {STEPS.map((step, i) => (
          <div
            key={step}
            className={`flex items-center gap-2 text-[11px] transition-all duration-300 ${
              i <= currentStep ? 'text-text/85 opacity-100' : 'text-muted/30 opacity-50'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                i < currentStep
                  ? 'bg-emerald-400'
                  : i === currentStep
                  ? 'bg-amber-400 animate-pulse'
                  : 'bg-white/20'
              }`}
            />
            <span>{step}</span>
          </div>
        ))}
      </div>

      {/* Asset Grid */}
      {showAssets && (
        <div className="grid grid-cols-4 gap-2">
          {BRAND_ASSETS.map((asset, i) => (
            <div
              key={asset.name}
              className={`rounded-lg border p-2 text-center transition-all duration-300 ${
                highlightedAsset === i
                  ? 'border-emerald-400/50 bg-emerald-400/10 scale-105'
                  : 'border-white/10 bg-white/[0.03]'
              }`}
            >
              <div className="text-[10px] font-bold text-text/90">{asset.type}</div>
              <div className="text-[9px] text-muted mt-0.5">{asset.name}</div>
            </div>
          ))}
        </div>
      )}

      {/* Download Button */}
      {showAssets && (
        <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
          <span className="text-[10px] text-muted">8 个资产 · SVG + PNG · 2.4MB</span>
          <span className="rounded border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] text-emerald-300">
            ↓ 下载 ZIP
          </span>
        </div>
      )}
    </div>
  );
}
