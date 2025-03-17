import { create } from 'zustand';

interface BackgroundState {
  background: string;
  backgroundType: 'color' | 'image' | 'panorama';
  backgroundIntensity: number;
  backgroundBlur: number;
  setBackground: (url: string) => void;
  setBackgroundType: (type: 'color' | 'image' | 'panorama') => void;
  setBackgroundIntensity: (value: number) => void;
  setBackgroundBlur: (value: number) => void;
}

export const useBackgroundStore = create<BackgroundState>((set) => ({
  background: '#ffffff',
  backgroundType: 'color',
  backgroundIntensity: 1,
  backgroundBlur: 0,
  setBackground: (url) => set({ background: url }),
  setBackgroundType: (type) => set({ backgroundType: type }),
  setBackgroundIntensity: (value) => set({ backgroundIntensity: value }),
  setBackgroundBlur: (value) => set({ backgroundBlur: value }),
}));
