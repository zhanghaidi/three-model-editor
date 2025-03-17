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
      className="fixed right-0 top-[50px] h-[calc(100vh-50px)] bg-gray-800 text-white shadow-lg border-l border-gray-700 overflow-y-auto flex flex-col"
      style={{ width: '300px' }}
    >
      <Tabs
        defaultActiveKey="background"
        className="flex-1 flex flex-col"
        tabBarGutter={8}
        style={{ padding: '0 8px' }}
        tabBarStyle={{
          margin: 0,
          padding: '8px 0',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'nowrap',
          backgroundColor: '#2d2d2d',
          borderBottom: '1px solid #444',
          color: 'white',
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
              <Card className="bg-gray-700 border border-gray-600 shadow-sm p-2 text-white">
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
