import { UploadOutlined } from '@ant-design/icons';
import { Upload, Button } from 'antd';
import * as THREE from 'three';

import { useMaterialStore } from '@/store/materialStore';

const systemTextures = ['/textures/view-1.png', '/textures/view-2.png', '/textures/view-3.png'];

const MaterialTextures: React.FC = () => {
  const { selectedMaterial, updateMaterial } = useMaterialStore();

  if (!selectedMaterial) return <p className="text-gray-500">请先选择材质</p>;

  const handleTextureSelect = (texture: string) => {
    updateMaterial(selectedMaterial, { map: new THREE.TextureLoader().load(texture) });
  };

  return (
    <div className="p-3 bg-gray-900 text-white rounded-md">
      <h3 className="mb-2">系统贴图</h3>
      <div className="grid grid-cols-4 gap-2">
        {systemTextures.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="系统贴图"
            className="w-16 h-16 object-cover cursor-pointer border border-gray-400"
            onClick={() => handleTextureSelect(img)}
          />
        ))}
      </div>

      <Upload showUploadList={false} beforeUpload={() => false}>
        <Button icon={<UploadOutlined />} className="w-full mt-2">
          加载外部贴图
        </Button>
      </Upload>
    </div>
  );
};

export default MaterialTextures;
