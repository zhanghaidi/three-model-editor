import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Viewport from '@/components/Viewport';

export default function Editor() {
  return (
    <div className="h-screen w-screen relative">
      {/* 顶部导航浮动 */}
      <div className="absolute top-0 left-0 w-full z-10">
        <Header />
      </div>

      {/* 侧边栏浮动 */}
      <div className="absolute top-[50px] right-0 h-[calc(100vh-50px)] z-10">
        <Sidebar />
      </div>

      {/* 视口区域全屏 */}
      <Viewport />
    </div>
  );
}
