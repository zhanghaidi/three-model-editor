import { PlayCircleOutlined, PauseOutlined } from '@ant-design/icons';
import { Card, Button, Select } from 'antd';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

import { useAnimationStore } from '@/store/animationStore';
import { useEditorStore } from '@/store/editorStore';

const AnimationControls: React.FC = () => {
  const { scene } = useEditorStore();
  const {
    isPlaying,
    setIsPlaying,
    selectedAnimation,
    setSelectedAnimation,
    availableAnimations,
    currentModel,
    mixers,
    setMixer,
    clock,
  } = useAnimationStore();

  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    if (!selectedAnimation || !currentModel) return;

    const model = scene.getObjectByName(currentModel) as THREE.Group;
    if (!model) return;

    let mixer = mixers[currentModel];
    if (!mixer) {
      mixer = new THREE.AnimationMixer(model);
      setMixer(currentModel, mixer);
    }

    const clips = availableAnimations[currentModel] || [];
    const clip = clips.find((clip) => clip.name === selectedAnimation);
    if (!clip) return;

    const action = mixer.clipAction(clip);
    action.reset().play();

    const animate = () => {
      if (isPlaying) {
        const delta = clock.getDelta();
        mixer.update(delta);
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
      mixer.stopAllAction();
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [selectedAnimation, isPlaying, availableAnimations, currentModel, scene, setMixer, clock, mixers]);

  const modelNames = Object.keys(availableAnimations);
  const animations = currentModel ? availableAnimations[currentModel] || [] : [];

  return (
    <Card className="card" title="动画控制">
      {modelNames.length > 0 ? (
        <>
          <p>选择模型：</p>
          <Select
            style={{ width: '100%' }}
            placeholder="选择模型"
            value={currentModel}
            onChange={(model) => setSelectedAnimation(model, animations[0]?.name)}
          >
            {modelNames.map((model) => (
              <Select.Option key={model} value={model}>
                {model}
              </Select.Option>
            ))}
          </Select>

          {animations.length > 0 && (
            <>
              <p>选择动画：</p>
              <Select
                style={{ width: '100%' }}
                placeholder="选择动画"
                value={selectedAnimation}
                onChange={(animation) => setSelectedAnimation(currentModel!, animation)}
              >
                {animations.map((clip) => (
                  <Select.Option key={clip.name} value={clip.name}>
                    {clip.name}
                  </Select.Option>
                ))}
              </Select>
            </>
          )}

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
        <p>当前没有可播放的动画</p>
      )}
    </Card>
  );
};

export default AnimationControls;
