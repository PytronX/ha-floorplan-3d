import { runAction, type Gesture } from "./ha";
import { DEFAULTS, getFloors, type CardConfig, type Floor, type Hass, type Hotspot } from "./types";
import { Viewer, VIEWER_STYLES } from "./viewer";
import { EXAMPLE_FLOORPLAN } from "./example";

export class FloorplanCard extends HTMLElement {
  private _config?: CardConfig;
  private _hass?: Hass;
  private viewer?: Viewer;
  private root: ShadowRoot;
  private stage!: HTMLDivElement;
  private titleEl!: HTMLDivElement;
  private floorsEl!: HTMLDivElement;
  private floors: Floor[] = [];
  private floorIdx = 0;
  /** A tap waiting to see whether a second one turns it into a double tap. */
  private pendingTap?: { id: string; timer: number };

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
        .stage { position: relative; width: 100%; isolation: isolate; }
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
        .floors {
          position: absolute; left: 8px; top: 8px; z-index: 2; display: flex; flex-wrap: wrap; gap: 2px; padding: 3px;
          border-radius: 12px; background: color-mix(in srgb, var(--card-background-color, #fff) 80%, transparent);
          backdrop-filter: blur(6px); box-shadow: 0 1px 4px rgba(0,0,0,.18);
        }
        .floors[hidden] { display: none; }
        .floors button {
          font: inherit; font-size: 13px; border: none; border-radius: 9px; padding: 6px 12px; cursor: pointer;
          background: transparent; color: var(--primary-text-color, #222);
        }
        .floors button:hover { background: color-mix(in srgb, var(--primary-color, #03a9f4) 14%, transparent); }
        .floors button.on { background: var(--primary-color, #03a9f4); color: var(--text-primary-color, #fff); }
        ${VIEWER_STYLES}
      </style>
      <ha-card>
        <div class="title"></div>
        <div class="stage">
          <div class="floors" hidden></div>
          <div class="controls">
            <button class="reset" title="Ansicht zurücksetzen"><svg viewBox="0 0 24 24"><path d="M12 5V1L7 6l5 5V7a6 6 0 1 1-6 6H4a8 8 0 1 0 8-8z"/></svg></button>
            <button class="fullscreen" title="Vollbild"><svg viewBox="0 0 24 24"><path d="M5 5h5v2H7v3H5zm9 0h5v5h-2V7h-3zM5 14h2v3h3v2H5zm12 0h2v5h-5v-2h3z"/></svg></button>
          </div>
        </div>
      </ha-card>`;
    this.stage = this.root.querySelector(".stage")!;
    this.titleEl = this.root.querySelector(".title")!;
    this.floorsEl = this.root.querySelector(".floors")!;
    this.floorsEl.addEventListener("click", (ev) => {
      const b = (ev.target as HTMLElement).closest<HTMLButtonElement>("button[data-floor]");
      if (b) this.showFloor(Number(b.dataset.floor));
    });
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
    if (cfg.full_page && document.fullscreenElement !== card) {
      // Padding below the card (view, sections) would still make the page scroll: trim it off.
      const doc = document.scrollingElement ?? document.documentElement;
      const overflow = doc.scrollHeight - window.innerHeight;
      if (overflow > 0 && overflow < 200) {
        this.stage.style.height = `${Math.max(300, Math.round(height - overflow))}px`;
      }
    }
  }

  setConfig(config: CardConfig): void {
    if (!config) throw new Error("Ungültige Konfiguration");
    this._config = { ...config };
    this.floors = getFloors(config);
    this.floorIdx = Math.min(this.floorIdx, this.floors.length - 1);
    this.titleEl.textContent = config.title ?? "";
    this.classList.toggle("full-page", !!config.full_page);
    this.renderFloors();
    this.updateHeight();
    this.viewer?.setConfig(this.viewConfig()!);
  }

  /** The config handed to the 3D view: the selected storey as its floor plan. */
  private viewConfig(): CardConfig | undefined {
    if (!this._config) return undefined;
    return { ...this._config, floorplan: this.floors[this.floorIdx]?.floorplan };
  }

  private renderFloors(): void {
    this.floorsEl.hidden = this.floors.length < 2;
    this.floorsEl.innerHTML = this.floors
      .map((f, i) => `<button data-floor="${i}" class="${i === this.floorIdx ? "on" : ""}">${f.name.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`)}</button>`)
      .join("");
  }

  private showFloor(i: number): void {
    if (i === this.floorIdx || !this.floors[i]) return;
    this.floorIdx = i;
    this.renderFloors();
    this.viewer?.setConfig(this.viewConfig()!);
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
    if (this._config) this.viewer.setConfig(this.viewConfig()!);
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
    if (gesture === "tap" && (h.double_tap_action ?? "none") !== "none") {
      // Wait briefly: a second tap on the same hitbox makes it a double tap.
      const pending = this.pendingTap;
      if (pending) window.clearTimeout(pending.timer);
      this.pendingTap = undefined;
      if (pending?.id === h.id) return this.run(h, "double_tap");
      const timer = window.setTimeout(() => {
        this.pendingTap = undefined;
        this.run(h, "tap");
      }, 260);
      this.pendingTap = { id: h.id, timer };
      return;
    }
    this.run(h, gesture);
  }

  private run(h: Hotspot, gesture: Gesture): void {
    if (!this._hass) return;
    runAction(this._hass, this, h, gesture).catch((err) => console.error("floorplan-3d-card:", err));
  }
}
