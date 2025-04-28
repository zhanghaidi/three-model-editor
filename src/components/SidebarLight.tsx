import { Card, Switch, Slider, Space, Divider, ColorPicker } from 'antd';
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
          <Space size={'large'}>
            <label>环境光</label>
            <Switch checked={ambientLight.enabled} onChange={setAmbientLight} />
          </Space>
          <Space size={'large'}>
            <label>强度</label>
            <Slider
              style={{ width: 100 }}
              min={0}
              max={10}
              step={0.1}
              value={ambientLight.intensity}
              onChange={setAmbientIntensity}
            />
          </Space>
          <Space size={'large'}>
            <label>颜色</label>
            <ColorPicker defaultValue={ambientLight.color} onChange={(color) => setAmbientColor(color.toHexString())} />
          </Space>
        </Space>
        <Divider />
        {/* 平行光 */}
        <Space direction="vertical">
          <Space size={'large'}>
            <label>平行光</label>
            <Switch checked={directionalLight.enabled} onChange={setDirectionalLight} />
          </Space>
          <Space size={'large'}>
            <label>强度</label>
            <Slider
              style={{ width: 100 }}
              min={0}
              max={10}
              step={0.1}
              value={directionalLight.intensity}
              onChange={setDirectionalIntensity}
            />
          </Space>
          <Space size={'large'}>
            <label>颜色</label>
            <ColorPicker
              defaultValue={directionalLight.color}
              onChange={(color) => setDirectionalColor(color.toHexString())}
            />
          </Space>
        </Space>
        <Divider />
        {/* 点光源 */}
        <Space direction="vertical">
          <Space size={'large'}>
            <label>点光源</label>
            <Switch checked={pointLight.enabled} onChange={setPointLight} />
          </Space>
          <Space size={'large'}>
            <label>强度</label>
            <Slider
              style={{ width: 100 }}
              min={0}
              max={10}
              step={0.1}
              value={pointLight.intensity}
              onChange={setPointIntensity}
            />
          </Space>
          <Space size={'large'}>
            <label>颜色</label>
            <ColorPicker defaultValue={pointLight.color} onChange={(color) => setPointColor(color.toHexString())} />
          </Space>
          <Space size={'large'}>
            <label>距离</label>
            <Slider
              style={{ width: 100 }}
              min={1}
              max={100}
              step={1}
              value={pointLight.distance}
              onChange={setPointDistance}
            />
          </Space>
        </Space>
        <Divider />
        {/* 聚光灯 */}
        <Space direction="vertical">
          <Space size={'large'}>
            <label>聚光灯</label>
            <Switch checked={spotLight.enabled} onChange={setSpotLight} />
          </Space>
          <Space size={'large'}>
            <label>强度</label>
            <Slider
              style={{ width: 100 }}
              min={0}
              max={10}
              step={0.1}
              value={spotLight.intensity}
              onChange={setSpotIntensity}
            />
          </Space>
          <Space size={'large'}>
            <label>颜色</label>
            <ColorPicker defaultValue={spotLight.color} onChange={(color) => setSpotColor(color.toHexString())} />
          </Space>
          <Space size={'large'}>
            <label>距离</label>
            <Slider
              style={{ width: 100 }}
              min={1}
              max={100}
              step={1}
              value={spotLight.distance}
              onChange={setSpotDistance}
            />
          </Space>
          <Space size={'large'}>
            <label>角度</label>
            <Slider
              style={{ width: 100 }}
              min={0}
              max={Math.PI / 2}
              step={0.1}
              value={spotLight.angle}
              onChange={setSpotAngle}
            />
          </Space>
        </Space>
      </Space>
    </Card>
  );
};

export default SidebarLight;
