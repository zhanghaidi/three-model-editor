import { create } from 'zustand';
export type DecomposeMode = 'outward' | 'circular' | 'spiral' | 'spherical';
interface EffectState {
  bloom: boolean;
  bloomIntensity: number;
  setBloom: (enabled: boolean) => void;
  setBloomIntensity: (intensity: number) => void;

  fxaa: boolean;
  setFxaa: (enabled: boolean) => void;

  decomposeEnabled: boolean;
  setDecomposeEnabled: (value: boolean) => void;

  decomposeDistance: number;
  setDecomposeDistance: (d: number) => void;

  decomposeMode: DecomposeMode;
  setDecomposeMode: (v: DecomposeMode) => void;
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

  // ✅ 离焦效果
  decomposeEnabled: false,
  setDecomposeEnabled: (value: boolean) => set({ decomposeEnabled: value }),

  decomposeDistance: 0,
  setDecomposeDistance: (d) => set({ decomposeDistance: d }),

  decomposeMode: 'outward',
  setDecomposeMode: (v) => set({ decomposeMode: v }),
}));
