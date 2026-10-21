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
        .reset {
          position: absolute; right: 8px; bottom: 8px; z-index: 2;
          border: none; border-radius: 50%; width: 32px; height: 32px; cursor: pointer;
          background: var(--secondary-background-color, #eee); color: var(--primary-text-color, #222);
          opacity: .75; font-size: 16px; line-height: 32px;
        }
        .reset:hover { opacity: 1; }
        ${VIEWER_STYLES}
      </style>
      <ha-card>
        <div class="title"></div>
        <div class="stage"><button class="reset" title="Ansicht zurücksetzen">⟲</button></div>
      </ha-card>`;
    this.stage = this.root.querySelector(".stage")!;
    this.titleEl = this.root.querySelector(".title")!;
    this.root.querySelector(".reset")!.addEventListener("click", () => this.viewer?.resetView());
  }

  setConfig(config: CardConfig): void {
    if (!config) throw new Error("Ungültige Konfiguration");
    this._config = { ...config, floorplan: normalizeFloorplan(config.floorplan) };
    this.titleEl.textContent = config.title ?? "";
    this.stage.style.height = `${config.height ?? DEFAULTS.height}px`;
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
    return { columns: 12, min_columns: 6, rows: Math.ceil((this._config?.height ?? DEFAULTS.height) / 56) + 1 };
  }

  connectedCallback(): void {
    if (this.viewer) return;
    this.viewer = new Viewer();
    this.viewer.onHotspot = (h, g) => this.handle(h, g);
    this.stage.prepend(this.viewer.element);
    if (this._config) this.viewer.setConfig(this._config);
    if (this._hass) this.viewer.setHass(this._hass);
  }

  disconnectedCallback(): void {
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
