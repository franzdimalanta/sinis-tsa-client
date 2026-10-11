import { useLayoutEffect, type RefObject } from 'react'

export function useMenuShowcaseEntrance(rootRef: RefObject<HTMLElement | null>, navigationKey: string) {
  useLayoutEffect(() => {
    const root = rootRef.current
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!root || media.matches) return
    const animations: Animation[] = []
    const stop = () => animations.forEach(animation => animation.cancel())
    try {
      root.querySelectorAll<HTMLElement>('[data-menu-entrance]').forEach(element => {
        const kind = element.dataset.menuEntrance
        const transform = kind === 'heading' ? 'translateY(12px)' : kind === 'left' ? 'translateX(-20px)' : kind === 'right' ? 'translateX(20px)' : kind === 'center' ? 'scale(.98)' : undefined
        animations.push(element.animate([
          { opacity: 0, ...(transform ? { transform } : {}) },
          { opacity: 1, ...(transform ? { transform: 'none' } : {}) },
        ], { duration: 600, delay: kind === 'details' ? 100 : 0, easing: 'ease-out', fill: 'backwards' }))
      })
    } catch {
      // Base styles stay visible if animation setup fails.
      stop()
    }
    const motionChanged = () => { if (media.matches) stop() }
    media.addEventListener('change', motionChanged)
    return () => { stop(); media.removeEventListener('change', motionChanged) }
  }, [rootRef, navigationKey])
}
