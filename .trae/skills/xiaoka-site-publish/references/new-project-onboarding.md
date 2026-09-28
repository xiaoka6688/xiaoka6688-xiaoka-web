# 作品集站内容 schema 与上线模式参考

本节给出 `projects.ts` / `services.ts` 的字段结构，以及两类站点的上线模式参考（源自已成功上线的资源站与 FDE 学习中心，已去敏感信息，可作模板）。

## 站点源码结构（作品集站仓库内）

```
src/content/projects.ts     # 项目数据数组（每新增 +1）
src/content/services.ts     # 服务数据数组 + DemoId + serviceLayout
src/components/sections/services/<P>Demo.tsx   # 每服务一个演示组件
src/components/sections/ServicesSection.tsx    # import + 注册 demo
public/projects/<slug>/     # 截图：hero.png + feature-1..N.png
README.md / 项目状态.md / 项目结构说明.md        # 计数随新增同步
```

## projects.ts 条目 schema

```ts
{
  slug: '<slug>',                          // 唯一，用于路由 /projects/<slug>
  name: '<中文名>',
  tagline: { zh: '<一句话中文>', en: '<一句话 English>' },
  description: { zh: '<长介绍中文>', en: '<长介绍 English>' },
  tags: ['<标签1>', '<标签2>', '<标签3>'],
  githubUrl: '<公开仓库时填，私有则不填/移除>',   // 见下方"私有仓库规则"
  liveUrl: '<线上访问地址>',
  heroImage: '/projects/<slug>/hero.png',
  features: [
    { title: { zh, en }, description: { zh, en }, image: '/projects/<slug>/feature-1.png' },
    // ... feature-N 对应 N 张分类/板块截图，中英双语必须同步
  ],
  techStack: ['<技术栈>', ...]
}
```

## services.ts 改动（三处）

1. `DemoId` 联合类型：在字符串字面量联合里追加 `<newId>`。
2. services 数组新增一条：
```ts
{
  slug: '<newId>',
  name: '<中文名>',
  subtitle: { zh, en },
  tagline: { zh, en },
  features: { zh: ['...'], en: ['...'] },   // 2~3 条要点
  tags: ['...'],
  emblem: '<emblemId, 从站点已有 emblem 池里取未占用的>',
  demo: '<newId>',
  sampleImage: null,
  accentRgba: 'rgba(r, g, b, 0.55)',
  visitUrl: '<线上访问地址>'
}
```
3. `serviceLayout` 数组：在希望展示的位置插入 `{ kind: 'item', slug: '<newId>' }`。

## Demo 组件

风格参照现有 `<P>Demo.tsx`：`const [active,setActive]=useState` + `setInterval` 轮播高亮，展示该站点核心数据（进度条 / 分类标签 / 统计数字），配色用站点主题强调色。

## 私有仓库规则

`git ls-remote https://github.com/<owner>/<repo> HEAD`：
- 返回 40 位 hash → **公开**，可填 `githubUrl`。
- 返回认证失败 / 404 → **私有**，**不填 / 移除 `githubUrl`**，避免详情页"查看源码"给访客 404。此时只保留 `liveUrl` / `visitUrl`。

## 两类站点上线模式参考

### A. 数据看板型（资源站，暗色多图表）
- 首页是多模块看板：统计卡 + 分类排行榜 + 热力矩阵等，图表多为 ECharts 从 CDN 加载。
- 处理要点：**按 DOM 板块元素精确定位截图**（探测 `.panel`/`.row.two` 等容器）；用 playwright `route` 把 echarts 从本地镜像拦截注入，避免 CDN 被重置导致图表空白，并等待 canvas 绘制完成；截图每张只含对应板块。
- feature 图覆盖站点全部板块。
- hero 用信息饱满的全景首屏。

### B. 文档知识库型（FDE 学习中心，Docusaurus 浅色）
- 首页是学习路径/技能树，真正的丰富内容在**导航栏各分类**。
- 处理要点：**不要只截首页**，遍历导航栏每个分类的下拉链接（系统学习/深度解读/工具教程/AI趋势/招聘动态等），逐个打开子页面截图；每张图顶部保留站点导航栏（体现分类归属），主内容区为该分类代表性内容。
- feature 与导航分类一一对应，title/description 用该分类名称。

## 通用坑（已踩过）

- 视口 `clip` 超出视口范围 → 报 `Clipped area ... outside`。解法：先 scroll，再 clip；超高元素用元素级截图。
- Vercel 部署有 1–3 分钟延迟，且首次抓取的 JS 可能是旧内容 → 轮询直到新 slug 出现。
- dev 端口被占会自动递增 → 从启动日志读实际端口。
- 截图脚本若从远端拉依赖，产物一律放作品集站项目目录内，临时脚本用毕删除。