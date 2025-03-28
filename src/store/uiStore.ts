import { create } from 'zustand';

interface UIState {
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarWidth: 350, // 默认宽度
  setSidebarWidth: (width) => set({ sidebarWidth: width }),
}));
