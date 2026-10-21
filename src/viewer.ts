import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CSS2DObject, CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { domainOf, formatState, friendlyName, isActive } from "./ha";
import { TextureCache, defaultTextureSize } from "./textures";
import { DEFAULTS, formatArea, normalizeFloorplan, roomArea, type CameraConfig, type CardConfig, type Hass, type Hotspot, type Opening, type Wall } from "./types";

const CM = 0.01;
const HITBOX_IDLE = 0x3fa7ff;
const HITBOX_ACTIVE = 0xffc107;

interface HotspotView {
  data: Hotspot;
  mesh: THREE.Mesh;
  edges: THREE.LineSegments;
  label?: CSS2DObject;
  light?: THREE.PointLight;
  active: boolean;
}

export type HotspotGesture = "tap" | "hold";

export class Viewer {
  readonly element: HTMLDivElement;
  onHotspot?: (h: Hotspot, gesture: HotspotGesture) => void;

  private renderer: THREE.WebGLRenderer;
  private labels: CSS2DRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(45, 1, 0.05, 500);
  private controls: OrbitControls;
  private world = new THREE.Group();
  private hotspots = new Map<string, HotspotView>();
  private config?: CardConfig;
  private hass?: Hass;
  private hovered?: string;
  private framePending = false;
  private resizeObserver: ResizeObserver;
  private raycaster = new THREE.Raycaster();
  private hasView = false;
  private disposed = false;
  private textures = new TextureCache(() => this.requestRender());

  constructor() {
    this.element = document.createElement("div");
    this.element.className = "fp3d-viewer";
    this.element.style.cssText = "position:relative;width:100%;height:100%;overflow:hidden;touch-action:none;";

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.domElement.style.cssText = "display:block;width:100%;height:100%;";
    this.element.appendChild(this.renderer.domElement);

    this.labels = new CSS2DRenderer();
    this.labels.domElement.style.cssText = "position:absolute;inset:0;pointer-events:none;";
    this.element.appendChild(this.labels.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.maxPolarAngle = Math.PI / 2 - 0.02;
    this.controls.screenSpacePanning = false;
    this.controls.addEventListener("change", () => this.requestRender());

    this.scene.add(new THREE.HemisphereLight(0xffffff, 0x8a7f70, 1.6));
    const sun = new THREE.DirectionalLight(0xffffff, 1.4);
    sun.position.set(6, 12, 4);
    this.scene.add(sun);
    this.scene.add(this.world);

    this.bindPointer();
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.element);
  }

  setConfig(config: CardConfig): void {
    this.config = config;
    this.rebuild();
    if (!this.hasView) {
      if (config.camera) this.setCamera(config.camera);
      else this.fit();
      this.hasView = true;
    }
    this.requestRender();
  }

  setHass(hass: Hass): void {
    const prev = this.hass;
    this.hass = hass;
    let changed = false;
    for (const v of this.hotspots.values()) {
      const id = v.data.entity;
      if (!id) continue;
      if (prev && prev.states[id] === hass.states[id]) continue;
      this.applyState(v);
      changed = true;
    }
    if (changed) this.requestRender();
  }

  getCamera(): CameraConfig {
    const r = (n: number) => Math.round(n * 100) / 100;
    const p = this.camera.position;
    const t = this.controls.target;
    return { position: [r(p.x), r(p.y), r(p.z)], target: [r(t.x), r(t.y), r(t.z)] };
  }

  setCamera(c: CameraConfig): void {
    this.camera.position.set(...c.position);
    this.controls.target.set(...c.target);
    this.controls.update();
    this.requestRender();
  }

  fit(): void {
    const box = new THREE.Box3().setFromObject(this.world);
    if (box.isEmpty()) box.set(new THREE.Vector3(0, 0, 0), new THREE.Vector3(8, 2.5, 6));
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const span = Math.max(size.x, size.z, 3);
    this.camera.position.set(center.x, center.y + span * 1.0, center.z + span * 0.85);
    this.controls.target.copy(center).setY(0);
    this.controls.update();
    this.requestRender();
  }

  resetView(): void {
    if (this.config?.camera) this.setCamera(this.config.camera);
    else this.fit();
  }

  dispose(): void {
    this.disposed = true;
    this.resizeObserver.disconnect();
    this.controls.dispose();
    this.clearWorld();
    this.textures.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.element.remove();
  }

  requestRender(): void {
    if (this.framePending || this.disposed) return;
    this.framePending = true;
    requestAnimationFrame(() => {
      this.framePending = false;
      if (this.disposed) return;
      this.renderer.render(this.scene, this.camera);
      this.labels.render(this.scene, this.camera);
    });
  }

  // ---------------------------------------------------------------- building

  private clearWorld(): void {
    this.world.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose?.();
      const mat = m.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
      else mat?.dispose?.();
      if (o instanceof CSS2DObject) o.element.remove();
    });
    this.world.clear();
    this.hotspots.clear();
  }

  private rebuild(): void {
    const cfg = this.config!;
    this.clearWorld();
    const fp = normalizeFloorplan(cfg.floorplan);

    // Floors
    for (const room of fp.rooms) {
      if (room.points.length < 3) continue;
      const shape = new THREE.Shape(room.points.map(([x, y]) => new THREE.Vector2(x * CM, y * CM)));
      const geo = new THREE.ShapeGeometry(shape);
      geo.rotateX(Math.PI / 2);
      const mesh = new THREE.Mesh(
        geo,
        this.surfaceMaterial(
          room.texture ?? cfg.floor_texture,
          room.texture_scale,
          room.color || cfg.floor_color || DEFAULTS.floor_color,
          room.color,
          THREE.DoubleSide
        )
      );
      mesh.position.y = 0.002;
      this.world.add(mesh);

      const showName = cfg.show_room_names !== false && !!room.name;
      const showArea = cfg.show_area !== false && room.points.length >= 3;
      if (showName || showArea) {
        const c = centroid(room.points);
        const el = document.createElement("div");
        el.className = "fp3d-room";
        if (showName) el.append(room.name!);
        if (showArea) {
          const area = document.createElement("span");
          area.className = "area";
          area.textContent = formatArea(roomArea(room.points));
          el.append(area);
        }
        const label = new CSS2DObject(el);
        label.position.set(c[0] * CM, 0.05, c[1] * CM);
        this.world.add(label);
      }
    }

    // Walls
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x9fd3ff,
      transparent: true,
      opacity: 0.3,
      roughness: 0.1,
      depthWrite: false,
    });
    const doorMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.7 });
    for (const wall of fp.walls) {
      const ops = fp.openings.filter((o) => o.wall === wall.id);
      const mat = this.surfaceMaterial(
        wall.texture ?? cfg.wall_texture,
        wall.texture_scale,
        wall.color || cfg.wall_color || DEFAULTS.wall_color,
        wall.color
      );
      this.buildWall(wall, ops, mat, glassMat, doorMat);
    }

    // Hotspots
    for (const h of fp.hotspots) this.buildHotspot(h);
  }

  /** Material for a wall or floor. With a texture the colour only tints it when set explicitly. */
  private surfaceMaterial(
    texture: string | undefined,
    scale: number | undefined,
    color: string,
    explicitColor: string | undefined,
    side: THREE.Side = THREE.FrontSide
  ): THREE.MeshStandardMaterial {
    const map = texture && texture !== "none" ? this.textures.get(texture, scale || defaultTextureSize(texture)) : undefined;
    return new THREE.MeshStandardMaterial({
      color: map ? explicitColor || "#ffffff" : color,
      map: map ?? null,
      roughness: 0.85,
      side,
    });
  }

  private buildWall(
    wall: Wall,
    openings: Opening[],
    wallMat: THREE.Material,
    glassMat: THREE.Material,
    doorMat: THREE.Material
  ): void {
    const cfg = this.config!;
    const dx = wall.x2 - wall.x1;
    const dy = wall.y2 - wall.y1;
    const len = Math.hypot(dx, dy);
    if (len < 1) return;
    const angle = Math.atan2(dy, dx);
    const t = wall.thickness ?? cfg.wall_thickness ?? DEFAULTS.wall_thickness;
    const h0 = wall.height ?? cfg.wall_height ?? DEFAULTS.wall_height;
    const h1 = wall.height_end ?? h0;
    // Height of the wall top at position u along the wall (cm).
    const top = (u: number) => h0 + ((h1 - h0) * Math.max(0, Math.min(len, u))) / len;

    // Every piece lives in the wall's local frame: x along the wall, z across it.
    const group = new THREE.Group();
    group.position.set(wall.x1 * CM, 0, wall.y1 * CM);
    group.rotation.y = -angle;
    this.world.add(group);

    const piece = (u0: number, u1: number, v0: number, top0: number, top1: number, depth: number, m: THREE.Material) => {
      if (u1 - u0 < 0.5) return;
      top0 = Math.max(top0, v0);
      top1 = Math.max(top1, v0);
      if (top0 - v0 < 0.5 && top1 - v0 < 0.5) return;
      group.add(new THREE.Mesh(prismGeometry(u0, u1, v0, top0, top1, depth), m));
    };

    const sorted = [...openings].sort((a, b) => a.offset - b.offset);
    let cursor = -t / 2;
    for (const op of sorted) {
      const a = Math.max(0, op.offset - op.width / 2);
      const b = Math.min(len, op.offset + op.width / 2);
      if (b <= a) continue;
      const sill = op.sill ?? (op.type === "door" ? 0 : 90);
      const opTop = Math.min(Math.min(top(a), top(b)), sill + op.height);
      if (a > cursor) piece(cursor, a, 0, top(cursor), top(a), t, wallMat);
      piece(a, b, 0, sill, sill, t, wallMat);
      piece(a, b, opTop, top(a), top(b), t, wallMat);
      if (op.type === "window") {
        piece(a, b, sill, opTop, opTop, Math.max(1, t * 0.15), glassMat);
      } else {
        // Door leaf, opened ~65 degrees around the hinge at `a`.
        const pivot = new THREE.Group();
        pivot.position.set(a * CM, 0, 0);
        pivot.rotation.y = -1.13;
        const w = b - a;
        const leaf = new THREE.Mesh(new THREE.BoxGeometry(w * CM, (opTop - 1) * CM, 4 * CM), doorMat);
        leaf.position.set((w / 2) * CM, ((opTop - 1) / 2) * CM, 0);
        pivot.add(leaf);
        group.add(pivot);
      }
      cursor = Math.max(cursor, b);
    }
    piece(cursor, len + t / 2, 0, top(cursor), top(len + t / 2), t, wallMat);
  }

  private buildHotspot(h: Hotspot): void {
    const geo = new THREE.BoxGeometry(Math.max(h.w, 1) * CM, Math.max(h.h, 1) * CM, Math.max(h.d, 1) * CM);
    const mat = new THREE.MeshBasicMaterial({ color: HITBOX_IDLE, transparent: true, depthWrite: false });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(h.x * CM, ((h.z ?? 0) + h.h / 2) * CM, h.y * CM);
    mesh.userData.hotspot = h.id;
    mesh.renderOrder = 10;
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({ color: HITBOX_IDLE, transparent: true })
    );
    mesh.add(edges);
    this.world.add(mesh);

    const view: HotspotView = { data: h, mesh, edges, active: false };

    if (h.entity && domainOf(h.entity) === "light") {
      const light = new THREE.PointLight(0xffd59a, 0, 6, 1.6);
      light.position.copy(mesh.position);
      this.world.add(light);
      view.light = light;
    }

    const showLabels = this.config!.show_labels !== false && h.show_label !== false;
    if (showLabels && (h.entity || h.label)) {
      const el = document.createElement("div");
      el.className = "fp3d-label";
      this.bindLabelGestures(el, h);
      const label = new CSS2DObject(el);
      label.position.set(0, (h.h / 2) * CM + 0.12, 0);
      mesh.add(label);
      view.label = label;
    }

    this.hotspots.set(h.id, view);
    this.applyState(view);
  }

  /** The label sits above the hitbox, so it takes the same tap / double tap / hold gestures. */
  private bindLabelGestures(el: HTMLElement, h: Hotspot): void {
    let timer: number | undefined;
    let start: { x: number; y: number } | undefined;
    let held = false;
    const cancel = () => {
      if (timer) window.clearTimeout(timer);
      timer = undefined;
    };
    el.addEventListener("pointerdown", (ev) => {
      if (ev.button !== 0) return;
      ev.stopPropagation();
      held = false;
      start = { x: ev.clientX, y: ev.clientY };
      cancel();
      timer = window.setTimeout(() => {
        timer = undefined;
        held = true;
        this.onHotspot?.(h, "hold");
      }, HOLD_MS);
    });
    el.addEventListener("pointermove", (ev) => {
      if (start && Math.hypot(ev.clientX - start.x, ev.clientY - start.y) > 6) cancel();
    });
    el.addEventListener("pointerup", cancel);
    el.addEventListener("pointercancel", cancel);
    el.addEventListener("pointerleave", cancel);
    el.addEventListener("click", (ev) => {
      ev.stopPropagation();
      // The release after a hold is not a tap.
      if (held) {
        held = false;
        return;
      }
      this.onHotspot?.(h, "tap");
    });
    el.addEventListener("contextmenu", (ev) => {
      ev.preventDefault();
      // Touch long-press also fires contextmenu; the hold has already run then.
      if (!held) this.onHotspot?.(h, "hold");
    });
  }

  private applyState(v: HotspotView): void {
    const h = v.data;
    const s = h.entity ? this.hass?.states[h.entity] : undefined;
    v.active = isActive(s);
    this.styleHotspot(v);

    if (v.light) {
      const bri = (s?.attributes.brightness as number | undefined) ?? 255;
      v.light.intensity = v.active ? 2.2 * (bri / 255) : 0;
      const rgb = s?.attributes.rgb_color as [number, number, number] | undefined;
      if (rgb) v.light.color.setRGB(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, THREE.SRGBColorSpace);
    }

    if (v.label) {
      const el = v.label.element;
      el.classList.toggle("active", v.active);
      el.replaceChildren();
      if (h.icon) {
        const icon = document.createElement("ha-icon");
        icon.setAttribute("icon", h.icon);
        el.appendChild(icon);
      }
      const text = document.createElement("span");
      const name = h.label || (h.entity ? friendlyName(s, h.entity) : "");
      if (h.entity && this.hass) {
        const n = document.createElement("span");
        n.className = "name";
        n.textContent = name;
        const st = document.createElement("span");
        st.className = "state";
        st.textContent = formatState(this.hass, s);
        text.append(n, st);
      } else {
        text.textContent = name;
      }
      el.appendChild(text);
    }
  }

  private styleHotspot(v: HotspotView): void {
    const mode = this.config?.hitbox_mode ?? "visible";
    const hovered = this.hovered === v.data.id;
    const color = v.data.color ? new THREE.Color(v.data.color) : new THREE.Color(v.active ? HITBOX_ACTIVE : HITBOX_IDLE);
    if (v.data.color && v.active) color.lerp(new THREE.Color(HITBOX_ACTIVE), 0.5);
    let fill = v.active ? 0.32 : 0.1;
    let line = v.active ? 0.9 : 0.55;
    if (mode === "hidden" || (mode === "hover" && !hovered)) {
      fill = 0;
      line = 0;
    }
    if (hovered) {
      fill += 0.15;
      line = 1;
    }
    const mm = v.mesh.material as THREE.MeshBasicMaterial;
    mm.color.copy(color);
    mm.opacity = fill;
    const lm = v.edges.material as THREE.LineBasicMaterial;
    lm.color.copy(color);
    lm.opacity = line;
  }

  // ------------------------------------------------------------- interaction

  private bindPointer(): void {
    const el = this.renderer.domElement;
    let down: { x: number; y: number; id: number } | undefined;
    let holdTimer: number | undefined;
    let consumed = false;

    const cancelHold = () => {
      if (holdTimer) window.clearTimeout(holdTimer);
      holdTimer = undefined;
    };

    el.addEventListener("pointerdown", (ev) => {
      down = { x: ev.clientX, y: ev.clientY, id: ev.pointerId };
      consumed = false;
      cancelHold();
      const hit = this.pick(ev);
      if (hit) {
        holdTimer = window.setTimeout(() => {
          consumed = true;
          this.onHotspot?.(hit, "hold");
        }, HOLD_MS);
      }
    });
    el.addEventListener("pointermove", (ev) => {
      if (down && Math.hypot(ev.clientX - down.x, ev.clientY - down.y) > 6) cancelHold();
      if (!down && ev.pointerType === "mouse") this.setHover(this.pick(ev)?.id);
    });
    el.addEventListener("pointerup", (ev) => {
      cancelHold();
      const start = down;
      down = undefined;
      if (!start || consumed) return;
      if (Math.hypot(ev.clientX - start.x, ev.clientY - start.y) > 6) return;
      const hit = this.pick(ev);
      if (hit) this.onHotspot?.(hit, "tap");
    });
    el.addEventListener("pointerleave", () => {
      cancelHold();
      this.setHover(undefined);
    });
    el.addEventListener("contextmenu", (ev) => {
      const hit = this.pick(ev);
      if (hit) {
        ev.preventDefault();
        if (!consumed) this.onHotspot?.(hit, "hold");
      }
    });
  }

  private pick(ev: { clientX: number; clientY: number }): Hotspot | undefined {
    const rect = this.renderer.domElement.getBoundingClientRect();
    if (!rect.width || !rect.height) return undefined;
    const ndc = new THREE.Vector2(
      ((ev.clientX - rect.left) / rect.width) * 2 - 1,
      -((ev.clientY - rect.top) / rect.height) * 2 + 1
    );
    this.raycaster.setFromCamera(ndc, this.camera);
    const meshes = [...this.hotspots.values()].map((v) => v.mesh);
    const hit = this.raycaster.intersectObjects(meshes, false)[0];
    const id = hit?.object.userData.hotspot as string | undefined;
    return id ? this.hotspots.get(id)?.data : undefined;
  }

  private setHover(id: string | undefined): void {
    if (this.hovered === id) return;
    const prev = this.hovered;
    this.hovered = id;
    this.renderer.domElement.style.cursor = id ? "pointer" : "";
    for (const key of [prev, id]) {
      const v = key ? this.hotspots.get(key) : undefined;
      if (v) this.styleHotspot(v);
    }
    this.requestRender();
  }

  private resize(): void {
    const w = this.element.clientWidth;
    const h = this.element.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h, false);
    this.labels.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.requestRender();
  }
}

/**
 * Box-like prism from u0..u1 along the wall, bottom at v0 and a (possibly sloped) top from
 * top0 to top1, `depth` thick. Units are cm in, metres out; UVs are in metres so textures
 * keep their real-world size.
 */
function prismGeometry(u0: number, u1: number, v0: number, top0: number, top1: number, depth: number): THREE.BufferGeometry {
  const x0 = u0 * CM;
  const x1 = u1 * CM;
  const y0 = v0 * CM;
  const ya = top0 * CM;
  const yb = top1 * CM;
  const z = (depth / 2) * CM;
  const pos: number[] = [];
  const uv: number[] = [];
  const quad = (p: number[][], t: number[][]) => {
    for (const i of [0, 1, 2, 0, 2, 3]) {
      pos.push(...p[i]);
      uv.push(...t[i]);
    }
  };
  // front (+z) and back (-z)
  quad([[x0, y0, z], [x1, y0, z], [x1, yb, z], [x0, ya, z]], [[x0, y0], [x1, y0], [x1, yb], [x0, ya]]);
  quad([[x1, y0, -z], [x0, y0, -z], [x0, ya, -z], [x1, yb, -z]], [[-x1, y0], [-x0, y0], [-x0, ya], [-x1, yb]]);
  // top (sloped) and bottom
  quad([[x0, ya, z], [x1, yb, z], [x1, yb, -z], [x0, ya, -z]], [[x0, z], [x1, z], [x1, -z], [x0, -z]]);
  quad([[x0, y0, -z], [x1, y0, -z], [x1, y0, z], [x0, y0, z]], [[x0, -z], [x1, -z], [x1, z], [x0, z]]);
  // ends
  quad([[x0, y0, -z], [x0, y0, z], [x0, ya, z], [x0, ya, -z]], [[-z, y0], [z, y0], [z, ya], [-z, ya]]);
  quad([[x1, y0, z], [x1, y0, -z], [x1, yb, -z], [x1, yb, z]], [[z, y0], [-z, y0], [-z, yb], [z, yb]]);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  geo.computeVertexNormals();
  return geo;
}

export function centroid(points: [number, number][]): [number, number] {
  let a = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0; i < points.length; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[(i + 1) % points.length];
    const f = x0 * y1 - x1 * y0;
    a += f;
    cx += (x0 + x1) * f;
    cy += (y0 + y1) * f;
  }
  if (Math.abs(a) < 1e-6) {
    const n = points.length || 1;
    return [points.reduce((s, p) => s + p[0], 0) / n, points.reduce((s, p) => s + p[1], 0) / n];
  }
  a *= 0.5;
  return [cx / (6 * a), cy / (6 * a)];
}

const HOLD_MS = 550;

export const VIEWER_STYLES = `
.fp3d-label {
  pointer-events: auto;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 12px;
  background: rgba(20, 24, 31, 0.78);
  color: #fff;
  font: 500 12px/1.25 var(--paper-font-body1_-_font-family, system-ui, sans-serif);
  white-space: nowrap;
  box-shadow: 0 1px 4px rgba(0,0,0,.3);
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  touch-action: manipulation;
  transition: background .2s;
}
.fp3d-label.active { background: rgba(214, 150, 0, 0.92); }
.fp3d-label ha-icon { --mdc-icon-size: 16px; }
.fp3d-label > span { display: flex; flex-direction: column; }
.fp3d-label .name { opacity: .8; font-size: 10px; }
.fp3d-label .state { font-weight: 600; }
.fp3d-room {
  pointer-events: none;
  color: var(--primary-text-color, #222);
  font: 600 12px var(--paper-font-body1_-_font-family, system-ui, sans-serif);
  opacity: .65;
  text-shadow: 0 0 3px var(--card-background-color, #fff);
  display: flex; flex-direction: column; align-items: center; text-align: center;
}
.fp3d-room .area { font-weight: 500; font-size: 11px; }
`;
