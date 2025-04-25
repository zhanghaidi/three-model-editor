import { Card, Switch, Slider, Space, Divider } from 'antd';
import React from 'react';

import { useLightStore } from '@/store/lightStore';

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
    <Card title="灯光">
      {/* 环境光 */}
      <Space direction="vertical">
        <Space direction="vertical">
          <Space size={50}>
            <label>环境光</label>
            <Switch checked={ambientLight.enabled} onChange={setAmbientLight} />
          </Space>
          <Space size={50}>
            <label>强度</label>
            <Slider min={0} max={10} step={0.1} value={ambientLight.intensity} onChange={setAmbientIntensity} />
          </Space>
          <Space size={50}>
            <label>颜色</label>
            <input type="color" value={ambientLight.color} onChange={(e) => setAmbientColor(e.target.value)} />
          </Space>
        </Space>
        <Divider />
        {/* 平行光 */}
        <Space direction="vertical">
          <Space size={50}>
            <label>平行光</label>
            <Switch checked={directionalLight.enabled} onChange={setDirectionalLight} />
          </Space>
          <Space size={50}>
            <label>强度</label>
            <Slider min={0} max={10} step={0.1} value={directionalLight.intensity} onChange={setDirectionalIntensity} />
          </Space>
          <Space size={50}>
            <label>颜色</label>
            <input type="color" value={directionalLight.color} onChange={(e) => setDirectionalColor(e.target.value)} />
          </Space>
        </Space>
        <Divider />
        {/* 点光源 */}
        <Space direction="vertical">
          <Space size={50}>
            <label>点光源</label>
            <Switch checked={pointLight.enabled} onChange={setPointLight} />
          </Space>
          <Space size={50}>
            <label>强度</label>
            <Slider min={0} max={10} step={0.1} value={pointLight.intensity} onChange={setPointIntensity} />
          </Space>
          <Space size={50}>
            <label>颜色</label>
            <input type="color" value={pointLight.color} onChange={(e) => setPointColor(e.target.value)} />
          </Space>
          <Space size={50}>
            <label>距离</label>
            <Slider min={1} max={100} step={1} value={pointLight.distance} onChange={setPointDistance} />
          </Space>
        </Space>
        <Divider />
        {/* 聚光灯 */}
        <Space direction="vertical">
          <Space size={50}>
            <label>
              <span>聚光灯</span>
              <Switch checked={spotLight.enabled} onChange={setSpotLight} />
            </label>
          </Space>
          <Space size={50}>
            <label>强度</label>
            <Slider min={0} max={10} step={0.1} value={spotLight.intensity} onChange={setSpotIntensity} />
          </Space>
          <Space size={50}>
            <label>颜色</label>
            <input type="color" value={spotLight.color} onChange={(e) => setSpotColor(e.target.value)} />
          </Space>
          <Space size={50}>
            <label>距离</label>
            <Slider min={1} max={100} step={1} value={spotLight.distance} onChange={setSpotDistance} />
          </Space>
          <Space size={50}>
            <label>角度</label>
            <Slider min={0} max={Math.PI / 2} step={0.1} value={spotLight.angle} onChange={setSpotAngle} />
          </Space>
        </Space>
      </Space>
    </Card>
  );
};

export default SidebarLight;
