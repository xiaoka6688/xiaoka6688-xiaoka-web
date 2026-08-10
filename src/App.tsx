import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { BackgroundProvider } from './components/BackgroundSwitcher';
import { CardConfigProvider } from './contexts/CardConfigContext';
import { SiteNav } from './components/layout/SiteNav';
import { HomePage } from './pages/HomePage';

// 路由级代码分割：项目详情页和致谢页按需加载，减少首屏 JS 体积
const ProjectDetailPage = lazy(() =>
  import('./pages/ProjectDetailPage').then((m) => ({ default: m.ProjectDetailPage }))
);
const CreditsPage = lazy(() =>
  import('./pages/CreditsPage').then((m) => ({ default: m.CreditsPage }))
);

const PageFallback = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/60" />
  </div>
);

const App = () => (
  <BackgroundProvider>
    <CardConfigProvider>
      <SiteNav />
      <main className="relative z-10">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/credits" element={<CreditsPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </main>
    </CardConfigProvider>
  </BackgroundProvider>
);

export default App;
