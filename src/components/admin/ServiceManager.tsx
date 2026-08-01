import { useState, useEffect, useMemo } from 'react';
import { dataService } from '../../services/DataService';
import { type ServiceTemplate, createEmptyService, generateSlug } from '../../types/admin';
import { type ServiceWithSource, mergeServices, copyStaticService } from '../../utils/adminHelpers';

export function ServiceManager() {
  const [customServices, setCustomServices] = useState<ServiceTemplate[]>([]);
  const [editingService, setEditingService] = useState<ServiceTemplate | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = () => {
    setCustomServices(dataService.getServices());
  };

  const allServices: ServiceWithSource[] = useMemo(() => {
    return mergeServices(customServices);
  }, [customServices]);

  const handleCreate = () => {
    setEditingService(createEmptyService());
    setIsCreating(true);
  };

  const handleEditStatic = (service: ServiceWithSource) => {
    const copied = copyStaticService(service);
    setEditingService(copied);
    setIsCreating(false);
  };

  const handleEditCustom = (service: ServiceWithSource) => {
    setEditingService({ ...service });
    setIsCreating(false);
  };

  const handleSave = () => {
    if (!editingService) return;
    if (!editingService.slug && editingService.name) {
      editingService.slug = generateSlug(editingService.name);
    }
    dataService.saveService(editingService);
    loadServices();
    setEditingService(null);
    setIsCreating(false);
  };

  const handleCancel = () => {
    setEditingService(null);
    setIsCreating(false);
  };

  const updateEditing = (updates: Partial<ServiceTemplate>) => {
    if (editingService) {
      setEditingService({ ...editingService, ...updates });
    }
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
        <span>静态服务: {allServices.filter((s) => s.source === 'static').length}</span>
        <span>自定义服务: {allServices.filter((s) => s.source === 'custom').length}</span>
      </div>

      {/* 服务列表 */}
      <div className="space-y-2">
        {allServices.length === 0 ? (
          <p className="text-center text-sm text-muted py-8">
            暂无服务，点击下方按钮添加
          </p>
        ) : (
          allServices.map((service) => (
            <div
              key={service.id}
              className={`flex items-center gap-3 rounded-lg border p-3 transition-colors ${
                editingService?.id === service.id
                  ? 'border-accent/50 bg-accent/5'
                  : service.source === 'static'
                  ? 'border-white/10 bg-white/[0.01] hover:bg-white/[0.03]'
                  : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-text truncate">
                    {service.name || '未命名服务'}
                  </span>
                  <span
                    className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-medium ${
                      service.source === 'static'
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}
                  >
                    {service.source === 'static' ? '静态' : '自定义'}
                  </span>
                </div>
                <div className="text-[11px] text-muted truncate">
                  {service.subtitle || '暂无副标题'}
                </div>
              </div>
              <div className="shrink-0">
                {service.visible ? (
                  <span className="text-[10px] text-emerald-400">显示</span>
                ) : (
                  <span className="text-[10px] text-muted">隐藏</span>
                )}
              </div>
              <div className="shrink-0">
                {service.source === 'static' ? (
                  <button
                    onClick={() => handleEditStatic(service)}
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
                    onClick={() => handleEditCustom(service)}
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
      {!editingService && (
        <button onClick={handleCreate} className={btnCls + ' w-full'}>
          + 新增服务
        </button>
      )}

      {/* 编辑表单 */}
      {editingService && (
        <div className="rounded-lg border border-white/10 bg-black/20 p-4 space-y-4">
          <h4 className="text-sm font-bold text-text">
            {isCreating ? '新增服务' : '编辑服务'}
          </h4>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelCls}>服务名称 *</label>
              <input
                className={fieldCls}
                value={editingService.name}
                onChange={(e) => updateEditing({ name: e.target.value })}
                placeholder="输入服务名称"
              />
            </div>
            <div>
              <label className={labelCls}>Slug (URL标识)</label>
              <input
                className={fieldCls}
                value={editingService.slug}
                onChange={(e) => updateEditing({ slug: e.target.value })}
                placeholder="自动生成或手动输入"
              />
            </div>
          </div>

          <div>
            <label className={labelCls}>副标题</label>
            <input
              className={fieldCls}
              value={editingService.subtitle}
              onChange={(e) => updateEditing({ subtitle: e.target.value })}
              placeholder="简短的功能描述"
            />
          </div>

          <div>
            <label className={labelCls}>一句话简介</label>
            <input
              className={fieldCls}
              value={editingService.tagline}
              onChange={(e) => updateEditing({ tagline: e.target.value })}
              placeholder="详细描述服务"
            />
          </div>

          <div>
            <label className={labelCls}>功能特点 (3条，每行一条)</label>
            <textarea
              className={fieldCls + ' min-h-[80px]'}
              value={editingService.features.join('\n')}
              onChange={(e) =>
                updateEditing({
                  features: e.target.value.split('\n').filter(Boolean),
                })
              }
              placeholder="功能特点1&#10;功能特点2&#10;功能特点3"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelCls}>标签 (逗号分隔)</label>
              <input
                className={fieldCls}
                value={editingService.tags.join(', ')}
                onChange={(e) =>
                  updateEditing({
                    tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                  })
                }
                placeholder="AI, 工具, 在线"
              />
            </div>
            <div>
              <label className={labelCls}>访问链接</label>
              <input
                className={fieldCls}
                value={editingService.visitUrl || ''}
                onChange={(e) => updateEditing({ visitUrl: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>

          {/* 显示状态 */}
          <div className="border-t border-white/10 pt-4 flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={editingService.visible}
                onChange={(e) => updateEditing({ visible: e.target.checked })}
                className="accent-[var(--accent,#7C3AED)]"
              />
              <span className="text-sm text-text">在页面上显示此服务</span>
            </label>
            <span className="text-[11px] text-muted">
              {editingService.visible ? '服务将在页面展示' : '服务已隐藏，不会在页面展示'}
            </span>
          </div>

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
