import { useEffect, useState } from 'react'
import { getCategories, getMenuItems } from '../api/menu'
import type { Category, MenuItem } from '../types/menu'
import { getMenuError } from '../utils/apiError'
export function useMenuItems() {
 const [items, setItems] = useState<MenuItem[]>([])
 const [categories, setCategories] = useState<Category[]>([])
 const [loading, setLoading] = useState(true)
 const [error, setError] = useState<string | null>(null)
 const [attempt, setAttempt] = useState(0)
 useEffect(() => {
  const controller = new AbortController()
  Promise.all([getMenuItems(controller.signal), getCategories(controller.signal)]).then(([menu, groups]) => {
   if (controller.signal.aborted) return
   setItems(menu.filter(item => item.isActive).sort((a, b) => a.name.localeCompare(b.name)))
   setCategories(groups.filter(category => category.isActive)); setError(null)
  }).catch((error: unknown) => { if (!controller.signal.aborted) setError(getMenuError(error)) })
   .finally(() => { if (!controller.signal.aborted) setLoading(false) })
  return () => controller.abort()
 }, [attempt])
 function refresh() { setLoading(true); setError(null); setAttempt(value => value + 1) }
 return { items, categories, loading, error, refresh }
}
