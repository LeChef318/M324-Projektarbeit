# Einfacher Währungsrechner

Der Währungsrechner ist eine schlanke Webanwendung, mit der Beträge zwischen verschiedenen Währungen umgerechnet werden können. Die aktuellen Referenzkurse werden über die öffentlich zugängliche Frankfurter API bezogen, die täglich (ca. 16:00 CET) aktualisiert wird und ohne API-Schlüssel auskommt.

- **Ziel**: Schnelle und zuverlässige Umrechnung von Beträgen zwischen gängigen Währungen auf Basis aktueller Referenzkurse.
- **Kernfunktionen**:
  - Auswahl von Quell- und Zielwährung
  - Eingabe eines Betrags und sofortige Umrechnung
  - Anzeige des verwendeten Wechselkurses und Datums
  - Optional: Wechsel der Basiswährung, Einschränkung auf bestimmte Zielwährungen
- **Nicht-Ziele**:
  - Keine Spekulations- oder Intraday-Trading-Funktionen
  - Keine Speicherung personenbezogener Daten

### Technische Grundlage

- **API**: Frankfurter API ([frankfurter.dev](https://frankfurter.dev/))
  - Keine API-Keys, keine Limits für typische Nutzung
  - Endpunkte für aktuelle, historische und Zeitreihen-Kurse
- **Beispiel-Endpunkte**:
  - Aktuelle Kurse (Basis EUR): `https://api.frankfurter.dev/v1/latest`
  - Aktuelle Kurse mit anderer Basis und Zielwährungen: `https://api.frankfurter.dev/v1/latest?base=USD&symbols=CHF,EUR`

## 🛠️ Installation

1. **Klone oder lade das Repository herunter:**
   ```bash
   git clone https://github.com/LeChef318/M324-Projektarbeit.git
   cd modul_projekt
   ```

2. **Installations dependencies:**
   ```bash
   npm install
   ```

3. **Installation von Angular CLI global (falls noch nicht installiert):**
   ```bash
   npm install -g @angular/cli@20
   ```

## 🏃‍♂️ Applikation laufen lassen

1. **Development Server starten:**
   ```bash
   npm start
   # or
   ng serve
   ```

2. **Öffne deinen Browser und navigiere zu:**
   ```
   http://localhost:4200
   ```

Diese Applikation aktualisiert sich automatisch wenn Änderungen vorgenommen wurden.

## 🏗️ Für Produktion bauen

Um das Projekt für die Produnktion zu bauen:

```bash
npm run build
# or
ng build
```

Die build artifacts werden in `dist/` gespeichert.

### Datenfluss und Architektur

1. Nutzer wählt Quellwährung, Zielwährung und Betrag.
2. Frontend ruft den `latest`-Endpunkt der Frankfurter API mit `base` und `symbols` auf.
3. Antwort wird verarbeitet; Umrechnung erfolgt im Client.
4. Ergebnis (umgerechneter Betrag, Kurs, Datum) wird angezeigt.

### Beispiel: Umrechnung im Client

```javascript
async function convert(from, to, amount) {
  const resp = await fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`);
  const data = await resp.json();
  const rate = data.rates[to];
  const converted = (amount * rate).toFixed(2);
  return { converted, rate, date: data.date };
}
```

### Linting Ruleset

Das verwendete Ruleset ist das Standard-Ruleset von Angular und wurde von uns nicht verändert.
(**Dies kann sich noch ändern, wenn wir die Notwendigkeit sehen**)

### Hinweise zur Nutzung

- **Zeitzonen**: Die API speichert Daten in UTC; das „heutige“ Datum kann je nach Zeitzone variieren.
- **Stabilität**: Kurse für den aktuellen Tag können sich bis zur täglichen VeröDie ffentlichung noch ändern.
- **Performance**: Mit `symbols` auf benötigte Währungen beschränken, um Antwortgröße und Latenz zu reduzieren.

### Qualität und Erweiterbarkeit

- **Validierung**: Eingaben prüfen (Betrag ≥ 0, unterstützte Währungscodes).
- **Fehlerbehandlung**: Netzwerkausfälle, ungültige Parameter, nicht verfügbare Kurse.
- **Erweiterungen (optional)**:
  - Historische Kurse und Diagramme (Zeitreihen-Endpunkt)
  - Favoriten/zuletzt verwendete Währungen
  - Offline-Hinweise/Retry-Logik

Quelle: Frankfurter API – siehe Dokumentation unter [frankfurter.dev](https://frankfurter.dev/).


## Tech-Stack

- **Frontend**: JavaScript/TypeScript
- **Framework**: Angular 20
- **IDE**: VSCode, Cursor
- **Linting**: ESLint
- **Testing**: Jasmin & Karma

## Design
- **Color Grading**: Blau/Violet
- **Hintergrundfarbe**: Weiss
- **Darktheme**: Nein
- **Schriftartv: Default Schriftart nicht serif
- **Responsive Design**: Ja
- **Sprache**: Englisch

## BBZBL Modul 324: Web-Applikation Template

Dieses Template dient als Vorlage zum Starten eures Projekts.

Ziel ist es ein Repository zu erstellen, welches, [wie das Muster](https://github.com/herrhodel/modul-324-muster) eine
Web-Applikation enthält, welche automatisch getestet, gebaut, released und deployed wird.

> [!NOTE]
> Die Web-Applikation muss in einem Ordner `/app` erstellt werden. Ansonsten müssen Folgescripts angepasst werden.

Je nach Thema, können vom Muster die Grundlagen kopiert und abgeändert werden.
Natürlich soll dieses Repo nicht nur ein Nginx sondern eine eigene Applikation beinhalten.

**Wieso nicht direkt das Muster als Grundlage?**

Dies war tatsächlich mal so. Die Erfahrung hat gezeigt, dass die Komplexität
das Verständnis erschwert. Die Idee ist, dass die einzelnen Schritte bewusster
umgesetzt werden und man nicht am Anfang vor lauter Bäume den Wald nicht mehr sieht.

In der ersten Woche wird bewusst das Muster bei allen zum Laufen gebracht. Dies
soll ermöglichen, dass ein Gesamtüberblick von Anfang an existiert.

> [!NOTE]
> Vorgegebene Ordnerstruktur
> Die Ordnerstruktur soll analog zum Muster aufgesetzt werden.
>
> Der Ordner `docs` wird von Anfang an benötigt und ist direkt im starter
> vorgegeben.
