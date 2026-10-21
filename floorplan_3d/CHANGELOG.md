# Changelog

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
