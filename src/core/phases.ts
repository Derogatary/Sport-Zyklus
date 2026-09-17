import type { CyclePhase } from './types'

export interface PhaseInfo {
  id: CyclePhase
  label: string
  short: string
  /** CSS-Variablenname der Phasenfarbe (siehe ui/styles.css). */
  color: string
  summary: string
  hormoneNote: string
}

export const PHASE_INFO: Record<CyclePhase, PhaseInfo> = {
  menstruation: {
    id: 'menstruation',
    label: 'Menstruation',
    short: 'Periode',
    color: 'var(--phase-menstruation)',
    summary:
      'Blutung, Hormone auf dem tiefsten Stand. Energie schwankt stark, Erholung zählt mehr als Leistung.',
    hormoneNote: 'Östrogen und Progesteron niedrig, FSH steigt langsam an.',
  },
  follicular: {
    id: 'follicular',
    label: 'Follikelphase',
    short: 'Follikel',
    color: 'var(--phase-follicular)',
    summary:
      'Östrogen steigt: mehr Energie, bessere Regeneration, hohe Belastbarkeit und Lernfähigkeit.',
    hormoneNote: 'Östrogen steigt deutlich, Progesteron bleibt niedrig.',
  },
  ovulation: {
    id: 'ovulation',
    label: 'Eisprung',
    short: 'Eisprung',
    color: 'var(--phase-ovulation)',
    summary:
      'Hormonelles Hoch: maximale Kraft und Stimmung, dafür höhere Belastung für Bänder und Sehnen.',
    hormoneNote: 'Östrogen- und LH-Peak, Testosteron leicht erhöht.',
  },
  luteal: {
    id: 'luteal',
    label: 'Lutealphase',
    short: 'Luteal',
    color: 'var(--phase-luteal)',
    summary:
      'Progesteron dominiert: höherer Grundumsatz, wärmerer Körper, mehr Bedarf an Schlaf und Kohlenhydraten.',
    hormoneNote: 'Progesteron hoch, Östrogen mittel, beide fallen zum Zyklusende ab.',
  },
}

export const HORMONE_LABELS: Record<string, string> = {
  estrogen: 'Östrogen',
  progesterone: 'Progesteron',
  testosterone: 'Testosteron',
  lh: 'LH',
  fsh: 'FSH',
}
