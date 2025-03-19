import { TransformControls } from '@react-three/drei';

import { useEditorStore } from '@/store/editorStore';

const TransformControl = () => {
  const { selectedObject, transformMode } = useEditorStore();

  if (!selectedObject) return null;

  return <TransformControls object={selectedObject} mode={transformMode} />;
};

export default TransformControl;
