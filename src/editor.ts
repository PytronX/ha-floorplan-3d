import { resolveAction } from "./ha";
import {
  DEFAULTS,
  defaultFloorName,
  formatArea,
  getFloors,
  normalizeFloorplan,
  roomArea,
  uid,
  type CardConfig,
  type Floor,
  type Floorplan,
  type Hass,
  type Hotspot,
  type Opening,
  type Point,
  type Room,
  type Wall,
} from "./types";
import { BUILTIN_PREFIX, BUILTIN_TEXTURES, defaultTextureSize, textureLabel } from "./textures";
import { Viewer, VIEWER_STYLES, centroid } from "./viewer";

type Tab = "2d" | "3d" | "both";
type Tool = "select" | "wall" | "box" | "room" | "door" | "window" | "hotspot";
type Kind = "wall" | "opening" | "room" | "hotspot";
interface Selection {
  kind: Kind;
  id: string;
}
interface Vec {
  x: number;
  y: number;
}

type Drag =
  | { type: "pan"; start: Vec; vb: Vec; moved: boolean; right?: boolean }
  | { type: "move"; sel: Selection; start: Vec; orig: string; moved: boolean }
  | { type: "endpoint"; ends: { wall: Wall; end: 1 | 2 }[]; moved: boolean }
  | { type: "vertex"; room: Room; idx: number; moved: boolean }
  | { type: "opening"; op: Opening; wall: Wall; moved: boolean }
  | { type: "resize"; hs: Hotspot; anchor: Vec; moved: boolean }
  | { type: "rect"; tool: "box" | "room" | "hotspot"; start: Vec; end: Vec };

const TOOLS: { id: Tool; label: string; icon: string; hint: string }[] = [
  { id: "select", label: "Auswählen", icon: "M7 2l12 11.2-5.8.5 3.3 7.3-2.2 1-3.2-7.4L7 18.5z", hint: "Element anklicken zum Bearbeiten, ziehen zum Verschieben. Leere Fläche oder rechte Maustaste ziehen = Ansicht verschieben, Mausrad = Zoom." },
  { id: "box", label: "Raum + Wände", icon: "M3 3h18v18H3zm2 2v14h14V5z", hint: "Rechteck aufziehen: erzeugt vier Wände und einen Raum. Rechte Maustaste gedrückt halten und ziehen = Ansicht verschieben." },
  { id: "wall", label: "Wand", icon: "M3 16h18v4H3zm0-6h8v4H3zm10 0h8v4h-8zM3 4h18v4H3z", hint: "Klicken setzt Wandpunkte. Doppelklick, Rechtsklick oder Esc beendet die Wand. Rechte Maustaste gedrückt halten und ziehen = Ansicht verschieben." },
  { id: "room", label: "Raum", icon: "M12 3 2 12h3v8h14v-8h3z", hint: "Rechteck aufziehen oder Eckpunkte klicken. Klick auf den ersten Punkt schließt den Raum. Rechte Maustaste gedrückt halten und ziehen = Ansicht verschieben." },
  { id: "door", label: "Tür", icon: "M8 3h10v18h-2V5H8v16H6V3zm2 8h2v2h-2z", hint: "Auf eine Wand klicken, um eine Tür einzusetzen. Rechte Maustaste gedrückt halten und ziehen = Ansicht verschieben." },
  { id: "window", label: "Fenster", icon: "M4 4h16v16H4zm2 2v5h5V6zm7 0v5h5V6zm-7 7v5h5v-5zm7 0v5h5v-5z", hint: "Auf eine Wand klicken, um ein Fenster einzusetzen. Rechte Maustaste gedrückt halten und ziehen = Ansicht verschieben." },
  { id: "hotspot", label: "Hitbox", icon: "M12 2 3 7v10l9 5 9-5V7zm0 2.3L18.7 8 12 11.7 5.3 8zM5 9.7l6 3.3v6.6l-6-3.3zm8 9.9V13l6-3.3v6.6z", hint: "Rechteck aufziehen (oder klicken für 50×50 cm), danach eine Entität zuweisen. Rechte Maustaste gedrückt halten und ziehen = Ansicht verschieben." },
];

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const round = (n: number) => Math.round(n * 10) / 10;

export class FloorplanCardEditor extends HTMLElement {
  private _hass?: Hass;
  private config!: CardConfig;
  /** All storeys; `fp` is the plan of the one being edited. */
  private floors: Floor[] = [];
  private floorIdx = 0;
  private fp: Floorplan = normalizeFloorplan(undefined);
  private lastEmitted = "";
  private root: ShadowRoot;
  private built = false;

  private tool: Tool = "select";
  private sel?: Selection;
  private draft: Vec[] = [];
  private cursor?: Vec;
  private drag?: Drag;
  private history: string[] = [];
  private future: string[] = [];
  private vb = { x: -100, y: -100, w: 1100 };
  private snapEnabled = true;
  private tab: Tab = "2d";
  private viewer?: Viewer;
  private entityIds: string[] = [];
  private wide = false;
  /** Item whose texture select is on "custom" but has no URL yet. */
  private customTextureFor?: string;

  private svg!: SVGSVGElement;
  private propsEl!: HTMLDivElement;
  private hintEl!: HTMLDivElement;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
  }

  private _lovelace?: { views?: { path?: string; type?: string }[] };

  /** Set by Home Assistant's card editor: the whole dashboard config. */
  set lovelace(lovelace: { views?: { path?: string; type?: string }[] } | undefined) {
    this._lovelace = lovelace;
    if (this.built) this.renderGeneral();
  }

  get lovelace() {
    return this._lovelace;
  }

  /** Whether the view being edited is a panel view; undefined when that cannot be told. */
  private isPanelView(): boolean | undefined {
    const views = this._lovelace?.views;
    if (!views?.length) return undefined;
    let seg = "";
    try {
      seg = decodeURIComponent(location.pathname.split("/")[2] ?? "");
    } catch {
      /* malformed URL */
    }
    let view = views.find((v) => v.path !== undefined && v.path === seg);
    if (!view && /^\d*$/.test(seg)) view = views[seg === "" ? 0 : Number(seg)];
    return view ? view.type === "panel" : undefined;
  }

  set hass(hass: Hass) {
    const first = !this._hass;
    this._hass = hass;
    this.viewer?.setHass(hass);
    const ids = Object.keys(hass.states);
    if (first || ids.length !== this.entityIds.length) {
      this.entityIds = ids.sort();
    }
  }

  setConfig(config: CardConfig): void {
    const json = JSON.stringify(config);
    if (json === this.lastEmitted && this.built) return;
    const isFirst = !this.config;
    this.config = { ...config };
    this.floors = structuredClone(getFloors(config));
    this.floorIdx = Math.min(this.floorIdx, this.floors.length - 1);
    this.fp = this.floors[this.floorIdx].floorplan;
    if (!this.built) this.build();
    if (this.sel && !this.find(this.sel)) this.sel = undefined;
    this.renderGeneral();
    if (isFirst) this.fitView();
    this.render();
  }

  disconnectedCallback(): void {
    this.viewer?.dispose();
    this.viewer = undefined;
    this.tab = "2d";
    this.built = false;
    window.removeEventListener("resize", this.onWindowResize);
    this.injectBaseStyle(false);
  }

  private dialogRoot?: ShadowRoot;

  private injectBaseStyle(on: boolean): void {
    if (on) this.dialogRoot = this.findAncestor("hui-dialog-edit-card")?.shadowRoot ?? undefined;
    const root = this.dialogRoot;
    if (!root) return;
    let style = root.getElementById(BASE_STYLE_ID);
    if (on && !style) {
      style = document.createElement("style");
      style.id = BASE_STYLE_ID;
      style.textContent = BASE_DIALOG_CSS;
      root.appendChild(style);
    } else if (!on) {
      style?.remove();
      this.dialogRoot = undefined;
    }
  }

  connectedCallback(): void {
    window.addEventListener("resize", this.onWindowResize);
    if (this.config && !this.built) {
      this.build();
      this.renderGeneral();
      this.render();
    }
    let wide = false;
    try {
      wide = localStorage.getItem(WIDE_KEY) === "1";
    } catch {
      /* storage unavailable */
    }
    // The dialog may still be assembling itself, so style it a bit later.
    setTimeout(() => {
      if (!this.isConnected) return;
      this.injectBaseStyle(true);
      if (wide) this.toggleWide(true);
    }, 50);
  }

  // ------------------------------------------------------------------ state

  private commit(): void {
    const next: CardConfig = { ...this.config };
    // One storey keeps the simple `floorplan` format; several are stored as `floors`.
    if (this.floors.length > 1) {
      next.floors = structuredClone(this.floors);
      delete next.floorplan;
    } else {
      next.floorplan = structuredClone(this.fp);
      delete next.floors;
    }
    this.config = next;
    this.emit();
    this.viewer?.setConfig(this.viewConfig());
  }

  /** Config for the 3D preview: the storey being edited. */
  private viewConfig(): CardConfig {
    return { ...this.config, floorplan: this.fp };
  }

  private stateJson(): string {
    return JSON.stringify({ floors: this.floors, idx: this.floorIdx });
  }

  private restoreState(json: string): void {
    const st = JSON.parse(json) as { floors: Floor[]; idx: number };
    this.floors = st.floors;
    this.floorIdx = Math.min(st.idx, st.floors.length - 1);
    this.fp = this.floors[this.floorIdx].floorplan;
  }

  private emit(): void {
    this.lastEmitted = JSON.stringify(this.config);
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this.config }, bubbles: true, composed: true }));
  }

  private snapshot(): void {
    this.history.push(this.stateJson());
    if (this.history.length > 100) this.history.shift();
    this.future = [];
  }

  private undo(): void {
    const prev = this.history.pop();
    if (!prev) return;
    this.future.push(this.stateJson());
    this.restoreState(prev);
    if (this.sel && !this.find(this.sel)) this.sel = undefined;
    this.commit();
    this.renderFloors();
    this.render();
  }

  private redo(): void {
    const next = this.future.pop();
    if (!next) return;
    this.history.push(this.stateJson());
    this.restoreState(next);
    if (this.sel && !this.find(this.sel)) this.sel = undefined;
    this.commit();
    this.renderFloors();
    this.render();
  }

  private find(sel: Selection): Wall | Opening | Room | Hotspot | undefined {
    const list = { wall: this.fp.walls, opening: this.fp.openings, room: this.fp.rooms, hotspot: this.fp.hotspots }[sel.kind] as {
      id: string;
    }[];
    return list.find((x) => x.id === sel.id) as any;
  }

  private deleteSelection(): void {
    if (!this.sel) return;
    this.snapshot();
    const { kind, id } = this.sel;
    if (kind === "wall") {
      this.fp.walls = this.fp.walls.filter((w) => w.id !== id);
      this.fp.openings = this.fp.openings.filter((o) => o.wall !== id);
    } else if (kind === "opening") this.fp.openings = this.fp.openings.filter((o) => o.id !== id);
    else if (kind === "room") this.fp.rooms = this.fp.rooms.filter((r) => r.id !== id);
    else this.fp.hotspots = this.fp.hotspots.filter((h) => h.id !== id);
    this.sel = undefined;
    this.commit();
    this.render();
  }

  private setTool(t: Tool): void {
    this.tool = t;
    this.draft = [];
    this.drag = undefined;
    this.root.querySelectorAll<HTMLButtonElement>(".tool").forEach((b) => b.classList.toggle("on", b.dataset.tool === t));
    this.hintEl.textContent = TOOLS.find((x) => x.id === t)!.hint;
    this.render2d();
  }

  // ------------------------------------------------------------------ layout

  private build(): void {
    this.built = true;
    this.lastCanvasWidth = 0;
    this.root.innerHTML = `
      <style>${EDITOR_STYLES}${VIEWER_STYLES}</style>
      <div class="layout">
        <aside class="side">
          <button data-act="wide" class="wide-btn" title="Editor als großes Fenster anzeigen">
            <svg viewBox="0 0 24 24"><path d="M3 3h7v2H6.4l4.3 4.3-1.4 1.4L5 6.4V10H3zm11 0h7v7h-2V6.4l-4.3 4.3-1.4-1.4L17.6 5H14zM3 14h2v3.6l4.3-4.3 1.4 1.4L6.4 19H10v2H3zm16 0h2v7h-7v-2h3.6l-4.3-4.3 1.4-1.4 4.3 4.3z"/></svg>
            <span>Großansicht</span>
          </button>
          <section class="sec floors-sec">
            <div class="props-head"><h3>Etagen</h3><button data-act="floor-add" title="Neue, leere Etage anlegen">+ Etage</button></div>
            <div class="seg floor-list"></div>
            <div class="floor-edit"></div>
          </section>
          <section class="sec general-sec"><h3>Allgemein</h3><div class="general"></div></section>
          <section class="sec props"></section>
          <details class="sec extra">
            <summary>Hintergrundbild (zum Nachzeichnen)</summary>
            <div class="bg grid2"></div>
          </details>
          <details class="sec extra">
            <summary>Import / Export (JSON)</summary>
            <textarea class="json" rows="8" spellcheck="false"></textarea>
            <div class="row"><button data-act="export">Aktuellen Grundriss anzeigen</button><button data-act="import">Importieren</button><button data-act="clear" class="danger">Alles löschen</button></div>
          </details>
        </aside>
        <div class="main">
          <div class="topbar">
            <div class="seg tabs">
              <button data-tab="2d" class="on">Grundriss (2D)</button>
              <button data-tab="3d">3D-Vorschau</button>
              <button data-tab="both">2D + 3D</button>
            </div>
          </div>
          <div class="tools2d">
            <div class="toolbar">
              <div class="seg tools">
                ${TOOLS.map((t) => `<button class="tool ${t.id === this.tool ? "on" : ""}" data-tool="${t.id}" title="${t.hint}"><svg viewBox="0 0 24 24"><path d="${t.icon}"/></svg><span>${t.label}</span></button>`).join("")}
              </div>
              <span class="sep"></span>
              <div class="seg actions">
                <button data-act="undo" title="Rückgängig (Strg+Z)"><svg viewBox="0 0 24 24"><path d="M12.5 8c-2.65 0-5.05 1-6.9 2.6L2 7v9h9l-3.62-3.62A7.95 7.95 0 0 1 20.4 16l2.37-.78A10.5 10.5 0 0 0 12.5 8z"/></svg></button>
                <button data-act="redo" title="Wiederholen (Strg+Y)"><svg viewBox="0 0 24 24"><path d="M18.4 10.6A10.46 10.46 0 0 0 1.23 15.22L3.6 16a7.95 7.95 0 0 1 13.02-3.62L13 16h9V7z"/></svg></button>
                <button data-act="delete" title="Auswahl löschen (Entf)"><svg viewBox="0 0 24 24"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"/></svg></button>
                <button data-act="fit" title="Alles anzeigen"><svg viewBox="0 0 24 24"><path d="M5 5h5v2H7v3H5zm9 0h5v5h-2V7h-3zM5 14h2v3h3v2H5zm12 0h2v5h-5v-2h3z"/></svg></button>
              </div>
              <label class="snap"><input type="checkbox" data-act="snap" checked> Raster</label>
            </div>
            <div class="hint"></div>
          </div>
          <div class="panes">
            <div class="pane-2d">
              <div class="canvas" tabindex="0"><svg xmlns="http://www.w3.org/2000/svg"></svg></div>
            </div>
            <div class="pane-3d" hidden>
              <div class="viewer3d"></div>
            </div>
          </div>
          <div class="row cam" hidden>
            <button data-act="cam-save">Diese Ansicht als Startansicht speichern</button>
            <button data-act="cam-clear">Startansicht zurücksetzen</button>
          </div>
        </div>
      </div>`;

    this.svg = this.root.querySelector(".canvas svg")!;
    this.propsEl = this.root.querySelector(".props")!;
    this.hintEl = this.root.querySelector(".hint")!;
    this.hintEl.textContent = TOOLS.find((x) => x.id === this.tool)!.hint;

    this.root.querySelectorAll<HTMLButtonElement>(".tool").forEach((b) =>
      b.addEventListener("click", () => this.setTool(b.dataset.tool as Tool))
    );
    this.root.querySelectorAll<HTMLElement>("[data-act]").forEach((el) => {
      const act = el.dataset.act!;
      if (act === "snap") el.addEventListener("change", () => (this.snapEnabled = (el as HTMLInputElement).checked));
      else el.addEventListener("click", () => this.action(act));
    });
    this.root.querySelectorAll<HTMLButtonElement>(".tabs button").forEach((b) =>
      b.addEventListener("click", () => this.showTab(b.dataset.tab as Tab))
    );

    const canvas = this.root.querySelector<HTMLDivElement>(".canvas")!;
    canvas.addEventListener("pointerdown", (e) => this.onDown(e));
    canvas.addEventListener("pointermove", (e) => this.onMove(e));
    canvas.addEventListener("pointerup", (e) => this.onUp(e));
    canvas.addEventListener("pointerleave", () => {
      this.cursor = undefined;
      if (this.tool !== "select") this.render2d();
    });
    canvas.addEventListener("dblclick", () => this.finishDraft());
    canvas.addEventListener("contextmenu", (e) => e.preventDefault());
    canvas.addEventListener("wheel", (e) => this.onWheel(e), { passive: false });
    canvas.addEventListener("keydown", (e) => this.onKey(e));
    new ResizeObserver(() => this.onCanvasResize()).observe(canvas);

    this.root.querySelector(".floor-list")!.addEventListener("click", (ev) => {
      const b = (ev.target as HTMLElement).closest<HTMLButtonElement>("button[data-floor]");
      if (b) this.switchFloor(Number(b.dataset.floor));
    });
    this.renderFloors();
  }

  // ----------------------------------------------------------------- floors

  private renderFloors(): void {
    const list = this.root.querySelector<HTMLDivElement>(".floor-list");
    if (!list) return;
    list.innerHTML = this.floors
      .map((f, i) => `<button data-floor="${i}" class="${i === this.floorIdx ? "on" : ""}">${esc(f.name)}</button>`)
      .join("");
    const edit = this.root.querySelector<HTMLDivElement>(".floor-edit")!;
    const single = this.floors.length < 2;
    edit.innerHTML = `
      <div class="floor-row">
        <label>Name der Etage<input data-floor-name value="${esc(this.floors[this.floorIdx].name)}"></label>
        <button data-floor-del class="danger" ${single ? "disabled" : ""} title="Diese Etage löschen">Löschen</button>
      </div>
      <div class="note">${single ? "Mit „+ Etage“ legst du weitere Stockwerke an. Auf der Karte kann man dann zwischen den Etagen umschalten." : "Die Wände der Etage darunter werden im Grundriss blass angezeigt, damit du sie nachzeichnen kannst."}</div>`;
    edit.querySelector<HTMLInputElement>("[data-floor-name]")!.addEventListener("change", (ev) => {
      const v = (ev.target as HTMLInputElement).value.trim();
      this.snapshot();
      this.floors[this.floorIdx].name = v || defaultFloorName(this.floorIdx);
      this.commit();
      this.renderFloors();
    });
    edit.querySelector("[data-floor-del]")!.addEventListener("click", () => void this.deleteFloor());
  }

  private switchFloor(i: number): void {
    if (i === this.floorIdx || !this.floors[i]) return;
    this.floorIdx = i;
    this.fp = this.floors[i].floorplan;
    this.sel = undefined;
    this.draft = [];
    this.drag = undefined;
    this.viewer?.setConfig(this.viewConfig());
    this.renderFloors();
    this.fitView();
    this.render();
  }

  private addFloor(): void {
    this.snapshot();
    this.floors.push({ id: uid("f"), name: defaultFloorName(this.floors.length), floorplan: normalizeFloorplan(undefined) });
    this.commit();
    this.switchFloor(this.floors.length - 1);
  }

  private async deleteFloor(): Promise<void> {
    if (this.floors.length < 2) return;
    const f = this.floors[this.floorIdx];
    const ok = await this.ask("Etage löschen?", `„${f.name}“ wird mit allem, was darauf gezeichnet ist, gelöscht. Mit Rückgängig (Strg+Z) lässt sich das zurückholen.`, "Löschen");
    if (!ok) return;
    this.snapshot();
    this.floors.splice(this.floorIdx, 1);
    this.floorIdx = Math.max(0, this.floorIdx - 1);
    this.fp = this.floors[this.floorIdx].floorplan;
    this.sel = undefined;
    this.commit();
    this.renderFloors();
    this.viewer?.setConfig(this.viewConfig());
    this.fitView();
    this.render();
  }

  private lastCanvasWidth = 0;

  /** Keep the drawing at the same zoom level (and centred) when the canvas changes size. */
  private onCanvasResize(): void {
    const w = this.svg.clientWidth;
    const h = this.svg.clientHeight;
    if (!w || !h) return;
    if (!this.lastCanvasWidth || this.autoFit) {
      this.fitView();
    } else if (w !== this.lastCanvasWidth) {
      const oldH = this.vb.w * (this.lastCanvasHeight / this.lastCanvasWidth);
      const cx = this.vb.x + this.vb.w / 2;
      const cy = this.vb.y + oldH / 2;
      const nw = this.vb.w * (w / this.lastCanvasWidth);
      this.vb = { x: cx - nw / 2, y: cy - (nw * h) / w / 2, w: nw };
    }
    this.lastCanvasWidth = w;
    this.lastCanvasHeight = h;
    this.render2d();
  }

  private lastCanvasHeight = 0;
  /** True until the user pans or zooms; while set, resizes re-fit the whole plan. */
  private autoFit = true;

  private action(act: string): void {
    switch (act) {
      case "undo":
        return this.undo();
      case "redo":
        return this.redo();
      case "delete":
        return this.deleteSelection();
      case "fit":
        this.fitView();
        return this.render2d();
      case "wide":
        return this.toggleWide();
      case "floor-add":
        return this.addFloor();
      case "floor-del":
        void this.deleteFloor();
        return;
      case "cam-save":
        if (!this.viewer) return;
        this.config = { ...this.config, camera: this.viewer.getCamera() };
        return this.emit();
      case "cam-clear": {
        const { camera, ...rest } = this.config;
        void camera;
        this.config = rest as CardConfig;
        this.emit();
        this.viewer?.fit();
        return;
      }
      case "export": {
        const ta = this.root.querySelector<HTMLTextAreaElement>(".json")!;
        ta.value = JSON.stringify(this.floors.length > 1 ? { floors: this.floors } : this.fp, null, 2);
        return;
      }
      case "import": {
        const ta = this.root.querySelector<HTMLTextAreaElement>(".json")!;
        try {
          const data = JSON.parse(ta.value);
          this.snapshot();
          if (Array.isArray(data.floors) && data.floors.length) {
            this.floors = getFloors({ floors: data.floors });
            this.floorIdx = 0;
            this.fp = this.floors[0].floorplan;
          } else {
            this.fp = this.floors[this.floorIdx].floorplan = normalizeFloorplan(data.floorplan ?? data);
          }
          this.sel = undefined;
          this.commit();
          this.renderFloors();
          this.fitView();
          this.render();
        } catch (err) {
          void this.ask("Import nicht möglich", `Ungültiges JSON: ${(err as Error).message}`);
        }
        return;
      }
      case "clear":
        void this.clearPlan();
        return;
    }
  }

  private async clearPlan(): Promise<void> {
    const text =
      this.floors.length > 1
        ? `Alle Wände, Räume, Türen, Fenster und Hitboxen von „${this.floors[this.floorIdx].name}“ werden gelöscht.`
        : "Alle Wände, Räume, Türen, Fenster und Hitboxen werden gelöscht.";
    if (!(await this.ask("Grundriss löschen?", text, "Alles löschen"))) return;
    this.snapshot();
    this.fp = this.floors[this.floorIdx].floorplan = normalizeFloorplan(undefined);
    this.sel = undefined;
    this.commit();
    this.render();
  }

  /**
   * Confirmation inside the editor instead of the browser's confirm()/alert().
   * Without `confirmLabel` it is a plain notice with a single OK button.
   */
  private ask(title: string, text: string, confirmLabel?: string): Promise<boolean> {
    return new Promise((resolve) => {
      const dlg = document.createElement("dialog");
      dlg.className = "ask";
      dlg.innerHTML = `
        <h4>${esc(title)}</h4>
        <p>${esc(text)}</p>
        <div class="ask-actions">
          ${confirmLabel ? `<button data-r="0">Abbrechen</button><button data-r="1" class="danger-fill">${esc(confirmLabel)}</button>` : `<button data-r="0" class="on">OK</button>`}
        </div>`;
      let result = false;
      // Keep Esc & co. to this dialog; otherwise HA's own card dialog would react as well.
      dlg.addEventListener("keydown", (ev) => ev.stopPropagation());
      dlg.addEventListener("click", (ev) => {
        const b = (ev.target as HTMLElement).closest<HTMLButtonElement>("button[data-r]");
        if (b) {
          result = b.dataset.r === "1";
          dlg.close();
        } else if (ev.target === dlg) dlg.close(); // click on the backdrop
      });
      dlg.addEventListener("close", () => {
        dlg.remove();
        resolve(result);
      });
      this.root.appendChild(dlg);
      dlg.showModal();
      dlg.querySelector<HTMLButtonElement>(confirmLabel ? 'button[data-r="0"]' : "button")?.focus();
    });
  }

  private showTab(tab: Tab): void {
    this.tab = tab;
    this.root.querySelectorAll<HTMLButtonElement>(".tabs button").forEach((b) => b.classList.toggle("on", b.dataset.tab === tab));
    this.root.querySelector<HTMLElement>(".pane-2d")!.hidden = tab === "3d";
    this.root.querySelector<HTMLElement>(".tools2d")!.hidden = tab === "3d";
    this.root.querySelector<HTMLElement>(".pane-3d")!.hidden = tab === "2d";
    this.root.querySelector<HTMLElement>(".cam")!.hidden = tab === "2d";
    this.root.querySelector<HTMLElement>(".main")!.classList.toggle("both", tab === "both");
    if (tab !== "2d" && !this.viewer) {
      this.viewer = new Viewer();
      this.root.querySelector(".viewer3d")!.appendChild(this.viewer.element);
      this.viewer.setConfig(this.viewConfig());
      if (this._hass) this.viewer.setHass(this._hass);
    } else if (tab === "2d") {
      this.viewer?.dispose();
      this.viewer = undefined;
    }
    this.render2d();
  }

  private render(): void {
    this.render2d();
    this.renderProps();
    this.renderBackground();
  }

  // ---------------------------------------------------------- general fields

  private renderGeneral(): void {
    const c = this.config;
    const el = this.root.querySelector<HTMLDivElement>(".general")!;
    el.innerHTML = `
      <div class="grid2">
        <label>Titel<input data-k="title" value="${esc(c.title ?? "")}"></label>
        <label>Kartenhöhe (px)<input type="number" data-k="height" value="${c.height ?? DEFAULTS.height}"></label>
        <label>Wandhöhe (cm)<input type="number" data-k="wall_height" value="${c.wall_height ?? DEFAULTS.wall_height}"></label>
        <label>Wandstärke (cm)<input type="number" data-k="wall_thickness" value="${c.wall_thickness ?? DEFAULTS.wall_thickness}"></label>
        <label>Wandfarbe<input type="color" data-k="wall_color" value="${c.wall_color ?? DEFAULTS.wall_color}"></label>
        <label>Standard-Wandtextur<select data-k="wall_texture">${this.builtinOptions(c.wall_texture)}</select></label>
        <label>Standard-Bodentextur<select data-k="floor_texture">${this.builtinOptions(c.floor_texture)}</select></label>
        <label>Hitboxen
          <select data-k="hitbox_mode">
            ${[["visible", "immer sichtbar"], ["hover", "nur bei Mauszeiger"], ["hidden", "unsichtbar"]]
              .map(([v, l]) => `<option value="${v}" ${(c.hitbox_mode ?? "visible") === v ? "selected" : ""}>${l}</option>`)
              .join("")}
          </select>
        </label>
        <label class="check"><input type="checkbox" data-k="show_labels" ${c.show_labels !== false ? "checked" : ""}> Zustands-Labels anzeigen</label>
        <label class="check"><input type="checkbox" data-k="show_room_names" ${c.show_room_names !== false ? "checked" : ""}> Raumnamen anzeigen</label>
        <label class="check"><input type="checkbox" data-k="show_area" ${c.show_area !== false ? "checked" : ""}> Quadratmeter anzeigen</label>
        ${this.fullPageField()}
      </div>`;
    el.querySelectorAll<HTMLInputElement | HTMLSelectElement>("[data-k]").forEach((input) =>
      input.addEventListener("change", () => {
        const k = input.dataset.k as keyof CardConfig;
        let v: unknown;
        if (input instanceof HTMLInputElement && input.type === "checkbox") v = input.checked;
        else if (input instanceof HTMLInputElement && input.type === "number") v = input.value === "" ? undefined : Number(input.value);
        else v = input.value || undefined;
        const next: any = { ...this.config };
        if (v === undefined) delete next[k];
        else next[k] = v;
        this.config = next;
        this.emit();
        this.viewer?.setConfig(this.viewConfig());
        this.render2d();
      })
    );
  }

  private fullPageField(): string {
    const c = this.config;
    const blocked = this.isPanelView() === false && !c.full_page;
    return `<label class="check wide ${blocked ? "disabled" : ""}" ${blocked ? `title="Nur möglich, wenn die Ansicht den Typ „Panel (einzelne Karte)“ hat."` : ""}>
        <input type="checkbox" data-k="full_page" ${c.full_page ? "checked" : ""} ${blocked ? "disabled" : ""}>
        <span>Ganze Dashboard-Seite ausfüllen${blocked ? `<small>Nur in Ansichtstyp „Panel (einzelne Karte)“. Ansicht bearbeiten → Ansichtstyp ändern.</small>` : ""}</span>
      </label>`;
  }

  private builtinOptions(cur: string | undefined): string {
    const opts = [`<option value="">Keine</option>`];
    for (const [k, d] of Object.entries(BUILTIN_TEXTURES)) {
      const v = BUILTIN_PREFIX + k;
      opts.push(`<option value="${v}" ${cur === v ? "selected" : ""}>${d.label}</option>`);
    }
    if (cur && !cur.startsWith(BUILTIN_PREFIX)) opts.push(`<option value="${esc(cur)}" selected>${esc(cur)}</option>`);
    return opts.join("");
  }

  private textureFields(id: string, cur: string | undefined, scale: number | undefined, inherited: string | undefined): string {
    const custom = this.customTextureFor === id || (!!cur && cur !== "none" && !cur.startsWith(BUILTIN_PREFIX));
    const opts = [
      `<option value="" ${!cur && !custom ? "selected" : ""}>${inherited ? `Standard (${esc(textureLabel(inherited))})` : "Keine"}</option>`,
    ];
    if (inherited) opts.push(`<option value="none" ${cur === "none" ? "selected" : ""}>Keine</option>`);
    for (const [k, d] of Object.entries(BUILTIN_TEXTURES)) {
      const v = BUILTIN_PREFIX + k;
      opts.push(`<option value="${v}" ${cur === v ? "selected" : ""}>${d.label}</option>`);
    }
    opts.push(`<option value="custom" ${custom ? "selected" : ""}>Eigenes Bild (URL) …</option>`);
    const effective = cur && cur !== "none" ? cur : !cur ? inherited : undefined;
    return (
      `<label>Textur<select data-p="texture_sel">${opts.join("")}</select></label>` +
      (custom
        ? `<label class="wide">Bild-URL (z.B. /local/texturen/holz.jpg)<input data-p="texture_url" value="${esc(custom && cur && !cur.startsWith(BUILTIN_PREFIX) ? cur : "")}" placeholder="/local/texturen/holz.jpg"></label>`
        : "") +
      (effective
        ? `<label>Kachelgröße (cm)<input type="number" data-p="texture_scale" value="${scale ?? ""}" placeholder="${defaultTextureSize(effective)}"></label>`
        : "")
    );
  }

  private toggleWide(force?: boolean): void {
    this.wide = force ?? !this.wide;
    try {
      localStorage.setItem(WIDE_KEY, this.wide ? "1" : "0");
    } catch {
      /* storage unavailable */
    }
    this.classList.toggle("wide", this.wide);
    const btn = this.root.querySelector(".wide-btn");
    btn?.classList.toggle("on", this.wide);
    const label = btn?.querySelector("span");
    if (label) label.textContent = this.wide ? "Normale Größe" : "Großansicht";

    const dialog = this.findAncestor("hui-dialog-edit-card");
    if (dialog) {
      if ("large" in dialog) (dialog as any).large = this.wide;
      // The HA card preview is redundant next to our own 2D/3D view, so hide it and let the
      // dialog take (almost) the whole screen.
      const root = dialog.shadowRoot;
      let style = root?.getElementById(WIDE_STYLE_ID);
      if (this.wide && root && !style) {
        style = document.createElement("style");
        style.id = WIDE_STYLE_ID;
        style.textContent = WIDE_DIALOG_CSS;
        root.appendChild(style);
      } else if (!this.wide) {
        style?.remove();
      }
      // The dialog element itself keeps its surface in its own shadow root.
      const inner = root?.querySelector("ha-dialog, ha-md-dialog, ha-wa-dialog, ha-adaptive-dialog");
      const innerRoot = inner?.shadowRoot;
      let surface = innerRoot?.getElementById(WIDE_STYLE_ID);
      if (this.wide && innerRoot && !surface) {
        surface = document.createElement("style");
        surface.id = WIDE_STYLE_ID;
        surface.textContent = WIDE_SURFACE_CSS;
        innerRoot.appendChild(surface);
      } else if (!this.wide) {
        surface?.remove();
      }
    }
    this.fitHeight();
    // Once the dialog has resized, fill it and show the whole plan at the new size.
    setTimeout(() => {
      this.fitHeight();
      this.fitView();
      this.render2d();
    }, 350);
  }

  /**
   * In Großansicht the editor takes exactly the height left in the dialog, so the dialog itself
   * never scrolls; only the left column scrolls when its fields do not fit.
   */
  private fitHeight(): void {
    // Below 900px the editor is a single column again and simply grows with its content.
    if (!this.wide || this.clientWidth < 900) {
      this.style.height = "";
      return;
    }
    const scroller = this.findScroller();
    if (!scroller) return;
    const cs = getComputedStyle(scroller);
    const bottom = scroller.getBoundingClientRect().bottom - parseFloat(cs.paddingBottom || "0");
    const top = this.getBoundingClientRect().top + scroller.scrollTop;
    let height = Math.max(420, Math.floor(bottom - top - 2));
    this.style.height = `${height}px`;
    // Anything the dialog puts below us still counts, so trim whatever still overflows.
    const overflow = scroller.scrollHeight - scroller.clientHeight;
    if (overflow > 0) {
      height = Math.max(420, height - overflow);
      this.style.height = `${height}px`;
    }
    scroller.scrollTop = 0;
  }

  /**
   * The dialog's own scrolling body. Inside the HA card dialog that is the outermost scroller
   * below the dialog: inner ones (like the editor column) only grow with their content.
   */
  private findScroller(): HTMLElement | undefined {
    let found: HTMLElement | undefined;
    let node: Node | null = this.assignedSlot ?? this.parentNode ?? null;
    while (node) {
      if (node instanceof HTMLElement) {
        if (node.localName === "hui-dialog-edit-card") break;
        const oy = getComputedStyle(node).overflowY;
        if (oy === "auto" || oy === "scroll") found = node;
      }
      node = (node as HTMLElement).assignedSlot ?? node.parentNode ?? (node as ShadowRoot).host ?? null;
    }
    return found ?? (document.scrollingElement as HTMLElement | undefined);
  }

  private onWindowResize = () => {
    if (this.wide) this.fitHeight();
  };

  private findAncestor(name: string): HTMLElement | undefined {
    let node: Node | null = this;
    while (node) {
      if (node instanceof HTMLElement && node.localName === name) return node;
      node = (node as HTMLElement).assignedSlot ?? node.parentNode ?? (node as ShadowRoot).host ?? null;
    }
    return undefined;
  }

  private renderBackground(): void {
    const el = this.root.querySelector<HTMLDivElement>(".bg")!;
    const bg = this.config.background;
    el.innerHTML = `
      <label class="wide">Bild-URL (z.B. /local/grundriss.png)<input data-b="image" value="${esc(bg?.image ?? "")}"></label>
      <label>Breite im Grundriss (cm)<input type="number" data-b="width" value="${bg?.width ?? 1000}"></label>
      <label>Deckkraft (0–1)<input type="number" step="0.1" min="0" max="1" data-b="opacity" value="${bg?.opacity ?? 0.5}"></label>
      <label>Versatz X (cm)<input type="number" data-b="x" value="${bg?.x ?? 0}"></label>
      <label>Versatz Y (cm)<input type="number" data-b="y" value="${bg?.y ?? 0}"></label>`;
    el.querySelectorAll<HTMLInputElement>("[data-b]").forEach((input) =>
      input.addEventListener("change", () => {
        const cur: any = { ...(this.config.background ?? { image: "", width: 1000 }) };
        const k = input.dataset.b!;
        cur[k] = input.type === "number" ? Number(input.value) : input.value.trim();
        const next: any = { ...this.config };
        if (!cur.image) delete next.background;
        else next.background = cur;
        this.config = next;
        this.emit();
        this.render2d();
      })
    );
  }

  // ------------------------------------------------------------------- props

  private renderProps(): void {
    const el = this.propsEl;
    const item = this.sel && this.find(this.sel);
    if (!this.sel || !item) {
      const n = this.fp;
      el.innerHTML = `<h3>Auswahl</h3><div class="empty">Klicke im Grundriss auf ein Element, um es hier zu bearbeiten.</div>
        <div class="stats"><span><b>${n.walls.length}</b> Wände</span><span><b>${n.rooms.length}</b> Räume</span><span><b>${n.openings.length}</b> Türen/Fenster</span><span><b>${n.hotspots.length}</b> Hitboxen</span><span><b>${formatArea(n.rooms.reduce((a, r) => a + (r.points.length >= 3 ? roomArea(r.points) : 0), 0))}</b> gesamt</span></div>`;
      return;
    }
    const num = (k: string, label: string, v: number | undefined, ph = "") =>
      `<label>${label}<input type="number" data-p="${k}" value="${v ?? ""}" placeholder="${ph}"></label>`;
    const txt = (k: string, label: string, v: string | undefined, extra = "") =>
      `<label>${label}<input data-p="${k}" value="${esc(v ?? "")}" ${extra}></label>`;
    const color = (k: string, label: string, v: string | undefined, def: string) =>
      `<label>${label}<input type="color" data-p="${k}" value="${v ?? def}"></label>`;
    const actionSelect = (k: string, label: string, cur: string, autoLabel?: string) =>
      `<label>${label}<select data-p="${k}">
        ${[...(autoLabel ? [["auto", autoLabel]] : []), ["toggle", "Umschalten"], ["press", "Auslösen / Drücken"], ["more-info", "Info-Dialog"], ["none", "Nichts"]]
          .map(([v, l]) => `<option value="${v}" ${cur === v ? "selected" : ""}>${l}</option>`)
          .join("")}
      </select></label>`;

    let title = "";
    let body = "";
    switch (this.sel.kind) {
      case "wall": {
        const w = item as Wall;
        title = "Wand";
        body =
          num("length", "Länge (cm)", round(Math.hypot(w.x2 - w.x1, w.y2 - w.y1))) +
          num("thickness", "Stärke (cm)", w.thickness, String(this.config.wall_thickness ?? DEFAULTS.wall_thickness)) +
          num("height", "Höhe am Anfang A (cm)", w.height, String(this.config.wall_height ?? DEFAULTS.wall_height)) +
          num("height_end", "Höhe am Ende E (cm)", w.height_end, String(w.height ?? this.config.wall_height ?? DEFAULTS.wall_height)) +
          color("color", "Farbe", w.color, this.config.wall_color ?? DEFAULTS.wall_color) +
          this.textureFields(w.id, w.texture, w.texture_scale, this.config.wall_texture) +
          `<div class="note wide">Unterschiedliche Höhen an A und E ergeben eine Dachschräge. Eine Farbe färbt die Textur zusätzlich ein.</div>`;
        break;
      }
      case "opening": {
        const o = item as Opening;
        title = o.type === "door" ? "Tür" : "Fenster";
        body =
          `<label>Typ<select data-p="type"><option value="door" ${o.type === "door" ? "selected" : ""}>Tür</option><option value="window" ${o.type === "window" ? "selected" : ""}>Fenster</option></select></label>` +
          num("width", "Breite (cm)", o.width) +
          num("height", "Höhe (cm)", o.height) +
          num("sill", "Brüstung (cm)", o.sill ?? (o.type === "door" ? 0 : 90)) +
          num("offset", "Position auf Wand (cm)", round(o.offset));
        break;
      }
      case "room": {
        const r = item as Room;
        title = "Raum";
        body =
          txt("name", "Name", r.name) +
          `<label>Fläche<input value="${r.points.length >= 3 ? formatArea(roomArea(r.points)) : "–"}" readonly tabindex="-1"></label>` +
          color("color", "Bodenfarbe", r.color, this.config.floor_color ?? DEFAULTS.floor_color) +
          this.textureFields(r.id, r.texture, r.texture_scale, this.config.floor_texture);
        break;
      }
      case "hotspot": {
        const h = item as Hotspot;
        const auto = resolveAction({ ...h, action: "auto" });
        const autoLabel = { toggle: "Umschalten", press: "Auslösen", "more-info": "Info-Dialog", none: "nichts" }[auto];
        title = "Hitbox";
        body =
          `<div class="combo wide"><label>Entität<input data-p="entity" class="entity-input" autocomplete="off" spellcheck="false" value="${esc(h.entity ?? "")}" placeholder="Suchen, z.B. Wohnzimmer oder light."></label><div class="combo-list" hidden></div></div>` +
          txt("label", "Beschriftung", h.label, 'placeholder="Name der Entität"') +
          txt("icon", "Icon", h.icon, 'placeholder="mdi:lightbulb"') +
          actionSelect("action", "Klick-Aktion", h.action ?? "auto", `Automatisch (${autoLabel})`) +
          actionSelect("hold_action", "Halten-Aktion", h.hold_action ?? "more-info") +
          actionSelect("double_tap_action", "Doppelklick-Aktion", h.double_tap_action ?? "none") +
          `<label class="check"><input type="checkbox" data-p="show_label" ${h.show_label !== false ? "checked" : ""}> Label anzeigen</label>` +
          num("x", "X (cm)", round(h.x)) +
          num("y", "Y (cm)", round(h.y)) +
          num("z", "Höhe über Boden (cm)", h.z ?? 0) +
          num("w", "Breite (cm)", round(h.w)) +
          num("d", "Tiefe (cm)", round(h.d)) +
          num("h", "Höhe (cm)", round(h.h)) +
          color("color", "Farbe (aus)", h.color, "#3fa7ff");
        break;
      }
    }
    el.innerHTML = `<div class="props-head"><h3>${title}</h3><button data-act-del class="danger">Löschen</button></div><div class="grid2">${body}</div>`;
    el.querySelector("[data-act-del]")!.addEventListener("click", () => this.deleteSelection());
    el.querySelectorAll<HTMLInputElement | HTMLSelectElement>("[data-p]").forEach((input) =>
      input.addEventListener("change", () => this.applyProp(input))
    );
    const entityInput = el.querySelector<HTMLInputElement>(".entity-input");
    if (entityInput) this.bindEntityCombo(entityInput, el.querySelector<HTMLDivElement>(".combo-list")!);
  }

  /** Entity search with a suggestion list right below the field (inside the left column). */
  private bindEntityCombo(input: HTMLInputElement, list: HTMLDivElement): void {
    let items: string[] = [];
    let active = -1;
    const pick = (id: string) => {
      input.value = id;
      list.hidden = true;
      this.applyProp(input);
    };
    const show = (filter = true) => {
      const q = filter ? input.value.trim().toLowerCase() : "";
      const states = this._hass?.states ?? {};
      const words = q.split(/\s+/).filter(Boolean);
      items = this.entityIds
        .filter((id) => {
          const hay = `${id} ${states[id]?.attributes.friendly_name ?? ""}`.toLowerCase();
          return words.every((w) => hay.includes(w));
        })
        .slice(0, 200);
      active = items.length ? 0 : -1;
      list.innerHTML = items.length
        ? items
            .map((id, i) => {
              const name = states[id]?.attributes.friendly_name;
              return `<div class="opt ${i === active ? "act" : ""}" data-id="${esc(id)}"><b>${esc(String(name ?? id))}</b><span>${esc(id)}</span></div>`;
            })
            .join("")
        : `<div class="none">Keine passende Entität</div>`;
      list.hidden = false;
    };
    const highlight = () => {
      list.querySelectorAll(".opt").forEach((o, i) => o.classList.toggle("act", i === active));
      list.querySelector(".opt.act")?.scrollIntoView({ block: "nearest" });
    };
    input.addEventListener("focus", () => {
      // Typing replaces the current entity; the list starts unfiltered.
      input.select();
      show(false);
    });
    input.addEventListener("input", () => show());
    input.addEventListener("blur", () => setTimeout(() => (list.hidden = true), 150));
    input.addEventListener("keydown", (ev) => {
      if (list.hidden) return;
      if (ev.key === "ArrowDown" || ev.key === "ArrowUp") {
        ev.preventDefault();
        if (!items.length) return;
        active = (active + (ev.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
        highlight();
      } else if (ev.key === "Enter" && active >= 0) {
        ev.preventDefault();
        pick(items[active]);
      } else if (ev.key === "Escape") {
        list.hidden = true;
      }
    });
    // mousedown so the choice lands before the input loses focus.
    list.addEventListener("mousedown", (ev) => {
      const opt = (ev.target as HTMLElement).closest<HTMLElement>(".opt");
      if (!opt) return;
      ev.preventDefault();
      pick(opt.dataset.id!);
    });
  }

  private applyProp(input: HTMLInputElement | HTMLSelectElement): void {
    if (!this.sel) return;
    const item = this.find(this.sel) as any;
    if (!item) return;
    if (input.dataset.p === "entity" && (item.entity ?? "") === input.value.trim()) return;
    this.snapshot();
    const k = input.dataset.p!;
    let v: any;
    if (input instanceof HTMLInputElement && input.type === "checkbox") v = input.checked;
    else if (input instanceof HTMLInputElement && input.type === "number") v = input.value === "" ? undefined : Number(input.value);
    else v = input.value.trim() || undefined;

    if (this.sel.kind === "wall" && k === "length") {
      const w = item as Wall;
      const len = Math.hypot(w.x2 - w.x1, w.y2 - w.y1);
      if (v && len > 0) {
        w.x2 = round(w.x1 + ((w.x2 - w.x1) / len) * v);
        w.y2 = round(w.y1 + ((w.y2 - w.y1) / len) * v);
      }
    } else if (this.sel.kind === "hotspot" && k === "show_label") {
      if (v) delete item.show_label;
      else item.show_label = false;
    } else if (this.sel.kind === "hotspot" && k === "action" && v === "auto") {
      delete item.action;
    } else if (this.sel.kind === "hotspot" && ((k === "hold_action" && v === "more-info") || (k === "double_tap_action" && v === "none"))) {
      // Defaults are not stored.
      delete item[k];
    } else if (k === "texture_sel") {
      if (v === "custom") {
        // Wait for the URL before touching the item.
        this.history.pop();
        this.customTextureFor = item.id;
        this.renderProps();
        return;
      }
      this.customTextureFor = undefined;
      if (v === undefined) delete item.texture;
      else item.texture = v;
    } else if (k === "texture_url") {
      if (v) item.texture = v;
      else delete item.texture;
    } else if (v === undefined) {
      delete item[k];
    } else {
      item[k] = v;
    }
    this.commit();
    this.render();
  }

  // -------------------------------------------------------------- 2D canvas

  private get scale(): number {
    return (this.svg.clientWidth || 600) / this.vb.w;
  }

  private fitView(): void {
    this.autoFit = true;
    const pts: Vec[] = [];
    for (const w of this.fp.walls) pts.push({ x: w.x1, y: w.y1 }, { x: w.x2, y: w.y2 });
    for (const r of this.fp.rooms) for (const [x, y] of r.points) pts.push({ x, y });
    for (const h of this.fp.hotspots) pts.push({ x: h.x, y: h.y });
    if (!pts.length) {
      this.vb = { x: -100, y: -100, w: 1100 };
      return;
    }
    const xs = pts.map((p) => p.x);
    const ys = pts.map((p) => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const aspect = (this.svg?.clientHeight || 420) / (this.svg?.clientWidth || 600);
    const w = Math.max(maxX - minX, (maxY - minY) / aspect, 300) * 1.2;
    this.vb = { x: (minX + maxX) / 2 - w / 2, y: (minY + maxY) / 2 - (w * aspect) / 2, w };
  }

  private toPlan(ev: { clientX: number; clientY: number }): Vec {
    const ctm = this.svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const pt = new DOMPoint(ev.clientX, ev.clientY).matrixTransform(ctm.inverse());
    return { x: pt.x, y: pt.y };
  }

  private snap(p: Vec, skip?: (w: Wall, end: 1 | 2) => boolean): Vec {
    const tol = 12 / this.scale;
    let best: Vec | undefined;
    let bestD = tol;
    for (const w of this.fp.walls) {
      for (const end of [1, 2] as const) {
        if (skip?.(w, end)) continue;
        const q = end === 1 ? { x: w.x1, y: w.y1 } : { x: w.x2, y: w.y2 };
        const d = Math.hypot(q.x - p.x, q.y - p.y);
        if (d < bestD) {
          bestD = d;
          best = q;
        }
      }
    }
    if (best) return { ...best };
    if (!this.snapEnabled) return { x: round(p.x), y: round(p.y) };
    const g = 10;
    return { x: Math.round(p.x / g) * g, y: Math.round(p.y / g) * g };
  }

  private gridSnap(v: number): number {
    return this.snapEnabled ? Math.round(v / 10) * 10 : round(v);
  }

  private nearestWall(p: Vec): { wall: Wall; offset: number; dist: number } | undefined {
    let best: { wall: Wall; offset: number; dist: number } | undefined;
    for (const w of this.fp.walls) {
      const dx = w.x2 - w.x1;
      const dy = w.y2 - w.y1;
      const len2 = dx * dx + dy * dy;
      if (!len2) continue;
      const t = Math.max(0, Math.min(1, ((p.x - w.x1) * dx + (p.y - w.y1) * dy) / len2));
      const dist = Math.hypot(w.x1 + dx * t - p.x, w.y1 + dy * t - p.y);
      if (!best || dist < best.dist) best = { wall: w, offset: t * Math.sqrt(len2), dist };
    }
    const thick = (best?.wall.thickness ?? this.config.wall_thickness ?? DEFAULTS.wall_thickness) / 2;
    return best && best.dist <= Math.max(thick, 15 / this.scale) ? best : undefined;
  }

  private onDown(ev: PointerEvent): void {
    (ev.currentTarget as HTMLElement).focus();
    const p = this.toPlan(ev);
    const target = (ev.target as Element).closest<SVGElement>("[data-kind]");
    const capture = () => (ev.currentTarget as HTMLElement).setPointerCapture(ev.pointerId);

    // Right or middle button: dragging pans the view in every tool; a plain right click ends a drawing.
    if (ev.button === 1 || ev.button === 2) {
      this.drag = { type: "pan", start: { x: ev.clientX, y: ev.clientY }, vb: { x: this.vb.x, y: this.vb.y }, moved: false, right: ev.button === 2 };
      capture();
      return;
    }

    switch (this.tool) {
      case "select": {
        if (!target) {
          this.drag = { type: "pan", start: { x: ev.clientX, y: ev.clientY }, vb: { x: this.vb.x, y: this.vb.y }, moved: false };
          capture();
          return;
        }
        const kind = target.dataset.kind!;
        const id = target.dataset.id!;
        if (kind === "wall-end") {
          const wall = this.fp.walls.find((w) => w.id === id)!;
          const end = Number(target.dataset.end) as 1 | 2;
          const q = end === 1 ? { x: wall.x1, y: wall.y1 } : { x: wall.x2, y: wall.y2 };
          this.snapshot();
          this.drag = { type: "endpoint", ends: this.connectedEnds(q), moved: false };
        } else if (kind === "room-vertex") {
          const room = this.fp.rooms.find((r) => r.id === id)!;
          this.snapshot();
          this.drag = { type: "vertex", room, idx: Number(target.dataset.idx), moved: false };
        } else if (kind === "hs-resize") {
          const hs = this.fp.hotspots.find((h) => h.id === id)!;
          this.snapshot();
          this.drag = { type: "resize", hs, anchor: { x: hs.x - hs.w / 2, y: hs.y - hs.d / 2 }, moved: false };
        } else {
          const sel = { kind: kind as Kind, id };
          const changed = this.sel?.id !== id;
          this.sel = sel;
          if (kind === "opening") {
            const op = this.fp.openings.find((o) => o.id === id)!;
            const wall = this.fp.walls.find((w) => w.id === op.wall);
            if (wall) {
              this.snapshot();
              this.drag = { type: "opening", op, wall, moved: false };
            }
          } else {
            this.drag = { type: "move", sel, start: p, orig: JSON.stringify(this.find(sel)), moved: false };
            if (kind === "wall") {
              // Remember which neighbouring endpoints move along.
              (this.drag as any).links = [];
            }
          }
          if (changed) this.renderProps();
          this.render2d();
        }
        capture();
        return;
      }
      case "wall": {
        const s = this.snap(p);
        if (this.draft.length) {
          const last = this.draft[this.draft.length - 1];
          if (Math.hypot(s.x - last.x, s.y - last.y) >= 1) {
            this.snapshot();
            const w: Wall = { id: uid("w"), x1: last.x, y1: last.y, x2: s.x, y2: s.y };
            this.fp.walls.push(w);
            this.commit();
            this.draft.push(s);
          }
        } else this.draft = [s];
        this.render2d();
        return;
      }
      case "room": {
        const s = this.snap(p);
        if (this.draft.length >= 3) {
          const first = this.draft[0];
          if (Math.hypot(s.x - first.x, s.y - first.y) < 12 / this.scale) {
            this.closeRoom();
            return;
          }
        }
        if (this.draft.length) {
          this.draft.push(s);
          this.render2d();
          return;
        }
        this.drag = { type: "rect", tool: "room", start: s, end: s };
        capture();
        return;
      }
      case "box":
      case "hotspot": {
        const s = this.snap(p);
        this.drag = { type: "rect", tool: this.tool, start: s, end: s };
        capture();
        return;
      }
      case "door":
      case "window": {
        const hit = this.nearestWall(p);
        if (!hit) {
          this.hintEl.textContent = "Bitte direkt auf eine Wand klicken.";
          return;
        }
        const len = Math.hypot(hit.wall.x2 - hit.wall.x1, hit.wall.y2 - hit.wall.y1);
        const width = Math.min(this.tool === "door" ? 90 : 120, len);
        const op: Opening = {
          id: uid("o"),
          wall: hit.wall.id,
          type: this.tool,
          offset: Math.max(width / 2, Math.min(len - width / 2, this.gridSnap(hit.offset))),
          width,
          height: this.tool === "door" ? 210 : 130,
          sill: this.tool === "door" ? 0 : 90,
        };
        this.snapshot();
        this.fp.openings.push(op);
        this.sel = { kind: "opening", id: op.id };
        this.commit();
        this.render();
        return;
      }
    }
  }

  private connectedEnds(q: Vec): { wall: Wall; end: 1 | 2 }[] {
    const out: { wall: Wall; end: 1 | 2 }[] = [];
    for (const w of this.fp.walls) {
      if (Math.hypot(w.x1 - q.x, w.y1 - q.y) < 0.5) out.push({ wall: w, end: 1 });
      if (Math.hypot(w.x2 - q.x, w.y2 - q.y) < 0.5) out.push({ wall: w, end: 2 });
    }
    return out;
  }

  private onMove(ev: PointerEvent): void {
    const p = this.toPlan(ev);
    const d = this.drag;
    if (!d) {
      if (this.tool !== "select") {
        this.cursor = this.tool === "door" || this.tool === "window" ? p : this.snap(p);
        this.render2d();
      }
      return;
    }
    switch (d.type) {
      case "pan": {
        if (!d.moved && Math.hypot(ev.clientX - d.start.x, ev.clientY - d.start.y) < 4) return;
        const s = this.scale;
        this.autoFit = false;
        this.vb.x = d.vb.x - (ev.clientX - d.start.x) / s;
        this.vb.y = d.vb.y - (ev.clientY - d.start.y) / s;
        d.moved = true;
        break;
      }
      case "endpoint": {
        const own = new Set(d.ends.map((e) => e.wall.id + e.end));
        const s = this.snap(p, (w, end) => own.has(w.id + end));
        for (const e of d.ends) {
          if (e.end === 1) {
            e.wall.x1 = s.x;
            e.wall.y1 = s.y;
          } else {
            e.wall.x2 = s.x;
            e.wall.y2 = s.y;
          }
        }
        d.moved = true;
        break;
      }
      case "vertex": {
        const s = this.snap(p);
        d.room.points[d.idx] = [s.x, s.y];
        d.moved = true;
        break;
      }
      case "opening": {
        const dx = d.wall.x2 - d.wall.x1;
        const dy = d.wall.y2 - d.wall.y1;
        const len = Math.hypot(dx, dy);
        const t = ((p.x - d.wall.x1) * dx + (p.y - d.wall.y1) * dy) / (len * len);
        d.op.offset = Math.max(d.op.width / 2, Math.min(len - d.op.width / 2, this.gridSnap(t * len)));
        d.moved = true;
        break;
      }
      case "resize": {
        const s = this.snap(p);
        const x2 = Math.max(s.x, d.anchor.x + 5);
        const y2 = Math.max(s.y, d.anchor.y + 5);
        d.hs.w = x2 - d.anchor.x;
        d.hs.d = y2 - d.anchor.y;
        d.hs.x = d.anchor.x + d.hs.w / 2;
        d.hs.y = d.anchor.y + d.hs.d / 2;
        d.moved = true;
        break;
      }
      case "move": {
        let dx = p.x - d.start.x;
        let dy = p.y - d.start.y;
        if (!d.moved && Math.hypot(dx, dy) * this.scale < 4) return;
        if (!d.moved) this.snapshot();
        d.moved = true;
        dx = this.gridSnap(dx);
        dy = this.gridSnap(dy);
        const orig = JSON.parse(d.orig);
        const item = this.find(d.sel) as any;
        if (d.sel.kind === "wall") {
          const links: { wall: Wall; end: 1 | 2; ox: number; oy: number }[] = ((d as any).links ||= this.wallLinks(orig));
          item.x1 = orig.x1 + dx;
          item.y1 = orig.y1 + dy;
          item.x2 = orig.x2 + dx;
          item.y2 = orig.y2 + dy;
          for (const l of links) {
            if (l.end === 1) {
              l.wall.x1 = l.ox + dx;
              l.wall.y1 = l.oy + dy;
            } else {
              l.wall.x2 = l.ox + dx;
              l.wall.y2 = l.oy + dy;
            }
          }
        } else if (d.sel.kind === "room") {
          item.points = orig.points.map(([x, y]: Point) => [x + dx, y + dy]);
        } else if (d.sel.kind === "hotspot") {
          item.x = orig.x + dx;
          item.y = orig.y + dy;
        }
        break;
      }
      case "rect": {
        d.end = this.snap(p);
        break;
      }
    }
    this.render2d();
  }

  private wallLinks(orig: Wall): { wall: Wall; end: 1 | 2; ox: number; oy: number }[] {
    const out: { wall: Wall; end: 1 | 2; ox: number; oy: number }[] = [];
    for (const q of [{ x: orig.x1, y: orig.y1 }, { x: orig.x2, y: orig.y2 }]) {
      for (const e of this.connectedEnds(q)) {
        if (e.wall.id === orig.id) continue;
        out.push({ ...e, ox: e.end === 1 ? e.wall.x1 : e.wall.x2, oy: e.end === 1 ? e.wall.y1 : e.wall.y2 });
      }
    }
    return out;
  }

  private onUp(_ev: PointerEvent): void {
    const d = this.drag;
    this.drag = undefined;
    if (!d) return;
    if (d.type === "pan") {
      if (d.moved) return;
      if (d.right) this.finishDraft();
      else if (this.sel) {
        this.sel = undefined;
        this.renderProps();
        this.render2d();
      }
      return;
    }
    if (d.type === "rect") {
      this.finishRect(d.tool, d.start, d.end);
      return;
    }
    if (d.moved) {
      this.commit();
      this.render();
    } else if (d.type !== "move") {
      this.history.pop();
    }
  }

  private finishRect(tool: "box" | "room" | "hotspot", start: Vec, end: Vec): void {
    const x0 = Math.min(start.x, end.x);
    const y0 = Math.min(start.y, end.y);
    const x1 = Math.max(start.x, end.x);
    const y1 = Math.max(start.y, end.y);
    const big = x1 - x0 >= 20 && y1 - y0 >= 20;

    if (tool === "room" && !big) {
      // A click instead of a drag starts a polygon.
      this.draft = [start];
      this.render2d();
      return;
    }

    this.snapshot();
    if (tool === "hotspot") {
      const w = big ? x1 - x0 : 50;
      const dd = big ? y1 - y0 : 50;
      const h: Hotspot = { id: uid("h"), x: big ? x0 + w / 2 : start.x, y: big ? y0 + dd / 2 : start.y, z: 0, w, d: dd, h: 80 };
      this.fp.hotspots.push(h);
      this.sel = { kind: "hotspot", id: h.id };
    } else if (!big) {
      this.history.pop();
      return;
    } else {
      const pts: Point[] = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
      const room: Room = { id: uid("r"), name: `Raum ${this.fp.rooms.length + 1}`, points: pts };
      this.fp.rooms.push(room);
      if (tool === "box") {
        for (let i = 0; i < 4; i++) {
          const [ax, ay] = pts[i];
          const [bx, by] = pts[(i + 1) % 4];
          if (this.wallExists(ax, ay, bx, by)) continue;
          this.fp.walls.push({ id: uid("w"), x1: ax, y1: ay, x2: bx, y2: by });
        }
      }
      this.sel = { kind: "room", id: room.id };
    }
    this.commit();
    this.render();
  }

  private wallExists(ax: number, ay: number, bx: number, by: number): boolean {
    const same = (x: number, y: number, u: number, v: number) => Math.abs(x - u) < 0.5 && Math.abs(y - v) < 0.5;
    return this.fp.walls.some(
      (w) => (same(w.x1, w.y1, ax, ay) && same(w.x2, w.y2, bx, by)) || (same(w.x1, w.y1, bx, by) && same(w.x2, w.y2, ax, ay))
    );
  }

  private closeRoom(): void {
    if (this.draft.length < 3) return;
    this.snapshot();
    const room: Room = { id: uid("r"), name: `Raum ${this.fp.rooms.length + 1}`, points: this.draft.map((p) => [p.x, p.y]) };
    this.fp.rooms.push(room);
    this.draft = [];
    this.sel = { kind: "room", id: room.id };
    this.commit();
    this.render();
  }

  private finishDraft(): void {
    if (this.tool === "room" && this.draft.length >= 3) return this.closeRoom();
    this.draft = [];
    this.render2d();
  }

  private onWheel(ev: WheelEvent): void {
    ev.preventDefault();
    const p = this.toPlan(ev);
    const f = Math.exp(ev.deltaY * 0.0015);
    this.autoFit = false;
    const w = Math.max(100, Math.min(20000, this.vb.w * f));
    const k = w / this.vb.w;
    this.vb = { x: p.x - (p.x - this.vb.x) * k, y: p.y - (p.y - this.vb.y) * k, w };
    this.render2d();
  }

  private onKey(ev: KeyboardEvent): void {
    const tag = (ev.composedPath()[0] as HTMLElement).tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    if (ev.key === "Escape") {
      if (this.draft.length) this.finishDraft();
      else if (this.tool !== "select") this.setTool("select");
      else {
        this.sel = undefined;
        this.render();
      }
    } else if (ev.key === "Delete" || ev.key === "Backspace") {
      ev.preventDefault();
      this.deleteSelection();
    } else if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === "z") {
      ev.preventDefault();
      ev.shiftKey ? this.redo() : this.undo();
    } else if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === "y") {
      ev.preventDefault();
      this.redo();
    } else if (ev.key === "Enter") {
      this.finishDraft();
    }
  }

  private render2d(): void {
    if (!this.svg || this.tab === "3d") return;
    const s = this.scale;
    const aspect = (this.svg.clientHeight || 420) / (this.svg.clientWidth || 600);
    const vb = { ...this.vb, h: this.vb.w * aspect };
    this.svg.setAttribute("viewBox", `${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
    const px = (n: number) => n / s;
    const defT = this.config.wall_thickness ?? DEFAULTS.wall_thickness;
    const sel = this.sel;
    const isSel = (kind: Kind, id: string) => sel?.kind === kind && sel.id === id;
    const parts: string[] = [];

    // Grid
    const minor = vb.w > 4000 ? 100 : 10;
    parts.push(`<defs>
      <pattern id="g1" width="${minor}" height="${minor}" patternUnits="userSpaceOnUse"><path d="M ${minor} 0 L 0 0 0 ${minor}" fill="none" class="grid-minor" stroke-width="${px(1)}"/></pattern>
      <pattern id="g2" width="100" height="100" patternUnits="userSpaceOnUse"><rect width="100" height="100" fill="url(#g1)"/><path d="M 100 0 L 0 0 0 100" fill="none" class="grid-major" stroke-width="${px(1)}"/></pattern>
    </defs>
    <rect x="${vb.x}" y="${vb.y}" width="${vb.w}" height="${vb.h}" fill="url(#${vb.w > 4000 ? "g1" : "g2"})"/>`);

    const bg = this.config.background;
    if (bg?.image) {
      parts.push(
        `<image href="${esc(bg.image)}" x="${bg.x ?? 0}" y="${bg.y ?? 0}" width="${bg.width}" height="${bg.width * 4}" preserveAspectRatio="xMinYMin meet" opacity="${bg.opacity ?? 0.5}" style="pointer-events:none"/>`
      );
    }

    // The storey below, faded, as a tracing aid.
    const below = this.floors[this.floorIdx - 1]?.floorplan;
    if (below) {
      for (const w of below.walls) {
        parts.push(`<line x1="${w.x1}" y1="${w.y1}" x2="${w.x2}" y2="${w.y2}" class="ghost" stroke-width="${w.thickness ?? defT}" stroke-linecap="square"/>`);
      }
    }

    // Rooms
    for (const r of this.fp.rooms) {
      if (r.points.length < 2) continue;
      const pts = r.points.map((p) => p.join(",")).join(" ");
      parts.push(
        `<polygon data-kind="room" data-id="${r.id}" points="${pts}" fill="${esc(r.color ?? this.config.floor_color ?? DEFAULTS.floor_color)}" fill-opacity="0.45" class="room ${isSel("room", r.id) ? "sel" : ""}" stroke-width="${px(isSel("room", r.id) ? 2 : 0)}"/>`
      );
      const showArea = this.config.show_area !== false && r.points.length >= 3;
      if (r.name || showArea) {
        const [cx, cy] = centroid(r.points);
        const dy = r.name && showArea ? px(8) : 0;
        if (r.name) parts.push(`<text x="${cx}" y="${cy - dy}" class="room-name" font-size="${px(13)}">${esc(r.name)}</text>`);
        if (showArea)
          parts.push(`<text x="${cx}" y="${cy + dy}" class="room-area" font-size="${px(11)}">${formatArea(roomArea(r.points))}</text>`);
      }
    }

    // Walls
    for (const w of this.fp.walls) {
      const t = w.thickness ?? defT;
      const selW = isSel("wall", w.id);
      parts.push(
        `<line x1="${w.x1}" y1="${w.y1}" x2="${w.x2}" y2="${w.y2}" class="wall ${selW ? "sel" : ""}" stroke-width="${t}" stroke-linecap="square"/>`,
        `<line data-kind="wall" data-id="${w.id}" x1="${w.x1}" y1="${w.y1}" x2="${w.x2}" y2="${w.y2}" class="hit" stroke-width="${Math.max(t, px(14))}"/>`
      );
    }

    // Openings
    for (const o of this.fp.openings) {
      const w = this.fp.walls.find((x) => x.id === o.wall);
      if (!w) continue;
      const len = Math.hypot(w.x2 - w.x1, w.y2 - w.y1);
      if (!len) continue;
      const ux = (w.x2 - w.x1) / len;
      const uy = (w.y2 - w.y1) / len;
      const t = w.thickness ?? defT;
      const a = { x: w.x1 + ux * (o.offset - o.width / 2), y: w.y1 + uy * (o.offset - o.width / 2) };
      const b = { x: w.x1 + ux * (o.offset + o.width / 2), y: w.y1 + uy * (o.offset + o.width / 2) };
      const selO = isSel("opening", o.id);
      parts.push(`<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" class="gap" stroke-width="${t + px(1)}"/>`);
      if (o.type === "window") {
        const nx = -uy * t * 0.25;
        const ny = ux * t * 0.25;
        parts.push(
          `<line x1="${a.x + nx}" y1="${a.y + ny}" x2="${b.x + nx}" y2="${b.y + ny}" class="win ${selO ? "sel" : ""}" stroke-width="${px(selO ? 3 : 1.5)}"/>`,
          `<line x1="${a.x - nx}" y1="${a.y - ny}" x2="${b.x - nx}" y2="${b.y - ny}" class="win ${selO ? "sel" : ""}" stroke-width="${px(selO ? 3 : 1.5)}"/>`
        );
      } else {
        // Leaf + swing arc, hinge at `a`, opening towards the left-hand normal.
        const nx = uy;
        const ny = -ux;
        const tip = { x: a.x + nx * o.width, y: a.y + ny * o.width };
        parts.push(
          `<line x1="${a.x}" y1="${a.y}" x2="${tip.x}" y2="${tip.y}" class="door ${selO ? "sel" : ""}" stroke-width="${px(selO ? 3 : 2)}"/>`,
          `<path d="M ${tip.x} ${tip.y} A ${o.width} ${o.width} 0 0 1 ${b.x} ${b.y}" class="door-arc ${selO ? "sel" : ""}" stroke-width="${px(1)}"/>`
        );
      }
      parts.push(
        `<line data-kind="opening" data-id="${o.id}" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" class="hit" stroke-width="${Math.max(t, px(16))}"/>`
      );
    }

    // Hotspots
    for (const h of this.fp.hotspots) {
      const selH = isSel("hotspot", h.id);
      const name = h.label || (h.entity ? (this._hass?.states[h.entity]?.attributes.friendly_name ?? h.entity) : "Hitbox");
      parts.push(
        `<rect data-kind="hotspot" data-id="${h.id}" x="${h.x - h.w / 2}" y="${h.y - h.d / 2}" width="${h.w}" height="${h.d}" class="hotspot ${selH ? "sel" : ""} ${h.entity ? "" : "unbound"}" stroke-width="${px(selH ? 2.5 : 1.5)}" stroke-dasharray="${px(5)} ${px(3)}"/>`,
        `<text x="${h.x}" y="${h.y}" class="hs-name" font-size="${px(11)}">${esc(String(name))}</text>`
      );
    }

    // Selection handles and measurements
    const handle = (x: number, y: number, attrs: string) =>
      `<circle cx="${x}" cy="${y}" r="${px(6)}" class="handle" stroke-width="${px(1.5)}" ${attrs}/>`;
    if (sel?.kind === "wall") {
      const w = this.fp.walls.find((x) => x.id === sel.id);
      if (w) {
        parts.push(this.measure(w.x1, w.y1, w.x2, w.y2, w.thickness ?? defT));
        parts.push(handle(w.x1, w.y1, `data-kind="wall-end" data-id="${w.id}" data-end="1"`));
        parts.push(handle(w.x2, w.y2, `data-kind="wall-end" data-id="${w.id}" data-end="2"`));
        parts.push(`<text x="${w.x1 + px(12)}" y="${w.y1 - px(12)}" class="end-label" font-size="${px(12)}">A</text>`);
        parts.push(`<text x="${w.x2 + px(12)}" y="${w.y2 - px(12)}" class="end-label" font-size="${px(12)}">E</text>`);
      }
    } else if (sel?.kind === "room") {
      const r = this.fp.rooms.find((x) => x.id === sel.id);
      r?.points.forEach(([x, y], i) => parts.push(handle(x, y, `data-kind="room-vertex" data-id="${r.id}" data-idx="${i}"`)));
    } else if (sel?.kind === "hotspot") {
      const h = this.fp.hotspots.find((x) => x.id === sel.id);
      if (h) parts.push(handle(h.x + h.w / 2, h.y + h.d / 2, `data-kind="hs-resize" data-id="${h.id}"`));
    }

    // Drafts
    const c = this.cursor;
    if (this.draft.length && (this.tool === "wall" || this.tool === "room")) {
      const pts = [...this.draft, ...(c ? [c] : [])];
      parts.push(`<polyline points="${pts.map((p) => `${p.x},${p.y}`).join(" ")}" class="draft" stroke-width="${this.tool === "wall" ? defT : px(2)}"/>`);
      const last = this.draft[this.draft.length - 1];
      if (c) parts.push(this.measure(last.x, last.y, c.x, c.y, this.tool === "wall" ? defT : 0));
      for (const p of this.draft) parts.push(`<circle cx="${p.x}" cy="${p.y}" r="${px(4)}" class="draft-pt"/>`);
    }
    if (this.drag?.type === "rect") {
      const { start, end } = this.drag;
      const x = Math.min(start.x, end.x);
      const y = Math.min(start.y, end.y);
      const w = Math.abs(end.x - start.x);
      const h = Math.abs(end.y - start.y);
      parts.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" class="draft-rect" stroke-width="${px(2)}"/>`);
      parts.push(
        `<text x="${x + w / 2}" y="${y - px(8)}" class="measure" font-size="${px(12)}">${Math.round(w)} × ${Math.round(h)} cm</text>`
      );
    }
    if (c && this.tool !== "select" && !this.drag) {
      if (this.tool === "door" || this.tool === "window") {
        const hit = this.nearestWall(c);
        if (hit) {
          const w = hit.wall;
          const len = Math.hypot(w.x2 - w.x1, w.y2 - w.y1);
          const width = this.tool === "door" ? 90 : 120;
          const off = Math.max(width / 2, Math.min(len - width / 2, hit.offset));
          const ux = (w.x2 - w.x1) / len;
          const uy = (w.y2 - w.y1) / len;
          parts.push(
            `<line x1="${w.x1 + ux * (off - width / 2)}" y1="${w.y1 + uy * (off - width / 2)}" x2="${w.x1 + ux * (off + width / 2)}" y2="${w.y1 + uy * (off + width / 2)}" class="draft" stroke-width="${(w.thickness ?? defT) + px(4)}"/>`
          );
        }
      } else {
        parts.push(`<circle cx="${c.x}" cy="${c.y}" r="${px(4)}" class="cursor"/>`);
      }
    }

    this.svg.innerHTML = parts.join("");
    this.svg.classList.toggle("drawing", this.tool !== "select");
  }

  private measure(x1: number, y1: number, x2: number, y2: number, t: number): string {
    const len = Math.hypot(x2 - x1, y2 - y1);
    if (len < 1) return "";
    const px = (n: number) => n / this.scale;
    let ang = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
    if (ang > 90 || ang < -90) ang += 180;
    const nx = -(y2 - y1) / len;
    const ny = (x2 - x1) / len;
    const off = t / 2 + px(10);
    const mx = (x1 + x2) / 2 + nx * off;
    const my = (y1 + y2) / 2 + ny * off;
    return `<text x="${mx}" y="${my}" class="measure" font-size="${px(12)}" transform="rotate(${ang} ${mx} ${my})">${Math.round(len)} cm</text>`;
  }
}

const WIDE_KEY = "floorplan-3d-card-editor-wide";
const BASE_STYLE_ID = "fp3d-base";
/** Always injected: on narrow screens HA shows its card preview below the editor, which only duplicates our 3D view. */
const BASE_DIALOG_CSS = `
@media (max-width: 999px) { .element-preview { display: none !important; } }
`;
const WIDE_STYLE_ID = "fp3d-wide";
const WIDE_DIALOG_CSS = `
ha-dialog, ha-md-dialog, ha-wa-dialog, ha-adaptive-dialog {
  --mdc-dialog-min-width: 98vw !important; --mdc-dialog-max-width: 98vw !important;
  --mdc-dialog-min-height: 96vh !important; --mdc-dialog-max-height: 96vh !important;
  --dialog-surface-position: fixed !important; --dialog-surface-top: 0px !important; --dialog-surface-margin-top: 2vh !important;
  --vertical-align-dialog: flex-start !important;
  --ha-dialog-width-full: 98vw !important; --ha-dialog-max-width: 98vw !important;
  --ha-dialog-width-md: 98vw !important; --ha-dialog-width-lg: 98vw !important;
  --ha-dialog-min-height: 96vh !important; --ha-dialog-max-height: 96vh !important;
  --md-dialog-container-min-inline-size: 98vw !important; --md-dialog-container-max-inline-size: 98vw !important;
  --md-dialog-container-min-block-size: 96vh !important; --md-dialog-container-max-block-size: 96vh !important;
}
.element-preview { display: none !important; }
.content { max-height: none !important; }
.element-editor { width: 100% !important; max-width: none !important; flex: 1 1 100% !important; overflow: visible !important; }
`;

/** Injected into the dialog element's own shadow root so the surface really is 96vh tall, 2vh from the top. */
const WIDE_SURFACE_CSS = `
.mdc-dialog__surface, [part~="dialog"], [part~="panel"] {
  height: 96vh !important; min-height: 96vh !important; max-height: 96vh !important;
}
wa-dialog::part(dialog) {
  height: 96vh !important; min-height: 96vh !important; max-height: 96vh !important;
  margin-top: 2vh !important; margin-bottom: 2vh !important;
}
`;

const EDITOR_STYLES = `
:host {
  display: block; container-type: inline-size;
  --fp-radius: 12px;
  --fp-border: var(--divider-color, rgba(127,127,127,.25));
  --fp-surface: var(--card-background-color, #fff);
  --fp-surface-2: var(--secondary-background-color, #f5f5f5);
  --fp-accent: var(--primary-color, #03a9f4);
  --fp-on-accent: var(--text-primary-color, #fff);
  --fp-text: var(--primary-text-color, #222);
  --fp-muted: var(--secondary-text-color, #666);
}
* { box-sizing: border-box; }
h3 { margin: 0 0 10px; font-size: 13px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; color: var(--fp-muted); }

button {
  font: inherit; font-size: 13px; border: 1px solid var(--fp-border); background: var(--fp-surface);
  color: var(--fp-text); border-radius: 8px; padding: 6px 10px; cursor: pointer;
  transition: background .15s, border-color .15s, color .15s;
}
button:hover { border-color: var(--fp-accent); }
button.on { background: var(--fp-accent); color: var(--fp-on-accent); border-color: transparent; }
button.danger:hover { border-color: var(--error-color, #db4437); color: var(--error-color, #db4437); }
input, select, textarea {
  font: inherit; font-size: 14px; width: 100%; padding: 7px 9px; border: 1px solid var(--fp-border); border-radius: 8px;
  background: var(--fp-surface); color: var(--fp-text); transition: border-color .15s, box-shadow .15s;
}
input:focus, select:focus, textarea:focus { outline: none; border-color: var(--fp-accent); box-shadow: 0 0 0 2px color-mix(in srgb, var(--fp-accent) 25%, transparent); }
input[type=color] { padding: 2px; height: 34px; cursor: pointer; }
label { display: flex; flex-direction: column; gap: 4px; font-size: 12px; color: var(--fp-muted); }
label.check { flex-direction: row; align-items: center; gap: 8px; font-size: 13px; color: var(--fp-text); cursor: pointer; }
/* Round checkboxes, drawn by us so they look the same on every device. */
input[type=checkbox] {
  -webkit-appearance: none; appearance: none; flex: none; width: 20px; height: 20px; margin: 0; padding: 0;
  border: 2px solid var(--fp-muted); border-radius: 50%; background: transparent; cursor: pointer;
  display: inline-grid; place-content: center; transition: background .15s, border-color .15s;
}
input[type=checkbox]::before {
  content: ""; width: 10px; height: 10px; background: var(--fp-on-accent); transform: scale(0); transition: transform .12s;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
}
input[type=checkbox]:checked { background: var(--fp-accent); border-color: var(--fp-accent); }
input[type=checkbox]:checked::before { transform: scale(1); }
input[type=checkbox]:hover { border-color: var(--fp-accent); }
input[type=checkbox]:disabled { opacity: .4; cursor: not-allowed; }
label.check span small { display: block; font-size: 11px; color: var(--fp-muted); margin-top: 2px; }
label.check.disabled { cursor: not-allowed; color: var(--fp-muted); }
.grid2 { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; }
.grid2 .wide { grid-column: 1 / -1; }
textarea { font-family: ui-monospace, monospace; font-size: 12px; }
.row { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; }
.note { font-size: 12px; color: var(--fp-muted); line-height: 1.4; }

/* Layout: one column by default, two columns when there is room. */
.layout { display: flex; flex-direction: column; gap: 12px; }
.side { display: contents; }
.wide-btn { order: 0; }
.floors-sec, .general-sec { order: 1; }
.floor-list { margin-bottom: 10px; }
.floor-list:empty { display: none; }
.floor-row { display: flex; gap: 8px; align-items: flex-end; margin-bottom: 8px; }
.floor-row label { flex: 1; }
.floor-row button { height: 35px; }
button:disabled { opacity: .45; cursor: default; pointer-events: none; }
.main { order: 2; min-width: 0; display: flex; flex-direction: column; gap: 8px; }
.props { order: 3; }
.extra { order: 4; }

.sec { background: var(--fp-surface); border: 1px solid var(--fp-border); border-radius: var(--fp-radius); padding: 14px; }
details.sec { padding: 0; }
details.sec > summary { cursor: pointer; padding: 12px 14px; font-size: 14px; font-weight: 500; list-style: none; display: flex; align-items: center; gap: 8px; }
details.sec > summary::before { content: "›"; display: inline-block; transition: transform .15s; font-size: 18px; line-height: 1; color: var(--fp-muted); }
details.sec[open] > summary::before { transform: rotate(90deg); }
details.sec > :not(summary) { margin: 0 14px 14px; }

.wide-btn {
  display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%;
  padding: 12px 16px; font-weight: 600; font-size: 15px; border: none; border-radius: var(--fp-radius);
  background: linear-gradient(135deg, var(--fp-accent), color-mix(in srgb, var(--fp-accent) 70%, #000));
  color: var(--fp-on-accent); box-shadow: 0 4px 14px color-mix(in srgb, var(--fp-accent) 40%, transparent);
}
.wide-btn svg { width: 20px; height: 20px; fill: currentColor; }
.wide-btn:hover { filter: brightness(1.08); }
.wide-btn.on { background: var(--fp-surface-2); color: var(--fp-text); box-shadow: none; border: 1px solid var(--fp-border); }

.props-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.props-head h3 { margin: 0; }
.props .empty { font-size: 13px; color: var(--fp-muted); }
.stats { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
.stats span { font-size: 12px; padding: 3px 9px; border-radius: 999px; background: var(--fp-surface-2); color: var(--fp-muted); }
.stats b { color: var(--fp-text); }

dialog.ask {
  border: 1px solid var(--fp-border); border-radius: 16px; padding: 20px 22px 16px; width: min(420px, calc(100vw - 32px));
  background: var(--fp-surface); color: var(--fp-text); box-shadow: 0 12px 40px rgba(0,0,0,.35);
}
dialog.ask::backdrop { background: rgba(0,0,0,.45); }
dialog.ask h4 { margin: 0 0 8px; font-size: 17px; font-weight: 600; }
dialog.ask p { margin: 0 0 18px; font-size: 14px; line-height: 1.45; color: var(--fp-muted); }
.ask-actions { display: flex; justify-content: flex-end; gap: 8px; }
.ask-actions button { padding: 8px 14px; }
button.danger-fill { background: var(--error-color, #db4437); border-color: transparent; color: #fff; }
button.danger-fill:hover { filter: brightness(1.1); border-color: transparent; }

.combo { position: relative; }
.combo-list {
  position: absolute; left: 0; right: 0; top: calc(100% + 4px); z-index: 20; max-height: 280px; overflow-y: auto;
  background: var(--fp-surface); border: 1px solid var(--fp-border); border-radius: 10px; padding: 4px;
  box-shadow: 0 8px 24px rgba(0,0,0,.25);
}
.combo-list[hidden] { display: none; }
.combo-list .opt { display: flex; flex-direction: column; gap: 1px; padding: 7px 10px; border-radius: 7px; cursor: pointer; }
.combo-list .opt b { font-weight: 500; font-size: 13px; color: var(--fp-text); }
.combo-list .opt span { font-size: 11px; color: var(--fp-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.combo-list .opt:hover, .combo-list .opt.act { background: color-mix(in srgb, var(--fp-accent) 14%, transparent); }
.combo-list .none { padding: 8px 10px; font-size: 13px; color: var(--fp-muted); }

.seg { display: inline-flex; flex-wrap: wrap; gap: 2px; padding: 3px; border-radius: 10px; background: var(--fp-surface-2); border: 1px solid var(--fp-border); }
.seg button { border: none; background: transparent; border-radius: 7px; display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px; }
.seg button:hover { background: color-mix(in srgb, var(--fp-accent) 12%, transparent); }
.seg button.on { background: var(--fp-accent); color: var(--fp-on-accent); box-shadow: 0 1px 3px rgba(0,0,0,.2); }
.seg svg { width: 16px; height: 16px; fill: currentColor; }
.topbar { display: flex; align-items: center; gap: 8px; }
.toolbar { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.toolbar .sep { flex: 1; }
.toolbar .actions button { padding: 6px 8px; }
.toolbar .snap { flex-direction: row; align-items: center; gap: 6px; font-size: 13px; color: var(--fp-text); }
.hint { font-size: 12px; color: var(--fp-muted); padding: 6px 10px; border-radius: 8px; background: var(--fp-surface-2); }

.canvas, .pane-3d .viewer3d {
  position: relative; height: clamp(420px, 62vh, 820px); border: 1px solid var(--fp-border); border-radius: var(--fp-radius);
  overflow: hidden; outline: none; background: var(--fp-surface-2); touch-action: none; isolation: isolate;
  box-shadow: inset 0 1px 3px rgba(0,0,0,.06);
}
.canvas:focus-visible { border-color: var(--fp-accent); }
.canvas svg { width: 100%; height: 100%; display: block; user-select: none; }
.canvas svg.drawing { cursor: crosshair; }
.tools2d { display: flex; flex-direction: column; gap: 8px; }
.panes { display: flex; flex-direction: column; gap: 8px; min-height: 0; }
.pane-2d, .pane-3d { display: flex; flex-direction: column; min-height: 0; min-width: 0; }
.tools2d[hidden], .pane-2d[hidden], .pane-3d[hidden], .cam[hidden] { display: none; }
.main .cam { margin-top: 0; }
.main.both .canvas, .main.both .pane-3d .viewer3d { height: clamp(260px, 32vh, 480px); }

.grid-minor { stroke: var(--divider-color, #ddd); opacity: .5; }
.grid-major { stroke: var(--divider-color, #bbb); }
.room { stroke: var(--fp-accent); cursor: pointer; }
.room-name { text-anchor: middle; dominant-baseline: middle; fill: var(--fp-text); opacity: .6; pointer-events: none; font-weight: 600; }
.room-area { text-anchor: middle; dominant-baseline: middle; fill: var(--fp-text); opacity: .55; pointer-events: none; }
.wall { stroke: var(--fp-text); pointer-events: none; }
.ghost { stroke: var(--fp-text); opacity: .13; pointer-events: none; }
.wall.sel { stroke: var(--fp-accent); }
.hit { stroke: transparent; cursor: pointer; }
.gap { stroke: var(--fp-surface-2); pointer-events: none; }
.win { stroke: #3b8fd9; pointer-events: none; }
.door, .door-arc { stroke: #8b5a2b; fill: none; pointer-events: none; }
.win.sel, .door.sel, .door-arc.sel { stroke: var(--fp-accent); }
.hotspot { fill: rgba(63,167,255,.18); stroke: #3fa7ff; cursor: move; }
.hotspot.unbound { fill: rgba(255,152,0,.15); stroke: #ff9800; }
.hotspot.sel { stroke: var(--fp-accent); fill: rgba(63,167,255,.35); }
.hs-name { text-anchor: middle; dominant-baseline: middle; fill: var(--fp-text); pointer-events: none; }
.handle { fill: #fff; stroke: var(--fp-accent); cursor: grab; }
.draft { stroke: var(--fp-accent); stroke-opacity: .55; fill: none; pointer-events: none; stroke-linecap: square; stroke-linejoin: miter; }
.draft-pt, .cursor { fill: var(--fp-accent); pointer-events: none; }
.draft-rect { fill: rgba(3,169,244,.12); stroke: var(--fp-accent); pointer-events: none; }
.measure, .end-label { text-anchor: middle; dominant-baseline: middle; fill: var(--fp-accent); font-weight: 700; pointer-events: none; paint-order: stroke; stroke: var(--fp-surface-2); stroke-width: 3px; }

@container (min-width: 900px) {
  .layout { display: grid; grid-template-columns: minmax(300px, 380px) minmax(0, 1fr); gap: 16px; align-items: start; }
  .side { display: flex; flex-direction: column; gap: 12px; min-width: 0; }
  .main { position: sticky; top: 0; }
  .canvas, .pane-3d .viewer3d { height: max(460px, calc(100vh - 260px)); }
  /* 2D + 3D: side by side, 2D on the left. */
  .main.both .panes { flex-direction: row; }
  .main.both .pane-2d, .main.both .pane-3d { flex: 1 1 0; }
  .main.both .canvas, .main.both .pane-3d .viewer3d { height: max(460px, calc(100vh - 260px)); }
  .grid2 { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }

  /* Großansicht: the editor exactly fills the dialog; only the left column scrolls. */
  :host(.wide) .layout { height: 100%; align-items: stretch; }
  :host(.wide) .side { overflow-y: auto; padding-right: 4px; min-height: 0; }
  :host(.wide) .main { position: static; min-height: 0; overflow-y: auto; }
  :host(.wide) .panes { flex: 1 1 0; }
  :host(.wide) .pane-2d, :host(.wide) .pane-3d { flex: 1 1 0; }
  :host(.wide) .canvas, :host(.wide) .pane-3d .viewer3d { flex: 1 1 0; height: auto; min-height: 150px; }
}
`;
