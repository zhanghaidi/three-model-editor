import { create } from 'zustand';

// ✅ 定义 Zustand 主题状态
interface ThemeState {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

// ✅ 读取 `localStorage` 默认主题
export const useThemeStore = create<ThemeState>((set) => ({
  theme: (localStorage.getItem('theme') as 'dark' | 'light') || 'dark',

  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme); // ✅ 更新 `data-theme`
      return { theme: newTheme };
    }),
}));
