import { lazy, Suspense, useMemo, useState, useEffect, type CSSProperties, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionTitle } from './SectionTitle';
import { useCardConfig } from '../../contexts/CardConfigContext';
import { dataService } from '../../services/DataService';
import { type ContactConfig, type ContactMethodTemplate, defaultContactConfig } from '../../types/admin';

// Lanyard pulls in three.js + rapier + drei, so keep it lazy for first paint.
const Lanyard = lazy(() => import('../reactbits/Components/Lanyard/Lanyard'));

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 图标组件
const EmailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const WeChatIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 4C5.36 4 2 6.69 2 10c0 1.89 1.08 3.56 2.78 4.66L4 17l2.5-1.5c.95.24 1.92.36 3 .36h.27a6.5 6.5 0 0 1-.27-1.84c0-3.31 3.36-6 7.5-6 .34 0 .67.02 1 .06C17.41 5.07 13.77 4 9.5 4Z" />
    <path d="M22 14.5c0-2.49-2.69-4.5-6-4.5s-6 2.01-6 4.5 2.69 4.5 6 4.5c.7 0 1.37-.09 2-.26L20 20l-.5-1.5c1.53-.83 2.5-2.13 2.5-3.99Z" />
    <circle cx="7" cy="9" r="0.5" fill="currentColor" />
    <circle cx="11" cy="9" r="0.5" fill="currentColor" />
    <circle cx="14.5" cy="13.5" r="0.5" fill="currentColor" />
    <circle cx="17.5" cy="13.5" r="0.5" fill="currentColor" />
  </svg>
);

const LinkIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

// 根据类型获取图标
const getIconByType = (type: string): ReactNode => {
  switch (type) {
    case 'email':
      return <EmailIcon />;
    case 'github':
      return <GitHubIcon />;
    case 'wechat':
      return <WeChatIcon />;
    default:
      return <LinkIcon />;
  }
};

// 根据类型获取渐变色
const getGradientByType = (type: string): string => {
  switch (type) {
    case 'email':
      return 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)';
    case 'github':
      return 'linear-gradient(135deg, #22D3EE 0%, #0EA5E9 100%)';
    case 'twitter':
      return 'linear-gradient(135deg, #1DA1F2 0%, #0D8BD9 100%)';
    case 'wechat':
      return 'linear-gradient(135deg, #07C160 0%, #06AD56 100%)';
    default:
      return 'linear-gradient(135deg, #C6FF3E 0%, #10B981 100%)';
  }
};

// 根据类型获取发光色
const getGlowByType = (type: string): string => {
  switch (type) {
    case 'email':
      return 'rgba(167, 139, 250, 0.35)';
    case 'github':
      return 'rgba(34, 211, 238, 0.35)';
    case 'wechat':
      return 'rgba(7, 193, 96, 0.35)';
      return 'rgba(29, 161, 242, 0.35)';
    case 'wechat':
      return 'rgba(7, 193, 96, 0.35)';
    default:
      return 'rgba(198, 255, 62, 0.35)';
  }
};

export const ContactSection = () => {
  const { t } = useTranslation();
  const reduced = useMemo(prefersReducedMotion, []);
  const { cardConfig } = useCardConfig();
  const [contactConfig, setContactConfig] = useState<ContactConfig>(defaultContactConfig);

  // 加载联系信息配置
  useEffect(() => {
    loadContactConfig();
    // 监听配置更新事件
    const handleUpdate = () => loadContactConfig();
    window.addEventListener('contact-config-updated', handleUpdate);
    return () => window.removeEventListener('contact-config-updated', handleUpdate);
  }, []);

  const loadContactConfig = () => {
    const saved = dataService.getContactConfig();
    if (saved) {
      setContactConfig(saved);
    }
  };

  // 过滤可见的联系方式
  const visibleMethods = contactConfig.methods.filter((m) => m.visible);

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-20 scroll-mt-28">
      <SectionTitle>
        {t('section.contact')}
      </SectionTitle>

      <div className="grid items-center gap-10 md:grid-cols-[1.05fr_1fr] md:gap-16">
        <div className="relative h-[700px] w-full select-none md:h-[800px]">
          <div
            className="pointer-events-none absolute -inset-10 -z-10 rounded-full opacity-60 blur-3xl"
            style={{ background: 'radial-gradient(circle at 50% 30%, rgba(167,139,250,0.4), transparent 60%)' }}
            aria-hidden
          />

          {!reduced ? (
            <Suspense fallback={<div className="h-full w-full" />}>
              <Lanyard
                position={[0, 0, 12]}
                fov={18}
                transparent
                gravity={[0, -38, 0]}
                cardConfig={cardConfig}
              />
            </Suspense>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted">
              <div className="h-72 w-48 rounded-xl bg-surface/60" />
            </div>
          )}

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-muted/70">
            ↑ {t('contact.dragHint')}
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">{t('contact.title')}</p>
            <h3 className="mt-3 bg-accent-gradient bg-clip-text text-5xl font-bold leading-[1.05] tracking-tight text-transparent md:text-6xl">
              {contactConfig.name}
            </h3>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-muted">{contactConfig.role}</p>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-text/80 md:text-base">
            {contactConfig.description}
          </p>

          <div className="grid gap-3">
            {visibleMethods.map((method) => (
              <ContactCard
                key={method.id}
                label={method.label}
                value={method.value}
                href={method.href}
                icon={getIconByType(method.type)}
                gradient={getGradientByType(method.type)}
                glow={getGlowByType(method.type)}
                external={method.type !== 'email'}
              />
            ))}
          </div>

          <div>
            <a
              href={`mailto:${contactConfig.primaryEmail}`}
              className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-text backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:bg-white/10"
            >
              <EmailIcon />
              {t('contact.button')}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactCard = ({
  label,
  value,
  href,
  icon,
  gradient,
  glow,
  external
}: {
  label: string;
  value: string;
  href: string;
  icon: ReactNode;
  gradient: string;
  glow: string;
  external?: boolean;
}) => (
  <a
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noreferrer' : undefined}
    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface/50 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
    style={{ '--glow-color': glow } as CSSProperties}
  >
    <span
      aria-hidden
      className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style={{ background: 'radial-gradient(circle at 25% 0%, var(--glow-color), transparent 62%)' }}
    />

    <span className="relative flex items-center gap-4">
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]"
        style={{ background: gradient }}
        aria-hidden
      >
        {icon}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[10px] tracking-[0.22em] text-muted">{label}</span>
        <span className="mt-1 block truncate text-sm font-bold text-text transition-colors group-hover:text-accent">
          {value}
        </span>
      </span>

      <span
        className="text-xs text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        aria-hidden
      >
        ↗
      </span>
    </span>
  </a>
);
