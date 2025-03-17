import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { List, Select, Upload, Button } from 'antd';
import { BiCube } from 'react-icons/bi';
import * as THREE from 'three';

import { useMaterialStore } from '@/store/materialStore';

const systemTextures = ['/textures/view-1.png', '/textures/view-2.png', '/textures/view-3.png'];

const MaterialList: React.FC = () => {
  const {
    materials,
    selectedMaterial,
    selectMaterial,
    toggleMaterialVisibility,
    updateMaterialProperties,
    changeMaterialType,
  } = useMaterialStore();
  const materialNames = Object.keys(materials);

  return (
    <div className="bg-white text-black rounded-md p-2 min-h-[200px] max-h-[500px] overflow-y-auto resize-y border border-gray-300">
      {/* 🔹 材质列表 */}
      <List
        size="small"
        bordered
        dataSource={materialNames}
        renderItem={(name) => (
          <List.Item
            className={`cursor-pointer flex justify-between items-center p-2 ${
              selectedMaterial === name ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
            onClick={() => selectMaterial(name)}
          >
            <div className="flex items-center gap-2">
              <BiCube className="text-lg text-gray-600" />
              <span>{name}</span>
            </div>
            <span
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                toggleMaterialVisibility(name);
              }}
            >
              {materials[name].visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
          </List.Item>
        )}
      />

      {/* 🔹 选中的材质属性 */}
      {selectedMaterial && (
        <div className="my-3">
          {/* 🔹 材质类型选择 */}
          <h3 className="text-gray-800  mb-2">材质类型</h3>
          <Select
            value={materials[selectedMaterial].material instanceof THREE.MeshBasicMaterial ? 'basic' : 'standard'}
            className="w-full"
            onChange={(value) => changeMaterialType(selectedMaterial, value as 'basic' | 'standard')}
          >
            <Select.Option value="standard">标准材质 (MeshStandardMaterial)</Select.Option>
            <Select.Option value="basic">基础材质 (MeshBasicMaterial)</Select.Option>
          </Select>

          {/* 🔹 贴图管理（贴图 + 按钮） */}
          <h3 className="text-gray-800 mt-3 my-3">材质贴图</h3>
          <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
            <div className="w-24 h-24 flex items-center justify-center border border-gray-300 bg-white rounded-md">
              {materials[selectedMaterial].material.map instanceof THREE.Texture ? (
                <img
                  src={(materials[selectedMaterial].material.map as THREE.Texture).image?.src || ''}
                  alt="当前贴图"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <span className="text-gray-500 text-sm">无贴图</span>
              )}
            </div>

            {/* 更换贴图按钮 */}
            <Upload
              showUploadList={false}
              beforeUpload={(file) => {
                const url = URL.createObjectURL(file);
                updateMaterialProperties(selectedMaterial, { map: url });
                return false;
              }}
            >
              <Button>更换贴图</Button>
            </Upload>
          </div>

          {/* 🔹 系统贴图 */}
          <h3 className="text-gray-800 mt-3 mb-2">系统贴图</h3>
          <div className="grid grid-cols-3 gap-2">
            {systemTextures.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="系统贴图"
                className="w-16 h-16 object-cover cursor-pointer border border-gray-400"
                onClick={() => updateMaterialProperties(selectedMaterial, { map: img })}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialList;
