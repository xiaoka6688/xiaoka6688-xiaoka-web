import { useState } from 'react';
import CardEditor from '../reactbits/Components/Lanyard/CardEditor';
import { useCardConfig } from '../../contexts/CardConfigContext';
import { ContactManager } from './ContactManager';

type TabKey = 'card' | 'info';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'card', label: '工牌编辑' },
  { key: 'info', label: '联系信息' },
];

export function ContactSectionManager() {
  const { cardConfig, setCardConfig, resetCardConfig } = useCardConfig();
  const [activeTab, setActiveTab] = useState<TabKey>('card');

  return (
    <div className="rounded-2xl border border-white/10 bg-surface/60 backdrop-blur-md overflow-hidden">
      {/* 标题栏 */}
      <div className="px-5 py-4 border-b border-white/10">
        <h3 className="text-base font-bold text-text">联系板块配置</h3>
        <p className="mt-1 text-[11px] text-muted">
          编辑工牌样式和联系信息
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
        {activeTab === 'card' && (
          <CardEditor
            config={cardConfig}
            onChange={setCardConfig}
            onReset={resetCardConfig}
          />
        )}
        {activeTab === 'info' && <ContactManager />}
      </div>
    </div>
  );
}
