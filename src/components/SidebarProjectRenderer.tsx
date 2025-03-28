// import { Select, Checkbox } from 'antd';
// import React from 'react';
// import * as THREE from 'three';

// import { useRenderStore } from '@/store/rendererStore';
// import styles from '@/styles/sidebarProjectRenderer.module.scss';

// import SidebarProjectBackground from './SidebarProjectBackground';

// const { Option } = Select;

// const SidebarProjectRenderer: React.FC = () => {
//   const {
//     environment,
//     setEnvironment,
//     fog,
//     setFog,
//     antialias,
//     setAntialias,
//     shadowQuality,
//     setShadowQuality,
//     toneMapping,
//     setToneMapping,
//   } = useRenderStore();

//   return (
//     <div className={styles.container}>
//       {/* 背景 */}
//       <SidebarProjectBackground />

//       {/* 环境 */}
//       <div className={styles.settingRow}>
//         <span>环境</span>
//         <Select value={environment} onChange={setEnvironment} className={styles.select}>
//           <Option value="None">无</Option>
//           <Option value="Background">背景</Option>
//           <Option value="Equirectangular">全景图</Option>
//           <Option value="Room">房间</Option>
//         </Select>
//       </div>

//       {/* 雾 */}
//       <div className={styles.settingRow}>
//         <span>雾</span>
//         <Select value={fog} onChange={setFog} className={styles.select}>
//           <Option value="None">无</Option>
//           <Option value="Fog">线性</Option>
//           <Option value="FogExp2">指数</Option>
//         </Select>
//       </div>

//       {/* 抗锯齿 */}
//       <div className={styles.settingRow}>
//         <span>抗锯齿</span>
//         <Checkbox checked={antialias} onChange={(e) => setAntialias(e.target.checked)} />
//       </div>

//       {/* 阴影 */}
//       <div className={styles.settingRow}>
//         <span>阴影</span>
//         <Select value={shadowQuality} onChange={setShadowQuality} className={styles.select}>
//           <Option value={THREE.BasicShadowMap}>低</Option>
//           <Option value={THREE.PCFShadowMap}>中</Option>
//           <Option value={THREE.PCFSoftShadowMap}>高</Option>
//         </Select>
//       </div>

//       {/* 色调映射 */}
//       <div className={styles.settingRow}>
//         <span>色调映射</span>
//         <Select value={toneMapping} onChange={setToneMapping} className={styles.select}>
//           <Option value={THREE.NoToneMapping}>无</Option>
//           <Option value={THREE.LinearToneMapping}>线性色调</Option>
//           <Option value={THREE.ReinhardToneMapping}>莱因哈德色调</Option>
//           <Option value={THREE.CineonToneMapping}>胶片色调</Option>
//           <Option value={THREE.ACESFilmicToneMapping}>电影色调</Option>
//           <Option value={THREE.AgXToneMapping}>AgX色调</Option>
//           <Option value={THREE.NeutralToneMapping}>中性色调</Option>
//         </Select>
//       </div>
//     </div>
//   );
// };

// export default SidebarProjectRenderer;

import { Select, Checkbox } from 'antd';
import React from 'react';
import * as THREE from 'three';

import { useRenderStore } from '@/store/rendererStore';
import styles from '@/styles/sidebarProjectRenderer.module.scss';

import SidebarProjectBackground from './SidebarProjectBackground';

const { Option } = Select;

const SidebarProjectRenderer: React.FC = () => {
  const {
    environment,
    setEnvironment,
    fog,
    setFog,
    antialias,
    setAntialias,
    shadowQuality,
    setShadowQuality,
    toneMapping,
    setToneMapping,
    outputColorSpace,
    setOutputColorSpace,
    autoRotate,
    setAutoRotate,
  } = useRenderStore();

  return (
    <div className={styles.container}>
      {/* 背景 */}
      <SidebarProjectBackground />

      {/* 环境 */}
      <div className={styles.settingRow}>
        <span>环境</span>
        <Select value={environment} onChange={setEnvironment} className={styles.select}>
          <Option value="None">无</Option>
          <Option value="Background">背景</Option>
          <Option value="Equirectangular">全景图</Option>
          <Option value="Room">房间</Option>
        </Select>
      </div>

      {/* 雾 */}
      <div className={styles.settingRow}>
        <span>雾</span>
        <Select value={fog || 'None'} onChange={setFog} className={styles.select}>
          <Option value="None">无</Option>
          <Option value="Fog">线性</Option>
          <Option value="FogExp2">指数</Option>
        </Select>
      </div>

      {/* 抗锯齿 */}
      <div className={styles.settingRow}>
        <span>抗锯齿</span>
        <Checkbox checked={antialias} onChange={(e) => setAntialias(e.target.checked)} />
      </div>

      {/* 阴影质量 */}
      <div className={styles.settingRow}>
        <span>阴影</span>
        <Select value={shadowQuality} onChange={setShadowQuality} className={styles.select}>
          <Option value={THREE.BasicShadowMap}>低</Option>
          <Option value={THREE.PCFShadowMap}>中</Option>
          <Option value={THREE.PCFSoftShadowMap}>高</Option>
        </Select>
      </div>

      {/* 色调映射 */}
      <div className={styles.settingRow}>
        <span>色调映射</span>
        <Select value={toneMapping} onChange={setToneMapping} className={styles.select}>
          <Option value={THREE.NoToneMapping}>无</Option>
          <Option value={THREE.LinearToneMapping}>线性色调</Option>
          <Option value={THREE.ReinhardToneMapping}>莱因哈德色调</Option>
          <Option value={THREE.CineonToneMapping}>胶片色调</Option>
          <Option value={THREE.ACESFilmicToneMapping}>电影色调</Option>
          <Option value={THREE.AgXToneMapping}>AgX色调</Option>
          <Option value={THREE.NeutralToneMapping}>中性色调</Option>
        </Select>
      </div>

      <div className={styles.settingRow}>
        <span>颜色空间</span>
        <Select value={outputColorSpace} onChange={setOutputColorSpace} className={styles.select}>
          <Option value={THREE.LinearSRGBColorSpace}>线性</Option>
          <Option value={THREE.SRGBColorSpace}>sRGB</Option>
        </Select>
      </div>

      {/* 自动旋转 */}
      <div className={styles.settingRow}>
        <span>自动旋转</span>
        <Checkbox checked={autoRotate} onChange={(e) => setAutoRotate(e.target.checked)} />
      </div>
    </div>
  );
};

export default SidebarProjectRenderer;
