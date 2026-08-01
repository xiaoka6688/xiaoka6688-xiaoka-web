// 自定义管理后台数据类型

export interface ProjectTemplate {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  features: FeatureTemplate[];
  tags: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  order: number;
  visible: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface FeatureTemplate {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ServiceTemplate {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  features: string[];
  tags: string[];
  visitUrl?: string;
  order: number;
  visible: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface ImageStore {
  [key: string]: string;
}

// localStorage 存储键
export const STORAGE_KEYS = {
  PROJECTS: 'xiaoka-admin-projects-v1',
  SERVICES: 'xiaoka-admin-services-v1',
  IMAGES: 'xiaoka-admin-images-v1',
  CONTACT: 'xiaoka-admin-contact-v1',
} as const;

// 生成唯一ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// 生成 slug
export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// 创建空项目模板
export const createEmptyProject = (): ProjectTemplate => ({
  id: generateId(),
  slug: '',
  name: '',
  tagline: '',
  description: '',
  heroImage: '',
  features: [],
  tags: [],
  techStack: [],
  githubUrl: '',
  liveUrl: '',
  order: Date.now(),
  visible: true,
  createdAt: Date.now(),
  updatedAt: Date.now(),
});

// 创建空功能模板
export const createEmptyFeature = (): FeatureTemplate => ({
  id: generateId(),
  title: '',
  description: '',
  image: '',
});

// 创建空服务模板
export const createEmptyService = (): ServiceTemplate => ({
  id: generateId(),
  slug: '',
  name: '',
  subtitle: '',
  tagline: '',
  features: ['', '', ''],
  tags: [],
  visitUrl: '',
  order: Date.now(),
  visible: true,
  createdAt: Date.now(),
  updatedAt: Date.now(),
});

// 联系方式
export interface ContactMethodTemplate {
  id: string;
  label: string;
  value: string;
  href: string;
  type: 'email' | 'github' | 'instagram' | 'twitter' | 'wechat' | 'link';
  visible: boolean;
}

// 联系信息配置
export interface ContactConfig {
  name: string;
  role: string;
  description: string;
  methods: ContactMethodTemplate[];
  primaryEmail: string;
}

// 默认联系信息
export const defaultContactConfig: ContactConfig = {
  name: '小卡',
  role: 'AI实战派布道者 · 武汉',
  description: 'AI实战派布道者，专注AI智能体开发与AIGC实战应用。无论是项目合作、技术交流还是AI培训，欢迎随时联系。',
  methods: [
    {
      id: 'email',
      label: '邮箱',
      value: '422970338@qq.com',
      href: 'mailto:422970338@qq.com',
      type: 'email',
      visible: true,
    },
    {
      id: 'github',
      label: 'GitHub',
      value: '@xiaoka6688',
      href: 'https://github.com/xiaoka6688',
      type: 'github',
      visible: true,
    },
    {
      id: 'wechat-official',
      label: '公众号',
      value: '小卡AI',
      href: 'https://mp.weixin.qq.com/s/-GTXF73a0743izb6ErzWxA',
      type: 'wechat',
      visible: true,
    },
    {
      id: 'wechat-official-2',
      label: '公众号',
      value: '破局AI项目圈',
      href: 'https://mp.weixin.qq.com/s/O-GFy2uHs-iTvNZo6cxLqg',
      type: 'wechat',
      visible: true,
    },
  ],
  primaryEmail: '422970338@qq.com',
};

// 创建空联系方式
export const createEmptyContactMethod = (): ContactMethodTemplate => ({
  id: generateId(),
  label: '',
  value: '',
  href: '',
  type: 'link',
  visible: true,
});
