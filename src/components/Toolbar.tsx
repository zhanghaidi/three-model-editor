import { SelectOutlined, DragOutlined, RedoOutlined, ShrinkOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';
import { TransformControls } from 'three-stdlib';

import { useEditorStore } from '@/store/editorStore';

const Toolbar: React.FC = () => {
  const { scene, camera, renderer, selectedObject } = useEditorStore();
  const [mode, setMode] = React.useState<'translate' | 'rotate' | 'scale' | null>(null);

  React.useEffect(() => {
    if (!selectedObject || !camera || !renderer) return;

    const transformControls = new TransformControls(camera, renderer.domElement);
    scene.add(transformControls);
    transformControls.attach(selectedObject);

    transformControls.setMode(mode ?? 'translate');

    return () => {
      transformControls.detach();
      scene.remove(transformControls);
    };
  }, [selectedObject, mode, scene, camera, renderer]);

  return (
    <div className="toolbar">
      <Tooltip title="移动">
        <button className={mode === 'translate' ? 'active' : ''} onClick={() => setMode('translate')}>
          <DragOutlined />
        </button>
      </Tooltip>

      <Tooltip title="旋转">
        <button className={mode === 'rotate' ? 'active' : ''} onClick={() => setMode('rotate')}>
          <RedoOutlined />
        </button>
      </Tooltip>

      <Tooltip title="缩放">
        <button className={mode === 'scale' ? 'active' : ''} onClick={() => setMode('scale')}>
          <ShrinkOutlined />
        </button>
      </Tooltip>

      <Tooltip title="重置">
        <button onClick={() => setMode(null)}>
          <SelectOutlined />
        </button>
      </Tooltip>
    </div>
  );
};

export default Toolbar;
