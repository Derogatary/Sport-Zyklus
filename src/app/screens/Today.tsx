import { features } from '@/core/registry'
import { PHASE_INFO } from '@/core/phases'
import { formatLong } from '@/core/date'
import { Card } from '@/ui/Card'
import { PhaseBadge } from '@/ui/PhaseBadge'
import { RecommendationCard } from '@/ui/RecommendationCard'
import { useAppState } from '../state'

export function Today() {
  const { profile, day } = useAppState()
  const info = PHASE_INFO[day.phase]

  return (
    <div className="stack">
      <Card accent={info.color}>
        <p className="today__date">{formatLong(day.date)}</p>
        <div className="today__head">
          <div>
            <p className="today__cycleday">
              Zyklustag {day.dayOfCycle}
              <span className="today__total"> / {day.cycleLength}</span>
            </p>
            <PhaseBadge phase={day.phase} />
          </div>
          <div className="today__next">
            <span>nächste Periode</span>
            <strong>in {day.daysUntilNextPeriod} Tagen</strong>
          </div>
        </div>
        <p className="text">{info.summary}</p>
        <p className="note">
          Tag {day.phaseDay} von {day.phaseLength} in dieser Phase
        </p>
      </Card>

      {features.map((feature) => {
        const recommendation = feature.recommend?.({ day, profile })
        if (!recommendation) return null
        return (
          <RecommendationCard
            key={feature.id}
            title={feature.title}
            icon={feature.icon}
            accent={info.color}
            recommendation={recommendation}
          />
        )
      })}

      <p className="disclaimer">
        Die Empfehlungen sind allgemeine Orientierung und ersetzen keine ärztliche Beratung. Bei
        starken Beschwerden, ausbleibender Periode oder Kinderwunsch bitte ärztlich abklären.
      </p>
    </div>
  )
}
