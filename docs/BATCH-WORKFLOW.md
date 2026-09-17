# Parallele Batch-Entwicklung

Ziel: mehrere Aufgaben laufen gleichzeitig (mehrere Claude-Sessions, mehrere
Branches) und gehen einzeln nach `main`, ohne sich gegenseitig zu blockieren.

## Grundprinzip

> **Ein Batch = ein Branch = ein Ordner.**

Konflikte entstehen fast nur an gemeinsam genutzten Dateien. Deshalb ist das
Projekt so gebaut, dass ein neues Feature **ausschließlich aus neuen Dateien**
besteht: die Registry findet Module automatisch (`import.meta.glob`), niemand
muss sich in eine zentrale Liste eintragen.

## Ablauf

1. **Aufgabe schneiden.** Ein Batch beantwortet eine Nutzerfrage und fasst einen
   Ordner an. Vorlage: Issue-Template „Batch-Aufgabe".
2. **Branch starten.**
   ```bash
   ./scripts/new-batch.sh training-texte   # -> batch/training-texte von origin/main
   ```
3. **Umsetzen.** Nur Dateien des eigenen Moduls. Tests dazu.
4. **Prüfen.** `npm run verify` muss lokal grün sein.
5. **Pushen.** `git push -u origin batch/<thema>`.
6. **PR öffnen** (wenn gewünscht). Die Vorlage fragt den Scope ab. Der
   Scope-Guard labelt automatisch `feature:<id>` oder `shared-core`.
7. **Mergen.** Reihenfolge siehe unten.

## Zuständigkeiten je Datei

| Pfad | Wer darf ändern | Konfliktrisiko |
| --- | --- | --- |
| `src/features/<id>/**` | der Batch, dem das Modul gehört | sehr gering |
| `src/features/library/content.ts` | jeder — aber nur **unten anhängen** | gering |
| `src/core/**`, `src/app/**`, `src/ui/**` | nur ein ausdrücklicher Core-Batch | hoch |
| `package.json`, `vite.config.ts`, `tsconfig*`, `eslint.config.js` | nur Core-Batch | hoch |
| `.github/**`, `CLAUDE.md`, `docs/**` | nur Infrastruktur-Batch | mittel |

## Shared Core

Wenn eine Aufgabe wirklich am Kern arbeiten muss:

- **Additiv statt verändernd.** Neue Funktion, neues optionales Feld, neue Datei.
  Bestehende Namen, Signaturen und Felder bleiben, solange andere Batches laufen.
- **Zuerst mergen.** Ein Core-Batch geht vor den Feature-Batches nach `main`,
  danach ziehen die Feature-Branches `main` nach.
- **Test mitliefern.** Kernänderungen ohne Test werden nicht gemerged.
- **Klein halten.** Eine Änderung pro PR.

Wenn zwei Batches gleichzeitig denselben Kern brauchen: erst einen kleinen
Core-PR mergen, der beiden dient, dann parallel weiterbauen.

## Merge-Reihenfolge bei mehreren fertigen Batches

1. Core-/Infrastruktur-PRs
2. Feature-PRs (Reihenfolge egal, sie berühren sich nicht)
3. Reine Inhalts-PRs

Empfohlen: in den Repository-Einstellungen die **Merge Queue** aktivieren
(*Settings → General → Pull Requests*). Die CI reagiert bereits auf
`merge_group`, dadurch testet GitHub jeden Batch gegen den Stand nach dem
vorherigen Merge — ohne dass jemand von Hand Branches aktualisiert.

Nach einem Merge nach `main` zieht jeder laufende Batch nach:

```bash
git fetch origin main
git merge origin/main        # kein Rebase auf geteilten Branches
npm run verify
```

## Konflikt trotzdem passiert?

- **Konflikt in `content.ts`:** beide Blöcke behalten, Reihenfolge egal, IDs
  müssen eindeutig bleiben (der Test prüft das).
- **Konflikt in `package-lock.json`:** Datei verwerfen, `npm install` neu laufen
  lassen, Ergebnis committen.
- **Konflikt in Shared Core:** nicht raten. Den Core-Batch zuerst mergen, dann
  den Feature-Branch neu auf `main` aufsetzen.

## Checkliste vor dem Push

- [ ] Nur Dateien meines Moduls geändert (`git diff --name-only origin/main`)
- [ ] `npm run verify` grün
- [ ] Tests für neues Verhalten vorhanden
- [ ] Inhaltliche Aussagen durch eine Quelle in `library/content.ts` gedeckt
- [ ] Commit-Nachricht sagt, *was* sich für die Nutzerin ändert
