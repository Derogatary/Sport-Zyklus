import { describe, expect, it } from 'vitest'
import {
  cycleDayFor,
  cycleRange,
  dayOfCycle,
  hormonesForDay,
  nextPeriodStart,
  normalizeProfile,
  ovulationDay,
  phaseWindows,
} from './cycle'
import type { CycleProfile } from './types'

const profile: CycleProfile = {
  lastPeriodStart: '2026-01-01',
  cycleLength: 28,
  periodLength: 5,
}

describe('normalizeProfile', () => {
  it('begrenzt unplausible Werte', () => {
    const result = normalizeProfile({ ...profile, cycleLength: 90, periodLength: 40 })
    expect(result.cycleLength).toBe(45)
    expect(result.periodLength).toBe(10)
  })

  it('hält die Blutung kürzer als den Zyklus', () => {
    const result = normalizeProfile({ ...profile, cycleLength: 21, periodLength: 10 })
    expect(result.periodLength).toBeLessThanOrEqual(result.cycleLength - 6)
  })
})

describe('dayOfCycle', () => {
  it('startet bei 1 am ersten Periodentag', () => {
    expect(dayOfCycle(profile, '2026-01-01')).toBe(1)
  })

  it('zählt innerhalb des Zyklus hoch', () => {
    expect(dayOfCycle(profile, '2026-01-14')).toBe(14)
  })

  it('wiederholt sich nach Zyklusende', () => {
    expect(dayOfCycle(profile, '2026-01-29')).toBe(1)
  })

  it('funktioniert auch rückwärts', () => {
    expect(dayOfCycle(profile, '2025-12-31')).toBe(28)
  })
})

describe('phaseWindows', () => {
  it('deckt den Zyklus vollständig und überschneidungsfrei ab', () => {
    for (const cycleLength of [21, 24, 28, 31, 35, 45]) {
      const windows = phaseWindows({ ...profile, cycleLength })
      expect(windows[0].start).toBe(1)
      expect(windows[windows.length - 1].end).toBe(cycleLength)
      windows.forEach((window, index) => {
        if (index > 0) expect(window.start).toBe(windows[index - 1].end + 1)
      })
    }
  })

  it('legt den Eisprung 14 Tage vor die nächste Periode', () => {
    expect(ovulationDay({ ...profile, cycleLength: 32 })).toBe(18)
  })
})

describe('cycleDayFor', () => {
  it('ordnet die Phasen korrekt zu', () => {
    expect(cycleDayFor(profile, '2026-01-02').phase).toBe('menstruation')
    expect(cycleDayFor(profile, '2026-01-09').phase).toBe('follicular')
    expect(cycleDayFor(profile, '2026-01-14').phase).toBe('ovulation')
    expect(cycleDayFor(profile, '2026-01-22').phase).toBe('luteal')
  })

  it('zählt Phasentage ab 1', () => {
    const day = cycleDayFor(profile, '2026-01-01')
    expect(day.phaseDay).toBe(1)
    expect(day.phaseLength).toBe(5)
  })

  it('zählt die Tage bis zur nächsten Periode herunter', () => {
    expect(cycleDayFor(profile, '2026-01-28').daysUntilNextPeriod).toBe(1)
  })
})

describe('hormonesForDay', () => {
  it('hält alle Werte im Bereich 0..1', () => {
    for (let day = 1; day <= 28; day += 1) {
      const hormones = hormonesForDay(profile, day)
      for (const value of Object.values(hormones)) {
        expect(value).toBeGreaterThanOrEqual(0)
        expect(value).toBeLessThanOrEqual(1)
      }
    }
  })

  it('zeigt den LH-Peak rund um den Eisprung', () => {
    const ovulation = ovulationDay(profile)
    const peak = hormonesForDay(profile, ovulation).lh
    expect(peak).toBeGreaterThan(hormonesForDay(profile, ovulation - 5).lh)
    expect(peak).toBeGreaterThan(hormonesForDay(profile, ovulation + 5).lh)
  })

  it('zeigt Progesteron hoch in der Lutealphase', () => {
    expect(hormonesForDay(profile, 21).progesterone).toBeGreaterThan(
      hormonesForDay(profile, 7).progesterone,
    )
  })
})

describe('cycleRange', () => {
  it('liefert zusammenhängende Tage', () => {
    const range = cycleRange(profile, '2026-01-01', 30)
    expect(range).toHaveLength(30)
    expect(range[0].date).toBe('2026-01-01')
    expect(range[29].date).toBe('2026-01-30')
  })
})

describe('nextPeriodStart', () => {
  it('berechnet den nächsten Periodenbeginn', () => {
    expect(nextPeriodStart(profile, '2026-01-10')).toBe('2026-01-29')
  })
})
