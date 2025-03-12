import * as THREE from 'three';
/**
 * 获取文件扩展名
 * @param {string} fileName 文件名
 * @return {string} 文件扩展名（小写），如果没有扩展名返回空字符串
 */
export function getFileType(fileName: string): string {
  const parts = fileName.split('.');

  if (parts.length < 2) return ''; // 没有扩展名
  const ext = parts.pop()?.toLowerCase(); // 取最后一个部分（防止 undefined）

  return ext ?? ''; // 确保返回字符串
}

interface FindObjectOptions {
  type?: string; // 需要查找的对象类型（如 'TransformControls'）
}
/**
 * 在 Three.js 场景中查找指定类型的对象
 * @param {THREE.Scene} scene - Three.js 场景
 * @param {FindObjectOptions} options - 查找选项
 * @returns {THREE.Object3D | null} 找到的对象，如果没找到则返回 null
 */
export function findObjectInScene(scene: THREE.Scene, { type }: FindObjectOptions): THREE.Object3D | null {
  let found: THREE.Object3D | null = null;

  scene.traverse((object) => {
    if (type && object.type === type) {
      found = object;
    }
  });

  return found;
}
