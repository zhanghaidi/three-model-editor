import * as THREE from 'three';
import { create } from 'zustand';

interface EditorState {
  scene: THREE.Scene;
  selectedObject: THREE.Object3D | null;
  transformMode: 'translate' | 'rotate' | 'scale';
  showGrid: boolean;
  showHelpers: boolean;
  toggleGrid: () => void;
  toggleHelpers: () => void;
  addObject: (object: THREE.Object3D) => void;
  setSelectedObject: (object: THREE.Object3D | null) => void;
  setTransformMode: (mode: 'translate' | 'rotate' | 'scale') => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  scene: new THREE.Scene(),
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

  setSelectedObject: (object) => set({ selectedObject: object }),
  setTransformMode: (mode) => set({ transformMode: mode }),
}));
