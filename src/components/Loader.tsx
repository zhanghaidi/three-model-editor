import { message } from 'antd';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

import { useAnimationStore } from '@/store/animationStore';
import { useEditorStore } from '@/store/editorStore';

export default function Loader() {
  const { scene } = useEditorStore();
  const { addModelAnimations } = useAnimationStore();

  // ✅ **直接修改 `Group` 的 name，而不是额外包一层**
  const addToScene = (model: THREE.Object3D, fileName: string) => {
    // ✅ 如果 `model` 是 `Group`，直接改 `name`，避免包裹额外 `Group`
    if (model instanceof THREE.Group) {
      model.name = fileName;
      scene.add(model);
    } else {
      // ✅ 如果 `model` 不是 `Group`，仍然包一层 `Group`
      const group = new THREE.Group();
      group.name = fileName;
      group.add(model);
      scene.add(group);
    }
  };

  const handleUpload = (file: File) => {
    const fileName = file.name; // ✅ **包含扩展名**
    const ext = file.name.split('.').pop()?.toLowerCase();
    const url = URL.createObjectURL(file);

    let loader;
    switch (ext) {
      case 'gltf':
      case 'glb':
        loader = new GLTFLoader();
        loader.load(url, (gltf) => {
          if (gltf.scene) {
            addToScene(gltf.scene, fileName);

            // ✅ **存储动画**
            if (gltf.animations.length > 0) {
              addModelAnimations(fileName, gltf.animations);
            }
          } else {
            message.error('GLTF 加载失败');
          }
          URL.revokeObjectURL(url);
        });
        break;

      case 'fbx':
        loader = new FBXLoader();
        loader.load(url, (fbx) => {
          if (fbx) {
            addToScene(fbx, fileName);

            // ✅ **存储动画**
            if ((fbx as any).animations?.length > 0) {
              addModelAnimations(fileName, (fbx as any).animations);
            }
          } else {
            message.error('FBX 加载失败');
          }
          URL.revokeObjectURL(url);
        });
        break;

      case 'obj':
        loader = new OBJLoader();
        loader.load(url, (obj) => {
          if (obj) {
            addToScene(obj, fileName);
          } else {
            message.error('OBJ 加载失败');
          }
          URL.revokeObjectURL(url);
        });
        break;

      default:
        message.error('不支持的文件格式');
    }
  };
  return (
    <div>
      <input type="file" onChange={(e) => handleUpload(e.target.files![0])} />
    </div>
  );
}
