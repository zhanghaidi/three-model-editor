import { create } from 'zustand';

interface StatsState {
  objects: number;
  vertices: number;
  triangles: number;
  renderTime: number;
  setStats: (stats: { objects: number; vertices: number; triangles: number; renderTime: number }) => void;
}

export const useStatsStore = create<StatsState>((set) => ({
  objects: 0,
  vertices: 0,
  triangles: 0,
  renderTime: 0,
  setStats: (stats) => set(stats),
}));
