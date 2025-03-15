import { Card, Switch, Slider } from 'antd';
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
    <Card title="灯光设置" className="bg-white border border-gray-200 shadow-sm p-4">
      {/* 环境光 */}
      <div className="mb-4">
        <label className="flex items-center justify-between">
          <span>环境光</span>
          <Switch checked={ambientLight.enabled} onChange={setAmbientLight} />
        </label>
        <label className="block mt-2">强度</label>
        <Slider min={0} max={2} step={0.1} value={ambientLight.intensity} onChange={setAmbientIntensity} />
        <label className="block mt-2">颜色</label>
        <input
          type="color"
          value={ambientLight.color}
          onChange={(e) => setAmbientColor(e.target.value)}
          className="w-full h-8 border rounded-md cursor-pointer"
        />
      </div>

      {/* 平行光 */}
      <div className="mb-4">
        <label className="flex items-center justify-between">
          <span>平行光</span>
          <Switch checked={directionalLight.enabled} onChange={setDirectionalLight} />
        </label>
        <label className="block mt-2">强度</label>
        <Slider min={0} max={2} step={0.1} value={directionalLight.intensity} onChange={setDirectionalIntensity} />
        <label className="block mt-2">颜色</label>
        <input
          type="color"
          value={directionalLight.color}
          onChange={(e) => setDirectionalColor(e.target.value)}
          className="w-full h-8 border rounded-md cursor-pointer"
        />
      </div>

      {/* 点光源 */}
      <div className="mb-4">
        <label className="flex items-center justify-between">
          <span>点光源</span>
          <Switch checked={pointLight.enabled} onChange={setPointLight} />
        </label>
        <label className="block mt-2">强度</label>
        <Slider min={0} max={2} step={0.1} value={pointLight.intensity} onChange={setPointIntensity} />
        <label className="block mt-2">颜色</label>
        <input
          type="color"
          value={pointLight.color}
          onChange={(e) => setPointColor(e.target.value)}
          className="w-full h-8 border rounded-md cursor-pointer"
        />
        <label className="block mt-2">距离</label>
        <Slider min={1} max={20} step={0.5} value={pointLight.distance} onChange={setPointDistance} />
      </div>

      {/* 聚光灯 */}
      <div>
        <label className="flex items-center justify-between">
          <span>聚光灯</span>
          <Switch checked={spotLight.enabled} onChange={setSpotLight} />
        </label>
        <label className="block mt-2">强度</label>
        <Slider min={0} max={2} step={0.1} value={spotLight.intensity} onChange={setSpotIntensity} />
        <label className="block mt-2">颜色</label>
        <input
          type="color"
          value={spotLight.color}
          onChange={(e) => setSpotColor(e.target.value)}
          className="w-full h-8 border rounded-md cursor-pointer"
        />
        <label className="block mt-2">距离</label>
        <Slider min={1} max={20} step={0.5} value={spotLight.distance} onChange={setSpotDistance} />
        <label className="block mt-2">角度</label>
        <Slider min={0} max={Math.PI / 2} step={0.1} value={spotLight.angle} onChange={setSpotAngle} />
      </div>
    </Card>
  );
};

export default SidebarLight;
