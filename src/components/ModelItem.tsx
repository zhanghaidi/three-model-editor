import { useAnimations } from '@react-three/drei';
import React, { useRef, useEffect } from 'react';
import { Group } from 'three';

import { useAnimationStore } from '@/store/animationStore';

interface ModelItemProps {
  model: Group;
}

const ModelItem: React.FC<ModelItemProps> = ({ model }) => {
  const ref = useRef<Group>(null);
  const { actions } = useAnimations(model.userData.animations || [], ref);
  const { selectedAnimation, isPlaying } = useAnimationStore();

  useEffect(() => {
    if (!actions || !selectedAnimation) return;
    if (actions[selectedAnimation]) {
      isPlaying ? actions[selectedAnimation].play() : actions[selectedAnimation].stop();
    }
  }, [actions, selectedAnimation, isPlaying]);

  return <primitive object={model} ref={ref} />;
};

export default ModelItem;
