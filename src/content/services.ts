import type { Locale, Localized } from './projects';
import type { EmblemId } from '../components/sections/services/ServiceEmblems';

export type { Locale };

export type DemoId =
  | 'echo'
  | 'chronicle'
  | 'fortune'
  | 'continuum'
  | 'archive'
  | 'relay'
  | 'bazi'
  | 'poetry'
  | 'pjht'
  | 'ai-draw'
  | 'dreampix'
  | 'poster-editor'
  | 'brand-kit'
  | 'logo-design'
  | 'ip-agent'
  | 'ai-design'
  | 'news-trend';

export interface ServiceItem {
  slug: string;
  /** Brand-style English title — kept short so it can pair with the zh subtitle. */
  name: string;
  /** zh keeps the poetic Chinese name; en is the functional metric-style name. */
  subtitle: Localized;
  tagline: Localized;
  /** 3 short bullets surfaced only when the row is expanded. */
  features: { zh: string[]; en: string[] };
  tags: string[];
  /** Inline geometric emblem rendered in the collapsed row — see ServiceEmblems.tsx. */
  emblem: EmblemId;
  /** Which scripted demo to render at the top of the expanded panel. */
  demo: DemoId;
  /**
   * Single canonical deliverable screenshot, shown as a clickable thumbnail below
   * the demo. null for Continuum (the live demo replaces the screenshot, since there
   * is no public sample image). Click opens an <ImageLightbox>.
   */
  sampleImage: string | null;
  /** Hover/expand accent color (rgba). Sampled from the source mockup palette. */
  accentRgba: `rgba(${number}, ${number}, ${number}, ${number})`;
  /**
   * Live deployment URL. Present only for the shipped subdomain products
   * (shiyun / ai / ming); when set, the expanded drawer shows a "visit site" button.
   * The older side-projects are demo + inquiry only, so they leave this undefined.
   */
  visitUrl?: string;
  /**
   * Optional compliance / entertainment-only notice, rendered as a distinct boxed
   * line in the expanded drawer. Used where the framing needs an explicit legal or
   * "for-fun only" caveat (e.g. persona modeling, fortune-telling).
   */
  disclaimer?: Localized;
  /**
   * Marks a 整蛊 / prank product: renders a "整蛊" badge on the collapsed row, and the
   * whole entry is hidden when the UI is in English (the gag only lands in Chinese).
   */
  prank?: boolean;
}

// Five small side-projects ("做着玩的副业"). Each row collapses by default; on
// expand it shows a scripted demo of the deliverable, plus one click-to-zoom
// screenshot of the actual artifact (except Continuum, which is demo-only).
export const services: ServiceItem[] = [
  {
    slug: 'ai-brand-kit',
    name: 'AI Brand Kit',
    subtitle: { zh: '品牌设计 · 一键生成', en: 'Brand Design · One-Click Generate' },
    tagline: {
      zh: '参考图驱动的AI品牌设计工具:上传一张参考图(真人照或Logo),一键生成完整的品牌视觉资产包,包括Logo家族、头像、社交封面等。',
      en: 'AI-powered brand design tool driven by reference images: Upload a reference photo (portrait or logo) to generate a complete brand visual asset package, including logo family, avatars, social covers, and more.'
    },
    features: {
      zh: ['Logo家族 · 多尺寸多场景适配', '头像家族 · 动态头像 · 社交封面一键生成', 'SVG源文件 + PNG多尺寸 + ZIP打包下载'],
      en: ['Logo family · Multi-size multi-scene adaptation', 'Avatar family · Dynamic avatars · Social covers one-click generation', 'SVG source + Multi-size PNG + ZIP package download']
    },
    tags: ['SVG', '品牌设计', 'AI生成'],
    emblem: 'poetry',
    demo: 'brand-kit',
    sampleImage: null,
    accentRgba: 'rgba(94, 234, 212, 0.5)',
    visitUrl: 'https://xiaoka6688.github.io/AI-Brand-Kit-Skill/'
  },
  {
    slug: 'ip-agent',
    name: 'IP Agent',
    subtitle: { zh: '营销获客 · AI视频创作', en: 'Marketing · AI Video Creation' },
    tagline: {
      zh: '一站式AI视频创作解决方案：文案生成、音频合成、数字人口播、智能剪辑、标题封面、一键多平台发布。',
      en: 'One-stop AI video creation solution: copywriting, audio synthesis, digital human presentation, smart editing, title covers, one-click multi-platform publishing.'
    },
    features: {
      zh: ['文案生成 · 智能选题 + AI辅助创作', '数字人口播 · 多形象多音色', '一键发布 · 抖音/视频号/小红书'],
      en: ['Copywriting · Smart topic selection + AI assisted creation', 'Digital human presentation · Multiple avatars and voices', 'One-click publish · Douyin/Video Account/Xiaohongshu']
    },
    tags: ['AI视频', '营销获客', '数字人'],
    emblem: 'relay',
    demo: 'ip-agent',
    sampleImage: null,
    accentRgba: 'rgba(168, 85, 247, 0.55)',
    visitUrl: 'https://agent.pojuai.com/'
  },
  // ── Shipped subdomain products ────────────────────────────────────────────
  {
    slug: 'logo-design',
    name: 'Logo Design',
    subtitle: { zh: 'Logo设计 · 多平台适配', en: 'Logo Design · Multi-platform' },
    tagline: {
      zh: '在线Logo设计与处理平台:文字Logo生成、图标多平台适配、AI从零设计、风格重绘，一站式解决品牌标识需求。',
      en: 'Online Logo design and processing platform: text Logo generation, multi-platform icon adaptation, AI design from scratch, style redraw - one-stop solution for brand identity needs.'
    },
    features: {
      zh: ['文字Logo生成 · 免费无需API', '图标自动适配多平台尺寸', 'AI设计 + 风格重绘 · 打包下载'],
      en: ['Text Logo generation · Free no API needed', 'Auto-adapt icons for multi-platform sizes', 'AI design + Style redraw · Package download']
    },
    tags: ['Logo设计', '品牌', 'AI生成'],
    emblem: 'relay',
    demo: 'logo-design',
    sampleImage: null,
    accentRgba: 'rgba(96, 165, 250, 0.55)',
    visitUrl: 'https://logo.pojuai.com/'
  },
  {
    slug: 'ai-design',
    name: 'AI Design',
    subtitle: { zh: 'AI设计 · 创意工具', en: 'AI Design · Creative Tools' },
    tagline: {
      zh: 'AI驱动的设计工具平台：支持多种创意设计场景，提供智能化设计方案，助力创意工作者高效产出。',
      en: 'AI-driven design tool platform: Supports various creative design scenarios, provides intelligent design solutions, helping creative workers produce efficiently.'
    },
    features: {
      zh: ['AI智能设计 · 多场景支持', '创意工具 · 高效产出', '在线使用 · 无需安装'],
      en: ['AI intelligent design · Multi-scenario support', 'Creative tools · Efficient output', 'Online use · No installation needed']
    },
    tags: ['AI设计', '创意工具', '在线平台'],
    emblem: 'bazi',
    demo: 'ai-design',
    sampleImage: null,
    accentRgba: 'rgba(196, 160, 255, 0.55)',
    visitUrl: 'https://design.pojuai.com/'
  },
  {
    slug: 'pjht',
    name: '破局AI项目圈',
    subtitle: { zh: '知识付费 · 在线课程平台', en: '知识付费 · 在线课程平台' },
    tagline: { zh: '知识付费系统搭建,虚拟资源网课平台。汇集AI、短视频、电商、引流等领域的精品课程与实战教程。', en: '知识付费系统搭建,虚拟资源网课平台。汇集AI、短视频、电商、引流等领域的精品课程与实战教程。' },
    features: { zh: ['AI专区 · 短视频 · 电商 · 引流多板块课程', '会员特权 · 精品文章 · 帮助中心', '在线学习 · 虚拟资源 · 知识变现'], en: ['AI专区 · 短视频 · 电商 · 引流多板块课程', '会员特权 · 精品文章 · 帮助中心', '在线学习 · 虚拟资源 · 知识变现'] },
    tags: ['知识付费', '在线教育', 'AI创业'],
    emblem: 'pjht',
    demo: 'pjht',
    sampleImage: null,
    accentRgba: 'rgba(251, 146, 60, 0.55)',
    visitUrl: 'https://pjht.jsxf8.cn'
  },
  {
    slug: 'ai-draw',
    name: '小卡AI绘图',
    subtitle: { zh: 'AI绘图 · 国内可用', en: 'AI绘图 · 国内可用' },
    tagline: {
      zh: '国内可用的AI绘图工具，支持GPT Image 2等多种模型，简单快捷生成高质量图片。无需翻墙，支持1K-4K分辨率。',
      en: '国内可用的AI绘图工具，支持GPT Image 2等多种模型，简单快捷生成高质量图片。无需翻墙，支持1K-4K分辨率。'
    },
    features: {
      zh: ['GPT Image 2 · Nano Banana Pro 多模型支持', '多种画幅比例 · 1K到4K超清分辨率', '国内直接使用 · 无需翻墙'],
      en: ['GPT Image 2 · Nano Banana Pro 多模型支持', '多种画幅比例 · 1K到4K超清分辨率', '国内直接使用 · 无需翻墙']
    },
    tags: ['AI绘图', '图片生成', '国内可用'],
    emblem: 'poetry',
    demo: 'ai-draw',
    sampleImage: null,
    accentRgba: 'rgba(168, 85, 247, 0.55)',
    visitUrl: 'https://xiaoka6688.github.io/AI-draw/'
  },
  {
    slug: 'dreampix',
    name: 'Dreampix-AI',
    subtitle: { zh: 'AI绘图 · 提示词模板案例库', en: 'AI绘图 · 提示词模板案例库' },
    tagline: {
      zh: '基于GPT Image 2的AI绘图工具，新增提示词模板案例库，一键做同款。支持保存到个人案例库，方便后期复用。',
      en: '基于GPT Image 2的AI绘图工具，新增提示词模板案例库，一键做同款。支持保存到个人案例库，方便后期复用。'
    },
    features: {
      zh: ['提示词模板案例库 · 一键做同款', '个人案例库 · 保存复用', '持续更新 · 数字人/短视频封面模板'],
      en: ['提示词模板案例库 · 一键做同款', '个人案例库 · 保存复用', '持续更新 · 数字人/短视频封面模板']
    },
    tags: ['AI绘图', '提示词模板', '案例库'],
    emblem: 'poetry',
    demo: 'dreampix',
    sampleImage: null,
    accentRgba: 'rgba(34, 211, 238, 0.55)',
    visitUrl: 'https://dreampix.pojuai.com/'
  },
  {
    slug: 'poster-editor',
    name: '小卡海报编辑器',
    subtitle: { zh: 'Markdown海报 · 离线可用', en: 'Markdown海报 · 离线可用' },
    tagline: {
      zh: '本地优先、离线可用的Markdown文字海报生成器。把文章粘进来，秒变精致海报，支持小红书、微信等多种尺寸。',
      en: '本地优先、离线可用的Markdown文字海报生成器。把文章粘进来，秒变精致海报，支持小红书、微信等多种尺寸。'
    },
    features: {
      zh: ['6种模板尺寸 · 经典海报/小红书/微信/Twitter', 'Markdown支持 · 实时预览', '离线可用 · 无需安装'],
      en: ['6种模板尺寸 · 经典海报/小红书/微信/Twitter', 'Markdown支持 · 实时预览', '离线可用 · 无需安装']
    },
    tags: ['海报编辑器', 'Markdown', '离线工具'],
    emblem: 'archive',
    demo: 'poster-editor',
    sampleImage: null,
    accentRgba: 'rgba(52, 211, 153, 0.55)',
    visitUrl: 'https://poster.pojuai.com/'
  },
  {
    slug: 'news-trend',
    name: 'News Trend',
    subtitle: { zh: '新闻趋势 · 热点聚合', en: 'News Trend · Hot Topics' },
    tagline: {
      zh: '新闻趋势聚合平台：实时追踪热点新闻，智能分析趋势变化，一站式获取资讯动态。',
      en: 'News trend aggregation platform: Real-time tracking of hot news, intelligent analysis of trend changes, one-stop access to information.'
    },
    features: {
      zh: ['实时热点追踪 · 智能聚合', '趋势分析 · 数据可视化', '多源资讯 · 一站获取'],
      en: ['Real-time hot tracking · Smart aggregation', 'Trend analysis · Data visualization', 'Multi-source news · One-stop access']
    },
    tags: ['新闻', '趋势', '聚合平台'],
    emblem: 'relay',
    demo: 'news-trend',
    sampleImage: null,
    accentRgba: 'rgba(56, 189, 248, 0.55)',
    visitUrl: 'https://news.pojuai.com/'
  }
];

// ── Section layout ──────────────────────────────────────────────────────────
// The Services list is a two-level fold. Top level is the order the owner asked
// for: shiyun → ai → (the older chat-record suite, collapsed into one group) → ming.
// A 'group' entry expands to reveal its child rows; each child then expands to its
// own demo — hence "二级折叠" (two levels of folding).
export type ServiceEntry =
  | { kind: 'item'; slug: string }
  | {
      kind: 'group';
      id: string;
      title: Localized;
      subtitle: Localized;
      emblem: EmblemId;
      accentRgba: `rgba(${number}, ${number}, ${number}, ${number})`;
      children: string[];
    };

export const serviceLayout: ServiceEntry[] = [
  { kind: 'item', slug: 'ai-brand-kit' },
  { kind: 'item', slug: 'logo-design' },
  { kind: 'item', slug: 'ip-agent' },
  { kind: 'item', slug: 'ai-design' },
  { kind: 'item', slug: 'pjht' },
  { kind: 'item', slug: 'ai-draw' },
  { kind: 'item', slug: 'dreampix' },
  { kind: 'item', slug: 'poster-editor' },
  { kind: 'item', slug: 'news-trend' }
];

/** slug → ServiceItem, for the layout renderer to resolve entries. */
export const serviceBySlug: Record<string, ServiceItem> = Object.fromEntries(
  services.map((s) => [s.slug, s])
);
