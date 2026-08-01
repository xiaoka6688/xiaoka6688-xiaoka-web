export type Locale = 'zh' | 'en';

export interface Localized {
  zh: string;
  en: string;
}

export interface ProjectFeature {
  title: Localized;
  description: Localized;
  /** Path under /public, e.g. /projects/sync-station/feature-1.jpg. Falls back to placeholder when missing. */
  image: string;
}

/** A single source repo. Projects that bundle more than one repo (e.g. the game
 *  trainers) use `repos` instead of `githubUrl` to render one link button each. */
export interface RepoLink {
  label: Localized;
  url: string;
}

export interface ProjectDetail {
  slug: string;
  name: string;
  tagline: Localized;
  description: Localized;
  tags: string[];
  /** Single-repo projects set this; multi-repo projects use `repos` instead. */
  githubUrl?: string;
  /** Multiple source repos, each rendered as its own link button on the detail page. */
  repos?: RepoLink[];
  liveUrl?: string;
  heroImage: string;
  features: ProjectFeature[];
  techStack: string[];
}

export const projects: ProjectDetail[] = [
  {
    slug: 'ai-brand-kit',
    name: 'AI Brand Kit',
    tagline: {
      zh: '参考图驱动的AI品牌设计工具:上传一张参考图,一键生成完整的品牌视觉资产包。',
      en: 'AI-powered brand design tool driven by reference images: Upload a reference image to generate a complete brand visual asset package.'
    },
    description: {
      zh: 'AI Brand Kit是一个WorkBuddy技能，实现参考图驱动的品牌设计流程。用户只需提供一张参考图（如真人照或Logo截图），即可生成一套统一的品牌视觉资产，包括Logo家族、真人头像家族、动态头像、组合锁、社交封面及网页资产。输出SVG源文件、多尺寸PNG、单页应用展示页、ZIP包及使用规范，适合快速搭建个人或品牌视觉体系。',
      en: 'AI Brand Kit is a WorkBuddy skill that implements an image-driven brand design workflow. Users only need to provide a reference image (such as a portrait or logo screenshot) to generate a unified set of brand visual assets, including logo family, portrait avatar family, dynamic avatars, combo locks, social covers, and web assets. Outputs SVG source files, multi-size PNGs, single-page application showcase, ZIP packages, and usage guidelines - perfect for quickly building personal or brand visual systems.'
    },
    tags: ['SVG', '品牌设计', 'AI生成', 'WorkBuddy'],
    githubUrl: 'https://github.com/xiaoka6688/AI-Brand-Kit-Skill',
    liveUrl: 'https://xiaoka6688.github.io/AI-Brand-Kit-Skill/',
    heroImage: '/projects/ai-brand-kit/hero.png',
    features: [
      {
        title: { zh: 'Logo家族生成', en: 'Logo Family Generation' },
        description: {
          zh: '从参考图提取设计语言，自动生成适配不同场景的Logo变体家族，包括主Logo、图标、水印等多种形态。',
          en: 'Extract design language from reference images and automatically generate Logo variant families adapted to different scenarios, including main logos, icons, watermarks, and more.'
        },
        image: '/projects/ai-brand-kit/feature-1.png'
      },
      {
        title: { zh: '头像与社交封面', en: 'Avatars & Social Covers' },
        description: {
          zh: '一键生成真人头像家族、动态头像，以及适配各社交平台的封面图，保持品牌视觉一致性。',
          en: 'One-click generation of portrait avatar families, dynamic avatars, and cover images adapted to various social platforms, maintaining brand visual consistency.'
        },
        image: '/projects/ai-brand-kit/feature-2.png'
      },
      {
        title: { zh: '多格式资产输出', en: 'Multi-format Asset Output' },
        description: {
          zh: '输出SVG源文件确保无限缩放，同时提供多尺寸PNG、单页应用展示页和ZIP打包下载。',
          en: 'Outputs SVG source files for infinite scaling, while providing multi-size PNGs, single-page application showcase, and ZIP package downloads.'
        },
        image: '/projects/ai-brand-kit/feature-3.png'
      },
      {
        title: { zh: '品牌规范文档', en: 'Brand Guidelines' },
        description: {
          zh: '自动生成品牌使用规范文档，包含色彩体系、字体搭配、Logo使用规则等，方便团队协作。',
          en: 'Automatically generates brand usage guidelines documents, including color systems, font pairings, logo usage rules, etc., for easy team collaboration.'
        },
        image: '/projects/ai-brand-kit/feature-4.png'
      }
    ],
    techStack: ['SVG', 'HTML', 'CSS', 'JavaScript', 'WorkBuddy']
  },
  {
    slug: 'logo-design',
    name: 'Logo Design',
    tagline: {
      zh: '在线Logo设计与处理平台:文字Logo生成、图标多平台适配、AI设计、风格重绘。',
      en: 'Online Logo design and processing platform: text Logo generation, multi-platform icon adaptation, AI design, style redraw.'
    },
    description: {
      zh: 'Logo Design是一个集成了多种工具的在线标志设计与处理平台。支持文字Logo生成（免费无需API）、图标自动适配多平台尺寸、AI从零设计Logo（需API）、风格重绘等功能。提供丰富的可定制选项，包括颜色、字号、圆角、字间距等，支持预览、平台适配和切图，最终打包下载。具备历史记录管理功能，方便用户回顾和管理已生成的设计。',
      en: 'Logo Design is an integrated online logo design and processing platform. Supports text Logo generation (free, no API needed), auto-adapt icons for multi-platform sizes, AI design from scratch (API required), style redraw, and more. Offers rich customization options including colors, font size, rounded corners, letter spacing, etc. Supports preview, platform adaptation, and slicing, with final package download. Includes history management for easy review and management of generated designs.'
    },
    tags: ['Logo设计', '品牌', 'AI生成', '在线工具'],
    githubUrl: 'https://github.com/xiaoka6688/Logo-Design',
    liveUrl: 'https://logo.pojuai.com/',
    heroImage: '/projects/logo-design/hero.png',
    features: [
      {
        title: { zh: '文字Logo生成', en: 'Text Logo Generation' },
        description: {
          zh: '输入品牌名，自定义背景色、字号等参数，即时生成文字Logo。免费功能，无需API支持。',
          en: 'Enter brand name, customize background color, font size and other parameters to instantly generate text Logo. Free feature, no API needed.'
        },
        image: '/projects/logo-design/feature-1.png'
      },
      {
        title: { zh: '图标多平台适配', en: 'Multi-platform Icon Adaptation' },
        description: {
          zh: '上传已有Logo图片，系统自动为不同设备和平台生成合适尺寸的图标，保持视觉一致性。',
          en: 'Upload existing Logo images, the system automatically generates appropriately sized icons for different devices and platforms, maintaining visual consistency.'
        },
        image: '/projects/logo-design/feature-2.png'
      },
      {
        title: { zh: 'AI从零设计', en: 'AI Design from Scratch' },
        description: {
          zh: '通过描述品牌和风格，AI从零设计Logo。需要API支持，可生成独特的品牌标识。',
          en: 'Describe brand and style, AI designs Logo from scratch. Requires API support, can generate unique brand identities.'
        },
        image: '/projects/logo-design/feature-3.png'
      },
      {
        title: { zh: '风格重绘', en: 'Style Redraw' },
        description: {
          zh: '上传参考图，AI将其重绘为新的风格。支持多种风格转换，满足不同设计需求。',
          en: 'Upload reference images, AI redraws them in new styles. Supports multiple style conversions to meet different design needs.'
        },
        image: '/projects/logo-design/feature-4.png'
      }
    ],
    techStack: ['HTML', 'JavaScript', 'CSS', 'Canvas', 'API']
  },
  {
    slug: 'ip-agent',
    name: 'IP Agent',
    tagline: {
      zh: '一站式AI视频创作解决方案：文案生成、数字人口播、智能剪辑、一键多平台发布。',
      en: 'One-stop AI video creation solution: copywriting, digital human presentation, smart editing, one-click multi-platform publishing.'
    },
    description: {
      zh: 'IP Agent（营销获客智能体）是一个面向营销获客场景的一站式AI视频创作平台。提供六大核心功能：文案生成（智能选题+AI辅助）、音频生成（多音色+情感调节）、数字人口播（多形象）、智能剪辑（画中画+特效字幕+背景音乐）、标题封面（AI生成）、一键发布（抖音/视频号/小红书等）。支持微信小程序、Windows、macOS等多平台使用，零门槛上手。',
      en: 'IP Agent (Marketing Customer Acquisition Agent) is a one-stop AI video creation platform for marketing scenarios. Offers six core functions: copywriting (smart topic selection + AI assisted), audio generation (multiple voices + emotion adjustment), digital human presentation (multiple avatars), smart editing (PiP + subtitle effects + background music), title covers (AI generated), one-click publish (Douyin/Video Account/Xiaohongshu etc.). Supports WeChat Mini Program, Windows, macOS and more platforms, zero threshold to start.'
    },
    tags: ['AI视频', '营销获客', '数字人', '多平台'],
    githubUrl: 'https://github.com/xiaoka6688/IP-Agent',
    liveUrl: 'https://agent.pojuai.com/',
    heroImage: '/projects/ip-agent/hero.png',
    features: [
      {
        title: { zh: '文案生成', en: 'Copywriting Generation' },
        description: {
          zh: '支持智能选题、自定义选题和自定义提示词三种模式，AI自动生成高质量视频文案。',
          en: 'Supports smart topic selection, custom topics, and custom prompts three modes, AI automatically generates high-quality video copy.'
        },
        image: '/projects/ip-agent/feature-1.png'
      },
      {
        title: { zh: '数字人口播', en: 'Digital Human Presentation' },
        description: {
          zh: '提供数字人形象库，自动生成专业口播视频，支持多形象多音色选择。',
          en: 'Provides digital human avatar library, automatically generates professional presentation videos, supports multiple avatars and voice options.'
        },
        image: '/projects/ip-agent/feature-2.png'
      },
      {
        title: { zh: '智能剪辑', en: 'Smart Editing' },
        description: {
          zh: '自动添加画中画素材、特效字幕和背景音乐，一键丰富视频内容。',
          en: 'Automatically adds PiP materials, subtitle effects, and background music to enrich video content with one click.'
        },
        image: '/projects/ip-agent/feature-3.png'
      },
      {
        title: { zh: '一键发布', en: 'One-Click Publish' },
        description: {
          zh: '支持同时或单独将视频发布到抖音、视频号、小红书等多个平台。',
          en: 'Supports simultaneous or individual video publishing to Douyin, Video Account, Xiaohongshu and other platforms.'
        },
        image: '/projects/ip-agent/feature-4.png'
      }
    ],
    techStack: ['HTML', 'CSS', 'JavaScript', 'AI', '小程序']
  },
  {
    slug: 'ai-design',
    name: 'AI Design',
    tagline: {
      zh: 'Claude Design 的开源替代方案：AI驱动的设计工具平台，支持网站复刻、原型设计、幻灯片等多种创意场景。',
      en: 'Open source alternative to Claude Design: AI-driven design tool platform, supports website cloning, prototyping, slides and more creative scenarios.'
    },
    description: {
      zh: 'AI Design 是 Claude Design 的开源替代方案，是一个AI驱动的设计工具平台。支持多种创意设计场景：网站复刻、幻灯片、原型、线框图、移动应用、文档、动态图形、WebGL体验、实时看板、图片、视频、音频等。可创建和应用设计系统，支持本地CLI和在线使用。',
      en: 'AI Design is an open source alternative to Claude Design, an AI-driven design tool platform. Supports multiple creative design scenarios: website cloning, slides, prototypes, wireframes, mobile apps, documents, motion graphics, WebGL experiences, real-time dashboards, images, videos, audio and more. Create and apply design systems, supports local CLI and online use.'
    },
    tags: ['AI设计', '开源', '设计系统', '多场景'],
    githubUrl: 'https://github.com/xiaoka6688/ai-design',
    liveUrl: 'https://design.pojuai.com/',
    heroImage: '/projects/ai-design/hero.png',
    features: [
      {
        title: { zh: '网站复刻与原型设计', en: 'Website Cloning & Prototyping' },
        description: {
          zh: '支持按源码证据复刻网站，构建高保真可点击网页原型，快速验证设计想法。',
          en: 'Supports website cloning based on source code evidence, builds high-fidelity clickable web prototypes to quickly validate design ideas.'
        },
        image: '/projects/ai-design/feature-1.png'
      },
      {
        title: { zh: '多类型内容创作', en: 'Multi-type Content Creation' },
        description: {
          zh: '支持幻灯片、文档、图片、视频、音频等多种内容类型，一站式满足创意需求。',
          en: 'Supports slides, documents, images, videos, audio and more content types, one-stop creative solution.'
        },
        image: '/projects/ai-design/feature-2.png'
      },
      {
        title: { zh: '设计系统与自动化', en: 'Design System & Automation' },
        description: {
          zh: '可从网站提取品牌设计系统，在任意对话中应用，支持自动化工作流。',
          en: 'Extract brand design systems from websites, apply in any conversation, support automation workflows.'
        },
        image: '/projects/ai-design/feature-3.png'
      }
    ],
    techStack: ['HTML', 'JavaScript', 'CSS', 'AI', 'CLI', 'MCP']
  },
  {
    slug: 'news-trend',
    name: 'News Trend',
    tagline: {
      zh: '新闻趋势聚合平台：实时追踪热点新闻，智能分析趋势变化，一站式获取资讯动态。',
      en: 'News trend aggregation platform: Real-time tracking of hot news, intelligent analysis of trend changes, one-stop access to information.'
    },
    description: {
      zh: 'News Trend 是一个新闻趋势聚合平台，实时追踪热点新闻，智能分析趋势变化，帮助用户一站式获取资讯动态。支持多源新闻聚合、趋势数据可视化、热点话题追踪等功能。',
      en: 'News Trend is a news trend aggregation platform that tracks hot news in real-time, intelligently analyzes trend changes, and helps users access information in one stop. Supports multi-source news aggregation, trend data visualization, hot topic tracking and more.'
    },
    tags: ['新闻', '趋势', '聚合平台', '数据可视化'],
    githubUrl: 'https://github.com/xiaoka6688/news-trend',
    liveUrl: 'https://news.pojuai.com/',
    heroImage: '/projects/news-trend/hero.png',
    features: [
      {
        title: { zh: '实时热点追踪', en: 'Real-time Hot Tracking' },
        description: {
          zh: '实时追踪各大平台热点新闻，智能聚合多源资讯，第一时间掌握热点动态。',
          en: 'Real-time tracking of hot news from major platforms, intelligently aggregating multi-source information.'
        },
        image: '/projects/news-trend/feature-1.png'
      },
      {
        title: { zh: '趋势数据分析', en: 'Trend Data Analysis' },
        description: {
          zh: '智能分析新闻趋势变化，提供数据可视化展示，洞察热点发展方向。',
          en: 'Intelligently analyze news trend changes, provide data visualization, insight into hot topic development.'
        },
        image: '/projects/news-trend/feature-2.png'
      },
      {
        title: { zh: '一站式资讯', en: 'One-stop Information' },
        description: {
          zh: '整合多平台新闻源，一站式获取全网资讯，无需切换多个平台。',
          en: 'Integrate multi-platform news sources, one-stop access to all network information.'
        },
        image: '/projects/news-trend/feature-3.png'
      }
    ],
    techStack: ['HTML', 'JavaScript', 'CSS', 'API', '数据可视化']
  },
  {
    slug: 'musebox',
    name: 'MuseBox',
    tagline: {
      zh: '面向创作者的桌面音乐工作台：本地全格式播放、3D视觉舞台、歌词同步、AI视觉与音乐生成。',
      en: 'Desktop music workstation for creators: local full-format playback, 3D visual stage, lyric sync, AI visual and music generation.'
    },
    description: {
      zh: 'MuseBox 是一个面向创作者的桌面音乐工作台。支持 MP3/FLAC/WAV/OGG/M4A 全格式本地播放，集成 Three.js + GSAP 顶级 3D 视觉舞台系统，支持 LRC/TXT 歌词、同步翻译和桌面歌词。正在开发 AI 视觉生成（专辑封面、动态壁纸、可视化动效）和 AI 音乐生成（集成 Suno/Replicate/OpenAI/即梦），所有 AI Provider 支持用户自行配置 API。',
      en: 'MuseBox is a desktop music workstation for creators. Supports MP3/FLAC/WAV/OGG/M4A full-format local playback, integrates Three.js + GSAP top-tier 3D visual stage system, supports LRC/TXT lyrics, synced translations and desktop lyrics. Developing AI visual generation (album covers, dynamic wallpapers, visualization effects) and AI music generation (integrating Suno/Replicate/OpenAI/Jimeng), all AI Providers support user-configured APIs.'
    },
    tags: ['音乐播放器', '3D视觉', 'AI音乐', '桌面应用'],
    githubUrl: 'https://github.com/xiaoka6688/MuseBox',
    heroImage: '/projects/musebox/hero.png',
    features: [
      {
        title: { zh: '本地音乐播放', en: 'Local Music Playback' },
        description: {
          zh: '支持 MP3 / FLAC / WAV / OGG / M4A 全格式本地播放，无需上传，隐私安全。',
          en: 'Supports MP3 / FLAC / WAV / OGG / M4A full-format local playback, no upload needed, privacy secure.'
        },
        image: '/projects/musebox/feature-1.jpg'
      },
      {
        title: { zh: '3D 视觉舞台', en: '3D Visual Stage' },
        description: {
          zh: 'Three.js + GSAP 顶级视觉系统，沉浸式 3D 音乐可视化体验。',
          en: 'Three.js + GSAP top-tier visual system, immersive 3D music visualization experience.'
        },
        image: '/projects/musebox/feature-2.jpg'
      },
      {
        title: { zh: '歌词舞台', en: 'Lyrics Stage' },
        description: {
          zh: '支持 LRC / TXT 歌词、同步翻译、桌面歌词，全方位歌词展示体验。',
          en: 'Supports LRC / TXT lyrics, synced translations, desktop lyrics, comprehensive lyrics display experience.'
        },
        image: '/projects/musebox/feature-3.jpg'
      },
      {
        title: { zh: 'AI 视觉与音乐生成', en: 'AI Visual & Music Generation' },
        description: {
          zh: '集成专辑封面、动态壁纸生成，支持 Suno/Replicate/OpenAI/即梦 AI 音乐生成，用户自配 API。',
          en: 'Integrates album cover and dynamic wallpaper generation, supports Suno/Replicate/OpenAI/Jimeng AI music generation, user-configured APIs.'
        },
        image: '/projects/musebox/feature-4.jpg'
      }
    ],
    techStack: ['TypeScript', 'Three.js', 'GSAP', 'Tauri', 'React']
  },
  {
    slug: 'douyin-toolkit',
    name: '抖音运营工具箱',
    tagline: {
      zh: '本地批量转写、抖音链接提取、AI分析、私有知识库、创作Agent一体化桌面工具。',
      en: '本地批量转写、抖音链接提取、AI分析、私有知识库、创作Agent一体化桌面工具。'
    },
    description: {
      zh: '抖音运营工具箱是一个面向抖音内容创作场景的Windows桌面工具，核心目标是把"素材采集→文案提取→AI分析→知识库增强→Agent生成内容"串成一条本地化工作流。基于Tauri 2 + React + Rust构建，支持本地ASR语音转写，AI能力支持豆包、OpenAI、DeepSeek、LM Studio，内置10个创作Skill，覆盖脚本生成、热点选题、去AI味、复盘优化等场景。',
      en: '抖音运营工具箱是一个面向抖音内容创作场景的Windows桌面工具，核心目标是把"素材采集→文案提取→AI分析→知识库增强→Agent生成内容"串成一条本地化工作流。基于Tauri 2 + React + Rust构建，支持本地ASR语音转写，AI能力支持豆包、OpenAI、DeepSeek、LM Studio，内置10个创作Skill，覆盖脚本生成、热点选题、去AI味、复盘优化等场景。'
    },
    tags: ['Tauri', 'React', 'Rust', 'AI Agent'],
    githubUrl: 'https://github.com/xiaoka6688/douyin-creator-toolkit-tauri',
    heroImage: '/projects/douyin-toolkit/hero.png',
    features: [
      {
        title: { zh: '视频文案本地批量提取', en: '视频文案本地批量提取' },
        description: {
          zh: '支持批量导入本地视频，单次最多50个，提取视频文案并导出，基于本地ASR语音转写。',
          en: '支持批量导入本地视频，单次最多50个，提取视频文案并导出，基于本地ASR语音转写。'
        },
        image: '/projects/douyin-toolkit/feature-1.png'
      },
      {
        title: { zh: '抖音链接文案批量提取', en: '抖音链接文案批量提取' },
        description: {
          zh: '粘贴抖音分享链接，自动解析标题、作者、统计信息和视频文案，支持批量操作。',
          en: '粘贴抖音分享链接，自动解析标题、作者、统计信息和视频文案，支持批量操作。'
        },
        image: '/projects/douyin-toolkit/feature-2.png'
      },
      {
        title: { zh: '视频无水印批量下载', en: '视频无水印批量下载' },
        description: {
          zh: '针对抖音链接批量下载无水印视频，提供下载进度与失败重试功能。',
          en: '针对抖音链接批量下载无水印视频，提供下载进度与失败重试功能。'
        },
        image: '/projects/douyin-toolkit/feature-3.png'
      },
      {
        title: { zh: 'Agent智能体创作', en: 'Agent智能体创作' },
        description: {
          zh: '内置10个创作Skill，支持智能体调用，覆盖脚本生成、热点选题、去AI味、复盘优化等场景。',
          en: '内置10个创作Skill，支持智能体调用，覆盖脚本生成、热点选题、去AI味、复盘优化等场景。'
        },
        image: '/projects/douyin-toolkit/feature-4.png'
      }
    ],
    techStack: ['Tauri 2', 'React 19', 'Rust', 'TypeScript', 'SQLite']
  },
  {
    slug: 'pjht',
    name: '破局AI项目圈',
    tagline: {
      zh: '知识付费系统搭建，虚拟资源网课平台。汇集AI、短视频、电商、引流等领域的精品课程与实战教程。',
      en: '知识付费系统搭建，虚拟资源网课平台。汇集AI、短视频、电商、引流等领域的精品课程与实战教程。'
    },
    description: {
      zh: '破局AI项目圈是一个知识付费与虚拟资源网课平台，专注于为创业者和个人提供AI、短视频、电商运营、爆粉引流等领域的系统化课程。',
      en: '破局AI项目圈是一个知识付费与虚拟资源网课平台，专注于为创业者和个人提供AI、短视频、电商运营、爆粉引流等领域的系统化课程。'
    },
    tags: ['知识付费', '在线教育', 'AI创业', '电商'],
    liveUrl: 'https://pjht.jsxf8.cn',
    heroImage: '/projects/pjht/hero.png',
    features: [
      {
        title: { zh: '课程分类导航', en: '课程分类导航' },
        description: { zh: '涵盖AI专区、短视频、精品课程、赚钱项目、爆粉引流、电商专区等多个板块，满足不同创业需求。', en: '涵盖AI专区、短视频、精品课程、赚钱项目、爆粉引流、电商专区等多个板块，满足不同创业需求。' },
        image: '/projects/pjht/feature-1.png'
      },
      {
        title: { zh: '热门课程推荐', en: '热门课程推荐' },
        description: { zh: '精选最新热门课程，涵盖AI摄影、短视频制作、电商运营等前沿领域，会员专享优惠价格。', en: '精选最新热门课程，涵盖AI摄影、短视频制作、电商运营等前沿领域，会员专享优惠价格。' },
        image: '/projects/pjht/feature-2.png'
      },
      {
        title: { zh: '课程详情展示', en: '课程详情展示' },
        description: { zh: '每门课程配有详细描述、价格信息和领取人数，帮助用户快速选择适合自己的课程。', en: '每门课程配有详细描述、价格信息和领取人数，帮助用户快速选择适合自己的课程。' },
        image: '/projects/pjht/feature-3.png'
      },
      {
        title: { zh: '精选文章内容', en: '精选文章内容' },
        description: { zh: '提供创业干货、赚钱思维、商业认知等精选文章，助力用户提升创业认知和实战能力。', en: '提供创业干货、赚钱思维、商业认知等精选文章，助力用户提升创业认知和实战能力。' },
        image: '/projects/pjht/feature-4.png'
      }
    ],
    techStack: ['PHP', 'MySQL', 'Vue.js', 'Node.js']
  },
  {
    slug: 'ai-draw',
    name: '小卡AI绘图',
    tagline: {
      zh: '国内可用的AI绘图工具，支持GPT Image 2等多种模型，简单快捷生成高质量图片。',
      en: '国内可用的AI绘图工具，支持GPT Image 2等多种模型，简单快捷生成高质量图片。'
    },
    description: {
      zh: '小卡AI绘图是一个国内可直接使用的AI绘图工具，支持GPT Image 2和Nano Banana Pro等多种AI模型。用户只需输入创意描述，即可生成1K到4K超清分辨率的图片。支持多种画幅比例（1:1、16:9、9:16等），还可上传参考图片进行编辑。操作简单，无需翻墙，是国内用户使用AI绘图的理想选择。',
      en: '小卡AI绘图是一个国内可直接使用的AI绘图工具，支持GPT Image 2和Nano Banana Pro等多种AI模型。用户只需输入创意描述，即可生成1K到4K超清分辨率的图片。支持多种画幅比例（1:1、16:9、9:16等），还可上传参考图片进行编辑。操作简单，无需翻墙，是国内用户使用AI绘图的理想选择。'
    },
    tags: ['AI绘图', '图片生成', 'GPT', '国内可用'],
    liveUrl: 'https://xiaoka6688.github.io/AI-draw/',
    heroImage: '/projects/ai-draw/hero.png',
    features: [
      {
        title: { zh: '一键出图', en: '一键出图' },
        description: { zh: '输入创意描述，一键生成海报、封面等专业图片，操作简单快捷。', en: '输入创意描述，一键生成海报、封面等专业图片，操作简单快捷。' },
        image: '/projects/ai-draw/feature-1.jpg'
      },
      {
        title: { zh: '多风格海报生成', en: '多风格海报生成' },
        description: { zh: '支持古风、现代、卡通等多种风格的海报生成，满足不同场景需求。', en: '支持古风、现代、卡通等多种风格的海报生成，满足不同场景需求。' },
        image: '/projects/ai-draw/feature-2.jpg'
      },
      {
        title: { zh: '高清作品输出', en: '高清作品输出' },
        description: { zh: '支持1K到4K超清分辨率，作品质量专业，满足商业用途需求。', en: '支持1K到4K超清分辨率，作品质量专业，满足商业用途需求。' },
        image: '/projects/ai-draw/feature-3.jpg'
      },
      {
        title: { zh: '多场景应用', en: '多场景应用' },
        description: { zh: '适用于社交媒体封面、产品展示、营销海报等多种场景，提升内容吸引力。', en: '适用于社交媒体封面、产品展示、营销海报等多种场景，提升内容吸引力。' },
        image: '/projects/ai-draw/feature-4.png'
      }
    ],
    techStack: ['HTML', 'JavaScript', 'CSS', 'API']
  },
  {
    slug: 'dreampix',
    name: 'Dreampix-AI',
    tagline: {
      zh: '基于GPT Image 2的AI绘图工具，包含161+真实可复用提示词案例库。',
      en: '基于GPT Image 2的AI绘图工具，包含161+真实可复用提示词案例库。'
    },
    description: {
      zh: 'Dreampix-AI是一个基于GPT Image 2的AI绘图工具，最大的特色是包含161+真实可复用的提示词案例库。案例涵盖学术配图、素材资产、头像人设、品牌包装、图像编辑、网格拼贴、信息图、地图、人物视觉、海报营销、产品视觉、氛围插画、视觉文档、叙事序列、技术图示、字体版式、界面样机等17+分类。支持历史记录管理和批量下载功能。',
      en: 'Dreampix-AI是一个基于GPT Image 2的AI绘图工具，最大的特色是包含161+真实可复用的提示词案例库。案例涵盖学术配图、素材资产、头像人设、品牌包装、图像编辑、网格拼贴、信息图、地图、人物视觉、海报营销、产品视觉、氛围插画、视觉文档、叙事序列、技术图示、字体版式、界面样机等17+分类。支持历史记录管理和批量下载功能。'
    },
    tags: ['AI绘图', '提示词案例库', 'GPT Image 2'],
    liveUrl: 'https://dreampix.pojuai.com/',
    heroImage: '/projects/dreampix/hero.png',
    features: [
      {
        title: { zh: '提示词模板案例库', en: '提示词模板案例库' },
        description: { zh: '新增提示词模板案例库，涵盖多种场景模板，一键查看提示词并做同款。', en: '新增提示词模板案例库，涵盖多种场景模板，一键查看提示词并做同款。' },
        image: '/projects/dreampix/feature-1.jpg'
      },
      {
        title: { zh: '一键做同款', en: '一键做同款' },
        description: { zh: '看到喜欢的案例，一键复制提示词生成同款图片，快速实现创意。', en: '看到喜欢的案例，一键复制提示词生成同款图片，快速实现创意。' },
        image: '/projects/dreampix/feature-2.jpg'
      },
      {
        title: { zh: '个人案例库', en: '个人案例库' },
        description: { zh: '生成的图片提示词可保存到自己的案例库，方便后期复用和管理。', en: '生成的图片提示词可保存到自己的案例库，方便后期复用和管理。' },
        image: '/projects/dreampix/feature-3.jpg'
      },
      {
        title: { zh: '持续更新扩展', en: '持续更新扩展' },
        description: { zh: '后续新增数字人、短视频封面等模板案例，支持自定义API接入和画布功能。', en: '后续新增数字人、短视频封面等模板案例，支持自定义API接入和画布功能。' },
        image: '/projects/dreampix/feature-4.jpg'
      }
    ],
    techStack: ['Vue.js', 'GPT Image 2', 'API', 'LocalStorage']
  },
  {
    slug: 'poster-editor',
    name: '小卡海报编辑器',
    tagline: {
      zh: '本地优先、离线可用的Markdown文字海报生成器，支持多种模板尺寸。',
      en: '本地优先、离线可用的Markdown文字海报生成器，支持多种模板尺寸。'
    },
    description: {
      zh: '小卡海报编辑器是一个本地优先、离线可用的Markdown文字海报生成器。把文章粘进来，秒变一张精致海报，支持一键截图发到小红书、小绿书等内容平台。提供6种模板尺寸（经典海报、小红书、微信分享、Twitter、手机壁纸、A4文档），支持Markdown语法（标题、加粗、高亮、引用、代码块等），可导出PNG、JPG、HTML格式，还支持JSON/CSV批量生成。',
      en: '小卡海报编辑器是一个本地优先、离线可用的Markdown文字海报生成器。把文章粘进来，秒变一张精致海报，支持一键截图发到小红书、小绿书等内容平台。提供6种模板尺寸（经典海报、小红书、微信分享、Twitter、手机壁纸、A4文档），支持Markdown语法（标题、加粗、高亮、引用、代码块等），可导出PNG、JPG、HTML格式，还支持JSON/CSV批量生成。'
    },
    tags: ['海报编辑器', 'Markdown', '离线工具', '开源'],
    githubUrl: 'https://github.com/xiaoka6688/xiaoka-poster-editor',
    liveUrl: 'https://poster.pojuai.com/',
    heroImage: '/projects/poster-editor/hero.png',
    features: [
      {
        title: { zh: '6种模板尺寸', en: '6种模板尺寸' },
        description: { zh: '经典海报、小红书、微信分享、Twitter、手机壁纸、A4文档，满足不同平台需求。', en: '经典海报、小红书、微信分享、Twitter、手机壁纸、A4文档，满足不同平台需求。' },
        image: '/projects/poster-editor/feature-1.png'
      },
      {
        title: { zh: 'Markdown实时预览', en: 'Markdown实时预览' },
        description: { zh: '支持标题、加粗、高亮、引用、代码块等Markdown语法，实时预览效果。', en: '支持标题、加粗、高亮、引用、代码块等Markdown语法，实时预览效果。' },
        image: '/projects/poster-editor/feature-2.png'
      },
      {
        title: { zh: '离线可用', en: '离线可用' },
        description: { zh: '无需安装、无需联网，打开即用，字体已打包本地，断网也能流畅排版。', en: '无需安装、无需联网，打开即用，字体已打包本地，断网也能流畅排版。' },
        image: '/projects/poster-editor/feature-3.png'
      },
      {
        title: { zh: '批量生成导出', en: '批量生成导出' },
        description: { zh: '支持PNG、JPG、HTML导出，还可导入JSON/CSV数据批量生成海报。', en: '支持PNG、JPG、HTML导出，还可导入JSON/CSV数据批量生成海报。' },
        image: '/projects/poster-editor/feature-4.png'
      }
    ],
    techStack: ['HTML', 'JavaScript', 'CSS', 'Markdown']
  }
];

export const getProjectBySlug = (slug: string): ProjectDetail | undefined =>
  projects.find((p) => p.slug === slug);
