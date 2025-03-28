import { Card, Switch, Slider } from 'antd';
import React from 'react';

import { useLightStore } from '@/store/lightStore';

const SidebarTags: React.FC = () => {
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
      <div>
        <label>
          <span>环境光</span>
          <Switch checked={ambientLight.enabled} onChange={setAmbientLight} />
        </label>
        <label className="">强度</label>
        <Slider min={0} max={10} step={0.1} value={ambientLight.intensity} onChange={setAmbientIntensity} />
        <label className="">颜色</label>
        <input type="color" value={ambientLight.color} onChange={(e) => setAmbientColor(e.target.value)} className="" />
      </div>

      {/* 平行光 */}
      <div className="">
        <label className="flex items-center justify-between">
          <span>平行光</span>
          <Switch checked={directionalLight.enabled} onChange={setDirectionalLight} />
        </label>
        <label className="">强度</label>
        <Slider min={0} max={10} step={0.1} value={directionalLight.intensity} onChange={setDirectionalIntensity} />
        <label className="">颜色</label>
        <input
          type="color"
          value={directionalLight.color}
          onChange={(e) => setDirectionalColor(e.target.value)}
          className="w-full h-8 border rounded-md cursor-pointer"
        />
      </div>

      {/* 点光源 */}
      <div className="">
        <label className="flex items-center justify-between">
          <span>点光源</span>
          <Switch checked={pointLight.enabled} onChange={setPointLight} />
        </label>
        <label className="">强度</label>
        <Slider min={0} max={10} step={0.1} value={pointLight.intensity} onChange={setPointIntensity} />
        <label className="">颜色</label>
        <input type="color" value={pointLight.color} onChange={(e) => setPointColor(e.target.value)} className="" />
        <label className="">距离</label>
        <Slider min={1} max={100} step={1} value={pointLight.distance} onChange={setPointDistance} />
      </div>

      {/* 聚光灯 */}
      <div>
        <label className="">
          <span>聚光灯</span>
          <Switch checked={spotLight.enabled} onChange={setSpotLight} />
        </label>
        <label className="">强度</label>
        <Slider min={0} max={10} step={0.1} value={spotLight.intensity} onChange={setSpotIntensity} />
        <label className="">颜色</label>
        <input type="color" value={spotLight.color} onChange={(e) => setSpotColor(e.target.value)} className="" />
        <label className="">距离</label>
        <Slider min={1} max={100} step={1} value={spotLight.distance} onChange={setSpotDistance} />
        <label className="">角度</label>
        <Slider min={0} max={Math.PI / 2} step={0.1} value={spotLight.angle} onChange={setSpotAngle} />
      </div>
    </Card>
  );
};

export default SidebarTags;
