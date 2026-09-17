import { HORMONE_LABELS } from '@/core/phases'
import type { HormoneLevels } from '@/core/types'

export function HormoneBars({ hormones }: { hormones: HormoneLevels }) {
  return (
    <ul className="hormones">
      {Object.entries(hormones).map(([name, value]) => (
        <li key={name} className="hormones__row">
          <span className="hormones__name">{HORMONE_LABELS[name] ?? name}</span>
          <span className="hormones__track">
            <span className="hormones__fill" style={{ width: `${Math.round(value * 100)}%` }} />
          </span>
          <span className="hormones__value">{Math.round(value * 100)}%</span>
        </li>
      ))}
    </ul>
  )
}
