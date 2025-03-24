import { OrbitControls, Environment, GizmoHelper, GizmoViewport, TransformControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

import { useBackgroundStore } from '@/store/backgroundStore';
import { useEditorStore } from '@/store/editorStore';
import { useLightStore } from '@/store/lightStore';
import { useScriptStore } from '@/store/scriptStore';

// ✅ **把 `useFrame` 移到 `ScriptRunner` 组件内部**
const ScriptRunner = () => {
  const { scripts, executeScripts } = useScriptStore();
  const { scene } = useEditorStore();
  const scriptObjectsRef = useRef<Record<string, THREE.Object3D>>({});

  // ✅ **缓存脚本对象列表**
  useEffect(() => {
    const objects: Record<string, THREE.Object3D> = {};
    Object.keys(scripts).forEach((uuid) => {
      const obj = scene.getObjectByProperty('uuid', uuid) as THREE.Object3D;
      if (obj) objects[uuid] = obj;
    });
    scriptObjectsRef.current = objects;
  }, [scripts, scene]);

  // ✅ **执行脚本（每帧）**
  useFrame((_state, delta) => {
    Object.entries(scriptObjectsRef.current).forEach(([uuid]) => {
      executeScripts(uuid, 'update', delta);
    });
  });

  return null; // 🚀 `ScriptRunner` 只是个逻辑组件，不渲染任何 UI
};

const Viewport: React.FC = () => {
  const { background, backgroundType, backgroundBlur } = useBackgroundStore();
  const { ambientLight, directionalLight, pointLight, spotLight } = useLightStore();
  const { scene, selectedObject, setSelectedObject, transformMode, showGrid, showHelpers } = useEditorStore();

  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const mainCamera = useRef<THREE.PerspectiveCamera | null>(null);

  // ✅ **初始化主相机（仅运行一次）**
  useEffect(() => {
    let camera = scene.children.find((obj) => obj instanceof THREE.PerspectiveCamera) as THREE.PerspectiveCamera;

    if (!camera) {
      camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
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
        {/* ✅ 脚本执行器（放在 `Canvas` 内） */}
        <ScriptRunner />

        {/* ✅ 光照处理 */}
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
        {showHelpers && <axesHelper />}

        {/* ✅ 轨道控制器 */}
        <GizmoHelper alignment="bottom-right" margin={[400, 60]}>
          <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="white" />
        </GizmoHelper>

        {/* ✅ 3D 模型 */}
        <primitive object={scene} onClick={handleObjectClick} />

        {/* ✅ 轨道控制，跟随 `mainCamera` */}
        {mainCamera.current && <OrbitControls makeDefault ref={controlsRef} camera={mainCamera.current} />}

        {/* ✅ 物体变换 */}
        {selectedObject && <TransformControls object={selectedObject} mode={transformMode} />}
      </Canvas>
    </div>
  );
};

export default Viewport;
