import { create } from 'zustand';

interface SceneState {
  showGrid: boolean;
  showHelpers: boolean;
  toggleGrid: () => void;
  toggleHelpers: () => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  showGrid: true,
  showHelpers: true,
  toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
  toggleHelpers: () => set((state) => ({ showHelpers: !state.showHelpers })),
}));
