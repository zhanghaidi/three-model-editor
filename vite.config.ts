import { resolve } from 'path';

import react from '@vitejs/plugin-react-swc';
import autoprefixer from 'autoprefixer';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: env.VITE_WEB_BASE_PATH || '/',
    plugins: [
      react(),
      svgr({
        include: ['**/*.svg', '**/*.svg?react'],
        exclude: ['**/*.svg?url', '**/*.svg?raw', '**/*.svg?inline'],
      }),
    ],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    css: {
      postcss: {
        plugins: [autoprefixer()],
      },
    },
    // 配置路径别名
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 8000,
    },
  };
});
