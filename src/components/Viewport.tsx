import { OrbitControls, Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

import { useLightStore } from '@/store/lightStore';
import { useSceneStore } from '@/store/sceneStore';

import Model from './Model';

const Viewport = () => {
  const { background } = useSceneStore();
  const { ambientLight, directionalLight, pointLight, spotLight } = useLightStore();

  return (
    <div className="absolute inset-0 flex justify-center items-center">
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
