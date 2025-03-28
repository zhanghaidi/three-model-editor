import { create } from 'zustand';

interface EffectState {
  bloom: boolean;
  bloomIntensity: number;
  setBloom: (enabled: boolean) => void;
  setBloomIntensity: (intensity: number) => void;

  fxaa: boolean;
  setFxaa: (enabled: boolean) => void;
}

export const useEffectStore = create<EffectState>((set) => ({
  // ✅ 泛光（Bloom）
  bloom: false,
  bloomIntensity: 1.5,
  setBloom: (enabled) => set({ bloom: enabled }),
  setBloomIntensity: (intensity) => set({ bloomIntensity: intensity }),

  // ✅ FXAA 抗锯齿
  fxaa: false,
  setFxaa: (enabled) => set({ fxaa: enabled }),
}));
