import {
  EnvironmentOutlined,
  BulbOutlined,
  BgColorsOutlined,
  PlayCircleOutlined,
  CameraOutlined,
} from '@ant-design/icons';
import { Card, Slider, Tabs } from 'antd';

import BackgroundSettings from './BackgroundSettings';
import MaterialList from './MaterialList';
import AnimationControls from './SidebarAnimation';
import SliderbarLight from './SidebarLight';

const Sidebar: React.FC = () => {
  return (
    <aside
      className="fixed right-0 top-[50px] h-[calc(100vh-50px)] bg-gray-100 text-gray-900 shadow-md border-l border-gray-300 overflow-y-auto flex flex-col"
      style={{ width: '300px' }}
    >
      {/* ✅ 使用 items 方式替换 Tabs.TabPane */}
      <Tabs
        defaultActiveKey="background"
        className="flex-1 flex flex-col"
        tabBarGutter={8}
        style={{ padding: '0 8px' }}
        tabBarStyle={{
          margin: 0,
          padding: 0,
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'nowrap',
          backgroundColor: '#fff',
          borderBottom: '1px solid #ddd',
        }}
        items={[
          {
            key: 'background',
            label: (
              <span className="flex items-center gap-1">
                <EnvironmentOutlined /> 背景
              </span>
            ),
            children: <BackgroundSettings />,
          },
          {
            key: 'light',
            label: (
              <span className="flex items-center gap-1">
                <BulbOutlined /> 灯光
              </span>
            ),
            children: <SliderbarLight />,
          },
          {
            key: 'material',
            label: (
              <span className="flex items-center gap-1">
                <BgColorsOutlined /> 材质
              </span>
            ),
            children: <MaterialList />,
          },
          {
            key: 'animation',
            label: (
              <span className="flex items-center gap-1">
                <PlayCircleOutlined /> 动画
              </span>
            ),
            children: <AnimationControls />,
          },
          {
            key: 'postprocess',
            label: (
              <span className="flex items-center gap-1">
                <CameraOutlined /> 后期
              </span>
            ),
            children: (
              <Card className="bg-white border border-gray-200 shadow-sm p-2">
                <p className="mb-2">曝光调整</p>
                <Slider min={0} max={2} step={0.1} defaultValue={1} />
              </Card>
            ),
          },
        ]}
      />
    </aside>
  );
};

export default Sidebar;
