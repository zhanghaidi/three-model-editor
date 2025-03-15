import { useGLTF, useAnimations } from '@react-three/drei';
import React, { useEffect, useRef } from 'react';
import { Group } from 'three';

import { useSceneStore } from '@/store/sceneStore'; // Zustand 管理动画状态

const Model: React.FC = () => {
  const { selectedAnimation, isPlaying, setAvailableAnimations } = useSceneStore();
  const modelRef = useRef<Group>(null);

  // 加载 GLB 模型
  const { scene, animations } = useGLTF('/models/glb/sun.glb');
  const { actions, names } = useAnimations(animations, modelRef);

  // 把动画名称存入 Zustand
  useEffect(() => {
    if (names.length > 0) {
      setAvailableAnimations(names); // 保存动画列表
    }
  }, [names, setAvailableAnimations]);

  // 控制动画播放
  useEffect(() => {
    if (selectedAnimation && actions[selectedAnimation]) {
      if (isPlaying) {
        actions[selectedAnimation].play();
      } else {
        actions[selectedAnimation].stop();
      }
    }
  }, [selectedAnimation, isPlaying, actions]);

  return <primitive ref={modelRef} object={scene} scale={1} />;
};

export default Model;
