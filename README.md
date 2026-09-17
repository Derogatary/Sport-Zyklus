# Sport-Zyklus

Eine Web-App auf Deutsch, die zeigt, was zur aktuellen Zyklusphase passt:
Training, Fasten, Kalorien, Erholung, Schlaf, Hormone und Fokus.

- **Läuft als PWA** — installierbar, offlinefähig, ohne Konto.
- **Ohne Server** — alle Angaben bleiben im Browser des Geräts (`localStorage`).
- **Ausspielung** über GitHub Pages, später als Android-App (siehe `docs/ROADMAP.md`).

## Schnellstart

```bash
npm ci
npm run dev      # http://localhost:5173
npm run verify   # Lint + Tests + Build
```

## Funktionen

| Screen | Inhalt |
| --- | --- |
| Heute | Zyklustag, Phase, Tage bis zur nächsten Periode und je eine Empfehlung pro Modul |
| Kalender | Eine Woche zurück, vier Wochen voraus; Tag antippen zeigt dessen Empfehlungen |
| Hormone | Modellkurven für Östrogen, Progesteron, Testosteron und LH über den Zyklus |
| Wissen | Studien, Bücher und Creator mit ehrlicher Einordnung der Evidenz |
| Profil | Zyklusdaten pflegen, alles lokal löschen |

## Aufbau

```
src/
  core/        Zyklusmathematik, Hormonmodell, Typen, Feature-Registry (kein React)
  features/    ein Ordner pro Modul - wird automatisch registriert
  app/         Navigation, State, Screens
  ui/          Karten, Balken, Stile
```

Neues Modul anlegen:

```bash
./scripts/new-feature.sh mood "Stimmung" "🙂" 45 "Wann schwankt meine Stimmung?"
```

## Parallel arbeiten

Das Repo ist darauf ausgelegt, dass mehrere Aufgaben gleichzeitig laufen und
einzeln nach `main` gemerged werden: ein Batch = ein Branch = ein Ordner.
Die Regeln stehen in `CLAUDE.md` und ausführlich in `docs/BATCH-WORKFLOW.md`.

## Hinweis

Kein Medizinprodukt, keine Verhütungshilfe. Die Empfehlungen sind allgemeine
Orientierung und ersetzen keine ärztliche Beratung.
