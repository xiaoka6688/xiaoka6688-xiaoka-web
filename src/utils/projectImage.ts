import { useState, useEffect } from 'react';
import { publicAsset } from './publicAsset';

const EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp', 'svg'];

/**
 * 项目图片自动适配 Hook
 *
 * 在 public/projects/{slug}/ 目录下放置同名图片（如 hero.png 或 hero.jpg），
 * 自动按 .png -> .jpg -> .jpeg -> .webp -> .svg 顺序尝试加载。
 *
 * 返回值：
 *   - loading: 正在探测中（此时不应该显示 img）
 *   - src: 探测成功的图片 URL
 *   - failed: 所有扩展名都失败
 */
export function useProjectImage(slug: string, name: string): {
  loading: boolean;
  src: string | null;
  failed: boolean;
} {
  const [state, setState] = useState<{
    loading: boolean;
    src: string | null;
    failed: boolean;
  }>({ loading: true, src: null, failed: false });

  useEffect(() => {
    let cancelled = false;
    setState({ loading: true, src: null, failed: false });

    const tryLoad = (index: number) => {
      if (cancelled) return;

      if (index >= EXTENSIONS.length) {
        // 所有扩展名都失败
        setState({ loading: false, src: null, failed: true });
        return;
      }

      const ext = EXTENSIONS[index];
      const url = publicAsset(`/projects/${slug}/${name}.${ext}`);
      const img = new Image();

      img.onload = () => {
        if (!cancelled) {
          setState({ loading: false, src: url, failed: false });
        }
      };

      img.onerror = () => {
        if (!cancelled) {
          // 尝试下一个扩展名
          tryLoad(index + 1);
        }
      };

      img.src = url;
    };

    tryLoad(0);

    return () => {
      cancelled = true;
    };
  }, [slug, name]);

  return state;
}
