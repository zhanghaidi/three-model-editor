import { useGLTF, useAnimations } from '@react-three/drei';
import React, { useEffect, useRef } from 'react';
import { Group, Mesh, MeshStandardMaterial } from 'three';

import { useMaterialStore } from '@/store/materialStore';
import { useSceneStore } from '@/store/sceneStore';

const Model: React.FC = () => {
  const { selectedAnimation, isPlaying, setAvailableAnimations } = useSceneStore();
  const modelRef = useRef<Group>(null);

  const { scene, animations } = useGLTF('/models/glb/sun.glb');
  const { actions, names } = useAnimations(animations, modelRef);

  const { setMaterials, materials } = useMaterialStore();

  useEffect(() => {
    if (scene) {
      const materialMap: Record<string, { material: MeshStandardMaterial; visible: boolean }> = {}; // ✅ 修正类型

      scene.traverse((object) => {
        if (object instanceof Mesh) {
          const meshMaterial = object.material;
          if (meshMaterial instanceof MeshStandardMaterial) {
            const materialName = object.name || `Material_${Object.keys(materialMap).length + 1}`;
            materialMap[materialName] = {
              material: meshMaterial, // ✅ 正确存储材质对象
              visible: true, // ✅ 确保有 visible
            };
          }
        }
      });

      if (Object.keys(materialMap).length > 0) {
        setMaterials(materialMap);
      }
    }
  }, [scene, setMaterials]);

  useEffect(() => {
    scene.traverse((object) => {
      if (object instanceof Mesh) {
        const materialName = object.name;
        if (materials[materialName]) {
          object.visible = materials[materialName].visible;
        }
      }
    });
  }, [materials, scene]);

  useEffect(() => {
    if (names.length > 0) {
      setAvailableAnimations(names);
    }
  }, [names, setAvailableAnimations]);

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
