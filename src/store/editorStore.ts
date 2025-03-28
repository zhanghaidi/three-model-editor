import * as THREE from 'three';
import { create } from 'zustand';

interface EditorState {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  selectedObject: THREE.Object3D | null;
  removeObject: (object: THREE.Object3D) => void;
  updateObjectProperty: (object: THREE.Object3D, property: string, value: any) => void;
  transformMode: 'translate' | 'rotate' | 'scale';
  showGrid: boolean;
  showHelpers: boolean;
  toggleGrid: () => void;
  toggleHelpers: () => void;
  addObject: (object: THREE.Object3D) => void;
  setSelectedObject: (object: THREE.Object3D | null) => void;
  setTransformMode: (mode: 'translate' | 'rotate' | 'scale') => void;
  setRenderer: (renderer: THREE.WebGLRenderer) => void;
  setCamera: (camera: THREE.Camera) => void;
  setScene: (scene: THREE.Scene) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  scene: new THREE.Scene(),
  camera: null,
  renderer: null,
  selectedObject: null,
  transformMode: 'translate',
  showGrid: true,
  showHelpers: false,
  toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
  toggleHelpers: () => set((state) => ({ showHelpers: !state.showHelpers })),
  addObject: (object) =>
    set((state) => {
      state.scene.add(object);
      return { scene: state.scene };
    }),
  removeObject: (object) =>
    set((state) => {
      state.scene.remove(object);
      return { selectedObject: null };
    }),
  updateObjectProperty: (object, property, value) =>
    set((state) => {
      if (!object) return state; // ✅ 确保对象存在，否则返回原状态

      const keys = property.split('.');
      let target: any = object;

      for (let i = 0; i < keys.length - 1; i++) {
        if (target[keys[i]] !== undefined) {
          target = target[keys[i]];
        } else {
          console.warn(`属性 ${property} 无效`);
          return state;
        }
      }

      target[keys[keys.length - 1]] = value;
      object.updateMatrixWorld(true);

      return { scene: state.scene }; // ✅ 返回修改后的 `scene`
    }),
  setSelectedObject: (object) => set({ selectedObject: object }),
  setTransformMode: (mode) => set({ transformMode: mode }),
  setCamera: (camera: any) => set({ camera }),
  setScene: (newScene: THREE.Scene) =>
    set(() => {
      return { scene: newScene };
    }),
  // ✅ **实现 setRenderer 方法**
  setRenderer: (renderer) =>
    set(() => {
      // 确保 `renderer` 正确初始化
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      return { renderer };
    }),
}));
