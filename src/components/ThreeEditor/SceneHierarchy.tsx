import { Tree } from 'antd';
import { Cuboid as Cube, Cherry as Sphere, Sun, Grid as Grid3, LampFloor } from 'lucide-react';

import { SceneObject } from '@/components/ThreeEditor/core/ThreeEditorCore';

import type { DataNode } from 'antd/es/tree';

interface SceneHierarchyProps {
  objects: SceneObject[];
  selectedObject: SceneObject | null;
  onSelect: (object: SceneObject | null) => void;
}

export function SceneHierarchy({ objects, selectedObject, onSelect }: SceneHierarchyProps) {
  const getIconForType = (type: string) => {
    switch (type) {
      case 'Cube':
        return <Cube className="text-blue-500" size={16} />;
      case 'Sphere':
        return <Sphere className="text-blue-500" size={16} />;
      case 'DirectionalLight':
        return <Sun className="text-yellow-500" size={16} />;
      case 'AmbientLight':
        return <LampFloor className="text-yellow-500" size={16} />;
      case 'GridHelper':
        return <Grid3 className="text-gray-500" size={16} />;
      default:
        return null;
    }
  };

  const treeData: DataNode[] = objects.map((object) => ({
    key: object.uuid,
    title: object.userData.name,
    icon: getIconForType(object.userData.type),
  }));

  return (
    <div className="scene-tree p-4">
      <h2 className="text-white text-lg mb-4">Scene Hierarchy</h2>
      <Tree
        treeData={treeData}
        selectedKeys={selectedObject ? [selectedObject.uuid] : []}
        onSelect={(selectedKeys) => {
          const object = objects.find((obj) => obj.uuid === selectedKeys[0]);
          onSelect(object || null);
        }}
      />
    </div>
  );
}
