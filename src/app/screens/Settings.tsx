import { CYCLE_LENGTH_RANGE, PERIOD_LENGTH_RANGE } from '@/core/cycle'
import { today } from '@/core/date'
import { STORAGE_VERSION } from '@/core/storage'
import { Card } from '@/ui/Card'
import { useAppState } from '../state'

export function Settings() {
  const { profile, setProfile, resetAll } = useAppState()

  return (
    <div className="stack">
      <Card title="Dein Zyklus" icon="⚙️">
        <label className="field">
          <span>Erster Tag der letzten Periode</span>
          <input
            type="date"
            value={profile.lastPeriodStart}
            max={today()}
            onChange={(event) =>
              setProfile({ ...profile, lastPeriodStart: event.target.value || today() })
            }
          />
        </label>
        <label className="field">
          <span>Zykluslänge: {profile.cycleLength} Tage</span>
          <input
            type="range"
            min={CYCLE_LENGTH_RANGE.min}
            max={CYCLE_LENGTH_RANGE.max}
            value={profile.cycleLength}
            onChange={(event) => setProfile({ ...profile, cycleLength: Number(event.target.value) })}
          />
        </label>
        <label className="field">
          <span>Dauer der Blutung: {profile.periodLength} Tage</span>
          <input
            type="range"
            min={PERIOD_LENGTH_RANGE.min}
            max={PERIOD_LENGTH_RANGE.max}
            value={profile.periodLength}
            onChange={(event) =>
              setProfile({ ...profile, periodLength: Number(event.target.value) })
            }
          />
        </label>
        <label className="field field--row">
          <input
            type="checkbox"
            checked={profile.hormonalContraception ?? false}
            onChange={(event) =>
              setProfile({ ...profile, hormonalContraception: event.target.checked })
            }
          />
          <span>Ich nutze hormonelle Verhütung</span>
        </label>
        {profile.hormonalContraception && (
          <p className="note">
            Mit hormoneller Verhütung finden Eisprung und natürliche Hormonschwankungen meist
            nicht statt. Die Phasenanzeige ist dann nur eine grobe Orientierung.
          </p>
        )}
      </Card>

      <Card title="Daten" icon="🔒">
        <p className="text">
          Alle Angaben bleiben lokal auf deinem Gerät (localStorage, Schema v{STORAGE_VERSION}).
          Es gibt keinen Server und kein Tracking.
        </p>
        <button type="button" className="button button--danger" onClick={resetAll}>
          Alle Daten löschen
        </button>
      </Card>
    </div>
  )
}
