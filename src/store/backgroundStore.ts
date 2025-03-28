import { create } from 'zustand';

interface BackgroundState {
  backgroundType: 'None' | 'Color' | 'Texture' | 'Equirectangular';
  backgroundColor: string;
  backgroundTexture: string | null;
  backgroundEquirectangular: string | null;
  backgroundIntensity: number;
  backgroundBlur: number;
  backgroundRotation: number;
  setBackgroundType: (type: 'None' | 'Color' | 'Texture' | 'Equirectangular') => void;
  setBackgroundColor: (color: string) => void;
  setBackgroundTexture: (texture: string | null) => void;
  setBackgroundEquirectangular: (equirectangular: string | null) => void;
  setBackgroundIntensity: (value: number) => void;
  setBackgroundBlur: (value: number) => void;
  setBackgroundRotation: (value: number) => void;
}

export const useBackgroundStore = create<BackgroundState>((set) => ({
  backgroundType: 'None',
  backgroundColor: '#424242',
  backgroundTexture: null,
  backgroundEquirectangular: null,
  backgroundIntensity: 1,
  backgroundBlur: 0,
  backgroundRotation: 0,
  setBackgroundType: (type) => set({ backgroundType: type }),
  setBackgroundColor: (color) => set({ backgroundColor: color }),
  setBackgroundTexture: (texture) => set({ backgroundTexture: texture }),
  setBackgroundEquirectangular: (equirectangular) => set({ backgroundEquirectangular: equirectangular }),
  setBackgroundIntensity: (value) => set({ backgroundIntensity: value }),
  setBackgroundBlur: (value) => set({ backgroundBlur: value }),
  setBackgroundRotation: (value) => set({ backgroundRotation: value }),
}));
