import { type ReactNode } from 'react';

interface SectionTitleProps {
  children: ReactNode;
  subtitle?: string;
  className?: string;
}

/**
 * 统一的板块标题组件
 * 用于关于、服务、项目、联系等板块，保持视觉一致性
 */
export const SectionTitle = ({ children, subtitle, className = '' }: SectionTitleProps) => {
  return (
    <div className={`mb-8 ${className}`}>
      <h2 className="text-3xl font-bold text-text md:text-4xl lg:text-5xl tracking-tight">
        {children}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm text-muted md:text-base max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};
