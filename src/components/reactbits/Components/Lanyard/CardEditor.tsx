import { useRef, type ChangeEvent } from 'react';
import type { CardConfig } from './cardConfig';

interface CardEditorProps {
  config: CardConfig;
  onChange: (next: CardConfig) => void;
  onReset: () => void;
}

const fieldCls =
  'w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-text outline-none transition-colors focus:border-accent/60 focus:bg-white/10';
const labelCls = 'mb-1.5 block text-[11px] font-medium uppercase tracking-[0.18em] text-muted';
const btnCls =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/5 px-3 py-2 text-xs font-semibold text-text transition-all hover:border-accent/60 hover:bg-white/10';

export default function CardEditor({ config, onChange, onReset }: CardEditorProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const update = (patch: Partial<CardConfig>) => onChange({ ...config, ...patch });

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update({ avatar: String(reader.result) });
    reader.readAsDataURL(file);
  };

  const avatarStyle = config.avatar
    ? { backgroundImage: `url(${config.avatar})` }
    : {
        background:
          'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.10))'
      };

  return (
    <div className="rounded-2xl border border-white/10 bg-surface/60 p-5 backdrop-blur-md md:p-6">
      <div className="mb-5 flex items-baseline justify-between gap-3">
        <h4 className="text-base font-bold text-text">自定义工牌</h4>
        <span className="text-[11px] text-muted">修改即时生效 · 自动保存</span>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* 头像 */}
        <div className="md:col-span-2 flex items-center gap-4">
          <div
            className="h-20 w-20 shrink-0 rounded-full border-2 bg-cover bg-center"
            style={{ borderColor: config.accent, ...avatarStyle }}
            aria-hidden
          >
            {!config.avatar && (
              <div className="flex h-full w-full items-center justify-center text-xl font-bold text-text/70">
                {config.name.slice(0, 1) || '卡'}
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className={btnCls} onClick={() => fileRef.current?.click()}>
              上传头像
            </button>
            {config.avatar && (
              <button
                type="button"
                className={btnCls}
                onClick={() => update({ avatar: '' })}
              >
                清除头像
              </button>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onFile}
            />
          </div>
          <p className="ml-auto hidden max-w-[180px] text-[11px] leading-relaxed text-muted md:block">
            建议使用正方形头像，会自动裁剪为圆形。
          </p>
        </div>

        {/* 姓名 */}
        <div>
          <label className={labelCls} htmlFor="ce-name">
            姓名
          </label>
          <input
            id="ce-name"
            className={fieldCls}
            value={config.name}
            maxLength={12}
            placeholder="小卡"
            onChange={(e) => update({ name: e.target.value })}
          />
        </div>

        {/* 副标题 / 方向 */}
        <div>
          <label className={labelCls} htmlFor="ce-sub">
            副标题 / 方向
          </label>
          <input
            id="ce-sub"
            className={fieldCls}
            value={config.subtitle}
            maxLength={40}
            placeholder="AI 智能体项目实战应用"
            onChange={(e) => update({ subtitle: e.target.value })}
          />
        </div>

        {/* 顶部红条文字 */}
        <div className="md:col-span-2">
          <div className="flex items-center justify-between">
            <label className={labelCls} htmlFor="ce-banner">
              顶部红条文字
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-[11px] text-muted">
              <input
                type="checkbox"
                checked={config.showBanner}
                onChange={(e) => update({ showBanner: e.target.checked })}
                className="accent-[var(--accent,#7C3AED)]"
              />
              显示红条
            </label>
          </div>
          <input
            id="ce-banner"
            className={fieldCls}
            value={config.bannerText}
            maxLength={24}
            disabled={!config.showBanner}
            placeholder="留空则只显示纯色条"
            onChange={(e) => update({ bannerText: e.target.value })}
          />
        </div>

        {/* 主题色 */}
        <div>
          <label className={labelCls} htmlFor="ce-accent">
            主题色
          </label>
          <div className="flex items-center gap-2">
            <input
              id="ce-accent"
              type="color"
              value={config.accent}
              onChange={(e) => update({ accent: e.target.value })}
              className="h-9 w-12 cursor-pointer rounded border border-white/10 bg-transparent"
            />
            <input
              className={fieldCls}
              value={config.accent}
              onChange={(e) => update({ accent: e.target.value })}
            />
          </div>
        </div>

        {/* 背景渐变 */}
        <div>
          <label className={labelCls}>背景渐变</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={config.bgTop}
              onChange={(e) => update({ bgTop: e.target.value })}
              className="h-9 w-12 cursor-pointer rounded border border-white/10 bg-transparent"
              aria-label="背景顶部色"
            />
            <input
              type="color"
              value={config.bgBottom}
              onChange={(e) => update({ bgBottom: e.target.value })}
              className="h-9 w-12 cursor-pointer rounded border border-white/10 bg-transparent"
              aria-label="背景底部色"
            />
            <span className="text-[11px] text-muted">上 → 下</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button type="button" className={btnCls} onClick={onReset}>
          恢复默认
        </button>
      </div>
    </div>
  );
}
