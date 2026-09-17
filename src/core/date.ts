import type { IsoDate } from './types'

const MS_PER_DAY = 24 * 60 * 60 * 1000

/** Formatiert ein Date als lokales YYYY-MM-DD. */
export function toIsoDate(date: Date): IsoDate {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

/** Parst YYYY-MM-DD als lokale Mitternacht. */
export function fromIsoDate(value: IsoDate): Date {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, (month ?? 1) - 1, day ?? 1)
}

export function addDays(value: IsoDate, days: number): IsoDate {
  const date = fromIsoDate(value)
  date.setDate(date.getDate() + days)
  return toIsoDate(date)
}

/** Ganze Tage zwischen zwei Daten (b - a), unabhängig von Sommerzeit. */
export function daysBetween(a: IsoDate, b: IsoDate): number {
  const start = fromIsoDate(a)
  const end = fromIsoDate(b)
  const utcStart = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())
  const utcEnd = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate())
  return Math.round((utcEnd - utcStart) / MS_PER_DAY)
}

export function today(): IsoDate {
  return toIsoDate(new Date())
}

const WEEKDAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']

export function formatShort(value: IsoDate): string {
  const date = fromIsoDate(value)
  return `${WEEKDAYS[date.getDay()]}, ${date.getDate()}.${date.getMonth() + 1}.`
}

export function formatLong(value: IsoDate): string {
  return fromIsoDate(value).toLocaleDateString('de-DE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}
