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

export function resolveAction(h: Hotspot): Exclude<HotspotAction, "auto"> {
  const a = h.action ?? "auto";
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

export async function runAction(hass: Hass, node: HTMLElement, h: Hotspot): Promise<void> {
  if (!h.entity) return;
  const action = resolveAction(h);
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
      fireMoreInfo(node, entity_id);
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
