import { useEffect } from 'react';

import Menubar from '@/components/Menubar';
import Sidebar from '@/components/Sidebar';
import Toolbar from '@/components/Toolbar';
import Viewport from '@/components/Viewport';
import { useThemeStore } from '@/store/themeStore';
import { useUIStore } from '@/store/uiStore';

export default function Editor() {
  const { theme } = useThemeStore();
  const { sidebarWidth } = useUIStore(); // ✅ 监听 Sidebar 宽度变化

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="editor">
      <Menubar />
      <div className="container">
        <Toolbar />
        <div className="viewport" style={{ width: `calc(100% - ${sidebarWidth}px)` }}>
          <Viewport />
        </div>
        <Sidebar />
      </div>
    </div>
  );
}
