import { useEffect, useState } from 'react'

/**
 * Minimaler Hash-Router. Hash statt History-API, damit GitHub Pages
 * Deep-Links ohne 404-Rewrite ausliefert.
 */
export function useRoute(fallback: string): [string, (route: string) => void] {
  const [route, setRoute] = useState<string>(() => window.location.hash.slice(1) || fallback)

  useEffect(() => {
    const onChange = () => setRoute(window.location.hash.slice(1) || fallback)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [fallback])

  const navigate = (next: string) => {
    window.location.hash = next
  }

  return [route, navigate]
}
