import { MeshBasicMaterial, MeshStandardMaterial, TextureLoader } from 'three';
import { create } from 'zustand';

interface MaterialEntry {
  material: MeshStandardMaterial | MeshBasicMaterial;
  visible: boolean;
}

interface MaterialState {
  materials: Record<string, MaterialEntry>;
  selectedMaterial: string | null;
  setMaterials: (materials: Record<string, MaterialEntry>) => void;
  selectMaterial: (name: string) => void;
  toggleMaterialVisibility: (name: string) => void;
  updateMaterialProperties: (
    name: string,
    properties: Partial<{ color: string; opacity: number; map: string; roughness: number; metalness: number }>,
  ) => void;
  changeMaterialType: (name: string, type: 'standard' | 'basic') => void;
}

export const useMaterialStore = create<MaterialState>((set) => ({
  materials: {},
  selectedMaterial: null,

  setMaterials: (materials) => set({ materials }),

  selectMaterial: (name) => set({ selectedMaterial: name }),

  toggleMaterialVisibility: (name) =>
    set((state) => {
      if (!state.materials[name]) return state;
      const newMaterials = { ...state.materials };
      newMaterials[name].visible = !newMaterials[name].visible;
      return { materials: newMaterials };
    }),
  updateMaterialProperties: (name, properties) =>
    set((state) => {
      const materialEntry = state.materials[name];
      if (!materialEntry) return state;

      const updatedProperties = { ...properties };

      // **✅ 处理 `map`，确保 `map` 不是 `string`**
      if (properties.map && typeof properties.map === 'string') {
        new TextureLoader().load(properties.map, (texture) => {
          materialEntry.material.map = texture;
          materialEntry.material.needsUpdate = true; // **✅ 强制 Three.js 重新渲染**
          set({ materials: { ...state.materials } });
        });

        return state; // **提前返回，防止同步更新**
      }

      // **✅ 只更新非 `map` 参数**
      delete updatedProperties.map;
      materialEntry.material.setValues(updatedProperties as any);
      materialEntry.material.needsUpdate = true; // **🔥 让 Three.js 重新计算材质**

      return { materials: { ...state.materials } };
    }),

  // **🔥 切换材质类型**
  changeMaterialType: (name, type) =>
    set((state) => {
      const materialEntry = state.materials[name];
      if (!materialEntry) return state;

      // **创建新材质**
      const newMaterial = type === 'basic' ? new MeshBasicMaterial() : new MeshStandardMaterial();

      return {
        materials: {
          ...state.materials,
          [name]: { material: newMaterial, visible: materialEntry.visible },
        },
      };
    }),
}));
