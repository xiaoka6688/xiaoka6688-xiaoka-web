import { useState, useEffect } from 'react';

// 小卡海报编辑器Demo
const TEMPLATES = [
  { name: '经典海报', icon: '📄', size: '600×800' },
  { name: '小红书', icon: '📕', size: '1080×1440' },
  { name: '微信分享', icon: '💬', size: '900×1600' },
  { name: 'Twitter', icon: '🐦', size: '1200×630' },
  { name: '手机壁纸', icon: '📱', size: '1080×1920' },
  { name: 'A4文档', icon: '📃', size: '794×1123' },
];

const EXPORT_FORMATS = ['PNG 高清', 'JPG 图片', 'HTML 文件'];

export const PosterDemo = () => {
  const [templateIndex, setTemplateIndex] = useState(0);
  const [title, setTitle] = useState('小卡海报编辑器');
  const [author, setAuthor] = useState('小卡');
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTemplateIndex((prev) => (prev + 1) % TEMPLATES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 1500);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-xs">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[10px] tracking-[0.15em] text-emerald-400">
          小卡海报编辑器 · 离线可用
        </span>
        <span className="text-[10px] text-muted">
          实时预览
        </span>
      </div>

      {/* Template Selection */}
      <div className="mb-3">
        <div className="text-[9px] text-muted mb-1.5">选择模板</div>
        <div className="grid grid-cols-3 gap-1.5">
          {TEMPLATES.map((tpl, i) => (
            <div
              key={tpl.name}
              className={`rounded-lg border p-1.5 text-center transition-all duration-300 ${
                i === templateIndex
                  ? 'border-emerald-500/50 bg-emerald-500/10'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              <div className="text-[10px]">{tpl.icon}</div>
              <div className="text-[9px] mt-0.5">{tpl.name}</div>
              <div className="text-[8px] text-muted">{tpl.size}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Fields */}
      <div className="mb-3 space-y-2">
        <div>
          <div className="text-[9px] text-muted mb-1">标题</div>
          <div className="rounded border border-white/10 bg-white/5 px-2 py-1 text-[10px]">
            {title}
          </div>
        </div>
        <div>
          <div className="text-[9px] text-muted mb-1">作者</div>
          <div className="rounded border border-white/10 bg-white/5 px-2 py-1 text-[10px]">
            {author}
          </div>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="mb-3 flex gap-1.5">
        {EXPORT_FORMATS.map((format) => (
          <button
            key={format}
            onClick={handleExport}
            disabled={isExporting}
            className={`flex-1 rounded-lg py-1.5 text-[9px] transition-all ${
              isExporting
                ? 'bg-emerald-500/20 text-emerald-300 cursor-wait'
                : 'bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
            }`}
          >
            {isExporting ? '导出中...' : format}
          </button>
        ))}
      </div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="text-sm font-bold text-emerald-400">6+</div>
          <div className="text-[9px] text-muted">模板尺寸</div>
        </div>
        <div>
          <div className="text-sm font-bold text-blue-400">MD</div>
          <div className="text-[9px] text-muted">Markdown</div>
        </div>
        <div>
          <div className="text-sm font-bold text-purple-400">离线</div>
          <div className="text-[9px] text-muted">无需联网</div>
        </div>
      </div>
    </div>
  );
};

export default PosterDemo;
