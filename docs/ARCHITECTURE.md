# Architektur

## Überblick

```
index.html
└── src/main.tsx                 Einstieg, registriert den Service Worker
    └── src/app/state.tsx        Profil + Einstellungen, Persistenz in localStorage
        └── src/app/App.tsx      Tabs: Heute, Kalender, Feature-Screens, Profil
            ├── src/app/screens/ Heute, Kalender, Profil, Onboarding
            └── src/core/registry.ts
                └── src/features/<id>/feature.tsx
```

## Schichten und Zuständigkeiten

| Ordner | Enthält | Darf importieren |
| --- | --- | --- |
| `src/core` | Zyklusmathematik, Hormonmodell, Typen, Registry, Storage | nichts aus `app`, `ui`, `features` |
| `src/ui` | Darstellungsbausteine ohne Fachlogik | `core` |
| `src/app` | Shell, Navigation, State, Screens | `core`, `ui`, Registry |
| `src/features/<id>` | Ein Thema: Inhalte, Empfehlung, optionaler Screen | `core`, `ui`, `app/state` |

Ein Feature importiert **nie** ein anderes Feature. Wenn zwei Module dieselbe
Logik brauchen, gehört sie nach `src/core` — und das ist eine Shared-Core-Änderung
mit den Regeln aus `BATCH-WORKFLOW.md`.

## Zyklusmodell (`src/core/cycle.ts`)

- Zyklustag = Tage seit `lastPeriodStart`, modulo Zykluslänge, 1-basiert.
- Phasen:
  - `menstruation`: Tag 1 bis `periodLength`
  - `follicular`: bis zwei Tage vor dem Eisprung
  - `ovulation`: Eisprung −2 bis +1
  - `luteal`: danach bis Zyklusende
- Eisprung = `cycleLength − 14`. Die Lutealphase ist relativ konstant, die
  Follikelphase trägt die Längenunterschiede — deshalb funktioniert das Modell
  auch bei 24- oder 35-Tage-Zyklen.
- Die Fenster sind lückenlos und überschneidungsfrei; ein Test prüft das für
  Zykluslängen von 21 bis 45 Tagen.

### Hormonkurven

`hormonesForDay` liefert Östrogen, Progesteron, Testosteron, LH und FSH als
Werte zwischen 0 und 1. Das sind **Modellkurven zur Veranschaulichung**, keine
Messwerte: stützstellenbasierte Interpolation, relativ zum Eisprung normiert,
damit sie bei jeder Zykluslänge sinnvoll aussehen.

## Feature-Vertrag (`src/core/feature.ts`)

```ts
export const feature = defineFeature({
  id: 'training',        // = Ordnername, stabil
  title: 'Sport',
  icon: '🏋️',
  order: 10,             // Position auf dem Heute-Screen
  question: 'Wann welches Training?',
  recommend: ({ day, profile }) => /* Recommendation | null */,
  Screen,                // optional: eigener Tab
  navLabel: 'Sport',     // optional, nur mit Screen
})
```

Die Registry lädt `src/features/*/feature.tsx` über `import.meta.glob` (eager)
und sortiert nach `order`. Kein zentrales Verzeichnis, das gepflegt werden muss
— das ist die technische Voraussetzung für parallele Batches.

## State und Persistenz

`src/app/state.tsx` hält Profil, Einstellungen und das gewählte Datum. Gespeichert
wird unter `sport-zyklus:v<STORAGE_VERSION>:<name>` in `localStorage`; jeder Zugriff
ist in `try/catch` gekapselt, damit die App im privaten Modus nicht abstürzt.
Bei inkompatiblen Datenänderungen `STORAGE_VERSION` in `src/core/storage.ts` erhöhen.

## Routing

Hash-Routing (`#heute`, `#kalender`, `#wissen`, …) in `src/app/router.ts`. Grund:
GitHub Pages liefert bei echten Pfaden 404 aus. Der Deploy legt zusätzlich eine
`404.html` als Fallback ab.

## PWA

`public/manifest.webmanifest` plus ein schlanker Service Worker
(`public/sw.js`, network-first mit Cache-Fallback). Bei einem Release die
Konstante `CACHE` in `sw.js` hochzählen, sonst sehen Nutzerinnen alte Dateien.
