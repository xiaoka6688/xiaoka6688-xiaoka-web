# 小卡 - AI实战项目集

个人作品集网站，用于展示 **小卡** 在 AI 智能体开发与 AIGC 实战应用方面的能力。

- 品牌定位：**AI 虚拟 IP · AI 项目实战**
- 技术形态：React + TypeScript + Vite 单页应用（SPA），含 3D 名片卡片、动态背景、中英双语
- 在线地址：https://xiaoka.pojuai.com/（Vercel 部署，香港 CDN 节点）

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 前端框架 | React 18 + TypeScript |
| 构建工具 | Vite 5 |
| 样式框架 | Tailwind CSS 3 |
| 3D 渲染 | Three.js + @react-three/fiber 8 + drei + rapier |
| 动画库 | GSAP + framer-motion |
| 路由 | react-router-dom 6 |
| 国际化 | i18next（中文 / 英文） |
| 视觉特效 | 来自 [react-bits](https://github.com/DavidHDev/react-bits) 的组件（已拷贝进 `src/components/reactbits/`，便于定制） |

---

## 快速开始

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # 输出到 dist/
npm run preview   # 本地预览 dist/
```

> 建议 Node 20+。首次安装会拉取 three.js / ogl / GSAP / framer-motion 等，稍等一两分钟。

---

## 项目结构

```
xiaoka-web/
├── public/
│   ├── CNAME                 # 自定义域名（xiaoka.pojuai.com）
│   ├── 404.html              # SPA 路由回退页
│   ├── logo.png              # 网站 Logo 源图（1024×1024，favicon 由此生成）
│   ├── favicon.ico           # 浏览器标签页图标
│   ├── site.webmanifest      # PWA 配置
│   ├── qrcode.png           # 3D 名片上的微信二维码源图
│   ├── projects/<slug>/      # 各项目截图（hero.png 等）
│   └── services/             # 各服务截图
│
├── src/
│   ├── App.tsx               # 路由 + 布局外壳（背景 / 导航）
│   ├── main.tsx              # 应用入口
│   ├── i18n/                 # 中英文案资源
│   ├── content/              # 内容数据
│   │   ├── about.ts          # 关于页内容
│   │   ├── projects.ts        # 11 个项目数据
│   │   ├── services.ts        # 9 个服务数据
│   │   └── credits.ts         # 致谢页内容
│   ├── pages/                # HomePage / ProjectDetailPage / CreditsPage
│   ├── components/
│   │   ├── BackgroundSwitcher.tsx   # 动态背景切换（双层淡入淡出 + 低端设备降级）
│   │   ├── layout/                  # 导航 / Dock / 页脚
│   │   ├── sections/                # 首页各区块（Hero/About/Services/Projects/Contact）
│   │   └── reactbits/               # 拷贝自 react-bits 的特效组件
│   │       └── Components/Lanyard/  # 3D 名片卡片
│   │           ├── Lanyard.tsx
│   │           ├── cardConfig.ts    # 卡片配置接口 + 默认配置 + SVG 生成器
│   │           └── CardEditor.tsx   # 实时编辑面板
│   └── styles/globals.css     # 全局样式 + 主题 CSS 变量
│
├── .github/workflows/deploy.yml   # GitHub Pages 自动部署
├── 启动开发服务器.bat / 构建生产版本.bat
└── 项目结构说明.md / 项目状态.md / 经验教训记录.md
```

---

## 路由

| 路径 | 页面 |
|------|------|
| `/` | 首页（Hero → About → Services → Projects → Contact） |
| `/projects/:slug` | 项目详情页（自动按 slug 生成） |
| `/credits` | 致谢页（开源依赖 + 特别感谢） |

---

## 如何修改内容

所有内容都是**数据驱动的**，改文案不需要碰组件。

### 修改项目
1. 把截图放进 `public/projects/<slug>/`（约定：`hero.png` 为主图，`feature-1/2/3.jpg` 为特性图；缺图会自动显示占位）。
2. 打开 `src/content/projects.ts`，在 `projects` 数组里加一项（结构为 `ProjectDetail`，`tagline` / `description` / `features` 支持 `zh` / `en`）。
3. 保存后，项目会自动出现在首页 Bento 网格，并获得 `/projects/<slug>` 路由。

### 修改服务
1. 每个服务在 `src/content/services.ts` 中配置，含 `demo` 字段指向一个专属 Demo 组件。
2. **重要约定**：每个服务必须有**独立**的 Demo 组件（位于 `src/components/sections/services/`），严禁复用其他服务的 Demo（历史上因此两次出现展示错乱）。新增服务时：
   - 新建 `XxxDemo.tsx`
   - 在 `services.ts` 的 `DemoId` 类型与数据里注册
   - 在 `ServicesSection.tsx` 的 `DEMO_REGISTRY` 注册
   - 展开面板确认显示的是正确的 Demo 内容

### 修改关于页 / 致谢页
- 关于：`src/content/about.ts`
- 致谢依赖：`src/content/credits.ts`

### 修改界面文案（中 / 英）
- 所有文案集中在 `src/i18n/index.ts` 的 `zh` / `en` 资源对象里。

### 修改 3D 名片卡片
卡片几何体是 3D 模型文件（一般不动），卡面通过 `cardConfig.ts` 的 `buildCardSVG(config)` 动态生成 SVG 纹理。**改名字、头像、副标题、主题色等，只编辑 `cardConfig.ts` 的 `defaultCardConfig` 即可，无需重新用 Blender 烘焙模型。**
- 配置字段：`name`（姓名）、`subtitle`（副标题）、`bannerText`（红条文字）、`showBanner`（显示红条）、`avatar`（头像路径）、`accent`（主题色）、`bgTop`/`bgBottom`（背景渐变）
- 配置自动持久化到 `localStorage`（键 `xiaoka-card-config-v1`），刷新不丢
- `CardEditor` 面板支持实时编辑，无需改代码

### 修改 Logo / 头像
- 站点 Logo 源图：`public/logo.png`（1024×1024，favicon 全套由此生成）
- 浏览器标签页图标：`public/favicon.ico` 及多尺寸 PNG
- 卡片头像：`cardConfig.ts` 中 `avatar` 字段，默认 `/avatar-default.jpg`

### 修改主题配色
- `src/styles/globals.css` 用 CSS 变量定义主题（`violet→cyan` 默认浅色，`magenta→lime` 通过 `<html data-theme="magenta-lime">` 切换）。
- 默认背景为浅色 `#f5f7fc`，防止加载瞬间黑屏。

### 增删背景
- 背景列表在 `src/components/BackgroundSwitcher.tsx` 的 `ENTRIES` 数组，每项含 `id`、`weight`（`light` / `heavy`）和 `render`。默认背景为 `iridescence`。
- 轻量级背景（aurora、grainient、colorbends）全设备可用；重量级背景（prism、silk、iridescence、beams）仅桌面 4 核以上进入随机池。
- 版本迁移机制：`xiaoka.bgVersion`（当前 v3）不匹配时清除旧 localStorage 偏好，确保新老访客看到默认虹彩背景。

---

## 3D 名片卡片（Lanyard）说明

- 组件：`src/components/reactbits/Components/Lanyard/Lanyard.tsx`
- 卡面纹理：由 `cardConfig.ts` 的 `buildCardSVG(config)` 动态生成 SVG
- 配置持久化：`localStorage`（键 `xiaoka-card-config-v1`），刷新不丢
- 支持鼠标 / 触摸拖拽摆动（移动端已开启 `touch-action: none`）
- 偏好「减少动态效果」（`prefers-reduced-motion`）时降级为静态展示

---

## 部署

### Vercel（主要部署）
1. 推送代码到 GitHub `main` 分支，Vercel 自动触发构建并部署
2. 自定义域名 `xiaoka.pojuai.com` 绑定 Vercel
3. DNS 配置：CNAME 指向 `385d5cc6059c1a92.vercel-dns-017.com.`
4. Vercel 项目地址：https://xiaoka-web.vercel.app

### GitHub Pages（备用）
通过 `.github/workflows/deploy.yml` 自动部署到 GitHub Pages：推送到 `main` 分支即触发构建并发布 `dist/`。

> `vite.config.ts` 中 `base: '/'` 适用于自定义域名根路径部署；若改到 `用户名.github.io/仓库名` 子路径，需要把 `base` 改成 `/仓库名/`。

### 性能优化
- **代码分割**：React 独立为 `react-vendor` chunk（214KB），与 r3f（3MB）分离
- **初始加载**：504KB（gzip 152KB），r3f 按需加载
- **内联加载指示器**：`index.html` 中旋转动画 + "加载中…" 文字
- **浅色默认背景**：防止加载瞬间黑屏

---

## 注意事项 / 已知问题

- **移动端性能**：已通过代码分割优化，初始加载 504KB（gzip 152KB）；3D 模型文件（2.4MB）按需加载，慢网络下交互可能延迟。
- **Favicon**：全套适配（浏览器标签页、Windows 任务栏、iOS/Android 主屏幕、PWA），源图为 `public/logo.png`（1024×1024）。
- **背景**：默认 iridescence 虹彩，7 种可切换；重量级背景仅桌面 4 核以上可用；dark tone 下文字已优化对比度。
- **项目详情页 feature 图**：支持点击打开 lightbox 查看原尺寸大图（ESC/点遮罩关闭）。
- `SiteDock` / `Footer` 组件保留但未挂载（如需恢复可自行在 `App.tsx` / `HomePage.tsx` 引入）。
- 本地预览（无头浏览器）对 WebGL 背景有帧率限制，截图可能偏慢，属工具限制而非线上问题。

---

## License

MIT
