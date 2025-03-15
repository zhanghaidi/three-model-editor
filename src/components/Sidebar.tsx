import {
  EnvironmentOutlined,
  BulbOutlined,
  BgColorsOutlined,
  PlayCircleOutlined,
  CameraOutlined,
} from '@ant-design/icons';
import { Card, Slider, Button, Tabs } from 'antd';
import React, { useState } from 'react';

import { useSceneStore } from '@/store/sceneStore';

import AnimationControls from './SidebarAnimation';
import SliderbarLight from './SidebarLight';

const { TabPane } = Tabs;

const Sidebar: React.FC = () => {
  const { setBackground } = useSceneStore();
  const [bgIndex, setBgIndex] = useState(0);

  // 背景贴图列表
  const bgTextures = ['/textures/bg1.hdr', '/textures/bg2.hdr', '/textures/bg3.hdr'];

  // 切换背景
  const changeBackground = () => {
    const newIndex = (bgIndex + 1) % bgTextures.length;
    setBgIndex(newIndex);
    setBackground(bgTextures[newIndex]);
  };

  return (
    <aside className="w-[320px] h-full bg-gray-100 text-gray-900 p-3 flex flex-col shadow-md border-l border-gray-300 overflow-y-auto">
      {/* Tabs 组件 */}
      <Tabs defaultActiveKey="background" tabPosition="top" className="mb-3">
        <TabPane
          tab={
            <span className="flex items-center gap-1">
              <EnvironmentOutlined /> 背景
            </span>
          }
          key="background"
        >
          <Card title="背景设置" className="bg-white border border-gray-200 shadow-sm">
            <Button
              icon={<EnvironmentOutlined />}
              onClick={changeBackground}
              className="w-full bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              切换背景
            </Button>
          </Card>
        </TabPane>

        {/* 灯光 Tab */}
        <TabPane
          tab={
            <span className="flex items-center gap-1">
              <BulbOutlined /> 灯光
            </span>
          }
          key="light"
        >
          <SliderbarLight />
        </TabPane>

        {/* 材质 Tab */}
        <TabPane
          tab={
            <span className="flex items-center gap-1">
              <BgColorsOutlined /> 材质
            </span>
          }
          key="material"
        >
          <Card title="材质设置" className="bg-white border border-gray-200 shadow-sm">
            <p className="mb-2">颜色</p>
            <input type="color" className="w-full h-8 border rounded-md cursor-pointer" />
          </Card>
        </TabPane>

        {/* 动画 Tab */}
        <TabPane
          tab={
            <span className="flex items-center gap-1">
              <PlayCircleOutlined /> 动画
            </span>
          }
          key="animation"
        >
          <AnimationControls />
        </TabPane>

        {/* 后期处理 Tab */}
        <TabPane
          tab={
            <span className="flex items-center gap-1">
              <CameraOutlined /> 后期
            </span>
          }
          key="postprocess"
        >
          <Card title="后期处理" className="bg-white border border-gray-200 shadow-sm">
            <p className="mb-2">曝光调整</p>
            <Slider min={0} max={2} step={0.1} defaultValue={1} />
          </Card>
        </TabPane>
      </Tabs>
    </aside>
  );
};

export default Sidebar;
