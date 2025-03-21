import { BulbOutlined, CameraOutlined, SettingOutlined, TagsOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { useRef } from 'react';

import { useUIStore } from '@/store/uiStore';

import SidebarProject from './SidebarProject';
import SidebarProperties from './SidebarProperties';
import SidebarScene from './SidebarScene';
import SidebarSettings from './SidebarSettings';
import SidebarTags from './SidebarTags';

export default function Sidebar() {
  const { sidebarWidth, setSidebarWidth } = useUIStore();
  const isResizing = useRef(false);

  const startResizing = () => {
    isResizing.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none'; // ✅ 禁止文本选中

    // ✅ 绑定事件
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopResizing);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;
    e.preventDefault(); // ✅ 防止默认拖拽手势

    const newWidth = Math.max(250, Math.min(600, window.innerWidth - e.clientX));
    setSidebarWidth(newWidth);
  };

  const stopResizing = () => {
    setTimeout(() => (isResizing.current = false), 0); // ✅ 防止事件竞争问题
    document.body.style.cursor = 'default';
    document.body.style.userSelect = ''; // ✅ 允许文本选中

    // ✅ 确保事件被移除
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', stopResizing);
  };

  return (
    <div className="sidebar" style={{ width: `${sidebarWidth}px` }}>
      {/* ✅ 拖拽调整宽度 */}
      <div className="resize-handle" onMouseDown={startResizing}></div>
      <div>
        <Tabs
          defaultActiveKey="scene"
          type="card"
          items={[
            {
              key: 'scene',
              label: (
                <>
                  <CameraOutlined /> 场景
                </>
              ),
              children: (
                <div className="sidebar-content">
                  <SidebarScene />
                  <SidebarProperties />
                </div>
              ),
            },
            {
              key: 'tags',
              label: (
                <>
                  <TagsOutlined /> 标签
                </>
              ),
              children: (
                <div className="sidebar-content">
                  <SidebarTags />
                </div>
              ),
            },

            {
              key: 'project',
              label: (
                <>
                  <BulbOutlined /> 项目
                </>
              ),
              children: (
                <div className="sidebar-content">
                  <SidebarProject />
                </div>
              ),
            },
            {
              key: 'settings',
              label: (
                <>
                  <SettingOutlined />
                  设置
                </>
              ),
              children: (
                <div className="sidebar-content">
                  <SidebarSettings />
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
