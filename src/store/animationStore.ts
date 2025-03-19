// import * as THREE from 'three';
// import { create } from 'zustand';

// interface AnimationState {
//   isPlaying: boolean;
//   selectedAnimation: string | null;
//   availableAnimations: string[];
//   mixer: THREE.AnimationMixer | null;
//   clock: THREE.Clock;
//   setIsPlaying: (play: boolean) => void;
//   setSelectedAnimation: (animation: string) => void;
//   setAvailableAnimations: (animations: string[]) => void;
//   setMixer: (mixer: THREE.AnimationMixer | null) => void;
// }

// export const useAnimationStore = create<AnimationState>((set) => ({
//   isPlaying: false,
//   selectedAnimation: null,
//   availableAnimations: [],
//   mixer: null,
//   clock: new THREE.Clock(),
//   setIsPlaying: (play) => set({ isPlaying: play }),
//   setSelectedAnimation: (animation) => set({ selectedAnimation: animation }),
//   setAvailableAnimations: (animations) => set({ availableAnimations: animations }),
//   setMixer: (mixer) => set({ mixer }),
// }));
import * as THREE from 'three';
import { create } from 'zustand';

interface AnimationState {
  isPlaying: boolean;
  selectedAnimation: string | null;
  availableAnimations: THREE.AnimationClip[]; // ✅ 存储 `AnimationClip[]`
  mixer: THREE.AnimationMixer | null;
  clock: THREE.Clock;
  setIsPlaying: (play: boolean) => void;
  setSelectedAnimation: (animation: string) => void;
  setAvailableAnimations: (animations: THREE.AnimationClip[]) => void; // ✅ 接受 `AnimationClip[]`
  setMixer: (mixer: THREE.AnimationMixer | null) => void;
}

export const useAnimationStore = create<AnimationState>((set) => ({
  isPlaying: false,
  selectedAnimation: null,
  availableAnimations: [], // ✅ 这里是 `AnimationClip[]`
  mixer: null,
  clock: new THREE.Clock(),
  setIsPlaying: (play) => set({ isPlaying: play }),
  setSelectedAnimation: (animation) => set({ selectedAnimation: animation }),
  setAvailableAnimations: (animations) => set({ availableAnimations: animations }), // ✅ 正确存 `AnimationClip[]`
  setMixer: (mixer) => set({ mixer }),
}));
