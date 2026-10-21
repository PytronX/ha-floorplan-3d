# Changelog

## 0.3.2

- Neue Option „Ganze Dashboard-Seite ausfüllen“: Die Karte nimmt die komplette Bildschirmhöhe ein, ideal als einzige Karte in einer Panel-Ansicht.
- Vollbild-Button auf der Karte (unten rechts neben „Ansicht zurücksetzen“).

## 0.3.1

- Neues Editor-Layout: Bei genug Breite stehen links alle Eingabefelder und rechts der Grundriss bzw. die 3D-Ansicht (mitlaufend beim Scrollen).
- Neue Ansicht „2D + 3D“ zeigt Grundriss und 3D-Vorschau gleichzeitig.
- Auffälliger „Großansicht“-Button: macht das Editor-Fenster fast bildschirmfüllend (breiter und höher), blendet die doppelte Kartenvorschau von HA aus und merkt sich die Einstellung.
- Der Grundriss passt sich beim Vergrößern automatisch an.

## 0.3.0

- Dachschrägen: Jede Wand hat eine Höhe am Anfang (A) und am Ende (E).
- Texturen für Wände und Böden: eingebaute Texturen (Parkett, Fliesen, Teppich, Backstein, Beton, Rauputz, Tapete) oder eigene Bilder per URL, mit einstellbarer Kachelgröße. Standard-Texturen für alle Wände/Böden.
- Button „Breiter“ macht das Karten-Editor-Fenster breiter.
- Größerer Zeichenbereich im Editor.
- Keine Linien mehr an den Übergängen verbundener Wände in der 3D-Ansicht.

## 0.2.1

- Behoben: Die Dashboard-Ressource wurde nicht eingetragen („Anmeldung an Home Assistant fehlgeschlagen“), weil der Dienst das Supervisor-Token nicht sah.
- Versionsnummer wird im Seitenleisten-Panel angezeigt.

## 0.2.0

- Als Home-Assistant-App verpackt: kopiert die Karte nach `/config/www/floorplan-3d/` und trägt sie automatisch als Dashboard-Ressource ein.
- Seitenleisten-Panel mit Status und Anleitung.

## 0.1.0

- Erste Version der 3D Floorplan Card mit Editor und Hitboxen.
