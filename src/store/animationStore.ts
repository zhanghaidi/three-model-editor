import * as THREE from 'three';
import { create } from 'zustand';

interface AnimationState {
  isPlaying: boolean;
  selectedAnimation: string | null;
  availableAnimations: { [modelName: string]: THREE.AnimationClip[] };
  currentModel: string | null;
  mixers: { [modelName: string]: THREE.AnimationMixer };
  clock: THREE.Clock;
  setIsPlaying: (play: boolean) => void;
  setSelectedAnimation: (model: string, animation: string) => void;
  addModelAnimations: (modelName: string, animations: THREE.AnimationClip[]) => void;
  setMixer: (modelName: string, mixer: THREE.AnimationMixer) => void;
}

export const useAnimationStore = create<AnimationState>((set) => ({
  isPlaying: false,
  selectedAnimation: null,
  availableAnimations: {},
  currentModel: null,
  mixers: {},
  clock: new THREE.Clock(),
  setIsPlaying: (play) => set({ isPlaying: play }),
  setSelectedAnimation: (model, animation) => set({ selectedAnimation: animation, currentModel: model }),
  addModelAnimations: (modelName, animations) =>
    set((state) => ({
      availableAnimations: { ...state.availableAnimations, [modelName]: animations },
    })),
  setMixer: (modelName, mixer) =>
    set((state) => ({
      mixers: { ...state.mixers, [modelName]: mixer },
    })),
}));
