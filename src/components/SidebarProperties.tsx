import { Input, InputNumber } from 'antd';

import { useEditorStore } from '@/store/editorStore';

const SidebarProperties: React.FC = () => {
  const { selectedObject, updateObjectProperty } = useEditorStore();

  if (!selectedObject) return <p>请选择一个对象进行编辑</p>;

  return (
    <div className="sidebar-properties">
      <h3>对象属性</h3>

      {/* ✅ 修改名称 */}
      <label>名称:</label>
      <Input
        value={selectedObject.name}
        onChange={(e) => updateObjectProperty(selectedObject, 'name', e.target.value)}
      />

      {/* ✅ 修改位置 */}
      <label>位置:</label>
      <div className="property-row">
        <InputNumber
          value={selectedObject.position.x}
          onChange={(value) => updateObjectProperty(selectedObject, 'position.x', value)}
        />
        <InputNumber
          value={selectedObject.position.y}
          onChange={(value) => updateObjectProperty(selectedObject, 'position.y', value)}
        />
        <InputNumber
          value={selectedObject.position.z}
          onChange={(value) => updateObjectProperty(selectedObject, 'position.z', value)}
        />
      </div>

      {/* ✅ 修改旋转 */}
      <label>旋转:</label>
      <div className="property-row">
        <InputNumber
          value={selectedObject.rotation.x}
          onChange={(value) => updateObjectProperty(selectedObject, 'rotation.x', value)}
        />
        <InputNumber
          value={selectedObject.rotation.y}
          onChange={(value) => updateObjectProperty(selectedObject, 'rotation.y', value)}
        />
        <InputNumber
          value={selectedObject.rotation.z}
          onChange={(value) => updateObjectProperty(selectedObject, 'rotation.z', value)}
        />
      </div>

      {/* ✅ 修改缩放 */}
      <label>缩放:</label>
      <div className="property-row">
        <InputNumber
          value={selectedObject.scale.x}
          onChange={(value) => updateObjectProperty(selectedObject, 'scale.x', value)}
        />
        <InputNumber
          value={selectedObject.scale.y}
          onChange={(value) => updateObjectProperty(selectedObject, 'scale.y', value)}
        />
        <InputNumber
          value={selectedObject.scale.z}
          onChange={(value) => updateObjectProperty(selectedObject, 'scale.z', value)}
        />
      </div>
    </div>
  );
};

export default SidebarProperties;
