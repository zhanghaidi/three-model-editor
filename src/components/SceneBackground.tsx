import { Environment } from '@react-three/drei';
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'; // ✅ 解决 HDR 纹理加载问题

import { useBackgroundStore } from '@/store/backgroundStore';

const SceneBackground = () => {
  const {
    backgroundType,
    backgroundColor,
    backgroundTexture,
    backgroundEquirectangular,
    backgroundIntensity,
    backgroundBlur,
  } = useBackgroundStore();

  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [equirectangularTexture, setEquirectangularTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (backgroundType === 'Texture' && backgroundTexture) {
      new THREE.TextureLoader().load(backgroundTexture, setTexture);
    } else if (backgroundType === 'Equirectangular' && backgroundEquirectangular) {
      //   console.log('加载等深图背景:', backgroundEquirectangular);

      new RGBELoader().load(backgroundEquirectangular, (hdrTexture) => {
        hdrTexture.mapping = THREE.EquirectangularReflectionMapping;
        setEquirectangularTexture(hdrTexture);
      });
    } else {
      setTexture(null);
      setEquirectangularTexture(null);
    }
  }, [backgroundType, backgroundTexture, backgroundEquirectangular]);

  return (
    <>
      {/* ✅ 颜色背景 */}
      {backgroundType === 'Color' && <color attach="background" args={[backgroundColor]} />}

      {/* ✅ 纹理背景 */}
      {backgroundType === 'Texture' && texture && <primitive attach="background" object={texture} />}

      {/* ✅ HDR/等深图背景 */}
      {backgroundType === 'Equirectangular' && equirectangularTexture && (
        <Environment
          files={backgroundEquirectangular || undefined}
          background
          backgroundIntensity={backgroundIntensity}
          blur={backgroundBlur}
        />
      )}
    </>
  );
};

export default SceneBackground;
