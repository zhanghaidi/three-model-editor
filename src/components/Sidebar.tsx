import { BulbOutlined, CameraOutlined, SettingOutlined, TagsOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';

import { useSidebarResize } from '@/hooks/useSidebarResize';

import SidebarProject from './SidebarProject';
import SidebarProperties from './SidebarProperties';
import SidebarScene from './SidebarScene';
import SidebarSettings from './SidebarSettings';
import SidebarTags from './SidebarTags';

export default function Sidebar() {
  const { sidebarWidth, startResizing } = useSidebarResize(); // 🎯 使用 Hook

  return (
    <div className="sidebar" style={{ width: `${sidebarWidth}px` }}>
      {/* ✅ 拖拽调整宽度 */}
      <div className="resize-handle" onPointerDown={startResizing}></div>
      <Tabs
        className="sidebar-tabs"
        tabBarStyle={{ marginBottom: 1 }}
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
              <div>
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
              <div>
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
              <div>
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
              <div>
                <SidebarSettings />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
