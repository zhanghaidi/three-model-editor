import { OrbitControls, Environment, GizmoHelper, GizmoViewport } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';

import { useBackgroundStore } from '@/store/backgroundStore';
import { useLightStore } from '@/store/lightStore';
import { useStatsStore } from '@/store/statsStore'; // ✅ 读取统计信息

import Model from './Model';

const Viewport = () => {
  const { background, backgroundType, backgroundBlur } = useBackgroundStore();
  const { ambientLight, directionalLight, pointLight, spotLight } = useLightStore();

  const [showGrid, setShowGrid] = useState(true);
  const [showHelpers, setShowHelpers] = useState(true);
  const { objects, vertices, triangles, renderTime } = useStatsStore(); // ✅ 获取统计信息

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

        {/* ✅ 网格 & 辅助线 */}
        {showGrid && <gridHelper args={[10, 10, 'gray', 'gray']} />}
        {showHelpers && <axesHelper args={[5]} />}

        {/* ✅ 坐标轴导航器 */}
        <GizmoHelper alignment="bottom-right" margin={[380, 50]}>
          <GizmoViewport />
        </GizmoHelper>

        {/* ✅ 轨道控制器 */}
        <OrbitControls />
      </Canvas>

      {/* ✅ 右上角 控制面板（网格 & 辅助线） */}
      <div className="absolute top-4 right-80 bg-gray-800 p-3 rounded-lg text-white text-sm shadow-md opacity-90">
        <h3 className="text-md font-semibold border-b pb-1 mb-2">显示设置</h3>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={showGrid} onChange={() => setShowGrid(!showGrid)} /> 显示网格
        </label>
        <label className="flex items-center gap-2 mt-2">
          <input type="checkbox" checked={showHelpers} onChange={() => setShowHelpers(!showHelpers)} /> 显示辅助线
        </label>
      </div>

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
