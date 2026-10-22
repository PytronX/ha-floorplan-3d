import { FloorplanCard } from "./card";
import { FloorplanCardEditor } from "./editor";

const VERSION = "0.5.0";

if (!customElements.get("floorplan-3d-card")) customElements.define("floorplan-3d-card", FloorplanCard);
if (!customElements.get("floorplan-3d-card-editor")) customElements.define("floorplan-3d-card-editor", FloorplanCardEditor);

const w = window as any;
w.customCards = w.customCards || [];
if (!w.customCards.some((c: any) => c.type === "floorplan-3d-card")) {
  w.customCards.push({
    type: "floorplan-3d-card",
    name: "3D Floorplan Card",
    description: "3D-Grundriss mit eingebautem Editor und klickbaren Hitboxen für Entitäten.",
    preview: true,
    documentationURL: "https://github.com/PytronX/ha-floorplan-3d",
  });
}

console.info(`%c FLOORPLAN-3D-CARD %c v${VERSION} `, "color:#fff;background:#03a9f4;font-weight:700", "color:#03a9f4");
