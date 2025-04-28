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
      <Space direction="vertical" size={'middle'}>
        {/* ✅ 泛光（Bloom） */}
        <Space size={'large'}>
          <label>泛光</label>
          <Switch checked={bloom} onChange={setBloom} />
        </Space>
        {bloom && (
          <Space size={'large'}>
            <label>强度</label>
            <Slider
              style={{ width: 100 }}
              min={0}
              max={5}
              step={0.1}
              value={bloomIntensity}
              onChange={setBloomIntensity}
            />
          </Space>
        )}

        {/* ✅ FXAA 抗锯齿 */}
        <Space size={'large'}>
          <label>FXAA 抗锯齿</label>
          <Switch checked={fxaa} onChange={setFxaa} />
        </Space>
        {/* 模型分解 */}

        <Space size={'large'}>
          <label>模型分解</label>
          <Switch checked={decomposeEnabled} onChange={setDecomposeEnabled} />
        </Space>

        {decomposeEnabled && (
          <>
            <Space size={'large'}>
              <label>分解模式</label>
              <Radio.Group
                value={decomposeMode}
                onChange={(e) => safeSetDecomposeMode(e.target.value)}
                options={[
                  { label: '环绕', value: 'circular' },
                  { label: '螺旋', value: 'spiral' },
                  { label: '磁场', value: 'spherical' },
                ]}
              />
            </Space>
            <Space size={'large'}>
              <label>分解距离</label>
              <Slider
                style={{ width: 100 }}
                min={0}
                max={1000}
                step={10}
                value={decomposeDistance}
                onChange={setDecomposeDistance}
              />
              <Button danger onClick={() => setDecomposeDistance(0)}>
                重置
              </Button>
            </Space>
          </>
        )}
      </Space>
    </Card>
  );
};

export default SidebarProjectEffects;
