import { OrbitControls, Environment, GizmoHelper, GizmoViewport, TransformControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useMemo, useRef } from 'react';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

import { useBackgroundStore } from '@/store/backgroundStore';
import { useEditorStore } from '@/store/editorStore';
import { useLightStore } from '@/store/lightStore';

const Viewport: React.FC = () => {
  const { background, backgroundType, backgroundBlur } = useBackgroundStore();
  const { ambientLight, directionalLight, pointLight, spotLight } = useLightStore();
  const { scene, selectedObject, setSelectedObject, transformMode, showGrid, showHelpers } = useEditorStore();

  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const handleObjectClick = (event: any) => {
    event.stopPropagation();
    setSelectedObject(event.object);
  };

  // ✅ 使用 useMemo 避免不必要的渲染
  const lights = useMemo(
    () => (
      <>
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
      </>
    ),
    [ambientLight, directionalLight, pointLight, spotLight],
  );

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-gray-900">
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }} onPointerMissed={() => setSelectedObject(null)}>
        {/* ✅ 统一光照处理 */}
        {lights}

        {/* ✅ 背景处理 */}
        <Suspense fallback={null}>
          {backgroundType === 'color' ? (
            <color attach="background" args={[background]} />
          ) : (
            typeof background === 'string' &&
            background.endsWith('.hdr') && <Environment files={background} background blur={backgroundBlur} />
          )}
        </Suspense>

        {/* ✅ 3D 网格 & 辅助线 */}
        {showGrid && <gridHelper args={[10, 10, 'gray', 'gray']} position={[0, 0, 0]} />}
        {/* {showGrid && <gridHelper args={[10, 10, 'gray', 'gray']} />} */}
        {showHelpers && <axesHelper />}

        {/* ✅ 轨道控制器 */}
        <GizmoHelper alignment="bottom-right" margin={[400, 60]}>
          <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="white" />
        </GizmoHelper>

        {/* ✅ 3D 模型 */}
        <primitive object={scene} onClick={handleObjectClick} />

        {/* ✅ 轨道控制 */}
        <OrbitControls makeDefault ref={controlsRef} />

        {/* ✅ 物体变换 */}
        {selectedObject && <TransformControls object={selectedObject} mode={transformMode} />}
      </Canvas>
    </div>
  );
};

export default Viewport;
