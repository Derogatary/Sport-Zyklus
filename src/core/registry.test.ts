import { describe, expect, it } from 'vitest'
import { cycleDayFor } from './cycle'
import { features } from './registry'
import type { CycleProfile } from './types'

const profile: CycleProfile = {
  lastPeriodStart: '2026-01-01',
  cycleLength: 28,
  periodLength: 5,
}

describe('Feature-Registry', () => {
  it('findet die Feature-Module automatisch', () => {
    expect(features.length).toBeGreaterThanOrEqual(6)
  })

  it('hält IDs eindeutig', () => {
    const ids = features.map((feature) => feature.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('liefert für jeden Zyklustag vollständige Empfehlungen', () => {
    for (let offset = 0; offset < 28; offset += 1) {
      const date = `2026-01-${`${offset + 1}`.padStart(2, '0')}`
      const day = cycleDayFor(profile, date)
      for (const feature of features) {
        const recommendation = feature.recommend?.({ day, profile })
        if (!recommendation) continue
        expect(recommendation.headline, `${feature.id} @ ${date}`).toBeTruthy()
        expect(recommendation.detail.length).toBeGreaterThan(20)
        expect(recommendation.level).toBeGreaterThanOrEqual(1)
        expect(recommendation.level).toBeLessThanOrEqual(5)
      }
    }
  })

  it('beantwortet für jedes Feature eine Nutzerfrage', () => {
    for (const feature of features) {
      expect(feature.question).toMatch(/\?$/)
    }
  })
})
