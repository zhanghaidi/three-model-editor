import { useGLTF, useAnimations } from '@react-three/drei';
import React, { useEffect, useRef } from 'react';
import { Group, Mesh, MeshStandardMaterial } from 'three';

import { useMaterialStore } from '@/store/materialStore';
import { useSceneStore } from '@/store/sceneStore';
import { useStatsStore } from '@/store/statsStore'; // ✅ 引入统计 store

const Model: React.FC = () => {
  const { selectedAnimation, isPlaying, setAvailableAnimations } = useSceneStore();
  const { setStats } = useStatsStore(); // ✅ 获取统计更新函数
  const modelRef = useRef<Group>(null);

  const { scene, animations } = useGLTF('/models/glb/sun.glb');
  const { actions, names } = useAnimations(animations, modelRef);
  const { setMaterials, materials } = useMaterialStore();

  useEffect(() => {
    if (scene) {
      const materialMap: Record<string, { material: MeshStandardMaterial; visible: boolean }> = {};
      let objects = 0,
        vertices = 0,
        triangles = 0;

      scene.traverse((object) => {
        objects++; // 统计物体数
        if (object instanceof Mesh) {
          const meshMaterial = object.material;
          if (meshMaterial instanceof MeshStandardMaterial) {
            const materialName = object.name || `Material_${Object.keys(materialMap).length + 1}`;
            materialMap[materialName] = { material: meshMaterial, visible: true };
          }

          // ✅ 统计顶点和三角形数
          if (object.geometry) {
            vertices += object.geometry.attributes.position.count;
            triangles += object.geometry.index ? object.geometry.index.count / 3 : vertices / 3;
          }
        }
      });

      // ✅ 更新 `store` 统计数据
      setStats({ objects, vertices, triangles, renderTime: 0 });

      if (Object.keys(materialMap).length > 0) {
        setMaterials(materialMap);
      }
    }
  }, [scene, setMaterials, setStats]);

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
