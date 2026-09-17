import { describe, expect, it } from 'vitest'
import { SOURCES } from './content'

describe('Quellenverzeichnis', () => {
  it('hat eindeutige IDs', () => {
    const ids = SOURCES.map((source) => source.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('enthält alle drei Quellenarten', () => {
    for (const kind of ['studie', 'buch', 'creator']) {
      expect(SOURCES.some((source) => source.kind === kind)).toBe(true)
    }
  })

  it('liefert zu jeder Quelle eine Einordnung für die App', () => {
    for (const source of SOURCES) {
      expect(source.takeaway.length).toBeGreaterThan(10)
    }
  })
})
