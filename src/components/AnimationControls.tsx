import { PlayCircleOutlined, PauseOutlined } from '@ant-design/icons';
import { Card, Button, Select } from 'antd';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

import { useAnimationStore } from '@/store/animationStore';
import { useEditorStore } from '@/store/editorStore';

const AnimationControls: React.FC = () => {
  const { scene } = useEditorStore();
  const { isPlaying, setIsPlaying, selectedAnimation, setSelectedAnimation, availableAnimations, setMixer, clock } =
    useAnimationStore();

  const requestRef = useRef<number | null>(null);
  const localMixer = useRef<THREE.AnimationMixer | null>(null); // ✅ 解决无限更新问题

  useEffect(() => {
    if (!selectedAnimation || availableAnimations.length === 0) return;

    const model = scene.children.find((obj) => obj instanceof THREE.Group);
    if (!model) return;

    // ✅ 仅在 `selectedAnimation` 变化时创建 `mixer`
    if (!localMixer.current) {
      localMixer.current = new THREE.AnimationMixer(model);
      setMixer(localMixer.current);
    }

    // ✅ 获取动画片段
    const clip = THREE.AnimationClip.findByName(availableAnimations, selectedAnimation);
    if (!clip) return;

    // ✅ 播放动画
    const action = localMixer.current.clipAction(clip);
    action.reset().play();

    // ✅ 动画循环更新
    const animate = () => {
      if (isPlaying) {
        const delta = clock.getDelta();
        localMixer.current!.update(delta);
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      action.stop();
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }

    return () => {
      localMixer.current?.stopAllAction();
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [selectedAnimation, isPlaying, availableAnimations, scene.children, setMixer, clock]); // ✅ 只在 `selectedAnimation` / `isPlaying` 变化时更新

  return (
    <Card className="card" title="动画控制">
      {availableAnimations.length > 0 ? (
        <>
          <p>选择动画：</p>
          <Select
            style={{ width: '100%' }}
            placeholder="选择动画"
            value={selectedAnimation}
            onChange={(value) => setSelectedAnimation(value)}
          >
            {availableAnimations.map((clip) => (
              <Select.Option key={clip.name} value={clip.name}>
                {clip.name}
              </Select.Option>
            ))}
          </Select>

          <Button
            icon={isPlaying ? <PauseOutlined /> : <PlayCircleOutlined />}
            onClick={() => setIsPlaying(!isPlaying)}
            className="button"
            disabled={!selectedAnimation}
          >
            {isPlaying ? '暂停动画' : '播放动画'}
          </Button>
        </>
      ) : (
        <p>当前模型没有动画</p>
      )}
    </Card>
  );
};

export default AnimationControls;
