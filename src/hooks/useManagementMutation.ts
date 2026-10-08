import { useRef, useState } from 'react'
import { getManagementError } from '../utils/managementError'
export function useManagementMutation(resource: 'ingredient' | 'recipe') {
 const lock = useRef(false)
 const [busy, setBusy] = useState(false)
 const [error, setError] = useState<string | null>(null)
 async function run(operation: () => Promise<void>) {
  if (lock.current) return false
  lock.current = true; setBusy(true); setError(null)
  try { await operation(); return true } catch (error: unknown) { setError(getManagementError(error, resource)); return false }
  finally { lock.current = false; setBusy(false) }
 }
 return { busy, error, run }
}
