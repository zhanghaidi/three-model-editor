import { create } from 'zustand';

interface LightState {
  ambientLight: { enabled: boolean; intensity: number; color: string };
  directionalLight: { enabled: boolean; intensity: number; color: string };
  pointLight: { enabled: boolean; intensity: number; color: string; distance: number };
  spotLight: { enabled: boolean; intensity: number; color: string; distance: number; angle: number };

  setAmbientLight: (enabled: boolean) => void;
  setAmbientIntensity: (intensity: number) => void;
  setAmbientColor: (color: string) => void;

  setDirectionalLight: (enabled: boolean) => void;
  setDirectionalIntensity: (intensity: number) => void;
  setDirectionalColor: (color: string) => void;

  setPointLight: (enabled: boolean) => void;
  setPointIntensity: (intensity: number) => void;
  setPointColor: (color: string) => void;
  setPointDistance: (distance: number) => void;

  setSpotLight: (enabled: boolean) => void;
  setSpotIntensity: (intensity: number) => void;
  setSpotColor: (color: string) => void;
  setSpotDistance: (distance: number) => void;
  setSpotAngle: (angle: number) => void;
}

export const useLightStore = create<LightState>((set) => ({
  ambientLight: { enabled: true, intensity: 1, color: '#ffffff' },
  directionalLight: { enabled: false, intensity: 1, color: '#ffffff' },
  pointLight: { enabled: false, intensity: 1, color: '#ffffff', distance: 10 },
  spotLight: { enabled: false, intensity: 1, color: '#ffffff', distance: 10, angle: Math.PI / 4 },

  setAmbientLight: (enabled) => set((state) => ({ ambientLight: { ...state.ambientLight, enabled } })),
  setAmbientIntensity: (intensity) => set((state) => ({ ambientLight: { ...state.ambientLight, intensity } })),
  setAmbientColor: (color) => set((state) => ({ ambientLight: { ...state.ambientLight, color } })),

  setDirectionalLight: (enabled) => set((state) => ({ directionalLight: { ...state.directionalLight, enabled } })),
  setDirectionalIntensity: (intensity) =>
    set((state) => ({ directionalLight: { ...state.directionalLight, intensity } })),
  setDirectionalColor: (color) => set((state) => ({ directionalLight: { ...state.directionalLight, color } })),

  setPointLight: (enabled) => set((state) => ({ pointLight: { ...state.pointLight, enabled } })),
  setPointIntensity: (intensity) => set((state) => ({ pointLight: { ...state.pointLight, intensity } })),
  setPointColor: (color) => set((state) => ({ pointLight: { ...state.pointLight, color } })),
  setPointDistance: (distance) => set((state) => ({ pointLight: { ...state.pointLight, distance } })),

  setSpotLight: (enabled) => set((state) => ({ spotLight: { ...state.spotLight, enabled } })),
  setSpotIntensity: (intensity) => set((state) => ({ spotLight: { ...state.spotLight, intensity } })),
  setSpotColor: (color) => set((state) => ({ spotLight: { ...state.spotLight, color } })),
  setSpotDistance: (distance) => set((state) => ({ spotLight: { ...state.spotLight, distance } })),
  setSpotAngle: (angle) => set((state) => ({ spotLight: { ...state.spotLight, angle } })),
}));
