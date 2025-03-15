import { create } from 'zustand';

interface SceneState {
  background: string;
  lightType: 'ambient' | 'directional';
  lightIntensity: number;
  isPlaying: boolean;
  selectedAnimation: string | null;
  availableAnimations: string[];
  setBackground: (url: string) => void;
  setLightType: (type: 'ambient' | 'directional') => void;
  setLightIntensity: (value: number) => void;
  setIsPlaying: (play: boolean) => void;
  setSelectedAnimation: (animation: string) => void;
  setAvailableAnimations: (animations: string[]) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  background: '/textures/bg1.hdr',
  lightType: 'ambient',
  lightIntensity: 1,
  isPlaying: false,
  selectedAnimation: null,
  availableAnimations: [],
  setBackground: (url) => set({ background: url }),
  setLightType: (type) => set({ lightType: type }),
  setLightIntensity: (value) => set({ lightIntensity: value }),
  setIsPlaying: (play) => set({ isPlaying: play }),
  setSelectedAnimation: (animation) => set({ selectedAnimation: animation }),
  setAvailableAnimations: (animations) => set({ availableAnimations: animations }),
}));
