import { useRef, type ChangeEvent } from 'react';
import { dataService } from '../../services/DataService';

export function DataTransfer() {
  const fileRef = useRef<HTMLInputElement>(null);

  const btnCls =
    'inline-flex items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/5 px-3 py-2 text-xs font-semibold text-text transition-all hover:border-accent/60 hover:bg-white/10';

  // 导出数据
  const handleExport = () => {
    const data = dataService.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `xiaoka-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // 导入数据
  const handleImport = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        dataService.importData(reader.result as string);
        alert('数据导入成功！页面将刷新以加载新数据。');
        window.location.reload();
      } catch (err) {
        alert('导入失败：数据格式错误');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // 清空数据
  const handleClear = () => {
    if (confirm('确定要清空所有自定义数据吗？此操作不可恢复。')) {
      dataService.clearAll();
      alert('数据已清空！页面将刷新。');
      window.location.reload();
    }
  };

  // 获取当前数据统计
  const projects = dataService.getProjects();
  const services = dataService.getServices();

  return (
    <div className="space-y-6">
      {/* 数据统计 */}
      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
        <h4 className="text-sm font-bold text-text mb-3">当前数据</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{projects.length}</div>
            <div className="text-xs text-muted">自定义项目</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{services.length}</div>
            <div className="text-xs text-muted">自定义服务</div>
          </div>
        </div>
      </div>

      {/* 导出 */}
      <div className="space-y-2">
        <h4 className="text-sm font-bold text-text">导出数据</h4>
        <p className="text-xs text-muted">
          将所有自定义数据导出为 JSON 文件，可用于备份或迁移到其他设备。
        </p>
        <button onClick={handleExport} className={btnCls + ' w-full'}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          导出 JSON 文件
        </button>
      </div>

      {/* 导入 */}
      <div className="space-y-2">
        <h4 className="text-sm font-bold text-text">导入数据</h4>
        <p className="text-xs text-muted">
          从 JSON 文件导入数据。导入将覆盖当前数据，请先导出备份。
        </p>
        <button onClick={() => fileRef.current?.click()} className={btnCls + ' w-full'}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          选择 JSON 文件导入
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleImport}
        />
      </div>

      {/* 清空 */}
      <div className="space-y-2">
        <h4 className="text-sm font-bold text-text">清空数据</h4>
        <p className="text-xs text-muted">
          清空所有自定义数据，恢复为默认静态数据。此操作不可恢复。
        </p>
        <button onClick={handleClear} className={btnCls + ' w-full border-red-500/30 hover:border-red-500/60 hover:bg-red-500/10'}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
          清空所有自定义数据
        </button>
      </div>
    </div>
  );
}
