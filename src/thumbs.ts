import * as THREE from "three";
import { CATALOG, buildCatalogObject } from "./catalog";
import { OPENING_PRESETS, openingPreview } from "./openings";

let thumbs: Map<string, string> | undefined;

/**
 * Small rendered previews for the object library, keyed by catalog id or opening preset key
 * (data URLs). Made once per page with a throw-away WebGL context.
 */
export function libraryThumbnails(): Map<string, string> {
  if (thumbs) return thumbs;
  thumbs = new Map();
  let renderer: THREE.WebGLRenderer | undefined;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  } catch {
    return thumbs;
  }
  const size = 112;
  renderer.setPixelRatio(1);
  renderer.setSize(size, size, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xffffff, 0x8a7f70, 2));
  const sun = new THREE.DirectionalLight(0xffffff, 1.6);
  sun.position.set(3, 6, 4);
  scene.add(sun);
  const camera = new THREE.PerspectiveCamera(30, 1, 0.01, 100);
  const shoot = (key: string, g: THREE.Object3D, dir: THREE.Vector3) => {
    scene.add(g);
    const sphere = new THREE.Box3().setFromObject(g).getBoundingSphere(new THREE.Sphere());
    const dist = (sphere.radius / Math.sin(THREE.MathUtils.degToRad(15))) * 1.02;
    camera.position.copy(sphere.center).addScaledVector(dir.normalize(), dist);
    camera.lookAt(sphere.center);
    renderer!.render(scene, camera);
    thumbs!.set(key, renderer!.domElement.toDataURL("image/png"));
    scene.remove(g);
    g.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose();
      (m.material as THREE.Material | undefined)?.dispose?.();
    });
  };
  for (const item of CATALOG) {
    const main = new THREE.MeshStandardMaterial({ color: item.color, roughness: 0.7 });
    shoot(item.id, buildCatalogObject(item.id, item.w, item.d, item.h, main), new THREE.Vector3(0.75, 0.6, 1));
  }
  for (const p of OPENING_PRESETS) {
    const wall = new THREE.MeshStandardMaterial({ color: 0xe8e4dc, roughness: 0.85 });
    const glass = new THREE.MeshStandardMaterial({ color: 0x9fd3ff, transparent: true, opacity: 0.45, roughness: 0.1, depthWrite: false });
    shoot(p.key, openingPreview(p, wall, glass), new THREE.Vector3(0.35, 0.15, -1));
  }
  renderer.dispose();
  renderer.forceContextLoss();
  return thumbs;
}
