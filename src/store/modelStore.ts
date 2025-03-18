import { message } from 'antd';
import { Group, Mesh, MeshStandardMaterial, Object3D } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { create } from 'zustand';

import { useAnimationStore } from './animationStore';
import { useMaterialStore } from './materialStore';
import { useStatsStore } from './statsStore';

interface ModelState {
  models: Group[];
  importModel: (file: File) => void;
  removeModel: (id: string) => void;
}

export const useModelStore = create<ModelState>((set) => ({
  models: [],

  importModel: (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target?.result) return;
      const url = event.target.result as string;

      let loader: GLTFLoader | FBXLoader | OBJLoader | null = null;
      if (file.name.endsWith('.gltf') || file.name.endsWith('.glb')) {
        loader = new GLTFLoader();
      } else if (file.name.endsWith('.fbx')) {
        loader = new FBXLoader();
      } else if (file.name.endsWith('.obj')) {
        loader = new OBJLoader();
      }

      if (loader) {
        loader.load(
          url,
          (gltfOrObject: Object3D | { scene: Object3D; animations?: any[] }) => {
            let scene: Object3D;
            let animations: any[] = [];

            if ('scene' in gltfOrObject) {
              scene = gltfOrObject.scene;
              animations = gltfOrObject.animations || [];
            } else {
              scene = gltfOrObject;
            }

            // ✅ **创建一个 Group 作为根节点**
            const group = new Group();
            group.name = file.name;
            group.add(scene);

            // ✅ **存储动画**
            group.userData.animations = animations;

            // ✅ **解析材质**
            const materialMap: Record<string, { material: MeshStandardMaterial; visible: boolean }> = {};
            let objects = 0,
              vertices = 0,
              triangles = 0;
            const animationNames: string[] = [];

            group.traverse((object) => {
              objects++;

              if (object instanceof Mesh) {
                const meshMaterial = object.material;
                if (meshMaterial instanceof MeshStandardMaterial) {
                  const materialName = object.name || `Material_${Object.keys(materialMap).length + 1}`;
                  materialMap[materialName] = { material: meshMaterial, visible: true };
                }

                if (object.geometry) {
                  vertices += object.geometry.attributes.position.count;
                  triangles += object.geometry.index ? object.geometry.index.count / 3 : vertices / 3;
                }
              }
            });

            // ✅ **解析动画**
            if (animations.length > 0) {
              animationNames.push(...animations.map((anim) => anim.name));
            }

            // ✅ **存储到 zustand**
            useMaterialStore.getState().setMaterials(materialMap);
            useStatsStore.getState().setStats({ objects, vertices, triangles, renderTime: 0 });
            useAnimationStore.getState().setAvailableAnimations(animationNames);

            // ✅ **存入 models**
            set((state) => ({ models: [...state.models, group] }));
          },
          undefined,
          (error) => {
            message.error('模型加载失败: ' + error);
          },
        );
      }
    };
    reader.readAsDataURL(file);
  },

  removeModel: (id) => {
    set((state) => ({
      models: state.models.filter((model) => model.uuid !== id),
    }));
  },
}));
