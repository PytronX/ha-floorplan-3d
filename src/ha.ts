import type { Hass, HassEntity, Hotspot, HotspotAction } from "./types";

const TOGGLE_DOMAINS = new Set([
  "light",
  "switch",
  "fan",
  "input_boolean",
  "cover",
  "automation",
  "media_player",
  "humidifier",
  "siren",
  "valve",
]);
const PRESS_DOMAINS = new Set(["button", "input_button", "scene", "script"]);
const ON_STATES = new Set(["on", "open", "opening", "playing", "unlocked", "home", "active"]);

export function domainOf(entityId: string): string {
  return entityId.split(".")[0];
}

export type Gesture = "tap" | "hold" | "double_tap";

/** The configured action for a gesture; "auto" picks one from the entity's domain. */
export function resolveAction(h: Hotspot, gesture: Gesture = "tap"): Exclude<HotspotAction, "auto"> {
  const a =
    gesture === "hold" ? (h.hold_action ?? "more-info") : gesture === "double_tap" ? (h.double_tap_action ?? "none") : (h.action ?? "auto");
  if (a !== "auto") return a;
  if (!h.entity) return "none";
  const d = domainOf(h.entity);
  if (TOGGLE_DOMAINS.has(d)) return "toggle";
  if (PRESS_DOMAINS.has(d)) return "press";
  return "more-info";
}

export function isActive(s: HassEntity | undefined): boolean {
  if (!s) return false;
  if (ON_STATES.has(s.state)) return true;
  // Binary sensors: "on" already covered. Climate: anything but off.
  if (domainOf(s.entity_id) === "climate") return s.state !== "off" && s.state !== "unavailable";
  return false;
}

export function fireMoreInfo(node: HTMLElement, entityId: string): void {
  node.dispatchEvent(
    new CustomEvent("hass-more-info", { detail: { entityId }, bubbles: true, composed: true })
  );
}

/** `openInfo` shows the card's own info window; without it Home Assistant's dialog opens. */
export async function runAction(
  hass: Hass,
  node: HTMLElement,
  h: Hotspot,
  gesture: Gesture = "tap",
  openInfo?: (entityId: string) => void
): Promise<void> {
  if (!h.entity) return;
  const action = resolveAction(h, gesture);
  const entity_id = h.entity;
  const d = domainOf(entity_id);
  switch (action) {
    case "toggle":
      await hass.callService("homeassistant", "toggle", { entity_id });
      break;
    case "press":
      if (d === "button" || d === "input_button") await hass.callService(d, "press", { entity_id });
      else if (d === "scene" || d === "script") await hass.callService(d, "turn_on", { entity_id });
      else await hass.callService("homeassistant", "turn_on", { entity_id });
      break;
    case "more-info":
      if (openInfo) openInfo(entity_id);
      else fireMoreInfo(node, entity_id);
      break;
  }
}

export function formatState(hass: Hass, s: HassEntity | undefined): string {
  if (!s) return "—";
  if (hass.formatEntityState) {
    try {
      return hass.formatEntityState(s);
    } catch {
      /* fall through */
    }
  }
  const unit = s.attributes.unit_of_measurement;
  return unit ? `${s.state} ${unit}` : s.state;
}

export function friendlyName(s: HassEntity | undefined, fallback: string): string {
  return (s?.attributes.friendly_name as string) || fallback;
}

/** Colour of a light as sRGB 0..255, without its brightness. */
export function lightColor(s: HassEntity | undefined): [number, number, number] {
  const a = s?.attributes ?? {};
  if (Array.isArray(a.rgb_color)) return a.rgb_color as [number, number, number];
  if (Array.isArray(a.hs_color)) return hsToRgb(a.hs_color[0], a.hs_color[1]);
  const k = a.color_temp_kelvin ?? (a.color_temp ? 1e6 / a.color_temp : undefined);
  if (k) return kelvinToRgb(k);
  return [255, 214, 160];
}

/** Brightness 0..1 of a light that is on (lights without dimming count as full). */
export function lightBrightness(s: HassEntity | undefined): number {
  if (!s || s.state !== "on") return 0;
  const b = s.attributes.brightness as number | undefined;
  return b == null ? 1 : Math.max(0.03, Math.min(1, b / 255));
}

export function hsToRgb(h: number, s: number): [number, number, number] {
  const sat = s / 100;
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    return Math.round(255 * (1 - sat * Math.max(0, Math.min(k, 4 - k, 1))));
  };
  return [f(5), f(3), f(1)];
}

/** Approximate colour of a black body at `k` Kelvin. */
export function kelvinToRgb(k: number): [number, number, number] {
  const t = k / 100;
  const clamp = (v: number) => Math.round(Math.max(0, Math.min(255, v)));
  const r = t <= 66 ? 255 : 329.698727446 * Math.pow(t - 60, -0.1332047592);
  const g = t <= 66 ? 99.4708025861 * Math.log(t) - 161.1195681661 : 288.1221695283 * Math.pow(t - 60, -0.0755148492);
  const b = t >= 66 ? 255 : t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  return [clamp(r), clamp(g), clamp(b)];
}
