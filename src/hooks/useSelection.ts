import * as THREE from 'three';

import { useEditorStore } from '../store/editorStore';

export function useSelection(scene: THREE.Scene, camera: THREE.Camera) {
  const setSelectedObject = useEditorStore((state) => state.setSelectedObject);

  function onClick(event: MouseEvent) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1,
    );

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
      setSelectedObject(intersects[0].object);
    } else {
      setSelectedObject(null);
    }
  }

  return { onClick };
}
