import { Button, List, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import * as THREE from 'three';

import { useEditorStore } from '@/store/editorStore';
import styles from '@/styles/sidebarObjectAnimation.module.scss';

const SidebarObjectAnimation: React.FC = () => {
  const { selectedObject } = useEditorStore();
  const [mixer, setMixer] = useState<THREE.AnimationMixer | null>(null);
  const [animations, setAnimations] = useState<THREE.AnimationClip[]>([]);
  const [actions, setActions] = useState<Record<string, THREE.AnimationAction>>({});

  useEffect(() => {
    if (!selectedObject || selectedObject.animations.length === 0) {
      setMixer(null);
      setAnimations([]);
      setActions({});
      return;
    }

    const newMixer = new THREE.AnimationMixer(selectedObject);
    const newActions: Record<string, THREE.AnimationAction> = {};

    selectedObject.animations.forEach((clip) => {
      const action = newMixer.clipAction(clip);
      action.setLoop(THREE.LoopRepeat, Infinity); // ✅ 让动画循环播放
      newActions[clip.name] = action;
    });

    setMixer(newMixer);
    setAnimations(selectedObject.animations);
    setActions(newActions);

    return () => {
      if (newMixer) {
        newMixer.stopAllAction(); // ✅ 清除旧动画
      }
    };
  }, [selectedObject]);

  // ✅ 每帧更新 AnimationMixer
  useEffect(() => {
    if (!mixer) return;
    const clock = new THREE.Clock();
    const update = () => {
      const delta = clock.getDelta();
      mixer.update(delta);
      requestAnimationFrame(update);
    };
    update();

    return () => {
      if (mixer) mixer.stopAllAction();
    };
  }, [mixer]);
  // ✅ 播放/停止动画
  const toggleAnimation = (name: string) => {
    const action = actions[name];
    if (!action) return;

    if (action.isRunning()) {
      action.stop();
    } else {
      action.reset().play();
    }

    setActions((prev) => ({ ...prev, [name]: action }));
  };

  return (
    <div className={styles.container}>
      {animations.length === 0 ? (
        ''
      ) : (
        <>
          <p className={styles.title}>动画</p>
          <List
            className={styles.animationList}
            dataSource={animations}
            renderItem={(animation) => (
              <List.Item key={animation.name}>
                <Space>
                  <span>{animation.name}</span>
                  <Button size="small" onClick={() => toggleAnimation(animation.name)}>
                    {actions[animation.name]?.isRunning() ? '暂停' : '播放'}
                  </Button>
                </Space>
              </List.Item>
            )}
          />
        </>
      )}
    </div>
  );
};

export default SidebarObjectAnimation;
