import { Card, Switch, Slider, Space, Radio, Button } from 'antd';
import React from 'react';

import { DecomposeMode, useEffectStore } from '@/store/effectStore'; // ✅ 需要创建 `effectStore`

const SidebarProjectEffects: React.FC = () => {
  const {
    bloom,
    setBloom,
    bloomIntensity,
    setBloomIntensity,
    fxaa,
    setFxaa,
    decomposeEnabled,
    setDecomposeEnabled,
    decomposeDistance,
    setDecomposeDistance,
    decomposeMode,
    setDecomposeMode,
  } = useEffectStore();

  const safeSetDecomposeMode = (mode: DecomposeMode) => {
    setDecomposeDistance(0); // 🧼 清空旧分散状态
    setTimeout(() => {
      setDecomposeMode(mode); // ⏱ 稍微延后，确保归位完成
    }, 50);
  };

  return (
    <Card title="特效设置">
      <Space direction="vertical">
        {/* ✅ 泛光（Bloom） */}
        <Space direction="vertical">
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
        </Space>

        {/* ✅ FXAA 抗锯齿 */}
        <Space>
          <label>
            <span>FXAA 抗锯齿</span>
            <Switch checked={fxaa} onChange={setFxaa} />
          </label>
        </Space>
        {/* 模型分解 */}
        <Space direction="vertical" style={{ width: '100%' }}>
          <label>
            <span>模型分解</span>
            <Switch checked={decomposeEnabled} onChange={setDecomposeEnabled} />
          </label>

          {decomposeEnabled && (
            <>
              <label>分解模式</label>
              <Radio.Group
                value={decomposeMode}
                onChange={(e) => safeSetDecomposeMode(e.target.value)}
                options={[
                  { label: '向外发散', value: 'outward' },
                  { label: '环形展开', value: 'circular' },
                  { label: '螺旋爆炸', value: 'spiral' },
                  { label: '球形磁场', value: 'spherical' },
                ]}
              />
              <label>分解距离</label>
              <Slider min={0} max={1000} step={10} value={decomposeDistance} onChange={setDecomposeDistance} />
              <Button danger onClick={() => setDecomposeDistance(0)}>
                立即复原
              </Button>
            </>
          )}
        </Space>
      </Space>
    </Card>
  );
};

export default SidebarProjectEffects;
