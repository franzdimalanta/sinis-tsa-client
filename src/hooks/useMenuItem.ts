import { useEffect, useState } from 'react'
import { getMenuItem, getMenuItemAvailability } from '../api/menu'
import type { MenuItem, MenuItemAvailabilityResponse } from '../types/menu'
import { getMenuError } from '../utils/apiError'
export function useMenuItem(id: string) {
 const [data, setData] = useState<{ item: MenuItem; availability: MenuItemAvailabilityResponse } | null>(null)
 const [loading, setLoading] = useState(true)
 const [error, setError] = useState<string | null>(null)
 const [attempt, setAttempt] = useState(0)
 useEffect(() => {
  const controller = new AbortController()
  Promise.all([getMenuItem(id, controller.signal), getMenuItemAvailability(id, controller.signal)]).then(([item, availability]) => {
   if (!controller.signal.aborted) { setData({ item, availability }); setError(null) }
  }).catch((error: unknown) => { if (!controller.signal.aborted) setError(getMenuError(error)) })
   .finally(() => { if (!controller.signal.aborted) setLoading(false) })
  return () => controller.abort()
 }, [id, attempt])
 function refresh() { setLoading(true); setError(null); setAttempt(value => value + 1) }
 return { data, loading, error, refresh }
}
