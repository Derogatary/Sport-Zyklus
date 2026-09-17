/**
 * Gemeinsame Domäntypen. Diese Datei ist SHARED CORE:
 * Änderungen betreffen alle Feature-Batches -> nur additiv ändern
 * (neue optionale Felder, neue Typen), niemals Felder umbenennen oder
 * entfernen, ohne die Regeln in CLAUDE.md ("Shared Core") zu befolgen.
 */

/** Datum im Format YYYY-MM-DD (lokale Zeit, kein UTC-Shift). */
export type IsoDate = string

export const CYCLE_PHASES = ['menstruation', 'follicular', 'ovulation', 'luteal'] as const

export type CyclePhase = (typeof CYCLE_PHASES)[number]

/** Von der Nutzerin gepflegte Zyklusdaten. */
export interface CycleProfile {
  /** Erster Tag der letzten Periode. */
  lastPeriodStart: IsoDate
  /** Durchschnittliche Zykluslänge in Tagen (21-45). */
  cycleLength: number
  /** Durchschnittliche Blutungsdauer in Tagen (1-10). */
  periodLength: number
  /** Optional: hormonelle Verhütung -> Empfehlungen werden abgeschwächt. */
  hormonalContraception?: boolean
}

/** Relative Hormonlage (0..1), grobe Modellkurve - keine Messwerte. */
export interface HormoneLevels {
  estrogen: number
  progesterone: number
  testosterone: number
  lh: number
  fsh: number
}

/** Auswertung eines konkreten Kalendertags. */
export interface CycleDay {
  date: IsoDate
  /** Zyklustag, 1-basiert. */
  dayOfCycle: number
  cycleLength: number
  phase: CyclePhase
  /** Tag innerhalb der Phase, 1-basiert. */
  phaseDay: number
  phaseLength: number
  /** Tage bis zum Beginn der nächsten Periode (0 = heute). */
  daysUntilNextPeriod: number
  hormones: HormoneLevels
}

/** Intensitätsskala für Empfehlungen: 1 = sehr niedrig, 5 = sehr hoch. */
export type Level = 1 | 2 | 3 | 4 | 5

/** Eine Empfehlung, die ein Feature für einen Zyklustag liefert. */
export interface Recommendation {
  /** Feature-ID, z.B. 'training'. */
  topic: string
  /** Kurzer Titel, z.B. 'Krafttraining, schwere Sätze'. */
  headline: string
  /** 1-3 Sätze Begründung in verständlicher Sprache. */
  detail: string
  level: Level
  /** Kurzlabel für die Level-Anzeige, z.B. 'hohe Intensität'. */
  levelLabel: string
  /** Optionale konkrete Do's. */
  todos?: string[]
  /** Optionale Hinweise, was jetzt eher schwerfällt. */
  avoid?: string[]
}
