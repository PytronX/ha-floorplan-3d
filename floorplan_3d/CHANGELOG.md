# Changelog

## 0.5.0

- **Objektbibliothek** wie in SweetHome 3D: Grundformen (Würfel/Quader, Kugel, Zylinder, Kegel, Pyramide, Ring, Halbkugel, Keil) und rund 30 Möbel und Leuchten (Sofa, Sessel, Betten, Schränke, Tische, Stühle, Küche, Bad, Büro, Treppe, Heizkörper, Auto …) mit 3D-Vorschaubildern, Suche und Kategorien. Anklicken und in den Grundriss klicken oder direkt hineinziehen. Danach verschieben, an den Griffpunkten drehen und skalieren, Farbe und Textur wählen, duplizieren (`Strg+D`), drehen (`R`) oder eine Hitbox darauf legen. Liste aller platzierten Objekte.
- **Verschiedene Türen und Fenster:** Drehtür, Doppeltür, Glastür, Balkon-/Terrassentür, Schiebetür, Garagentor und Durchgang; Fenster ein-, zwei- und dreiflügelig, Festverglasung, Schiebefenster, bodentief und rund. Mit Rahmen und Griffen in 3D, passenden Symbolen im Grundriss, Anschlag und Öffnungsseite umschaltbar, eigene Rahmenfarbe.
- **Eigene Info-Fenster** statt des Standard-Dialogs: Licht mit Helligkeitsregler, Farben und Weißtönen; Sensoren mit großer Anzeige und Verlaufsgrafik (6 Std./24 Std./7 Tage, Min/Ø/Max); Kamera mit Standbild und Live-Bild; Schalter, Rollladen mit Position, Heizung mit Zieltemperatur und Modus, Medienplayer, Schloss, Szenen/Skripte; Zeitleiste und letzte Änderungen für Ein/Aus-Entitäten. Auf dem Handy als Bottom-Sheet. Unter *Allgemein → Info-Fenster* lässt sich wieder der HA-Dialog wählen (`info_dialog: ha`).
- **Lichter** leuchten deutlich kräftiger in ihrer echten Farbe (RGB, Farbton oder Farbtemperatur), mit Leuchtschein um die Lampe. Die Helligkeit bestimmt Lichtstärke und Schein und steht als Prozent im Label.
- Fix: Türen öffneten sich in der 3D-Ansicht zur anderen Wandseite als im Grundriss.

## 0.4.1

- Etage löschen, „Alles löschen“ und Import-Fehler zeigen einen eigenen Dialog im Editor statt der Browser-Meldung.
- Klick, Doppelklick und Halten funktionieren auch auf dem Label über einer Hitbox.

## 0.4.0

- **Etagen:** beliebig viele Stockwerke anlegen, benennen und löschen. Im Editor wird die Etage darunter blass eingeblendet. Auf der Karte schaltet man oben links zwischen den Etagen um.
- Ansicht verschieben mit gedrückter **rechter** Maustaste in jedem Werkzeug. Rechtecke werden wieder mit der linken Maustaste aufgezogen.
- Eigene Entitätensuche: Die Vorschläge erscheinen direkt unter dem Feld in der linken Spalte, ohne Dropdown-Pfeil, mit Name und Entitäts-ID.
- Hitboxen haben neben der Klick-Aktion jetzt eine **Halten-** und eine **Doppelklick-Aktion**.
- „2D + 3D“ zeigt Grundriss und 3D-Vorschau nebeneinander.
- Auf dem Handy wird die doppelte Kartenvorschau von HA unter dem Editor ausgeblendet.
- Einheitliche, runde Checkboxen auf allen Geräten.

## 0.3.4

- Großansicht im aktuellen HA-Dialog: oben und unten gleich viel Abstand, linke und rechte Spalte reichen bis ganz nach unten.
- In jedem Zeichenwerkzeug kann man mit gedrückter linker Maustaste die Ansicht verschieben. Rechtecke (Raum + Wände, Hitbox) entstehen jetzt durch zwei Klicks auf gegenüberliegende Ecken, Räume durch Klicken der Eckpunkte.
- Raumflächen in m²: im Grundriss, in der 3D-Ansicht, in den Raum-Eigenschaften und als Gesamtfläche. Ein-/ausschaltbar mit „Quadratmeter anzeigen“ (`show_area`).
- „Ganze Dashboard-Seite ausfüllen“ ist nur noch anklickbar, wenn die Ansicht den Typ „Panel (einzelne Karte)“ hat.

## 0.3.3

- Großansicht füllt das Fenster jetzt genau aus: Das Editor-Fenster scrollt nicht mehr, 2D- und 3D-Ansicht nutzen die volle Höhe, nur die linke Spalte scrollt bei Bedarf.
- Das Fenster ist höher und hat oben und unten den gleichen Abstand zum Bildschirmrand.
- Der Großansicht-Button sitzt in der linken Spalte.
- Überarbeitete Optik: Abschnitte als Karten, Werkzeugleiste mit Symbolen, Umschalter für 2D/3D.
- „Ganze Dashboard-Seite“: kein Scrollbalken mehr durch den Seitenrand unter der Karte.
- Beschriftungen der 3D-Ansicht liegen nicht mehr über Dialogen von Home Assistant.

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
