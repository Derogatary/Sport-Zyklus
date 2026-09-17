import type { FeatureModule } from './feature'

/**
 * Auto-Discovery aller Feature-Module.
 *
 * Bewusst per `import.meta.glob`, damit ein neues Feature NUR aus neuen
 * Dateien besteht. Dadurch können mehrere Batches parallel Features
 * hinzufügen, ohne sich in einer gemeinsamen Registrierungsdatei zu
 * blockieren (siehe CLAUDE.md, "Parallele Batch-Entwicklung").
 */
const modules = import.meta.glob<{ feature: FeatureModule }>('../features/*/feature.tsx', {
  eager: true,
})

function collect(): FeatureModule[] {
  const found: FeatureModule[] = []
  for (const [path, module] of Object.entries(modules)) {
    const feature = module?.feature
    if (!feature?.id) {
      console.warn(`[registry] ${path} exportiert kein gültiges "feature"-Objekt.`)
      continue
    }
    found.push(feature)
  }
  const ids = new Set<string>()
  for (const feature of found) {
    if (ids.has(feature.id)) {
      console.warn(`[registry] Doppelte Feature-ID "${feature.id}".`)
    }
    ids.add(feature.id)
  }
  return found.sort((a, b) => a.order - b.order || a.id.localeCompare(b.id))
}

export const features: FeatureModule[] = collect()

export function featureById(id: string): FeatureModule | undefined {
  return features.find((feature) => feature.id === id)
}

export const navFeatures: FeatureModule[] = features.filter((feature) => feature.Screen)
