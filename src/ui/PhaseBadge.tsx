import { PHASE_INFO } from '@/core/phases'
import type { CyclePhase } from '@/core/types'

export function PhaseBadge({ phase }: { phase: CyclePhase }) {
  const info = PHASE_INFO[phase]
  return (
    <span className="badge" style={{ background: info.color }}>
      {info.label}
    </span>
  )
}
