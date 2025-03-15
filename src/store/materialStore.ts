import * as THREE from 'three';
import { create } from 'zustand';

interface MaterialState {
  selectedMaterial: THREE.Material | null;
  setSelectedMaterial: (material: THREE.Material | null) => void;
}

export const useMaterialStore = create<MaterialState>((set) => ({
  selectedMaterial: null,
  setSelectedMaterial: (material) => set({ selectedMaterial: material }),
}));
