import * as THREE from 'three';
import { create } from 'zustand';

interface RenderState {
  environment: string;
  fog: string;

  antialias: boolean;
  shadowQuality: THREE.ShadowMapType;
  toneMapping: THREE.ToneMapping;
  autoRotate: boolean;
  outputColorSpace: THREE.ColorSpace; // ✅ 新版 Three.js 用 colorSpace 代替 outputEncoding

  setEnvironment: (env: string) => void;
  setFog: (fog: string) => void;

  setAntialias: (enabled: boolean) => void;
  setShadowQuality: (quality: THREE.ShadowMapType) => void;
  setToneMapping: (mapping: THREE.ToneMapping) => void;
  setAutoRotate: (enabled: boolean) => void;
  setOutputColorSpace: (colorSpace: THREE.ColorSpace) => void; // ✅ 新版设置颜色空间
}

export const useRenderStore = create<RenderState>((set) => ({
  environment: 'None',
  fog: 'None',

  antialias: true,
  shadowQuality: THREE.PCFSoftShadowMap,
  toneMapping: THREE.LinearToneMapping,
  autoRotate: false,
  outputColorSpace: THREE.SRGBColorSpace, // ✅ 代替旧版 outputEncoding

  setEnvironment: (env) => set({ environment: env }),
  setFog: (fog) => set({ fog }),

  setAntialias: (enabled) => set({ antialias: enabled }),
  setShadowQuality: (quality) => set({ shadowQuality: quality }),
  setToneMapping: (mapping) => set({ toneMapping: mapping }),
  setAutoRotate: (enabled) => set({ autoRotate: enabled }),
  setOutputColorSpace: (colorSpace) => set({ outputColorSpace: colorSpace }), // ✅ 更新颜色空间
}));
