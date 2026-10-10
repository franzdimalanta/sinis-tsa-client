import { useEffect, useRef } from 'react'

/** Content stays visible if observation or animation is unavailable. */
export default function useScrollReveal() {
  const rootRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = rootRef.current
    if (!root || !('IntersectionObserver' in window)) return
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motion.matches) return
    const animations = new Set<Animation>()
    let observer: IntersectionObserver | undefined
    const stop = () => {
      observer?.disconnect()
      animations.forEach((animation) => animation.cancel())
      animations.clear()
    }
    const onMotionChange = () => { if (motion.matches) stop() }
    try {
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.08) continue
          observer?.unobserve(entry.target)
          if (motion.matches) continue
          const element = entry.target as HTMLElement
          try {
            const animation = element.animate([
              { opacity: 0, transform: 'translateY(18px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ], { duration: 550, easing: 'ease-out', delay: Number(element.dataset.revealDelay || 0), fill: 'backwards' })
            animations.add(animation)
            animation.onfinish = () => animations.delete(animation)
          } catch {
            // Visible base styles provide the fallback.
          }
        }
      }, { threshold: 0.08 })
      root.querySelectorAll<HTMLElement>('[data-scroll-reveal]').forEach((element) => {
        const rect = element.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) return
        observer?.observe(element)
      })
      motion.addEventListener('change', onMotionChange)
    } catch { stop() }
    return () => {
      stop()
      motion.removeEventListener('change', onMotionChange)
    }
  }, [])
  return rootRef
}
