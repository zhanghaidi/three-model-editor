import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Viewport from '@/components/Viewport';

export default function Editor() {
  return (
    <div className="h-screen flex flex-col">
      {/* 顶部导航 */}
      <Header />

      {/* 主要内容区域 */}
      <div className="flex flex-1">
        {/* 视口区域 */}
        <Viewport />

        {/* 侧边栏 */}
        <Sidebar />
      </div>
    </div>
  );
}
