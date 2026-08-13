import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const resources = {
  zh: {
    translation: {
      nav: {
        about: '关于',
        services: '服务',
        projects: '项目',
        social: '社交',
        contact: '联系'
      },
      hero: {
        greeting: 'AI 实战项目集',
        cta: '发送邮件联系',
        name: "你好，我是小卡"
      },
      section: {
        about: '关于',
        services: '服务',
        projects: '项目',
        social: '社交',
        contact: '联系',
        credits: '致谢'
      },
      services: {
        intro: 'AI智能体开发 · AIGC实战应用 · 点开看详情',
        inquire: '聊聊合作 →',
        visit: '访问网站',
        outro: 'AI实战派布道者 · 合作交流请邮件 422970338@qq.com',
        cta: '聊聊合作'
      },
      project: {
        viewDetails: '查看详情',
        backToProjects: '← 返回项目列表',
        github: '查看源码',
        liveDemo: '在线 Demo',
        techStack: '技术栈',
        features: '核心特性',
        screenshotComingSoon: '截图待补充'
      },
      contact: {
        title: '合作交流',
        desc: 'AI实战派布道者，专注AI智能体开发与AIGC实战应用。无论是项目合作、技术交流还是AI培训，欢迎随时联系。',
        button: '联系我',
        role: 'AI实战派布道者 · 武汉',
        dragHint: '试着拖动这张卡片'
      },
      credits: {
        title: '致谢',
        subtitle: '致谢与感谢',
        intro: '这个网站站在很多开源项目的肩膀上。下面这些工具、库和资源,是它能跑起来、看起来还像样的真正原因。再三感谢。',
        license: '所有列出的依赖都遵循各自的开源协议(多数为 MIT / Apache 2.0 / SIL OFL)。',
        backHome: '← 返回主页',
        specialThanksTitle: '特别感谢',
        specialThanksIntro: '在这趟开发过程里,有几位 / 几个的帮助远超工具范畴 —— 没有他们,这个网站不会以现在的样子存在。',
        categories: {
          foundations: '框架与构建',
          routing: '路由 与 国际化',
          animation: '动效与交互',
          webgl: '3D 与 WebGL',
          ui: '组件与样式',
          fonts: '字体'
        },
        thanks: {
          gpt: { name: 'GPT · OpenAI', role: '结对编程伙伴', note: '复杂逻辑的拆解、SVG 排版的反复打磨,大量来自和它的对话。' },
          claude: { name: 'Claude · Anthropic', role: 'Claude Code', note: '本仓库的脚手架、React 组件层和大部分文件,直接由 Claude Code 写出。' }
        }
      },
      dock: {
        lang: '切换语言',
        bg: '切换背景',
        top: '回到顶部'
      },
      footer: '用 ♥ 在武汉构建'
    }
  },
  en: {
    translation: {
      nav: {
        about: '关于',
        services: '服务',
        projects: '项目',
        social: '社交',
        contact: '联系'
      },
      hero: {
        greeting: 'AI 实战项目集',
        cta: '发送邮件联系',
        name: "你好，我是小卡"
      },
      section: {
        about: '关于',
        services: '服务',
        projects: '项目',
        social: '社交',
        contact: '联系',
        credits: '致谢'
      },
      services: {
        intro: 'AI智能体开发 · AIGC实战应用 · 点开看详情',
        inquire: '聊聊合作 →',
        visit: '访问网站',
        outro: 'AI实战派布道者 · 合作交流请邮件 422970338@qq.com',
        cta: '聊聊合作'
      },
      project: {
        viewDetails: '查看详情',
        backToProjects: '← 返回项目列表',
        github: '查看源码',
        liveDemo: '在线 Demo',
        techStack: '技术栈',
        features: '核心特性',
        screenshotComingSoon: '截图待补充'
      },
      contact: {
        title: '合作交流',
        desc: 'AI实战派布道者，专注AI智能体开发与AIGC实战应用。无论是项目合作、技术交流还是AI培训，欢迎随时联系。',
        button: '联系我',
        role: 'AI实战派布道者 · 武汉',
        dragHint: '试着拖动这张卡片'
      },
      credits: {
        title: '致谢',
        subtitle: '致谢与感谢',
        intro: '这个网站站在很多开源项目的肩膀上。下面这些工具、库和资源,是它能跑起来、看起来还像样的真正原因。再三感谢。',
        license: '所有列出的依赖都遵循各自的开源协议(多数为 MIT / Apache 2.0 / SIL OFL)。',
        backHome: '← 返回主页',
        specialThanksTitle: '特别感谢',
        specialThanksIntro: '在这趟开发过程里,有几位 / 几个的帮助远超工具范畴 —— 没有他们,这个网站不会以现在的样子存在。',
        categories: {
          foundations: '框架与构建',
          routing: '路由 与 国际化',
          animation: '动效与交互',
          webgl: '3D 与 WebGL',
          ui: '组件与样式',
          fonts: '字体'
        },
        thanks: {
          gpt: { name: 'GPT · OpenAI', role: '结对编程伙伴', note: '复杂逻辑的拆解、SVG 排版的反复打磨,大量来自和它的对话。' },
          claude: { name: 'Claude · Anthropic', role: 'Claude Code', note: '本仓库的脚手架、React 组件层和大部分文件,直接由 Claude Code 写出。' }
        }
      },
      dock: {
        lang: '切换语言',
        bg: '切换背景',
        top: '回到顶部'
      },
      footer: '用 ♥ 在武汉构建'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh',
    supportedLngs: ['zh', 'en'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;

export const isLocale = (v: string): v is 'zh' | 'en' => v === 'zh' || v === 'en';
