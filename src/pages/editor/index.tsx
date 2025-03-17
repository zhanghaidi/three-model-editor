import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Viewport from '@/components/Viewport';

export default function Editor() {
  return (
    <div className="relative h-screen w-screen">
      {/* ✅ 顶部导航 */}
      <Header />

      <div className="flex h-[calc(100vh-50px)]">
        {/* ✅ 视口区域 */}
        <div className="flex-1">
          <Viewport />
        </div>

        {/* ✅ 侧边栏 */}
        <Sidebar />
      </div>
    </div>
  );
}
