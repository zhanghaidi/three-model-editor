import { Card, Switch, Slider } from 'antd';
import React from 'react';

import { useLightStore } from '@/store/lightStore';

import styles from './Sidebar.module.scss'; // 确保样式引入

const SidebarLight: React.FC = () => {
  const {
    ambientLight,
    directionalLight,
    pointLight,
    spotLight,
    setAmbientLight,
    setAmbientIntensity,
    setAmbientColor,
    setDirectionalLight,
    setDirectionalIntensity,
    setDirectionalColor,
    setPointLight,
    setPointIntensity,
    setPointColor,
    setPointDistance,
    setSpotLight,
    setSpotIntensity,
    setSpotColor,
    setSpotDistance,
    setSpotAngle,
  } = useLightStore();

  return (
    <Card className={styles.card} title="灯光设置">
      {/* 环境光 */}
      <p>环境光</p>
      <Switch checked={ambientLight.enabled} onChange={setAmbientLight} />
      <p>强度</p>
      <Slider min={0} max={2} step={0.1} value={ambientLight.intensity} onChange={setAmbientIntensity} />
      <p>颜色</p>
      <input type="color" value={ambientLight.color} onChange={(e) => setAmbientColor(e.target.value)} />

      {/* 平行光 */}
      <p>平行光</p>
      <Switch checked={directionalLight.enabled} onChange={setDirectionalLight} />
      <p>强度</p>
      <Slider min={0} max={2} step={0.1} value={directionalLight.intensity} onChange={setDirectionalIntensity} />
      <p>颜色</p>
      <input type="color" value={directionalLight.color} onChange={(e) => setDirectionalColor(e.target.value)} />

      {/* 点光源 */}
      <p>点光源</p>
      <Switch checked={pointLight.enabled} onChange={setPointLight} />
      <p>强度</p>
      <Slider min={0} max={2} step={0.1} value={pointLight.intensity} onChange={setPointIntensity} />
      <p>颜色</p>
      <input type="color" value={pointLight.color} onChange={(e) => setPointColor(e.target.value)} />
      <p>距离</p>
      <Slider min={1} max={20} step={0.5} value={pointLight.distance} onChange={setPointDistance} />

      {/* 聚光灯 */}
      <p>聚光灯</p>
      <Switch checked={spotLight.enabled} onChange={setSpotLight} />
      <p>强度</p>
      <Slider min={0} max={2} step={0.1} value={spotLight.intensity} onChange={setSpotIntensity} />
      <p>颜色</p>
      <input type="color" value={spotLight.color} onChange={(e) => setSpotColor(e.target.value)} />
      <p>距离</p>
      <Slider min={1} max={20} step={0.5} value={spotLight.distance} onChange={setSpotDistance} />
      <p>角度</p>
      <Slider min={0} max={Math.PI / 2} step={0.1} value={spotLight.angle} onChange={setSpotAngle} />
    </Card>
  );
};

export default SidebarLight;
