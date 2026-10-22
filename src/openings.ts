import * as THREE from "three";
import type { Opening, OpeningType } from "./types";

const CM = 0.01;

export interface OpeningPreset {
  key: string;
  label: string;
  type: OpeningType;
  style: NonNullable<Opening["style"]>;
  w: number;
  h: number;
  sill: number;
}

/** Doors and windows offered in the object library (and by the toolbar's door/window tools). */
export const OPENING_PRESETS: OpeningPreset[] = [
  { key: "door-single", label: "Drehtür", type: "door", style: "single", w: 90, h: 210, sill: 0 },
  { key: "door-double", label: "Doppeltür", type: "door", style: "double", w: 140, h: 210, sill: 0 },
  { key: "door-glass", label: "Glastür", type: "door", style: "glass", w: 90, h: 210, sill: 0 },
  { key: "door-french", label: "Balkon- / Terrassentür", type: "door", style: "french", w: 140, h: 220, sill: 0 },
  { key: "door-sliding", label: "Schiebetür", type: "door", style: "sliding", w: 100, h: 210, sill: 0 },
  { key: "door-garage", label: "Garagentor", type: "door", style: "garage", w: 250, h: 220, sill: 0 },
  { key: "door-opening", label: "Durchgang", type: "door", style: "opening", w: 90, h: 210, sill: 0 },
  { key: "window-single", label: "Fenster einflügelig", type: "window", style: "single", w: 80, h: 130, sill: 90 },
  { key: "window-double", label: "Fenster zweiflügelig", type: "window", style: "double", w: 120, h: 130, sill: 90 },
  { key: "window-triple", label: "Fenster dreiflügelig", type: "window", style: "triple", w: 180, h: 130, sill: 90 },
  { key: "window-fixed", label: "Festverglasung", type: "window", style: "fixed", w: 100, h: 130, sill: 90 },
  { key: "window-sliding", label: "Schiebefenster", type: "window", style: "sliding", w: 160, h: 130, sill: 90 },
  { key: "window-floor", label: "Bodentiefes Fenster", type: "window", style: "double", w: 120, h: 220, sill: 0 },
  { key: "window-round", label: "Rundfenster", type: "window", style: "round", w: 70, h: 70, sill: 120 },
];

export const DOOR_STYLES: [string, string][] = [
  ["single", "Drehtür"],
  ["double", "Doppeltür"],
  ["glass", "Glastür"],
  ["french", "Balkon- / Terrassentür"],
  ["sliding", "Schiebetür"],
  ["garage", "Garagentor"],
  ["opening", "Durchgang (ohne Tür)"],
];

export const WINDOW_STYLES: [string, string][] = [
  ["single", "Einflügelig"],
  ["double", "Zweiflügelig"],
  ["triple", "Dreiflügelig"],
  ["fixed", "Festverglasung"],
  ["sliding", "Schiebefenster"],
  ["round", "Rund / Oval"],
];

/** A piece of wall around a preset's opening, for the library thumbnails. */
export function openingPreview(p: OpeningPreset, wallMat: THREE.Material, glassMat: THREE.Material): THREE.Group {
  const g = new THREE.Group();
  const m = 25;
  const t = 12;
  const top = p.sill + p.h;
  const H = top + m;
  const box = (x0: number, x1: number, y0: number, y1: number) => {
    if (x1 - x0 < 0.5 || y1 - y0 < 0.5) return;
    const mesh = new THREE.Mesh(new THREE.BoxGeometry((x1 - x0) * CM, (y1 - y0) * CM, t * CM), wallMat);
    mesh.position.set(((x0 + x1) / 2) * CM, ((y0 + y1) / 2) * CM, 0);
    g.add(mesh);
  };
  box(-m, 0, 0, H);
  box(p.w, p.w + m, 0, H);
  box(0, p.w, top, H);
  box(0, p.w, Math.max(0, p.sill - m), p.sill);
  buildOpening(g, { id: "", wall: "", type: p.type, style: p.style, offset: p.w / 2, width: p.w, height: p.h, sill: p.sill }, 0, p.w, p.sill, top, t, glassMat, wallMat);
  return g;
}

const DOOR_OPEN = 1.13; // ~65 degrees

/**
 * Door or window in the wall gap a..b (cm along the wall), sill..top (cm high), t cm thick.
 * Works in the wall's frame: x along the wall, y up, z across it.
 */
export function buildOpening(
  group: THREE.Group,
  op: Opening,
  a: number,
  b: number,
  sill: number,
  top: number,
  t: number,
  glassMat: THREE.Material,
  wallMat: THREE.Material
): void {
  const style = op.style ?? "single";
  const door = op.type === "door";
  const defColor = !door || style === "glass" || style === "french" ? "#f2f2f0" : style === "garage" ? "#d4d6d8" : "#8b5a2b";
  const mat = new THREE.MeshStandardMaterial({ color: op.color || defColor, roughness: 0.55 });
  const dark = new THREE.MeshStandardMaterial({ color: new THREE.Color(op.color || defColor).multiplyScalar(0.6), roughness: 0.7 });
  const metal = new THREE.MeshStandardMaterial({ color: 0xb9bdc3, roughness: 0.3, metalness: 0.7 });
  const box = (x0: number, x1: number, y0: number, y1: number, z0: number, z1: number, m: THREE.Material, parent: THREE.Object3D = group) => {
    const [xa, xb] = x0 < x1 ? [x0, x1] : [x1, x0];
    const [za, zb] = z0 < z1 ? [z0, z1] : [z1, z0];
    if (xb - xa < 0.05 || y1 - y0 < 0.05 || zb - za < 0.05) return;
    const mesh = new THREE.Mesh(new THREE.BoxGeometry((xb - xa) * CM, (y1 - y0) * CM, (zb - za) * CM), m);
    mesh.position.set(((xa + xb) / 2) * CM, ((y0 + y1) / 2) * CM, ((za + zb) / 2) * CM);
    parent.add(mesh);
  };
  const w = b - a;
  const h = top - sill;
  // The side of the wall a door swings to: -z, the side its 2D symbol is drawn on; `mirror` flips it.
  const side = op.mirror ? 1 : -1;

  if (door) {
    if (style === "opening") return;
    if (style === "garage") {
      box(a, b, sill, top, -2, 2, mat);
      const n = Math.max(3, Math.round(h / 50));
      for (let i = 1; i < n; i++) {
        const y = sill + (h / n) * i;
        box(a + 1, b - 1, y - 0.6, y + 0.6, -2.4, 2.4, dark);
      }
      box(a + w / 2 - 10, a + w / 2 + 10, sill + 8, sill + 10, -3.5, 3.5, metal);
      return;
    }
    const fr = Math.min(5, w * 0.08);
    const fd = t + 2;
    box(a, a + fr, sill, top, -fd / 2, fd / 2, mat);
    box(b - fr, b, sill, top, -fd / 2, fd / 2, mat);
    box(a, b, top - fr, top, -fd / 2, fd / 2, mat);
    const lw = w - 2 * fr;
    const lh = h - fr - 1;
    const handleY = Math.min(lh - 10, Math.max(10, 105 - sill - 1));
    const glassy = style === "glass" || style === "french";

    /** A leaf `width` wide, growing from its hinge (x = 0) in direction `dir`. */
    const leaf = (width: number, dir: 1 | -1, parent: THREE.Object3D, handle = true) => {
      const X = (x: number) => dir * x;
      if (glassy) {
        const st = Math.min(9, width * 0.15);
        box(X(0), X(st), 0, lh, -2, 2, mat, parent);
        box(X(width - st), X(width), 0, lh, -2, 2, mat, parent);
        box(X(st), X(width - st), 0, 16, -2, 2, mat, parent);
        box(X(st), X(width - st), lh - st, lh, -2, 2, mat, parent);
        box(X(st), X(width - st), 16, lh - st, -0.5, 0.5, glassMat, parent);
      } else {
        box(X(0), X(width), 0, lh, -2, 2, mat, parent);
      }
      if (handle) box(X(width - 13), X(width - 4), handleY, handleY + 2, -4.5, 4.5, metal, parent);
    };
    const hinged = (hingeX: number, width: number, dir: 1 | -1) => {
      const pivot = new THREE.Group();
      pivot.position.set(hingeX * CM, (sill + 1) * CM, side * (t / 2 - 3) * CM);
      pivot.rotation.y = -side * dir * DOOR_OPEN;
      leaf(width, dir, pivot);
      group.add(pivot);
    };

    if (style === "double" || style === "french") {
      hinged(a + fr, lw / 2, 1);
      hinged(b - fr, lw / 2, -1);
    } else if (style === "sliding") {
      // Hangs in front of the wall and is slid half open, along a rail above the opening.
      const slide = new THREE.Group();
      const z = side * (t / 2 + 3);
      const x0 = op.flip ? a + fr + lw * 0.5 - 2 : a + fr - lw * 0.5 - 2;
      slide.position.set(x0 * CM, (sill + 1) * CM, z * CM);
      leaf(lw + 4, 1, slide, false);
      box(op.flip ? 4 : lw - 4, op.flip ? 6 : lw - 2, lh * 0.35, lh * 0.65, -3, 3, metal, slide);
      group.add(slide);
      box(Math.min(x0, a) - 2, Math.max(x0 + lw + 4, b) + 2, top + 1, top + 5, z - 2.5, z + 2.5, metal);
    } else {
      hinged(op.flip ? b - fr : a + fr, lw, op.flip ? -1 : 1);
    }
    return;
  }

  // Windows sit in the middle of the wall.
  const depth = Math.min(t, 8);
  const fw = Math.max(2, Math.min(6, w * 0.08, h * 0.08));

  if (style === "round") {
    // Wall around an elliptic hole, with a frame ring and a pane.
    const cx = ((a + b) / 2) * CM;
    const cy = ((sill + top) / 2) * CM;
    const rx = (w / 2) * CM;
    const ry = (h / 2) * CM;
    const fill = new THREE.Shape([
      new THREE.Vector2(a * CM, sill * CM),
      new THREE.Vector2(b * CM, sill * CM),
      new THREE.Vector2(b * CM, top * CM),
      new THREE.Vector2(a * CM, top * CM),
    ]);
    fill.holes.push(new THREE.Path().absellipse(cx, cy, rx * 0.98, ry * 0.98, 0, Math.PI * 2, true));
    const wallGeo = new THREE.ExtrudeGeometry(fill, { depth: t * CM, bevelEnabled: false, curveSegments: 40 });
    wallGeo.translate(0, 0, (-t / 2) * CM);
    group.add(new THREE.Mesh(wallGeo, wallMat));
    const ring = new THREE.Shape().absellipse(cx, cy, rx * 0.98, ry * 0.98, 0, Math.PI * 2, false);
    ring.holes.push(new THREE.Path().absellipse(cx, cy, rx * 0.98 - fw * CM, ry * 0.98 - fw * CM, 0, Math.PI * 2, true));
    const ringGeo = new THREE.ExtrudeGeometry(ring, { depth: depth * CM, bevelEnabled: false, curveSegments: 40 });
    ringGeo.translate(0, 0, (-depth / 2) * CM);
    group.add(new THREE.Mesh(ringGeo, mat));
    const pane = new THREE.Shape().absellipse(cx, cy, rx * 0.98 - fw * CM, ry * 0.98 - fw * CM, 0, Math.PI * 2, false);
    const paneGeo = new THREE.ExtrudeGeometry(pane, { depth: CM, bevelEnabled: false, curveSegments: 40 });
    paneGeo.translate(0, 0, -0.5 * CM);
    group.add(new THREE.Mesh(paneGeo, glassMat));
    return;
  }

  const d2 = depth / 2;
  box(a, a + fw, sill, top, -d2, d2, mat);
  box(b - fw, b, sill, top, -d2, d2, mat);
  box(a, b, sill, sill + fw, -d2, d2, mat);
  box(a, b, top - fw, top, -d2, d2, mat);
  const x0 = a + fw;
  const x1 = b - fw;
  const y0 = sill + fw;
  const y1 = top - fw;
  const sb = Math.max(1.5, Math.min(4.5, (x1 - x0) * 0.08));

  const sash = (sx0: number, sx1: number, zc: number, sd: number, handleRight: boolean | undefined) => {
    box(sx0, sx0 + sb, y0, y1, zc - sd / 2, zc + sd / 2, mat);
    box(sx1 - sb, sx1, y0, y1, zc - sd / 2, zc + sd / 2, mat);
    box(sx0, sx1, y0, y0 + sb, zc - sd / 2, zc + sd / 2, mat);
    box(sx0, sx1, y1 - sb, y1, zc - sd / 2, zc + sd / 2, mat);
    box(sx0 + sb, sx1 - sb, y0 + sb, y1 - sb, zc - 0.5, zc + 0.5, glassMat);
    if (handleRight !== undefined) {
      const hx = handleRight ? sx1 - sb / 2 : sx0 + sb / 2;
      const hy = (y0 + y1) / 2;
      box(hx - 1, hx + 1, hy - 6, hy + 2, zc + side * (sd / 2), zc + side * (sd / 2 + 2.5), metal);
    }
  };

  if (style === "fixed") {
    box(x0, x1, y0, y1, -0.5, 0.5, glassMat);
  } else if (style === "sliding") {
    const half = (x1 - x0) / 2;
    sash(x0, x0 + half + 2, -1.6, 3, false);
    sash(x1 - half - 2, x1, 1.6, 3, true);
  } else {
    const n = style === "triple" ? 3 : style === "double" ? 2 : 1;
    const cw = (x1 - x0 - (n - 1) * fw) / n;
    for (let i = 0; i < n; i++) {
      const s0 = x0 + i * (cw + fw);
      if (i > 0) box(s0 - fw, s0, y0, y1, -d2, d2, mat);
      const right = n === 1 ? !op.flip : i < n / 2 - 0.01 ? true : i > n / 2 - 1 + 0.01 ? false : undefined;
      sash(s0, s0 + cw, 0, Math.min(depth, 5), n === 3 && i === 1 ? undefined : right);
    }
  }
}

