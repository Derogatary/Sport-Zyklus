# Roadmap

Der Stand jetzt: Grundgerüst mit acht Modulen, GitHub Pages, parallele Batches.
Alles Folgende ist in Batches geschnitten, die sich **nicht** gegenseitig
blockieren — jede Zeile ist ein eigener Branch und ein eigener Ordner.

## Als Nächstes (jeweils ein Batch)

| Batch | Ordner | Inhalt |
| --- | --- | --- |
| `feature-mood` | `src/features/mood/` | Stimmung und PMS im Zyklusverlauf |
| `feature-cycle-log` | `src/features/log/` | Symptome, Blutung und Training eintragen |
| `feature-notifications` | `src/features/reminders/` | lokale Erinnerungen („morgen Phasenwechsel") |
| `content-training` | `src/features/training/` | Texte nach Sportart differenzieren |
| `library-ausbau` | `src/features/library/` | mehr Studien, Filter nach Thema |

## Core-Batches (laufen einzeln, vor den Feature-Batches)

| Batch | Inhalt |
| --- | --- |
| `core-zykluslernen` | Zykluslänge aus eingetragenen Perioden mitteln statt fester Angabe |
| `core-export` | Daten als JSON exportieren und importieren (Gerätewechsel) |
| `core-i18n` | Texte aus den Modulen in eine Sprachdatei ziehen, Englisch ergänzen |
| `core-a11y` | Kontraste, Fokus-Reihenfolge, Screenreader-Test |
| `core-theme` | Helles Design zusätzlich zum dunklen |

## Infrastruktur

- Merge Queue im Repository aktivieren (die CI reagiert bereits auf `merge_group`).
- Echte PR-Vorschau-URLs über einen `gh-pages`-Branch mit `/pr-<n>/`-Unterordnern.
  Offener Punkt: gleichzeitige Deploys mehrerer Batches müssen serialisiert werden.
- Lighthouse-Check in der CI (PWA-Kriterien für den Store-Weg).

## Android

Siehe `docs/DEPLOYMENT.md`. Reihenfolge: PWA-Kriterien absichern → TWA über
Bubblewrap → interner Test-Track → offener Test → Produktion. Capacitor erst,
wenn native Funktionen wirklich gebraucht werden.

## Bewusst nicht geplant

- Kein Backend, kein Konto, kein Tracking.
- Keine Verhütungs- oder Fruchtbarkeitsvorhersage. Das Modell ist dafür zu grob
  und die Verantwortung zu groß.
