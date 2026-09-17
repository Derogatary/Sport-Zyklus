import { describe, expect, it } from 'vitest'
import { addDays, daysBetween, formatShort, fromIsoDate, toIsoDate } from './date'

describe('date utils', () => {
  it('formatiert lokale Daten ohne UTC-Verschiebung', () => {
    expect(toIsoDate(new Date(2026, 0, 5))).toBe('2026-01-05')
  })

  it('parst und formatiert verlustfrei', () => {
    expect(toIsoDate(fromIsoDate('2026-11-30'))).toBe('2026-11-30')
  })

  it('addiert über Monatsgrenzen', () => {
    expect(addDays('2026-01-30', 3)).toBe('2026-02-02')
  })

  it('zählt Tage auch über die Sommerzeitumstellung', () => {
    expect(daysBetween('2026-03-28', '2026-03-30')).toBe(2)
    expect(daysBetween('2026-10-24', '2026-10-26')).toBe(2)
  })

  it('formatiert kurz mit Wochentag', () => {
    expect(formatShort('2026-01-05')).toBe('Mo, 5.1.')
  })
})
