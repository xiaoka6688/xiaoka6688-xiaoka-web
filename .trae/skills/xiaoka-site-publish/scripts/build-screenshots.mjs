// xiaoka 作品集站 · 通用截图脚本模板
// 用法：复制本文件到作品集站仓库根目录，改下方占位符后
//       `node <脚本名>.mjs`
// 依赖：`npm i -D playwright` + `npx playwright install chromium`
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

// ===== 占位符：改成你的目标站点与目标 slug =====
const SITE_URL = 'https://<replace-with-target-site>/';
const SLUG = '<slug>';
// 文档知识库型：导航各分类子页面 URL，逐页截图（对应 feature-1..N）
// 数据看板型：可留空，改用下方 DOM 板块探测逻辑
const NAV_PAGES = [
  { url: '<分类1页面URL>', name: '<分类1名>' },
  { url: '<分类2页面URL>', name: '<分类2名>' },
];
// =============================================

const OUT = `public/projects/${SLUG}`;
mkdirSync(OUT, { recursive: true });

// 若目标站图表用 CDN 的 echarts 且连接被重置，可启用本地镜像拦截：
const CACHE_DIR = '.cache';
const USE_ECHARTS_MIRROR = false; // 需置 true 并已把 echarts.min.js 放到 .cache/

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

if (USE_ECHARTS_MIRROR) {
  const fs = await import('fs');
  const path = await import('path');
  const mirror = fs.readFileSync(path.join(CACHE_DIR, 'echarts.min.js'), 'utf8');
  const cdnHosts = ['cdn.jsdelivr.net', 'unpkg.com', 'cdnjs.cloudflare.com'];
  await page.route('**/*echarts*', async (route) => {
    if (cdnHosts.some((h) => route.request().url().includes(h))) {
      await route.fulfill({ contentType: 'application/javascript', body: mirror });
    } else {
      await route.continue();
    }
  });
}

// ---- 首页 hero + 板块坐标截图（数据看板型）----
await page.goto(SITE_URL, { waitUntil: 'networkidle', timeout: 90000 });
await page.waitForTimeout(3000);

// 探测首页各 h2/板块的 y 坐标
const layout = await page.evaluate(() => {
  const top = (el) => Math.round((el.getBoundingClientRect().top + window.scrollY));
  const h2s = Array.from(document.querySelectorAll('main h2, .hero h2, article h2')).map((h) => ({
    text: h.textContent.trim().slice(0, 30),
    y: top(h),
  }));
  let docH = document.documentElement.scrollHeight;
  const heroStart = top(document.querySelector('main') || document.body) + 10;
  return { h2s, docH, heroStart };
});
console.log('板块坐标:', JSON.stringify(layout, null, 1));

// 按板块绝对 y 分带截图（示例：hero + 两段）
const bands = [
  { y: layout.heroStart, h: 780, file: 'hero.png' },
  // { y: <某板块y>, h: <高度>, file: 'feature-1.png' },
  // ...根据 layout.h2s 增加
];
for (const b of bands) {
  await page.evaluate((y) => window.scrollTo(0, y), b.y);
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/${b.file}`, clip: { x: 0, y: 0, width: 1440, height: b.h } });
  console.log(`captured ${b.file}`);
}

// ---- 导航分类子页面截图（文档知识库型）----
let i = 1;
for (const np of NAV_PAGES) {
  try {
    await page.goto(np.url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(1200);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    await page.screenshot({
      path: `${OUT}/feature-${i}.png`,
      clip: { x: 0, y: 0, width: 1440, height: 850 },
    });
    console.log(`captured feature-${i} (${np.name})`);
    i++;
  } catch (e) {
    console.log(`FAIL ${np.name}: ${String(e.message).slice(0, 80)}`);
  }
}

await browser.close();
console.log('done →', OUT);