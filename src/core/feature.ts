import type { ComponentType } from 'react'
import type { CycleDay, CycleProfile, Recommendation } from './types'

export interface FeatureContext {
  day: CycleDay
  profile: CycleProfile
}

/**
 * Vertrag zwischen App-Shell und Feature-Modul.
 *
 * Jedes Feature liegt in `src/features/<id>/` und exportiert genau ein
 * `feature`-Objekt aus `feature.tsx`. Die Registry findet es automatisch
 * (siehe `registry.ts`) - es gibt KEINE zentrale Liste, die mehrere
 * parallele Batches gleichzeitig anfassen müssten.
 */
export interface FeatureModule {
  /** Eindeutige, stabile ID (= Ordnername), z.B. 'training'. */
  id: string
  /** Anzeigename in der UI, deutsch. */
  title: string
  /** Emoji oder kurzes Symbol für Karten und Navigation. */
  icon: string
  /** Sortierung auf dem Heute-Screen (kleiner = weiter oben). */
  order: number
  /** Einzeiler, der erklärt, was das Feature beantwortet. */
  question: string
  /** Liefert die Tagesempfehlung; `null` = heute nichts anzuzeigen. */
  recommend?: (context: FeatureContext) => Recommendation | null
  /** Optionaler eigener Screen, erreichbar über die Hauptnavigation. */
  Screen?: ComponentType
  /** Label in der Hauptnavigation; nur wirksam zusammen mit `Screen`. */
  navLabel?: string
}

export function defineFeature(module: FeatureModule): FeatureModule {
  return module
}
