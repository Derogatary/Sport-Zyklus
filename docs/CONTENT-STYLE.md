# Inhalte schreiben

Die App gibt Empfehlungen zu Gesundheit und Training. Der Ton entscheidet, ob
sie hilft oder Druck erzeugt.

## Sprache

- Deutsch, du-Form, kurze Sätze.
- Konkret statt allgemein: „30–60 Minuten früher ins Bett" statt „auf Schlaf achten".
- Fachbegriffe nur mit Erklärung im selben Satz.
- Umlaute korrekt (ä/ö/ü/ß).

## Haltung

- **Angebot, keine Vorschrift.** „Jetzt lohnt sich …" statt „Du musst …".
- **Kein Schuldton.** Heißhunger in der Lutealphase ist Physiologie, nicht
  fehlende Disziplin — genau so wird es formuliert.
- **Streuung benennen.** Zyklen wirken individuell sehr unterschiedlich. Das
  eigene Gefühl schlägt die Tabelle, und das darf dastehen.
- **Keine Diagnosen, keine Heilversprechen, keine Verhütungsberatung.**

## Aufbau einer Empfehlung

```ts
{
  headline: 'Mehr Schlaf, kühler schlafen',        // 3-6 Wörter, konkret
  detail: 'Progesteron hebt die Körperkern...',    // 1-3 Sätze MIT Begründung
  level: 5,                                        // 1-5
  levelLabel: 'hoher Schlafbedarf',                // was die Skala misst
  todos: ['Schlafzimmer kühl (16-18 Grad)', ...],  // optional, umsetzbar
  avoid: ['Späte intensive Einheiten'],            // optional, ohne Drohton
}
```

`level` ist eine Skala von 1 bis 5 und beschreibt immer **das, was `levelLabel`
sagt** — bei Sport die Intensität, bei Schlaf den Bedarf. Nicht mischen.

## Belege

Jede physiologische Aussage braucht einen Eintrag in
`src/features/library/content.ts` mit ehrlicher Einordnung:

| `evidence` | Bedeutung |
| --- | --- |
| `stark` | Metaanalyse, systematisches Review, Leitlinie |
| `gemischt` | Einzelstudien, Fachbuch mit Interpretation |
| `schwach` | populär, wenig belegt |

Wenn die Studienlage dünn oder widersprüchlich ist, gehört das in den Text —
Beispiel: der Mehrbedarf an Kalorien in der Lutealphase wird als Spanne
(100–300 kcal) genannt, weil die Metaanalysen kleinere Effekte finden als die
populäre Literatur.

„Cycle Syncing" ist ein populäres Konzept mit schwacher Evidenz. Die App nutzt
es als Struktur, verkauft es aber nicht als gesichertes Wissen.

## Pflichthinweis

Der Disclaimer („kein Medizinprodukt, ersetzt keine ärztliche Beratung") bleibt
auf dem Heute-Screen und im Onboarding sichtbar. Er wird nicht entfernt und
nicht kleiner gemacht.
