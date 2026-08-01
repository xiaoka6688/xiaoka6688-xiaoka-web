// Open-source dependencies grouped by category. Each entry is exactly what we
// pull at runtime or build time. Order roughly matches how visible the library
// is in the final product.

export type CreditCategory =
  | 'foundations'
  | 'routing'
  | 'animation'
  | 'webgl'
  | 'ui'
  | 'fonts';

export interface CreditEntry {
  name: string;
  role: string;
  license: string;
  url: string;
}

export const credits: Record<CreditCategory, CreditEntry[]> = {
  foundations: [
    { name: 'React', role: 'UI 运行时', license: 'MIT', url: 'https://react.dev' },
    { name: 'TypeScript', role: '静态类型', license: 'Apache-2.0', url: 'https://www.typescriptlang.org' },
    { name: 'Vite', role: '开发服务器 + 打包器', license: 'MIT', url: 'https://vitejs.dev' },
    { name: '@vitejs/plugin-react', role: 'Vite ⇄ React 桥接', license: 'MIT', url: 'https://github.com/vitejs/vite-plugin-react' },
    { name: 'PostCSS', role: 'CSS 工具链', license: 'MIT', url: 'https://postcss.org' },
    { name: 'Autoprefixer', role: 'CSS 厂商前缀', license: 'MIT', url: 'https://github.com/postcss/autoprefixer' }
  ],
  routing: [
    { name: 'React Router', role: '客户端路由', license: 'MIT', url: 'https://reactrouter.com' },
    { name: 'i18next', role: '国际化核心', license: 'MIT', url: 'https://www.i18next.com' },
    { name: 'react-i18next', role: 'i18next React 绑定', license: 'MIT', url: 'https://react.i18next.com' },
    { name: 'i18next-browser-languagedetector', role: '浏览器语言自动检测', license: 'MIT', url: 'https://github.com/i18next/i18next-browser-languageDetector' }
  ],
  animation: [
    { name: 'Motion (原 Framer Motion)', role: '弹簧与手势动画', license: 'MIT', url: 'https://motion.dev' },
    { name: 'GSAP', role: '补间动画 / 滚动触发', license: 'GreenSock Standard (非商用免费)', url: 'https://gsap.com' },
    { name: '@gsap/react', role: 'GSAP React 辅助工具', license: 'GreenSock Standard', url: 'https://gsap.com/resources/React' }
  ],
  webgl: [
    { name: 'three.js', role: 'WebGL 渲染器', license: 'MIT', url: 'https://threejs.org' },
    { name: '@react-three/fiber', role: 'three.js 的 React 渲染器', license: 'MIT', url: 'https://r3f.docs.pmnd.rs' },
    { name: '@react-three/drei', role: 'r3f 辅助工具集', license: 'MIT', url: 'https://github.com/pmndrs/drei' },
    { name: '@react-three/rapier', role: 'r3f 物理引擎', license: 'MIT', url: 'https://github.com/pmndrs/react-three-rapier' },
    { name: 'meshline', role: 'GPU 友好折线', license: 'MIT', url: 'https://github.com/pmndrs/meshline' },
    { name: 'OGL', role: '轻量 WebGL 库 (极光 / 线波 / 棱镜背景)', license: 'Unlicense', url: 'https://github.com/oframe/ogl' }
  ],
  ui: [
    { name: 'react-bits', role: 'Lanyard、StaggeredMenu、MagicBento、SpotlightCard、GlassIcons、Aurora 等效果来源', license: 'MIT — 作者 David Haz', url: 'https://github.com/DavidHDev/react-bits' },
    { name: 'Tailwind CSS', role: '实用优先的样式框架', license: 'MIT', url: 'https://tailwindcss.com' },
    { name: 'tailwind-merge', role: '无冲突 Tailwind 类名合并', license: 'MIT', url: 'https://github.com/dcastil/tailwind-merge' },
    { name: 'clsx', role: '条件类名辅助', license: 'MIT', url: 'https://github.com/lukeed/clsx' }
  ],
  fonts: [
    { name: 'JetBrains Mono', role: '全站使用的等宽字体,也用于 Lanyard 名片', license: 'SIL Open Font License 1.1', url: 'https://www.jetbrains.com/lp/mono/' }
  ]
};

export interface ThanksEntry {
  key: 'gpt' | 'claude';
  url?: string;
  /** Optional accent color for visual variety. */
  accent: string;
}

export const specialThanks: ThanksEntry[] = [
  { key: 'gpt', url: 'https://openai.com', accent: '#22D3EE' },
  { key: 'claude', url: 'https://www.anthropic.com/claude-code', accent: '#A78BFA' }
];
