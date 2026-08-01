import { useState, useEffect } from 'react';
import { dataService } from '../../services/DataService';
import {
  type ContactConfig,
  type ContactMethodTemplate,
  defaultContactConfig,
  createEmptyContactMethod,
} from '../../types/admin';

const CONTACT_TYPE_OPTIONS = [
  { value: 'email', label: '邮箱' },
  { value: 'github', label: 'GitHub' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'wechat', label: '微信' },
  { value: 'link', label: '其他链接' },
];

export function ContactManager() {
  const [config, setConfig] = useState<ContactConfig>(defaultContactConfig);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = () => {
    const saved = dataService.getContactConfig();
    if (saved) {
      setConfig(saved);
    }
  };

  const handleSave = () => {
    dataService.saveContactConfig(config);
    setIsEditing(false);
    // 触发页面刷新
    window.dispatchEvent(new Event('contact-config-updated'));
  };

  const handleReset = () => {
    if (confirm('确定要恢复默认联系信息吗？')) {
      setConfig(defaultContactConfig);
      dataService.saveContactConfig(defaultContactConfig);
      setIsEditing(false);
      window.dispatchEvent(new Event('contact-config-updated'));
    }
  };

  const updateConfig = (updates: Partial<ContactConfig>) => {
    setConfig({ ...config, ...updates });
  };

  // 添加联系方式
  const addMethod = () => {
    const newMethod = createEmptyContactMethod();
    updateConfig({ methods: [...config.methods, newMethod] });
  };

  // 更新联系方式
  const updateMethod = (id: string, updates: Partial<ContactMethodTemplate>) => {
    const newMethods = config.methods.map((m) =>
      m.id === id ? { ...m, ...updates } : m
    );
    updateConfig({ methods: newMethods });
  };

  // 删除联系方式
  const removeMethod = (id: string) => {
    if (config.methods.length <= 1) {
      alert('至少保留一个联系方式');
      return;
    }
    updateConfig({ methods: config.methods.filter((m) => m.id !== id) });
  };

  const fieldCls =
    'w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-text outline-none transition-colors focus:border-accent/60 focus:bg-white/10';
  const labelCls = 'mb-1.5 block text-[11px] font-medium uppercase tracking-[0.18em] text-muted';
  const btnCls =
    'inline-flex items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/5 px-3 py-2 text-xs font-semibold text-text transition-all hover:border-accent/60 hover:bg-white/10';

  return (
    <div className="space-y-4">
      {/* 当前配置预览 */}
      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
        <h4 className="text-sm font-bold text-text mb-3">当前联系信息</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-muted w-16">名称</span>
            <span className="text-text">{config.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted w-16">角色</span>
            <span className="text-text">{config.role}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted w-16">邮箱</span>
            <span className="text-text">{config.primaryEmail}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted w-16">联系方式</span>
            <span className="text-text">{config.methods.filter(m => m.visible).length} 个</span>
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      {!isEditing ? (
        <div className="flex gap-2">
          <button onClick={() => setIsEditing(true)} className={btnCls + ' flex-1'}>
            编辑联系信息
          </button>
          <button onClick={handleReset} className={btnCls}>
            恢复默认
          </button>
        </div>
      ) : (
        <div className="rounded-lg border border-white/10 bg-black/20 p-4 space-y-4">
          <h4 className="text-sm font-bold text-text">编辑联系信息</h4>

          {/* 基本信息 */}
          <div>
            <label className={labelCls}>显示名称</label>
            <input
              className={fieldCls}
              value={config.name}
              onChange={(e) => updateConfig({ name: e.target.value })}
              placeholder="你的名字"
            />
          </div>

          <div>
            <label className={labelCls}>角色/职位</label>
            <input
              className={fieldCls}
              value={config.role}
              onChange={(e) => updateConfig({ role: e.target.value })}
              placeholder="AI实战派布道者 · 武汉"
            />
          </div>

          <div>
            <label className={labelCls}>个人描述</label>
            <textarea
              className={fieldCls + ' min-h-[60px]'}
              value={config.description}
              onChange={(e) => updateConfig({ description: e.target.value })}
              placeholder="简短的个人介绍"
            />
          </div>

          <div>
            <label className={labelCls}>主要邮箱</label>
            <input
              className={fieldCls}
              value={config.primaryEmail}
              onChange={(e) => updateConfig({ primaryEmail: e.target.value })}
              placeholder="your@email.com"
            />
          </div>

          {/* 联系方式列表 */}
          <div className="border-t border-white/10 pt-4">
            <div className="flex items-center justify-between mb-3">
              <label className={labelCls + ' mb-0'}>联系方式</label>
              <button onClick={addMethod} className={btnCls + ' text-[10px]'}>
                + 添加
              </button>
            </div>

            <div className="space-y-3">
              {config.methods.map((method) => (
                <div
                  key={method.id}
                  className="rounded-lg border border-white/10 bg-white/[0.02] p-3 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <select
                      className={fieldCls + ' w-24'}
                      value={method.type}
                      onChange={(e) => updateMethod(method.id, { type: e.target.value as any })}
                    >
                      {CONTACT_TYPE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <input
                      className={fieldCls + ' flex-1'}
                      value={method.label}
                      onChange={(e) => updateMethod(method.id, { label: e.target.value })}
                      placeholder="显示名称"
                    />
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={method.visible}
                        onChange={(e) => updateMethod(method.id, { visible: e.target.checked })}
                        className="accent-[var(--accent,#7C3AED)]"
                      />
                      <span className="text-[10px] text-muted">显示</span>
                    </label>
                    <button
                      onClick={() => removeMethod(method.id)}
                      className="p-1 rounded hover:bg-red-500/20 text-muted hover:text-red-400"
                      title="删除"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      className={fieldCls + ' flex-1'}
                      value={method.value}
                      onChange={(e) => updateMethod(method.id, { value: e.target.value })}
                      placeholder="显示值（如 @username）"
                    />
                    <input
                      className={fieldCls + ' flex-1'}
                      value={method.href}
                      onChange={(e) => updateMethod(method.id, { href: e.target.value })}
                      placeholder="链接地址"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-2 pt-2">
            <button onClick={handleSave} className={btnCls + ' flex-1'}>
              保存
            </button>
            <button onClick={() => { setIsEditing(false); loadConfig(); }} className={btnCls + ' flex-1'}>
              取消
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
