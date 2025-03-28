import { Card, Switch, Slider } from 'antd';
import React from 'react';

import { useEffectStore } from '@/store/effectStore'; // ✅ 需要创建 `effectStore`

const SidebarProjectEffects: React.FC = () => {
  const { bloom, setBloom, bloomIntensity, setBloomIntensity, fxaa, setFxaa } = useEffectStore();

  return (
    <Card title="特效设置">
      {/* ✅ 泛光（Bloom） */}
      <div>
        <label>
          <span>泛光</span>
          <Switch checked={bloom} onChange={setBloom} />
        </label>
        {bloom && (
          <>
            <label>强度</label>
            <Slider min={0} max={5} step={0.1} value={bloomIntensity} onChange={setBloomIntensity} />
          </>
        )}
      </div>

      {/* ✅ FXAA 抗锯齿 */}
      <div>
        <label>
          <span>FXAA 抗锯齿</span>
          <Switch checked={fxaa} onChange={setFxaa} />
        </label>
      </div>
    </Card>
  );
};

export default SidebarProjectEffects;
