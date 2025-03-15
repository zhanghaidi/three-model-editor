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

import styles from './Sidebar.module.scss';
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
    <aside className={styles.sidebar}>
      <Tabs defaultActiveKey="background" tabPosition="top" className={styles.tabs}>
        {/* 背景 Tab */}
        <TabPane
          tab={
            <span>
              <EnvironmentOutlined /> 背景
            </span>
          }
          key="background"
        >
          <Card className={styles.card} title="背景设置">
            <Button icon={<EnvironmentOutlined />} onClick={changeBackground} className={styles.button}>
              切换背景
            </Button>
          </Card>
        </TabPane>

        {/* 灯光 Tab */}
        <TabPane
          tab={
            <span>
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
            <span>
              <BgColorsOutlined /> 材质
            </span>
          }
          key="material"
        >
          <Card className={styles.card} title="材质设置">
            <p>颜色</p>
            <input type="color" />
          </Card>
        </TabPane>

        {/* 动画 Tab */}
        <TabPane
          tab={
            <span>
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
            <span>
              <CameraOutlined /> 后期
            </span>
          }
          key="postprocess"
        >
          <Card className={styles.card} title="后期处理">
            <p>曝光调整</p>
            <Slider min={0} max={2} step={0.1} defaultValue={1} />
          </Card>
        </TabPane>
      </Tabs>
    </aside>
  );
};

export default Sidebar;
