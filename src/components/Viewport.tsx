import { OrbitControls, Environment, GizmoHelper, GizmoViewport } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

import { useBackgroundStore } from '@/store/backgroundStore';
import { useLightStore } from '@/store/lightStore';
import { useSceneStore } from '@/store/sceneStore'; // ✅ 直接从 store 读取
import { useStatsStore } from '@/store/statsStore';

import Model from './Model';

const Viewport: React.FC = () => {
  const { background, backgroundType, backgroundBlur } = useBackgroundStore();
  const { ambientLight, directionalLight, pointLight, spotLight } = useLightStore();
  const { objects, vertices, triangles, renderTime } = useStatsStore();
  const { showGrid, showHelpers } = useSceneStore(); // ✅ 读取网格和辅助线状态

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-gray-900">
      <Canvas shadows camera={{ position: [3, 3, 3], fov: 50 }}>
        {/* ✅ 添加光照 */}
        {ambientLight.enabled && <ambientLight intensity={ambientLight.intensity} color={ambientLight.color} />}
        {directionalLight.enabled && (
          <directionalLight
            intensity={directionalLight.intensity}
            color={directionalLight.color}
            position={[5, 5, 5]}
          />
        )}
        {pointLight.enabled && (
          <pointLight
            intensity={pointLight.intensity}
            color={pointLight.color}
            position={[0, 5, 0]}
            distance={pointLight.distance}
          />
        )}
        {spotLight.enabled && (
          <spotLight
            intensity={spotLight.intensity}
            color={spotLight.color}
            position={[2, 5, 2]}
            distance={spotLight.distance}
            angle={spotLight.angle}
          />
        )}

        {/* ✅ 3D 模型 */}
        <Suspense fallback={null}>
          <Model />
          {backgroundType === 'color' ? (
            <color attach="background" args={[background]} />
          ) : (
            typeof background === 'string' &&
            (background.endsWith('.hdr') || background.endsWith('.exr')) && (
              <Environment files={background} background blur={backgroundBlur} />
            )
          )}
        </Suspense>

        {/* ✅ 动态控制 网格 & 辅助线 */}
        {showGrid && <gridHelper args={[10, 10, 'gray', 'gray']} />}
        {showHelpers && <axesHelper args={[5]} />}

        {/* ✅ 坐标轴导航器 */}
        <GizmoHelper alignment="bottom-right" margin={[50, 50]}>
          <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="white" />
        </GizmoHelper>

        {/* ✅ 轨道控制器 */}
        <OrbitControls />
      </Canvas>

      {/* ✅ 统计数据（左下角） */}
      <div className="absolute left-4 bottom-4 bg-gray-800 p-3 rounded-md text-white text-sm shadow-md opacity-90">
        <p>物体: {objects}</p>
        <p>顶点: {vertices.toLocaleString()}</p>
        <p>三角形: {triangles.toLocaleString()}</p>
        <p>渲染时间: {renderTime.toFixed(2)} ms</p>
      </div>
    </div>
  );
};

export default Viewport;
