import { defineFeature } from '@/core/feature'
import { HORMONE_LABELS, PHASE_INFO } from '@/core/phases'
import { Card } from '@/ui/Card'
import { HormoneBars } from '@/ui/HormoneBars'
import { useAppState } from '@/app/state'
import { HormoneChart } from './HormoneChart'
import type { HormoneLevels, Level, Recommendation } from '@/core/types'

function dominant(hormones: HormoneLevels): keyof HormoneLevels {
  return (Object.keys(hormones) as Array<keyof HormoneLevels>).reduce((best, key) =>
    hormones[key] > hormones[best] ? key : best,
  )
}

function Screen() {
  const { profile, day } = useAppState()
  const info = PHASE_INFO[day.phase]
  return (
    <div className="stack">
      <Card title="Hormonverlauf" icon="🧬" subtitle={`Zyklustag ${day.dayOfCycle} von ${day.cycleLength}`}>
        <HormoneChart profile={profile} currentDay={day.dayOfCycle} />
        <p className="text">{info.hormoneNote}</p>
      </Card>
      <Card title="Heute" icon="📍" subtitle="Geschätzte relative Hormonlage">
        <HormoneBars hormones={day.hormones} />
        <p className="note">
          Modellkurven auf Basis eines typischen Zyklus - keine Messwerte. Bei hormoneller
          Verhütung verlaufen die eigenen Hormone anders.
        </p>
      </Card>
    </div>
  )
}

export const feature = defineFeature({
  id: 'hormones',
  title: 'Hormone',
  icon: '🧬',
  order: 60,
  question: 'Wann sind welche Hormone stark?',
  navLabel: 'Hormone',
  Screen,
  recommend: ({ day }): Recommendation => {
    const top = dominant(day.hormones)
    const level = Math.max(1, Math.min(5, Math.round(day.hormones[top] * 5))) as Level
    return {
      topic: 'hormones',
      headline: `${HORMONE_LABELS[top]} dominiert`,
      detail: PHASE_INFO[day.phase].hormoneNote,
      level,
      levelLabel: `${HORMONE_LABELS[top]} bei ca. ${Math.round(day.hormones[top] * 100)} %`,
    }
  },
})
