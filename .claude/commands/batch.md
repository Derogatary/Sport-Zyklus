---
description: Einen Batch von einem frischen main starten
---

Starte einen neuen Batch: $ARGUMENTS

1. `./scripts/new-batch.sh <thema>` ausfuehren (Branch `batch/<thema>` von origin/main).
2. Scope pruefen: Welche Dateien werden angefasst? Beruehrt das Shared Core
   (`src/core`, `src/app`, `src/ui`, Build-Config)? Falls ja: erst die Regeln in
   `docs/BATCH-WORKFLOW.md` lesen und den Eingriff so klein wie moeglich halten.
3. Aufgabe umsetzen, Tests ergaenzen, `npm run verify`.
4. Committen und pushen; der PR nutzt die Vorlage in `.github/PULL_REQUEST_TEMPLATE.md`.
