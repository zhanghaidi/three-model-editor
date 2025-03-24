import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import * as THREE from 'three';

import { useEditorStore } from '@/store/editorStore';

import SidebarGeometry from './SidebarGeometry';
import SidebarMaterial from './SidebarMaterial';
import SidebarObject from './SidebarObject';
import SidebarScript from './SidebarScript';

const SidebarProperties = () => {
  const { selectedObject } = useEditorStore();
  const [activeTab, setActiveTab] = useState('object');

  // ✅ **控制选项卡的显示/隐藏**
  const isGeometryVisible = !!(selectedObject && (selectedObject as THREE.Mesh).geometry);
  const isMaterialVisible = !!(selectedObject && (selectedObject as THREE.Mesh).material);
  const isScriptVisible = selectedObject ? !(selectedObject instanceof THREE.Camera) : false;

  // ✅ **切换对象时自动调整激活的 Tab**
  useEffect(() => {
    if (!selectedObject) {
      setActiveTab('object');
      return;
    }

    if (activeTab === 'geometry' && !isGeometryVisible) {
      setActiveTab('object');
    } else if (activeTab === 'material' && !isMaterialVisible) {
      setActiveTab('object');
    } else if (activeTab === 'script' && !isScriptVisible) {
      setActiveTab('object');
    }
  }, [selectedObject, isGeometryVisible, isMaterialVisible, isScriptVisible, activeTab]);

  // ✅ **改进的 `items` 处理方式**
  const items = [{ key: 'object', label: '属性', children: <SidebarObject /> }];

  if (isGeometryVisible) {
    items.push({ key: 'geometry', label: '几何体', children: <SidebarGeometry /> });
  }
  if (isMaterialVisible) {
    items.push({ key: 'material', label: '材质', children: <SidebarMaterial /> });
  }
  if (isScriptVisible) {
    items.push({ key: 'script', label: '脚本', children: <SidebarScript /> });
  }

  return (
    <div className="sidebar-properties">
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={items} />
    </div>
  );
};

export default SidebarProperties;
