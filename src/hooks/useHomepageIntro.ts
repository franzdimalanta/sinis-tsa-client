import { useLayoutEffect, useRef, useState, type RefObject } from 'react'

const sessionKey = 'sinis-tsa-intro-seen'
function shouldPlay() {
  try {
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches && sessionStorage.getItem(sessionKey) !== '1' && typeof Element.prototype.animate === 'function'
  } catch { return false }
}

export default function useHomepageIntro(pageRef: RefObject<HTMLDivElement | null>) {
  const [play] = useState(shouldPlay)
  const [active, setActive] = useState(play)
  const [ready, setReady] = useState(!play)
  const overlayRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!play) return
    const overlay = overlayRef.current
    const page = pageRef.current
    const customer = page?.closest<HTMLElement>('.sinis-customer')
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const animations: Animation[] = []
    const timers: number[] = []
    const oldOverflow = document.body.style.overflow
    const oldHtmlOverflow = document.documentElement.style.overflow
    const oldInert = customer?.inert ?? false
    const previousFocus = document.activeElement as HTMLElement | null
    let restored = false
    const restore = () => {
      if (restored) return
      restored = true
      document.body.style.overflow = oldOverflow
      document.documentElement.style.overflow = oldHtmlOverflow
      if (customer) customer.inert = oldInert
      if (previousFocus?.isConnected && previousFocus !== document.body) previousFocus.focus({ preventScroll: true })
    }
    const finish = () => {
      restore()
      animations.forEach((animation) => animation.cancel())
      timers.forEach(window.clearTimeout)
      setActive(false)
      setReady(true)
    }
    const onMotion = () => { if (media.matches) finish() }
    try {
      if (!overlay || !page || !customer || media.matches) throw new Error('Intro unavailable')
      sessionStorage.setItem(sessionKey, '1')
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      customer.inert = true
      previousFocus?.blur()
      const animate = (element: Element | null, frames: Keyframe[], duration: number, delay = 0) => {
        if (!element) throw new Error('Missing intro element')
        animations.push(element.animate(frames, { duration, delay, easing: 'ease-out', fill: 'both' }))
      }
      animate(overlay, [{ opacity: 1 }, { opacity: 0 }], 800, 1200)
      animate(overlay.querySelector('[data-intro-text]'), [
        { opacity: 0, offset: 0 }, { opacity: 1, offset: 0.28 },
        { opacity: 1, offset: 0.8 }, { opacity: 0, offset: 1 },
      ], 1250)
      animate(overlay.querySelector('img'), [
        { opacity: 0, transform: 'scale(1)', offset: 0 },
        { opacity: 1, transform: 'scale(1)', offset: 0.18 },
        { opacity: 1, transform: 'scale(1)', offset: 0.62 },
        { opacity: 0, transform: 'scale(8)', offset: 1 },
      ], 2000)
      page.querySelectorAll('[data-hero-entrance]').forEach((element) => {
        const kind = (element as HTMLElement).dataset.heroEntrance
        animate(element, [
          { opacity: 0, transform: kind === 'carousel' ? 'scale(0.98)' : 'translateY(14px)' },
          { opacity: 1, transform: kind === 'carousel' ? 'scale(1)' : 'translateY(0)' },
        ], 600, kind === 'support' ? 1800 : 1700)
      })
      // Independent dismissal does not depend on image loading or animation events.
      timers.push(window.setTimeout(() => { restore(); setActive(false) }, 2000))
      timers.push(window.setTimeout(finish, 2400))
      media.addEventListener('change', onMotion)
    } catch {
      restore()
      animations.forEach((animation) => animation.cancel())
      timers.push(window.setTimeout(finish, 0))
    }
    return () => {
      timers.forEach(window.clearTimeout)
      animations.forEach((animation) => animation.cancel())
      media.removeEventListener('change', onMotion)
      restore()
    }
  }, [play, pageRef])
  return { active, ready, overlayRef }
}
