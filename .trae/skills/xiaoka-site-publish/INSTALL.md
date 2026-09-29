# xiaoka-site-publish 技能 · 安装适配说明

一个通用的「新项目上线作品集站」技能，把新项目 / 软件 / 仓库 / 线上服务一键接入 xiaoka 个人作品集站并完成部署上线。本包为跨工具版，适配多种智能体（Agent）运行时。

## 包内容

```
xiaoka-site-publish/
├── SKILL.md                          # 技能定义（YAML frontmatter + 工作流）
├── INSTALL.md                        # 本说明
├── references/
│   └── new-project-onboarding.md     # projects.ts / services.ts 字段 schema 与两类站点上线模式
└── scripts/
    └── build-screenshots.mjs         # 通用截图脚本模板（改占位符复用）
```

## 支持的运行时 / 安装位置

| 运行时 | 安装位置 | 说明 |
|--------|----------|------|
| Claude Code (Anthropic Skills) | `~/.claude/skills/xiaoka-site-publish/` 或项目 `.claude/skills/` | 解压后以 `SKILL.md` + references + scripts 结构放置 |
| TRAE (Agent Skills) | `.trae/skills/xiaoka-site-publish/` | 放到工作区 `.trae/skills/` 目录 |
| Cursor (Rules/Skills) | 项目 `.cursor/` 或配置目录 | 将 `SKILL.md` 内容纳入规则文件，并把 references/scripts 放同目录 |
| VSCode / 其他 JS Agent | 任意项目目录 | 将 `SKILL.md` 作为上下文指令加载，相对路径均相对作品集站仓库根目录 |

> 上面所有安装方式都**不含**本机绝对路径，包内路径均为作品集站仓库根目录的相对路径，因此可移植到任何电脑/工具。

## 快速安装

### 方式 A：直接解压到技能目录（推荐，Claude Code / TRAE）

```bash
# 把 zip 里 xiaoka-site-publish/ 整个目录解压到目标技能目录
# 例如 TRAE：
unzip xiaoka-site-publish.zip -d ~/my-workspace/.trae/skills/
# 例如 Claude Code：
unzip xiaoka-site-publish.zip -d ~/.claude/skills/
```

### 方式 B：clone 仓库自带（若仓库里已含 .trae/skills）

```bash
git clone https://github.com/xiaoka6688/xiaoka6688-xiaoka-web
# 技能即位于仓库 .trae/skills/xiaoka-site-publish/
```

## 前置环境（首次在新电脑使用必须确认）

| 依赖 | 说明 |
|------|------|
| Node ≥ 18 | Vite 构建需要 |
| git + GitHub 认证 | 能 `git push`（Windows 需本地代理：`$env:HTTPS_PROXY="http://127.0.0.1:7897"`） |
| Playwright + Chromium | 截图用：`npm i -D playwright` 后 `npx playwright install chromium` |
| Vercel 连接 | 作品集站 push main 自动触发部署，无需额外配置 |
| 作品集站源码 | 换机后先让用户确认仓库目录（skill 内的路径均相对该仓库根目录） |

## 使用

把技能目录放进你的 Agent 技能文件夹后，直接对 Agent 说：

> 「把这个新项目 / 网站加进 xiaoka 作品集站并上线部署：[给出 URL / 仓库地址]」

Agent 会按 `SKILL.md` 的九步工作流执行：同步仓库 → 识别站点 → 分类截图 → 加项目/服务 → 构建验证 → 浏览器验证 → 推送部署 → 线上轮询验证。

## 版权与作用域

本技能仅供小卡个人作品集站 `xiaoka.pojuai.com` 内容上线的内部复用。schema 与截图模板可作通用参考，但各项目条目数据（zh/en 文案、截图、URL 等）具有项目针对性，请在原型基础上按目标站点定制。