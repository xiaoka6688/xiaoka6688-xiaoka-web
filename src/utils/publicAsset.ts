/**
 * 为 public/ 目录下的静态资源自动添加 Vite base 前缀。
 *
 * - 开发模式 (base='/')：原样返回
 * - 生产构建 (base='/xiaoka6688-xiaoka-web/')：自动拼接前缀
 * - data:/blob:/http(s):/协议 URL 原样返回（如用户上传的 base64 头像）
 *
 * @example
 * publicAsset('/projects/ai-brand-kit/hero.png')
 * // dev  => '/projects/ai-brand-kit/hero.png'
 * // prod => '/xiaoka6688-xiaoka-web/projects/ai-brand-kit/hero.png'
 */
export function publicAsset(path: string): string {
  // data: URL、blob: URL、绝对 URL 不处理
  if (/^(data:|blob:|https?:|\/\/)/.test(path)) return path;
  // 去掉开头的 /，再拼接 base（base 末尾带 /）
  const cleanPath = path.replace(/^\//, '');
  const base = import.meta.env.BASE_URL;
  return `${base}${cleanPath}`;
}
