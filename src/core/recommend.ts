import type { CycleDay, CyclePhase, Recommendation } from './types'

export type PhaseTable = Record<CyclePhase, Omit<Recommendation, 'topic'>>

/**
 * Baut aus einer Phasentabelle die Tagesempfehlung. Feature-Module nutzen
 * das als Standardweg; wer feiner steuern will (z.B. nach Zyklustag),
 * implementiert `recommend` direkt.
 */
export function fromPhaseTable(topic: string, table: PhaseTable, day: CycleDay): Recommendation {
  return { topic, ...table[day.phase] }
}
