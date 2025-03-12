import { message } from 'antd';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

export class ExportManager {
  scene: THREE.Scene;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  exportGLTF() {
    const exporter = new GLTFExporter();
    exporter.parse(
      this.scene,
      (gltf) => {
        const blob = new Blob([JSON.stringify(gltf)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'scene.glb';
        link.click();
      },
      (error) => {
        message.error('Error exporting GLTF:' + error);
        // console.error('Error exporting GLTF:', error);
      },
      { binary: true }, // 导出为二进制格式 (GLB)
    );
  }
}
