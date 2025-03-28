import { create } from 'zustand';

// 定义脚本函数的具体类型
type ScriptFunction = (object: string, event: string, delta?: number) => void;

interface Script {
  name: string;
  source: string;
  enabled?: boolean;
}

interface ScriptStoreState {
  scripts: Record<string, Script[]>; // ✅ 存储对象的所有脚本
  compiledScripts: Record<string, Record<string, ScriptFunction>>; // ✅ 缓存已编译的脚本
  addScript: (uuid: string, script: Script) => void;
  removeScript: (uuid: string, scriptName: string) => void;
  updateScript: (uuid: string, updatedScript: Script) => void;
  executeScripts: (uuid: string, event: string, delta?: number) => void;
}

export const useScriptStore = create<ScriptStoreState>((set, get) => ({
  scripts: {},
  compiledScripts: {}, // ✅ 缓存编译后的脚本

  // ✅ **添加脚本**
  addScript: (uuid, script) =>
    set((state) => {
      const existingScripts = state.scripts[uuid] || [];
      return {
        scripts: { ...state.scripts, [uuid]: [...existingScripts, script] },
      };
    }),

  // ✅ **删除脚本**
  removeScript: (uuid, scriptName) =>
    set((state) => {
      const newScripts = (state.scripts[uuid] || []).filter((s) => s.name !== scriptName);
      const newCompiled = { ...state.compiledScripts };
      if (newCompiled[uuid]) delete newCompiled[uuid][scriptName];

      return {
        scripts: { ...state.scripts, [uuid]: newScripts },
        compiledScripts: newCompiled,
      };
    }),

  // ✅ **更新脚本**
  updateScript: (uuid, updatedScript) =>
    set((state) => {
      const newScripts = (state.scripts[uuid] || []).map((script) =>
        script.name === updatedScript.name ? updatedScript : script,
      );

      // ✅ 更新缓存
      const newCompiled = { ...state.compiledScripts };
      try {
        newCompiled[uuid] = newCompiled[uuid] || {};
        // 使用 Function 构造器动态生成函数
        newCompiled[uuid][updatedScript.name] = new Function(
          'object',
          'event',
          'delta',
          `"use strict"; return (${updatedScript.source})`,
        ) as ScriptFunction;
      } catch (error) {
        console.error(`编译脚本失败: ${updatedScript.name}`, error);
      }

      return {
        scripts: { ...state.scripts, [uuid]: newScripts },
        compiledScripts: newCompiled,
      };
    }),

  // ✅ **执行脚本**
  executeScripts: (uuid, event, delta = 0) => {
    const state = get();
    const scriptList = state.scripts[uuid] || [];
    const compiledList = state.compiledScripts[uuid] || {};

    scriptList.forEach((script) => {
      if (script.enabled !== false) {
        const func = compiledList[script.name];
        if (func) {
          try {
            func(uuid, event, delta);
          } catch (error) {
            console.error(`执行脚本错误: ${script.name}`, error);
          }
        }
      }
    });
  },
}));
