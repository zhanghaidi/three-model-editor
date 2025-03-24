import {
  EyeOutlined,
  EyeInvisibleOutlined,
  FolderOpenOutlined,
  FolderOutlined,
  FileOutlined,
  CameraOutlined,
  ShareAltOutlined,
  SunOutlined,
  AimOutlined,
  QuestionOutlined,
  PlusSquareOutlined,
  MinusSquareOutlined,
} from '@ant-design/icons';
import { List, Button } from 'antd';
import { useState } from 'react';
import { LuBone } from 'react-icons/lu';
import * as THREE from 'three';

import { useEditorStore } from '@/store/editorStore';

const SidebarScene = () => {
  const { scene, selectedObject, setSelectedObject } = useEditorStore();
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());

  // ✅ **切换展开状态**
  const toggleExpand = (uuid: string) => {
    setExpandedKeys((prev) => {
      const newSet = new Set(prev);
      newSet.has(uuid) ? newSet.delete(uuid) : newSet.add(uuid);
      return newSet;
    });
  };

  // ✅ **获取对象图标**
  const getIcon = (object: THREE.Object3D) => {
    if (object instanceof THREE.PerspectiveCamera || object instanceof THREE.OrthographicCamera) {
      return <CameraOutlined style={{ color: '#006d75' }} />;
    }
    if (object instanceof THREE.Mesh) {
      return <FileOutlined style={{ color: '#FFD700' }} />; // 📄 统一金色
    }
    if (object instanceof THREE.Sprite) {
      return <ShareAltOutlined style={{ color: '#FFD700' }} />;
    }
    if (object instanceof THREE.Bone) {
      return <LuBone style={{ color: '#FFD700' }} />;
    }
    if (object instanceof THREE.Light) {
      return <SunOutlined style={{ color: '#FFD700' }} />;
    }
    if (object instanceof THREE.Line || object instanceof THREE.Points) {
      return <AimOutlined style={{ color: '#FFD700' }} />;
    }
    if (object instanceof THREE.Group || object.children.length > 0) {
      return expandedKeys.has(object.uuid) ? (
        <FolderOpenOutlined style={{ color: '#FFD700' }} />
      ) : (
        <FolderOutlined style={{ color: '#FFD700' }} />
      );
    }

    return <QuestionOutlined style={{ color: '#FFD700' }} />;
  };

  // ✅ **递归生成列表**
  const generateList = (object: THREE.Object3D, depth = 0) => {
    const isGroup = object instanceof THREE.Group || object.children.length > 0;
    const isExpanded = expandedKeys.has(object.uuid);

    const item = {
      key: object.uuid,
      name: object.name || object.type,
      object,
      icon: getIcon(object),
      visible: object.visible,
      depth,
      isGroup,
      isExpanded,
    };

    let children: any[] = [];
    if (isExpanded) {
      children = object.children.flatMap((child) => generateList(child, depth + 1));
    }

    return [item, ...children];
  };

  // ✅ **仅显示 `scene.children`**
  const objectList = scene.children.flatMap((child) => generateList(child));

  return (
    <div className="scene-list">
      <List
        size="small"
        dataSource={objectList}
        renderItem={(item) => (
          <List.Item
            key={item.key}
            className={selectedObject?.uuid === item.key ? 'selected' : ''}
            onClick={() => setSelectedObject(item.object)}
            style={{
              paddingLeft: `${item.depth * 18}px`,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {/* ✅ 组可以折叠 */}
            {item.isGroup && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(item.key);
                }}
                style={{ marginRight: '8px', cursor: 'pointer' }}
              >
                {item.isExpanded ? <MinusSquareOutlined /> : <PlusSquareOutlined />}
              </span>
            )}
            <span style={{ marginRight: '6px' }}>{item.icon}</span>
            <span>{item.name}</span>
            <Button
              type="text"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                // item.object.visible = !item.object.visible;
                // setSelectedObject({ ...item.object });
                console.log(item.object);
              }}
              style={{
                marginLeft: 'auto',
                width: 24, // ✅ 保持按钮宽度统一
                backgroundColor: item.visible ? 'transparent' : 'rgba(0,0,0,0.1)', // ✅ 不可见时背景灰色
              }}
            >
              {item.visible ? <EyeOutlined /> : <EyeInvisibleOutlined style={{ color: 'gray' }} />}
            </Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default SidebarScene;
