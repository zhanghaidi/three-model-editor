import { OrbitControls, SpotLight } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// import TransformControls from '@/components/TransformControls';
// import { ObjectManager } from '@/editor/ObjectManager';

// import { useSelection } from '../hooks/useSelection';

const ThreeEditor: React.FC = () => {
  const sceneRef = useRef<THREE.Scene | null>(null);
  //   const objectManager = new ObjectManager(scene);
  //   objectManager.addBox();

  //   const { onClick } = useSelection(scene, camera);
  useEffect(() => {
    sceneRef.current = new THREE.Scene();
    // console.log('Three.js 编辑器初始化');
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [3, 3, 3] }}>
        <ambientLight />
        <SpotLight position={[10, 10, 10]} />
        <OrbitControls />
        {/* <TransformControls /> */}
      </Canvas>
    </div>
  );
};

export default ThreeEditor;
