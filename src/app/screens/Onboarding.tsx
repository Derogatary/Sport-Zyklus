import { useState } from 'react'
import { CYCLE_LENGTH_RANGE, DEFAULT_PROFILE, PERIOD_LENGTH_RANGE } from '@/core/cycle'
import { today } from '@/core/date'
import { Card } from '@/ui/Card'
import { useAppState } from '../state'

export function Onboarding() {
  const { setProfile, setSettings } = useAppState()
  const [lastPeriodStart, setLastPeriodStart] = useState(today())
  const [cycleLength, setCycleLength] = useState(DEFAULT_PROFILE.cycleLength)
  const [periodLength, setPeriodLength] = useState(DEFAULT_PROFILE.periodLength)

  const submit = () => {
    setProfile({ lastPeriodStart, cycleLength, periodLength })
    setSettings({ ready: true, disclaimerSeen: true })
  }

  return (
    <div className="stack onboarding">
      <Card title="Willkommen" icon="🌙" subtitle="Drei Angaben, dann kann es losgehen">
        <p className="text">
          Sport-Zyklus zeigt dir, wann Training, Fasten, Essen, Schlaf und Fokus zu deiner
          aktuellen Zyklusphase passen. Deine Daten bleiben auf diesem Gerät.
        </p>
        <label className="field">
          <span>Erster Tag deiner letzten Periode</span>
          <input
            type="date"
            value={lastPeriodStart}
            max={today()}
            onChange={(event) => setLastPeriodStart(event.target.value || today())}
          />
        </label>
        <label className="field">
          <span>Wie lang ist dein Zyklus im Schnitt? {cycleLength} Tage</span>
          <input
            type="range"
            min={CYCLE_LENGTH_RANGE.min}
            max={CYCLE_LENGTH_RANGE.max}
            value={cycleLength}
            onChange={(event) => setCycleLength(Number(event.target.value))}
          />
        </label>
        <label className="field">
          <span>Wie lange blutest du? {periodLength} Tage</span>
          <input
            type="range"
            min={PERIOD_LENGTH_RANGE.min}
            max={PERIOD_LENGTH_RANGE.max}
            value={periodLength}
            onChange={(event) => setPeriodLength(Number(event.target.value))}
          />
        </label>
        <button type="button" className="button" onClick={submit}>
          Los geht's
        </button>
        <p className="disclaimer">
          Kein Medizinprodukt und keine Verhütungshilfe. Die Empfehlungen ersetzen keine
          ärztliche Beratung.
        </p>
      </Card>
    </div>
  )
}
