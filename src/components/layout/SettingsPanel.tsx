import { useCallback, useLayoutEffect, useRef, useState, type ChangeEvent } from 'react';
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';
import { useBackground } from '../BackgroundSwitcher';
import { useCardConfig } from '../../contexts/CardConfigContext';
import { AdminPanel } from '../admin/AdminPanel';
import { ContactSectionManager } from '../admin/ContactSectionManager';

// 设置项样式
const fieldCls =
  'w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-text outline-none transition-colors focus:border-accent/60 focus:bg-white/10';
const labelCls = 'mb-1.5 block text-[11px] font-medium uppercase tracking-[0.18em] text-muted';
const btnCls =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/5 px-3 py-2 text-xs font-semibold text-text transition-all hover:border-accent/60 hover:bg-white/10';

export function SettingsPanel() {
  const { t, i18n } = useTranslation();
  const { next: nextBg } = useBackground();
  const { cardConfig, setCardConfig, resetCardConfig } = useCardConfig();

  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const isZh = i18n.language.startsWith('zh');

  const update = (patch: Partial<typeof cardConfig>) => setCardConfig({ ...cardConfig, ...patch });

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update({ avatar: String(reader.result) });
    reader.readAsDataURL(file);
  };

  // 动画逻辑
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      if (!panel) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sp-prelayer')) as HTMLElement[];
      }

      gsap.set([panel, ...preLayers], { xPercent: 100, opacity: 1 });
      if (preContainer) {
        gsap.set(preContainer, { xPercent: 0, opacity: 1 });
      }
    });
    return () => ctx.revert();
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;

    const panel = panelRef.current;
    const preContainer = preLayersRef.current;
    if (!panel) { busyRef.current = false; return; }

    const preLayers = preContainer
      ? Array.from(preContainer.querySelectorAll('.sp-prelayer')) as HTMLElement[]
      : [];

    const tl = gsap.timeline({
      onComplete: () => { busyRef.current = false; }
    });

    // 背景层滑入
    preLayers.forEach((layer, i) => {
      tl.fromTo(layer, { xPercent: 100 }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });

    // 面板滑入
    tl.fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: 0.65, ease: 'power4.out' }, preLayers.length * 0.07 + 0.08);

    // 内容淡入
    const contentEls = panel.querySelectorAll('.sp-content > *');
    if (contentEls.length) {
      tl.fromTo(contentEls, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.05
      }, '-=0.3');
    }
  }, []);

  const playClose = useCallback(() => {
    const panel = panelRef.current;
    const preContainer = preLayersRef.current;
    if (!panel) return;

    const all: HTMLElement[] = [panel];
    if (preContainer) {
      all.push(...Array.from(preContainer.querySelectorAll('.sp-prelayer')) as HTMLElement[]);
    }

    gsap.to(all, {
      xPercent: 100,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto'
    });
  }, []);

  const toggle = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      playOpen();
    } else {
      playClose();
    }
  }, [playOpen, playClose]);

  const close = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      playClose();
    }
  }, [playClose]);

  // 点击外部关闭
  useLayoutEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, close]);

  const avatarStyle = cardConfig.avatar
    ? { backgroundImage: `url(${cardConfig.avatar})` }
    : { background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.10))' };

  return (
    <>
      {/* 切换按钮 */}
      <button
        ref={toggleBtnRef}
        className="sp-toggle relative inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 cursor-pointer text-text transition-all hover:bg-white/20 hover:border-white/30"
        onClick={toggle}
        aria-label="设置"
        aria-expanded={open}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </button>

      {/* 面板容器 */}
      <div className="sp-container fixed inset-0 pointer-events-none z-50">
        {/* 背景层 */}
        <div
          ref={preLayersRef}
          className="sp-prelayers absolute top-0 right-0 bottom-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="sp-prelayer absolute top-0 right-0 h-full w-full" style={{ background: '#241B3B' }} />
          <div className="sp-prelayer absolute top-0 right-0 h-full w-full" style={{ background: '#5227FF' }} />
        </div>

        {/* 设置面板 */}
        <aside
          ref={panelRef}
          className="sp-panel absolute top-0 right-0 h-full bg-surface/95 backdrop-blur-xl border-l border-white/10 flex flex-col overflow-y-auto pointer-events-auto"
          style={{ width: 'clamp(280px, 38vw, 420px)' }}
        >
          <div className="sp-content p-6 pt-20 flex-1 flex flex-col gap-6">
            {/* 标题 */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-text">设置</h2>
              <button
                onClick={close}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="关闭设置"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 功能设置区域 */}
            <div className="space-y-4">
              <h3 className={labelCls}>功能设置</h3>

              {/* 语言切换 */}
              <button
                type="button"
                className={btnCls + ' w-full justify-between'}
                onClick={() => i18n.changeLanguage(isZh ? 'en' : 'zh')}
              >
                <span>语言</span>
                <span className="text-muted">{isZh ? 'English' : '中文'}</span>
              </button>

              {/* 背景切换 */}
              <button
                type="button"
                className={btnCls + ' w-full justify-between'}
                onClick={nextBg}
              >
                <span>切换背景</span>
                <span className="text-muted">→</span>
              </button>

              {/* GitHub */}
              <a
                href="https://github.com/xiaoka6688"
                target="_blank"
                rel="noopener noreferrer"
                className={btnCls + ' w-full justify-between'}
              >
                <span>GitHub</span>
                <span className="text-muted">↗</span>
              </a>
            </div>

            {/* 分隔线 */}
            <div className="border-t border-white/10" />

            {/* 联系板块配置（工牌 + 联系信息） */}
            <ContactSectionManager />

            {/* 分隔线 */}
            <div className="border-t border-white/10" />

            {/* 自定义管理区域 */}
            <AdminPanel />
          </div>
        </aside>
      </div>

      <style>{`
        .sp-container { position: fixed; inset: 0; pointer-events: none; z-index: 50; }
        .sp-prelayers { position: absolute; top: 0; right: 0; bottom: 0; width: clamp(280px, 38vw, 420px); pointer-events: none; }
        .sp-prelayer { position: absolute; top: 0; right: 0; height: 100%; width: 100%; }
        .sp-panel { position: absolute; top: 0; right: 0; height: 100%; }
        .sp-toggle { z-index: 51; }
        @media (max-width: 640px) {
          .sp-panel { width: 100vw !important; }
          .sp-prelayers { width: 100vw !important; }
        }
      `}</style>
    </>
  );
}

export default SettingsPanel;
