import { message } from 'antd';
import { Group } from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter.js';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter.js';
import { create } from 'zustand';

interface ExportState {
  exportModel: (models: Group[], format: 'gltf' | 'glb' | 'obj' | 'stl') => void;
}

export const useExportStore = create<ExportState>(() => ({
  exportModel: (models, format) => {
    if (models.length === 0) {
      message.error('没有可导出的模型');
      return;
    }

    // 仅导出场景中的所有模型
    const scene = new Group();
    scene.name = 'ExportedScene';
    models.forEach((model) => scene.add(model.clone())); // ✅ 克隆对象，避免影响原始模型

    switch (format) {
      case 'gltf':
        exportGLTF(scene, false);
        break;
      case 'glb':
        exportGLTF(scene, true);
        break;
      case 'obj':
        exportOBJ(scene);
        break;
      case 'stl':
        exportSTL(scene);
        break;
      default:
        message.error('不支持的导出格式');
    }
  },
}));

// ✅ GLTF/GLB 导出
function exportGLTF(model: Group, binary: boolean) {
  const exporter = new GLTFExporter();
  const options = { binary }; // 正确传递 options 参数
  exporter.parse(
    model,
    (gltf) => {
      const blob = binary
        ? new Blob([gltf as ArrayBuffer], { type: 'application/octet-stream' })
        : new Blob([JSON.stringify(gltf)], { type: 'application/json' });
      downloadFile(blob, `model.${binary ? 'glb' : 'gltf'}`);
    },
    (error) => {
      message.error('模型导出失败，' + error);
    },
    options, // 传递 options 参数,
  );
}

// ✅ OBJ 导出
function exportOBJ(model: Group) {
  const exporter = new OBJExporter();
  const result = exporter.parse(model);
  const blob = new Blob([result], { type: 'text/plain' });
  downloadFile(blob, 'model.obj');
}

// ✅ STL 导出
function exportSTL(model: Group) {
  const exporter = new STLExporter();
  const result = exporter.parse(model);
  const blob = new Blob([result], { type: 'application/octet-stream' });
  downloadFile(blob, 'model.stl');
}

// ✅ 通用下载方法
function downloadFile(blob: Blob, filename: string) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
