import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

export class ImportManager {
  scene: THREE.Scene;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  loadGLTF(url: string) {
    const loader = new GLTFLoader();
    loader.load(url, (gltf) => {
      this.scene.add(gltf.scene);
    });
  }

  loadOBJ(url: string) {
    const loader = new OBJLoader();
    loader.load(url, (obj) => {
      this.scene.add(obj);
    });
  }
}
