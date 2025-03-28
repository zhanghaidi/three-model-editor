import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

import { useEditorStore } from '@/store/editorStore';

export default function Loader() {
  const { scene } = useEditorStore();

  // ✅ **直接修改 `Group` 的 name，而不是额外包一层**
  const addToScene = (model: THREE.Object3D, fileName: string) => {
    if (model instanceof THREE.Group) {
      model.name = fileName;
      scene.add(model);
    } else {
      const group = new THREE.Group();
      group.name = fileName;
      group.add(model);
      scene.add(group);
    }
    // ✅ **触发 React 重新渲染**
    useEditorStore.setState((state) => ({
      scene: state.scene, // ✅ 让 Zustand 监听到 `scene` 变化
    }));
  };

  // ✅ **处理文件导入**
  const handleUpload = async (file: File) => {
    const fileName = file.name;
    const ext = file.name.split('.').pop()?.toLowerCase();
    const url = URL.createObjectURL(file);

    try {
      let model: THREE.Object3D | null = null;

      if (ext === 'gltf' || ext === 'glb') {
        const loader = new GLTFLoader();
        const gltf = await loader.loadAsync(url);
        model = gltf.scene;
        model.animations.push(...gltf.animations);
      } else if (ext === 'fbx') {
        const loader = new FBXLoader();
        model = await loader.loadAsync(url);
      } else if (ext === 'obj') {
        const loader = new OBJLoader();
        model = await loader.loadAsync(url);
      } else {
        message.error('不支持的文件格式');
        return;
      }

      if (model) {
        addToScene(model, fileName);
        message.success(`成功导入 ${fileName}`);
      } else {
        throw new Error('解析失败');
      }
    } catch (error) {
      message.error('模型导入失败' + error);
    } finally {
      URL.revokeObjectURL(url);
    }
  };

  return (
    <Upload
      accept=".gltf,.glb,.fbx,.obj"
      beforeUpload={(file) => {
        handleUpload(file);
        return false; // ❌ 阻止默认上传
      }}
      showUploadList={false}
    >
      <Button type="text" icon={<UploadOutlined />}>
        导入模型
      </Button>
    </Upload>
  );
}
