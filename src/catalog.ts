import * as THREE from "three";

// The object library: basic shapes and furniture, all assembled from simple primitives so the
// card needs no model files. Every builder works in the object's own frame, in metres: x across
// the width (-W/2..W/2), y up from the floor (0..H) and z through the depth with +z as the front.

type MatName =
  | "dark"
  | "metal"
  | "white"
  | "ceramic"
  | "wood"
  | "stone"
  | "glass"
  | "tinted"
  | "screen"
  | "green"
  | "green2"
  | "pot"
  | "soil"
  | "shade"
  | "basin"
  | "rubber"
  | "lamp_front"
  | "lamp_rear"
  | "hob"
  | "book0"
  | "book1"
  | "book2"
  | "book3";

const MATS: Record<MatName, THREE.MeshStandardMaterialParameters> = {
  dark: { color: 0x2d2d2d, roughness: 0.6 },
  metal: { color: 0xb9bdc3, roughness: 0.3, metalness: 0.7 },
  white: { color: 0xf3f3f1, roughness: 0.6 },
  ceramic: { color: 0xfbfbfb, roughness: 0.2 },
  wood: { color: 0xa47a52, roughness: 0.7 },
  stone: { color: 0x3c3d40, roughness: 0.35 },
  glass: { color: 0xcfeaff, roughness: 0.05, transparent: true, opacity: 0.28, depthWrite: false },
  tinted: { color: 0x1c2733, roughness: 0.1, metalness: 0.4 },
  screen: { color: 0x0b0e13, roughness: 0.2, metalness: 0.3 },
  green: { color: 0x3f7d33, roughness: 0.85 },
  green2: { color: 0x5c9e44, roughness: 0.85 },
  pot: { color: 0xb3653f, roughness: 0.8 },
  soil: { color: 0x3b2a1e, roughness: 1 },
  shade: { color: 0xfff6e2, roughness: 0.8, emissive: 0xffe2a8, emissiveIntensity: 0.35 },
  basin: { color: 0xdfe4e8, roughness: 0.15 },
  rubber: { color: 0x161616, roughness: 0.9 },
  lamp_front: { color: 0xffffff, emissive: 0xfff4d0, emissiveIntensity: 0.8 },
  lamp_rear: { color: 0xc01818, emissive: 0x900000, emissiveIntensity: 0.6 },
  hob: { color: 0x4a2a2a, roughness: 0.4 },
  book0: { color: 0x8a2f2f, roughness: 0.8 },
  book1: { color: 0x2f4f8a, roughness: 0.8 },
  book2: { color: 0x3d7a4a, roughness: 0.8 },
  book3: { color: 0xc9a227, roughness: 0.8 },
};

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
      m = new THREE.MeshStandardMaterial(MATS[name]);
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

  add(geo: THREE.BufferGeometry, m: THREE.Material, x: number, y: number, z: number): THREE.Mesh {
    if ((m as THREE.MeshStandardMaterial).map) geo = boxUV(geo);
    const mesh = new THREE.Mesh(geo, m);
    mesh.position.set(x, y, z);
    this.group.add(mesh);
    return mesh;
  }

  /** Box centred on x/z, standing on y0. */
  box(cx: number, y0: number, cz: number, sx: number, sy: number, sz: number, m: THREE.Material = this.main): void {
    if (sx <= 0 || sy <= 0 || sz <= 0) return;
    this.add(new THREE.BoxGeometry(sx, sy, sz), m, cx, y0 + sy / 2, cz);
  }

  /** Elliptic cylinder standing on y0; `top` scales the upper radius (0 = cone). */
  cyl(cx: number, y0: number, cz: number, rx: number, rz: number, h: number, m: THREE.Material = this.main, top = 1, seg = 28): void {
    if (h <= 0) return;
    const geo = new THREE.CylinderGeometry(top, 1, 1, seg);
    geo.scale(rx, h, rz);
    this.add(geo, m, cx, y0 + h / 2, cz);
  }

  ball(cx: number, cy: number, cz: number, rx: number, ry: number, rz: number, m: THREE.Material = this.main): void {
    const geo = new THREE.SphereGeometry(1, 24, 16);
    geo.scale(rx, ry, rz);
    this.add(geo, m, cx, cy, cz);
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
  build(b: ObjectBuilder): void;
}

// ------------------------------------------------------------------ shared builders

function sofaLike(b: ObjectBuilder, seats: number): void {
  const { W, D, H } = b;
  const leg = 0.07;
  const arm = Math.min(0.2, W * 0.14);
  const seatTop = Math.min(0.45, H * 0.55);
  const backD = Math.min(0.22, D * 0.25);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.cyl(sx * (W / 2 - 0.07), 0, sz * (D / 2 - 0.07), 0.025, 0.025, leg, b.mat("dark"));
  b.box(0, leg, 0, W, seatTop - leg - 0.12, D);
  b.box(0, leg, -D / 2 + backD / 2, W, H - leg, backD);
  const armTop = Math.min(H * 0.78, seatTop + 0.2);
  for (const sx of [-1, 1]) b.box(sx * (W / 2 - arm / 2), leg, 0, arm, armTop - leg, D);
  const iw = W - 2 * arm;
  const cw = iw / seats;
  for (let i = 0; i < seats; i++) {
    const x = -iw / 2 + cw * (i + 0.5);
    b.box(x, seatTop - 0.12, backD / 2, cw - 0.02, 0.14, D - backD - 0.02, b.accent());
    b.box(x, seatTop + 0.02, -D / 2 + backD + 0.06, cw - 0.03, (H - seatTop) * 0.8, 0.12, b.accent());
  }
}

function legs(b: ObjectBuilder, h: number, size: number, inset: number, m: THREE.Material): void {
  const { W, D } = b;
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.box(sx * (W / 2 - inset - size / 2), 0, sz * (D / 2 - inset - size / 2), size, h, size, m);
}

function tableTop(b: ObjectBuilder, m: THREE.Material = b.main): void {
  const { W, D, H } = b;
  b.box(0, H - 0.04, 0, W, 0.04, D, m);
  legs(b, H - 0.04, 0.05, 0.04, m);
}

function bed(b: ObjectBuilder, pillows: number): void {
  const { W, D, H } = b;
  const leg = 0.08;
  const frameTop = Math.min(0.32, H * 0.4);
  const mattressTop = Math.min(0.52, H * 0.62);
  const head = 0.07;
  legs(b, leg, 0.06, 0.03, b.mat("dark"));
  b.box(0, leg, 0, W, frameTop - leg, D);
  b.box(0, frameTop, head / 2, W - 0.06, mattressTop - frameTop, D - head - 0.04, b.mat("white"));
  b.box(0, leg, -D / 2 + head / 2, W, H - leg, head);
  const pw = (W - 0.16) / pillows;
  for (let i = 0; i < pillows; i++) {
    b.box(-(W - 0.16) / 2 + pw * (i + 0.5), mattressTop, -D / 2 + head + 0.24, pw - 0.06, 0.12, 0.36, b.mat("ceramic"));
  }
  b.box(0, mattressTop, D * 0.14, W - 0.03, 0.07, D * 0.66, b.accent(0.35));
}

function cabinet(b: ObjectBuilder, doors: number, y0: number, handle: "h" | "v" = "v"): void {
  const { W, D, H } = b;
  b.box(0, y0, -0.01, W, H - y0, D - 0.02);
  const dw = W / doors;
  for (let i = 0; i < doors; i++) {
    const x = -W / 2 + dw * (i + 0.5);
    b.box(x, y0 + 0.01, D / 2 - 0.01, dw - 0.006, H - y0 - 0.02, 0.02);
    if (handle === "v") {
      const side = doors === 1 ? 1 : i % 2 === 0 ? 1 : -1;
      const hh = Math.min(0.3, (H - y0) * 0.25);
      b.box(x + side * (dw / 2 - 0.05), y0 + (H - y0) / 2 - hh / 2, D / 2 + 0.012, 0.015, hh, 0.02, b.mat("metal"));
    } else {
      b.box(x, H - 0.08, D / 2 + 0.012, Math.min(0.2, dw * 0.5), 0.015, 0.02, b.mat("metal"));
    }
  }
}

function drawers(b: ObjectBuilder, n: number, y0: number): void {
  const { W, D, H } = b;
  b.box(0, y0, -0.01, W, H - y0, D - 0.02);
  const dh = (H - y0) / n;
  for (let i = 0; i < n; i++) {
    const y = y0 + dh * i;
    b.box(0, y + 0.006, D / 2 - 0.01, W - 0.02, dh - 0.012, 0.02, b.accent(0.08));
    b.box(0, y + dh / 2 - 0.008, D / 2 + 0.012, Math.min(0.18, W * 0.4), 0.016, 0.02, b.mat("metal"));
  }
}

function kitchenBase(b: ObjectBuilder, doors: number): void {
  const { W, D, H } = b;
  b.box(0, 0, -0.04, W, 0.1, D - 0.08, b.mat("dark"));
  b.box(0, 0.1, -0.01, W, H - 0.14, D - 0.02);
  const dw = W / doors;
  for (let i = 0; i < doors; i++) {
    const x = -W / 2 + dw * (i + 0.5);
    b.box(x, 0.11, D / 2 - 0.01, dw - 0.006, H - 0.16, 0.02);
    b.box(x, H - 0.13, D / 2 + 0.012, Math.min(0.25, dw * 0.5), 0.015, 0.02, b.mat("metal"));
  }
  b.box(0, H - 0.04, 0.01, W, 0.04, D + 0.02, b.mat("stone"));
}

function lampShade(b: ObjectBuilder, y0: number, h: number, r: number, top = 0.7): void {
  b.cyl(0, y0, 0, r, r, h, b.mat("shade"), top);
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
  { id: "sofa", label: "Sofa", category: "Wohnzimmer", w: 220, d: 95, h: 85, color: "#7b8794", build: (b) => sofaLike(b, b.W > 1.8 ? 3 : 2) },
  { id: "armchair", label: "Sessel", category: "Wohnzimmer", w: 90, d: 90, h: 85, color: "#7b8794", build: (b) => sofaLike(b, 1) },
  {
    id: "coffee_table", label: "Couchtisch", category: "Wohnzimmer", w: 110, d: 60, h: 42, color: "#a47a52",
    build: (b) => {
      b.box(0, b.H - 0.04, 0, b.W, 0.04, b.D);
      b.box(0, 0.1, 0, b.W - 0.1, 0.02, b.D - 0.1);
      legs(b, b.H - 0.04, 0.035, 0.03, b.mat("dark"));
    },
  },
  {
    id: "tv_board", label: "TV-Board", category: "Wohnzimmer", w: 180, d: 40, h: 50, color: "#e9e6df",
    build: (b) => {
      legs(b, 0.06, 0.04, 0.05, b.mat("dark"));
      b.box(0, 0.06, -0.01, b.W, b.H - 0.06, b.D - 0.02);
      const n = Math.max(1, Math.round(b.W / 0.6));
      const pw = b.W / n;
      for (let i = 0; i < n; i++) {
        const x = -b.W / 2 + pw * (i + 0.5);
        b.box(x, 0.07, b.D / 2 - 0.01, pw - 0.008, b.H - 0.08, 0.02, b.accent(-0.06));
        b.box(x, b.H - 0.07, b.D / 2 + 0.012, Math.min(0.16, pw * 0.4), 0.014, 0.02, b.mat("metal"));
      }
    },
  },
  {
    id: "tv", label: "Fernseher", category: "Wohnzimmer", w: 120, d: 8, h: 72, z: 50, color: "#222222",
    build: (b) => {
      const t = Math.min(b.D, 0.05);
      b.box(0, 0, 0, b.W * 0.3, 0.015, Math.max(b.D, 0.2), b.mat("dark"));
      b.box(0, 0.015, 0, 0.06, 0.06, 0.03, b.mat("dark"));
      b.box(0, 0.06, 0, b.W, b.H - 0.06, t);
      b.box(0, 0.075, t / 2 + 0.001, b.W - 0.03, b.H - 0.09, 0.002, b.mat("screen"));
    },
  },
  {
    id: "shelf", label: "Regal", category: "Wohnzimmer", w: 80, d: 35, h: 180, color: "#d9c3a0",
    build: (b) => {
      const { W, D, H } = b;
      for (const sx of [-1, 1]) b.box(sx * (W / 2 - 0.01), 0, 0, 0.02, H, D);
      b.box(0, 0, -D / 2 + 0.005, W, H, 0.01);
      const n = Math.max(2, Math.round(H / 0.36));
      const step = (H - 0.02) / n;
      let seed = 3;
      const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
      for (let i = 0; i <= n; i++) {
        const y = i * step;
        b.box(0, y, 0, W - 0.04, 0.02, D);
        if (i === n || i === 0) continue;
        // A few books on the shelves.
        let x = -W / 2 + 0.03;
        while (x < W / 2 - 0.08 && rnd() > 0.08) {
          const bw = 0.025 + rnd() * 0.025;
          const bh = Math.min(step - 0.04, 0.18 + rnd() * 0.1);
          b.box(x + bw / 2, y + 0.02, 0.02, bw, bh, D * 0.7, b.mat(`book${Math.floor(rnd() * 4)}` as MatName));
          x += bw + 0.003;
          if (rnd() > 0.85) x += 0.1;
        }
      }
    },
  },
  {
    id: "plant", label: "Pflanze", category: "Wohnzimmer", w: 50, d: 50, h: 110, color: "#3f7d33", round: true,
    build: (b) => {
      const { W, D, H } = b;
      const potH = H * 0.3;
      b.cyl(0, 0, 0, W * 0.28, D * 0.28, potH, b.mat("pot"), 1.2);
      b.cyl(0, potH - 0.01, 0, W * 0.31, D * 0.31, 0.012, b.mat("soil"));
      const top = H - potH;
      const blobs: [number, number, number, number, MatName | "main"][] = [
        [0, 0.55, 0, 0.42, "main"],
        [0.22, 0.4, 0.1, 0.3, "green2"],
        [-0.2, 0.42, -0.12, 0.3, "main"],
        [0.05, 0.78, -0.08, 0.28, "green2"],
        [-0.1, 0.3, 0.2, 0.26, "main"],
      ];
      for (const [x, y, z, r, m] of blobs) {
        b.ball(x * W, potH + y * top, z * D, r * W, r * top * 0.9, r * D, m === "main" ? b.main : b.mat(m));
      }
    },
  },
  { id: "rug", label: "Teppich", category: "Wohnzimmer", w: 200, d: 140, h: 1, color: "#b5654a", build: (b) => b.box(0, 0, 0, b.W, Math.max(b.H, 0.005), b.D) },

  // Lights
  {
    id: "floor_lamp", label: "Stehlampe", category: "Leuchten", w: 40, d: 40, h: 170, color: "#2d2d2d", round: true,
    build: (b) => {
      const r = Math.min(b.W, b.D) / 2;
      b.cyl(0, 0, 0, r * 0.7, r * 0.7, 0.03);
      b.cyl(0, 0.03, 0, 0.012, 0.012, b.H - 0.33, b.mat("metal"));
      lampShade(b, b.H - 0.32, 0.32, r);
    },
  },
  {
    id: "table_lamp", label: "Tischleuchte", category: "Leuchten", w: 30, d: 30, h: 45, z: 50, color: "#c7b299", round: true,
    build: (b) => {
      const r = Math.min(b.W, b.D) / 2;
      b.ball(0, b.H * 0.18, 0, r * 0.55, b.H * 0.18, r * 0.55);
      b.cyl(0, b.H * 0.3, 0, 0.01, 0.01, b.H * 0.3, b.mat("metal"));
      lampShade(b, b.H * 0.55, b.H * 0.45, r, 0.65);
    },
  },
  {
    id: "ceiling_lamp", label: "Deckenleuchte", category: "Leuchten", w: 50, d: 50, h: 12, z: 238, color: "#ffffff", round: true,
    build: (b) => {
      b.cyl(0, b.H * 0.75, 0, b.W / 2, b.D / 2, b.H * 0.25);
      const geo = new THREE.SphereGeometry(1, 32, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
      geo.scale(b.W / 2 - 0.01, b.H * 0.75, b.D / 2 - 0.01);
      b.add(geo, b.mat("shade"), 0, b.H * 0.75, 0);
    },
  },
  {
    id: "pendant_lamp", label: "Pendelleuchte", category: "Leuchten", w: 40, d: 40, h: 90, z: 160, color: "#2d2d2d", round: true,
    build: (b) => {
      const r = Math.min(b.W, b.D) / 2;
      b.cyl(0, 0.25, 0, 0.004, 0.004, b.H - 0.25, b.mat("dark"));
      b.cyl(0, 0, 0, r, r, 0.25, b.main, 0.25);
      b.cyl(0, 0.002, 0, r * 0.92, r * 0.92, 0.01, b.mat("shade"));
    },
  },

  // Kitchen & dining
  { id: "dining_table", label: "Esstisch", category: "Küche & Essen", w: 160, d: 90, h: 75, color: "#a47a52", build: (b) => tableTop(b) },
  {
    id: "round_table", label: "Runder Tisch", category: "Küche & Essen", w: 100, d: 100, h: 75, color: "#a47a52", round: true,
    build: (b) => {
      b.cyl(0, b.H - 0.04, 0, b.W / 2, b.D / 2, 0.04, b.main, 1, 40);
      b.cyl(0, 0.03, 0, 0.05, 0.05, b.H - 0.07, b.mat("dark"));
      b.cyl(0, 0, 0, b.W * 0.25, b.D * 0.25, 0.03, b.mat("dark"));
    },
  },
  {
    id: "chair", label: "Stuhl", category: "Küche & Essen", w: 45, d: 50, h: 90, color: "#a47a52",
    build: (b) => {
      const { W, D, H } = b;
      const seat = Math.min(0.46, H * 0.52);
      legs(b, seat - 0.04, 0.035, 0.02, b.main);
      b.box(0, seat - 0.04, 0, W, 0.04, D);
      for (const sx of [-1, 1]) b.box(sx * (W / 2 - 0.0375), seat, -D / 2 + 0.0375, 0.035, H - seat, 0.035);
      b.box(0, H - 0.22, -D / 2 + 0.03, W - 0.06, 0.18, 0.025);
    },
  },
  { id: "kitchen_base", label: "Küchenzeile (Unterschrank)", category: "Küche & Essen", w: 120, d: 60, h: 90, color: "#f2f1ee", build: (b) => kitchenBase(b, Math.max(1, Math.round(b.W / 0.6))) },
  {
    id: "kitchen_wall", label: "Hängeschrank", category: "Küche & Essen", w: 120, d: 35, h: 70, z: 145, color: "#f2f1ee",
    build: (b) => cabinet(b, Math.max(1, Math.round(b.W / 0.6)), 0, "h"),
  },
  {
    id: "kitchen_sink", label: "Spüle", category: "Küche & Essen", w: 80, d: 60, h: 90, color: "#f2f1ee",
    build: (b) => {
      kitchenBase(b, Math.max(1, Math.round(b.W / 0.6)));
      b.box(0, b.H, 0.04, b.W * 0.6, 0.004, b.D * 0.55, b.mat("metal"));
      b.cyl(0, b.H, -b.D / 2 + 0.08, 0.015, 0.015, 0.28, b.mat("metal"));
      b.box(0, b.H + 0.26, -b.D / 2 + 0.16, 0.025, 0.025, 0.18, b.mat("metal"));
    },
  },
  {
    id: "stove", label: "Herd", category: "Küche & Essen", w: 60, d: 60, h: 90, color: "#f2f1ee",
    build: (b) => {
      const { W, D, H } = b;
      b.box(0, 0, -0.04, W, 0.1, D - 0.08, b.mat("dark"));
      b.box(0, 0.1, -0.01, W, H - 0.13, D - 0.02);
      b.box(0, H - 0.03, 0, W, 0.03, D, b.mat("screen"));
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) b.cyl(sx * W * 0.22, H, sz * D * 0.22, 0.085, 0.085, 0.002, b.mat("hob"));
      b.box(0, 0.16, D / 2 - 0.005, W - 0.06, H - 0.36, 0.012, b.mat("tinted"));
      b.box(0, H - 0.17, D / 2 + 0.02, W - 0.14, 0.02, 0.02, b.mat("metal"));
    },
  },
  {
    id: "fridge", label: "Kühlschrank", category: "Küche & Essen", w: 60, d: 65, h: 185, color: "#f2f1ee",
    build: (b) => {
      const { W, D, H } = b;
      b.box(0, 0, -0.01, W, H, D - 0.02);
      const split = H * 0.62;
      b.box(0, 0.02, D / 2 - 0.01, W - 0.01, split - 0.03, 0.02);
      b.box(0, split + 0.01, D / 2 - 0.01, W - 0.01, H - split - 0.02, 0.02);
      b.box(W / 2 - 0.05, split - 0.4, D / 2 + 0.015, 0.02, 0.35, 0.025, b.mat("metal"));
      b.box(W / 2 - 0.05, split + 0.06, D / 2 + 0.015, 0.02, 0.25, 0.025, b.mat("metal"));
    },
  },

  // Bedroom
  { id: "bed_double", label: "Doppelbett", category: "Schlafzimmer", w: 180, d: 210, h: 90, color: "#8d7a66", build: (b) => bed(b, 2) },
  { id: "bed_single", label: "Einzelbett", category: "Schlafzimmer", w: 90, d: 200, h: 90, color: "#8d7a66", build: (b) => bed(b, 1) },
  { id: "nightstand", label: "Nachttisch", category: "Schlafzimmer", w: 45, d: 40, h: 50, color: "#e9e6df", build: (b) => drawers(b, 2, 0.04) },
  { id: "wardrobe", label: "Kleiderschrank", category: "Schlafzimmer", w: 150, d: 60, h: 220, color: "#e9e6df", build: (b) => cabinet(b, Math.max(1, Math.round(b.W / 0.5)), 0.04) },
  { id: "dresser", label: "Kommode", category: "Schlafzimmer", w: 100, d: 45, h: 85, color: "#e9e6df", build: (b) => drawers(b, 3, 0.06) },

  // Bathroom
  {
    id: "bathtub", label: "Badewanne", category: "Bad", w: 170, d: 75, h: 58, color: "#fbfbfb",
    build: (b) => {
      const { W, D, H } = b;
      const t = 0.07;
      for (const sz of [-1, 1]) b.box(0, 0, sz * (D / 2 - t / 2), W, H, t);
      for (const sx of [-1, 1]) b.box(sx * (W / 2 - t / 2), 0, 0, t, H, D - 2 * t);
      b.box(0, 0, 0, W - 2 * t, H * 0.25, D - 2 * t);
      b.cyl(-W / 2 + 0.035, H, 0, 0.015, 0.015, 0.12, b.mat("metal"));
      b.box(-W / 2 + 0.08, H + 0.1, 0, 0.1, 0.02, 0.025, b.mat("metal"));
    },
  },
  {
    id: "shower", label: "Dusche", category: "Bad", w: 90, d: 90, h: 200, color: "#fbfbfb",
    build: (b) => {
      const { W, D, H } = b;
      b.box(0, 0, 0, W, 0.06, D);
      b.box(0, 0.06, D / 2 - 0.005, W, H - 0.06, 0.01, b.mat("glass"));
      b.box(W / 2 - 0.005, 0.06, 0, 0.01, H - 0.06, D, b.mat("glass"));
      b.box(0, H - 0.02, D / 2 - 0.005, W, 0.02, 0.015, b.mat("metal"));
      b.box(W / 2 - 0.005, H - 0.02, 0, 0.015, 0.02, D, b.mat("metal"));
      b.cyl(-W / 2 + 0.06, 0.9, -D / 2 + 0.04, 0.012, 0.012, H - 1.0, b.mat("metal"));
      b.box(-W / 2 + 0.06, H - 0.12, -D / 2 + 0.1, 0.02, 0.02, 0.14, b.mat("metal"));
      b.cyl(-W / 2 + 0.06, H - 0.14, -D / 2 + 0.18, 0.1, 0.1, 0.015, b.mat("metal"));
    },
  },
  {
    id: "toilet", label: "WC", category: "Bad", w: 40, d: 65, h: 80, color: "#fbfbfb",
    build: (b) => {
      const { W, D, H } = b;
      b.box(0, 0.4, -D / 2 + 0.09, W, H - 0.4, 0.18);
      b.cyl(0, 0, 0.05, W * 0.25, D * 0.28, 0.33, b.main, 1.25);
      b.cyl(0, 0.33, D * 0.12, W * 0.5, D * 0.38, 0.07);
      b.cyl(0, 0.4, D * 0.12, W * 0.48, D * 0.36, 0.018, b.mat("white"));
    },
  },
  {
    id: "washbasin", label: "Waschtisch", category: "Bad", w: 60, d: 45, h: 85, color: "#a47a52",
    build: (b) => {
      const { W, D, H } = b;
      b.box(0, 0.3, -0.01, W, H - 0.42, D - 0.02);
      b.box(0, H - 0.12, 0.005, W + 0.01, 0.12, D + 0.01, b.mat("ceramic"));
      b.box(0, H, 0.03, W * 0.68, 0.004, D * 0.55, b.mat("basin"));
      b.cyl(0, H, -D / 2 + 0.06, 0.014, 0.014, 0.18, b.mat("metal"));
      b.box(0, H + 0.16, -D / 2 + 0.11, 0.022, 0.022, 0.1, b.mat("metal"));
    },
  },
  {
    id: "washer", label: "Waschmaschine", category: "Bad", w: 60, d: 60, h: 85, color: "#f6f6f4",
    build: (b) => {
      const { W, D, H } = b;
      b.box(0, 0, 0, W, H, D);
      const r = Math.min(W, H) * 0.28;
      const ring = new THREE.TorusGeometry(r, 0.025, 12, 40);
      b.add(ring, b.mat("metal"), 0, H * 0.42, D / 2 + 0.01);
      const glass = new THREE.CylinderGeometry(r, r, 0.01, 40);
      glass.rotateX(Math.PI / 2);
      b.add(glass, b.mat("tinted"), 0, H * 0.42, D / 2 + 0.006);
      b.box(0, H - 0.12, D / 2, W - 0.02, 0.1, 0.004, b.mat("basin"));
    },
  },

  // Office
  {
    id: "desk", label: "Schreibtisch", category: "Büro", w: 140, d: 70, h: 75, color: "#e9e6df",
    build: (b) => {
      const { W, D, H } = b;
      b.box(0, H - 0.03, 0, W, 0.03, D);
      for (const sx of [-1, 1]) {
        b.box(sx * (W / 2 - 0.05), 0, 0, 0.04, 0.03, D - 0.06, b.mat("dark"));
        b.box(sx * (W / 2 - 0.05), 0, 0, 0.04, H - 0.03, 0.04, b.mat("dark"));
      }
      b.box(0, H * 0.45, -D / 2 + 0.04, W - 0.14, H * 0.45, 0.015, b.mat("dark"));
    },
  },
  {
    id: "office_chair", label: "Bürostuhl", category: "Büro", w: 60, d: 60, h: 110, color: "#33373d",
    build: (b) => {
      const { W, D, H } = b;
      const r = Math.min(W, D) / 2 - 0.03;
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2;
        const geo = new THREE.BoxGeometry(r, 0.03, 0.04);
        geo.translate(r / 2, 0, 0);
        geo.rotateY(a);
        b.add(geo, b.mat("dark"), 0, 0.06, 0);
        b.ball(Math.cos(a) * r, 0.03, -Math.sin(a) * r, 0.03, 0.03, 0.03, b.mat("rubber"));
      }
      b.cyl(0, 0.06, 0, 0.025, 0.025, 0.36, b.mat("metal"));
      b.box(0, 0.42, 0.02, W * 0.82, 0.08, D * 0.78);
      b.box(0, 0.5, -D * 0.3, 0.05, 0.12, 0.04, b.mat("dark"));
      b.box(0, 0.58, -D * 0.36, W * 0.76, H - 0.6, 0.06);
    },
  },

  // Misc
  {
    id: "stairs", label: "Treppe", category: "Sonstiges", w: 100, d: 300, h: 270, color: "#b48a60",
    build: (b) => {
      // Goes up towards the back (-z).
      const n = Math.max(2, Math.round(b.H / 0.18));
      const rise = b.H / n;
      const tread = b.D / n;
      for (let i = 0; i < n; i++) b.box(0, 0, b.D / 2 - tread * (i + 0.5), b.W, rise * (i + 1), tread);
    },
  },
  {
    id: "radiator", label: "Heizkörper", category: "Sonstiges", w: 100, d: 10, h: 60, z: 15, color: "#f4f4f2",
    build: (b) => {
      const n = Math.max(3, Math.round(b.W / 0.05));
      const step = b.W / n;
      for (let i = 0; i < n; i++) b.box(-b.W / 2 + step * (i + 0.5), 0, 0, step * 0.6, b.H, b.D);
      b.box(0, 0.04, 0, b.W, 0.03, b.D * 0.5);
      b.box(0, b.H - 0.07, 0, b.W, 0.03, b.D * 0.5);
    },
  },
  {
    id: "car", label: "Auto", category: "Sonstiges", w: 180, d: 450, h: 150, color: "#2f5d8a",
    build: (b) => {
      const { W, D, H } = b;
      const wr = Math.min(0.33, H * 0.22);
      b.box(0, wr * 0.6, 0, W, H * 0.45, D - 0.04);
      b.box(0, wr * 0.6 + H * 0.45, -D * 0.06, W * 0.86, H * 0.5 - wr * 0.6, D * 0.5, b.mat("tinted"));
      b.box(0, H - 0.04, -D * 0.06, W * 0.86, 0.04, D * 0.48);
      for (const sx of [-1, 1])
        for (const sz of [-1, 1]) {
          const geo = new THREE.CylinderGeometry(wr, wr, 0.22, 24);
          geo.rotateZ(Math.PI / 2);
          b.add(geo, b.mat("rubber"), sx * (W / 2 - 0.12), wr, sz * (D / 2 - 0.75));
        }
      for (const sx of [-1, 1]) {
        b.box(sx * (W / 2 - 0.2), wr * 0.6 + H * 0.3, D / 2 - 0.02, 0.25, 0.08, 0.02, b.mat("lamp_front"));
        b.box(sx * (W / 2 - 0.2), wr * 0.6 + H * 0.3, -D / 2 + 0.02, 0.25, 0.08, 0.02, b.mat("lamp_rear"));
      }
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
  const b = new ObjectBuilder(Math.max(wCm, 1) / 100, Math.max(dCm, 1) / 100, Math.max(hCm, 0.5) / 100, main);
  item.build(b);
  return b.group;
}
