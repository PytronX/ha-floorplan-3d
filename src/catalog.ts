import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

// The object library: basic shapes and furniture, all assembled from simple primitives so the
// card needs no model files. Every builder works in the object's own frame, in metres: x across
// the width (-W/2..W/2), y up from the floor (0..H) and z through the depth with +z as the front.

type MatName =
  | "dark"
  | "darkwood"
  | "wood"
  | "metal"
  | "steel"
  | "blackmetal"
  | "white"
  | "ceramic"
  | "stone"
  | "glass"
  | "tinted"
  | "screen"
  | "hobglass"
  | "hob"
  | "green"
  | "green2"
  | "green3"
  | "pot"
  | "soil"
  | "shade"
  | "bulb"
  | "basin"
  | "rubber"
  | "fabric"
  | "cushion"
  | "linen"
  | "lamp_front"
  | "lamp_rear"
  | "book0"
  | "book1"
  | "book2"
  | "book3"
  | "book4"
  | "book5";

const MATS: Record<MatName, THREE.MeshStandardMaterialParameters> = {
  dark: { color: 0x2d2d2d, roughness: 0.6 },
  darkwood: { color: 0x5a3d28, roughness: 0.6 },
  wood: { color: 0xb08356, roughness: 0.55 },
  metal: { color: 0xc4c8cd, roughness: 0.25, metalness: 0.9 },
  steel: { color: 0x9da2a8, roughness: 0.4, metalness: 0.7 },
  blackmetal: { color: 0x2a2a2a, roughness: 0.4, metalness: 0.6 },
  white: { color: 0xf3f3f1, roughness: 0.5 },
  ceramic: { color: 0xfbfbfb, roughness: 0.12 },
  stone: { color: 0x3a3b3e, roughness: 0.25 },
  glass: { color: 0xd6eeff, roughness: 0.03, metalness: 0.1, transparent: true, opacity: 0.25, depthWrite: false },
  tinted: { color: 0x1a2430, roughness: 0.05, metalness: 0.5 },
  screen: { color: 0x0a0d12, roughness: 0.08, metalness: 0.4 },
  hobglass: { color: 0x0c0c0c, roughness: 0.05, metalness: 0.3 },
  hob: { color: 0x6a2a22, roughness: 0.3 },
  green: { color: 0x3a7a2e, roughness: 0.7, side: THREE.DoubleSide },
  green2: { color: 0x5aa040, roughness: 0.7, side: THREE.DoubleSide },
  green3: { color: 0x2c5e24, roughness: 0.7, side: THREE.DoubleSide },
  pot: { color: 0xb8673f, roughness: 0.85 },
  soil: { color: 0x3b2a1e, roughness: 1 },
  shade: { color: 0xfff6e6, roughness: 0.9, emissive: 0xffe2a8, emissiveIntensity: 0.3, side: THREE.DoubleSide },
  bulb: { color: 0xffffff, emissive: 0xfff1cc, emissiveIntensity: 1 },
  basin: { color: 0xe4e8ec, roughness: 0.1 },
  rubber: { color: 0x151515, roughness: 0.9 },
  fabric: { color: 0x8d9096, roughness: 0.95 },
  cushion: { color: 0xd9a441, roughness: 0.95 },
  linen: { color: 0xf6f4ef, roughness: 0.95 },
  lamp_front: { color: 0xffffff, emissive: 0xfff4d0, emissiveIntensity: 0.8 },
  lamp_rear: { color: 0xc01818, emissive: 0x900000, emissiveIntensity: 0.6 },
  book0: { color: 0x8a2f2f, roughness: 0.8 },
  book1: { color: 0x2f4f8a, roughness: 0.8 },
  book2: { color: 0x3d7a4a, roughness: 0.8 },
  book3: { color: 0xc9a227, roughness: 0.8 },
  book4: { color: 0xe8e2d4, roughness: 0.8 },
  book5: { color: 0x3a3a3a, roughness: 0.8 },
};
const GRAINED: MatName[] = ["wood", "darkwood"];

let grain: THREE.Texture | undefined;

/** Light grey wood grain; the material colour tints it. One tile is one metre. */
export function woodGrain(): THREE.Texture {
  if (grain) return grain;
  const n = 512;
  const c = document.createElement("canvas");
  c.width = c.height = n;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#e9e9e9";
  ctx.fillRect(0, 0, n, n);
  let s = 11;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 140; i++) {
    const y = rnd() * n;
    const a = 2 + rnd() * 6;
    const f = 1 + rnd() * 3;
    ctx.strokeStyle = `rgba(${90 + rnd() * 40},${70 + rnd() * 30},${50 + rnd() * 20},${0.06 + rnd() * 0.12})`;
    ctx.lineWidth = 0.6 + rnd() * 2.2;
    ctx.beginPath();
    for (let x = 0; x <= n; x += 8) {
      const yy = y + Math.sin((x / n) * Math.PI * 2 * f + i) * a;
      if (x === 0) ctx.moveTo(x, yy);
      else ctx.lineTo(x, yy);
    }
    ctx.stroke();
  }
  grain = new THREE.CanvasTexture(c);
  grain.colorSpace = THREE.SRGBColorSpace;
  grain.wrapS = grain.wrapT = THREE.RepeatWrapping;
  grain.anisotropy = 4;
  return grain;
}

export class ObjectBuilder {
  readonly group = new THREE.Group();
  private mats = new Map<string, THREE.Material>();

  constructor(
    readonly W: number,
    readonly D: number,
    readonly H: number,
    readonly main: THREE.MeshStandardMaterial
  ) {}

  mat(name: MatName): THREE.Material {
    let m = this.mats.get(name);
    if (!m) {
      const p = { ...MATS[name] };
      if (GRAINED.includes(name)) p.map = woodGrain();
      m = new THREE.MeshStandardMaterial(p);
      this.mats.set(name, m);
    }
    return m;
  }

  /** The main colour, lighter (f > 0) or darker (f < 0): cushions, duvets, drawer fronts. */
  accent(f = 0.18): THREE.Material {
    const key = `accent${f}`;
    let m = this.mats.get(key);
    if (!m) {
      const c = this.main.clone();
      c.color.lerp(new THREE.Color(f > 0 ? 0xffffff : 0x000000), Math.abs(f));
      m = c;
      this.mats.set(key, m);
    }
    return m;
  }

  add(geo: THREE.BufferGeometry, m: THREE.Material, x: number, y: number, z: number, parent: THREE.Object3D = this.group): THREE.Mesh {
    if ((m as THREE.MeshStandardMaterial).map) geo = boxUV(geo);
    const mesh = new THREE.Mesh(geo, m);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }

  /** Box centred on x/z, standing on y0. */
  box(cx: number, y0: number, cz: number, sx: number, sy: number, sz: number, m: THREE.Material = this.main): THREE.Mesh | undefined {
    if (sx <= 0 || sy <= 0 || sz <= 0) return undefined;
    return this.add(new THREE.BoxGeometry(sx, sy, sz), m, cx, y0 + sy / 2, cz);
  }

  /** Box with rounded edges (radius r), centred on x/z, standing on y0. */
  rbox(cx: number, y0: number, cz: number, sx: number, sy: number, sz: number, r: number, m: THREE.Material = this.main): THREE.Mesh | undefined {
    if (sx <= 0 || sy <= 0 || sz <= 0) return undefined;
    const rr = Math.min(r, sx / 2 - 1e-4, sy / 2 - 1e-4, sz / 2 - 1e-4);
    if (rr < 0.002) return this.box(cx, y0, cz, sx, sy, sz, m);
    return this.add(new RoundedBoxGeometry(sx, sy, sz, 3, rr), m, cx, y0 + sy / 2, cz);
  }

  /** Elliptic cylinder standing on y0; `top` scales the upper radius (0 = cone). */
  cyl(cx: number, y0: number, cz: number, rx: number, rz: number, h: number, m: THREE.Material = this.main, top = 1, seg = 28, open = false): THREE.Mesh | undefined {
    if (h <= 0) return undefined;
    const geo = new THREE.CylinderGeometry(top, 1, 1, seg, 1, open);
    geo.scale(rx, h, rz);
    return this.add(geo, m, cx, y0 + h / 2, cz);
  }

  ball(cx: number, cy: number, cz: number, rx: number, ry: number, rz: number, m: THREE.Material = this.main): THREE.Mesh {
    const geo = new THREE.SphereGeometry(1, 24, 16);
    geo.scale(rx, ry, rz);
    return this.add(geo, m, cx, cy, cz);
  }

  /** Turned shape from a [radius, height] profile, optionally squashed to an ellipse. */
  lathe(cx: number, y0: number, cz: number, profile: [number, number][], m: THREE.Material = this.main, sx = 1, sz = 1, seg = 36): THREE.Mesh {
    const geo = new THREE.LatheGeometry(profile.map(([r, y]) => new THREE.Vector2(Math.max(r, 0), y)), seg);
    geo.scale(sx, 1, sz);
    return this.add(geo, m, cx, y0, cz);
  }

  /** Ring lying flat (or standing, facing +z) around its centre. */
  ring(cx: number, cy: number, cz: number, radius: number, tube: number, m: THREE.Material, upright = false, sx = 1, sz = 1): THREE.Mesh {
    const geo = new THREE.TorusGeometry(radius, tube, 12, 40);
    if (!upright) geo.rotateX(Math.PI / 2);
    geo.scale(sx, 1, sz);
    return this.add(geo, m, cx, cy, cz);
  }

  /** Four legs at the corners, inset from the edges; `taper` < 1 makes them thinner at the floor. */
  legs(h: number, size: number, inset: number, m: THREE.Material, round = false, taper = 1): void {
    const { W, D } = this;
    for (const sx of [-1, 1])
      for (const sz of [-1, 1]) {
        const x = sx * (W / 2 - inset - size / 2);
        const z = sz * (D / 2 - inset - size / 2);
        if (round) this.cyl(x, 0, z, (size / 2) * taper, (size / 2) * taper, h, m, 1 / taper, 16);
        else if (taper !== 1) this.cyl(x, 0, z, (size / 2) * taper * Math.SQRT2, (size / 2) * taper * Math.SQRT2, h, m, 1 / taper, 4)?.rotateY(Math.PI / 4);
        else this.box(x, 0, z, size, h, size, m);
      }
  }

  /** Bar handle on a front at height y, `len` long, horizontal or vertical. */
  handle(x: number, y: number, zFront: number, len: number, vertical = false, m: THREE.Material = this.mat("metal")): void {
    const r = 0.006;
    const geo = new THREE.CylinderGeometry(r, r, len, 10);
    if (!vertical) geo.rotateZ(Math.PI / 2);
    this.add(geo, m, x, y, zFront + 0.028);
    const off = len / 2 - 0.012;
    for (const s of [-1, 1]) {
      const post = new THREE.CylinderGeometry(r * 0.8, r * 0.8, 0.028, 8);
      post.rotateX(Math.PI / 2);
      this.add(post, m, vertical ? x : x + s * off, vertical ? y + s * off : y, zFront + 0.014);
    }
  }
}

/** Box-projected UVs in metres, so textures keep their real size on furniture too. */
function boxUV(geo: THREE.BufferGeometry): THREE.BufferGeometry {
  const g = geo.index ? geo.toNonIndexed() : geo;
  const pos = g.getAttribute("position");
  const uv = new Float32Array(pos.count * 2);
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const c = new THREE.Vector3();
  const n = new THREE.Vector3();
  for (let i = 0; i + 2 < pos.count; i += 3) {
    a.fromBufferAttribute(pos, i);
    b.fromBufferAttribute(pos, i + 1);
    c.fromBufferAttribute(pos, i + 2);
    n.subVectors(b, a).cross(c.clone().sub(a));
    const ax = Math.abs(n.x);
    const ay = Math.abs(n.y);
    const az = Math.abs(n.z);
    for (let k = 0; k < 3; k++) {
      const v = k === 0 ? a : k === 1 ? b : c;
      const j = (i + k) * 2;
      if (ax >= ay && ax >= az) {
        uv[j] = v.z;
        uv[j + 1] = v.y;
      } else if (ay >= az) {
        uv[j] = v.x;
        uv[j + 1] = v.z;
      } else {
        uv[j] = v.x;
        uv[j + 1] = v.y;
      }
    }
  }
  g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  return g;
}

export const CATEGORIES = ["Grundformen", "Wohnzimmer", "Leuchten", "Küche & Essen", "Schlafzimmer", "Bad", "Büro", "Sonstiges"] as const;
export type Category = (typeof CATEGORIES)[number];

export interface CatalogItem {
  id: string;
  label: string;
  category: Category;
  /** Default size in cm. */
  w: number;
  d: number;
  h: number;
  /** Default height above the floor in cm. */
  z?: number;
  color: string;
  /** Drawn as an ellipse in the 2D plan. */
  round?: boolean;
  /** The main colour is wood: it gets a grain unless a texture is set. */
  grain?: boolean;
  /** Upholstered: a matt fabric surface. */
  fabric?: boolean;
  build(b: ObjectBuilder): void;
}

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));


function seeded(seed: number): () => number {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

/** Rounded rectangle in the plan (x across, y = -z), centred, for extruded frames. */
function roundRect(w: number, d: number, r: number, path: THREE.Path = new THREE.Shape()): THREE.Path {
  const rr = Math.max(0.001, Math.min(r, w / 2 - 1e-4, d / 2 - 1e-4));
  const x = -w / 2;
  const y = -d / 2;
  path.moveTo(x + rr, y);
  path.lineTo(x + w - rr, y);
  path.quadraticCurveTo(x + w, y, x + w, y + rr);
  path.lineTo(x + w, y + d - rr);
  path.quadraticCurveTo(x + w, y + d, x + w - rr, y + d);
  path.lineTo(x + rr, y + d);
  path.quadraticCurveTo(x, y + d, x, y + d - rr);
  path.lineTo(x, y + rr);
  path.quadraticCurveTo(x, y, x + rr, y);
  return path;
}

/** A rounded rectangular rim (outer minus hole) extruded upwards from y0, with soft top edges. */
function rim(
  b: ObjectBuilder,
  cx: number,
  y0: number,
  cz: number,
  w: number,
  d: number,
  r: number,
  hw: number,
  hd: number,
  hr: number,
  h: number,
  m: THREE.Material,
  hz = 0,
  oval = false
): void {
  if (h <= 0 || hw >= w || hd >= d) return;
  // The bevel grows the outline and shrinks the hole; shape both so the result has the given sizes.
  const bevel = Math.min(0.01, h / 3);
  const bs = bevel * 0.6;
  const s = roundRect(w - 2 * bs, d - 2 * bs, r) as THREE.Shape;
  const hole = new THREE.Path();
  if (oval) hole.absellipse(0, 0, hw / 2 + bs, hd / 2 + bs, 0, Math.PI * 2, true, 0);
  else roundRect(hw + 2 * bs, hd + 2 * bs, hr + bs, hole);
  // Shift the hole towards the front (+z), which is -y in the shape plane.
  const holePts = hole.getPoints(oval ? 48 : 6).map((p) => new THREE.Vector2(p.x, p.y - hz));
  s.holes.push(new THREE.Path(holePts));
  const geo = new THREE.ExtrudeGeometry(s, { depth: h - bevel * 2, bevelEnabled: true, bevelThickness: bevel, bevelSize: bs, bevelSegments: 3, curveSegments: 8 });
  geo.translate(0, 0, bevel);
  geo.rotateX(-Math.PI / 2);
  b.add(geo, m, cx, y0, cz);
}

/** A flat leaf along +x, drooping towards its tip. */
function leafGeo(len: number, wid: number, droop: number): THREE.BufferGeometry {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.quadraticCurveTo(len * 0.3, wid * 0.65, len, 0);
  s.quadraticCurveTo(len * 0.3, -wid * 0.65, 0, 0);
  const g = new THREE.ShapeGeometry(s, 10);
  g.rotateX(-Math.PI / 2);
  const p = g.getAttribute("position");
  for (let i = 0; i < p.count; i++) {
    const t = p.getX(i) / len;
    p.setY(i, -droop * len * t * t + Math.abs(p.getZ(i)) * 0.35);
  }
  g.computeVertexNormals();
  return g;
}

function sofaLike(b: ObjectBuilder, seats: number): void {
  const { W, D, H } = b;
  const wood = b.mat("darkwood");
  const leg = clamp(H * 0.13, 0.05, 0.14);
  b.legs(leg + 0.01, 0.045, 0.05, wood, true, 0.6);
  const aw = clamp(W * 0.09, 0.09, 0.17);
  const bt = clamp(D * 0.2, 0.12, 0.2);
  const seatTop = clamp(H * 0.52, 0.3, 0.46);
  const baseTop = seatTop - 0.13;
  const armTop = clamp(H * 0.72, seatTop + 0.08, H);
  b.rbox(0, leg, 0, W, baseTop - leg, D, 0.03);
  for (const sx of [-1, 1]) b.rbox(sx * (W / 2 - aw / 2), leg, 0, aw, armTop - leg, D, 0.045);
  b.rbox(0, leg, -D / 2 + bt / 2, W, H - leg, bt, 0.05);
  const iw = W - 2 * aw;
  const cd = D - bt - 0.01;
  const cw = iw / seats;
  const seat = b.accent(0.05);
  for (let i = 0; i < seats; i++) {
    const x = -iw / 2 + cw * (i + 0.5);
    b.rbox(x, baseTop - 0.01, D / 2 - cd / 2, cw - 0.006, seatTop - baseTop + 0.01, cd, 0.045, seat);
    const bh = Math.max(0.1, H - seatTop - 0.03);
    const back = b.rbox(x, 0, 0, cw - 0.01, bh, 0.17, 0.07, seat);
    if (back) {
      back.position.set(x, seatTop + bh / 2, -D / 2 + bt + 0.07);
      back.rotation.x = -0.16;
    }
  }
  // Two throw pillows on the outer seats.
  if (seats > 1 && iw > 0.7) {
    const pill = b.mat("cushion");
    for (const sx of [-1, 1]) {
      const p = b.rbox(0, 0, 0, 0.4, 0.38, 0.12, 0.06, pill);
      if (!p) continue;
      p.position.set(sx * (iw / 2 - 0.26), seatTop + 0.2, -D / 2 + bt + 0.2);
      p.rotation.set(-0.35, sx * 0.25, sx * -0.12);
    }
  }
}

function lampShade(b: ObjectBuilder, y0: number, h: number, r: number, top = 0.7): void {
  b.cyl(0, y0, 0, r, r, h, b.mat("shade"), top, 40, true);
  // A ring at the top and bottom edge keeps the shade from looking paper thin.
  b.ring(0, y0, 0, r, 0.004, b.mat("shade"));
  b.ring(0, y0 + h, 0, r * top, 0.004, b.mat("shade"));
  b.ball(0, y0 + h * 0.45, 0, 0.035, 0.045, 0.035, b.mat("bulb"));
}

function tableTop(b: ObjectBuilder): void {
  const { W, D, H } = b;
  const t = 0.035;
  b.rbox(0, H - t, 0, W, t, D, 0.008);
  const ins = 0.05;
  const apron = 0.09;
  for (const sz of [-1, 1]) b.box(0, H - t - apron, sz * (D / 2 - ins - 0.02), W - 2 * ins - 0.04, apron, 0.022);
  for (const sx of [-1, 1]) b.box(sx * (W / 2 - ins - 0.02), H - t - apron, 0, 0.022, apron, D - 2 * ins - 0.04);
  b.legs(H - t, 0.06, ins - 0.01, b.main, false, 0.65);
}

function chairLike(b: ObjectBuilder): void {
  const { W, D, H } = b;
  const seat = clamp(H * 0.5, 0.25, 0.47);
  const frame = b.main;
  b.legs(seat - 0.04, 0.035, 0.02, frame, true, 0.7);
  b.rbox(0, seat - 0.045, 0, W, 0.03, D, 0.006, frame);
  b.rbox(0, seat - 0.018, 0.01, W - 0.03, 0.045, D - 0.04, 0.02, b.mat("fabric"));
  // Back: two posts and a curved, slightly tilted backrest.
  const back = new THREE.Group();
  back.position.set(0, seat - 0.02, -D / 2 + 0.02);
  back.rotation.x = -0.1;
  b.group.add(back);
  const bh = H - seat + 0.02;
  for (const sx of [-1, 1]) b.add(new THREE.BoxGeometry(0.03, bh, 0.03), frame, sx * (W / 2 - 0.035), bh / 2, 0, back);
  const rh = Math.min(0.2, bh * 0.4);
  b.add(new RoundedBoxGeometry(W - 0.02, rh, 0.022, 2, 0.008), frame, 0, bh - rh / 2 - 0.02, 0.005, back);
  b.add(new THREE.BoxGeometry(W - 0.07, 0.025, 0.02), frame, 0, bh * 0.35, 0, back);
}

/** Recessed plinth and carcass of kitchen units; `hole` leaves room for a sunk basin at the top. */
function kitchenCarcass(b: ObjectBuilder, hole?: { w: number; d: number; z: number; depth: number }): { y0: number; top: number } {
  const { W, D, H } = b;
  const plinth = 0.1;
  const top = H - 0.04;
  b.box(0, 0, -0.05, W, plinth, D - 0.1, b.mat("dark"));
  const cut = hole ? Math.max(plinth + 0.05, top - hole.depth) : top;
  b.box(0, plinth, -0.01, W, cut - plinth, D - 0.04);
  if (hole) rim(b, 0, cut - 0.002, -0.01, W, D - 0.04, 0.001, hole.w, hole.d, 0.02, top - cut + 0.002, b.main, hole.z + 0.01);
  return { y0: plinth, top };
}

function fronts(b: ObjectBuilder, y0: number, y1: number, rows: number[], handle: "top" | "bottom" | "side" | "none" = "top"): void {
  const { W, D } = b;
  const gap = 0.003;
  const n = Math.max(1, Math.round(W / 0.6));
  const dw = W / n;
  const total = rows.reduce((s, v) => s + v, 0);
  for (let i = 0; i < n; i++) {
    const x = -W / 2 + dw * (i + 0.5);
    let y = y0;
    for (const r of rows) {
      const h = ((y1 - y0) * r) / total;
      b.rbox(x, y + gap, D / 2 - 0.0095, dw - gap * 2, h - gap * 2, 0.019, 0.002);
      const len = Math.min(0.32, dw * 0.55);
      if (handle === "top") b.handle(x, y + h - Math.min(0.05, h * 0.25), D / 2, len);
      else if (handle === "bottom") b.handle(x, y + 0.04, D / 2, len);
      else if (handle === "side") {
        const side = n === 1 || i % 2 === 0 ? 1 : -1;
        b.handle(x + side * (dw / 2 - 0.045), y + h / 2, D / 2, Math.min(0.3, h * 0.3), true);
      }
      y += h;
    }
  }
}

function kitchenBase(b: ObjectBuilder, rows: number[] = [1, 3.2]): void {
  const { W, D } = b;
  const { y0, top } = kitchenCarcass(b);
  fronts(b, y0, top, rows);
  b.rbox(0, top, 0.01, W, 0.04, D + 0.02, 0.003, b.mat("stone"));
}

function cabinet(b: ObjectBuilder, plinth: number, handle: "side" | "bottom"): void {
  const { W, D, H } = b;
  if (plinth > 0) b.box(0, 0, -0.02, W - 0.02, plinth, D - 0.06, b.mat("dark"));
  b.box(0, plinth, -0.01, W, H - plinth, D - 0.02);
  const n = Math.max(1, Math.round(W / (handle === "side" ? 0.5 : 0.6)));
  const dw = W / n;
  for (let i = 0; i < n; i++) {
    const x = -W / 2 + dw * (i + 0.5);
    b.rbox(x, plinth + 0.003, D / 2 - 0.0095, dw - 0.004, H - plinth - 0.006, 0.019, 0.002);
    if (handle === "side") {
      const side = n === 1 ? 1 : i % 2 === 0 ? 1 : -1;
      const hh = Math.min(0.4, (H - plinth) * 0.22);
      b.handle(x + side * (dw / 2 - 0.04), plinth + (H - plinth) * 0.52, D / 2, hh, true);
    } else b.handle(x, plinth + 0.04, D / 2, Math.min(0.3, dw * 0.5));
  }
}

function drawers(b: ObjectBuilder, n: number): void {
  const { W, D, H } = b;
  const leg = clamp(H * 0.16, 0.06, 0.16);
  b.legs(leg, 0.035, 0.03, b.mat("darkwood"), true, 0.6);
  b.rbox(0, leg, -0.01, W, H - leg, D - 0.02, 0.006);
  const dh = (H - leg - 0.04) / n;
  for (let i = 0; i < n; i++) {
    const y = leg + 0.02 + dh * i;
    b.rbox(0, y + 0.003, D / 2 - 0.012, W - 0.04, dh - 0.006, 0.02, 0.003, b.accent(0.06));
    b.handle(0, y + dh / 2, D / 2 - 0.002, Math.min(0.16, W * 0.35));
  }
}

function bed(b: ObjectBuilder, pillows: number): void {
  const { W, D, H } = b;
  const leg = 0.07;
  const frameTop = clamp(H * 0.36, 0.18, 0.34);
  const head = 0.09;
  b.legs(leg, 0.05, 0.05, b.mat("darkwood"), true, 0.7);
  // Upholstered frame and a padded, channel-tufted headboard.
  b.rbox(0, leg, head / 2, W, frameTop - leg, D - head, 0.03);
  const panels = Math.max(3, Math.round(W / 0.25));
  const pw = W / panels;
  for (let i = 0; i < panels; i++) b.rbox(-W / 2 + pw * (i + 0.5), leg, -D / 2 + head / 2, pw - 0.004, H - leg, head, 0.04);
  // Mattress, duvet with a folded edge, pillows and a throw at the foot.
  const mw = W - 0.05;
  const md = D - head - 0.05;
  const mz = head / 2 + 0.005;
  const mTop = frameTop + 0.2;
  b.rbox(0, frameTop - 0.03, mz, mw, 0.23, md, 0.05, b.mat("white"));
  const duvetD = md * 0.7;
  const dz = mz + md / 2 - duvetD / 2 + 0.03;
  b.rbox(0, mTop - 0.06, dz, mw + 0.05, 0.12, duvetD + 0.03, 0.05, b.mat("linen"));
  b.rbox(0, mTop + 0.03, dz - duvetD / 2 + 0.12, mw + 0.05, 0.05, 0.24, 0.024, b.mat("linen"));
  b.rbox(0, mTop - 0.05, mz + md / 2 - 0.25, mw + 0.07, 0.14, 0.4, 0.04, b.accent(0.12));
  const pwid = (mw - 0.08) / pillows;
  for (let i = 0; i < pillows; i++) {
    const p = b.rbox(0, 0, 0, Math.min(0.75, pwid - 0.04), 0.14, 0.42, 0.065, b.mat("linen"));
    if (!p) continue;
    p.position.set(-(mw - 0.08) / 2 + pwid * (i + 0.5), mTop + 0.08, -D / 2 + head + 0.27);
    p.rotation.x = -0.25;
  }
}

// ------------------------------------------------------------------ the catalog

export const CATALOG: CatalogItem[] = [
  // Basic shapes
  { id: "box", label: "Würfel / Quader", category: "Grundformen", w: 60, d: 60, h: 60, color: "#9aa7b4", build: (b) => b.box(0, 0, 0, b.W, b.H, b.D) },
  {
    id: "sphere", label: "Kugel", category: "Grundformen", w: 60, d: 60, h: 60, color: "#9aa7b4", round: true,
    build: (b) => b.ball(0, b.H / 2, 0, b.W / 2, b.H / 2, b.D / 2),
  },
  {
    id: "cylinder", label: "Zylinder", category: "Grundformen", w: 50, d: 50, h: 80, color: "#9aa7b4", round: true,
    build: (b) => b.cyl(0, 0, 0, b.W / 2, b.D / 2, b.H, b.main, 1, 40),
  },
  {
    id: "cone", label: "Kegel", category: "Grundformen", w: 50, d: 50, h: 80, color: "#9aa7b4", round: true,
    build: (b) => b.cyl(0, 0, 0, b.W / 2, b.D / 2, b.H, b.main, 0, 40),
  },
  {
    id: "pyramid", label: "Pyramide", category: "Grundformen", w: 60, d: 60, h: 60, color: "#9aa7b4",
    build: (b) => {
      const geo = new THREE.ConeGeometry(Math.SQRT1_2, 1, 4);
      geo.rotateY(Math.PI / 4);
      geo.scale(b.W, b.H, b.D);
      b.add(geo, b.main, 0, b.H / 2, 0);
    },
  },
  {
    id: "torus", label: "Ring (Torus)", category: "Grundformen", w: 60, d: 60, h: 18, color: "#9aa7b4", round: true,
    build: (b) => {
      const geo = new THREE.TorusGeometry(0.35, 0.15, 20, 48);
      geo.rotateX(Math.PI / 2);
      geo.scale(b.W, b.H / 0.3, b.D);
      b.add(geo, b.main, 0, b.H / 2, 0);
    },
  },
  {
    id: "hemisphere", label: "Halbkugel", category: "Grundformen", w: 60, d: 60, h: 30, color: "#9aa7b4", round: true,
    build: (b) => {
      const geo = new THREE.SphereGeometry(1, 32, 12, 0, Math.PI * 2, 0, Math.PI / 2);
      geo.scale(b.W / 2, b.H, b.D / 2);
      b.add(geo, b.main, 0, 0, 0);
      const base = new THREE.CircleGeometry(1, 32);
      base.rotateX(Math.PI / 2);
      base.scale(b.W / 2, 1, b.D / 2);
      b.add(base, b.main, 0, 0.001, 0);
    },
  },
  {
    id: "wedge", label: "Keil / Rampe", category: "Grundformen", w: 60, d: 100, h: 40, color: "#9aa7b4",
    build: (b) => {
      // Rises from the front (+z) to the back.
      const s = new THREE.Shape([new THREE.Vector2(-b.D / 2, 0), new THREE.Vector2(b.D / 2, 0), new THREE.Vector2(-b.D / 2, b.H)]);
      const geo = new THREE.ExtrudeGeometry(s, { depth: b.W, bevelEnabled: false });
      geo.translate(0, 0, -b.W / 2);
      geo.rotateY(-Math.PI / 2);
      b.add(geo, b.main, 0, 0, 0);
    },
  },

  // Living room
  { id: "sofa", label: "Sofa", category: "Wohnzimmer", w: 220, d: 95, h: 85, color: "#7b8794", fabric: true, build: (b) => sofaLike(b, b.W > 1.8 ? 3 : 2) },
  { id: "armchair", label: "Sessel", category: "Wohnzimmer", w: 90, d: 90, h: 85, color: "#7b8794", fabric: true, build: (b) => sofaLike(b, 1) },
  {
    id: "coffee_table", label: "Couchtisch", category: "Wohnzimmer", w: 110, d: 60, h: 42, color: "#a47a52", grain: true,
    build: (b) => {
      const { W, D, H } = b;
      b.rbox(0, H - 0.035, 0, W, 0.035, D, 0.01);
      b.rbox(0, 0.1, 0, W - 0.1, 0.02, D - 0.1, 0.004);
      b.legs(H - 0.035, 0.045, 0.03, b.main, true, 0.6);
    },
  },
  {
    id: "tv_board", label: "TV-Board", category: "Wohnzimmer", w: 180, d: 40, h: 50, color: "#e9e6df",
    build: (b) => {
      const { W, D, H } = b;
      const leg = Math.min(0.1, H * 0.2);
      b.legs(leg, 0.03, 0.06, b.mat("darkwood"), true, 0.6);
      b.rbox(0, leg, -0.01, W, H - leg - 0.025, D - 0.02, 0.004);
      b.rbox(0, H - 0.025, 0, W, 0.025, D, 0.004, b.mat("wood"));
      const n = Math.max(1, Math.round(W / 0.6));
      const pw = W / n;
      for (let i = 0; i < n; i++) {
        const x = -W / 2 + pw * (i + 0.5);
        b.rbox(x, leg + 0.004, D / 2 - 0.0095, pw - 0.006, H - leg - 0.033, 0.019, 0.002, b.accent(-0.04));
        b.handle(x, H - 0.07, D / 2, Math.min(0.14, pw * 0.35));
      }
    },
  },
  {
    id: "tv", label: "Fernseher", category: "Wohnzimmer", w: 120, d: 8, h: 72, z: 50, color: "#222222",
    build: (b) => {
      const { W, H } = b;
      const t = Math.min(b.D, 0.03);
      const foot = Math.min(0.06, H * 0.1);
      b.rbox(0, 0, 0, Math.min(W * 0.35, 0.4), 0.012, Math.max(b.D, 0.2), 0.006, b.mat("blackmetal"));
      b.box(0, 0.012, -0.01, 0.05, foot, 0.02, b.mat("blackmetal"));
      b.rbox(0, foot, -0.015, W * 0.5, (H - foot) * 0.5, 0.03, 0.01, b.mat("dark"));
      b.rbox(0, foot, 0, W, H - foot, t, 0.004);
      b.box(0, foot + 0.008, t / 2, W - 0.016, H - foot - 0.016, 0.002, b.mat("screen"));
    },
  },
  {
    id: "shelf", label: "Regal", category: "Wohnzimmer", w: 80, d: 35, h: 180, color: "#d9c3a0", grain: true,
    build: (b) => {
      const { W, D, H } = b;
      const t = 0.022;
      for (const sx of [-1, 1]) b.rbox(sx * (W / 2 - t / 2), 0, 0, t, H, D, 0.003);
      b.box(0, 0, -D / 2 + 0.005, W - 2 * t, H, 0.01, b.accent(-0.12));
      const n = Math.max(2, Math.round(H / 0.36));
      const step = (H - t) / n;
      const rnd = seeded(3);
      for (let i = 0; i <= n; i++) {
        const y = i * step;
        b.box(0, y, 0, W - 2 * t, t, D);
        if (i === n) continue;
        const room = step - t - 0.03;
        let x = -W / 2 + t + 0.01;
        const end = W / 2 - t - 0.01;
        const stackAt = rnd() > 0.5 ? end - 0.25 : Infinity;
        while (x < end - 0.03) {
          if (x > stackAt) {
            // A few books lying flat, or an ornament.
            if (rnd() > 0.5) {
              let yy = y + t;
              for (let k = 0; k < 3; k++) {
                const bh = 0.025 + rnd() * 0.015;
                b.box(x + 0.1, yy, 0.01, 0.17 - k * 0.015, bh, Math.min(D * 0.7, 0.22), b.mat(`book${Math.floor(rnd() * 6)}` as MatName));
                yy += bh;
              }
            } else {
              const r = Math.min(0.05, room * 0.25);
              b.lathe(x + 0.1, y + t, 0, [[0, 0], [r * 0.7, 0], [r, room * 0.25], [r * 0.9, room * 0.45], [r * 0.4, room * 0.55], [r * 0.45, room * 0.6], [0, room * 0.6]], b.mat("ceramic"));
            }
            break;
          }
          const bw = 0.018 + rnd() * 0.03;
          const bh = Math.max(0.05, Math.min(room, 0.17 + rnd() * 0.12));
          const bd = Math.min(D - 0.03, 0.15 + rnd() * 0.08);
          const book = b.box(x + bw / 2, y + t, D / 2 - bd / 2 - 0.01, bw, bh, bd, b.mat(`book${Math.floor(rnd() * 6)}` as MatName));
          x += bw + 0.002;
          if (book && rnd() > 0.9 && x < end - 0.15) {
            // A leaning book at the end of a row.
            book.rotation.z = -0.25;
            book.position.x += 0.03;
            book.position.y -= 0.005;
            x += 0.12;
          }
          if (rnd() > 0.88) x += 0.06 + rnd() * 0.1;
        }
      }
    },
  },
  {
    id: "plant", label: "Pflanze", category: "Wohnzimmer", w: 50, d: 50, h: 110, color: "#3f7d33", round: true,
    build: (b) => {
      const { W, D, H } = b;
      const potH = Math.min(H * 0.3, 0.4);
      const pr = 0.3;
      // Pot and leaves are built in a unit circle and then scaled to the footprint.
      const g = new THREE.Group();
      g.scale.set(W, 1, D);
      b.group.add(g);
      b.add(new THREE.LatheGeometry([[0, 0], [pr * 0.72, 0], [pr * 0.78, 0.01], [pr * 0.98, potH * 0.92], [pr * 1.02, potH * 0.93], [pr * 1.02, potH], [pr * 0.93, potH], [pr * 0.92, potH * 0.85], [0, potH * 0.85]].map(([r, y]) => new THREE.Vector2(r, y)), 32), b.mat("pot"), 0, 0, 0, g);
      const soil = new THREE.CircleGeometry(pr * 0.92, 28);
      soil.rotateX(-Math.PI / 2);
      b.add(soil, b.mat("soil"), 0, potH * 0.87, 0, g);
      const top = H - potH;
      const rnd = seeded(7);
      const mats = [b.main, b.mat("green2"), b.mat("green3")];
      const n = 30;
      for (let i = 0; i < n; i++) {
        const t = i / n;
        const az = i * 2.4 + rnd() * 0.4;
        const len = 0.5 * (0.55 + 0.45 * (1 - Math.abs(t - 0.35)));
        const base = potH * 0.9 + top * (0.05 + 0.55 * t);
        const elev = 0.25 + 0.7 * t + rnd() * 0.2;
        const pivot = new THREE.Group();
        pivot.position.set(0, base, 0);
        pivot.rotation.y = az;
        g.add(pivot);
        // Stem from the soil up to the leaf.
        const stemH = base - potH * 0.87;
        const reach = len * 0.25;
        const stem = new THREE.CylinderGeometry(0.004, 0.006, Math.hypot(stemH, reach), 5);
        stem.translate(0, Math.hypot(stemH, reach) / 2, 0);
        const sm = b.add(stem, b.mat("green3"), 0, -stemH, 0, pivot);
        sm.rotation.z = -Math.atan2(reach, stemH);
        const leaf = b.add(leafGeo(len * 0.75, len * 0.4, 0.3 + rnd() * 0.3), mats[i % 3], reach, 0, 0, pivot);
        leaf.rotation.z = Math.min(1.2, elev) * (t > 0.85 ? 1.1 : 0.8);
        leaf.rotation.x = (rnd() - 0.5) * 0.6;
      }
      // Leaves should end near the given height.
      const box = new THREE.Box3().setFromObject(g);
      const over = box.max.y - H;
      if (over > 0.01) {
        const s = (H - potH) / (H - potH + over);
        for (const c of g.children) if (c.type === "Group") c.scale.set(1, s, 1);
      }
    },
  },
  {
    id: "rug", label: "Teppich", category: "Wohnzimmer", w: 200, d: 140, h: 1, color: "#b5654a", fabric: true,
    build: (b) => {
      const h = Math.max(b.H, 0.006);
      b.rbox(0, 0, 0, b.W, h, b.D, 0.004);
      b.box(0, 0.0005, 0, b.W - 0.12, h, b.D - 0.12, b.accent(0.12));
      b.box(0, 0.001, 0, b.W - 0.18, h, b.D - 0.18);
    },
  },

  // Lights
  {
    id: "floor_lamp", label: "Stehlampe", category: "Leuchten", w: 40, d: 40, h: 170, color: "#2d2d2d", round: true,
    build: (b) => {
      const r = Math.min(b.W, b.D) / 2;
      b.lathe(0, 0, 0, [[0, 0], [r * 0.62, 0], [r * 0.65, 0.008], [r * 0.6, 0.025], [0.02, 0.035], [0, 0.035]], b.main);
      b.cyl(0, 0.03, 0, 0.011, 0.011, b.H - 0.3, b.mat("metal"));
      lampShade(b, b.H - 0.34, 0.34, r, 0.75);
    },
  },
  {
    id: "table_lamp", label: "Tischleuchte", category: "Leuchten", w: 30, d: 30, h: 45, z: 50, color: "#c7b299", round: true,
    build: (b) => {
      const r = Math.min(b.W, b.D) / 2;
      const bh = b.H * 0.52;
      b.lathe(0, 0, 0, [[0, 0], [r * 0.35, 0], [r * 0.5, bh * 0.25], [r * 0.55, bh * 0.5], [r * 0.4, bh * 0.85], [r * 0.15, bh * 0.95], [r * 0.15, bh], [0, bh]].map(([x, y]) => [x * 1.005, y * 1.002] as [number, number]), b.main);
      b.cyl(0, bh, 0, 0.008, 0.008, b.H * 0.12, b.mat("metal"));
      lampShade(b, b.H * 0.55, b.H * 0.45, r, 0.7);
    },
  },
  {
    id: "ceiling_lamp", label: "Deckenleuchte", category: "Leuchten", w: 50, d: 50, h: 12, z: 238, color: "#ffffff", round: true,
    build: (b) => {
      const { W, D, H } = b;
      b.cyl(0, H * 0.78, 0, W / 2, D / 2, H * 0.22, b.main, 1, 40);
      b.ring(0, H * 0.78, 0, W / 2 - 0.005, 0.005, b.mat("metal"), false, 1, D / W);
      const geo = new THREE.SphereGeometry(1, 40, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
      geo.scale(W / 2 - 0.012, H * 0.78, D / 2 - 0.012);
      b.add(geo, b.mat("shade"), 0, H * 0.78, 0);
    },
  },
  {
    id: "pendant_lamp", label: "Pendelleuchte", category: "Leuchten", w: 40, d: 40, h: 90, z: 160, color: "#2d2d2d", round: true,
    build: (b) => {
      const r = Math.min(b.W, b.D) / 2;
      const sh = Math.min(0.28, b.H * 0.4);
      b.cyl(0, b.H - 0.025, 0, 0.055, 0.055, 0.025, b.main);
      b.cyl(0, sh, 0, 0.003, 0.003, b.H - sh - 0.025, b.mat("dark"));
      // Dome shade with a thin wall: outer surface up, inner surface back down.
      b.lathe(0, 0, 0, [[r, 0], [r * 0.93, sh * 0.35], [r * 0.6, sh * 0.8], [0.04, sh], [0.035, sh - 0.005], [r * 0.59, sh * 0.8 - 0.005], [r * 0.92, sh * 0.35 - 0.003], [r - 0.006, 0], [r, 0]], b.main);
      b.ball(0, sh * 0.6, 0, 0.04, 0.05, 0.04, b.mat("bulb"));
      b.ring(0, 0.001, 0, r - 0.003, 0.003, b.mat("metal"));
    },
  },

  // Kitchen & dining
  { id: "dining_table", label: "Esstisch", category: "Küche & Essen", w: 160, d: 90, h: 75, color: "#a47a52", grain: true, build: (b) => tableTop(b) },
  {
    id: "round_table", label: "Runder Tisch", category: "Küche & Essen", w: 100, d: 100, h: 75, color: "#a47a52", round: true, grain: true,
    build: (b) => {
      const { W, D, H } = b;
      b.cyl(0, H - 0.035, 0, W / 2, D / 2, 0.035, b.main, 1, 48);
      const col = Math.min(W, D) * 0.07;
      b.lathe(0, 0, 0, [[0, 0], [col * 3.6, 0], [col * 3.5, 0.02], [col * 1.6, 0.06], [col, 0.16], [col * 0.9, H * 0.6], [col * 1.4, H - 0.06], [col * 2.6, H - 0.035], [0, H - 0.035]], b.main);
    },
  },
  { id: "chair", label: "Stuhl", category: "Küche & Essen", w: 45, d: 50, h: 90, color: "#a47a52", grain: true, build: (b) => chairLike(b) },
  { id: "kitchen_base", label: "Küchenzeile (Unterschrank)", category: "Küche & Essen", w: 120, d: 60, h: 90, color: "#f2f1ee", build: (b) => kitchenBase(b) },
  {
    id: "kitchen_wall", label: "Hängeschrank", category: "Küche & Essen", w: 120, d: 35, h: 70, z: 145, color: "#f2f1ee",
    build: (b) => cabinet(b, 0, "bottom"),
  },
  {
    id: "kitchen_sink", label: "Spüle", category: "Küche & Essen", w: 80, d: 60, h: 90, color: "#f2f1ee",
    build: (b) => {
      const { W, D, H } = b;
      const bw = Math.min(W - 0.16, 0.5);
      const bd = Math.min(D - 0.2, 0.4);
      const bz = 0.04;
      const { y0, top } = kitchenCarcass(b, { w: bw + 0.01, d: bd + 0.01, z: bz, depth: 0.22 });
      fronts(b, y0, top, [1], "top");
      // Worktop with a cut-out, a stainless basin below it and a curved tap.
      rim(b, 0, top, 0.01, W, D + 0.02, 0.003, bw, bd, 0.03, 0.04, b.mat("stone"), bz - 0.01);
      rim(b, 0, top - 0.18, bz, bw + 0.004, bd + 0.004, 0.03, bw - 0.004, bd - 0.004, 0.028, 0.21, b.mat("steel"));
      b.rbox(0, top - 0.185, bz, bw, 0.01, bd, 0.004, b.mat("steel"));
      b.cyl(0, top - 0.175, bz, 0.025, 0.025, 0.002, b.mat("blackmetal"));
      const tz = -D / 2 + 0.07;
      b.cyl(0, H, tz, 0.022, 0.022, 0.05, b.mat("metal"));
      b.cyl(0, H + 0.05, tz, 0.012, 0.012, 0.22, b.mat("metal"));
      const arc = new THREE.TorusGeometry(0.07, 0.012, 10, 24, Math.PI);
      arc.rotateY(Math.PI / 2);
      b.add(arc, b.mat("metal"), 0, H + 0.27, tz + 0.07);
      b.cyl(0, H + 0.2, tz + 0.14, 0.012, 0.012, 0.07, b.mat("metal"));
      b.cyl(0.035, H + 0.12, tz, 0.006, 0.006, 0.07, b.mat("metal"))?.rotateZ(-1.2);
    },
  },
  {
    id: "stove", label: "Herd", category: "Küche & Essen", w: 60, d: 60, h: 90, color: "#f2f1ee",
    build: (b) => {
      const { W, D, H } = b;
      const { y0, top } = kitchenCarcass(b);
      const panel = 0.1;
      // Oven: front with a large window and a handle bar, control strip with knobs.
      b.rbox(0, y0 + 0.003, D / 2 - 0.0095, W - 0.006, top - y0 - panel - 0.006, 0.019, 0.002, b.mat("blackmetal"));
      b.rbox(0, y0 + 0.07, D / 2 + 0.001, W - 0.12, top - y0 - panel - 0.2, 0.002, 0.01, b.mat("tinted"));
      b.handle(0, top - panel - 0.05, D / 2, W - 0.12);
      b.box(0, top - panel, D / 2 - 0.0095, W - 0.006, panel - 0.003, 0.019, b.mat("blackmetal"));
      for (let i = 0; i < 4; i++) {
        const knob = new THREE.CylinderGeometry(0.016, 0.018, 0.022, 20);
        knob.rotateX(Math.PI / 2);
        b.add(knob, b.mat("metal"), -W / 2 + (W / 5) * (i + (i >= 2 ? 2 : 1)), top - panel / 2, D / 2 + 0.01);
      }
      b.box(0, top - panel / 2 - 0.012, D / 2 + 0.0005, 0.07, 0.024, 0.002, b.mat("screen"));
      // Glass-ceramic hob in the worktop.
      b.rbox(0, top, 0.01, W, 0.04, D + 0.02, 0.003, b.mat("stone"));
      b.rbox(0, top + 0.04, 0.0, W - 0.04, 0.006, D - 0.06, 0.003, b.mat("hobglass"));
      const hz = [-1, 1].map((s) => s * (D - 0.06) * 0.22);
      const hx = [-1, 1].map((s) => s * (W - 0.04) * 0.24);
      hx.forEach((x, i) => hz.forEach((z, j) => b.ring(x, top + 0.0465, z, (i + j) % 2 ? 0.06 : 0.085, 0.0018, b.mat("basin"))));
    },
  },
  {
    id: "fridge", label: "Kühlschrank", category: "Küche & Essen", w: 60, d: 65, h: 185, color: "#f2f1ee",
    build: (b) => {
      const { W, D, H } = b;
      b.box(0, 0, -0.02, W - 0.04, 0.03, D - 0.08, b.mat("dark"));
      b.rbox(0, 0.02, -0.02, W, H - 0.02, D - 0.04, 0.015);
      const split = H * 0.6;
      b.rbox(0, 0.03, D / 2 - 0.025, W - 0.004, split - 0.035, 0.05, 0.015);
      b.rbox(0, split + 0.005, D / 2 - 0.025, W - 0.004, H - split - 0.005, 0.05, 0.015);
      b.handle(W / 2 - 0.05, split - 0.25, D / 2, 0.3, true);
      b.handle(W / 2 - 0.05, split + 0.2, D / 2, 0.25, true);
    },
  },

  // Bedroom
  { id: "bed_double", label: "Doppelbett", category: "Schlafzimmer", w: 180, d: 210, h: 90, color: "#8d7a66", fabric: true, build: (b) => bed(b, 2) },
  { id: "bed_single", label: "Einzelbett", category: "Schlafzimmer", w: 90, d: 200, h: 90, color: "#8d7a66", fabric: true, build: (b) => bed(b, 1) },
  { id: "nightstand", label: "Nachttisch", category: "Schlafzimmer", w: 45, d: 40, h: 50, color: "#e9e6df", build: (b) => drawers(b, 2) },
  { id: "wardrobe", label: "Kleiderschrank", category: "Schlafzimmer", w: 150, d: 60, h: 220, color: "#e9e6df", build: (b) => cabinet(b, 0.06, "side") },
  { id: "dresser", label: "Kommode", category: "Schlafzimmer", w: 100, d: 45, h: 85, color: "#e9e6df", build: (b) => drawers(b, 3) },

  // Bathroom
  {
    id: "bathtub", label: "Badewanne", category: "Bad", w: 170, d: 75, h: 58, color: "#fbfbfb",
    build: (b) => {
      const { W, D, H } = b;
      const t = 0.07;
      const iw = W - 2 * t;
      const id = D - 2 * t;
      const floor = Math.min(0.12, H * 0.2);
      // Apron with an oval opening, and the bath itself narrowing towards the bottom.
      rim(b, 0, 0, 0, W, D, 0.05, iw, id, 0, H, b.main, 0, true);
      const deep = H - floor;
      b.lathe(0, floor, 0, [[0.5, deep], [0.48, deep * 0.6], [0.42, deep * 0.2], [0.32, 0.01], [0, 0]], b.mat("ceramic"), iw, id);
      b.ring(-iw / 2 + 0.16, floor + 0.004, 0, 0.022, 0.004, b.mat("metal"));
      // Spout on the rim at the head end, curving towards the bath.
      const sp = new THREE.TorusGeometry(0.05, 0.012, 10, 20, Math.PI / 2);
      b.cyl(-W / 2 + t / 2, H, 0, 0.018, 0.018, 0.06, b.mat("metal"));
      b.add(sp, b.mat("metal"), -W / 2 + t / 2 + 0.05, H + 0.06, 0).rotation.z = Math.PI / 2;
    },
  },
  {
    id: "shower", label: "Dusche", category: "Bad", w: 90, d: 90, h: 200, color: "#fbfbfb",
    build: (b) => {
      const { W, D, H } = b;
      const tray = 0.05;
      b.rbox(0, 0, 0, W, tray, D, 0.01);
      b.cyl(0, tray, 0, 0.04, 0.04, 0.002, b.mat("metal"));
      const m = b.mat("metal");
      // Two glass walls in thin metal profiles.
      b.box(0, tray, D / 2 - 0.01, W, H - tray, 0.008, b.mat("glass"));
      b.box(W / 2 - 0.01, tray, 0, 0.008, H - tray, D - 0.02, b.mat("glass"));
      b.box(0, H - 0.015, D / 2 - 0.01, W, 0.015, 0.02, m);
      b.box(W / 2 - 0.01, H - 0.015, 0, 0.02, 0.015, D, m);
      b.box(-W / 2 + 0.01, tray, D / 2 - 0.01, 0.02, H - tray, 0.02, m);
      b.box(W / 2 - 0.01, tray, -D / 2 + 0.01, 0.02, H - tray, 0.02, m);
      b.box(W / 2 - 0.01, tray, D / 2 - 0.01, 0.02, H - tray, 0.02, m);
      // Rain shower head, riser and a thermostat bar.
      const x = 0;
      b.cyl(x, 1.0, -D / 2 + 0.035, 0.012, 0.012, H - 0.15 - 1.0, m);
      const arm = new THREE.CylinderGeometry(0.01, 0.01, 0.25, 10);
      arm.rotateX(Math.PI / 2);
      b.add(arm, m, x, H - 0.15, -D / 2 + 0.035 + 0.125);
      b.cyl(x, H - 0.17, -D / 2 + 0.3, 0.12, 0.12, 0.012, m, 1, 40);
      b.rbox(x, 0.95, -D / 2 + 0.03, 0.3, 0.05, 0.05, 0.02, m);
      for (const s of [-1, 1]) {
        const k = new THREE.CylinderGeometry(0.022, 0.022, 0.03, 20);
        k.rotateZ(Math.PI / 2);
        b.add(k, m, x + s * 0.165, 0.975, -D / 2 + 0.03);
      }
    },
  },
  {
    id: "toilet", label: "WC", category: "Bad", w: 40, d: 65, h: 80, color: "#fbfbfb",
    build: (b) => {
      const { W, D, H } = b;
      const seat = Math.min(0.42, H * 0.53);
      const bowlD = D * 0.75;
      const bz = D / 2 - bowlD / 2;
      // Wall-mounted tank, bowl, seat ring and lid.
      b.rbox(0, seat - 0.02, -D / 2 + 0.09, W * 0.95, H - seat + 0.02, 0.17, 0.03);
      b.rbox(0, H - 0.17, -D / 2 + 0.177, 0.18, 0.12, 0.006, 0.004, b.mat("metal"));
      b.lathe(0, 0, bz, [[0, 0], [0.22, 0], [0.25, 0.04], [0.3, seat * 0.55], [0.45, seat * 0.85], [0.5, seat - 0.035], [0.47, seat - 0.03], [0.32, seat - 0.08], [0.15, seat * 0.5], [0, seat * 0.5]], b.main, W, bowlD);
      const ringG = new THREE.TorusGeometry(0.41, 0.07, 12, 40);
      ringG.rotateX(Math.PI / 2);
      ringG.scale(W * 0.98, 0.2, bowlD * 0.98);
      b.add(ringG, b.mat("white"), 0, seat - 0.02, bz);
      const lid = b.lathe(0, 0, 0, [[0, 0.025], [0.42, 0.022], [0.5, 0.012], [0.5, 0], [0, 0]].map(([r, y]) => [r, y] as [number, number]), b.mat("white"), W * 0.98, bowlD * 0.98);
      lid.position.set(0, seat - 0.005, -D / 2 + 0.2);
      lid.geometry.translate(0, 0, bowlD * 0.49);
      lid.rotation.x = -1.35;
    },
  },
  {
    id: "washbasin", label: "Waschtisch", category: "Bad", w: 60, d: 45, h: 85, color: "#a47a52", grain: true,
    build: (b) => {
      const { W, D, H } = b;
      const topT = 0.03;
      const base = Math.max(0.15, H * 0.35);
      // Wall-hung vanity with a drawer, a ceramic top with a sunk basin and a tap.
      const bw = W * 0.7;
      const bd = D * 0.6;
      const bz = 0.03;
      const bowl = Math.min(0.13, (H - topT - base) * 0.6);
      const cut = H - topT - bowl - 0.01;
      b.rbox(0, base, -0.01, W, cut - base, D - 0.02, 0.004);
      rim(b, 0, cut - 0.004, -0.01, W, D - 0.02, 0.004, bw, bd, 0, H - topT - cut + 0.004, b.main, bz + 0.01, true);
      b.rbox(0, base + 0.004, D / 2 - 0.012, W - 0.01, H - topT - base - 0.008, 0.02, 0.003, b.accent(0.06));
      b.box(0, H - topT - 0.035, D / 2 + 0.0, W * 0.5, 0.012, 0.004, b.mat("darkwood"));
      rim(b, 0, H - topT, 0, W + 0.01, D + 0.01, 0.01, bw, bd, 0, topT, b.mat("ceramic"), bz, true);
      b.lathe(0, H - bowl - topT, bz, [[0.5, bowl + topT], [0.497, bowl * 0.7], [0.45, bowl * 0.35], [0.32, 0.005], [0, 0]], b.mat("ceramic"), bw, bd);
      b.cyl(0, H - bowl - topT + 0.004, bz, 0.018, 0.018, 0.002, b.mat("metal"));
      const tz = -D / 2 + 0.05;
      b.cyl(0, H, tz, 0.02, 0.02, 0.14, b.mat("metal"));
      const spout = new THREE.CylinderGeometry(0.01, 0.012, 0.11, 12);
      spout.rotateX(Math.PI / 2);
      b.add(spout, b.mat("metal"), 0, H + 0.125, tz + 0.06);
      b.cyl(0, H + 0.14, tz - 0.005, 0.007, 0.007, 0.06, b.mat("metal"))?.rotateX(-0.6);
    },
  },
  {
    id: "washer", label: "Waschmaschine", category: "Bad", w: 60, d: 60, h: 85, color: "#f6f6f4",
    build: (b) => {
      const { W, D, H } = b;
      b.rbox(0, 0, 0, W, H, D, 0.015);
      const r = Math.min(W, H) * 0.27;
      const cy = H * 0.42;
      b.ring(0, cy, D / 2 + 0.012, r + 0.02, 0.022, b.mat("metal"), true);
      b.ring(0, cy, D / 2 + 0.02, r, 0.015, b.mat("blackmetal"), true);
      const glass = new THREE.CylinderGeometry(r, r, 0.006, 40);
      glass.rotateX(Math.PI / 2);
      b.add(glass, b.mat("tinted"), 0, cy, D / 2 + 0.02);
      b.handle(r + 0.03, cy, D / 2 + 0.012, 0.08, true, b.mat("blackmetal"));
      // Control strip with a drawer, a display and a knob.
      b.box(0, H - 0.13, D / 2 - 0.001, W - 0.03, 0.002, 0.003, b.mat("basin"));
      b.rbox(-W / 2 + 0.11, H - 0.1, D / 2 - 0.004, 0.16, 0.07, 0.01, 0.004, b.mat("white"));
      b.rbox(0.03, H - 0.085, D / 2 + 0.0005, 0.12, 0.04, 0.002, 0.002, b.mat("screen"));
      const knob = new THREE.CylinderGeometry(0.03, 0.03, 0.025, 28);
      knob.rotateX(Math.PI / 2);
      b.add(knob, b.mat("metal"), W / 2 - 0.08, H - 0.065, D / 2 + 0.012);
    },
  },

  // Office
  {
    id: "desk", label: "Schreibtisch", category: "Büro", w: 140, d: 70, h: 75, color: "#e9e6df",
    build: (b) => {
      const { W, D, H } = b;
      const m = b.mat("blackmetal");
      b.rbox(0, H - 0.025, 0, W, 0.025, D, 0.004);
      // Two closed steel frames and a cross rail.
      for (const sx of [-1, 1]) {
        const x = sx * (W / 2 - 0.08);
        b.box(x, H - 0.05, 0, 0.03, 0.025, D - 0.08, m);
        b.box(x, 0, 0, 0.03, 0.02, D - 0.08, m);
        for (const sz of [-1, 1]) b.box(x, 0, sz * (D / 2 - 0.055), 0.03, H - 0.05, 0.03, m);
      }
      b.box(0, H - 0.05, -D / 2 + 0.055, W - 0.16, 0.025, 0.02, m);
    },
  },
  {
    id: "office_chair", label: "Bürostuhl", category: "Büro", w: 60, d: 60, h: 110, color: "#33373d", fabric: true,
    build: (b) => {
      const { W, D, H } = b;
      const m = b.mat("blackmetal");
      const r = Math.min(W, D) / 2 - 0.035;
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2 + Math.PI / 2;
        const geo = new RoundedBoxGeometry(r, 0.035, 0.045, 2, 0.012);
        geo.translate(r / 2, 0, 0);
        geo.rotateZ(0.08);
        geo.rotateY(a);
        b.add(geo, m, 0, 0.08, 0);
        const cx = Math.cos(a) * r;
        const cz = -Math.sin(a) * r;
        const wheel = new THREE.CylinderGeometry(0.03, 0.03, 0.035, 16);
        wheel.rotateZ(Math.PI / 2);
        wheel.rotateY(a);
        b.add(wheel, b.mat("rubber"), cx, 0.03, cz);
      }
      b.cyl(0, 0.09, 0, 0.03, 0.03, 0.12, m);
      b.cyl(0, 0.2, 0, 0.018, 0.018, 0.2, b.mat("metal"));
      const seatY = Math.min(0.46, H * 0.42);
      b.box(0, seatY - 0.04, 0, 0.16, 0.03, 0.2, m);
      b.rbox(0, seatY - 0.02, 0.03, W * 0.82, 0.08, D * 0.78, 0.035);
      // Back on a curved support, and armrests.
      b.box(0, seatY - 0.03, -D * 0.3, 0.06, 0.02, 0.2, m);
      b.box(0, seatY - 0.03, -D * 0.4, 0.06, 0.2, 0.025, m);
      const back = b.rbox(0, 0, 0, W * 0.74, Math.max(0.2, H - seatY - 0.12), 0.06, 0.03);
      if (back) {
        back.position.set(0, seatY + 0.1 + Math.max(0.2, H - seatY - 0.12) / 2, -D * 0.4);
        back.rotation.x = -0.1;
      }
      for (const sx of [-1, 1]) {
        const x = sx * (W * 0.41 + 0.0);
        b.box(x, seatY - 0.02, -0.02, 0.025, 0.22, 0.04, m);
        b.rbox(x, seatY + 0.2, 0.0, 0.06, 0.03, 0.25, 0.012, b.mat("rubber"));
      }
    },
  },

  // Misc
  {
    id: "stairs", label: "Treppe", category: "Sonstiges", w: 100, d: 300, h: 270, color: "#b48a60", grain: true,
    build: (b) => {
      // Goes up towards the back (-z).
      const { W, D, H } = b;
      const n = Math.max(2, Math.round(H / 0.18));
      const rise = H / n;
      const run = D / n;
      const sw = 0.04;
      const white = b.mat("white");
      for (let i = 0; i < n; i++) {
        const z = D / 2 - run * (i + 0.5);
        b.rbox(0, rise * (i + 1) - 0.04, z + 0.01, W - 2 * sw, 0.04, run + 0.02, 0.006);
        b.box(0, rise * i, z + run / 2 - 0.01, W - 2 * sw, rise - 0.04, 0.015, white);
      }
      // Stringers along both sides, following the slope.
      const len = Math.hypot(D, H);
      const ang = Math.atan2(H, D);
      for (const sx of [-1, 1]) {
        const s = b.box(0, 0, 0, sw, 0.3, len, white);
        if (s) {
          s.position.set(sx * (W / 2 - sw / 2), H / 2 + 0.02, 0);
          s.rotation.x = ang;
        }
      }
      // Handrail on posts, right side.
      const m = b.mat("metal");
      const x = W / 2 - sw / 2;
      const posts = Math.max(2, Math.round(D / 0.9));
      for (let i = 0; i <= posts; i++) {
        const f = (i + 0.3) / (posts + 0.6);
        const z = D / 2 - f * D;
        b.cyl(x, f * H + 0.12, z, 0.012, 0.012, 0.8, m);
      }
      const rail = new THREE.CylinderGeometry(0.022, 0.022, len, 14);
      rail.rotateX(Math.PI / 2);
      const rm = b.add(rail, m, x, H / 2 + 0.92, 0);
      rm.rotation.x = ang;
    },
  },
  {
    id: "radiator", label: "Heizkörper", category: "Sonstiges", w: 100, d: 10, h: 60, z: 15, color: "#f4f4f2",
    build: (b) => {
      const { W, D, H } = b;
      // A panel radiator: profiled front, cover grille on top and a valve.
      b.rbox(0, 0, -D * 0.1, W, H, D * 0.6, 0.01);
      const n = Math.max(3, Math.round(W / 0.05));
      const step = W / n;
      for (let i = 0; i < n; i++) b.rbox(-W / 2 + step * (i + 0.5), 0.01, D * 0.2, step * 0.7, H - 0.04, D * 0.25, 0.008);
      b.rbox(0, H - 0.012, 0, W, 0.012, D, 0.004, b.accent(-0.05));
      b.cyl(W / 2 + 0.025, H * 0.3, 0, 0.018, 0.018, 0.08, b.main);
      b.cyl(W / 2 + 0.025, H * 0.3 + 0.08, 0, 0.025, 0.025, 0.06, b.mat("white"));
    },
  },
  {
    id: "car", label: "Auto", category: "Sonstiges", w: 180, d: 450, h: 150, color: "#2f5d8a",
    build: (b) => {
      const { W, D, H } = b;
      const wr = Math.min(0.33, H * 0.22);
      const clear = wr * 0.55;
      const beltY = clear + H * 0.38;
      // Lower body, glass house and roof, all rounded.
      b.rbox(0, clear, 0, W, beltY - clear, D - 0.02, 0.12);
      b.rbox(0, beltY - 0.05, -D * 0.06, W * 0.88, H - beltY + 0.0, D * 0.52, 0.12, b.mat("tinted"));
      b.rbox(0, H - 0.05, -D * 0.06, W * 0.86, 0.05, D * 0.46, 0.03);
      b.rbox(0, beltY - 0.06, D * 0.28, W * 0.96, 0.08, D * 0.36, 0.06);
      for (const sx of [-1, 1])
        for (const sz of [-1, 1]) {
          const x = sx * (W / 2 - 0.13);
          const z = sz * (D / 2 - 0.78);
          const tyre = new THREE.TorusGeometry(wr * 0.72, wr * 0.28, 14, 32);
          tyre.rotateY(Math.PI / 2);
          tyre.scale(1.6, 1, 1);
          b.add(tyre, b.mat("rubber"), x, wr, z);
          const rimG = new THREE.CylinderGeometry(wr * 0.62, wr * 0.62, 0.2, 28);
          rimG.rotateZ(Math.PI / 2);
          b.add(rimG, b.mat("metal"), x + sx * 0.01, wr, z);
        }
      for (const sx of [-1, 1]) {
        b.rbox(sx * (W / 2 - 0.22), beltY - 0.17, D / 2 - 0.04, 0.3, 0.07, 0.04, 0.02, b.mat("lamp_front"));
        b.rbox(sx * (W / 2 - 0.2), beltY - 0.14, -D / 2 + 0.03, 0.3, 0.07, 0.03, 0.015, b.mat("lamp_rear"));
        b.rbox(sx * (W / 2 + 0.04), beltY + 0.05, D * 0.18, 0.1, 0.06, 0.12, 0.02);
      }
      b.rbox(0, clear + 0.08, D / 2 - 0.02, W * 0.4, 0.12, 0.03, 0.02, b.mat("dark"));
    },
  },
];

const BY_ID = new Map(CATALOG.map((c) => [c.id, c]));

export function catalogItem(id: string): CatalogItem | undefined {
  return BY_ID.get(id);
}

/** Build an item at the given size (cm) with the given main material. */
export function buildCatalogObject(type: string, wCm: number, dCm: number, hCm: number, main: THREE.MeshStandardMaterial): THREE.Group {
  const item = BY_ID.get(type) ?? BY_ID.get("box")!;
  if (item.grain && !main.map) {
    main.map = woodGrain();
    main.roughness = 0.55;
    main.needsUpdate = true;
  }
  if (item.fabric) main.roughness = 0.95;
  const b = new ObjectBuilder(Math.max(wCm, 1) / 100, Math.max(dCm, 1) / 100, Math.max(hCm, 0.5) / 100, main);
  item.build(b);
  return b.group;
}
