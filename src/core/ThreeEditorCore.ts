import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';

export interface SceneObject extends THREE.Object3D {
  userData: {
    type: string;
    name: string;
  };
}

export type TransformMode = 'translate' | 'rotate' | 'scale';

export class ThreeEditorCore {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private orbitControls: OrbitControls;
  private transformControls: TransformControls;
  private objects: SceneObject[] = [];
  private animationFrameId: number | null = null;
  private selectedObject: SceneObject | null = null;
  private onSelectionChange?: (object: SceneObject | null) => void;

  constructor(container: HTMLElement) {
    // Initialize Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a1a1a);

    // Initialize Camera
    this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    this.camera.position.set(5, 5, 5);
    this.camera.lookAt(0, 0, 0);

    // Initialize Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(this.renderer.domElement);

    // Initialize Controls
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbitControls.enableDamping = true;

    // Initialize Transform Controls
    this.transformControls = new TransformControls(this.camera, this.renderer.domElement);
    this.scene.add(this.transformControls);

    // Link controls
    this.transformControls.addEventListener('dragging-changed', (event) => {
      this.orbitControls.enabled = !event.value;
    });

    // Add Grid Helper
    const gridHelper = new THREE.GridHelper(10, 10, 0x444444, 0x333333);
    (gridHelper as unknown as SceneObject).userData = { type: 'GridHelper', name: 'Grid' };
    this.scene.add(gridHelper);

    // Add Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    (ambientLight as unknown as SceneObject).userData = {
      type: 'AmbientLight',
      name: 'Ambient Light',
    };
    this.scene.add(ambientLight);

    // Add Directional Light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    (directionalLight as unknown as SceneObject).userData = {
      type: 'DirectionalLight',
      name: 'Directional Light',
    };
    this.scene.add(directionalLight);

    // Handle Window Resize
    window.addEventListener('resize', this.handleResize);

    // Start Animation Loop
    this.animate();
  }

  public setTransformMode(mode: TransformMode) {
    this.transformControls.setMode(mode);
  }

  public setSelectionCallback(callback: (object: SceneObject | null) => void) {
    this.onSelectionChange = callback;
  }

  public selectObject(object: SceneObject | null) {
    this.selectedObject = object;
    if (object && object.userData.type !== 'GridHelper') {
      this.transformControls.attach(object);
    } else {
      this.transformControls.detach();
    }
    if (this.onSelectionChange) {
      this.onSelectionChange(object);
    }
  }

  public getSceneObjects(): SceneObject[] {
    return [...this.objects];
  }

  private handleResize = () => {
    const container = this.renderer.domElement.parentElement;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  private animate = () => {
    this.animationFrameId = requestAnimationFrame(this.animate);
    this.orbitControls.update();
    this.renderer.render(this.scene, this.camera);
  };

  public addObject(object: SceneObject) {
    this.scene.add(object);
    this.objects.push(object);
    if (this.onSelectionChange) {
      this.onSelectionChange(object);
    }
  }

  public removeObject(object: SceneObject) {
    this.scene.remove(object);
    this.objects = this.objects.filter((obj) => obj !== object);
    if (this.selectedObject === object) {
      this.selectObject(null);
    }
  }

  public addCube(size = 1, color = 0x1890ff, position: THREE.Vector3 = new THREE.Vector3(0, 0.5, 0)) {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshStandardMaterial({ color });
    const cube = new THREE.Mesh(geometry, material) as unknown as SceneObject;
    cube.position.copy(position);
    cube.userData = {
      type: 'Cube',
      name: `Cube ${this.objects.filter((obj) => obj.userData.type === 'Cube').length + 1}`,
    };
    this.addObject(cube);
    return cube;
  }

  public addSphere(radius = 0.5, color = 0x1890ff, position: THREE.Vector3 = new THREE.Vector3(0, 0.5, 0)) {
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color });
    const sphere = new THREE.Mesh(geometry, material) as unknown as SceneObject;
    sphere.position.copy(position);
    sphere.userData = {
      type: 'Sphere',
      name: `Sphere ${this.objects.filter((obj) => obj.userData.type === 'Sphere').length + 1}`,
    };
    this.addObject(sphere);
    return sphere;
  }

  public dispose() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }

    this.orbitControls.dispose();
    this.transformControls.dispose();
    this.renderer.dispose();
    window.removeEventListener('resize', this.handleResize);

    this.objects.forEach((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose());
        } else {
          object.material.dispose();
        }
      }
    });
  }
}
