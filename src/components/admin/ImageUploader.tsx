import { useRef, type ChangeEvent } from 'react';

interface ImageUploaderProps {
  value: string;
  onChange: (base64: string) => void;
  aspectRatio?: string;
  maxWidth?: number;
}

export function ImageUploader({
  value,
  onChange,
  aspectRatio = '16/9',
  maxWidth = 800,
}: ImageUploaderProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件');
      return;
    }

    // 验证文件大小 (最大 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('图片大小不能超过 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        // 压缩图片
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;

        let width = img.width;
        let height = img.height;

        // 限制最大宽度
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        // 绘制图片
        ctx.drawImage(img, 0, 0, width, height);

        // 转为 base64 (JPEG, 质量 0.8)
        const compressed = canvas.toDataURL('image/jpeg', 0.8);
        onChange(compressed);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);

    // 清空 input 以便重复选择同一文件
    e.target.value = '';
  };

  const handleRemove = () => {
    onChange('');
  };

  const btnCls =
    'inline-flex items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/5 px-3 py-2 text-xs font-semibold text-text transition-all hover:border-accent/60 hover:bg-white/10';

  return (
    <div className="space-y-2">
      {/* 预览区域 */}
      {value ? (
        <div className="relative rounded-lg overflow-hidden border border-white/10 bg-black/20">
          <img
            src={value}
            alt="预览"
            className="w-full h-auto max-h-48 object-contain"
            style={{ aspectRatio }}
          />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            title="移除图片"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileRef.current?.click()}
          className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-white/20 bg-white/[0.02] p-6 cursor-pointer hover:border-accent/50 hover:bg-white/[0.04] transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span className="text-xs text-muted">点击上传图片</span>
          <span className="text-[10px] text-muted/60">支持 JPG、PNG，最大 2MB</span>
        </div>
      )}

      {/* 上传按钮 */}
      <div className="flex gap-2">
        <button
          onClick={() => fileRef.current?.click()}
          className={btnCls + ' flex-1'}
        >
          {value ? '更换图片' : '选择文件'}
        </button>
        {value && (
          <button onClick={handleRemove} className={btnCls}>
            清除
          </button>
        )}
      </div>

      {/* 隐藏的文件输入 */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
}
