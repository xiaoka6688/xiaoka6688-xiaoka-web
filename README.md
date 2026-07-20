# 小卡 Portfolio

个人作品集网站，用于展示 **小卡** 在 AI 智能体开发与 AIGC 实战应用方面的能力。

- 品牌定位：**AI 虚拟 IP · AI 项目实战**
- 技术形态：React + TypeScript + Vite 单页应用（SPA），含 3D 名片卡片、动态背景、中英双语
- 在线地址：部署到 GitHub Pages（自定义域名见 `public/CNAME`，请替换为小卡自己的域名）

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
│   ├── CNAME                 # 自定义域名（请替换为小卡自己的域名）
│   ├── 404.html              # SPA 路由回退页
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
│   │   ├── projects.ts        # 8 个项目数据
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
│   │           ├── xiaoka-card.svg   # 卡片纹理（改卡面只动这个文件）
│   │           └── card.glb          # 卡片几何体（一般不动）
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
卡片几何体是 `card.glb`（一般不动），卡面是一张 SVG 纹理 `src/components/reactbits/Components/Lanyard/xiaoka-card.svg`。**改名字、标签、二维码、联系方式等，只编辑这个 SVG 即可，无需重新用 Blender 烘焙模型。**
- 纹理尺寸 2048 × 1536，卡片UV完整映射整张宽度（U: 0→1），高度可见区约 Y: 0→1100，重要内容放在 Y: 0→700 内最稳妥。
- 二维码已使用高清 `public/qrcode.png`（946×921）放大到可扫描尺寸，显示在卡片右上角；如需替换微信二维码，把新图导出为 PNG 后，按下面「替换二维码」步骤更新 base64。

### 修改 Logo / 头像
- 站点导航 Logo：`public/logo.svg`
- 卡片头像：`xiaoka-card.svg` 内的头像 `<image>`（圆形裁剪）

### 修改主题配色
- `src/styles/globals.css` 用 CSS 变量定义两套暗色主题（`violet→cyan` 默认，`magenta→lime` 通过 `<html data-theme="magenta-lime">` 切换）。

### 增删背景
- 背景列表在 `src/components/BackgroundSwitcher.tsx` 的 `ENTRIES` 数组，每项含 `id`、`weight`（`light` / `heavy`）和 `render`。重背景仅在桌面且 4 核以上机器进入随机池；低端设备会自动降级，标签页隐藏时卸载 WebGL 省电。

---

## 3D 名片卡片（Lanyard）说明

- 组件：`src/components/reactbits/Components/Lanyard/Lanyard.tsx`
- 纹理：`xiaoka-card.svg`（本地 SVG，材质层贴图到 `card.glb` 几何体）
- 支持鼠标 / 触摸拖拽摆动（移动端已开启 `touch-action: none`）
- 偏好「减少动态效果」（`prefers-reduced-motion`）时降级为静态展示

### 替换二维码

1. 准备一张清晰的微信二维码 PNG（建议 ≥ 400×400）。
2. 转成 base64：
   ```bash
   base64 -w 0 public/qrcode.png > /tmp/qr_b64.txt
   ```
3. 打开 `xiaoka-card.svg`，在 `<!-- 二维码 -->` 注释下的 `<image>` 标签中，把 `href` 与 `xlink:href` 的 `data:image/png;base64,...` 换成新 base64，调整 `x` / `y` / `width` / `height` 控制位置与大小即可。

---

## 部署

通过 `.github/workflows/deploy.yml` 自动部署到 GitHub Pages：推送到 `main` 分支即触发构建并发布 `dist/`。

一次性 GitHub 设置：
1. **Settings → Pages → Build and deployment → Source**：选 `GitHub Actions`。
2. **Settings → Pages → Custom domain**：填入你的自定义域名（并把该域名写进 `public/CNAME` 覆盖默认的 `cohenjikan.com`）。
3. 配置 DNS（以自定义域名为准）。

> `vite.config.ts` 中 `base: '/'` 适用于自定义域名根路径部署；若改到 `用户名.github.io/仓库名` 子路径，需要把 `base` 改成 `/仓库名/`。

---

## 注意事项 / 已知问题

- **二维码**：已修复——原二维码以 92×92 显示在 2048 宽纹理中，卡片上仅约 14px 无法扫描；现改为高清 320×320 显示在卡片右上角。
- **移动端**：重背景在移动端不进入随机池，Bento 单列，Lanyard 卡片隐藏。
- `SiteDock` / `Footer` 组件保留但未挂载（如需恢复可自行在 `App.tsx` / `HomePage.tsx` 引入）。
- 本地预览（无头浏览器）对 WebGL 背景有帧率限制，截图可能偏慢，属工具限制而非线上问题。

---

## License

MIT
