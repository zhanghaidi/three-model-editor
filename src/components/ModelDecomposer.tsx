import { useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

import { useEditorStore } from '@/store/editorStore';
import { useEffectStore } from '@/store/effectStore';

type MeshInfo = {
  mesh: THREE.Mesh;
  origin: THREE.Vector3;
  normal: THREE.Vector3;
};

const ModelDecomposer = () => {
  const { scene } = useEditorStore();
  const { decomposeEnabled, decomposeDistance, decomposeMode } = useEffectStore();

  const meshDataRef = useRef<MeshInfo[]>([]);
  const centerRef = useRef(new THREE.Vector3());

  // 初始化方向向量
  useEffect(() => {
    if (!scene || !decomposeEnabled) return;

    const meshes: MeshInfo[] = [];
    const center = new THREE.Vector3();
    new THREE.Box3().setFromObject(scene).getCenter(center);
    centerRef.current.copy(center);

    const children: THREE.Mesh[] = [];
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) children.push(child);
    });

    const total = children.length;

    children.forEach((mesh, index) => {
      const origin = mesh.position.clone(); // ✅ 保存初始 origin
      mesh.position.copy(origin); // ✅ 强制重置回 origin，避免错乱
      let dir = new THREE.Vector3();

      switch (decomposeMode) {
        case 'outward': {
          const worldPos = new THREE.Vector3();
          mesh.getWorldPosition(worldPos);
          dir = worldPos.clone().sub(center).normalize();
          dir.add(randomVector(0.3)).normalize(); // 增加扰动
          break;
        }

        case 'circular': {
          const angle = (index / total) * Math.PI * 2;
          dir = new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0); // 绕 Y 轴旋转
          break;
        }

        case 'spiral': {
          const angle = index * 0.5;
          const radius = 1 + index * 0.1;
          dir = new THREE.Vector3(Math.cos(angle) * radius, index * 0.05, Math.sin(angle) * radius).normalize();
          break;
        }

        case 'spherical': {
          const phi = Math.acos(1 - (2 * (index + 1)) / total);
          const theta = Math.PI * (1 + Math.sqrt(5)) * (index + 1);
          dir = new THREE.Vector3(
            Math.cos(theta) * Math.sin(phi),
            Math.sin(theta) * Math.sin(phi),
            Math.cos(phi),
          ).normalize();
          break;
        }
      }

      meshes.push({ mesh, origin, normal: dir });
    });

    meshDataRef.current = meshes;
  }, [decomposeEnabled, scene, decomposeMode]);

  // 动画帧更新位置
  useFrame(() => {
    if (!decomposeEnabled) return;

    meshDataRef.current.forEach(({ mesh, origin, normal }) => {
      if (decomposeDistance === 0) {
        mesh.position.copy(origin);
      } else {
        const offset = normal.clone().multiplyScalar(decomposeDistance);
        mesh.position.copy(origin.clone().add(offset));
      }
    });
  });

  return null;
};

export default ModelDecomposer;

function randomVector(scale = 1) {
  return new THREE.Vector3((Math.random() - 0.5) * scale, (Math.random() - 0.5) * scale, (Math.random() - 0.5) * scale);
}
