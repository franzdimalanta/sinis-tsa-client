import { useLayoutEffect, useRef } from 'react'
import { Link, useLocation, type LinkProps } from 'react-router-dom'

export default function HomeWordmarkLink({ onClick, ...props }: Omit<LinkProps, 'to'>) {
  const location = useLocation()
  const returnToTop = useRef(false)

  useLayoutEffect(() => {
    if (location.pathname === '/' && returnToTop.current) {
      // The sticky header stays in normal flow, so page top exposes the hero below it.
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      returnToTop.current = false
    }
  }, [location.key, location.pathname])

  return <Link {...props} to="/" onClick={(event) => {
    onClick?.(event)
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    } else {
      returnToTop.current = true
    }
  }} />
}
