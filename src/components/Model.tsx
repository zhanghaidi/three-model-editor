import React, { useEffect } from 'react';
import { AnimationClip } from 'three';

import { useAnimationStore } from '@/store/animationStore';
import { useModelStore } from '@/store/modelStore';

import ModelItem from './ModelItem';

const ModelList: React.FC = () => {
  const { models } = useModelStore();
  const { setAvailableAnimations } = useAnimationStore();

  useEffect(() => {
    const animationNames = models.flatMap(
      (model) => (model.userData.animations as AnimationClip[])?.map((anim) => anim.name) || [],
    );

    setAvailableAnimations(animationNames);
  }, [models, setAvailableAnimations]);

  if (models.length === 0) return null;

  return (
    <>
      {models.map((model) => (
        <ModelItem key={model.uuid} model={model} />
      ))}
    </>
  );
};

export default ModelList;
