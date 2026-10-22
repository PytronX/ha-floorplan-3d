import { domainOf, fireMoreInfo, formatState, friendlyName, isActive, lightBrightness, lightColor } from "./ha";
import type { Hass, HassEntity } from "./types";

// The card's own info window, used instead of Home Assistant's more-info dialog: big controls
// for the common domains, a history chart for sensors and a live picture for cameras.

const icon = (d: string) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>`;
const I = {
  close: "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
  more: "M12 16a2 2 0 1 1 0 4 2 2 0 0 1 0-4m0-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4m0-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4",
  power: "M16.56 5.44 15.11 6.89A5.97 5.97 0 0 1 18 12a6 6 0 0 1-12 0c0-2.17 1.16-4.06 2.88-5.12L7.44 5.44A7.96 7.96 0 0 0 4 12a8 8 0 0 0 16 0c0-2.72-1.36-5.12-3.44-6.56M13 3h-2v10h2z",
  up: "M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z",
  down: "M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z",
  stop: "M7 7h10v10H7z",
  minus: "M19 13H5v-2h14z",
  plus: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z",
  play: "M8 5.14v14l11-7z",
  pause: "M14 19h4V5h-4M6 19h4V5H6z",
  prev: "M6 18V6h2v12zm3.5-6L18 6v12z",
  next: "M16 18h2V6h-2zM6 18l8.5-6L6 6z",
  refresh: "M17.65 6.35A7.96 7.96 0 0 0 12 4a8 8 0 1 0 7.73 10h-2.08A6 6 0 1 1 12 6c1.66 0 3.14.69 4.22 1.78L13 11h7V4z",
  live: "M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11z",
  lock: "M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 10 0v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3",
  unlock: "M18 8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h9V6a3 3 0 0 0-6 0H7a5 5 0 0 1 10 0v2zm-6 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4",
  bulb: "M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7M9 21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1H9z",
};

const DOMAIN_ICON: Record<string, string> = {
  light: "mdi:lightbulb",
  switch: "mdi:toggle-switch-variant",
  sensor: "mdi:eye",
  binary_sensor: "mdi:checkbox-blank-circle-outline",
  camera: "mdi:video",
  cover: "mdi:window-shutter",
  climate: "mdi:thermostat",
  media_player: "mdi:cast",
  lock: "mdi:lock",
  fan: "mdi:fan",
  scene: "mdi:palette",
  script: "mdi:script-text",
  button: "mdi:gesture-tap-button",
  input_boolean: "mdi:toggle-switch-outline",
  person: "mdi:account",
  vacuum: "mdi:robot-vacuum",
};

const COLORS = ["#ff3b30", "#ff9500", "#ffcc00", "#34c759", "#00c7be", "#007aff", "#5856d6", "#af52de", "#ff2d92"];
const TEMPS: [number, string][] = [
  [2200, "Kerze"],
  [2700, "Warm"],
  [3500, "Natur"],
  [4500, "Neutral"],
  [6000, "Kalt"],
];
const HVAC: Record<string, string> = {
  off: "Aus",
  heat: "Heizen",
  cool: "Kühlen",
  auto: "Auto",
  heat_cool: "Heizen/Kühlen",
  dry: "Entfeuchten",
  fan_only: "Lüften",
};
const TOGGLES = new Set(["switch", "input_boolean", "fan", "automation", "siren", "humidifier", "group"]);
const RUNNABLE = new Set(["scene", "script", "button", "input_button"]);
const NO_HISTORY = new Set(["camera", "scene", "script", "button", "input_button", "event"]);
const RANGES: [number, string][] = [
  [6, "6 Std."],
  [24, "24 Std."],
  [168, "7 Tage"],
];

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

interface Point {
  t: number;
  s: string;
}

export class InfoPopup {
  private dlg: HTMLDialogElement;
  private hass?: Hass;
  private id?: string;
  private shown?: HassEntity;
  private range = 24;
  private history?: Point[];
  private historyFor?: string;
  private camTimer?: number;
  private live = false;
  /** While a slider is dragged, state updates must not re-render under the finger. */
  private busyUntil = 0;

  constructor(
    root: ShadowRoot,
    private host: HTMLElement
  ) {
    this.dlg = document.createElement("dialog");
    this.dlg.className = "fp-pop";
    this.dlg.tabIndex = -1;
    root.appendChild(this.dlg);
    this.dlg.addEventListener("keydown", (ev) => ev.stopPropagation());
    this.dlg.addEventListener("click", (ev) => {
      if (ev.target === this.dlg) this.dlg.close();
    });
    this.dlg.addEventListener("close", () => this.onClosed());
  }

  open(hass: Hass, entityId: string): void {
    this.hass = hass;
    this.id = entityId;
    this.live = false;
    this.history = undefined;
    this.historyFor = undefined;
    const s = hass.states[entityId];
    const domain = domainOf(entityId);
    this.dlg.classList.toggle("wide", domain === "camera");
    this.dlg.innerHTML = `
      <div class="pop-head">
        <div class="pop-icon"></div>
        <div class="pop-title"><b></b><span class="pop-sub"></span></div>
        <button class="pop-btn" data-a="more" title="Home-Assistant-Dialog öffnen (Einstellungen, Verlauf)">${icon(I.more)}</button>
        <button class="pop-btn" data-a="close" title="Schließen">${icon(I.close)}</button>
      </div>
      <div class="pop-body"></div>
      ${domain === "camera" ? "" : NO_HISTORY.has(domain) ? "" : `<div class="pop-hist"><div class="hist-head"><span>Verlauf</span><div class="chips">${RANGES.map(([h, l]) => `<button data-range="${h}" class="${h === this.range ? "on" : ""}">${l}</button>`).join("")}</div></div><div class="chart"><div class="loading">Lade Verlauf …</div></div></div>`}
      <details class="pop-attrs"><summary>Attribute</summary><div class="attr-list"></div></details>`;
    this.dlg.querySelector('[data-a="close"]')!.addEventListener("click", () => this.dlg.close());
    this.dlg.querySelector('[data-a="more"]')!.addEventListener("click", () => {
      const id = this.id!;
      this.dlg.close();
      fireMoreInfo(this.host, id);
    });
    this.dlg.querySelector(".chips")?.addEventListener("click", (ev) => {
      const b = (ev.target as HTMLElement).closest<HTMLButtonElement>("button[data-range]");
      if (!b) return;
      this.range = Number(b.dataset.range);
      this.dlg.querySelectorAll(".chips button").forEach((x) => x.classList.toggle("on", x === b));
      this.loadHistory();
    });
    this.shown = s;
    this.render();
    if (!this.dlg.open) this.dlg.showModal();
    // Focus the window itself, not its first button.
    this.dlg.focus();
    this.loadHistory();
  }

  update(hass: Hass): void {
    this.hass = hass;
    if (!this.dlg.open || !this.id) return;
    const s = hass.states[this.id];
    if (s === this.shown) return;
    this.shown = s;
    if (Date.now() < this.busyUntil) return;
    this.render();
  }

  close(): void {
    if (this.dlg.open) this.dlg.close();
  }

  private onClosed(): void {
    // The close event comes late; the window may already show the next entity.
    if (this.dlg.open) return;
    if (this.camTimer) window.clearInterval(this.camTimer);
    this.camTimer = undefined;
    // Stops a running camera stream.
    this.dlg.querySelectorAll("img").forEach((img) => img.removeAttribute("src"));
    this.id = undefined;
  }

  // ------------------------------------------------------------ rendering

  private render(): void {
    const hass = this.hass!;
    const id = this.id!;
    const s = hass.states[id];
    const domain = domainOf(id);
    const on = isActive(s);
    const lightRgb = domain === "light" && on ? lightColor(s) : undefined;

    const iconBox = this.dlg.querySelector<HTMLElement>(".pop-icon")!;
    iconBox.classList.toggle("on", on);
    iconBox.style.setProperty("--pop-icon-color", lightRgb ? `rgb(${lightRgb.join(",")})` : "");
    iconBox.replaceChildren(this.stateIcon(s, domain));
    this.dlg.querySelector(".pop-title b")!.textContent = friendlyName(s, id);
    this.dlg.querySelector(".pop-sub")!.textContent = s ? [formatState(hass, s), this.since(s)].filter(Boolean).join(" · ") : "Entität nicht gefunden";

    const body = this.dlg.querySelector<HTMLElement>(".pop-body")!;
    body.replaceChildren();
    if (!s) {
      body.innerHTML = `<div class="big-value">—</div>`;
    } else if (domain === "light") this.renderLight(body, s);
    else if (domain === "cover") this.renderCover(body, s);
    else if (domain === "climate") this.renderClimate(body, s);
    else if (domain === "camera") this.renderCamera(body, s);
    else if (domain === "media_player") this.renderMedia(body, s);
    else if (domain === "lock") this.renderLock(body, s);
    else if (domain === "number" || domain === "input_number") this.renderNumber(body, s);
    else if (domain === "select" || domain === "input_select") this.renderSelect(body, s);
    else if (TOGGLES.has(domain)) this.renderToggle(body, s);
    else if (RUNNABLE.has(domain)) this.renderRun(body, s);
    else this.renderValue(body, s);

    const attrs = this.dlg.querySelector<HTMLElement>(".attr-list")!;
    const skip = new Set(["friendly_name", "icon", "entity_picture", "supported_features", "supported_color_modes", "access_token"]);
    const rows = Object.entries(s?.attributes ?? {}).filter(([k, v]) => !skip.has(k) && v !== null && typeof v !== "object");
    attrs.innerHTML = rows.length
      ? rows.map(([k, v]) => `<div><span>${esc(k.replace(/_/g, " "))}</span><b>${esc(String(v))}</b></div>`).join("")
      : `<div class="none">Keine weiteren Attribute.</div>`;
    (this.dlg.querySelector(".pop-attrs") as HTMLElement).hidden = !rows.length;
  }

  private stateIcon(s: HassEntity | undefined, domain: string): HTMLElement {
    if (s && customElements.get("ha-state-icon")) {
      const el = document.createElement("ha-state-icon") as any;
      el.hass = this.hass;
      el.stateObj = s;
      return el;
    }
    const name = (s?.attributes.icon as string) || DOMAIN_ICON[domain];
    if (name && customElements.get("ha-icon")) {
      const el = document.createElement("ha-icon");
      el.setAttribute("icon", name);
      return el;
    }
    const span = document.createElement("span");
    span.innerHTML = domain === "light" ? icon(I.bulb) : `<b>${esc((friendlyName(s, this.id!)[0] ?? "?").toUpperCase())}</b>`;
    return span;
  }

  private since(s: HassEntity): string {
    const t = Date.parse(s.last_changed ?? "");
    if (!t) return "";
    const sec = Math.round((t - Date.now()) / 1000);
    const rtf = new Intl.RelativeTimeFormat(this.hass?.language || "de", { numeric: "auto" });
    const abs = Math.abs(sec);
    if (abs < 60) return rtf.format(sec, "second");
    if (abs < 3600) return rtf.format(Math.round(sec / 60), "minute");
    if (abs < 86400) return rtf.format(Math.round(sec / 3600), "hour");
    return rtf.format(Math.round(sec / 86400), "day");
  }

  private call(domain: string, service: string, data: Record<string, unknown> = {}): void {
    this.hass?.callService(domain, service, { entity_id: this.id, ...data }).catch((err) => console.error("floorplan-3d-card:", err));
  }

  private bigToggle(body: HTMLElement, s: HassEntity, label = "Ein / Aus"): HTMLButtonElement {
    const on = isActive(s);
    const b = document.createElement("button");
    b.className = `big-toggle ${on ? "on" : ""}`;
    b.innerHTML = `${icon(I.power)}<span>${on ? "Eingeschaltet" : "Ausgeschaltet"}</span><small>${label}</small>`;
    b.addEventListener("click", () => this.call("homeassistant", "toggle"));
    body.appendChild(b);
    return b;
  }

  /** Horizontal slider 0..100 that reports while dragging and commits on release. */
  private slider(
    value: number,
    color: string,
    text: (v: number) => string,
    commit: (v: number) => void,
    opts: { min?: number; max?: number; step?: number; cls?: string; iconPath?: string } = {}
  ): HTMLElement {
    const min = opts.min ?? 0;
    const max = opts.max ?? 100;
    const step = opts.step ?? 1;
    const el = document.createElement("div");
    el.className = `pop-slider ${opts.cls ?? ""}`;
    el.tabIndex = 0;
    el.setAttribute("role", "slider");
    el.innerHTML = `<div class="fill"></div>${opts.iconPath ? icon(opts.iconPath) : ""}<span></span>`;
    el.style.setProperty("--fill-color", color);
    const fill = el.querySelector<HTMLElement>(".fill")!;
    const label = el.querySelector("span")!;
    let v = value;
    const show = () => {
      fill.style.width = `${((v - min) / (max - min || 1)) * 100}%`;
      label.textContent = text(v);
      el.setAttribute("aria-valuenow", String(v));
    };
    const at = (ev: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const f = Math.max(0, Math.min(1, (ev.clientX - r.left) / r.width));
      v = Math.round((min + f * (max - min)) / step) * step;
      v = Math.max(min, Math.min(max, Number(v.toFixed(4))));
      show();
    };
    let dragging = false;
    el.addEventListener("pointerdown", (ev) => {
      dragging = true;
      this.busyUntil = Date.now() + 60000;
      el.setPointerCapture(ev.pointerId);
      el.classList.add("drag");
      at(ev);
    });
    el.addEventListener("pointermove", (ev) => dragging && at(ev));
    const end = () => {
      if (!dragging) return;
      dragging = false;
      el.classList.remove("drag");
      this.busyUntil = Date.now() + 1500;
      commit(v);
    };
    el.addEventListener("pointerup", end);
    el.addEventListener("pointercancel", end);
    el.addEventListener("keydown", (ev) => {
      if (ev.key !== "ArrowRight" && ev.key !== "ArrowLeft") return;
      ev.preventDefault();
      v = Math.max(min, Math.min(max, v + (ev.key === "ArrowRight" ? step : -step) * (step < 5 ? 5 : 1)));
      show();
      commit(v);
    });
    show();
    return el;
  }

  private renderLight(body: HTMLElement, s: HassEntity): void {
    const modes = (s.attributes.supported_color_modes as string[] | undefined) ?? [];
    const dimmable = modes.some((m) => m !== "onoff") || s.attributes.brightness != null;
    const on = s.state === "on";
    const rgb = lightColor(s);
    if (!dimmable) {
      this.bigToggle(body, s);
      return;
    }
    const row = document.createElement("div");
    row.className = "light-row";
    const pct = Math.round(lightBrightness(s) * 100);
    {
      row.appendChild(
        this.slider(on ? pct : 0, `rgb(${rgb.join(",")})`, (v) => (v ? `${v} %` : "Aus"), (v) => {
          if (v <= 0) this.call("light", "turn_off");
          else this.call("light", "turn_on", { brightness_pct: v });
        }, { cls: "tall", iconPath: I.bulb, min: 0, max: 100 })
      );
    }
    const power = document.createElement("button");
    power.className = `round-btn ${on ? "on" : ""}`;
    power.title = on ? "Ausschalten" : "Einschalten";
    power.style.setProperty("--btn-color", `rgb(${rgb.join(",")})`);
    power.innerHTML = icon(I.power);
    power.addEventListener("click", () => this.call("light", "toggle"));
    row.appendChild(power);
    body.appendChild(row);

    const colorModes = ["hs", "xy", "rgb", "rgbw", "rgbww"];
    if (modes.some((m) => colorModes.includes(m))) {
      const sw = document.createElement("div");
      sw.className = "swatches";
      sw.innerHTML =
        `<span class="sec-label">Farbe</span>` +
        COLORS.map((c) => `<button class="swatch" data-c="${c}" style="background:${c}" title="${c}"></button>`).join("") +
        `<label class="swatch custom" title="Eigene Farbe"><input type="color" value="#${rgb.map((x) => x.toString(16).padStart(2, "0")).join("")}"></label>`;
      sw.addEventListener("click", (ev) => {
        const b = (ev.target as HTMLElement).closest<HTMLElement>("[data-c]");
        if (b) this.call("light", "turn_on", { rgb_color: hexRgb(b.dataset.c!) });
      });
      sw.querySelector("input")!.addEventListener("change", (ev) => this.call("light", "turn_on", { rgb_color: hexRgb((ev.target as HTMLInputElement).value) }));
      body.appendChild(sw);
    }
    if (modes.includes("color_temp")) {
      const lo = (s.attributes.min_color_temp_kelvin as number) ?? 2000;
      const hi = (s.attributes.max_color_temp_kelvin as number) ?? 6500;
      const cur = s.attributes.color_mode === "color_temp" ? (s.attributes.color_temp_kelvin as number | undefined) : undefined;
      const temps = document.createElement("div");
      temps.className = "temps";
      temps.innerHTML =
        `<span class="sec-label">Weißton</span>` +
        TEMPS.filter(([k]) => k >= lo - 200 && k <= hi + 200)
          .map(([k, l]) => {
            const v = Math.max(lo, Math.min(hi, k));
            const near = cur != null && Math.abs(cur - v) < 300;
            return `<button data-k="${v}" class="${near ? "on" : ""}"><i style="background:${kelvinCss(v)}"></i>${l}</button>`;
          })
          .join("");
      temps.addEventListener("click", (ev) => {
        const b = (ev.target as HTMLElement).closest<HTMLElement>("[data-k]");
        if (b) this.call("light", "turn_on", { color_temp_kelvin: Number(b.dataset.k) });
      });
      body.appendChild(temps);
    }
  }

  private renderToggle(body: HTMLElement, s: HassEntity): void {
    this.bigToggle(body, s);
  }

  private renderRun(body: HTMLElement, s: HassEntity): void {
    const d = domainOf(s.entity_id);
    const b = document.createElement("button");
    b.className = "big-toggle run";
    b.innerHTML = `${icon(I.play)}<span>${d === "scene" ? "Szene aktivieren" : d === "script" ? "Skript ausführen" : "Drücken"}</span>`;
    b.addEventListener("click", () => {
      if (d === "button" || d === "input_button") this.call(d, "press");
      else this.call(d, "turn_on");
      b.classList.add("done");
      setTimeout(() => b.classList.remove("done"), 900);
    });
    body.appendChild(b);
  }

  private renderValue(body: HTMLElement, s: HassEntity): void {
    const unit = s.attributes.unit_of_measurement as string | undefined;
    const num = Number(s.state);
    const el = document.createElement("div");
    el.className = "big-value";
    if (unit && s.state !== "" && Number.isFinite(num)) {
      el.innerHTML = `${esc(num.toLocaleString(this.hass?.language || "de", { maximumFractionDigits: 2 }))}<small>${esc(unit)}</small>`;
    } else {
      el.textContent = formatState(this.hass!, s);
      el.classList.add("text");
      el.classList.toggle("on", isActive(s));
    }
    body.appendChild(el);
  }

  private renderCover(body: HTMLElement, s: HassEntity): void {
    const pos = s.attributes.current_position as number | undefined;
    if (pos != null) {
      body.appendChild(
        this.slider(pos, "var(--primary-color, #03a9f4)", (v) => (v >= 100 ? "Offen" : v <= 0 ? "Geschlossen" : `${v} % offen`), (v) =>
          this.call("cover", "set_cover_position", { position: v }), { cls: "tall" })
      );
    } else {
      this.renderValue(body, s);
    }
    const row = document.createElement("div");
    row.className = "btn-row";
    row.innerHTML = `<button data-s="open_cover">${icon(I.up)}<span>Öffnen</span></button><button data-s="stop_cover">${icon(I.stop)}<span>Stopp</span></button><button data-s="close_cover">${icon(I.down)}<span>Schließen</span></button>`;
    row.addEventListener("click", (ev) => {
      const b = (ev.target as HTMLElement).closest<HTMLElement>("[data-s]");
      if (b) this.call("cover", b.dataset.s!);
    });
    body.appendChild(row);
  }

  private renderClimate(body: HTMLElement, s: HassEntity): void {
    const a = s.attributes;
    const lang = this.hass?.language || "de";
    const fmt = (n: number | undefined) => (n == null ? "—" : n.toLocaleString(lang, { minimumFractionDigits: 1, maximumFractionDigits: 1 }));
    const step = (a.target_temp_step as number) ?? 0.5;
    let target = a.temperature as number | undefined;
    const box = document.createElement("div");
    box.className = "climate";
    box.innerHTML = `
      <div class="cur"><small>Aktuell</small><b>${fmt(a.current_temperature)}<i>°</i></b>${a.hvac_action ? `<small class="act">${esc(String(a.hvac_action) === "heating" ? "heizt" : String(a.hvac_action) === "cooling" ? "kühlt" : String(a.hvac_action) === "idle" ? "inaktiv" : String(a.hvac_action))}</small>` : ""}</div>
      ${target != null ? `<div class="target"><button data-d="-1" title="Kälter">${icon(I.minus)}</button><div><small>Ziel</small><b>${fmt(target)}<i>°</i></b></div><button data-d="1" title="Wärmer">${icon(I.plus)}</button></div>` : ""}`;
    let timer: number | undefined;
    box.querySelectorAll<HTMLButtonElement>("[data-d]").forEach((b) =>
      b.addEventListener("click", () => {
        if (target == null) return;
        const min = (a.min_temp as number) ?? 5;
        const max = (a.max_temp as number) ?? 35;
        target = Math.max(min, Math.min(max, Math.round((target + Number(b.dataset.d) * step) / step) * step));
        box.querySelector(".target b")!.innerHTML = `${fmt(target)}<i>°</i>`;
        this.busyUntil = Date.now() + 2500;
        // Several quick taps become one service call.
        if (timer) window.clearTimeout(timer);
        timer = window.setTimeout(() => this.call("climate", "set_temperature", { temperature: target }), 700);
      })
    );
    body.appendChild(box);
    const modes = (a.hvac_modes as string[] | undefined) ?? [];
    if (modes.length) {
      const chips = document.createElement("div");
      chips.className = "chips-row";
      chips.innerHTML = modes.map((m) => `<button data-m="${esc(m)}" class="${s.state === m ? "on" : ""}">${esc(HVAC[m] ?? m)}</button>`).join("");
      chips.addEventListener("click", (ev) => {
        const b = (ev.target as HTMLElement).closest<HTMLElement>("[data-m]");
        if (b) this.call("climate", "set_hvac_mode", { hvac_mode: b.dataset.m });
      });
      body.appendChild(chips);
    }
  }

  private renderCamera(body: HTMLElement, s: HassEntity): void {
    const pic = s.attributes.entity_picture as string | undefined;
    const wrap = document.createElement("div");
    wrap.className = "cam";
    if (!pic) {
      wrap.innerHTML = `<div class="cam-off">Kein Bild verfügbar</div>`;
      body.appendChild(wrap);
      return;
    }
    const url = (p: string) => (this.hass?.hassUrl ? this.hass.hassUrl(p) : p);
    const img = document.createElement("img");
    img.alt = friendlyName(s, s.entity_id);
    const snapshot = () => {
      img.src = url(`${pic}${pic.includes("?") ? "&" : "?"}_t=${Date.now()}`);
    };
    if (this.live) img.src = url(pic.replace("/api/camera_proxy/", "/api/camera_proxy_stream/"));
    else snapshot();
    img.addEventListener("error", () => wrap.classList.add("err"));
    img.addEventListener("load", () => wrap.classList.remove("err"));
    wrap.appendChild(img);
    const bar = document.createElement("div");
    bar.className = "cam-bar";
    bar.innerHTML = `<span class="badge ${this.live ? "live" : ""}">${this.live ? "● LIVE" : "Standbild"}</span><span class="grow"></span>
      <button data-c="snap" title="Neues Standbild">${icon(I.refresh)}</button>
      <button data-c="live" class="${this.live ? "on" : ""}" title="Live-Bild">${icon(I.live)}<span>${this.live ? "Live an" : "Live"}</span></button>`;
    bar.addEventListener("click", (ev) => {
      const b = (ev.target as HTMLElement).closest<HTMLElement>("[data-c]");
      if (!b) return;
      if (b.dataset.c === "snap") {
        this.live = false;
        this.render();
      } else {
        this.live = !this.live;
        this.render();
      }
    });
    wrap.appendChild(bar);
    body.appendChild(wrap);
    if (this.camTimer) window.clearInterval(this.camTimer);
    this.camTimer = this.live ? undefined : window.setInterval(() => (this.dlg.open ? snapshot() : undefined), 10000);
  }

  private renderMedia(body: HTMLElement, s: HassEntity): void {
    const a = s.attributes;
    const on = s.state !== "off" && s.state !== "unavailable" && s.state !== "standby";
    const box = document.createElement("div");
    box.className = "media";
    const pic = a.entity_picture as string | undefined;
    box.innerHTML = `
      ${pic ? `<img src="${esc(this.hass?.hassUrl ? this.hass.hassUrl(pic) : pic)}" alt="">` : ""}
      <div class="media-info"><b>${esc(String(a.media_title ?? (on ? formatState(this.hass!, s) : "Aus")))}</b><span>${esc(String(a.media_artist ?? a.media_album_name ?? a.app_name ?? ""))}</span></div>`;
    body.appendChild(box);
    const row = document.createElement("div");
    row.className = "btn-row media-btns";
    row.innerHTML = `<button data-s="media_previous_track" title="Zurück">${icon(I.prev)}</button><button data-s="media_play_pause" class="main" title="Wiedergabe / Pause">${icon(s.state === "playing" ? I.pause : I.play)}</button><button data-s="media_next_track" title="Weiter">${icon(I.next)}</button><button data-s="toggle" title="Ein / Aus" class="${on ? "on" : ""}">${icon(I.power)}</button>`;
    row.addEventListener("click", (ev) => {
      const b = (ev.target as HTMLElement).closest<HTMLElement>("[data-s]");
      if (b) this.call("media_player", b.dataset.s!);
    });
    body.appendChild(row);
    if (a.volume_level != null) {
      body.appendChild(
        this.slider(Math.round((a.volume_level as number) * 100), "var(--primary-color, #03a9f4)", (v) => `Lautstärke ${v} %`, (v) =>
          this.call("media_player", "volume_set", { volume_level: v / 100 }))
      );
    }
  }

  private renderLock(body: HTMLElement, s: HassEntity): void {
    const locked = s.state === "locked";
    const b = document.createElement("button");
    b.className = `big-toggle ${locked ? "" : "on"}`;
    b.innerHTML = `${icon(locked ? I.lock : I.unlock)}<span>${locked ? "Verriegelt" : "Entriegelt"}</span><small>${locked ? "Tippen zum Entriegeln" : "Tippen zum Verriegeln"}</small>`;
    b.addEventListener("click", () => this.call("lock", locked ? "unlock" : "lock"));
    body.appendChild(b);
  }

  private renderNumber(body: HTMLElement, s: HassEntity): void {
    const a = s.attributes;
    const unit = (a.unit_of_measurement as string) ?? "";
    body.appendChild(
      this.slider(Number(s.state) || 0, "var(--primary-color, #03a9f4)", (v) => `${v.toLocaleString(this.hass?.language || "de")} ${unit}`.trim(), (v) =>
        this.call(domainOf(s.entity_id), "set_value", { value: v }), { min: a.min ?? 0, max: a.max ?? 100, step: a.step ?? 1, cls: "tall" })
    );
  }

  private renderSelect(body: HTMLElement, s: HassEntity): void {
    const chips = document.createElement("div");
    chips.className = "chips-row";
    chips.innerHTML = ((s.attributes.options as string[]) ?? []).map((o) => `<button data-o="${esc(o)}" class="${s.state === o ? "on" : ""}">${esc(o)}</button>`).join("");
    chips.addEventListener("click", (ev) => {
      const b = (ev.target as HTMLElement).closest<HTMLElement>("[data-o]");
      if (b) this.call(domainOf(s.entity_id), "select_option", { option: b.dataset.o });
    });
    body.appendChild(chips);
  }

  // -------------------------------------------------------------- history

  private async loadHistory(): Promise<void> {
    const chart = this.dlg.querySelector<HTMLElement>(".pop-hist .chart");
    const id = this.id;
    if (!chart || !id || !this.hass) return;
    if (!this.hass.callWS) {
      chart.innerHTML = `<div class="loading">Verlauf nicht verfügbar.</div>`;
      return;
    }
    const key = `${id}|${this.range}`;
    this.historyFor = key;
    chart.innerHTML = `<div class="loading">Lade Verlauf …</div>`;
    const start = new Date(Date.now() - this.range * 3600e3);
    try {
      const res = await this.hass.callWS<Record<string, any[]>>({
        type: "history/history_during_period",
        start_time: start.toISOString(),
        entity_ids: [id],
        minimal_response: true,
        no_attributes: true,
        significant_changes_only: false,
      });
      if (this.historyFor !== key || !this.dlg.open) return;
      const pts: Point[] = (res?.[id] ?? [])
        .map((e) => ({
          t: e.lu != null ? e.lu * 1000 : e.lc != null ? e.lc * 1000 : Date.parse(e.last_changed ?? e.last_updated ?? ""),
          s: String(e.s ?? e.state ?? ""),
        }))
        .filter((p) => Number.isFinite(p.t));
      this.history = pts;
      this.drawHistory(chart, pts, start.getTime());
    } catch (err) {
      if (this.historyFor === key) chart.innerHTML = `<div class="loading">Verlauf konnte nicht geladen werden.</div>`;
      console.warn("floorplan-3d-card: Verlauf", err);
    }
  }

  private drawHistory(chart: HTMLElement, pts: Point[], start: number): void {
    const s = this.hass?.states[this.id!];
    const unit = s?.attributes.unit_of_measurement as string | undefined;
    const valid = pts.filter((p) => p.s !== "unavailable" && p.s !== "unknown" && p.s !== "");
    const numeric = valid.length > 0 && valid.every((p) => p.s.trim() !== "" && Number.isFinite(Number(p.s))) && (!!unit || domainOf(this.id!) === "sensor");
    if (!pts.length) {
      chart.innerHTML = `<div class="loading">Keine Daten im Zeitraum.</div>`;
      return;
    }
    if (numeric) this.lineChart(chart, valid, start, unit ?? "");
    else this.timeline(chart, pts, start);
  }

  private timeLabel(t: number): string {
    const lang = this.hass?.language || "de";
    const d = new Date(t);
    return this.range > 24
      ? d.toLocaleDateString(lang, { weekday: "short", day: "numeric", month: "numeric" })
      : d.toLocaleTimeString(lang, { hour: "2-digit", minute: "2-digit" });
  }

  private lineChart(chart: HTMLElement, pts: Point[], start: number, unit: string): void {
    const lang = this.hass?.language || "de";
    const W = Math.max(260, chart.clientWidth || 420);
    const H = 170;
    const pad = { l: 40, r: 10, t: 12, b: 24 };
    const end = Date.now();
    const vals = pts.map((p) => Number(p.s));
    let lo = Math.min(...vals);
    let hi = Math.max(...vals);
    if (hi - lo < 1e-9) {
      lo -= 1;
      hi += 1;
    }
    const span = hi - lo;
    lo -= span * 0.08;
    hi += span * 0.08;
    const x = (t: number) => pad.l + ((Math.max(t, start) - start) / (end - start)) * (W - pad.l - pad.r);
    const y = (v: number) => pad.t + (1 - (v - lo) / (hi - lo)) * (H - pad.t - pad.b);
    // One point per pixel column is plenty.
    const cols = new Map<number, { sum: number; n: number; t: number }>();
    for (const p of pts) {
      const cx = Math.round(x(p.t));
      const c = cols.get(cx) ?? { sum: 0, n: 0, t: p.t };
      c.sum += Number(p.s);
      c.n++;
      cols.set(cx, c);
    }
    const series = [...cols.entries()].sort((a, b) => a[0] - b[0]).map(([cx, c]) => ({ x: cx, v: c.sum / c.n }));
    const last = series[series.length - 1];
    series.push({ x: x(end), v: last.v });
    const line = series.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)},${y(p.v).toFixed(1)}`).join(" ");
    const area = `${line} L${x(end).toFixed(1)},${H - pad.b} L${series[0].x.toFixed(1)},${H - pad.b} Z`;
    const fmt = (v: number) => v.toLocaleString(lang, { maximumFractionDigits: span < 10 ? 1 : 0 });
    const grid = [lo + (hi - lo) * 0.1, (lo + hi) / 2, hi - (hi - lo) * 0.1]
      .map((v) => `<line x1="${pad.l}" x2="${W - pad.r}" y1="${y(v)}" y2="${y(v)}" class="g"/><text x="${pad.l - 6}" y="${y(v) + 4}" class="yl">${fmt(v)}</text>`)
      .join("");
    const ticks = [start, (start + end) / 2, end]
      .map((t, i) => `<text x="${x(t)}" y="${H - 6}" class="xl" text-anchor="${i === 0 ? "start" : i === 2 ? "end" : "middle"}">${i === 2 ? "Jetzt" : esc(this.timeLabel(t))}</text>`)
      .join("");
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    chart.innerHTML = `
      <svg class="line" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
        <defs><linearGradient id="fp-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--pop-accent)" stop-opacity=".35"/><stop offset="1" stop-color="var(--pop-accent)" stop-opacity="0"/></linearGradient></defs>
        ${grid}${ticks}
        <path d="${area}" fill="url(#fp-grad)"/>
        <path d="${line}" class="ln"/>
        <line class="cross" y1="${pad.t}" y2="${H - pad.b}" x1="-10" x2="-10"/>
        <circle class="dot" r="4" cx="-10" cy="-10"/>
      </svg>
      <div class="tip" hidden></div>
      <div class="stats"><span>Min <b>${fmt(min)} ${esc(unit)}</b></span><span>Ø <b>${fmt(avg)} ${esc(unit)}</b></span><span>Max <b>${fmt(max)} ${esc(unit)}</b></span></div>`;
    const svg = chart.querySelector("svg")!;
    const cross = svg.querySelector<SVGLineElement>(".cross")!;
    const dot = svg.querySelector<SVGCircleElement>(".dot")!;
    const tip = chart.querySelector<HTMLElement>(".tip")!;
    svg.addEventListener("pointermove", (ev) => {
      const r = svg.getBoundingClientRect();
      const px = ((ev.clientX - r.left) / r.width) * W;
      if (px < pad.l || px > W - pad.r) return;
      const t = start + ((px - pad.l) / (W - pad.l - pad.r)) * (end - start);
      let p = pts[0];
      for (const q of pts) {
        if (q.t <= t) p = q;
        else break;
      }
      const v = Number(p.s);
      cross.setAttribute("x1", String(px));
      cross.setAttribute("x2", String(px));
      dot.setAttribute("cx", String(px));
      dot.setAttribute("cy", String(y(v)));
      tip.hidden = false;
      svg.classList.add("hover");
      tip.innerHTML = `<b>${fmt(v)} ${esc(unit)}</b><span>${esc(new Date(t).toLocaleString(lang, { weekday: "short", hour: "2-digit", minute: "2-digit" }))}</span>`;
      tip.style.left = `${Math.min(Math.max((px / W) * 100, 12), 88)}%`;
    });
    svg.addEventListener("pointerleave", () => {
      tip.hidden = true;
      svg.classList.remove("hover");
    });
  }

  private timeline(chart: HTMLElement, pts: Point[], start: number): void {
    const end = Date.now();
    const hass = this.hass!;
    const s = hass.states[this.id!];
    const label = (st: string) => (s && hass.formatEntityState ? safe(() => hass.formatEntityState!(s, st), st) : st);
    const palette = ["var(--pop-accent)", "#8e8e93", "#ff9500", "#34c759", "#af52de", "#ff3b30"];
    const colors = new Map<string, string>();
    const colorOf = (st: string) => {
      if (st === "unavailable" || st === "unknown") return "transparent";
      if (!colors.has(st)) {
        const onLike = isActive({ entity_id: this.id!, state: st, attributes: {} });
        colors.set(st, onLike ? palette[0] : st === "off" || st === "closed" || st === "locked" || st === "not_home" ? palette[1] : palette[2 + (colors.size % 4)]);
      }
      return colors.get(st)!;
    };
    const segs = pts.map((p, i) => {
      const t0 = Math.max(p.t, start);
      const t1 = i + 1 < pts.length ? pts[i + 1].t : end;
      return { s: p.s, t0, t1 };
    });
    const total = end - start;
    const bar = segs
      .filter((g) => g.t1 > g.t0)
      .map(
        (g) =>
          `<i style="left:${((g.t0 - start) / total) * 100}%;width:${((g.t1 - g.t0) / total) * 100}%;background:${colorOf(g.s)}" title="${esc(label(g.s))} · ${esc(this.timeLabel(g.t0))}"></i>`
      )
      .join("");
    const legend = [...colors.entries()].map(([st, c]) => `<span><i style="background:${c}"></i>${esc(label(st))}</span>`).join("");
    const lang = hass.language || "de";
    const recent = segs
      .slice()
      .reverse()
      .filter((g) => g.s !== "unavailable" && g.s !== "unknown")
      .slice(0, 5)
      .map(
        (g) =>
          `<div><i style="background:${colorOf(g.s)}"></i><b>${esc(label(g.s))}</b><span>${esc(new Date(g.t0).toLocaleString(lang, { weekday: "short", hour: "2-digit", minute: "2-digit" }))}</span></div>`
      )
      .join("");
    chart.innerHTML = `
      <div class="timeline">${bar}</div>
      <div class="tl-axis"><span>${esc(this.timeLabel(start))}</span><span>${esc(this.timeLabel((start + end) / 2))}</span><span>Jetzt</span></div>
      <div class="legend">${legend}</div>
      ${recent ? `<div class="recent"><small>Letzte Änderungen</small>${recent}</div>` : ""}`;
  }
}

function safe<T>(f: () => T, fallback: T): T {
  try {
    return f();
  } catch {
    return fallback;
  }
}

function hexRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function kelvinCss(k: number): string {
  // Matches lightColor()'s kelvin curve closely enough for a swatch.
  const t = k / 100;
  const r = t <= 66 ? 255 : 329.7 * Math.pow(t - 60, -0.1332);
  const g = t <= 66 ? 99.47 * Math.log(t) - 161.12 : 288.12 * Math.pow(t - 60, -0.0755);
  const b = t >= 66 ? 255 : t <= 19 ? 0 : 138.52 * Math.log(t - 10) - 305.04;
  const c = (v: number) => Math.round(Math.max(0, Math.min(255, v)));
  return `rgb(${c(r)},${c(g)},${c(b)})`;
}

export const POPUP_STYLES = `
dialog.fp-pop {
  --pop-accent: var(--primary-color, #03a9f4);
  --pop-surface: var(--card-background-color, #fff);
  --pop-surface-2: var(--secondary-background-color, #f2f2f2);
  --pop-text: var(--primary-text-color, #1c1c1c);
  --pop-muted: var(--secondary-text-color, #6b6b6b);
  --pop-border: var(--divider-color, rgba(127,127,127,.22));
  width: min(440px, calc(100vw - 24px)); max-height: calc(100vh - 32px); overflow: auto; box-sizing: border-box;
  border: 1px solid var(--pop-border); border-radius: 28px; padding: 18px 18px 14px;
  background: var(--pop-surface); color: var(--pop-text);
  box-shadow: 0 24px 60px rgba(0,0,0,.35);
  font-family: var(--paper-font-body1_-_font-family, system-ui, sans-serif);
}
dialog.fp-pop.wide { width: min(760px, calc(100vw - 24px)); }
dialog.fp-pop[open] { animation: fp-pop-in .18s ease-out; }
@keyframes fp-pop-in { from { opacity: 0; transform: translateY(12px) scale(.98); } to { opacity: 1; transform: none; } }
dialog.fp-pop::backdrop { background: rgba(0,0,0,.42); backdrop-filter: blur(3px); }
dialog.fp-pop * { box-sizing: border-box; }
dialog.fp-pop svg { width: 22px; height: 22px; fill: currentColor; flex: none; }
dialog.fp-pop button { font: inherit; color: inherit; cursor: pointer; }

.pop-head { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.pop-icon {
  --pop-icon-color: var(--pop-muted);
  width: 46px; height: 46px; border-radius: 50%; flex: none; display: grid; place-items: center;
  background: color-mix(in srgb, var(--pop-icon-color) 16%, transparent); color: var(--pop-icon-color);
  --mdc-icon-size: 26px; transition: background .2s, color .2s;
}
.pop-icon.on { --pop-icon-color: var(--state-active-color, #ffb300); }
.pop-icon b { font-size: 20px; }
.pop-icon svg { width: 26px !important; height: 26px !important; }
.pop-title { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.pop-title b { font-size: 18px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pop-sub { font-size: 13px; color: var(--pop-muted); }
.pop-btn { width: 38px; height: 38px; border-radius: 50%; border: none; background: transparent; display: grid; place-items: center; color: var(--pop-muted); }
.pop-btn:hover { background: var(--pop-surface-2); color: var(--pop-text); }

.pop-body { display: flex; flex-direction: column; gap: 14px; }
.sec-label { font-size: 12px; font-weight: 600; color: var(--pop-muted); text-transform: uppercase; letter-spacing: .05em; width: 100%; }

.pop-slider {
  --fill-color: var(--pop-accent);
  position: relative; height: 52px; border-radius: 16px; overflow: hidden; cursor: pointer; touch-action: none; user-select: none;
  background: var(--pop-surface-2); display: flex; align-items: center; gap: 10px; padding: 0 16px; outline: none; flex: 1;
}
.pop-slider.tall { height: 68px; border-radius: 20px; }
.pop-slider:focus-visible { box-shadow: 0 0 0 2px var(--pop-accent); }
.pop-slider .fill { position: absolute; inset: 0 auto 0 0; background: var(--fill-color); transition: width .15s; }
.pop-slider.drag .fill { transition: none; }
.pop-slider span, .pop-slider svg { position: relative; font-size: 16px; font-weight: 600; mix-blend-mode: normal; color: var(--pop-text); text-shadow: 0 0 6px var(--pop-surface); }
.light-row { display: flex; gap: 10px; align-items: stretch; }
.round-btn {
  --btn-color: var(--state-active-color, #ffb300);
  flex: none; width: 68px; border-radius: 20px; border: none; display: grid; place-items: center;
  background: var(--pop-surface-2); color: var(--pop-muted); transition: background .2s, color .2s;
}
.round-btn.on { background: var(--btn-color); color: #fff; box-shadow: 0 6px 20px color-mix(in srgb, var(--btn-color) 45%, transparent); }
.round-btn svg { width: 28px !important; height: 28px !important; }

.swatches, .temps { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.swatch { width: 34px; height: 34px; border-radius: 50%; border: 2px solid var(--pop-surface); box-shadow: 0 0 0 1px var(--pop-border); padding: 0; transition: transform .12s; }
.swatch:hover { transform: scale(1.12); }
.swatch.custom { position: relative; overflow: hidden; cursor: pointer; background: conic-gradient(red, yellow, lime, cyan, blue, magenta, red); }
.swatch.custom input { position: absolute; inset: -8px; width: 60px; height: 60px; opacity: 0; cursor: pointer; }
.temps button, .chips-row button, .chips button {
  border: 1px solid var(--pop-border); background: var(--pop-surface); border-radius: 999px; padding: 7px 12px; font-size: 13px;
  display: inline-flex; align-items: center; gap: 6px;
}
.temps button i { width: 14px; height: 14px; border-radius: 50%; box-shadow: inset 0 0 0 1px rgba(0,0,0,.15); }
.temps button.on, .chips-row button.on, .chips button.on { background: var(--pop-accent); border-color: transparent; color: var(--text-primary-color, #fff); }
.chips-row { display: flex; flex-wrap: wrap; gap: 8px; }

.big-toggle {
  border: none; border-radius: 22px; padding: 22px; display: flex; flex-direction: column; align-items: center; gap: 6px;
  background: var(--pop-surface-2); transition: background .2s, color .2s, transform .1s;
}
.big-toggle svg { width: 40px !important; height: 40px !important; color: var(--pop-muted); }
.big-toggle span { font-size: 17px; font-weight: 600; }
.big-toggle small { font-size: 12px; color: var(--pop-muted); }
.big-toggle.on { background: color-mix(in srgb, var(--state-active-color, #ffb300) 22%, var(--pop-surface)); }
.big-toggle.on svg { color: var(--state-active-color, #ffb300); }
.big-toggle:active { transform: scale(.98); }
.big-toggle.run svg { color: var(--pop-accent); }
.big-toggle.done { background: color-mix(in srgb, #34c759 25%, var(--pop-surface)); }

.big-value { font-size: 46px; font-weight: 300; text-align: center; padding: 8px 0 2px; letter-spacing: -.02em; }
.big-value small { font-size: 20px; color: var(--pop-muted); margin-left: 6px; font-weight: 400; }
.big-value.text { font-size: 30px; font-weight: 500; }
.big-value.text.on { color: var(--state-active-color, #ffb300); }

.btn-row { display: flex; gap: 8px; }
.btn-row button {
  flex: 1; border: none; border-radius: 16px; padding: 12px 8px; background: var(--pop-surface-2);
  display: flex; flex-direction: column; align-items: center; gap: 4px; font-size: 13px;
}
.btn-row button:hover { background: color-mix(in srgb, var(--pop-accent) 14%, var(--pop-surface-2)); }
.btn-row button.on { color: var(--state-active-color, #ffb300); }
.media-btns button.main { background: var(--pop-accent); color: var(--text-primary-color, #fff); }

.climate { display: flex; gap: 12px; }
.climate > div { flex: 1; border-radius: 20px; background: var(--pop-surface-2); padding: 14px; display: flex; align-items: center; justify-content: center; gap: 10px; }
.climate .cur { flex-direction: column; gap: 2px; }
.climate small { font-size: 12px; color: var(--pop-muted); }
.climate small.act { color: var(--state-climate-heat-color, #ff8100); font-weight: 600; }
.climate b { font-size: 34px; font-weight: 400; }
.climate b i { font-style: normal; font-size: 22px; vertical-align: top; color: var(--pop-muted); }
.climate .target > div { display: flex; flex-direction: column; align-items: center; }
.climate .target button { width: 42px; height: 42px; border-radius: 50%; border: none; background: var(--pop-surface); display: grid; place-items: center; }

.cam { position: relative; border-radius: 18px; overflow: hidden; background: #000; }
.cam img { display: block; width: 100%; max-height: 70vh; object-fit: contain; min-height: 180px; }
.cam.err img { visibility: hidden; }
.cam.err::after { content: "Bild nicht verfügbar"; position: absolute; inset: 0; display: grid; place-items: center; color: #bbb; }
.cam-off { padding: 60px 20px; text-align: center; color: #bbb; }
.cam-bar { position: absolute; left: 0; right: 0; bottom: 0; display: flex; align-items: center; gap: 8px; padding: 10px; background: linear-gradient(transparent, rgba(0,0,0,.65)); color: #fff; }
.cam-bar .grow { flex: 1; }
.cam-bar button { border: none; border-radius: 999px; padding: 7px 12px; background: rgba(255,255,255,.18); color: #fff; display: inline-flex; align-items: center; gap: 6px; font-size: 13px; backdrop-filter: blur(6px); }
.cam-bar button svg { width: 18px; height: 18px; }
.cam-bar button.on { background: #e53935; }
.badge { font-size: 12px; font-weight: 700; padding: 3px 8px; border-radius: 6px; background: rgba(0,0,0,.45); }
.badge.live { background: #e53935; }

.media { display: flex; gap: 12px; align-items: center; }
.media img { width: 72px; height: 72px; border-radius: 12px; object-fit: cover; }
.media-info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.media-info b { font-size: 16px; }
.media-info span { font-size: 13px; color: var(--pop-muted); }

.pop-hist { margin-top: 18px; }
.hist-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 8px; }
.hist-head > span { font-size: 12px; font-weight: 600; color: var(--pop-muted); text-transform: uppercase; letter-spacing: .05em; }
.chips { display: flex; gap: 4px; }
.chips button { padding: 4px 10px; font-size: 12px; }
.chart { position: relative; min-height: 80px; }
.chart .loading { padding: 28px 0; text-align: center; color: var(--pop-muted); font-size: 13px; }
.chart svg.line { display: block; width: 100%; height: auto; overflow: visible; touch-action: pan-y; }
.chart .g { stroke: var(--pop-border); stroke-width: 1; }
.chart .yl { font-size: 11px; fill: var(--pop-muted); text-anchor: end; }
.chart .xl { font-size: 11px; fill: var(--pop-muted); }
.chart .ln { fill: none; stroke: var(--pop-accent); stroke-width: 2.2; stroke-linejoin: round; stroke-linecap: round; }
.chart .cross { stroke: var(--pop-muted); stroke-dasharray: 3 3; visibility: hidden; }
.chart .dot { fill: var(--pop-accent); stroke: var(--pop-surface); stroke-width: 2; visibility: hidden; }
.chart svg.hover .cross, .chart svg.hover .dot { visibility: visible; }
dialog.fp-pop:focus { outline: none; }
.chart .tip { position: absolute; top: -6px; transform: translateX(-50%); background: var(--pop-text); color: var(--pop-surface); border-radius: 10px; padding: 5px 9px; font-size: 12px; display: flex; flex-direction: column; align-items: center; pointer-events: none; white-space: nowrap; }
.chart .tip span { opacity: .75; font-size: 11px; }
.chart .tip[hidden] { display: none; }
.chart .stats { display: flex; justify-content: space-around; margin-top: 8px; font-size: 12px; color: var(--pop-muted); }
.chart .stats b { color: var(--pop-text); font-weight: 600; }
.timeline { position: relative; height: 34px; border-radius: 10px; overflow: hidden; background: var(--pop-surface-2); }
.timeline i { position: absolute; top: 0; bottom: 0; }
.tl-axis { display: flex; justify-content: space-between; font-size: 11px; color: var(--pop-muted); margin-top: 4px; }
.legend { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 8px; font-size: 12px; }
.legend span, .recent div { display: inline-flex; align-items: center; gap: 6px; }
.legend i, .recent i { width: 10px; height: 10px; border-radius: 3px; flex: none; }
.recent { display: flex; flex-direction: column; gap: 6px; margin-top: 12px; font-size: 13px; }
.recent small { font-size: 12px; color: var(--pop-muted); }
.recent div span { margin-left: auto; color: var(--pop-muted); font-size: 12px; }

.pop-attrs { margin-top: 14px; border-top: 1px solid var(--pop-border); padding-top: 10px; }
.pop-attrs summary { cursor: pointer; font-size: 13px; color: var(--pop-muted); }
.attr-list { display: flex; flex-direction: column; gap: 4px; margin-top: 8px; font-size: 13px; }
.attr-list div { display: flex; justify-content: space-between; gap: 12px; }
.attr-list span { color: var(--pop-muted); text-transform: capitalize; }
.attr-list b { font-weight: 500; text-align: right; word-break: break-word; }

@media (max-width: 600px) {
  dialog.fp-pop, dialog.fp-pop.wide {
    width: 100vw; max-width: 100vw; margin: auto 0 0; border-radius: 26px 26px 0 0; border-bottom: none;
    max-height: 92vh; padding-bottom: max(14px, env(safe-area-inset-bottom));
  }
  dialog.fp-pop[open] { animation: fp-sheet-in .22s ease-out; }
  @keyframes fp-sheet-in { from { transform: translateY(40px); opacity: .4; } to { transform: none; opacity: 1; } }
}
`;
