import { Button, Layout, Space } from 'antd';
import { Cuboid as Cube, Cherry as Sphere, Move, RotateCw, Maximize } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Vector3 } from 'three';

import { ThreeEditorCore, SceneObject, TransformMode } from './core/ThreeEditorCore';
import { SceneHierarchy } from './SceneHierarchy';

const { Header, Content, Sider } = Layout;

export function ThreeEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<ThreeEditorCore | null>(null);
  const [selectedObject, setSelectedObject] = useState<SceneObject | null>(null);
  const [objects, setObjects] = useState<SceneObject[]>([]);
  const [transformMode, setTransformMode] = useState<TransformMode>('translate');

  useEffect(() => {
    if (containerRef.current && !editorRef.current) {
      const editor = new ThreeEditorCore(containerRef.current);
      editorRef.current = editor;

      editor.setSelectionCallback((object) => {
        setSelectedObject(object);
        setObjects(editor.getSceneObjects());
      });
      setObjects(editor.getSceneObjects());
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
        editorRef.current = null;
      }
    };
  }, []);

  const handleAddCube = () => {
    if (!editorRef.current) return;
    const position = new Vector3(Math.random() * 4 - 2, 0.5, Math.random() * 4 - 2);
    editorRef.current.addCube(1, 0x1890ff, position);
  };

  const handleAddSphere = () => {
    if (!editorRef.current) return;
    const position = new Vector3(Math.random() * 4 - 2, 0.5, Math.random() * 4 - 2);
    editorRef.current.addSphere(0.5, 0x1890ff, position);
  };

  const handleTransformMode = (mode: TransformMode) => {
    if (!editorRef.current) return;
    setTransformMode(mode);
    editorRef.current.setTransformMode(mode);
  };

  return (
    <Layout className="h-screen">
      <Header className="flex items-center justify-between px-6">
        <Space>
          <Button type="primary" icon={<Cube size={16} />} onClick={handleAddCube}>
            Add Cube
          </Button>
          <Button type="primary" icon={<Sphere size={16} />} onClick={handleAddSphere}>
            Add Sphere
          </Button>
          <div className="border-l border-gray-600 mx-2 h-6" />
          <Button
            type={transformMode === 'translate' ? 'primary' : 'default'}
            icon={<Move size={16} />}
            onClick={() => handleTransformMode('translate')}
          >
            Move
          </Button>
          <Button
            type={transformMode === 'rotate' ? 'primary' : 'default'}
            icon={<RotateCw size={16} />}
            onClick={() => handleTransformMode('rotate')}
          >
            Rotate
          </Button>
          <Button
            type={transformMode === 'scale' ? 'primary' : 'default'}
            icon={<Maximize size={16} />}
            onClick={() => handleTransformMode('scale')}
          >
            Scale
          </Button>
        </Space>
      </Header>
      <Layout>
        <Sider width={300} theme="dark">
          <SceneHierarchy
            objects={objects}
            selectedObject={selectedObject}
            onSelect={(object) => {
              if (editorRef.current) {
                editorRef.current.selectObject(object);
              }
            }}
          />
        </Sider>
        <Content>
          <div ref={containerRef} className="w-full h-full" />
        </Content>
      </Layout>
    </Layout>
  );
}
