import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SpotlightCard from '../reactbits/Components/SpotlightCard/SpotlightCard';
import { projects, type Locale, type ProjectDetail } from '../../content/projects';
import { SectionTitle } from './SectionTitle';
import { dataService } from '../../services/DataService';
import { useProjectImage } from '../../utils/projectImage';

// 项目卡片图片组件 - 自动适配扩展名
const ProjectCardImage = ({ slug, alt }: { slug: string; alt: string }) => {
  const { loading, src, failed } = useProjectImage(slug, 'hero');

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-3">
        <span className="text-[10px] text-muted/50">加载中...</span>
      </div>
    );
  }

  if (failed || !src) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-3">
        <span className="text-[10px] text-muted/50">暂无预览图</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-contain p-3 opacity-90 transition-all duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
    />
  );
};

// Projects renders as a child of About above. The heading is intentionally smaller
// than the parent About title so the hierarchy reads "About me > Projects + Contact".
export const ProjectsSection = () => {
  const { t, i18n } = useTranslation();
  const locale = (i18n.language.startsWith('zh') ? 'zh' : 'en') as Locale;

  // 合并静态数据和自定义数据
  const allProjects = useMemo(() => {
    const customProjects = dataService.getProjects();

    // 如果没有自定义数据，使用默认静态数据
    if (customProjects.length === 0) {
      return projects;
    }

    // 将自定义项目转换为 ProjectDetail 格式
    const customAsDetail: ProjectDetail[] = customProjects
      .filter((p) => p.visible)
      .sort((a, b) => a.order - b.order)
      .map((p) => ({
        slug: p.slug,
        name: p.name,
        tagline: { zh: p.tagline, en: p.tagline },
        description: { zh: p.description, en: p.description },
        tags: p.tags,
        techStack: p.techStack,
        githubUrl: p.githubUrl,
        liveUrl: p.liveUrl,
        heroImage: p.heroImage,
        features: p.features.map((f) => ({
          title: { zh: f.title, en: f.title },
          description: { zh: f.description, en: f.description },
          image: f.image,
        })),
      }));

    // 合并：自定义项目在前，默认项目在后（去重）
    const customSlugs = new Set(customAsDetail.map((p) => p.slug));
    const filteredDefaults = projects.filter((p) => !customSlugs.has(p.slug));

    return [...customAsDetail, ...filteredDefaults];
  }, []);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-20 scroll-mt-28">
      <SectionTitle>
        {t('section.projects')}
      </SectionTitle>

      <div className="grid items-stretch gap-7 md:grid-cols-2 lg:grid-cols-3">
        {allProjects.map((p) => (
          <Link
            key={p.slug}
            to={`/projects/${p.slug}`}
            className="group flex h-full focus:outline-none"
            aria-label={`${p.name} — ${p.tagline[locale]}`}
          >
            <SpotlightCard
              className="!flex !h-full !w-full !flex-col !p-0 !bg-surface/55 backdrop-blur-md !border-white/10 transition-all duration-300 group-hover:!border-accent/40 group-hover:-translate-y-1"
              spotlightColor="rgba(167, 139, 250, 0.22)"
            >
              <div className="relative aspect-[2/1] w-full overflow-hidden rounded-t-3xl bg-gradient-to-br from-black/60 to-surface/60">
                <ProjectCardImage slug={p.slug} alt={`${p.name} preview`} />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface/80 to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold text-text">{p.name}</h3>
                  <span className="mt-1 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
                    ↗
                  </span>
                </div>

                <p className="mb-5 flex-1 text-sm leading-relaxed text-muted">{p.tagline[locale]}</p>

                <div className="mb-5 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-accent/20 bg-accent/5 px-2.5 py-1 text-xs text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors group-hover:text-accent2">
                    {t('project.viewDetails')}
                  </span>
                  <span className="font-mono text-xs text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent2">
                    →
                  </span>
                </div>
              </div>
            </SpotlightCard>
          </Link>
        ))}
      </div>
    </section>
  );
};
