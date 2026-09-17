import type { Level } from '@/core/types'

interface LevelMeterProps {
  level: Level
  label: string
  accent?: string
}

export function LevelMeter({ level, label, accent }: LevelMeterProps) {
  return (
    <div className="meter" role="img" aria-label={`${label}: Stufe ${level} von 5`}>
      <div className="meter__bars">
        {[1, 2, 3, 4, 5].map((step) => (
          <span
            key={step}
            className={`meter__bar ${step <= level ? 'is-on' : ''}`}
            style={step <= level && accent ? { background: accent } : undefined}
          />
        ))}
      </div>
      <span className="meter__label">{label}</span>
    </div>
  )
}
