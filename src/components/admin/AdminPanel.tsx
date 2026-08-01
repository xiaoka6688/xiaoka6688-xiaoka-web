import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProjectManager } from './ProjectManager';
import { ServiceManager } from './ServiceManager';
import { DataTransfer } from './DataTransfer';

type TabKey = 'projects' | 'services' | 'data';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'projects', label: '项目管理' },
  { key: 'services', label: '服务管理' },
  { key: 'data', label: '数据导入导出' },
];

export function AdminPanel() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabKey>('projects');

  return (
    <div className="rounded-2xl border border-white/10 bg-surface/60 backdrop-blur-md overflow-hidden">
      {/* 标题栏 */}
      <div className="px-5 py-4 border-b border-white/10">
        <h3 className="text-base font-bold text-text">自定义管理</h3>
        <p className="mt-1 text-[11px] text-muted">
          管理项目和服务内容 · 实时预览 · 数据本地存储
        </p>
      </div>

      {/* Tab 切换 */}
      <div className="flex border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 px-4 py-3 text-xs font-medium transition-colors ${
              activeTab === tab.key
                ? 'text-accent border-b-2 border-accent bg-white/5'
                : 'text-muted hover:text-text hover:bg-white/[0.02]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 内容区域 */}
      <div className="p-5">
        {activeTab === 'projects' && <ProjectManager />}
        {activeTab === 'services' && <ServiceManager />}
        {activeTab === 'data' && <DataTransfer />}
      </div>
    </div>
  );
}
