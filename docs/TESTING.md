# Testing Anleitung

Dieses Projekt verwendet **Jasmine** und **Karma** für Unit-Tests, wie in den Projektanforderungen spezifiziert.

## Verfügbare Test-Scripts

### Entwicklungs-Tests
```bash
# Tests im Watch-Modus ausführen (für Entwicklung)
npm test
# oder
ng test
```

### CI/CD-Tests
```bash
# Tests einmalig im Headless Chrome ausführen (für CI/CD)
npm run test:ci
```

### Coverage-Berichte
```bash
# Tests mit Code-Coverage-Bericht ausführen
npm run test:coverage
```

## Test-Konfiguration

- **Test Framework**: Jasmine 5.1.0
- **Test Runner**: Karma 6.4.0
- **Browser**: Chrome (ChromeHeadless für CI)
- **Coverage Tool**: Istanbul (in Angular integriert)

## Konfigurationsdateien

- `karma.conf.js` - Karma-Konfiguration
- `src/test.ts` - Test-Setup und Bootstrapping
- `tsconfig.spec.json` - TypeScript-Konfiguration für Tests

## Test-Struktur

Alle Test-Dateien folgen der Namenskonvention `*.spec.ts` und sind in einem dedizierten `tests/`-Verzeichnis organisiert, das die Anwendungsstruktur widerspiegelt:

```
src/
├── app/
│   ├── app.component.ts
│   └── components/
│       ├── header/
│       │   └── header.component.ts
│       ├── footer/
│       │   └── footer.component.ts
│       └── home/
│           └── home.component.ts
└── tests/
    ├── unit/
    │   ├── app.component.spec.ts
    │   └── components/
    │       ├── header/
    │       │   └── header.component.spec.ts
    │       ├── footer/
    │       │   └── footer.component.spec.ts
    │       └── home/
    │           └── home.component.spec.ts
    └── integration/
        ├── app.integration.spec.ts
        └── currency-converter.integration.spec.ts
```

Diese Struktur bietet eine saubere Trennung zwischen Quellcode und Test-Dateien und behält gleichzeitig eine klare Beziehung zwischen Komponenten und ihren Tests bei.

### Import-Muster

Test-Dateien verwenden absolute Imports aus dem `src`-Verzeichnis, um auf die zu testenden Komponenten zu verweisen:

```typescript
// Beispiel: src/tests/unit/components/header/header.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from 'src/app/components/header/header.component';
```

Dieser Ansatz stellt sicher, dass Imports konsistent und leicht verständlich bleiben, unabhängig von der Position der Test-Datei in der Verzeichnisstruktur.

## Test-Arten

### Unit-Tests
Unit-Tests konzentrieren sich auf das Testen einzelner Komponenten in Isolation. Sie befinden sich in `src/tests/unit/` und folgen dem Namensschema `*.spec.ts`.

**Beispiel:**
```typescript
// src/tests/unit/components/header/header.component.spec.ts
describe('HeaderComponent', () => {
  // Testet individuelles Komponentenverhalten
});
```

### Integrations-Tests
Integrations-Tests überprüfen, wie mehrere Komponenten zusammenarbeiten und testen Komponenteninteraktionen, Datenfluss und API-Integration. Sie befinden sich in `src/tests/integration/` und folgen dem Namensschema `*.integration.spec.ts`.

**Beispiel:**
```typescript
// src/tests/integration/app.integration.spec.ts
describe('App Integration Tests', () => {
  // Testet Komponenteninteraktionen und Datenfluss
});
```

**Hauptunterschiede:**
- **Unit-Tests**: Testen Komponenten isoliert, mocken Abhängigkeiten
- **Integrations-Tests**: Testen Komponenteninteraktionen, echte oder gemockte Services, Datenfluss zwischen Komponenten

Beide Test-Arten laufen zusammen in derselben Test-Suite, was es einfach macht, umfassende Abdeckung der Anwendung zu erreichen.

## Coverage-Berichte

Coverage-Berichte werden im `coverage/`-Verzeichnis generiert und umfassen:
- HTML-Berichte für detaillierte Coverage-Analyse
- LCOV-Format für CI/CD-Integration
- Text-Zusammenfassung in der Konsole

### Coverage-Schwellenwerte

Das Projekt ist mit folgenden Coverage-Schwellenwerten konfiguriert:
- **Statements**: 80%
- **Branches**: 70%
- **Functions**: 80%
- **Lines**: 80%

## Tests Schreiben

### Grundlegende Komponenten-Test-Struktur

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YourComponent } from './your-component.component';

describe('YourComponent', () => {
  let component: YourComponent;
  let fixture: ComponentFixture<YourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourComponent], // Für Standalone-Komponenten
    }).compileComponents();

    fixture = TestBed.createComponent(YourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### Test-Best-Practices

1. **Test-Isolation**: Jeder Test sollte unabhängig sein
2. **Beschreibende Namen**: Verwende klare, beschreibende Test-Namen
3. **AAA-Muster**: Arrange, Act, Assert
4. **Mock-Abhängigkeiten**: Verwende Mocks für externe Abhängigkeiten
5. **Test-Grenzfälle**: Schließe Grenz- und Fehlerbedingungen ein

## Tests in verschiedenen Umgebungen ausführen

### Lokale Entwicklung
```bash
npm test
```
- Öffnet Browser-Fenster
- Überwacht Dateiänderungen
- Bietet detailliertes Feedback

### Continuous Integration
```bash
npm run test:ci
```
- Läuft im Headless Chrome
- Einmaliger Lauf (kein Watch-Modus)
- Geeignet für CI/CD-Pipelines

### Coverage-Analyse
```bash
npm run test:coverage
```
- Generiert Coverage-Berichte
- Erzwingt Coverage-Schwellenwerte
- Erstellt HTML-Coverage-Bericht

## Fehlerbehebung

### Häufige Probleme

1. **Chrome nicht gefunden**: Chrome-Browser installieren oder anderen Browser in `karma.conf.js` verwenden
2. **Tests laufen in Timeout**: Timeout in Jasmine-Konfiguration erhöhen
3. **Speicherprobleme**: Parallele Test-Ausführung reduzieren

### Debug-Modus

Um Tests im Browser zu debuggen:
```bash
npm test
```
Dann auf "Debug" im Karma-Browser-Fenster klicken.

## Integration mit CI/CD

Das `test:ci`-Script ist für Continuous Integration-Umgebungen konzipiert:
- Verwendet Headless Chrome
- Läuft einmalig ohne Überwachung
- Gibt entsprechende Exit-Codes zurück
- Generiert Coverage-Berichte

Beispiel GitHub Actions-Verwendung:
```yaml
- name: Tests ausführen
  run: npm run test:ci
```
