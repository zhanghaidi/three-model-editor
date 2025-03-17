import { Switch, Slider, Input } from 'antd';
import { useState } from 'react';

const MaterialProperties: React.FC = () => {
  const [color, setColor] = useState('#ffffff');
  const [opacity, setOpacity] = useState(1);
  const [depthWrite, setDepthWrite] = useState(true);
  const [wireframe, setWireframe] = useState(false);

  return (
    <div className="p-3 bg-gray-900 text-white rounded-md">
      <div className="flex items-center justify-between my-3">
        <span>材质颜色</span>
        <Input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-12 h-6 cursor-pointer"
        />
      </div>

      <div className="flex items-center justify-between my-3">
        <span>透明度</span>
        <Slider min={0} max={1} step={0.01} value={opacity} onChange={setOpacity} className="w-2/3" />
      </div>

      <div className="flex items-center justify-between mb-2">
        <span>深度写入</span>
        <Switch checked={depthWrite} onChange={setDepthWrite} />
      </div>

      <div className="flex items-center justify-between">
        <span>网格</span>
        <Switch checked={wireframe} onChange={setWireframe} />
      </div>
    </div>
  );
};

export default MaterialProperties;
