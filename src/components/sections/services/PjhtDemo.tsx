import { useState, useEffect } from 'react';

// 破局AI创业知识付费平台Demo
interface CourseCategory {
  name: string;
  icon: string;
  count: number;
}

const CATEGORIES: CourseCategory[] = [
  { name: 'AI专区', icon: '🤖', count: 128 },
  { name: '短视频', icon: '📱', count: 96 },
  { name: '精品课程', icon: '🎓', count: 256 },
  { name: '赚钱项目', icon: '💰', count: 85 },
  { name: '爆粉引流', icon: '🔥', count: 72 },
  { name: '电商专区', icon: '🛒', count: 110 },
];

const SAMPLE_COURSES = [
  'AI基础搭建：零基础搞定Claude/GPT注册',
  'AI漫剧制作：剧本→文生图→配音剪辑',
  'TikTok店铺从0到1落地实战',
  'AI短视频一人流量公司',
  '零基础学Cursor！手把手工具初始化',
];

export const PjhtDemo = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [courseIndex, setCourseIndex] = useState(0);
  const [memberCount, setMemberCount] = useState(12680);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % CATEGORIES.length);
      setCourseIndex((prev) => (prev + 1) % SAMPLE_COURSES.length);
      setMemberCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-xs">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[10px] tracking-[0.15em] text-orange-400">
          破局AI创业 · 知识付费平台
        </span>
        <span className="text-[10px] text-muted">
          {memberCount.toLocaleString()} 会员
        </span>
      </div>

      {/* Categories */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {CATEGORIES.map((cat, i) => (
          <span
            key={cat.name}
            className={`rounded-full px-2 py-0.5 text-[10px] transition-all duration-300 ${
              i === activeCategory
                ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                : 'bg-white/5 text-muted border border-white/5'
            }`}
          >
            {cat.icon} {cat.name} ({cat.count})
          </span>
        ))}
      </div>

      {/* Course Card */}
      <div className="rounded-lg border border-white/10 bg-white/5 p-3">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded bg-orange-500/20 px-1.5 py-0.5 text-[9px] text-orange-300">
            会员专享
          </span>
          <span className="rounded bg-blue-500/20 px-1.5 py-0.5 text-[9px] text-blue-300">
            {CATEGORIES[activeCategory].name}
          </span>
        </div>
        <p className="mb-2 text-[11px] leading-relaxed text-text/90">
          {SAMPLE_COURSES[courseIndex]}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-orange-400">¥19.90</span>
            <span className="text-[10px] text-muted line-through">¥199.00</span>
          </div>
          <span className="text-[10px] text-muted">
            {Math.floor(Math.random() * 200 + 600)}人领取
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="text-sm font-bold text-orange-400">500+</div>
          <div className="text-[9px] text-muted">精品课程</div>
        </div>
        <div>
          <div className="text-sm font-bold text-blue-400">50+</div>
          <div className="text-[9px] text-muted">行业导师</div>
        </div>
        <div>
          <div className="text-sm font-bold text-green-400">12k+</div>
          <div className="text-[9px] text-muted">付费会员</div>
        </div>
      </div>
    </div>
  );
};

export default PjhtDemo;
