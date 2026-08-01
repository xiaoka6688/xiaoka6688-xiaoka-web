import { type ProjectTemplate, type ServiceTemplate, generateId } from '../types/admin';
import { projects, type ProjectDetail } from '../content/projects';
import { services, type ServiceItem } from '../content/services';

// 数据来源标记
export type DataSource = 'static' | 'custom';

// 带来源标记的项目
export interface ProjectWithSource extends ProjectTemplate {
  source: DataSource;
}

// 带来源标记的服务
export interface ServiceWithSource extends ServiceTemplate {
  source: DataSource;
}

// 将静态项目转换为模板格式
export function staticProjectToTemplate(p: ProjectDetail): ProjectTemplate {
  return {
    id: `static-${p.slug}`,
    slug: p.slug,
    name: p.name,
    tagline: p.tagline.zh,
    description: p.description.zh,
    heroImage: p.heroImage,
    features: p.features.map((f, i) => ({
      id: `static-${p.slug}-feature-${i}`,
      title: f.title.zh,
      description: f.description.zh,
      image: f.image,
    })),
    tags: p.tags,
    techStack: p.techStack,
    githubUrl: p.githubUrl,
    liveUrl: p.liveUrl,
    order: 0,
    visible: true,
    createdAt: 0,
    updatedAt: 0,
  };
}

// 将静态服务转换为模板格式
export function staticServiceToTemplate(s: ServiceItem): ServiceTemplate {
  return {
    id: `static-${s.slug}`,
    slug: s.slug,
    name: s.name,
    subtitle: s.subtitle.zh,
    tagline: s.tagline.zh,
    features: s.features.zh,
    tags: s.tags,
    visitUrl: s.visitUrl,
    order: 0,
    visible: true,
    createdAt: 0,
    updatedAt: 0,
  };
}

// 合并静态数据和自定义数据（项目）
export function mergeProjects(customProjects: ProjectTemplate[]): ProjectWithSource[] {
  const customMap = new Map(customProjects.map((p) => [p.slug, p]));
  const result: ProjectWithSource[] = [];

  // 先添加静态数据（如果自定义数据中没有覆盖）
  projects.forEach((p) => {
    if (customMap.has(p.slug)) {
      // 自定义数据覆盖了这个项目
      result.push({ ...customMap.get(p.slug)!, source: 'custom' });
      customMap.delete(p.slug);
    } else {
      // 使用静态数据
      result.push({ ...staticProjectToTemplate(p), source: 'static' });
    }
  });

  // 添加剩余的自定义数据（新增的项目）
  customMap.forEach((p) => {
    result.push({ ...p, source: 'custom' });
  });

  return result;
}

// 合并静态数据和自定义数据（服务）
export function mergeServices(customServices: ServiceTemplate[]): ServiceWithSource[] {
  const customMap = new Map(customServices.map((s) => [s.slug, s]));
  const result: ServiceWithSource[] = [];

  services.forEach((s) => {
    if (customMap.has(s.slug)) {
      result.push({ ...customMap.get(s.slug)!, source: 'custom' });
      customMap.delete(s.slug);
    } else {
      result.push({ ...staticServiceToTemplate(s), source: 'static' });
    }
  });

  customMap.forEach((s) => {
    result.push({ ...s, source: 'custom' });
  });

  return result;
}

// 复制静态项目为自定义项目
export function copyStaticProject(staticProject: ProjectWithSource): ProjectTemplate {
  return {
    ...staticProject,
    id: generateId(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

// 复制静态服务为自定义服务
export function copyStaticService(staticService: ServiceWithSource): ServiceTemplate {
  return {
    ...staticService,
    id: generateId(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}
