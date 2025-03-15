import * as THREE from 'three';
import { create } from 'zustand';

interface SceneState {
  background: string;
  setBackground: (url: string) => void;
  selectedObject: THREE.Object3D | null;
  setSelectedObject: (obj: THREE.Object3D | null) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  background: '/textures/bg1.hdr',
  setBackground: (url) => set({ background: url }),
  selectedObject: null,
  setSelectedObject: (obj) => set({ selectedObject: obj }),
}));
