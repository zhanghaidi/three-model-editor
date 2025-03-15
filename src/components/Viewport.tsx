import { OrbitControls, Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

import { useLightStore } from '@/store/lightStore'; // 灯光状态
import { useSceneStore } from '@/store/sceneStore'; // 背景状态

import Model from './Model'; // 你的模型组件
import styles from './Viewport.module.scss';

const Viewport = () => {
  const { background } = useSceneStore();
  const { ambientLight, directionalLight, pointLight, spotLight } = useLightStore(); // ✅ 正确获取灯光状态

  return (
    <div className={styles.viewport}>
      <Canvas shadows camera={{ position: [3, 3, 3], fov: 50 }}>
        {/* 环境光 */}
        {ambientLight.enabled && <ambientLight intensity={ambientLight.intensity} color={ambientLight.color} />}

        {/* 平行光 */}
        {directionalLight.enabled && (
          <directionalLight
            intensity={directionalLight.intensity}
            color={directionalLight.color}
            position={[5, 5, 5]}
          />
        )}

        {/* 点光源 */}
        {pointLight.enabled && (
          <pointLight
            intensity={pointLight.intensity}
            color={pointLight.color}
            position={[0, 5, 0]}
            distance={pointLight.distance}
          />
        )}

        {/* 聚光灯 */}
        {spotLight.enabled && (
          <spotLight
            intensity={spotLight.intensity}
            color={spotLight.color}
            position={[2, 5, 2]}
            distance={spotLight.distance}
            angle={spotLight.angle}
          />
        )}

        {/* 3D 模型和环境 */}
        <Suspense fallback={null}>
          <Model />
          <Environment files={background} background />
        </Suspense>

        {/* 轨道控制器 */}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Viewport;
