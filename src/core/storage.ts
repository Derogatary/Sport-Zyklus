const PREFIX = 'sport-zyklus'

/** Schema-Version: bei inkompatiblen Änderungen hochzählen. */
export const STORAGE_VERSION = 1

function key(name: string): string {
  return `${PREFIX}:v${STORAGE_VERSION}:${name}`
}

export function loadJson<T>(name: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key(name))
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function saveJson(name: string, value: unknown): void {
  try {
    localStorage.setItem(key(name), JSON.stringify(value))
  } catch {
    // Speichern ist best effort (privater Modus, volles Quota).
  }
}

export function clearAll(): void {
  try {
    const removable = Object.keys(localStorage).filter((entry) => entry.startsWith(PREFIX))
    removable.forEach((entry) => localStorage.removeItem(entry))
  } catch {
    // ignorieren
  }
}
