---
name: "xiaoka-site-publish"
description: "将用户提供的新项目软件、仓库地址或线上服务加入 xiaoka 个人作品集站（xiaoka.pojuai.com）对应板块，并完成推送与 Vercel 部署上线的完整流程。Invoke when 用户给出新项目/仓库/上线服务 URL 并要求添加展示或部署上线时。"
---

# xiaoka 作品集站 · 新项目上线工作流

把「新项目 / 软件 / 仓库 / 上线服务」一键式接入 xiaoka 个人作品集站，完成 **内容新增 → 截图提炼 → 构建验证 → 推送部署上线** 的端到端流程。本 skill 沉淀了多次成功上线的方法论，支持换电脑复用与迭代优化。

## 触发条件

用户提供下列任一信息，并希望加入作品集站展示：
- 一个新网站 / SaaS / 工具 / 文档站的**线上访问地址（URL）**
- 一个项目的**GitHub 仓库地址**
- 两者都给出，要求"帮我添加对应的项目和服务里"、"新增板块"、"上线部署"

## 前置环境确认（换新电脑时必须先核对）

| 依赖 | 说明 |
|---|---|
| Node ≥ 18 | Vite 构建需要 |
| git + GitHub 认证 | `gh auth status` 或 ssh key 可用，能 push |
| Playwright + Chromium | 截图与站点探测需要，`npm i -D playwright` 后 `npx playwright install chromium` |
| Vercel 连接 | 作品集站通过 GitHub push 自动触发 Vercel 部署，无需额外命令 |
| 作品集站源码位置 | 换机后先让用户确认仓库目录；本 skill 内的相对路径均指**作品集站仓库根目录** |

首次在陌生机器使用时，先做一次只读检查（git status / 能 fetch 远程），不要假设现状。

## 核心工作流

### 0. 先确认本地与远程同步
```
git fetch origin
git status            # 确认工作区干净、与 origin/main 一致，避免在过期代码上改
```
若落后则先 pull；若未推送过则提示。

### 1. 理解新站点
打开目标 URL，识别：
- 站点定位（数据看板 / 文档知识库 / SaaS / 工具站）
- 首页板块结构、统计数字（如阶段数、文档数、岗位数）
- **导航栏分类**（Docusaurus 等多页站尤其重要，决定截图如何提炼）

原则：**不要只截首页**，应按站点导航的每个内容分类打开子页面逐个截图提炼，让每个 feature 图代表一个真实内容板块。

### 2. 截图（按板块 / 按导航分类）
用 `scripts/build-screenshots.mjs` 模板（复制改占位符）：
- 探测首页各板块在整页中的 y 坐标，按板块绝对坐标裁剪。
- **视口 clip 超界会报错**：先 `scrollIntoView`/`scrollTo` 到目标，再 `clip {x:0,y:0,w,h}`；超过一屏高的元素改用 `locator.element.screenshot()`（自动拼接整树）。
- 产物存到作品集站 `public/projects/<slug>/`，命名 `hero.png` + `feature-1..N.png`。

经验（两次上线的关键差异）：
- **ECharts 数据看板型（浅色/深色都可）**：页面图表来自 CDN。若 `jsdelivr` 等 CDN 连接被重置导致图表空白，用 playwright `route` 拦截，把 echarts 从本地 `.cache/` 镜像注入，并等待 canvas 渲染完成再截图（`.cache/` 记得加进 `.gitignore`）。
- **文档知识库型（如 Docusaurus）**：导航分类下拉项即是各内容板块的 URL，直接逐分类子页面截图，比只截首页更能代表站点。

### 3. 新增项目条目（projects.ts）
在 `src/content/projects.ts` 的项目数组末尾新增一条，字段见 `references/new-project-onboarding.md` 的 schema。要点：
- `slug` 统一；`heroImage` 指向 `/projects/<slug>/hero.png`。
- `tagline`/`description`/`feature.title`/`feature.description` 必须 **zh + en 双语** 同时维护。
- **私有仓库**：`git ls-remote https://github.com/<owner>/<repo> HEAD` 能读到 = 公开；返回认证错误/404 = 私有。**私有则不要填 `githubUrl`**，否则详情页"查看源码"按钮会给访客 404。唯一例外是公有仓库，可填仓库地址。

### 4. 新增服务条目（services.ts + demo 组件）
1. `src/content/services.ts`：
   - 在 `DemoId` 联合类型（形如 `| 'poju-ai' | 'ai-draw'`）里加 `<newId>`。
   - 在 services 数组新增一条（字段见 schema），`visitUrl` 填新站点 URL。
   - 在文件末尾 `serviceLayout` 数组的对应位置插入 `{ kind: 'item', slug: '<newId>' }`，保持展示顺序合理。
2. 新建演示组件 `src/components/sections/services/<PascalId>Demo.tsx`，风格参照 `FdeAcademyDemo`（数据卡/进度条/统计，用站点主题色）。
3. `src/components/sections/ServicesSection.tsx`：`import` 该组件 + 在 demo 映射对象注册 `<newId>: <PascalId>Demo`。

### 5. 同步文档计数
`README.md`、`项目状态.md`、`项目结构说明.md` 里出现"X 个项目 / Y 个服务"的地方，随新增同步 +1。

### 6. 构建验证
```
npm run build      # 必须通过（tsc -b && vite build）
```

### 7. 浏览器交互验证（用 Chrome DevTools MCP）
启动 `npm run dev`（端口若被占会自动递增，从日志读取实际端口），然后用 chrome-devtools MCP 验证：
- 详情页 `/projects/<slug>`：feature 标题齐全、**全部图片 `complete && naturalWidth>0` 无破图**。
- 首页：项目卡片数 +1、出现新卡片。
- 服务区：展开该服务行 → demo 渲染、`访问网站` 按钮指向新 URL。
- 确认无指向私有仓库的源码按钮残留。
逐一核对后**停止 dev 服务器、删除临时探测脚本**（保留 `scripts/` 下正式模板）。

### 8. 提交推送部署（共享/远程操作，推前务必先征得用户确认）
```
git add <本次涉及文件：数据/组件/截图/文档/+ 新增脚本归入 scripts/>
git commit -F <消息文件>     # 常规 feat: 提交信息
git push                     # 触发 Vercel 自动部署
```
提交信息示例：`feat: 新增 <项目名> 项目与服务条目，按分类截图上线`。

### 9. 线上验证（Vercel 有延迟，需轮询）
push 后 Vercel 部署通常 1–3 分钟才生效，且**首次抓到的 JS 可能是部署前内容**。轮询：
```
1) 抓首页 HTML 提取 <assets>/index-*.js
2) 抓该 JS，Contains('<slug>') 且 Contains('<线上URL>') 为 true 才算部署完成
3) 仍未出现则 sleep 30–60s 重试
4) 再 HEAD 查 <线上URL>/projects/<slug>/*.png 均 200
```

## 提交/一致性原则

- 只暂存本次实际涉及的文件，不 `git add .`（避免混入 .cache、临时脚本、日志）。
- 临时探测脚本一律用毕删除；`scripts/build-screenshots.mjs` 是可复用模板，保留。
- 所有产物（截图/缓存/日志）写入作品集站项目目录内，不写系统目录。
- 涉及删除/覆盖/`git push` 等不可逆或远程共享操作，先征得用户同意。

## 迭代维护

本 skill 支持持续优化：遇到新的站点类型、新的坑（CDN 拦截、部署延迟、端口冲突等）时，直接增量补充到本文件对应章节即可，无需重造流程。

## 参考

- `references/new-project-onboarding.md`：projects.ts + services.ts 字段 schema 与多次上线的模式参考。
- `scripts/build-screenshots.mjs`：通用截图脚本模板（改占位符后复用）。