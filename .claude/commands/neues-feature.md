---
description: Neues Feature-Modul anlegen und mit Inhalten fuellen
---

Lege ein neues Feature-Modul an: $ARGUMENTS

Vorgehen:
1. `./scripts/new-feature.sh <id> "<Titel>" "<Icon>" <order> "<Frage>"` ausfuehren.
2. Die vier Phasen-Eintraege in `src/features/<id>/feature.tsx` mit echten Inhalten
   fuellen - Regeln dazu in `docs/CONTENT-STYLE.md`.
3. Pro inhaltlicher Aussage pruefen, ob eine Quelle in
   `src/features/library/content.ts` fehlt, und sie gegebenenfalls ergaenzen.
4. `npm run verify` laufen lassen.
5. NICHTS ausserhalb von `src/features/<id>/` aendern (Ausnahme: neue Quelle in
   `library/content.ts` unten anhaengen). Begruendung: mehrere Batches laufen
   parallel, siehe CLAUDE.md.
