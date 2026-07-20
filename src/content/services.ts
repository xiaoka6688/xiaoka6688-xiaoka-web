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
  | 'poster-editor';

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
    slug: 'shiyun',
    name: '诗云',
    subtitle: { zh: '诗云 · 一切可能的诗', en: '诗云 · 一切可能的诗' },
    tagline: {
      zh: '一张可飞行的三维诗歌星图:每位诗人是一团真实星,星团之间的虚空是一切可能的近体诗。点一下虚空,就用「编号↔诗」的双射当场算出一首,地址长达 82–229 位——诗不被储存,给个编号就能算出第几首。',
      en: '一张可飞行的三维诗歌星图:每位诗人是一团真实星,星团之间的虚空是一切可能的近体诗。点一下虚空,就用「编号↔诗」的双射当场算出一首,地址长达 82–229 位——诗不被储存,给个编号就能算出第几首。'
    },
    features: {
      zh: ['全朝代诗人星团 · 可飞行 / 按朝代筛选', '点虚空 unrank 出诗 + 完整长编号', '赠诗网络 4,849 弧 · 逐句搜索 / 编号反查'],
      en: ['全朝代诗人星团 · 可飞行 / 按朝代筛选', '点虚空 unrank 出诗 + 完整长编号', '赠诗网络 4,849 弧 · 逐句搜索 / 编号反查']
    },
    tags: ['three.js', 'WebGL', '生成式'],
    emblem: 'poetry',
    demo: 'poetry',
    sampleImage: '/services/shiyun.jpg',
    accentRgba: 'rgba(94, 234, 212, 0.5)',
    visitUrl: 'https://shiyun.cohenjikan.com'
  },
  {
    slug: 'echo',
    name: '回声',
    subtitle: { zh: '朋友圈 · 点赞评论报表', en: '朋友圈 · 点赞评论报表' },
    tagline: {
      zh: '把一年的朋友圈翻译成可量化的报表 —— 点赞、评论、真爱粉榜、活跃时段,一份图说清。',
      en: '把一年的朋友圈翻译成可量化的报表 —— 点赞、评论、真爱粉榜、活跃时段,一份图说清。'
    },
    features: {
      zh: ['点赞 / 评论 / 互动总览', '真爱粉 TOP 榜', '高光时刻自动标注'],
      en: ['点赞 / 评论 / 互动总览', '真爱粉 TOP 榜', '高光时刻自动标注']
    },
    tags: ['数据分析', '微信', '可视化'],
    emblem: 'echo',
    demo: 'echo',
    // 北极星指标 dashboard (732 作品 / 8005 点赞 / 4525 评论 / 326 真爱粉)
    sampleImage: '/services/echo.png',
    accentRgba: 'rgba(167, 139, 250, 0.55)'
  },
  {
    slug: 'chronicle',
    name: '时光长河',
    subtitle: { zh: '时光长河 · 年度对话报告', en: '时光长河 · 年度对话报告' },
    tagline: {
      zh: '一整年 QQ / 微信对话浓缩成一份叙事报告:话量曲线、关键节点、AI 提炼的故事弧线,可定制恋爱版。',
      en: '一整年 QQ / 微信对话浓缩成一份叙事报告:话量曲线、关键节点、AI 提炼的故事弧线,可定制恋爱版。'
    },
    features: {
      zh: ['话量时间线 + 峰值标注', '反复出现的微小回应聚类(哈/嗯/没事/喜欢)', '恋爱报告 · 两人专属版'],
      en: ['话量时间线 + 峰值标注', '反复出现的微小回应聚类(哈/嗯/没事/喜欢)', '恋爱报告 · 两人专属版']
    },
    tags: ['AI分析', '年度报告', '叙事'],
    emblem: 'chronicle',
    demo: 'chronicle',
    sampleImage: '/services/chronicle.png',
    accentRgba: 'rgba(245, 200, 110, 0.55)'
  },
  {
    slug: 'fortune',
    name: '气运曲线',
    subtitle: { zh: '气运曲线 · 星盘财运', en: '气运曲线 · 星盘财运' },
    tagline: {
      zh: '八字 + 星盘 + 行运推演,把命理翻译成可读的曲线模型。年度气运、第二宫财运 K 线、关键转折提醒。',
      en: '八字 + 星盘 + 行运推演,把命理翻译成可读的曲线模型。年度气运、第二宫财运 K 线、关键转折提醒。'
    },
    features: {
      zh: ['行运相位强度模型', '财富潮汐 · 年度 K 线', '转折点预警 & 建议'],
      en: ['行运相位强度模型', '财富潮汐 · 年度 K 线', '转折点预警 & 建议']
    },
    tags: ['星盘', '八字', '预测'],
    emblem: 'fortune',
    demo: 'fortune',
    sampleImage: '/services/fortune.png',
    accentRgba: 'rgba(125, 211, 252, 0.55)'
  },
  {
    slug: 'continuum',
    name: '人格延续',
    subtitle: { zh: '人格模型 · 亲友留存', en: '人格模型 · 亲友留存' },
    tagline: {
      zh: '用一个人全部的对话与朋友圈,在本地训练出贴近其语气、用词与说话节奏的人格模型,并可接入微信。留住一位亲人、挚友或爱人「说话的样子」—— 全程数据不出本机。',
      en: '用一个人全部的对话与朋友圈,在本地训练出贴近其语气、用词与说话节奏的人格模型,并可接入微信。留住一位亲人、挚友或爱人「说话的样子」—— 全程数据不出本机。'
    },
    features: {
      zh: ['本地训练 · 数据不出机', '可接入微信 / 也可纯离线使用', '留住亲人 · 挚友 · 爱人的语气'],
      en: ['本地训练 · 数据不出机', '可接入微信 / 也可纯离线使用', '留住亲人 · 挚友 · 爱人的语气']
    },
    tags: ['大语言模型', '本地运行', '纪念'],
    emblem: 'continuum',
    demo: 'continuum',
    sampleImage: null, // no public artifact — the demo is the deliverable preview
    accentRgba: 'rgba(167, 139, 250, 0.65)',
    disclaimer: {
      zh: '声明:仅限使用本人,或经当事人 / 直系亲属明确授权的数据;请遵守《个人信息保护法》等当地法律法规及相应平台条款,严禁未经同意采集或冒用他人身份。',
      en: '声明:仅限使用本人,或经当事人 / 直系亲属明确授权的数据;请遵守《个人信息保护法》等当地法律法规及相应平台条款,严禁未经同意采集或冒用他人身份。'
    }
  },
  {
    slug: 'archive',
    name: '全文档案',
    subtitle: { zh: '全文档案 · 留存留档', en: '全文档案 · 留存留档' },
    tagline: {
      zh: '把 QQ / 微信全量聊天记录、朋友圈、点赞评论原样导出归档。本地加密保存,全文检索。多年后想找某句话,搜一下就在。',
      en: '把 QQ / 微信全量聊天记录、朋友圈、点赞评论原样导出归档。本地加密保存,全文检索。多年后想找某句话,搜一下就在。'
    },
    features: {
      zh: ['全量原样导出', '本地加密 + PIN 锁', '全文检索 · 按时间漫游'],
      en: ['全量原样导出', '本地加密 + PIN 锁', '全文检索 · 按时间漫游']
    },
    tags: ['存档', '加密', '搜索'],
    emblem: 'archive',
    demo: 'archive',
    sampleImage: '/services/archive.png',
    accentRgba: 'rgba(232, 200, 170, 0.55)'
  },
  // ── Shipped subdomain products (ai / ming / for) ──────────────────────────
  {
    slug: 'ai',
    name: 'AI中转',
    subtitle: { zh: 'API 中转 · 多模型聚合', en: 'API 中转 · 多模型聚合' },
    tagline: {
      zh: '把 Claude / ChatGPT / DeepSeek 聚合到一个自用接口的中转层:统一密钥、统一调用,按个人需求私下配置 —— 个人自用,不对外分发、不公开转售。',
      en: '把 Claude / ChatGPT / DeepSeek 聚合到一个自用接口的中转层:统一密钥、统一调用,按个人需求私下配置 —— 个人自用,不对外分发、不公开转售。'
    },
    features: {
      zh: ['Claude · ChatGPT · DeepSeek 一站聚合', '统一密钥 · 个人自用配置', '私下接入 · 不公开分发'],
      en: ['Claude · ChatGPT · DeepSeek 一站聚合', '统一密钥 · 个人自用配置', '私下接入 · 不公开分发']
    },
    tags: ['API网关', '多模型', '个人'],
    emblem: 'relay',
    demo: 'relay',
    sampleImage: null, // live site replaces the static sample
    accentRgba: 'rgba(96, 165, 250, 0.55)',
    visitUrl: 'https://ai.cohenjikan.com'
  },
  {
    slug: 'ming',
    name: '命理推演',
    subtitle: { zh: '自动算命 · 命理推演', en: '自动算命 · 命理推演' },
    tagline: {
      zh: '自动算命的命理学网站:融合生辰八字、五行、八卦、星盘、星座与塔罗牌,一次输入生成完整命理画像。',
      en: '自动算命的命理学网站:融合生辰八字、五行、八卦、星盘、星座与塔罗牌,一次输入生成完整命理画像。'
    },
    features: {
      zh: ['生辰八字 · 五行 · 八卦排盘', '星盘 / 星座 / 塔罗牌综合', '一次输入 · 全自动出报告'],
      en: ['生辰八字 · 五行 · 八卦排盘', '星盘 / 星座 / 塔罗牌综合', '一次输入 · 全自动出报告']
    },
    tags: ['八字', '星盘', '塔罗'],
    emblem: 'bazi',
    demo: 'bazi',
    sampleImage: null,
    accentRgba: 'rgba(196, 160, 255, 0.55)',
    visitUrl: 'https://ming.cohenjikan.com',
    disclaimer: {
      zh: '声明:本站命理 / 塔罗内容仅供娱乐与文化体验,不构成任何决策依据。请崇尚科学、相信努力,自觉抵制封建迷信,并遵守当地法律法规。',
      en: '声明:本站命理 / 塔罗内容仅供娱乐与文化体验,不构成任何决策依据。请崇尚科学、相信努力,自觉抵制封建迷信,并遵守当地法律法规。'
    }
  },
  {
    slug: 'pjht',
    name: '破局AI创业',
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
  { kind: 'item', slug: 'shiyun' },
  { kind: 'item', slug: 'ai' },
  {
    kind: 'group',
    id: 'chat-suite',
    title: { zh: '聊天记录系列', en: '聊天记录系列' },
    subtitle: { zh: 'QQ · 微信 · 朋友圈 · 既有副业', en: 'QQ · 微信 · 朋友圈 · 既有副业' },
    emblem: 'suite',
    accentRgba: 'rgba(167, 139, 250, 0.5)',
    children: ['echo', 'chronicle', 'fortune', 'continuum', 'archive']
  },
  { kind: 'item', slug: 'ming' },
  { kind: 'item', slug: 'pjht' },
  { kind: 'item', slug: 'ai-draw' },
  { kind: 'item', slug: 'dreampix' },
  { kind: 'item', slug: 'poster-editor' }
];

/** slug → ServiceItem, for the layout renderer to resolve entries. */
export const serviceBySlug: Record<string, ServiceItem> = Object.fromEntries(
  services.map((s) => [s.slug, s])
);
