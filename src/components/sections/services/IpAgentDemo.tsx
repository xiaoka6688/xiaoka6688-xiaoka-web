import { useState, useEffect, useRef } from 'react';

// IP Agent Demo - 展示营销获客智能体的视频创作流程
const WORKFLOW_STEPS = [
  { id: 1, name: '文案生成', icon: '✍️', status: 'AI 自动生成中...' },
  { id: 2, name: '音频合成', icon: '🎙️', status: '选择音色中...' },
  { id: 3, name: '数字人', icon: '👤', status: '生成口播视频...' },
  { id: 4, name: '智能剪辑', icon: '🎬', status: '添加特效字幕...' },
  { id: 5, name: '标题封面', icon: '🖼️', status: 'AI 制作封面...' },
  { id: 6, name: '发布', icon: '📤', status: '一键发布中...' },
];

const PLATFORMS = [
  { name: '抖音', color: '#000000' },
  { name: '视频号', color: '#07C160' },
  { name: '小红书', color: '#FF2442' },
];

export function IpAgentDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= WORKFLOW_STEPS.length - 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return prev;
        }
        setCompletedSteps((completed) => [...completed, prev]);
        return prev + 1;
      });
    }, 1500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-4">
      {/* Header */}
      <div className="mb-3 flex items-center gap-2 border-b border-white/5 pb-3">
        <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
        <span className="text-[11px] text-text/85">营销获客智能体 v7.0</span>
        <span className="ml-auto text-[9px] uppercase tracking-[0.2em] text-muted">
          {completedSteps.length === WORKFLOW_STEPS.length ? '已完成' : '创作中...'}
        </span>
      </div>

      {/* Workflow Steps */}
      <div className="mb-4 space-y-2">
        {WORKFLOW_STEPS.map((step, i) => {
          const isCompleted = completedSteps.includes(i);
          const isCurrent = currentStep === i;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 rounded-lg border px-3 py-2 transition-all duration-300 ${
                isCurrent
                  ? 'border-purple-400/50 bg-purple-400/10'
                  : isCompleted
                  ? 'border-emerald-400/30 bg-emerald-400/5'
                  : 'border-white/5 bg-white/[0.02]'
              }`}
            >
              <span className="text-sm">{step.icon}</span>
              <span
                className={`flex-1 text-[11px] ${
                  isCurrent ? 'text-text' : isCompleted ? 'text-emerald-300' : 'text-muted/50'
                }`}
              >
                {step.name}
              </span>
              <span
                className={`text-[10px] ${
                  isCurrent
                    ? 'text-purple-300 animate-pulse'
                    : isCompleted
                    ? 'text-emerald-400'
                    : 'text-muted/30'
                }`}
              >
                {isCurrent ? step.status : isCompleted ? '✓' : '—'}
              </span>
            </div>
          );
        })}
      </div>

      {/* Platform Distribution */}
      {completedSteps.length === WORKFLOW_STEPS.length && (
        <div className="border-t border-white/5 pt-3">
          <div className="text-[10px] text-muted uppercase tracking-wider mb-2">发布平台</div>
          <div className="flex gap-2">
            {PLATFORMS.map((platform) => (
              <div
                key={platform.name}
                className="flex items-center gap-1.5 rounded border border-white/10 bg-white/[0.03] px-2 py-1"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: platform.color }}
                />
                <span className="text-[10px] text-text/80">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
