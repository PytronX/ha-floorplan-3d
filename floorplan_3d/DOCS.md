# 3D Floorplan

## Was die App macht

Beim Start kopiert die App die **3D Floorplan Card** nach `/config/www/floorplan-3d/` und trägt sie unter
*Einstellungen → Dashboards → Ressourcen* ein. Danach steht die Karte in jedem Dashboard zur Verfügung.
In der Seitenleiste findest du unter **3D Floorplan** den Status und eine kurze Anleitung.

Gab es den Ordner `www` vorher noch nicht, musst du Home Assistant **einmal neu starten** (du bekommst dazu eine Benachrichtigung).

## Grundriss anlegen

1. Dashboard öffnen → **Bearbeiten** → **Karte hinzufügen** → „**3D Floorplan Card**“.
2. Im Editor zeichnen:
   - **Raum + Wände**: Rechteck aufziehen → vier Wände und ein Raum.
   - **Wand**: Punkte klicken; Doppelklick, Rechtsklick oder `Esc` beendet.
   - **Raum**: Rechteck aufziehen oder Eckpunkte klicken.
   - **Tür / Fenster**: auf eine Wand klicken, danach entlang der Wand verschieben.
   - **Hitbox**: Rechteck aufziehen, Entität, Höhe und Klick-Aktion wählen.
3. **Speichern**.

Bedienung im Editor: leere Fläche ziehen = verschieben, Mausrad = Zoom, `Entf` = löschen, `Strg+Z` = rückgängig.

## Hitboxen

- Zeigen Name und Zustand (z. B. `21,5 °C`) und leuchten gelb, wenn die Entität an ist.
- Lampen werfen in der 3D-Ansicht echtes Licht in ihrer Farbe und Helligkeit.
- Tippen: *Automatisch* schaltet Licht/Schalter/Cover usw. um, löst Buttons/Szenen/Skripte aus und öffnet sonst den Info-Dialog.
- Lange drücken oder Rechtsklick: immer Info-Dialog.

## Optionen

| Option | Beschreibung |
| --- | --- |
| `register_resource` | Ressource bei jedem Start automatisch eintragen (Standard: an). Ausschalten, wenn deine Dashboards im YAML-Modus laufen; dann `/local/floorplan-3d/floorplan-3d-card.js` selbst als Modul eintragen. |
