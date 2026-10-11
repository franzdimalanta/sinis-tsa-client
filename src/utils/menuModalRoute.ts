import type { Location } from 'react-router-dom'

// Deliberately memory-only: history state survives refresh, this registry does not.
const menuVisits = new Set<string>()
export function rememberMenuVisit(location: Location) {
  if (location.pathname === '/menu') menuVisits.add(location.key)
}
export function getMenuBackground(location: Location): Location | undefined {
  if (!/^\/menu\/[^/]+\/?$/.test(location.pathname)) return
  const background = (location.state as { backgroundLocation?: Location } | null)?.backgroundLocation
  if (background?.pathname === '/menu' && menuVisits.has(background.key)) return background
}
