import { useTranslation } from 'react-i18next';
import TrueFocus from '../reactbits/TextAnimations/TrueFocus/TrueFocus';
import { SectionTitle } from './SectionTitle';
import type { Locale } from '../../content/projects';

// 关于区域的亮点数据
const highlights = [
  {
    icon: '🎓',
    title: 'AI深度研习',
    desc: '3年+ AI研习项目实战经验'
  },
  {
    icon: '🚁',
    title: '无人机行业',
    desc: '10年+ 无人机行业经验'
  },
  {
    icon: '📱',
    title: '新媒体运营',
    desc: '5年+ 新媒体运营经历'
  },
  {
    icon: '💼',
    title: '高新技术企业',
    desc: '曾就职于高德、海康等'
  }
];

// About is the visual parent of everything below the hero: the title is large enough
// that Projects + Contact read as sub-sections of it. Keep the TrueFocus effect.
export const AboutSection = () => {
  const { i18n } = useTranslation();
  const locale = (i18n.language.startsWith('zh') ? 'zh' : 'en') as Locale;

  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-28 px-6 pt-32 pb-12 md:px-12 md:pt-28 md:pb-20">
      {/* 标题 */}
      <div className="mb-8">
        <TrueFocus
          sentence="关于我"
          manualMode={false}
          blurAmount={3}
          borderColor="rgb(var(--color-accent-2))"
          glowColor="rgb(var(--color-accent-2) / 0.62)"
          animationDuration={0.6}
          pauseBetweenAnimations={1.4}
          className="!justify-start !flex-nowrap"
          wordClassName="!text-3xl md:!text-4xl lg:!text-5xl !leading-[0.92] text-text whitespace-nowrap drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)]"
        />
      </div>

      {/* 介绍文字 */}
      <p className="max-w-3xl text-base leading-relaxed text-text/80 md:text-lg mb-10">
        {locale === 'zh'
          ? 'AI实战派布道者 · 武汉 · 曾就职于高德、海康等高新技术企业，专注AI智能体开发与AIGC实战应用。'
          : 'AI实战派布道者 · 武汉 · 曾就职于高德、海康等高新技术企业，专注AI智能体开发与AIGC实战应用。'}
      </p>

      {/* 亮点卡片 */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {highlights.map((item) => (
          <div
            key={item.title}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface/50 p-5 backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:bg-surface/70"
          >
            {/* 背景光晕 */}
            <div className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-accent/10 blur-2xl transition-all duration-500 group-hover:bg-accent/20 group-hover:scale-150" />

            <div className="relative">
              <span className="text-2xl">{item.icon}</span>
              <h3 className="mt-3 text-sm font-bold text-text">{item.title}</h3>
              <p className="mt-1 text-xs text-muted leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
