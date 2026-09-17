# CLAUDE.md

Arbeitsanweisung für Claude Code in diesem Repository. Kurz lesen, dann loslegen.

## Was das Projekt ist

**Sport-Zyklus** ist eine Web-App (PWA) auf Deutsch, die Frauen zeigt, was zur
aktuellen Zyklusphase passt:

| Frage der Nutzerin | Modul |
| --- | --- |
| Wann welches Training? | `src/features/training` |
| Wann brauche ich mehr Kalorien? | `src/features/nutrition` |
| Wann fasten? | `src/features/fasting` |
| Wann mehr ausruhen? | `src/features/recovery` |
| Wann brauche ich mehr Schlaf? | `src/features/sleep` |
| Wann sind welche Hormone stark? | `src/features/hormones` |
| Wann bin ich kreativer? | `src/features/creativity` |
| Welche Studien, Bücher, Creator gibt es dazu? | `src/features/library` |

Ausspielung: **jetzt** GitHub Pages, **später** Android-App über TWA/Capacitor
(siehe `docs/ROADMAP.md`). Alle Daten bleiben lokal auf dem Gerät, es gibt keinen
Server, kein Konto, kein Tracking.

## Befehle

```bash
npm ci                 # Abhängigkeiten installieren
npm run dev            # Dev-Server auf http://localhost:5173
npm run verify         # Lint + Tests + Build  <- vor jedem Commit
npm test               # nur Tests (vitest)
npm run lint           # nur ESLint
npm run typecheck      # nur TypeScript
./scripts/new-batch.sh <thema>                       # neuer Batch-Branch
./scripts/new-feature.sh <id> "<Titel>" "<Icon>" <order> "<Frage>"
```

## Architektur in drei Sätzen

1. `src/core/` enthält die Domänenlogik (Zyklusmathematik, Hormonkurven, Typen)
   und den Feature-Vertrag. Reines TypeScript, kein React, vollständig getestet.
2. `src/features/<id>/` enthält je ein eigenständiges Modul mit **eigener**
   `feature.tsx`, eigenen Inhalten und eigenen Tests.
3. `src/app/` und `src/ui/` sind die Hülle: Navigation, State, Karten, Stile.

Die Feature-Registry (`src/core/registry.ts`) findet Module über
`import.meta.glob` **automatisch**. Es gibt bewusst **keine zentrale Liste**, in
die sich neue Features eintragen müssen — genau deshalb können mehrere Batches
gleichzeitig Features bauen, ohne sich zu blockieren.

Details: `docs/ARCHITECTURE.md`.

## Parallele Batch-Entwicklung — die wichtigste Regel

Mehrere Claude-Sessions arbeiten gleichzeitig an diesem Repo. Damit das ohne
Merge-Konflikte funktioniert:

1. **Ein Batch = ein Branch = ein Ordner.** Branch-Namen: `batch/<thema>`,
   gestartet mit `./scripts/new-batch.sh <thema>` von einem frischen `origin/main`.
2. **Bleib in deinem Ordner.** Ein Feature-Batch fasst nur
   `src/features/<id>/**` an. Nichts anderes.
3. **Shared Core ist tabu, außer die Aufgabe sagt es ausdrücklich.**
   Shared Core = `src/core/`, `src/app/`, `src/ui/`, `package.json`,
   `vite.config.ts`, `tsconfig*.json`, `eslint.config.js`, `.github/`.
   Wenn du dort etwas brauchst: **nur additiv** (neue Datei, neues optionales
   Feld, neue Funktion). Niemals umbenennen oder entfernen, während andere
   Batches laufen.
4. **Gemeinsame Listen nur unten anhängen.** Neue Quellen kommen ans *Ende* von
   `SOURCES` in `src/features/library/content.ts`. Ein Anhängen am Ende erzeugt
   deutlich seltener Konflikte als Einfügen in der Mitte.
5. **`npm run verify` muss grün sein, bevor du pushst.** Ein roter Branch
   blockiert alle anderen Batches beim Mergen.
6. **Klein bleiben.** Lieber drei kleine PRs als einer, der alles anfasst.

Der Workflow `.github/workflows/scope-guard.yml` labelt jeden PR automatisch mit
`feature:<id>` bzw. `shared-core`, damit sichtbar ist, wer wem in die Quere kommt.

Der ganze Ablauf inklusive Merge-Reihenfolge steht in `docs/BATCH-WORKFLOW.md`.

## Ein neues Feature bauen

```bash
./scripts/new-feature.sh mood "Stimmung" "🙂" 45 "Wann schwankt meine Stimmung?"
```

Das legt `feature.tsx` (mit Phasentabelle) und `feature.test.ts` an. Danach nur
noch die vier Phasen-Einträge mit echten Inhalten füllen und `npm run verify`
laufen lassen. Das Feature erscheint automatisch auf dem Heute-Screen — an der
Position, die `order` vorgibt.

Ein Feature mit eigenem Tab bekommt zusätzlich `Screen` und `navLabel`
(Beispiele: `src/features/hormones`, `src/features/library`).

## Inhaltliche Regeln (wichtig, das ist eine Gesundheits-App)

- **Deutsch, du-Form, konkret.** Keine Fachsprache ohne Erklärung.
- **Vorschläge, keine Vorschriften.** Der Zyklus wirkt individuell sehr
  unterschiedlich; „nach Gefühl" schlägt jede Tabelle.
- **Keine Diagnosen, keine Heilversprechen, keine Verhütungsberatung.** Die App
  ist kein Medizinprodukt. Der Hinweis auf ärztliche Abklärung bleibt sichtbar.
- **Jede physiologische Aussage braucht Rückendeckung** in
  `src/features/library/content.ts`, ehrlich eingeordnet als `stark`,
  `gemischt` oder `schwach`. Vieles rund um „Cycle Syncing" ist populär und
  schwach belegt — das gehört so benannt.
- **Umlaute korrekt schreiben** (ä/ö/ü/ß), die Dateien sind UTF-8.

Mehr dazu: `docs/CONTENT-STYLE.md`.

## Codekonventionen

- TypeScript strikt, keine `any`. Importe innerhalb von `src` über den Alias `@/`.
- React-Funktionskomponenten, keine Klassen. Kein State-Management-Paket —
  `src/app/state.tsx` reicht.
- Kein CSS-Framework: Klassen in `src/ui/styles.css`, Farben als CSS-Variablen.
- Neue Laufzeit-Abhängigkeiten nur, wenn es ohne wirklich nicht geht (die App
  soll klein und offlinefähig bleiben). Das ist immer eine Shared-Core-Änderung.
- Kommentare erklären das *Warum*, nicht das *Was*. Deutsch ist okay.
- Datumswerte sind `YYYY-MM-DD`-Strings in lokaler Zeit (`src/core/date.ts`).
  Nie `new Date(string)` direkt verwenden — das verschiebt über UTC.

## Tests

- Jede Änderung an `src/core/` braucht einen Test in `src/core/*.test.ts`.
- Jedes Feature braucht mindestens den Test, dass alle vier Phasen eine
  vollständige Empfehlung liefern (`scripts/new-feature.sh` legt ihn an).
- `src/core/registry.test.ts` prüft alle Module gemeinsam — er muss grün bleiben,
  auch wenn Features dazukommen.

## Deployment

- Push auf `main` → `.github/workflows/deploy-pages.yml` baut und veröffentlicht
  auf GitHub Pages (Basis-Pfad `/<repo>/` über `BASE_PATH`).
- Einmalig im Repository nötig: *Settings → Pages → Source: GitHub Actions*.
- Pull Requests bauen ebenfalls und legen den Build als Artefakt `preview-pr-<n>`
  ab, zum lokalen Ansehen.

## Was du nicht tun sollst

- Keine Pull Requests eröffnen, ohne dass danach gefragt wurde.
- Nicht auf fremde Batch-Branches pushen.
- Keine Analytics, kein Backend, keine externen Fonts oder CDNs einbauen.
- Keine echten Gesundheitsdaten committen (auch keine Beispieldaten, die wie
  echte aussehen). Testdaten sind offensichtlich synthetisch: `2026-01-01`.
