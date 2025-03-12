import * as THREE from 'three';
import { create } from 'zustand';

interface EditorState {
  selectedObject: THREE.Object3D | null;
  setSelectedObject: (obj: THREE.Object3D | null) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  selectedObject: null,
  setSelectedObject: (obj) => set({ selectedObject: obj }),
}));
