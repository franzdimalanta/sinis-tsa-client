import { useLayoutEffect } from 'react'
import type { Location } from 'react-router-dom'

type ScrollToTopProps = { location: Location }

export default function ScrollToTop({ location }: ScrollToTopProps) {
  const { key, hash } = location

  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    return () => { window.history.scrollRestoration = previous }
  }, [])

  useLayoutEffect(() => {
    // Hash links keep their anchor behavior; each dedicated-page visit starts at top.
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [key, hash])

  return null
}
