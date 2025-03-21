import { PictureOutlined, BoxPlotOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import * as THREE from 'three';

import { useEditorStore } from '@/store/editorStore';

const SidebarScene = () => {
  const { scene, selectedObject, setSelectedObject } = useEditorStore();

  // ✅ **生成树形结构**
  const generateTree = (object: THREE.Object3D): any => {
    const isMesh = object instanceof THREE.Mesh;
    const materialIcon = isMesh ? <BoxPlotOutlined style={{ color: '#FFD700' }} /> : null;

    let textures: string[] = [];

    if (isMesh) {
      const material = object.material;

      // ✅ **处理 `MultiMaterial` 或 `单一材质`**
      const materials = Array.isArray(material) ? material : [material];

      textures = materials
        .map((mat) => {
          if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhongMaterial) {
            return mat.map ? `${mat.name} (${mat.map.name})` : mat.name;
          }
          return mat.name;
        })
        .filter((name) => name); // 过滤空材质
    }

    return {
      title: (
        <span>
          {materialIcon} {object.name || object.type}{' '}
          {textures.length > 0 && (
            <span style={{ marginLeft: '8px', color: '#aaa' }}>
              <PictureOutlined /> {textures.join(', ')}
            </span>
          )}
        </span>
      ),
      key: object.uuid,
      children: object.children.map(generateTree),
    };
  };

  const treeData = [generateTree(scene)];

  return (
    <div className="Outliner">
      <Tree
        treeData={treeData}
        defaultExpandAll={false} // ✅ **默认折叠**
        selectedKeys={selectedObject ? [selectedObject.uuid] : []}
        onSelect={(keys) => {
          if (keys.length > 0) {
            const selected = scene.getObjectByProperty('uuid', keys[0]) as THREE.Object3D | null;
            setSelectedObject(selected ?? null);
          } else {
            setSelectedObject(null);
          }
        }}
      />
    </div>
  );
};

export default SidebarScene;
