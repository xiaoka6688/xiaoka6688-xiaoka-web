// 工牌（3D 卡片）内容配置 + SVG 生成器
// 卡片为双面折叠网格：正面 = SVG 左半 (x:0~1024)，背面 = 右半 (x:1024~2048, 镜像)。
// 可见竖向范围约 y:0~1163（SVG 总高 1536 的顶部 75.7%），竖向被拉伸约 1.48×。
// 所有可编辑内容都集中在 CardConfig，改任意字段都会重新生成 SVG 并刷新 3D 贴图。

export interface CardConfig {
  /** 姓名（卡片主标题，同时作为背面水印） */
  name: string;
  /** 副标题 / 方向（如 "AI 智能体项目实战应用"） */
  subtitle: string;
  /** 顶部红条文字（留空则只显示纯色条；可关闭整条红条） */
  bannerText: string;
  /** 是否显示顶部红条 */
  showBanner: boolean;
  /** 头像 dataURL（png/jpg），为空时显示占位人像 */
  avatar: string;
  /** 主题色（红条、描边、装饰块、占位人像） */
  accent: string;
  /** 背景渐变顶部色 */
  bgTop: string;
  /** 背景渐变底部色 */
  bgBottom: string;
}

export const defaultCardConfig: CardConfig = {
  name: '小卡',
  subtitle: 'AI智能体项目应用研究',
  bannerText: '人工智能',
  showBanner: true,
  avatar: '/avatar-default.jpg',
  accent: '#b91c1c',
  bgTop: '#1a1a2e',
  bgBottom: '#16213e'
};

export const STORAGE_KEY = 'xiaoka-card-config-v1';

/** 转义用户文本，避免破坏 SVG/XML */
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * 依据配置生成完整卡片 SVG 字符串（2048×1536）。
 * 布局已修正：头像上移到 cy=430，姓名下移到 y=715，二者不再重叠。
 */
export function buildCardSVG(config: CardConfig): string {
  const name = esc(config.name || '小卡');
  const subtitle = esc(config.subtitle || '');
  const banner = esc(config.bannerText || '');
  const { avatar, showBanner, accent, bgTop, bgBottom } = config;

  // 头像区：圆形裁剪，宽 350 高 350，圆心 (512,430) r=175
  const avatarBlock = avatar
    ? `<g clip-path="url(#avatarClip)"><image href="${avatar}" x="337" y="255" width="350" height="350" preserveAspectRatio="xMidYMid slice"/></g>`
    : `<g clip-path="url(#avatarClip)">
         <rect x="337" y="255" width="350" height="350" fill="#0f3460"/>
         <circle cx="512" cy="392" r="52" fill="${accent}" opacity="0.92"/>
         <path d="M388 600 C388 498 636 498 636 600 Z" fill="${accent}" opacity="0.92"/>
       </g>`;

  const bannerBlock = showBanner
    ? `<rect x="0" y="80" width="1024" height="120" fill="${accent}"/>` +
      (banner
        ? `<text x="512" y="162" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-weight="900" font-size="72" fill="#ffffff" text-anchor="middle" letter-spacing="6">${banner}</text>`
        : '')
    : '';

  const subtitleBlock = subtitle
    ? `<text x="512" y="788" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-weight="500" font-size="40" fill="#94a3b8" text-anchor="middle" letter-spacing="3">${subtitle}</text>`
    : '';

  return `<svg width="2048" height="1536" viewBox="0 0 2048 1536" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${bgTop}"/>
      <stop offset="100%" stop-color="${bgBottom}"/>
    </linearGradient>
    <clipPath id="avatarClip"><circle cx="512" cy="430" r="175"/></clipPath>
  </defs>

  <!-- 正面：简洁工牌风格 -->
  <rect x="0" y="0" width="1024" height="1163" fill="url(#bgGrad)"/>
  ${bannerBlock}

  <!-- 大头像（居中，上移避免与姓名重叠） -->
  <circle cx="512" cy="430" r="180" fill="#0f3460" stroke="${accent}" stroke-width="4" opacity="0.9"/>
  ${avatarBlock}

  <!-- 姓名 -->
  <text x="512" y="715" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-weight="800" font-size="108" fill="#ffffff" text-anchor="middle">${name}</text>

  <!-- 副标题 / 方向 -->
  ${subtitleBlock}

  <!-- 分隔线 -->
  <line x1="300" y1="838" x2="724" y2="838" stroke="#ffffff" stroke-width="2" opacity="0.12"/>

  <!-- 底部装饰条 -->
  <rect x="0" y="1110" width="620" height="53" fill="${accent}"/>
  <rect x="620" y="1110" width="404" height="53" fill="#1e293b"/>

  <!-- 背面：品牌水印 -->
  <rect x="1024" y="0" width="1024" height="1163" fill="url(#bgGrad)"/>
  <text x="1536" y="540" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-weight="800" font-size="160" fill="#ffffff" text-anchor="middle" opacity="0.16">${name}</text>
</svg>`;
}
