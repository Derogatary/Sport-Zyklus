import { cycleRange } from '@/core/cycle'
import { addDays, formatShort, today } from '@/core/date'
import { PHASE_INFO } from '@/core/phases'
import { Card } from '@/ui/Card'
import { useAppState } from '../state'

const DAYS_AHEAD = 35

export function Calendar() {
  const { profile, selectedDate, setSelectedDate } = useAppState()
  const start = addDays(today(), -7)
  const days = cycleRange(profile, start, DAYS_AHEAD)

  return (
    <div className="stack">
      <Card title="Zyklus-Vorschau" icon="🗓️" subtitle="Eine Woche zurück, vier Wochen voraus">
        <ul className="timeline">
          {days.map((day) => {
            const info = PHASE_INFO[day.phase]
            const isSelected = day.date === selectedDate
            const isToday = day.date === today()
            return (
              <li key={day.date}>
                <button
                  type="button"
                  className={`timeline__day ${isSelected ? 'is-selected' : ''} ${isToday ? 'is-today' : ''}`}
                  onClick={() => setSelectedDate(day.date)}
                  aria-current={isSelected ? 'date' : undefined}
                >
                  <span className="timeline__dot" style={{ background: info.color }} />
                  <span className="timeline__label">{formatShort(day.date)}</span>
                  <span className="timeline__phase">{info.short}</span>
                  <span className="timeline__cycleday">ZT {day.dayOfCycle}</span>
                </button>
              </li>
            )
          })}
        </ul>
        <p className="note">
          Tag antippen, um die Empfehlungen im Reiter "Heute" für diesen Tag zu sehen.
        </p>
      </Card>
    </div>
  )
}
