import { UploadOutlined } from '@ant-design/icons';
import { Card, Button, Upload, Slider, message } from 'antd'; // 引入 message
import React, { useState, useEffect } from 'react';

import { useBackgroundStore } from '@/store/backgroundStore';

const SiderbarSettings: React.FC = () => {
  const {
    background,
    setBackground,
    backgroundType,
    setBackgroundType,
    backgroundIntensity,
    setBackgroundIntensity,
    backgroundBlur,
    setBackgroundBlur,
  } = useBackgroundStore();

  const [color, setColor] = useState(background); // 确保颜色选择不会回跳
  const [, setUploadedFile] = useState<string | null>(null);

  // 背景图片选项
  const backgroundImages = ['/textures/view-1.png', '/textures/view-2.png', '/textures/view-3.png'];
  // 全景图选项
  const panoramaImages = ['/textures/bg1.hdr', '/textures/bg2.hdr', '/textures/bg3.hdr'];

  // **同步 Zustand Store 颜色**
  useEffect(() => {
    if (backgroundType === 'color') {
      setColor(background);
    }
  }, [background, backgroundType]);

  // 处理背景类型切换
  const handleBackgroundChange = (type: 'color' | 'image' | 'panorama') => {
    setBackgroundType(type);
  };

  // 颜色背景更换
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    setBackground(newColor); // 确保 setBackground 接收的是颜色代码
  };

  // 选择背景图片
  const handleImageSelect = (image: string) => {
    setBackground(image);
  };

  // 选择全景图
  const handlePanoramaSelect = (image: string) => {
    setBackground(image);
  };

  // 处理上传
  const handleUpload = (info: any) => {
    if (info.file.status === 'done') {
      const file = info.file.originFileObj;
      const fileType = file.name.split('.').pop()?.toLowerCase();

      // 校验文件类型是否为 .hdr, .exr
      if (fileType === 'hdr' || fileType === 'exr') {
        const url = URL.createObjectURL(file);
        setUploadedFile(url);
        setBackground(url);
      } else {
        message.error('Invalid file type. Please upload an .hdr, .exr, or .png file.');
      }
    }
  };

  return (
    <>
      <Card title="背景设置" className="background-settings">
        {/* 背景类型选择 */}
        <div>
          {['color', 'image', 'panorama'].map((type) => (
            <Button
              key={type}
              className={`w-1/3 ${backgroundType === type ? 'bg-blue-500 text-white' : ''}`}
              onClick={() => handleBackgroundChange(type as 'color' | 'image' | 'panorama')}
            >
              {type === 'color' ? '颜色' : type === 'image' ? '图片' : '全景图'}
            </Button>
          ))}
        </div>

        {/* 颜色背景 */}
        {backgroundType === 'color' && (
          <div>
            <p>选择颜色：</p>
            <input type="color" value={color} onChange={handleColorChange} />
          </div>
        )}

        {/* 图片背景 */}
        {backgroundType === 'image' && (
          <div>
            <p>选择图片：</p>
            <div>
              {backgroundImages.map((img, index) => (
                <img key={index} src={img} alt="背景" className="" onClick={() => handleImageSelect(img)} />
              ))}
            </div>
          </div>
        )}

        {/* 全景图背景 */}
        {backgroundType === 'panorama' && (
          <div>
            <p>选择全景图：</p>
            <div className="">
              {panoramaImages.map((img, index) => (
                <img key={index} src={img} alt="全景图" className="" onClick={() => handlePanoramaSelect(img)} />
              ))}
            </div>

            {/* 上传自定义全景图 */}
            <Upload showUploadList={false} beforeUpload={() => false} onChange={handleUpload}>
              <Button icon={<UploadOutlined />}>上传全景图</Button>
            </Upload>
          </div>
        )}

        {/* 背景强度 */}
        <div className="">
          <p className="">背景强度</p>
          <Slider min={0} max={2} step={0.1} value={backgroundIntensity} onChange={setBackgroundIntensity} />
        </div>

        {/* 背景模糊 */}
        <div className="">
          <p className="">背景模糊</p>
          <Slider min={0} max={1} step={0.05} value={backgroundBlur} onChange={setBackgroundBlur} />
        </div>
      </Card>
    </>
  );
};

export default SiderbarSettings;
