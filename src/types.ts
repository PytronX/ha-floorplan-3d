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
  height?: number;
  color?: string;
}

export type OpeningType = "door" | "window";

export interface Opening {
  id: string;
  wall: string;
  type: OpeningType;
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
  show_label?: boolean;
  color?: string;
}

export interface Floorplan {
  walls: Wall[];
  openings: Opening[];
  rooms: Room[];
  hotspots: Hotspot[];
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
  wall_height?: number;
  wall_thickness?: number;
  wall_color?: string;
  floor_color?: string;
  background_color?: string;
  hitbox_mode?: HitboxMode;
  show_room_names?: boolean;
  show_labels?: boolean;
  camera?: CameraConfig;
  background?: Background;
  floorplan: Floorplan;
}

// Minimal subset of the Home Assistant frontend types we use.
export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed?: string;
}

export interface Hass {
  states: Record<string, HassEntity>;
  callService(domain: string, service: string, data?: Record<string, any>): Promise<unknown>;
  formatEntityState?(stateObj: HassEntity, state?: string): string;
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
  return { walls: [], openings: [], rooms: [], hotspots: [] };
}

export function normalizeFloorplan(fp: Partial<Floorplan> | undefined): Floorplan {
  return {
    walls: fp?.walls ?? [],
    openings: fp?.openings ?? [],
    rooms: fp?.rooms ?? [],
    hotspots: fp?.hotspots ?? [],
  };
}

export function uid(prefix: string): string {
  return prefix + Math.random().toString(36).slice(2, 8);
}
