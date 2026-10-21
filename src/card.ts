import { fireMoreInfo, runAction } from "./ha";
import { DEFAULTS, normalizeFloorplan, type CardConfig, type Hass, type Hotspot } from "./types";
import { Viewer, VIEWER_STYLES } from "./viewer";
import { EXAMPLE_FLOORPLAN } from "./example";

export class FloorplanCard extends HTMLElement {
  private _config?: CardConfig;
  private _hass?: Hass;
  private viewer?: Viewer;
  private root: ShadowRoot;
  private stage!: HTMLDivElement;
  private titleEl!: HTMLDivElement;

  static getConfigElement(): HTMLElement {
    return document.createElement("floorplan-3d-card-editor");
  }

  static getStubConfig(): Partial<CardConfig> {
    return { title: "Wohnung", floorplan: EXAMPLE_FLOORPLAN };
  }

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.root.innerHTML = `
      <style>
        :host { display: block; }
        ha-card { overflow: hidden; position: relative; }
        .title { padding: 12px 16px 0; font-size: 1.2em; font-weight: 500; color: var(--primary-text-color); }
        .title:empty { display: none; }
        .stage { position: relative; width: 100%; }
        :host(.full-page) ha-card { border-radius: 0; border: none; }
        ha-card:fullscreen { border-radius: 0; background: var(--primary-background-color, #111); }
        .controls { position: absolute; right: 8px; bottom: 8px; z-index: 2; display: flex; gap: 6px; }
        .controls button {
          border: none; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; padding: 0;
          background: var(--secondary-background-color, #eee); color: var(--primary-text-color, #222);
          opacity: .75; display: flex; align-items: center; justify-content: center;
        }
        .controls button:hover { opacity: 1; }
        .controls svg { width: 18px; height: 18px; fill: currentColor; }
        ${VIEWER_STYLES}
      </style>
      <ha-card>
        <div class="title"></div>
        <div class="stage">
          <div class="controls">
            <button class="reset" title="Ansicht zurücksetzen"><svg viewBox="0 0 24 24"><path d="M12 5V1L7 6l5 5V7a6 6 0 1 1-6 6H4a8 8 0 1 0 8-8z"/></svg></button>
            <button class="fullscreen" title="Vollbild"><svg viewBox="0 0 24 24"><path d="M5 5h5v2H7v3H5zm9 0h5v5h-2V7h-3zM5 14h2v3h3v2H5zm12 0h2v5h-5v-2h3z"/></svg></button>
          </div>
        </div>
      </ha-card>`;
    this.stage = this.root.querySelector(".stage")!;
    this.titleEl = this.root.querySelector(".title")!;
    this.root.querySelector(".reset")!.addEventListener("click", () => this.viewer?.resetView());
    this.root.querySelector(".fullscreen")!.addEventListener("click", () => this.toggleFullscreen());
  }

  private onWindowResize = () => this.updateHeight();

  private toggleFullscreen(): void {
    const card = this.root.querySelector("ha-card") as HTMLElement;
    if (document.fullscreenElement) document.exitFullscreen().catch(() => undefined);
    else card.requestFullscreen?.().catch((err) => console.warn("floorplan-3d-card: Vollbild nicht möglich", err));
  }

  /** Fixed height from the config, or the rest of the screen in full-page / fullscreen mode. */
  private updateHeight(): void {
    const cfg = this._config;
    if (!cfg) return;
    const card = this.root.querySelector("ha-card") as HTMLElement;
    const titleH = this.titleEl.offsetHeight;
    let height: number;
    if (document.fullscreenElement === card) {
      height = window.innerHeight - titleH;
    } else if (cfg.full_page) {
      const top = this.getBoundingClientRect().top + (document.scrollingElement?.scrollTop ?? 0);
      height = Math.max(300, window.innerHeight - Math.max(top, 0) - titleH - 8);
    } else {
      height = cfg.height ?? DEFAULTS.height;
    }
    this.stage.style.height = `${Math.round(height)}px`;
  }

  setConfig(config: CardConfig): void {
    if (!config) throw new Error("Ungültige Konfiguration");
    this._config = { ...config, floorplan: normalizeFloorplan(config.floorplan) };
    this.titleEl.textContent = config.title ?? "";
    this.classList.toggle("full-page", !!config.full_page);
    this.updateHeight();
    this.viewer?.setConfig(this._config);
  }

  set hass(hass: Hass) {
    this._hass = hass;
    this.viewer?.setHass(hass);
  }

  get hass(): Hass | undefined {
    return this._hass;
  }

  getCardSize(): number {
    return Math.ceil((this._config?.height ?? DEFAULTS.height) / 50) + 1;
  }

  getGridOptions() {
    if (this._config?.full_page) return { columns: "full", rows: "auto" };
    return { columns: 12, min_columns: 6, rows: Math.ceil((this._config?.height ?? DEFAULTS.height) / 56) + 1 };
  }

  connectedCallback(): void {
    window.addEventListener("resize", this.onWindowResize);
    document.addEventListener("fullscreenchange", this.onWindowResize);
    // Layout settles after attach; measure again once it has.
    requestAnimationFrame(() => this.updateHeight());
    setTimeout(() => this.updateHeight(), 300);
    if (this.viewer) return;
    this.viewer = new Viewer();
    this.viewer.onHotspot = (h, g) => this.handle(h, g);
    this.stage.prepend(this.viewer.element);
    if (this._config) this.viewer.setConfig(this._config);
    if (this._hass) this.viewer.setHass(this._hass);
  }

  disconnectedCallback(): void {
    window.removeEventListener("resize", this.onWindowResize);
    document.removeEventListener("fullscreenchange", this.onWindowResize);
    // Free the WebGL context; HA detaches cards when switching views.
    this.viewer?.dispose();
    this.viewer = undefined;
  }

  private handle(h: Hotspot, gesture: "tap" | "hold"): void {
    if (!this._hass || !h.entity) return;
    if (gesture === "hold") {
      fireMoreInfo(this, h.entity);
      return;
    }
    runAction(this._hass, this, h).catch((err) => console.error("floorplan-3d-card:", err));
  }
}
