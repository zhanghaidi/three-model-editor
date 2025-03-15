# React + TypeScript + Vite 模板

本模板提供了一个最小化的 React + TypeScript 开发环境，基于 Vite，支持 HMR（热模块替换）和 ESLint 代码规范检查。

## 官方插件

当前可用的两个官方插件：

- @vitejs/plugin-react（基于 Babel 实现 Fast Refresh）
- @vitejs/plugin-react-swc（基于 SWC 实现 Fast Refresh）

## 扩展 ESLint 配置

如果你正在开发生产级应用，建议升级 ESLint 配置，启用基于类型检查的规则：

```
js
export default tseslint.config({
  extends: [
    // 替换默认推荐规则
    ...tseslint.configs.recommendedTypeChecked,
    // 或者使用更严格的规则
    ...tseslint.configs.strictTypeChecked,
    // 额外启用代码风格规则（可选）
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // 其他语言配置
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

## React 相关 ESLint 规则

推荐安装 eslint-plugin-react-x 和 eslint-plugin-react-dom，增强 React 代码的规范性。

安装后，在 eslint.config.js 中添加以下配置：

```
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config({
  plugins: {
    // 添加 react-x 和 react-dom 插件
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // 其他规则...
    // 启用推荐的 TypeScript 规则
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

## 结语

本模板旨在提供一个快速、现代的 React + TypeScript 开发环境，同时通过 ESLint 保障代码质量。如果你有更严格的代码风格要求，可以在此基础上进一步扩展 ESLint 规则。

```
three-model-editor
├─ 📁.husky
│  ├─ 📁_
│  │  ├─ 📄.gitignore
│  │  ├─ 📄applypatch-msg
│  │  ├─ 📄commit-msg
│  │  ├─ 📄h
│  │  ├─ 📄husky.sh
│  │  ├─ 📄post-applypatch
│  │  ├─ 📄post-checkout
│  │  ├─ 📄post-commit
│  │  ├─ 📄post-merge
│  │  ├─ 📄post-rewrite
│  │  ├─ 📄pre-applypatch
│  │  ├─ 📄pre-auto-gc
│  │  ├─ 📄pre-commit
│  │  ├─ 📄pre-merge-commit
│  │  ├─ 📄pre-push
│  │  ├─ 📄pre-rebase
│  │  └─ 📄prepare-commit-msg
│  ├─ 📄commit-msg
│  └─ 📄pre-commit
├─ 📁public
│  ├─ 📁draco
│  │  ├─ 📄draco_decoder.js
│  │  ├─ 📄draco_decoder.wasm
│  │  ├─ 📄draco_encoder.js
│  │  ├─ 📄draco_wasm_wrapper.js
│  │  └─ 📄README.md
│  ├─ 📁models
│  │  └─ 📁glb
│  │     ├─ 📄animal.glb
│  │     ├─ 📄car.glb
│  │     ├─ 📄girl.glb
│  │     └─ 📄sun.glb
│  ├─ 📁textures
│  │  ├─ 📄bg1.hdr
│  │  ├─ 📄bg2.hdr
│  │  ├─ 📄bg3.hdr
│  │  ├─ 📄view-1.png
│  │  ├─ 📄view-10.png
│  │  ├─ 📄view-11.png
│  │  ├─ 📄view-12.png
│  │  ├─ 📄view-13.png
│  │  ├─ 📄view-14.png
│  │  ├─ 📄view-15.png
│  │  ├─ 📄view-16.png
│  │  ├─ 📄view-2.png
│  │  ├─ 📄view-3.png
│  │  ├─ 📄view-4.png
│  │  ├─ 📄view-5.png
│  │  ├─ 📄view-6.png
│  │  ├─ 📄view-7.png
│  │  ├─ 📄view-8.png
│  │  └─ 📄view-9.png
│  └─ 📄react.svg
├─ 📁src
│  ├─ 📁assets
│  │  └─ 📁styles
│  │     ├─ 📄index.scss
│  │     └─ 📄theme.scss
│  ├─ 📁components
│  │  ├─ 📄Header.module.scss
│  │  ├─ 📄Header.tsx
│  │  ├─ 📄Model.tsx
│  │  ├─ 📄Sidebar.module.scss
│  │  ├─ 📄Sidebar.tsx
│  │  ├─ 📄SidebarAnimation.tsx
│  │  ├─ 📄SidebarLight.tsx
│  │  ├─ 📄Viewport.module.scss
│  │  └─ 📄Viewport.tsx
│  ├─ 📁editor
│  ├─ 📁hooks
│  ├─ 📁pages
│  │  ├─ 📁animation
│  │  │  └─ 📄index.tsx
│  │  ├─ 📁editor
│  │  │  ├─ 📄index.module.scss
│  │  │  └─ 📄index.tsx
│  │  ├─ 📁exception
│  │  │  ├─ 📄403.tsx
│  │  │  ├─ 📄404.tsx
│  │  │  └─ 📄500.tsx
│  │  ├─ 📁model
│  │  │  └─ 📁index.tsx
│  │  └─ 📁preview
│  │     └─ 📄index.tsx
│  ├─ 📁router
│  │  ├─ 📄index.tsx
│  │  └─ 📄router.tsx
│  ├─ 📁store
│  │  ├─ 📄cameraStore.ts
│  │  ├─ 📄lightStore.ts
│  │  ├─ 📄materialStore.ts
│  │  └─ 📄sceneStore.ts
│  ├─ 📁utils
│  │  └─ 📄index.ts
│  ├─ 📄App.tsx
│  ├─ 📄main.tsx
│  └─ 📄vite-env.d.ts
├─ 📄.editorconfig
├─ 📄.gitignore
├─ 📄.npmrc
├─ 📄.prettierrc
├─ 📄commitlint.config.js
├─ 📄eslint.config.js
├─ 📄index.html
├─ 📄package.json
├─ 📄pnpm-lock.yaml
├─ 📄README.md
├─ 📄tsconfig.app.json
├─ 📄tsconfig.json
├─ 📄tsconfig.node.json
└─ 📄vite.config.ts
```
