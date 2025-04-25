import { ExportOutlined } from '@ant-design/icons';
import { Button, message, Dropdown, MenuProps } from 'antd';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter.js';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter.js';

import { useEditorStore } from '@/store/editorStore';

const Exporter: React.FC = () => {
  const { scene } = useEditorStore();

  // ✅ 导出菜单
  const exportMenu: MenuProps = {
    items: [
      { key: 'gltf', label: '导出 GLTF (.gltf)', onClick: () => exportModel('gltf') },
      { key: 'glb', label: '导出 GLB (.glb)', onClick: () => exportModel('glb') },
      { key: 'obj', label: '导出 OBJ (.obj)', onClick: () => exportModel('obj') },
      { key: 'stl', label: '导出 STL (.stl)', onClick: () => exportModel('stl') },
    ],
  };

  // ✅ 处理模型导出
  const exportModel = (format: 'gltf' | 'glb' | 'obj' | 'stl') => {
    console.log('导出模型：', scene);
    if (scene.children.length === 0) {
      message.error('没有可导出的模型');
      return;
    }

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
  };

  return (
    <div className="flex gap-2">
      <Dropdown menu={exportMenu} trigger={['click']}>
        <Button icon={<ExportOutlined />} className="bg-gray-700 border-none hover:bg-gray-600">
          导出模型
        </Button>
      </Dropdown>
    </div>
  );
};

export default Exporter;

// ✅ GLTF/GLB 导出
function exportGLTF(model: THREE.Object3D, binary: boolean) {
  const filename = model.children[1].name || 'model';
  const exporter = new GLTFExporter();
  const options = { binary };
  exporter.parse(
    model,
    (gltf) => {
      const blob = binary
        ? new Blob([gltf as ArrayBuffer], { type: 'application/octet-stream' })
        : new Blob([JSON.stringify(gltf)], { type: 'application/json' });
      downloadFile(blob, `${filename}.${binary ? 'glb' : 'gltf'}`);
    },
    (error) => {
      message.error('模型导出失败，' + error);
    },
    options,
  );
}

// ✅ OBJ 导出
function exportOBJ(model: THREE.Object3D) {
  const exporter = new OBJExporter();
  const result = exporter.parse(model);
  const blob = new Blob([result], { type: 'text/plain' });
  downloadFile(blob, 'model.obj');
}

// ✅ STL 导出
function exportSTL(model: THREE.Object3D) {
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
