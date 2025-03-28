import { Card, Switch, Slider } from 'antd';
import React from 'react';

import { useLightStore } from '@/store/lightStore';
import styles from '@/styles/sidebarProjectLight.module.scss';

const SidebarProjectLight: React.FC = () => {
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
    <Card title="灯光设置" className={styles.sidebarLight}>
      {/* 🌞 环境光 */}
      <Card.Grid className={styles.lightGrid}>
        <div className={styles.settingRow}>
          <span>环境光</span>
          <Switch checked={ambientLight.enabled} onChange={setAmbientLight} />
        </div>
        <Slider min={0} max={10} step={0.1} value={ambientLight.intensity} onChange={setAmbientIntensity} />
        <input type="color" value={ambientLight.color} onChange={(e) => setAmbientColor(e.target.value)} />
      </Card.Grid>

      {/* ☀️ 平行光 */}
      <Card.Grid className={styles.lightGrid}>
        <div className={styles.settingRow}>
          <span>平行光</span>
          <Switch checked={directionalLight.enabled} onChange={setDirectionalLight} />
        </div>
        <Slider min={0} max={10} step={0.1} value={directionalLight.intensity} onChange={setDirectionalIntensity} />
        <input type="color" value={directionalLight.color} onChange={(e) => setDirectionalColor(e.target.value)} />
      </Card.Grid>

      {/* 💡 点光源 */}
      <Card.Grid className={styles.lightGrid}>
        <div className={styles.settingRow}>
          <span>点光源</span>
          <Switch checked={pointLight.enabled} onChange={setPointLight} />
        </div>
        <Slider min={0} max={10} step={0.1} value={pointLight.intensity} onChange={setPointIntensity} />
        <input type="color" value={pointLight.color} onChange={(e) => setPointColor(e.target.value)} />
        <Slider min={1} max={100} step={1} value={pointLight.distance} onChange={setPointDistance} />
      </Card.Grid>

      {/* 🔦 聚光灯 */}
      <Card.Grid className={styles.lightGrid}>
        <div className={styles.settingRow}>
          <span>聚光灯</span>
          <Switch checked={spotLight.enabled} onChange={setSpotLight} />
        </div>
        <Slider min={0} max={10} step={0.1} value={spotLight.intensity} onChange={setSpotIntensity} />
        <input type="color" value={spotLight.color} onChange={(e) => setSpotColor(e.target.value)} />
        <Slider min={1} max={100} step={1} value={spotLight.distance} onChange={setSpotDistance} />
        <Slider min={0} max={Math.PI / 2} step={0.1} value={spotLight.angle} onChange={setSpotAngle} />
      </Card.Grid>
    </Card>
  );
};

export default SidebarProjectLight;
