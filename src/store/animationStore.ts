import { create } from 'zustand';

interface AnimationState {
  isPlaying: boolean;
  selectedAnimation: string | null;
  availableAnimations: string[];
  setIsPlaying: (play: boolean) => void;
  setSelectedAnimation: (animation: string) => void;
  setAvailableAnimations: (animations: string[]) => void;
}

export const useAnimationStore = create<AnimationState>((set) => ({
  isPlaying: false,
  selectedAnimation: null,
  availableAnimations: [],
  setIsPlaying: (play) => set({ isPlaying: play }),
  setSelectedAnimation: (animation) => set({ selectedAnimation: animation }),
  setAvailableAnimations: (animations) => set({ availableAnimations: animations }),
}));
