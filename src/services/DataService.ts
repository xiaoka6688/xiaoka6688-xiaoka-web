import {
  type ProjectTemplate,
  type ServiceTemplate,
  type ImageStore,
  type ContactConfig,
  STORAGE_KEYS,
} from '../types/admin';

// 数据访问层 - 统一接口
export interface DataProvider {
  // 项目
  getProjects(): ProjectTemplate[];
  saveProject(project: ProjectTemplate): void;
  deleteProject(id: string): void;
  reorderProjects(ids: string[]): void;

  // 服务
  getServices(): ServiceTemplate[];
  saveService(service: ServiceTemplate): void;
  deleteService(id: string): void;
  reorderServices(ids: string[]): void;

  // 联系信息
  getContactConfig(): ContactConfig | null;
  saveContactConfig(config: ContactConfig): void;

  // 图片
  uploadImage(key: string, base64: string): void;
  getImage(key: string): string | null;
  deleteImage(key: string): void;

  // 导入导出
  exportData(): string;
  importData(json: string): void;
  clearAll(): void;
}

// localStorage 实现
export class LocalStorageProvider implements DataProvider {
  // ========== 项目 ==========
  getProjects(): ProjectTemplate[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  saveProject(project: ProjectTemplate): void {
    const projects = this.getProjects();
    const index = projects.findIndex((p) => p.id === project.id);
    if (index >= 0) {
      projects[index] = { ...project, updatedAt: Date.now() };
    } else {
      projects.push({ ...project, createdAt: Date.now(), updatedAt: Date.now() });
    }
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }

  deleteProject(id: string): void {
    const projects = this.getProjects().filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }

  reorderProjects(ids: string[]): void {
    const projects = this.getProjects();
    const reordered = ids
      .map((id) => projects.find((p) => p.id === id))
      .filter(Boolean) as ProjectTemplate[];
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(reordered));
  }

  // ========== 服务 ==========
  getServices(): ServiceTemplate[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SERVICES);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  saveService(service: ServiceTemplate): void {
    const services = this.getServices();
    const index = services.findIndex((s) => s.id === service.id);
    if (index >= 0) {
      services[index] = { ...service, updatedAt: Date.now() };
    } else {
      services.push({ ...service, createdAt: Date.now(), updatedAt: Date.now() });
    }
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }

  deleteService(id: string): void {
    const services = this.getServices().filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }

  reorderServices(ids: string[]): void {
    const services = this.getServices();
    const reordered = ids
      .map((id) => services.find((s) => s.id === id))
      .filter(Boolean) as ServiceTemplate[];
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(reordered));
  }

  // ========== 联系信息 ==========
  getContactConfig(): ContactConfig | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CONTACT);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  saveContactConfig(config: ContactConfig): void {
    localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(config));
  }

  // ========== 图片 ==========
  uploadImage(key: string, base64: string): void {
    const images = this.getImages();
    images[key] = base64;
    localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(images));
  }

  getImage(key: string): string | null {
    const images = this.getImages();
    return images[key] || null;
  }

  deleteImage(key: string): void {
    const images = this.getImages();
    delete images[key];
    localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(images));
  }

  private getImages(): ImageStore {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.IMAGES);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  // ========== 导入导出 ==========
  exportData(): string {
    return JSON.stringify(
      {
        projects: this.getProjects(),
        services: this.getServices(),
        contact: this.getContactConfig(),
        images: this.getImages(),
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    );
  }

  importData(json: string): void {
    try {
      const data = JSON.parse(json);
      if (data.projects) {
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(data.projects));
      }
      if (data.services) {
        localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(data.services));
      }
      if (data.contact) {
        localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(data.contact));
      }
      if (data.images) {
        localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(data.images));
      }
    } catch (e) {
      throw new Error('导入数据格式错误');
    }
  }

  clearAll(): void {
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.CONTACT);
    localStorage.removeItem(STORAGE_KEYS.IMAGES);
  }
}

// 全局数据服务实例
export const dataService: DataProvider = new LocalStorageProvider();
