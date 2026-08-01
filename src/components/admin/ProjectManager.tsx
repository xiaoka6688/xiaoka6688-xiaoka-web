import { useState, useEffect, useMemo } from 'react';
import { dataService } from '../../services/DataService';
import { type ProjectTemplate, type FeatureTemplate, createEmptyProject, createEmptyFeature, generateSlug } from '../../types/admin';
import { type ProjectWithSource, mergeProjects, copyStaticProject } from '../../utils/adminHelpers';
import { ImageUploader } from './ImageUploader';

export function ProjectManager() {
  const [customProjects, setCustomProjects] = useState<ProjectTemplate[]>([]);
  const [editingProject, setEditingProject] = useState<ProjectTemplate | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    setCustomProjects(dataService.getProjects());
  };

  const allProjects: ProjectWithSource[] = useMemo(() => {
    return mergeProjects(customProjects);
  }, [customProjects]);

  const handleCreate = () => {
    const newProject = createEmptyProject();
    // 默认添加4个空功能特性
    newProject.features = [
      createEmptyFeature(),
      createEmptyFeature(),
      createEmptyFeature(),
      createEmptyFeature(),
    ];
    setEditingProject(newProject);
    setIsCreating(true);
  };

  const handleEditStatic = (project: ProjectWithSource) => {
    const copied = copyStaticProject(project);
    // 确保有4个功能特性
    while (copied.features.length < 4) {
      copied.features.push(createEmptyFeature());
    }
    setEditingProject(copied);
    setIsCreating(false);
  };

  const handleEditCustom = (project: ProjectWithSource) => {
    const editable = { ...project };
    // 确保有4个功能特性
    while (editable.features.length < 4) {
      editable.features.push(createEmptyFeature());
    }
    setEditingProject(editable);
    setIsCreating(false);
  };

  const handleSave = () => {
    if (!editingProject) return;
    if (!editingProject.slug && editingProject.name) {
      editingProject.slug = generateSlug(editingProject.name);
    }
    // 过滤掉空的功能特性
    editingProject.features = editingProject.features.filter(
      (f) => f.title || f.description || f.image
    );
    dataService.saveProject(editingProject);
    loadProjects();
    setEditingProject(null);
    setIsCreating(false);
  };

  const handleCancel = () => {
    setEditingProject(null);
    setIsCreating(false);
  };

  const updateEditing = (updates: Partial<ProjectTemplate>) => {
    if (editingProject) {
      setEditingProject({ ...editingProject, ...updates });
    }
  };

  // 更新功能特性
  const updateFeature = (index: number, updates: Partial<FeatureTemplate>) => {
    if (!editingProject) return;
    const newFeatures = [...editingProject.features];
    newFeatures[index] = { ...newFeatures[index], ...updates };
    updateEditing({ features: newFeatures });
  };

  const fieldCls =
    'w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-text outline-none transition-colors focus:border-accent/60 focus:bg-white/10';
  const labelCls = 'mb-1.5 block text-[11px] font-medium uppercase tracking-[0.18em] text-muted';
  const btnCls =
    'inline-flex items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/5 px-3 py-2 text-xs font-semibold text-text transition-all hover:border-accent/60 hover:bg-white/10';

  return (
    <div className="space-y-4">
      {/* 数据统计 */}
      <div className="flex gap-4 text-xs text-muted">
        <span>静态项目: {allProjects.filter((p) => p.source === 'static').length}</span>
        <span>自定义项目: {allProjects.filter((p) => p.source === 'custom').length}</span>
      </div>

      {/* 项目列表 */}
      <div className="space-y-2">
        {allProjects.length === 0 ? (
          <p className="text-center text-sm text-muted py-8">
            暂无项目，点击下方按钮添加
          </p>
        ) : (
          allProjects.map((project) => (
            <div
              key={project.id}
              className={`flex items-center gap-3 rounded-lg border p-3 transition-colors ${
                editingProject?.id === project.id
                  ? 'border-accent/50 bg-accent/5'
                  : project.source === 'static'
                  ? 'border-white/10 bg-white/[0.01] hover:bg-white/[0.03]'
                  : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04]'
              }`}
            >
              {/* 缩略图 */}
              <div className="h-10 w-10 shrink-0 rounded overflow-hidden bg-white/5">
                {project.heroImage ? (
                  <img src={project.heroImage} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-[10px] text-muted">无图</div>
                )}
              </div>

              {/* 信息 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-text truncate">
                    {project.name || '未命名项目'}
                  </span>
                  <span
                    className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-medium ${
                      project.source === 'static'
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}
                  >
                    {project.source === 'static' ? '静态' : '自定义'}
                  </span>
                </div>
                <div className="text-[11px] text-muted truncate">
                  {project.tagline || '暂无简介'}
                </div>
              </div>

              {/* 状态 */}
              <div className="shrink-0">
                {project.visible ? (
                  <span className="text-[10px] text-emerald-400">显示</span>
                ) : (
                  <span className="text-[10px] text-muted">隐藏</span>
                )}
              </div>

              {/* 操作按钮 */}
              <div className="shrink-0">
                {project.source === 'static' ? (
                  <button
                    onClick={() => handleEditStatic(project)}
                    className="p-1.5 rounded hover:bg-white/10 text-muted hover:text-accent"
                    title="复制并编辑"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditCustom(project)}
                    className="p-1.5 rounded hover:bg-white/10 text-muted hover:text-text"
                    title="编辑"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 新增按钮 */}
      {!editingProject && (
        <button onClick={handleCreate} className={btnCls + ' w-full'}>
          + 新增项目
        </button>
      )}

      {/* 编辑表单 */}
      {editingProject && (
        <div className="rounded-lg border border-white/10 bg-black/20 p-4 space-y-5">
          <h4 className="text-sm font-bold text-text">
            {isCreating ? '新增项目' : '编辑项目'}
          </h4>

          {/* 基础信息 */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelCls}>项目名称 *</label>
              <input
                className={fieldCls}
                value={editingProject.name}
                onChange={(e) => updateEditing({ name: e.target.value })}
                placeholder="输入项目名称"
              />
            </div>
            <div>
              <label className={labelCls}>Slug (URL标识)</label>
              <input
                className={fieldCls}
                value={editingProject.slug}
                onChange={(e) => updateEditing({ slug: e.target.value })}
                placeholder="自动生成或手动输入"
              />
            </div>
          </div>

          <div>
            <label className={labelCls}>一句话简介</label>
            <input
              className={fieldCls}
              value={editingProject.tagline}
              onChange={(e) => updateEditing({ tagline: e.target.value })}
              placeholder="简短描述项目"
            />
          </div>

          <div>
            <label className={labelCls}>详细描述</label>
            <textarea
              className={fieldCls + ' min-h-[80px]'}
              value={editingProject.description}
              onChange={(e) => updateEditing({ description: e.target.value })}
              placeholder="详细描述项目功能和特点"
            />
          </div>

          {/* 主图上传 */}
          <div>
            <label className={labelCls}>主图（项目卡片展示）</label>
            <ImageUploader
              value={editingProject.heroImage}
              onChange={(url) => updateEditing({ heroImage: url })}
              aspectRatio="2/1"
            />
          </div>

          {/* 标签和技栈 */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelCls}>标签 (逗号分隔)</label>
              <input
                className={fieldCls}
                value={editingProject.tags.join(', ')}
                onChange={(e) =>
                  updateEditing({
                    tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                  })
                }
                placeholder="React, TypeScript, AI"
              />
            </div>
            <div>
              <label className={labelCls}>技术栈 (逗号分隔)</label>
              <input
                className={fieldCls}
                value={editingProject.techStack.join(', ')}
                onChange={(e) =>
                  updateEditing({
                    techStack: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                  })
                }
                placeholder="React, Vite, Tailwind"
              />
            </div>
          </div>

          {/* 链接 */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelCls}>GitHub 链接</label>
              <input
                className={fieldCls}
                value={editingProject.githubUrl || ''}
                onChange={(e) => updateEditing({ githubUrl: e.target.value })}
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label className={labelCls}>在线地址</label>
              <input
                className={fieldCls}
                value={editingProject.liveUrl || ''}
                onChange={(e) => updateEditing({ liveUrl: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>

          {/* 功能特性编辑 */}
          <div className="border-t border-white/10 pt-5">
            <h4 className={labelCls + ' mb-4'}>功能特性（详情页展示）</h4>
            <div className="space-y-4">
              {editingProject.features.slice(0, 4).map((feature, index) => (
                <div
                  key={feature.id}
                  className="rounded-lg border border-white/10 bg-white/[0.02] p-3 space-y-3"
                >
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <span className="font-bold text-accent">0{index + 1}</span>
                    <span>功能特性 {index + 1}</span>
                  </div>

                  <input
                    className={fieldCls}
                    value={feature.title}
                    onChange={(e) => updateFeature(index, { title: e.target.value })}
                    placeholder="功能标题"
                  />

                  <textarea
                    className={fieldCls + ' min-h-[60px]'}
                    value={feature.description}
                    onChange={(e) => updateFeature(index, { description: e.target.value })}
                    placeholder="功能描述"
                  />

                  <div>
                    <label className="text-[10px] text-muted mb-1 block">功能截图</label>
                    <ImageUploader
                      value={feature.image}
                      onChange={(url) => updateFeature(index, { image: url })}
                      aspectRatio="16/9"
                      maxWidth={600}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 显示状态 */}
          <div className="border-t border-white/10 pt-4 flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={editingProject.visible}
                onChange={(e) => updateEditing({ visible: e.target.checked })}
                className="accent-[var(--accent,#7C3AED)]"
              />
              <span className="text-sm text-text">在页面上显示此项目</span>
            </label>
            <span className="text-[11px] text-muted">
              {editingProject.visible ? '项目将在首页展示' : '项目已隐藏，不会在首页展示'}
            </span>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-2 pt-2">
            <button onClick={handleSave} className={btnCls + ' flex-1'}>
              保存
            </button>
            <button onClick={handleCancel} className={btnCls + ' flex-1'}>
              取消
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
