import { useEffect, useState } from 'react'
import { getManagementError } from '../utils/managementError'
// Pass a stable loader (a module function or useCallback) to avoid repeated requests.
export function useManagementData<T>(loader: (signal: AbortSignal) => Promise<T>) {
 const [data, setData] = useState<T | null>(null)
 const [loading, setLoading] = useState(true)
 const [error, setError] = useState<string | null>(null)
 const [attempt, setAttempt] = useState(0)
 useEffect(() => {
  const controller = new AbortController()
  loader(controller.signal).then(data => { if (!controller.signal.aborted) { setData(data); setError(null) } })
   .catch((error: unknown) => { if (!controller.signal.aborted) setError(getManagementError(error)) })
   .finally(() => { if (!controller.signal.aborted) setLoading(false) })
  return () => controller.abort()
 }, [loader, attempt])
 function refresh() { setLoading(true); setError(null); setAttempt(value => value + 1) }
 return { data, loading, error, refresh }
}
