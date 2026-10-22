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
   - **Raum**: Rechteck aufziehen oder Eckpunkte klicken; Klick auf den ersten Punkt schließt den Raum. Die Fläche in m² wird berechnet.
   - **Tür / Fenster**: auf eine Wand klicken, danach entlang der Wand verschieben. Die Art (z. B. Doppeltür, Schiebetür, Garagentor, dreiflügeliges oder rundes Fenster) wählst du in den Eigenschaften oder direkt in der Objektbibliothek unter „Türen & Fenster“.
   - **Objekte**: in der Objektbibliothek ein Möbelstück oder eine Grundform (Würfel, Kugel, Zylinder …) anklicken und in den Grundriss klicken oder hineinziehen. Danach verschieben, drehen, Größe, Farbe und Textur anpassen.
   - **Hitbox**: Rechteck aufziehen, Entität suchen, Höhe und Aktionen wählen.
   - **Etagen**: mit „+ Etage“ weitere Stockwerke anlegen; auf der Karte schaltet man oben links um.
3. **Speichern**.

Bedienung im Editor: mit gedrückter rechter Maustaste ziehen = verschieben (in jedem Werkzeug), Mausrad = Zoom, `Entf` = löschen, `Strg+Z` = rückgängig.

## Karte als ganze Dashboard-Seite

1. Dashboard bearbeiten → neue Ansicht (Tab) hinzufügen → **Ansichtstyp „Panel (einzelne Karte)“** wählen.
2. In dieser Ansicht die 3D Floorplan Card hinzufügen (oder eine vorhandene per Code-Editor hineinkopieren).
3. Im Karten-Editor **„Ganze Dashboard-Seite ausfüllen“** anhaken. Die Karte füllt dann Breite und Höhe der Seite aus und passt sich der Fenstergröße an.

Zusätzlich hat jede Karte unten rechts einen **Vollbild-Button**.

## Hitboxen

- Zeigen Name und Zustand (z. B. `21,5 °C`) und leuchten gelb, wenn die Entität an ist.
- Lampen leuchten in der 3D-Ansicht kräftig in ihrer Farbe, mit Leuchtschein; die Helligkeit steht in Prozent im Label.
- Tippen: *Automatisch* schaltet Licht/Schalter/Cover usw. um, löst Buttons/Szenen/Skripte aus und öffnet sonst den Info-Dialog.
- Halten (oder Rechtsklick) und Doppelklick haben eigene Aktionen; Standard ist Info-Dialog bzw. nichts.
- Der Info-Dialog ist ein eigenes Fenster der Karte: Licht mit Helligkeit, Farbe und Weißton, Sensoren mit Verlaufsgrafik, Kamera mit Live-Bild, Rollladen, Heizung, Medienplayer und mehr. Über ⋮ geht es zum normalen Dialog von Home Assistant; unter *Allgemein → Info-Fenster* kann man ihn auch fest einstellen.

## Optionen

| Option | Beschreibung |
| --- | --- |
| `register_resource` | Ressource bei jedem Start automatisch eintragen (Standard: an). Ausschalten, wenn deine Dashboards im YAML-Modus laufen; dann `/local/floorplan-3d/floorplan-3d-card.js` selbst als Modul eintragen. |
