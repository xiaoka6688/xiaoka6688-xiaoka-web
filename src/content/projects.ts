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
    slug: 'poetry-cloud',
    name: '诗云',
    tagline: {
      zh: '一张可飞行的三维诗歌星图:每位诗人是一团真实星,星团之间的虚空是一切可能的近体诗。点一下,就从噪声里算出一首诗。',
      en: '一张可飞行的三维诗歌星图:每位诗人是一团真实星,星团之间的虚空是一切可能的近体诗。点一下,就从噪声里算出一首诗。'
    },
    description: {
      zh: '诗云(Poetry Cloud)是一张可在其中飞行的三维星图:每位历史诗人是一团他真实写过的诗组成的星,星团之间的虚空则是「一切可能的近体诗」。诗不被储存——给一个编号,就能用「编号↔诗」的双射当场算出第几首诗,反之亦然;地址长达 82–229 位,几乎和诗本身一样长(目录即图书馆)。收录 32,657 位诗人 / 933,857 首真实诗作,先秦到当代 15 个朝代同心壳,并叠加现代新诗。全程纯静态,所有索引运算与渲染都在浏览器里完成,永不加后端。灵感来自刘慈欣《诗云》与博尔赫斯《巴别图书馆》。',
      en: '诗云(Poetry Cloud)是一张可在其中飞行的三维星图:每位历史诗人是一团他真实写过的诗组成的星,星团之间的虚空则是「一切可能的近体诗」。诗不被储存——给一个编号,就能用「编号↔诗」的双射当场算出第几首诗,反之亦然;地址长达 82–229 位,几乎和诗本身一样长(目录即图书馆)。收录 32,657 位诗人 / 933,857 首真实诗作,先秦到当代 15 个朝代同心壳,并叠加现代新诗。全程纯静态,所有索引运算与渲染都在浏览器里完成,永不加后端。灵感来自刘慈欣《诗云》与博尔赫斯《巴别图书馆》。'
    },
    tags: ['TypeScript', 'three.js', 'WebGL', '生成式'],
    liveUrl: 'https://shiyun.cohenjikan.com',
    heroImage: '/projects/poetry-cloud/hero.jpg',
    features: [
      {
        title: { zh: '飞行星图 · 诗人即星团', en: '飞行星图 · 诗人即星团' },
        description: {
          zh: '先秦到当代 15 个朝代同心壳,每位诗人是一团他真实写过的诗;可自由飞行、按朝代筛选,而星团之间的虚空,就是一切可能的近体诗。',
          en: '先秦到当代 15 个朝代同心壳,每位诗人是一团他真实写过的诗;可自由飞行、按朝代筛选,而星团之间的虚空,就是一切可能的近体诗。'
        },
        image: '/projects/poetry-cloud/feature-1.jpg'
      },
      {
        title: { zh: '点击虚空 · 从噪声里算出一首诗', en: '点击虚空 · 从噪声里算出一首诗' },
        description: {
          zh: '点一下虚空,就用「编号↔诗」双射从噪声里 unrank 出一首诗,并显示它在全集目录里那个 82–229 位的完整编号——地址几乎和诗本身一样长。',
          en: '点一下虚空,就用「编号↔诗」双射从噪声里 unrank 出一首诗,并显示它在全集目录里那个 82–229 位的完整编号——地址几乎和诗本身一样长。'
        },
        image: '/projects/poetry-cloud/feature-2.jpg'
      },
      {
        title: { zh: '赠诗网络 · 4,849 条赠答弧线', en: '赠诗网络 · 4,849 条赠答弧线' },
        description: {
          zh: '解析诗题(寄 / 赠 / 和 / 次韵)与约 250 条字号别名,连出 4,849 条诗人之间的赠答弧线,束状汇向银心;选中一位诗人,即勾出他往来的自我网络。',
          en: '解析诗题(寄 / 赠 / 和 / 次韵)与约 250 条字号别名,连出 4,849 条诗人之间的赠答弧线,束状汇向银心;选中一位诗人,即勾出他往来的自我网络。'
        },
        image: '/projects/poetry-cloud/feature-3.jpg'
      },
      {
        title: { zh: '逐句搜索 · 编号反查', en: '逐句搜索 · 编号反查' },
        description: {
          zh: '输入任意一句(不限首句)即可定位它属于哪位诗人的哪首诗;也能把一串长编号 unrank 回它的诗,核验它是否对应一首真实存在的作品——目录↔诗的闭环。',
          en: '输入任意一句(不限首句)即可定位它属于哪位诗人的哪首诗;也能把一串长编号 unrank 回它的诗,核验它是否对应一首真实存在的作品——目录↔诗的闭环。'
        },
        image: '/projects/poetry-cloud/feature-4.jpg'
      }
    ],
    techStack: ['TypeScript', 'three.js', 'React Three Fiber', 'BigInt', 'Vite']
  },
  {
    slug: 'music-master',
    name: '声谱坊',
    tagline: {
      zh: '完全本地的一体化音乐处理:拆声、记谱、简谱⇄五线谱互译、修音换音色。',
      en: '完全本地的一体化音乐处理:拆声、记谱、简谱⇄五线谱互译、修音换音色。'
    },
    description: {
      zh: '声谱坊(MusicMaster)是一个纯本地运行的一体化音乐处理工具,整合多个一线开源模型,在一个网页界面里搞定四件事:人声/伴奏分离、清唱自动记谱(带逐音可信度)、简谱与五线谱无损双向互译,以及把跑调清唱修成「在调 + 干净 + 仍是你本人音色」。全程本地,无需上传。',
      en: '声谱坊(MusicMaster)是一个纯本地运行的一体化音乐处理工具,整合多个一线开源模型,在一个网页界面里搞定四件事:人声/伴奏分离、清唱自动记谱(带逐音可信度)、简谱与五线谱无损双向互译,以及把跑调清唱修成「在调 + 干净 + 仍是你本人音色」。全程本地,无需上传。'
    },
    tags: ['Python', '音频AI', '本地优先', '开源'],
    githubUrl: 'https://github.com/xiaoka6688/MusicMaster',
    heroImage: '/projects/music-master/hero.png',
    features: [
      {
        title: { zh: '拆声 · 人声伴奏分离', en: '拆声 · 人声伴奏分离' },
        description: {
          zh: '三段级联(BS-RoFormer → Karaoke RoFormer → UVR):整首歌拆成人声 / 伴奏,再去和声、降噪,得到干净的纯主唱。',
          en: '三段级联(BS-RoFormer → Karaoke RoFormer → UVR):整首歌拆成人声 / 伴奏,再去和声、降噪,得到干净的纯主唱。'
        },
        image: '/projects/music-master/feature-1.jpg'
      },
      {
        title: { zh: '记谱 · 哼唱转乐谱', en: '记谱 · 哼唱转乐谱' },
        description: {
          zh: '清唱或哼唱直接转成五线谱 + 简谱,并对每个音给出可信度,不确定的地方自动标注请你复核,纯 CPU 即可运行。',
          en: '清唱或哼唱直接转成五线谱 + 简谱,并对每个音给出可信度,不确定的地方自动标注请你复核,纯 CPU 即可运行。'
        },
        image: '/projects/music-master/feature-2.jpg'
      },
      {
        title: { zh: '互译 · 简谱⇄五线谱', en: '互译 · 简谱⇄五线谱' },
        description: {
          zh: '简谱 .jianpu 与五线谱 MusicXML / MIDI / ABC 之间双向无损互译;简谱出图经 LilyPond,五线谱经 Verovio。',
          en: '简谱 .jianpu 与五线谱 MusicXML / MIDI / ABC 之间双向无损互译;简谱出图经 LilyPond,五线谱经 Verovio。'
        },
        image: '/projects/music-master/feature-3.jpg'
      },
      {
        title: { zh: '重塑 · 修音换音色', en: '重塑 · 修音换音色' },
        description: {
          zh: '两段式处理:先修音准、再换音色,把跑调清唱变成在调、干净、却仍保留你本人音色的演唱。',
          en: '两段式处理:先修音准、再换音色,把跑调清唱变成在调、干净、却仍保留你本人音色的演唱。'
        },
        image: '/projects/music-master/feature-4.jpg'
      }
    ],
    techStack: ['Python', 'FastAPI', 'PyTorch', 'CREPE', 'Verovio', 'LilyPond']
  },
  {
    slug: 'primer-score',
    name: '引物评分Web版',
    tagline: {
      zh: '把 PCR 引物设计搬上 Web,BLAST + 表达感知评分。',
      en: '把 PCR 引物设计搬上 Web,BLAST + 表达感知评分。'
    },
    description: {
      zh: 'PCR 引物设计工具的网页化实现,支持 BLAST 校验与表达感知评分,提升了生信工具的交互体验与可访问性。',
      en: 'PCR 引物设计工具的网页化实现,支持 BLAST 校验与表达感知评分,提升了生信工具的交互体验与可访问性。'
    },
    tags: ['Python', '生物信息学', 'BLAST', 'Web'],
    githubUrl: 'https://github.com/TH-Chen-CN/PrimerScore',
    heroImage: '/projects/primer-score/hero.png',
    features: [
      {
        title: { zh: 'BLAST 校验', en: 'BLAST 校验' },
        description: {
          zh: '集成 BLAST 流程,自动剔除非特异性引物候选,降低实验返工率。',
          en: '集成 BLAST 流程,自动剔除非特异性引物候选,降低实验返工率。'
        },
        image: '/projects/primer-score/feature-1.jpg'
      },
      {
        title: { zh: '表达感知评分', en: '表达感知评分' },
        description: {
          zh: '结合表达量数据为候选引物打分,优先推荐高灵敏度组合。',
          en: '结合表达量数据为候选引物打分,优先推荐高灵敏度组合。'
        },
        image: '/projects/primer-score/feature-2.jpg'
      },
      {
        title: { zh: '浏览器直运行', en: '浏览器直运行' },
        description: {
          zh: '无需本地 Python 环境,生信工具的可访问性大幅提升。',
          en: '无需本地 Python 环境,生信工具的可访问性大幅提升。'
        },
        image: '/projects/primer-score/feature-3.jpg'
      }
    ],
    techStack: ['Python', 'BLAST', 'JavaScript', 'Web']
  },
  {
    slug: 'rhythm-game-trainers',
    name: '节奏游戏修改器',
    tagline: {
      zh: '两款节奏游戏的内置图形修改器:Autoplay 满分自动演奏、变速、放宽判定、关卡直达。',
      en: '两款节奏游戏的内置图形修改器:Autoplay 满分自动演奏、变速、放宽判定、关卡直达。'
    },
    description: {
      zh: '为《节奏医生》与《冰与火之舞》两款节奏游戏制作的内置图形修改器,均基于 BepInEx 注入,游戏内按 Insert 呼出菜单。提供引擎级 Autoplay 满分自动演奏、游戏变速(含音高)、放宽判定窗口、无敌、关卡直达与一键解锁,以及开发者 / 调试工具。仅供单机自娱与录制,完全免费开源、严禁倒卖。',
      en: '为《节奏医生》与《冰与火之舞》两款节奏游戏制作的内置图形修改器,均基于 BepInEx 注入,游戏内按 Insert 呼出菜单。提供引擎级 Autoplay 满分自动演奏、游戏变速(含音高)、放宽判定窗口、无敌、关卡直达与一键解锁,以及开发者 / 调试工具。仅供单机自娱与录制,完全免费开源、严禁倒卖。'
    },
    tags: ['C#', 'BepInEx', '游戏修改', '开源'],
    repos: [
      { label: { zh: '节奏医生', en: '节奏医生' }, url: 'https://github.com/xiaoka6688/RhythmDoctorTrainer' },
      { label: { zh: '冰与火之舞', en: '冰与火之舞' }, url: 'https://github.com/xiaoka6688/ADOFAITrainer' }
    ],
    heroImage: '/projects/rhythm-game-trainers/hero.png',
    features: [
      {
        title: { zh: 'Autoplay 满分自动演奏', en: 'Autoplay 满分自动演奏' },
        description: {
          zh: '引擎按谱面帧级满分自动演奏,画面与真人手打无异且无水印,保留「完美 / JCI」结算标记 —— 配合隐藏 HUD 即可录制完美通关。',
          en: '引擎按谱面帧级满分自动演奏,画面与真人手打无异且无水印,保留「完美 / JCI」结算标记 —— 配合隐藏 HUD 即可录制完美通关。'
        },
        image: '/projects/rhythm-game-trainers/feature-1.jpg'
      },
      {
        title: { zh: '变速 · 放宽判定 · 无敌', en: '变速 · 放宽判定 · 无敌' },
        description: {
          zh: '0.1×–3× 变速(含音高)用于慢放练习或加速,放宽命中窗口让手打也能全 Perfect,外加无敌不会失败 / 被打断。',
          en: '0.1×–3× 变速(含音高)用于慢放练习或加速,放宽命中窗口让手打也能全 Perfect,外加无敌不会失败 / 被打断。'
        },
        image: '/projects/rhythm-game-trainers/feature-2.jpg'
      },
      {
        title: { zh: '关卡直达 · 解锁 · 开发者工具', en: '关卡直达 · 解锁 · 开发者工具' },
        description: {
          zh: '列出全部关卡一点直达、一键解锁所有关卡与成就,另含开发者 / 调试模式、跳过过场、显示 FPS、固定星球颜色等录制友好选项。',
          en: '列出全部关卡一点直达、一键解锁所有关卡与成就,另含开发者 / 调试模式、跳过过场、显示 FPS、固定星球颜色等录制友好选项。'
        },
        image: '/projects/rhythm-game-trainers/feature-3.jpg'
      }
    ],
    techStack: ['C#', 'BepInEx', 'Harmony', 'Unity', 'IMGUI']
  },
  {
    slug: 'claude-usage-monitor',
    name: 'Claude用量监视器',
    tagline: {
      zh: '常驻任务栏的 Claude Code 用量监视器,5h/周配额 + 分项目花费一眼看清。',
      en: '常驻任务栏的 Claude Code 用量监视器,5h/周配额 + 分项目花费一眼看清。'
    },
    description: {
      zh: '面向 Claude Code Pro / Max 订阅者的轻量 Windows 桌面监视器:实时显示 5 小时与每周配额、按项目折算的等效 API 花费,以及一条常驻任务栏的迷你条。复用 Claude Code 自带的 OAuth 令牌,无需单独登录。',
      en: '面向 Claude Code Pro / Max 订阅者的轻量 Windows 桌面监视器:实时显示 5 小时与每周配额、按项目折算的等效 API 花费,以及一条常驻任务栏的迷你条。复用 Claude Code 自带的 OAuth 令牌,无需单独登录。'
    },
    tags: ['Python', 'Windows', '桌面应用', '开源'],
    githubUrl: 'https://github.com/xiaoka6688/ClaudeUsageMoniter',
    heroImage: '/projects/claude-usage-monitor/hero.png',
    features: [
      {
        title: { zh: '配额实时监控', en: '配额实时监控' },
        description: {
          zh: '5 小时滚动窗口与每周配额实时刷新,跨越 75% / 90% / 95% 阈值时弹出 Windows 通知。',
          en: '5 小时滚动窗口与每周配额实时刷新,跨越 75% / 90% / 95% 阈值时弹出 Windows 通知。'
        },
        image: '/projects/claude-usage-monitor/feature-1.jpg'
      },
      {
        title: { zh: '分项目花费', en: '分项目花费' },
        description: {
          zh: '解析本地 JSONL 记录,把每个项目的用量折算成等效 API 花费,会话 / 今日 / 本月一并汇总。',
          en: '解析本地 JSONL 记录,把每个项目的用量折算成等效 API 花费,会话 / 今日 / 本月一并汇总。'
        },
        image: '/projects/claude-usage-monitor/feature-2.jpg'
      },
      {
        title: { zh: '任务栏迷你条', en: '任务栏迷你条' },
        description: {
          zh: '无边框迷你条常驻任务栏、可拖动并记忆位置,另有浮动详情窗与系统托盘两种模式。',
          en: '无边框迷你条常驻任务栏、可拖动并记忆位置,另有浮动详情窗与系统托盘两种模式。'
        },
        image: '/projects/claude-usage-monitor/feature-3.jpg'
      }
    ],
    techStack: ['Python', 'tkinter', 'pystray', 'Pillow', 'winotify']
  },
  {
    slug: 'tiny-voice-room',
    name: '迷你语音房',
    tagline: {
      zh: '免注册的轻量 WebRTC 语音房,一个链接就能开黑。',
      en: '免注册的轻量 WebRTC 语音房,一个链接就能开黑。'
    },
    description: {
      zh: '免注册、链接即用的轻量 WebRTC 语音房间。一个分享链接、无需账号、房间 24 小时自动过期,后台标签页也能稳定运行,专为开黑场景设计。',
      en: '免注册、链接即用的轻量 WebRTC 语音房间。一个分享链接、无需账号、房间 24 小时自动过期,后台标签页也能稳定运行,专为开黑场景设计。'
    },
    tags: ['WebRTC', 'TypeScript', 'Docker', '自托管'],
    githubUrl: 'https://github.com/xiaoka6688/tiny-voice-room',
    heroImage: '/projects/tiny-voice-room/hero.png',
    features: [
      {
        title: { zh: '一键链接', en: '一键链接' },
        description: {
          zh: '打开链接即入房,完全无账号、无 App、无邀请流程。',
          en: '打开链接即入房,完全无账号、无 App、无邀请流程。'
        },
        image: '/projects/tiny-voice-room/feature-1.jpg'
      },
      {
        title: { zh: '后台稳定运行', en: '后台稳定运行' },
        description: {
          zh: '针对浏览器节流的连接保活策略,即使切到游戏窗口也不会掉线。',
          en: '针对浏览器节流的连接保活策略,即使切到游戏窗口也不会掉线。'
        },
        image: '/projects/tiny-voice-room/feature-2.jpg'
      },
      {
        title: { zh: '24h 自动过期', en: '24h 自动过期' },
        description: {
          zh: '房间 24 小时后自动销毁,无残留状态,可 Docker 自托管。',
          en: '房间 24 小时后自动销毁,无残留状态,可 Docker 自托管。'
        },
        image: '/projects/tiny-voice-room/feature-3.jpg'
      }
    ],
    techStack: ['WebRTC', 'TypeScript', 'Node.js', 'Docker']
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
    name: '破局AI创业',
    tagline: {
      zh: '知识付费系统搭建，虚拟资源网课平台。汇集AI、短视频、电商、引流等领域的精品课程与实战教程。',
      en: '知识付费系统搭建，虚拟资源网课平台。汇集AI、短视频、电商、引流等领域的精品课程与实战教程。'
    },
    description: {
      zh: '破局AI创业是一个知识付费与虚拟资源网课平台，专注于为创业者和个人提供AI、短视频、电商运营、爆粉引流等领域的系统化课程。',
      en: '破局AI创业是一个知识付费与虚拟资源网课平台，专注于为创业者和个人提供AI、短视频、电商运营、爆粉引流等领域的系统化课程。'
    },
    tags: ['知识付费', '在线教育', 'AI创业', '电商'],
    liveUrl: 'https://pjht.jsxf8.cn',
    heroImage: '/projects/pjht/banner.png',
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
        image: '/projects/ai-draw/poster-1.jpg'
      },
      {
        title: { zh: '多风格海报生成', en: '多风格海报生成' },
        description: { zh: '支持古风、现代、卡通等多种风格的海报生成，满足不同场景需求。', en: '支持古风、现代、卡通等多种风格的海报生成，满足不同场景需求。' },
        image: '/projects/ai-draw/poster-2.jpg'
      },
      {
        title: { zh: '高清作品输出', en: '高清作品输出' },
        description: { zh: '支持1K到4K超清分辨率，作品质量专业，满足商业用途需求。', en: '支持1K到4K超清分辨率，作品质量专业，满足商业用途需求。' },
        image: '/projects/ai-draw/poster-4.png'
      },
      {
        title: { zh: '多场景应用', en: '多场景应用' },
        description: { zh: '适用于社交媒体封面、产品展示、营销海报等多种场景，提升内容吸引力。', en: '适用于社交媒体封面、产品展示、营销海报等多种场景，提升内容吸引力。' },
        image: '/projects/ai-draw/poster-3.jpg'
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
    heroImage: '/projects/dreampix/template-1.jpg',
    features: [
      {
        title: { zh: '提示词模板案例库', en: '提示词模板案例库' },
        description: { zh: '新增提示词模板案例库，涵盖多种场景模板，一键查看提示词并做同款。', en: '新增提示词模板案例库，涵盖多种场景模板，一键查看提示词并做同款。' },
        image: '/projects/dreampix/template-2.jpg'
      },
      {
        title: { zh: '一键做同款', en: '一键做同款' },
        description: { zh: '看到喜欢的案例，一键复制提示词生成同款图片，快速实现创意。', en: '看到喜欢的案例，一键复制提示词生成同款图片，快速实现创意。' },
        image: '/projects/dreampix/template-3.jpg'
      },
      {
        title: { zh: '个人案例库', en: '个人案例库' },
        description: { zh: '生成的图片提示词可保存到自己的案例库，方便后期复用和管理。', en: '生成的图片提示词可保存到自己的案例库，方便后期复用和管理。' },
        image: '/projects/dreampix/template-1.jpg'
      },
      {
        title: { zh: '持续更新扩展', en: '持续更新扩展' },
        description: { zh: '后续新增数字人、短视频封面等模板案例，支持自定义API接入和画布功能。', en: '后续新增数字人、短视频封面等模板案例，支持自定义API接入和画布功能。' },
        image: '/projects/dreampix/template-4.jpg'
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
