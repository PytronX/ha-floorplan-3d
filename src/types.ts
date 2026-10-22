// All plan coordinates are in centimetres. x grows to the right, y grows "down" in the 2D editor
// (south). In 3D, x -> X, y -> Z and height -> Y (metres).

export type Point = [number, number];

export interface Wall {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  thickness?: number;
  /** Height at the start point (x1/y1). */
  height?: number;
  /** Height at the end point (x2/y2); defaults to `height`. Different values give a sloped top. */
  height_end?: number;
  color?: string;
  texture?: string;
  /** Size of one texture tile in cm. */
  texture_scale?: number;
}

export type OpeningType = "door" | "window";

export type DoorStyle = "single" | "double" | "sliding" | "glass" | "french" | "garage" | "opening";
export type WindowStyle = "single" | "double" | "triple" | "fixed" | "sliding" | "round";

export interface Opening {
  id: string;
  wall: string;
  type: OpeningType;
  /** Door or window kind; default "single". */
  style?: DoorStyle | WindowStyle;
  /** Hinge on the other side of the opening. */
  flip?: boolean;
  /** Opens to the other side of the wall. */
  mirror?: boolean;
  /** Colour of leaf and frame. */
  color?: string;
  /** Distance of the opening centre from the wall start (cm). */
  offset: number;
  width: number;
  height: number;
  /** Height of the lower edge above the floor (cm). */
  sill?: number;
}

export interface Room {
  id: string;
  name?: string;
  points: Point[];
  color?: string;
  texture?: string;
  texture_scale?: number;
}

export type HotspotAction = "auto" | "toggle" | "more-info" | "press" | "none";

export interface Hotspot {
  id: string;
  /** Centre of the box on the floor plan (cm). */
  x: number;
  y: number;
  /** Height of the lower edge above the floor (cm). */
  z?: number;
  w: number;
  d: number;
  h: number;
  entity?: string;
  label?: string;
  icon?: string;
  action?: HotspotAction;
  /** Action on press-and-hold (default: more-info). */
  hold_action?: HotspotAction;
  /** Action on double click / double tap (default: none). */
  double_tap_action?: HotspotAction;
  show_label?: boolean;
  color?: string;
}

/** A piece of furniture or a basic shape from the object library. */
export interface FloorObject {
  id: string;
  /** Catalog id, e.g. "box", "sphere", "sofa". */
  type: string;
  name?: string;
  /** Centre of the footprint on the plan (cm). */
  x: number;
  y: number;
  /** Height of the lower edge above the floor (cm). */
  z?: number;
  w: number;
  d: number;
  h: number;
  /** Clockwise rotation on the plan in degrees. */
  rotation?: number;
  color?: string;
  texture?: string;
  texture_scale?: number;
}

export interface Floorplan {
  walls: Wall[];
  openings: Opening[];
  rooms: Room[];
  hotspots: Hotspot[];
  objects: FloorObject[];
}

export interface Floor {
  id: string;
  name: string;
  floorplan: Floorplan;
}

export interface Background {
  image: string;
  /** Width of the image in cm. */
  width: number;
  x?: number;
  y?: number;
  opacity?: number;
}

export interface CameraConfig {
  position: [number, number, number];
  target: [number, number, number];
}

export type HitboxMode = "visible" | "hover" | "hidden";

export interface CardConfig {
  type: string;
  title?: string;
  height?: number;
  /** Fill the remaining screen height, e.g. as the only card of a panel view. */
  full_page?: boolean;
  wall_height?: number;
  wall_thickness?: number;
  wall_color?: string;
  floor_color?: string;
  wall_texture?: string;
  floor_texture?: string;
  background_color?: string;
  hitbox_mode?: HitboxMode;
  show_room_names?: boolean;
  show_labels?: boolean;
  /** Show each room's floor area in m² (default on). */
  show_area?: boolean;
  /** Which info window opens for "more-info": the card's own (default) or Home Assistant's. */
  info_dialog?: "card" | "ha";
  camera?: CameraConfig;
  background?: Background;
  /** Single-storey plan. Used when `floors` is not set. */
  floorplan?: Floorplan;
  /** Several storeys; the card shows one at a time with a switcher. */
  floors?: Floor[];
}

// Minimal subset of the Home Assistant frontend types we use.
export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed?: string;
  last_updated?: string;
}

export interface Hass {
  states: Record<string, HassEntity>;
  callService(domain: string, service: string, data?: Record<string, any>): Promise<unknown>;
  formatEntityState?(stateObj: HassEntity, state?: string): string;
  callWS?<T = unknown>(msg: Record<string, unknown>): Promise<T>;
  hassUrl?(path?: string): string;
  language?: string;
  themes?: { darkMode?: boolean };
}

export const DEFAULTS = {
  wall_height: 250,
  wall_thickness: 12,
  wall_color: "#e8e4dc",
  floor_color: "#c9b79c",
  height: 420,
};

export function emptyFloorplan(): Floorplan {
  return { walls: [], openings: [], rooms: [], hotspots: [], objects: [] };
}

export function normalizeFloorplan(fp: Partial<Floorplan> | undefined): Floorplan {
  return {
    walls: fp?.walls ?? [],
    openings: fp?.openings ?? [],
    rooms: fp?.rooms ?? [],
    hotspots: fp?.hotspots ?? [],
    objects: fp?.objects ?? [],
  };
}

const FLOOR_NAMES = ["Erdgeschoss", "Obergeschoss", "Dachgeschoss"];

export function defaultFloorName(index: number): string {
  return FLOOR_NAMES[index] ?? `${index}. Obergeschoss`;
}

/** All storeys of a config; a plain `floorplan` counts as one storey. */
export function getFloors(cfg: Pick<CardConfig, "floors" | "floorplan">): Floor[] {
  if (cfg.floors?.length) {
    return cfg.floors.map((f, i) => ({
      id: f.id || `f${i + 1}`,
      name: f.name || defaultFloorName(i),
      floorplan: normalizeFloorplan(f.floorplan),
    }));
  }
  return [{ id: "f1", name: defaultFloorName(0), floorplan: normalizeFloorplan(cfg.floorplan) }];
}

export function uid(prefix: string): string {
  return prefix + Math.random().toString(36).slice(2, 8);
}

/** Floor area of a room polygon (points in cm) in m². */
export function roomArea(points: [number, number][]): number {
  let a = 0;
  for (let i = 0; i < points.length; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[(i + 1) % points.length];
    a += x0 * y1 - x1 * y0;
  }
  return Math.abs(a) / 2 / 10000;
}

export function formatArea(m2: number): string {
  return `${m2.toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} m²`;
}
