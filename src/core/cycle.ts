import { addDays, daysBetween } from './date'
import type { CycleDay, CyclePhase, CycleProfile, HormoneLevels, IsoDate } from './types'

export const DEFAULT_PROFILE: Omit<CycleProfile, 'lastPeriodStart'> = {
  cycleLength: 28,
  periodLength: 5,
}

export const CYCLE_LENGTH_RANGE = { min: 21, max: 45 } as const
export const PERIOD_LENGTH_RANGE = { min: 1, max: 10 } as const

/** Die Lutealphase ist relativ konstant (~14 Tage), egal wie lang der Zyklus ist. */
export const LUTEAL_LENGTH = 14

export interface PhaseWindow {
  phase: CyclePhase
  /** Erster Zyklustag der Phase, 1-basiert. */
  start: number
  /** Letzter Zyklustag der Phase, 1-basiert (inklusive). */
  end: number
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function normalizeProfile(profile: CycleProfile): CycleProfile {
  const cycleLength = clamp(
    Math.round(profile.cycleLength),
    CYCLE_LENGTH_RANGE.min,
    CYCLE_LENGTH_RANGE.max,
  )
  const periodLength = clamp(
    Math.round(profile.periodLength),
    PERIOD_LENGTH_RANGE.min,
    Math.min(PERIOD_LENGTH_RANGE.max, cycleLength - 6),
  )
  return { ...profile, cycleLength, periodLength }
}

/** Geschätzter Eisprungtag: 14 Tage vor der nächsten Periode. */
export function ovulationDay(profile: CycleProfile): number {
  const { cycleLength } = normalizeProfile(profile)
  return cycleLength - LUTEAL_LENGTH
}

/** Die vier Phasenfenster eines Zyklus, lücken- und überschneidungsfrei. */
export function phaseWindows(profile: CycleProfile): PhaseWindow[] {
  const { cycleLength, periodLength } = normalizeProfile(profile)
  const ovulation = ovulationDay(profile)
  const ovulationStart = clamp(ovulation - 2, periodLength + 1, cycleLength)
  const ovulationEnd = clamp(ovulation + 1, ovulationStart, cycleLength)

  const windows: PhaseWindow[] = [
    { phase: 'menstruation', start: 1, end: periodLength },
    { phase: 'follicular', start: periodLength + 1, end: ovulationStart - 1 },
    { phase: 'ovulation', start: ovulationStart, end: ovulationEnd },
    { phase: 'luteal', start: ovulationEnd + 1, end: cycleLength },
  ]

  return windows.filter((window) => window.end >= window.start)
}

/** Zyklustag (1-basiert) für ein Datum. Auch für vergangene Zyklen korrekt. */
export function dayOfCycle(profile: CycleProfile, date: IsoDate): number {
  const { cycleLength } = normalizeProfile(profile)
  const diff = daysBetween(profile.lastPeriodStart, date)
  const modulo = ((diff % cycleLength) + cycleLength) % cycleLength
  return modulo + 1
}

export function phaseForDay(profile: CycleProfile, day: number): PhaseWindow {
  const windows = phaseWindows(profile)
  const match = windows.find((window) => day >= window.start && day <= window.end)
  return match ?? windows[windows.length - 1]
}

/** Lineare Interpolation über Stützpunkte [zyklusanteil 0..1, wert 0..1]. */
function curve(points: Array<[number, number]>, position: number): number {
  const x = clamp(position, 0, 1)
  for (let i = 1; i < points.length; i += 1) {
    const [prevX, prevY] = points[i - 1]
    const [nextX, nextY] = points[i]
    if (x <= nextX) {
      const span = nextX - prevX
      const ratio = span === 0 ? 0 : (x - prevX) / span
      return Number((prevY + (nextY - prevY) * ratio).toFixed(3))
    }
  }
  return points[points.length - 1][1]
}

/**
 * Grobe Modellkurven der wichtigsten Hormone, normiert auf 0..1.
 * Das sind Schätzwerte zur Veranschaulichung, keine Messwerte.
 */
export function hormonesForDay(profile: CycleProfile, day: number): HormoneLevels {
  const { cycleLength, periodLength } = normalizeProfile(profile)
  const ovulation = ovulationDay(profile)
  // Position relativ zum Eisprung, damit die Kurven bei jeder Zykluslänge passen.
  const beforeOvulation = day <= ovulation
  const position = beforeOvulation
    ? (day - 1) / Math.max(ovulation - 1, 1) / 2
    : 0.5 + (day - ovulation) / Math.max(cycleLength - ovulation, 1) / 2

  return {
    estrogen: curve(
      [
        [0, 0.15],
        [0.15, 0.2],
        [0.42, 0.75],
        [0.5, 1],
        [0.58, 0.45],
        [0.78, 0.6],
        [1, 0.15],
      ],
      position,
    ),
    progesterone: curve(
      [
        [0, 0.08],
        [0.45, 0.05],
        [0.52, 0.2],
        [0.75, 1],
        [0.9, 0.5],
        [1, 0.08],
      ],
      position,
    ),
    testosterone: curve(
      [
        [0, 0.3],
        [0.3, 0.45],
        [0.5, 0.85],
        [0.65, 0.5],
        [1, 0.3],
      ],
      position,
    ),
    lh: curve(
      [
        [0, 0.1],
        [0.42, 0.15],
        [0.5, 1],
        [0.56, 0.15],
        [1, 0.1],
      ],
      position,
    ),
    fsh: curve(
      [
        [0, 0.6],
        [Math.min(0.2, periodLength / cycleLength), 0.7],
        [0.4, 0.3],
        [0.5, 0.8],
        [0.6, 0.25],
        [1, 0.35],
      ],
      position,
    ),
  }
}

/** Vollständige Auswertung eines Kalendertags. */
export function cycleDayFor(profile: CycleProfile, date: IsoDate): CycleDay {
  const normalized = normalizeProfile(profile)
  const day = dayOfCycle(normalized, date)
  const window = phaseForDay(normalized, day)
  return {
    date,
    dayOfCycle: day,
    cycleLength: normalized.cycleLength,
    phase: window.phase,
    phaseDay: day - window.start + 1,
    phaseLength: window.end - window.start + 1,
    // Tage bis zum ersten Tag der nächsten Periode (Zyklustag 28 von 28 -> 1).
    daysUntilNextPeriod: normalized.cycleLength - day + 1,
    hormones: hormonesForDay(normalized, day),
  }
}

/** Zusammenhängende Tagesreihe ab einem Startdatum. */
export function cycleRange(profile: CycleProfile, start: IsoDate, days: number): CycleDay[] {
  return Array.from({ length: Math.max(days, 0) }, (_, index) =>
    cycleDayFor(profile, addDays(start, index)),
  )
}

/** Startdatum der nächsten Periode ab einem Referenztag. */
export function nextPeriodStart(profile: CycleProfile, reference: IsoDate): IsoDate {
  const day = dayOfCycle(profile, reference)
  const normalized = normalizeProfile(profile)
  return addDays(reference, normalized.cycleLength - day + 1)
}
