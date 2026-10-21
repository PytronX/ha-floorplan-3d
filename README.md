# 3D Floorplan Card für Home Assistant

[![Open your Home Assistant instance and show the add app repository dialog.](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPytronX%2Fha-floorplan-3d)

Eine Home-Assistant-**App** mit einer Dashboard-Karte, mit der du **deine Wohnung als 3D-Grundriss** direkt im Home-Assistant-Dashboard zeichnest – ähnlich wie in SweetHome 3D – und darin **Hitboxen** platzierst, die mit Entitäten verbunden sind: Sensorwerte anzeigen, Lampen schalten, Buttons drücken, Szenen starten …

![Screenshot](docs/screenshot.png)

## Funktionen

- **3D-Ansicht** (Three.js): Wände (auch mit Dachschräge), Türen, Fenster und Räume mit Farben oder Texturen; drehen, zoomen, verschieben mit Maus oder Touch.
- **Eingebauter Editor** im normalen Karten-Editor von HA:
  - *Raum + Wände*: Rechteck aufziehen → vier Wände und ein Raum.
  - *Wand*: Wandzüge Punkt für Punkt zeichnen (Raster- und Eckpunkt-Fang, Längenanzeige).
  - *Raum*: Bodenflächen als Rechteck oder Polygon.
  - *Tür / Fenster*: auf eine Wand klicken, danach entlang der Wand verschieben.
  - *Hitbox*: Rechteck aufziehen, Entität, Höhe, Icon und Klick-Aktion festlegen.
  - Verschieben, Eckpunkte ziehen (verbundene Wände ziehen mit), Rückgängig/Wiederholen, Maße direkt eingeben.
  - Wandhöhe am Anfang und Ende getrennt einstellbar (Dachschrägen).
  - Texturen für Wände und Böden: eingebaut (Parkett, Fliesen, Teppich, Backstein, Beton, Rauputz, Tapete) oder eigenes Bild, z. B. `/local/texturen/holz.jpg`.
  - Button „Großansicht“: Editor fast bildschirmfüllend, links die Eingabefelder, rechts Grundriss und/oder 3D-Vorschau (auch beides gleichzeitig).
  - Hintergrundbild (z. B. ein eingescannter Grundriss) zum Nachzeichnen.
  - 3D-Vorschau und speicherbare Startansicht der Kamera.
  - Import/Export als JSON.
- **Hitboxen**
  - zeigen Name und Zustand als Label (z. B. `21,5 °C`) und leuchten gelb, wenn die Entität „an“ ist;
  - Lampen werfen in 3D echtes Licht (Helligkeit und Farbe werden übernommen);
  - Klick/Tap: *Automatisch* (Licht/Schalter/Ventilator/Cover … umschalten, Button/Szene/Skript auslösen, sonst Info-Dialog), oder fest *Umschalten*, *Auslösen*, *Info-Dialog*, *Nichts*;
  - langes Drücken oder Rechtsklick öffnet immer den Info-Dialog;
  - Sichtbarkeit: immer, nur beim Überfahren oder unsichtbar.

## Installation

1. Auf den Button oben klicken **oder** in Home Assistant *Einstellungen → Apps → App-Store → ⋮ → Repositories* öffnen und `https://github.com/PytronX/ha-floorplan-3d` hinzufügen.
2. Die App **3D Floorplan** installieren und starten.
3. Die App kopiert die Karte nach `/config/www/floorplan-3d/` und trägt sie automatisch als Dashboard-Ressource ein. Wurde der Ordner `www` dabei neu angelegt, Home Assistant einmal neu starten.

Die App braucht Home Assistant OS oder eine Supervised-Installation (dort gibt es den App-Store).

## Benutzung

Dashboard bearbeiten → **Karte hinzufügen** → „3D Floorplan Card“. Die Karte startet mit einer Beispielwohnung, die du anpassen oder unter *Import / Export → Alles löschen* leeren kannst. Alles wird in der Kartenkonfiguration gespeichert – also einfach wie gewohnt auf **Speichern** klicken.

Tipps:
- Leere Fläche ziehen = Ansicht verschieben, Mausrad = Zoom, `Entf` löscht, `Strg+Z` macht rückgängig, `Esc` beendet das Zeichnen.
- Eine Deckenlampe ist z. B. eine flache Hitbox mit *Höhe über Boden* 230 cm.

## Konfiguration (YAML)

Alle Maße in **Zentimetern**. Normalerweise musst du das nicht von Hand schreiben.

```yaml
type: custom:floorplan-3d-card
title: Wohnung
height: 420              # Kartenhöhe in px
wall_height: 250
wall_thickness: 12
wall_color: "#e8e4dc"
wall_texture: builtin:plaster   # optional, Standard für alle Wände
floor_texture: builtin:wood     # optional, Standard für alle Böden
hitbox_mode: visible     # visible | hover | hidden
show_labels: true
show_room_names: true
camera:                  # optional, wird über den Editor gesetzt
  position: [4, 8, 9]
  target: [4, 0, 3]
background:              # optional, nur im Editor sichtbar
  image: /local/grundriss.png
  width: 1000
  opacity: 0.5
floorplan:
  walls:
    - { id: w1, x1: 0, y1: 0, x2: 800, y2: 0 }
    - { id: w2, x1: 800, y1: 0, x2: 800, y2: 600, height: 320, height_end: 180, texture: "builtin:brick" }
  openings:
    - { id: o1, wall: w1, type: window, offset: 200, width: 120, height: 130, sill: 90 }
  rooms:
    - { id: r1, name: Wohnzimmer, texture: "builtin:wood", texture_scale: 120, points: [[0, 0], [800, 0], [800, 600], [0, 600]] }
  hotspots:
    - id: h1
      entity: light.wohnzimmer
      x: 240        # Mittelpunkt
      y: 300
      z: 230        # Unterkante über dem Boden
      w: 60
      d: 60
      h: 15
      label: Deckenlampe
      icon: mdi:ceiling-light
      action: auto  # auto | toggle | press | more-info | none
```

## Entwicklung

```bash
npm install
npm run watch      # baut floorplan_3d/www/floorplan-3d-card.js bei jeder Änderung
npm run typecheck
npm run build
```

Das gebaute `floorplan_3d/www/floorplan-3d-card.js` wird mit eingecheckt, weil es in das App-Image kopiert wird. Der App-Teil (Dockerfile, `config.yaml`, Python-Dienst für Installation und Seitenleisten-Panel) liegt in `floorplan_3d/`.

## Ideen für später

- Mehrere Etagen
- Möbel / 3D-Modelle (glTF) einfügen
- „Puppenhaus“-Modus, der Wände zur Kamera hin ausblendet
- Räume einfärben nach Sensorwerten (z. B. Temperatur)

Beiträge und Issues sind willkommen!

## Lizenz

MIT
