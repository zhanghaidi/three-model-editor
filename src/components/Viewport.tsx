import { OrbitControls, GizmoHelper, GizmoViewport, TransformControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

import { useEditorStore } from '@/store/editorStore';
import { useLightStore } from '@/store/lightStore';

import ModelDecomposer from './ModelDecomposer';
import SceneBackground from './SceneBackground';

const Viewport: React.FC = () => {
  const { ambientLight, directionalLight, pointLight, spotLight } = useLightStore();
  const { scene, selectedObject, setSelectedObject, transformMode, showGrid, showHelpers } = useEditorStore();
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const mainCamera = useRef<THREE.PerspectiveCamera | null>(null);

  // ✅ **初始化主相机（仅运行一次）**
  useEffect(() => {
    let camera = scene.children.find((obj) => obj instanceof THREE.PerspectiveCamera) as THREE.PerspectiveCamera;

    if (!camera) {
      camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000);
      camera.name = '相机';
      camera.position.set(5, 5, 5);
      scene.add(camera);
    }

    mainCamera.current = camera;
    setSelectedObject(camera);
  }, [scene, setSelectedObject]);

  // ✅ **光照优化**
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

  const handleObjectClick = (event: any) => {
    event.stopPropagation();
    setSelectedObject(event.object);
  };

  return (
    <div className="viewport">
      <Canvas
        camera={mainCamera.current ?? { position: [5, 5, 5], fov: 50 }}
        onPointerMissed={() => setSelectedObject(null)}
      >
        {/* ✅ 光照处理 */}
        {lights}
        {/* ✅ 背景处理 */}
        <Suspense fallback={null}>
          <SceneBackground />
        </Suspense>

        {/* ✅ 3D 网格 & 辅助线 */}
        {showGrid && <gridHelper args={[10, 10, 'gray', 'gray']} position={[0, 0, 0]} />}
        {showHelpers && <axesHelper />}

        {/* ✅ 轨道控制器 */}
        <GizmoHelper alignment="bottom-right" margin={[100, 120]}>
          <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="white" />
        </GizmoHelper>

        {/* ✅ 3D 模型 */}
        <primitive object={scene} onClick={handleObjectClick} />

        {/* ✅ 轨道控制，跟随 `mainCamera` */}
        {mainCamera.current && <OrbitControls makeDefault ref={controlsRef} camera={mainCamera.current} />}

        {/* ✅ 物体变换 */}
        {selectedObject && <TransformControls object={selectedObject} mode={transformMode} />}
        <ModelDecomposer />
      </Canvas>
    </div>
  );
};

export default Viewport;
