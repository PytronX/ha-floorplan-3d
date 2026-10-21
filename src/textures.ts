import * as THREE from "three";

// Procedural textures so the card works without any image files. Each entry draws one tile
// and knows how big that tile is in reality (cm).
interface Builtin {
  label: string;
  size: number;
  draw(ctx: CanvasRenderingContext2D, n: number): void;
}

function noise(ctx: CanvasRenderingContext2D, n: number, amount: number, seed = 1): void {
  const img = ctx.getImageData(0, 0, n, n);
  let s = seed;
  for (let i = 0; i < img.data.length; i += 4) {
    s = (s * 16807) % 2147483647;
    const d = ((s / 2147483647) - 0.5) * amount;
    img.data[i] += d;
    img.data[i + 1] += d;
    img.data[i + 2] += d;
  }
  ctx.putImageData(img, 0, 0);
}

export const BUILTIN_TEXTURES: Record<string, Builtin> = {
  wood: {
    label: "Parkett (Holz)",
    size: 120,
    draw(ctx, n) {
      const rows = 6;
      const h = n / rows;
      const tones = ["#b98a5a", "#a97a4c", "#c39566", "#b08050", "#9f7045", "#bd8d5d"];
      for (let r = 0; r < rows; r++) {
        const shift = (r % 2) * (n / 2);
        for (let k = -1; k < 2; k++) {
          ctx.fillStyle = tones[(r * 2 + k + 6) % tones.length];
          ctx.fillRect(shift + k * n, r * h, n, h);
          ctx.strokeStyle = "rgba(60,35,15,.35)";
          ctx.lineWidth = 2;
          ctx.strokeRect(shift + k * n, r * h, n, h);
        }
        ctx.strokeStyle = "rgba(90,55,25,.18)";
        ctx.lineWidth = 1;
        for (let g = 0; g < 4; g++) {
          const y = r * h + (g + 1) * (h / 5);
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.bezierCurveTo(n * 0.3, y - 2, n * 0.6, y + 2, n, y);
          ctx.stroke();
        }
      }
      noise(ctx, n, 18, 7);
    },
  },
  tiles: {
    label: "Fliesen hell",
    size: 60,
    draw(ctx, n) {
      ctx.fillStyle = "#b8b6b0";
      ctx.fillRect(0, 0, n, n);
      ctx.fillStyle = "#e9e7e2";
      const g = n * 0.02;
      ctx.fillRect(g, g, n / 2 - 2 * g, n / 2 - 2 * g);
      ctx.fillRect(n / 2 + g, g, n / 2 - 2 * g, n / 2 - 2 * g);
      ctx.fillRect(g, n / 2 + g, n / 2 - 2 * g, n / 2 - 2 * g);
      ctx.fillRect(n / 2 + g, n / 2 + g, n / 2 - 2 * g, n / 2 - 2 * g);
      noise(ctx, n, 8, 3);
    },
  },
  tiles_dark: {
    label: "Fliesen dunkel",
    size: 60,
    draw(ctx, n) {
      ctx.fillStyle = "#2c2c2c";
      ctx.fillRect(0, 0, n, n);
      ctx.fillStyle = "#4a4a4c";
      const g = n * 0.015;
      ctx.fillRect(g, g, n - 2 * g, n / 2 - 2 * g);
      ctx.fillRect(g, n / 2 + g, n - 2 * g, n / 2 - 2 * g);
      noise(ctx, n, 14, 5);
    },
  },
  carpet: {
    label: "Teppich",
    size: 50,
    draw(ctx, n) {
      ctx.fillStyle = "#8c8f9a";
      ctx.fillRect(0, 0, n, n);
      noise(ctx, n, 40, 11);
    },
  },
  brick: {
    label: "Backstein",
    size: 100,
    draw(ctx, n) {
      ctx.fillStyle = "#cfc6b8";
      ctx.fillRect(0, 0, n, n);
      const rows = 8;
      const h = n / rows;
      const w = n / 4;
      const tones = ["#a4553a", "#9a4b33", "#b0603f", "#93462f"];
      for (let r = 0; r < rows; r++) {
        const shift = (r % 2) * (w / 2);
        for (let c = -1; c < 5; c++) {
          ctx.fillStyle = tones[(r + c + 8) % tones.length];
          ctx.fillRect(shift + c * w + 2, r * h + 2, w - 4, h - 4);
        }
      }
      noise(ctx, n, 22, 13);
    },
  },
  concrete: {
    label: "Beton",
    size: 150,
    draw(ctx, n) {
      ctx.fillStyle = "#a9a8a4";
      ctx.fillRect(0, 0, n, n);
      noise(ctx, n, 30, 17);
    },
  },
  plaster: {
    label: "Rauputz",
    size: 80,
    draw(ctx, n) {
      ctx.fillStyle = "#f0ede6";
      ctx.fillRect(0, 0, n, n);
      noise(ctx, n, 16, 19);
    },
  },
  wallpaper: {
    label: "Tapete gestreift",
    size: 60,
    draw(ctx, n) {
      ctx.fillStyle = "#e8e1d3";
      ctx.fillRect(0, 0, n, n);
      ctx.fillStyle = "#d9cfbb";
      for (let i = 0; i < 4; i++) ctx.fillRect(i * (n / 4), 0, n / 12, n);
      noise(ctx, n, 6, 23);
    },
  },
};

export const BUILTIN_PREFIX = "builtin:";

export function textureLabel(src: string): string {
  if (src.startsWith(BUILTIN_PREFIX)) return BUILTIN_TEXTURES[src.slice(BUILTIN_PREFIX.length)]?.label ?? src;
  return src;
}

/** Real-world tile size (cm) to use when the config doesn't set one. */
export function defaultTextureSize(src: string): number {
  if (src.startsWith(BUILTIN_PREFIX)) return BUILTIN_TEXTURES[src.slice(BUILTIN_PREFIX.length)]?.size ?? 100;
  return 100;
}

export class TextureCache {
  private cache = new Map<string, THREE.Texture>();
  private loader = new THREE.TextureLoader();

  constructor(private onLoad: () => void) {}

  /** Texture for `src` where one tile covers `sizeCm`; geometry UVs are in metres. */
  get(src: string, sizeCm: number): THREE.Texture | undefined {
    const key = `${src}|${sizeCm}`;
    let tex = this.cache.get(key);
    if (tex) return tex;
    if (src.startsWith(BUILTIN_PREFIX)) {
      const def = BUILTIN_TEXTURES[src.slice(BUILTIN_PREFIX.length)];
      if (!def) return undefined;
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 256;
      def.draw(canvas.getContext("2d")!, 256);
      tex = new THREE.CanvasTexture(canvas);
    } else {
      tex = this.loader.load(src, () => this.onLoad(), undefined, () => console.warn("floorplan-3d-card: Textur nicht ladbar:", src));
    }
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.anisotropy = 4;
    const repeat = 100 / Math.max(sizeCm, 1);
    tex.repeat.set(repeat, repeat);
    this.cache.set(key, tex);
    return tex;
  }

  dispose(): void {
    for (const t of this.cache.values()) t.dispose();
    this.cache.clear();
  }
}
