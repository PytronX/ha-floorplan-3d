# 3D Floorplan Card für Home Assistant

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://hacs.xyz/)

Eine Lovelace-Karte, mit der du **deine Wohnung als 3D-Grundriss** direkt im Home-Assistant-Dashboard zeichnest – ähnlich wie in SweetHome 3D – und darin **Hitboxen** platzierst, die mit Entitäten verbunden sind: Sensorwerte anzeigen, Lampen schalten, Buttons drücken, Szenen starten …

![Screenshot](docs/screenshot.png)

## Funktionen

- **3D-Ansicht** (Three.js): Wände, Türen, Fenster und farbige Räume; drehen, zoomen, verschieben mit Maus oder Touch.
- **Eingebauter Editor** im normalen Karten-Editor von HA:
  - *Raum + Wände*: Rechteck aufziehen → vier Wände und ein Raum.
  - *Wand*: Wandzüge Punkt für Punkt zeichnen (Raster- und Eckpunkt-Fang, Längenanzeige).
  - *Raum*: Bodenflächen als Rechteck oder Polygon.
  - *Tür / Fenster*: auf eine Wand klicken, danach entlang der Wand verschieben.
  - *Hitbox*: Rechteck aufziehen, Entität, Höhe, Icon und Klick-Aktion festlegen.
  - Verschieben, Eckpunkte ziehen (verbundene Wände ziehen mit), Rückgängig/Wiederholen, Maße direkt eingeben.
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

### HACS (empfohlen)

1. HACS → ⋮ → **Benutzerdefinierte Repositories** → `https://github.com/PytronX/ha-floorplan-3d`, Typ **Dashboard**.
2. „3D Floorplan Card“ installieren und den Browser neu laden.

### Manuell

1. `dist/floorplan-3d-card.js` nach `config/www/` kopieren.
2. Einstellungen → Dashboards → ⋮ → **Ressourcen** → `/local/floorplan-3d-card.js` als *JavaScript-Modul* hinzufügen.

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
  openings:
    - { id: o1, wall: w1, type: window, offset: 200, width: 120, height: 130, sill: 90 }
  rooms:
    - { id: r1, name: Wohnzimmer, color: "#c9b79c", points: [[0, 0], [800, 0], [800, 600], [0, 600]] }
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
npm run watch      # baut dist/floorplan-3d-card.js bei jeder Änderung
npm run typecheck
npm run build
```

Das gebaute `dist/floorplan-3d-card.js` wird mit eingecheckt, damit HACS es direkt ausliefern kann.

## Ideen für später

- Mehrere Etagen
- Möbel / 3D-Modelle (glTF) einfügen
- „Puppenhaus“-Modus, der Wände zur Kamera hin ausblendet
- Räume einfärben nach Sensorwerten (z. B. Temperatur)

Beiträge und Issues sind willkommen!

## Lizenz

MIT
