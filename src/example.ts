import type { Floorplan } from "./types";

export const EXAMPLE_FLOORPLAN: Floorplan = {
  walls: [
    { id: "w1", x1: 0, y1: 0, x2: 800, y2: 0 },
    { id: "w2", x1: 800, y1: 0, x2: 800, y2: 600 },
    { id: "w3", x1: 800, y1: 600, x2: 0, y2: 600 },
    { id: "w4", x1: 0, y1: 600, x2: 0, y2: 0 },
    { id: "w5", x1: 480, y1: 0, x2: 480, y2: 600 },
  ],
  openings: [
    { id: "o1", wall: "w1", type: "window", offset: 220, width: 160, height: 130, sill: 90 },
    { id: "o2", wall: "w1", type: "window", offset: 640, width: 110, height: 130, sill: 90 },
    { id: "o3", wall: "w5", type: "door", offset: 420, width: 90, height: 210 },
    { id: "o4", wall: "w3", type: "door", offset: 560, width: 100, height: 210 },
  ],
  rooms: [
    { id: "r1", name: "Wohnzimmer", points: [[0, 0], [480, 0], [480, 600], [0, 600]], color: "#c9b79c" },
    { id: "r2", name: "Schlafzimmer", points: [[480, 0], [800, 0], [800, 600], [480, 600]], color: "#b8c4cf" },
  ],
  hotspots: [
    { id: "h1", x: 240, y: 300, z: 220, w: 60, d: 60, h: 25, label: "Deckenlampe" },
    { id: "h2", x: 640, y: 80, z: 0, w: 120, d: 40, h: 60, label: "Sensor" },
  ],
  objects: [
    { id: "b1", type: "sofa", x: 390, y: 330, w: 220, d: 95, h: 85, rotation: 90, color: "#6f7f8f" },
    { id: "b2", type: "coffee_table", x: 240, y: 330, w: 110, d: 60, h: 42, rotation: 90 },
    { id: "b3", type: "tv_board", x: 30, y: 330, w: 180, d: 40, h: 50, rotation: 270 },
    { id: "b4", type: "tv", x: 30, y: 330, z: 50, w: 120, d: 8, h: 72, rotation: 270 },
    { id: "b5", type: "plant", x: 435, y: 60, w: 50, d: 50, h: 110 },
    { id: "b6", type: "bed_double", x: 640, y: 300, w: 180, d: 210, h: 90 },
    { id: "b8", type: "ceiling_lamp", x: 240, y: 300, z: 238, w: 50, d: 50, h: 12 },
    { id: "b7", type: "wardrobe", x: 640, y: 562, w: 150, d: 60, h: 220, rotation: 180 },
  ],
};
