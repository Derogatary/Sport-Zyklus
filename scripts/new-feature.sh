#!/usr/bin/env bash
# Legt ein neues Feature-Modul an. Alle erzeugten Dateien liegen in einem
# eigenen Ordner -> kein Merge-Konflikt mit parallel laufenden Batches.
#
#   ./scripts/new-feature.sh <id> "<Titel>" "<Icon>" <order> "<Frage>"
#
# Beispiel:
#   ./scripts/new-feature.sh mood "Stimmung" "🙂" 45 "Wann schwankt meine Stimmung?"

set -euo pipefail

id="${1:?Feature-ID fehlt (kleingeschrieben, ohne Leerzeichen)}"
title="${2:?Titel fehlt}"
icon="${3:-✨}"
order="${4:-90}"
question="${5:-Wann ist was dran?}"

dir="src/features/${id}"
if [ -d "$dir" ]; then
  echo "Fehler: $dir existiert bereits." >&2
  exit 1
fi

mkdir -p "$dir"

cat > "${dir}/feature.tsx" <<EOF
import { defineFeature } from '@/core/feature'
import { fromPhaseTable, type PhaseTable } from '@/core/recommend'

const TABLE: PhaseTable = {
  menstruation: {
    headline: 'TODO',
    detail: 'TODO: ein bis drei Sätze mit Begründung.',
    level: 3,
    levelLabel: 'TODO',
  },
  follicular: {
    headline: 'TODO',
    detail: 'TODO: ein bis drei Sätze mit Begründung.',
    level: 3,
    levelLabel: 'TODO',
  },
  ovulation: {
    headline: 'TODO',
    detail: 'TODO: ein bis drei Sätze mit Begründung.',
    level: 3,
    levelLabel: 'TODO',
  },
  luteal: {
    headline: 'TODO',
    detail: 'TODO: ein bis drei Sätze mit Begründung.',
    level: 3,
    levelLabel: 'TODO',
  },
}

export const feature = defineFeature({
  id: '${id}',
  title: '${title}',
  icon: '${icon}',
  order: ${order},
  question: '${question}',
  recommend: ({ day }) => fromPhaseTable('${id}', TABLE, day),
})
EOF

cat > "${dir}/feature.test.ts" <<EOF
import { describe, expect, it } from 'vitest'
import { cycleDayFor } from '@/core/cycle'
import { CYCLE_PHASES } from '@/core/types'
import { feature } from './feature'

const profile = { lastPeriodStart: '2026-01-01', cycleLength: 28, periodLength: 5 }

describe('${id}', () => {
  it('liefert für jede Phase eine Empfehlung', () => {
    const seen = new Set<string>()
    for (let offset = 0; offset < 28; offset += 1) {
      const day = cycleDayFor(profile, \`2026-01-\${\`\${offset + 1}\`.padStart(2, '0')}\`)
      const recommendation = feature.recommend?.({ day, profile })
      expect(recommendation).toBeTruthy()
      seen.add(day.phase)
    }
    expect(seen.size).toBe(CYCLE_PHASES.length)
  })
})
EOF

echo "Angelegt:"
echo "  ${dir}/feature.tsx"
echo "  ${dir}/feature.test.ts"
echo
echo "Naechste Schritte: Texte fuellen, dann 'npm run verify'."
