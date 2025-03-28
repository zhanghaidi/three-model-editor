import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Select, Slider, Upload, message } from 'antd';

import { useBackgroundStore } from '@/store/backgroundStore';
import styles from '@/styles/sidebarProjectBackground.module.scss';

const { Option } = Select;

const SidebarProjectBackground: React.FC = () => {
  const {
    backgroundType,
    setBackgroundType,
    backgroundColor,
    setBackgroundColor,
    backgroundTexture,
    setBackgroundTexture,
    backgroundEquirectangular,
    setBackgroundEquirectangular,
    backgroundIntensity,
    setBackgroundIntensity,
    backgroundBlur,
    setBackgroundBlur,
    backgroundRotation,
    setBackgroundRotation,
  } = useBackgroundStore();

  // ✅ **文件上传处理**
  const handleTextureUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      message.error('仅支持图片文件');
      return false;
    }
    const url = URL.createObjectURL(file);
    setBackgroundTexture(url);
    return false; // 阻止默认上传行为
  };

  const handleEquirectangularUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setBackgroundEquirectangular(url);
    return false;
  };

  return (
    <div className={styles.container}>
      {/* ✅ 背景类型选择 */}
      <div className={styles.settingRow}>
        <span>背景</span>
        <Select value={backgroundType} onChange={setBackgroundType} className={styles.select}>
          <Option value="None">无</Option>
          <Option value="Color">颜色</Option>
          <Option value="Texture">纹理</Option>
          <Option value="Equirectangular">等深图</Option>
        </Select>
      </div>

      {/* ✅ 颜色背景 */}
      {backgroundType === 'Color' && (
        <div className={styles.settingRow}>
          <span>颜色</span>
          <Input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            className={styles.colorInput}
          />
        </div>
      )}

      {/* ✅ 纹理背景 */}
      {backgroundType === 'Texture' && (
        <div className={styles.imageSection}>
          <Upload beforeUpload={handleTextureUpload} showUploadList={false} accept="image/*">
            <Button icon={<UploadOutlined />}>上传纹理</Button>
          </Upload>
          {backgroundTexture && <img src={backgroundTexture} alt="背景预览" className={styles.backgroundPreview} />}
        </div>
      )}

      {/* ✅ HDR/等深图背景 */}
      {backgroundType === 'Equirectangular' && (
        <div className={styles.imageSection}>
          <Upload beforeUpload={handleEquirectangularUpload} showUploadList={false}>
            <Button icon={<UploadOutlined />}>上传等深图</Button>
          </Upload>
          {backgroundEquirectangular && (
            <img src={backgroundEquirectangular} alt="背景预览" className={styles.backgroundPreview} />
          )}
          <div className={styles.settingRow}>
            <span>强度</span>
            <Slider min={0} max={5} step={0.1} value={backgroundIntensity} onChange={setBackgroundIntensity} />
          </div>
          <div className={styles.settingRow}>
            <span>模糊</span>
            <Slider min={0} max={1} step={0.01} value={backgroundBlur} onChange={setBackgroundBlur} />
          </div>
          <div className={styles.settingRow}>
            <span>旋转</span>
            <Slider min={-180} max={180} step={1} value={backgroundRotation} onChange={setBackgroundRotation} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarProjectBackground;
