import { hormonesForDay, phaseWindows } from '@/core/cycle'
import { HORMONE_LABELS, PHASE_INFO } from '@/core/phases'
import type { CycleProfile, HormoneLevels } from '@/core/types'

const SERIES: Array<{ key: keyof HormoneLevels; color: string }> = [
  { key: 'estrogen', color: 'var(--chart-1)' },
  { key: 'progesterone', color: 'var(--chart-2)' },
  { key: 'testosterone', color: 'var(--chart-3)' },
  { key: 'lh', color: 'var(--chart-4)' },
]

const WIDTH = 320
const HEIGHT = 140

export function HormoneChart({ profile, currentDay }: { profile: CycleProfile; currentDay: number }) {
  const days = Array.from({ length: profile.cycleLength }, (_, index) => index + 1)
  const x = (day: number) => ((day - 1) / Math.max(profile.cycleLength - 1, 1)) * WIDTH
  const y = (value: number) => HEIGHT - value * (HEIGHT - 10) - 5

  return (
    <div className="chart">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label="Verlauf der Hormone über den Zyklus"
        preserveAspectRatio="none"
      >
        {phaseWindows(profile).map((window) => (
          <rect
            key={window.phase}
            x={x(window.start)}
            y={0}
            width={Math.max(x(window.end + 1) - x(window.start), 1)}
            height={HEIGHT}
            fill={PHASE_INFO[window.phase].color}
            opacity={0.14}
          />
        ))}
        {SERIES.map((series) => (
          <polyline
            key={series.key}
            fill="none"
            stroke={series.color}
            strokeWidth={2}
            points={days
              .map((day) => `${x(day)},${y(hormonesForDay(profile, day)[series.key])}`)
              .join(' ')}
          />
        ))}
        <line
          x1={x(currentDay)}
          x2={x(currentDay)}
          y1={0}
          y2={HEIGHT}
          stroke="var(--fg)"
          strokeWidth={1}
          strokeDasharray="3 3"
        />
      </svg>
      <ul className="chart__legend">
        {SERIES.map((series) => (
          <li key={series.key}>
            <span className="chart__dot" style={{ background: series.color }} />
            {HORMONE_LABELS[series.key]}
          </li>
        ))}
      </ul>
    </div>
  )
}
